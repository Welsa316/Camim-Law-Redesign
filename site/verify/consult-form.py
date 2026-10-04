"""
The consultation form is the one thing on the site that reaches the office,
so every state it can be in is exercised here, in both languages. The form is
a two-step card: the matter, chosen from a list tucked behind a button, then
the person's details.

  - the matter list starts closed; opening it and picking a matter moves to
    step 2 and names the matter on its way-back button;
  - sent empty: the sourced "complete all fields" alert shows, the first
    empty field takes focus, each empty required field is marked invalid,
    and nothing is sent;
  - a phone number too short: the sourced phone message shows on that field;
  - correcting a field clears its mark without a second send;
  - refused by the server: the failure message and a call link show, the
    card stays on step 2, and the button works again;
  - rate-limited: the sourced rate-limit message shows;
  - sent and accepted: the card moves to the thanks, which is visible and
    takes focus (it once sat inside the hidden form, so a sent form ended on
    nothing);
  - opened from a practice page (?tema=<slug>): the card starts at step 2
    with that matter chosen, and the way-back button returns to step 1;
    an unknown ?tema chooses nothing.

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
    step = "document.querySelector('[data-stepper]').dataset.step"

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

            # step 1: the matter list starts closed, opens, and a pick moves on
            check(await pg.evaluate(step) == "1", f"{lang}: card does not open on step 1")
            check(await pg.get_attribute("[data-picker-btn]", "aria-expanded") == "false" and not await pg.is_visible("[data-picker-list]"), f"{lang}: matter list not closed at first")
            await pg.click("[data-picker-btn]")
            check(await pg.is_visible("[data-picker-list]"), f"{lang}: matter list does not open")
            await pg.click("label.topic:has(input[value=asilo])")
            await pg.wait_for_function(f"{step} === '2'", timeout=3000)
            name = (await pg.text_content("label.topic:has(input[value=asilo]) .topic-name")).strip()
            check((await pg.text_content("[data-chosen]")).strip() == name, f"{lang}: way-back button does not name the matter")
            await pg.wait_for_timeout(500)

            # sent empty
            await pg.click("[data-send]")
            alert = pg.locator("[data-form-alert]")
            check(await alert.is_visible() and (await alert.text_content()).strip() == m["required"], f"{lang}: empty send shows no required alert")
            check(await pg.evaluate("document.activeElement.id") == "firstName", f"{lang}: empty send does not focus the first field")
            for f in ("firstName", "phone"):
                check(await pg.get_attribute(f"#{f}", "aria-invalid") == "true", f"{lang}: {f} not marked invalid when empty")
            check(await pg.get_attribute("#lastName", "aria-invalid") is None, f"{lang}: optional last name marked invalid")
            check(not sent, f"{lang}: an empty form was sent")

            # too short a phone
            await pg.fill("#firstName", "Prueba")
            await pg.fill("#phone", "12")
            await pg.click("[data-send]")
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
            await pg.click("[data-send]")
            err = pg.locator("[data-form-error]")
            await err.wait_for(state="visible", timeout=4000)
            txt = (await err.text_content()).strip()
            check(txt.startswith(m["fail"]) and await err.locator('a[href^="tel:"]').count() == 1, f"{lang}: failure shows '{txt[:60]}'")
            check(await pg.evaluate(step) == "2", f"{lang}: card left step 2 after a failure")
            check(await pg.is_enabled("[data-send]"), f"{lang}: button still disabled after a failure")

            # rate-limited
            answer.update(status=429, body={"ok": False, "error": "rate_limited"})
            await pg.click("[data-send]")
            await pg.wait_for_function(f"document.querySelector('[data-form-error]').textContent.trim() === {json.dumps(m['rate'])}", timeout=4000)

            # accepted
            answer.update(status=200, body={"ok": True, "delivered": False})
            await pg.click("[data-send]")
            try:
                await pg.wait_for_function(f"{step} === '3'", timeout=4000)
            except Exception:
                bad.append(f"{lang}: the card never reached the thanks after a send")
            await pg.wait_for_timeout(600)
            status = pg.locator("[data-form-status]")
            box = await status.bounding_box()
            check(await status.is_visible() and box and box["height"] > 0, f"{lang}: the thanks is not visible after a send")
            check((await status.text_content()).strip() == m["ok"], f"{lang}: the thanks reads '{(await status.text_content()).strip()[:60]}'")
            check(await pg.evaluate("document.activeElement.hasAttribute('data-form-status')"), f"{lang}: the thanks does not take focus")
            payload = json.loads(sent[-1])
            check(payload.get("topic") == "asilo" and payload.get("preferredLanguage") == lang and payload.get("firstName") == "Prueba", f"{lang}: sent {payload}")

            # opened from a practice page
            await pg.goto(url + "?tema=visa-u", wait_until="networkidle")
            check(await pg.evaluate(step) == "2", f"{lang}: ?tema=visa-u does not open at step 2")
            vu = (await pg.text_content("label.topic:has(input[value=visa-u]) .topic-name")).strip()
            check((await pg.text_content("[data-chosen]")).strip() == vu, f"{lang}: ?tema=visa-u not named on the way-back button")
            await pg.click("[data-back]")
            await pg.wait_for_function(f"{step} === '1'", timeout=3000)
            check((await pg.text_content("[data-picker-value]")).strip() == vu, f"{lang}: back at step 1 the picker forgot the matter")
            await pg.goto(url + "?tema=nada", wait_until="networkidle")
            check(await pg.evaluate(step) == "1" and await pg.locator("input[name=topic]:checked").count() == 0, f"{lang}: an unknown ?tema chose something")
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
