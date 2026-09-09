import type { APIRoute } from "astro";

export const prerender = false;

/**
 * The only server route on the site.
 *
 * Deliberately minimal: it accepts contact details and a topic, and forwards
 * them to the firm. It does not accept, store or log case narrative, because
 * the public form does not ask for any — see docs/CONTENT_STRATEGY.md and
 * Florida Bar Rule 4-1.18.
 */

interface Lead {
  firstName: string;
  lastName?: string;
  phone: string;
  email?: string;
  topic: string;
  preferredLanguage?: string;
}

/** Strip control characters, trim, and cap length. */
const clean = (v: unknown, max = 200): string =>
  typeof v === "string"
    ? v
        .replace(/[\u0000-\u001F\u007F]/g, "")
        .trim()
        .slice(0, max)
    : "";

/** Very small in-memory rate limit. Enough to stop casual form abuse. */
const hits = new Map<string, { n: number; t: number }>();
const LIMIT = 5;
const WINDOW = 10 * 60 * 1000;

function limited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.t > WINDOW) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  rec.n += 1;
  return rec.n > LIMIT;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const json = (body: object, status: number) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  if (limited(clientAddress ?? "unknown")) {
    return json({ ok: false, error: "rate_limited" }, 429);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const body = raw as Record<string, unknown>;
  const lead: Lead = {
    firstName: clean(body.firstName, 80),
    lastName: clean(body.lastName, 80),
    phone: clean(body.phone, 40),
    email: clean(body.email, 120),
    topic: clean(body.topic, 60),
    preferredLanguage: clean(body.preferredLanguage, 8),
  };

  if (!lead.firstName || !lead.phone || !lead.topic) {
    return json({ ok: false, error: "missing_fields" }, 422);
  }
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) {
    return json({ ok: false, error: "bad_email" }, 422);
  }

  const to = import.meta.env.LEAD_INBOX;
  const key = import.meta.env.RESEND_API_KEY;
  const from = import.meta.env.LEAD_FROM;

  // Not configured yet. Accept the lead and record it in the server log rather
  // than failing in front of the visitor; the client still has to supply an
  // inbox before launch (docs/CONTENT_REVIEW.md).
  if (!to || !key || !from) {
    console.warn("[contact] no inbox configured; lead not delivered:", {
      ...lead,
      at: new Date().toISOString(),
    });
    return json({ ok: true, delivered: false }, 200);
  }

  const text = [
    `Nombre: ${lead.firstName} ${lead.lastName ?? ""}`.trim(),
    `Telefono: ${lead.phone}`,
    lead.email ? `Correo: ${lead.email}` : null,
    `Tema: ${lead.topic}`,
    `Idioma preferido: ${lead.preferredLanguage === "en" ? "ingles" : "espanol"}`,
    "",
    "Enviado desde el formulario de camimlaw.com.",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email || undefined,
        subject: `Nueva consulta: ${lead.firstName} ${lead.lastName ?? ""} - ${lead.topic}`.trim(),
        text,
      }),
    });
    if (!res.ok) throw new Error(`resend ${res.status}`);
    return json({ ok: true, delivered: true }, 200);
  } catch (err) {
    console.error("[contact] delivery failed:", err);
    return json({ ok: false, error: "delivery_failed" }, 502);
  }
};
