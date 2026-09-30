"""
The consultation form is the one thing on the site that reaches the office,
so every state it can be in is exercised here, in both languages:

  - sent empty: the sourced "complete all fields" alert shows, the first
    empty field takes focus, each empty required field is marked invalid,
    and nothing is sent;
  - a phone number too short: the sourced phone message shows on that field;
  - correcting a field clears its mark without a second send;
  - opened from a practice page (?tema=<slug>): that matter is preselected;
  - sent and accepted: the form goes and the thanks is visible and focused
    (it used to sit inside the hidden form, so a sent form ended on nothing);
  - refused by the server: the failure message and a call link show, the
    form stays, and the button works again;
  - rate-limited: the sourced rate-limit message shows.

Server answers are faked with a route, so the check never trips the real
rate limit; one real request confirms the endpoint answers at all.

    python3 verify/consult-form.py [base-url]
"""
import asyncio, json, sys
from playwright.async_api import async_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4321"
MSG = {
    "es": {"required": "Por favor complete todos los campos.", "phone": "Por favor ingrese un número de teléfono válido.",
           "ok": "¡Gracias por enviar su formulario! Nos comunicaremos con usted pronto.",
           "fail": "No se pudo enviar el formulario. Por favor, inténtelo de nuevo.",
           "rate": "Demasiadas solicitudes. Por favor espere un momento e inténtelo de nuevo."},
    "en": {"required": "Please complete all fields.", "phone": "Please enter a valid phone number.",
           "ok": "Thank you for submitting your form! We will contact you soon.",
           "fail": "Failed to submit the form. Please try again.",
           "rate": "Too many requests. Please wait a moment and try again."},
}


async def main() -> int:
    bad: list[str] = []
    def check(cond, what):
        if not cond: bad.append(what)

    async with async_playwright() as p:
        b = await p.chromium.launch()
        for lang in ("es", "en"):
            url = f"{BASE}/{'' if lang == 'es' else 'en/'}consulta/"
            m = MSG[lang]
            ctx = await b.new_context(viewport={"width": 390, "height": 844})
            pg = await ctx.new_page()
            sent = []
            answer = {"status": 200, "body": {"ok": True, "delivered": False}}
            async def fake(route):
                sent.append(route.request.post_data)
                await route.fulfill(status=answer["status"], content_type="application/json", body=json.dumps(answer["body"]))
            await pg.route("**/api/contact", fake)
            await pg.goto(url, wait_until="networkidle")

            # sent empty
            await pg.click("button[type=submit]")
            alert = pg.locator("[data-form-alert]")
            check(await alert.is_visible() and (await alert.text_content()).strip() == m["required"], f"{lang}: empty send shows no required alert")
            check(await pg.evaluate("document.activeElement.id") == "firstName", f"{lang}: empty send does not focus the first field")
            for f in ("firstName", "phone", "topic"):
                check(await pg.get_attribute(f"#{f}", "aria-invalid") == "true", f"{lang}: {f} not marked invalid when empty")
            check(await pg.get_attribute("#lastName", "aria-invalid") is None, f"{lang}: optional last name marked invalid")
            check(not sent, f"{lang}: an empty form was sent")

            # too short a phone
            await pg.fill("#firstName", "Prueba")
            await pg.select_option("#topic", "asilo")
            await pg.fill("#phone", "12")
            await pg.click("button[type=submit]")
            check((await pg.text_content("#phone-err")).strip() == m["phone"], f"{lang}: short phone shows no phone message")
            check(await pg.evaluate("document.activeElement.id") == "phone", f"{lang}: short phone does not take focus")
            check(not await alert.is_visible(), f"{lang}: required alert still shown when nothing is missing")
            check(not sent, f"{lang}: a form with a bad phone was sent")

            # correcting clears the mark without a second send
            await pg.fill("#phone", "407 555 0100")
            check(await pg.get_attribute("#phone", "aria-invalid") is None, f"{lang}: corrected phone still marked")
            check(not await pg.is_visible("#phone-err"), f"{lang}: corrected phone still shows its message")

            # refused by the server
            answer.update(status=502, body={"ok": False, "error": "delivery_failed"})
            await pg.click("button[type=submit]")
            status = pg.locator("[data-form-status]")
            await status.wait_for(state="visible", timeout=4000)
            txt = (await status.text_content()).strip()
            check(txt.startswith(m["fail"]) and await status.locator('a[href^="tel:"]').count() == 1, f"{lang}: failure shows '{txt[:60]}'")
            check(await pg.is_visible("form[data-contact-form]"), f"{lang}: form gone after a failure")
            check(await pg.is_enabled("button[type=submit]"), f"{lang}: button still disabled after a failure")

            # rate-limited
            answer.update(status=429, body={"ok": False, "error": "rate_limited"})
            await pg.click("button[type=submit]")
            await pg.wait_for_function(f"document.querySelector('[data-form-status]').textContent.trim() === {json.dumps(m['rate'])}", timeout=4000)

            # accepted
            answer.update(status=200, body={"ok": True, "delivered": False})
            await pg.click("button[type=submit]")
            await pg.wait_for_function("document.querySelector('form[data-contact-form]').hidden", timeout=4000)
            box = await status.bounding_box()
            check(await status.is_visible() and box and box["height"] > 0, f"{lang}: the thanks is not visible after a send")
            check((await status.text_content()).strip() == m["ok"], f"{lang}: the thanks reads '{(await status.text_content()).strip()[:60]}'")
            check(await pg.evaluate("document.activeElement.hasAttribute('data-form-status')"), f"{lang}: the thanks does not take focus")
            payload = json.loads(sent[-1])
            check(payload.get("topic") == "asilo" and payload.get("preferredLanguage") == lang, f"{lang}: sent {payload}")

            # opened from a practice page
            await pg.goto(url + "?tema=visa-u", wait_until="networkidle")
            check(await pg.input_value("#topic") == "visa-u", f"{lang}: ?tema=visa-u not preselected")
            await pg.goto(url + "?tema=nada", wait_until="networkidle")
            check(await pg.input_value("#topic") == "", f"{lang}: an unknown ?tema preselected something")
            await ctx.close()

        # one real request: the endpoint answers
        ctx = await b.new_context(); pg = await ctx.new_page()
        await pg.goto(f"{BASE}/consulta/")
        real = await pg.evaluate("""async () => { const r = await fetch('/api/contact', { method: 'POST',
          headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ firstName: 'Verify', phone: '4075550100', topic: 'asilo', preferredLanguage: 'es' }) });
          return [r.status, await r.json()]; }""")
        check(real[0] == 200 and real[1].get("ok") is True, f"real endpoint answered {real}")
        await b.close()

    for x in bad: print(f"  FAIL {x}")
    print(f"\nCONSULT FORM FAILURES: {len(bad)}")
    return 1 if bad else 0

sys.exit(asyncio.run(main()))
