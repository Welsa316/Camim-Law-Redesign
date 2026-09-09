/**
 * Every chrome string, in both languages.
 *
 * Navigation, buttons, form labels, errors and the 404 get the same care as
 * body copy. The research found an otherwise excellent trilingual firm site
 * rendering "Home" as "Hogar", and a local competitor shipping
 * "DEFENSA DE DESPEDIDA" for removal defence. Those are chrome-string failures.
 */

export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "es";

export const ui = {
  es: {
    "nav.services": "Servicios",
    "nav.attorney": "El abogado",
    "nav.consultation": "Consulta",
    "nav.faq": "Preguntas",
    "nav.detained": "¿Detuvieron a un familiar?",
    "nav.payment": "Pagar",
    "nav.orlando": "Orlando",
    "nav.menu": "Menú",
    "nav.closeMenu": "Cerrar menú",
    "nav.openMenu": "Abrir menú",
    "nav.allServices": "Ver todos los servicios",

    "cta.book": "Agendar consulta",
    "cta.call": "Llamar",
    "cta.callNow": "Llamar ahora",
    "cta.write": "Escribir",
    "cta.seeServices": "Ver servicios",
    "cta.readMore": "Seguir leyendo",
    "cta.meetAttorney": "Conocer al abogado",

    "a11y.skip": "Saltar al contenido principal",
    "a11y.langSwitch": "Cambiar idioma",
    "a11y.currentLang": "Idioma actual: español",
    "a11y.toEnglish": "Ver esta página en inglés",
    "a11y.breadcrumb": "Ruta de navegación",
    "a11y.mainNav": "Navegación principal",
    "a11y.footerNav": "Navegación del pie de página",

    "label.phone": "Teléfono",
    "label.email": "Correo",
    "label.address": "Dirección",
    "label.hours": "Horario",
    "label.languages": "Idiomas",
    "label.form": "Formulario",
    "label.updated": "Última actualización",
    "label.reviewedBy": "Escrito y revisado por",
    "label.whoFor": "Para quién es",
    "label.whatItIs": "Qué es",
    "label.howItWorks": "Cómo funciona",
    "label.howWeHelp": "En qué ayudamos",
    "label.questions": "Preguntas frecuentes",
    "label.related": "Servicios relacionados",
    "label.nextStep": "Siguiente paso",

    "home.eyebrow": "Abogado de inmigración · Orlando, Florida",
    "footer.rights": "Todos los derechos reservados.",
    "footer.legal": "Aviso legal",
    "footer.privacy": "Privacidad",
    "footer.notNotarios": "Somos un bufete de abogados. No somos notarios ni consultores de inmigración.",

    "form.firstName": "Nombre",
    "form.lastName": "Apellido",
    "form.phone": "Teléfono",
    "form.email": "Correo electrónico",
    "form.language": "¿En qué idioma prefiere que le contactemos?",
    "form.topic": "¿Sobre qué tema nos escribe?",
    "form.topicPlaceholder": "Elija una opción",
    "form.send": "Enviar",
    "form.sending": "Enviando…",
    "form.required": "obligatorio",
    "form.errorRequired": "Este campo es obligatorio.",
    "form.errorEmail": "Escriba un correo electrónico válido.",
    "form.errorPhone": "Escriba un número de teléfono válido.",
    "form.success": "Recibimos su mensaje. Le contactaremos pronto.",
    "form.failure": "No pudimos enviar el formulario. Llámenos al",

    "notFound.title": "No encontramos esa página",
    "notFound.body": "Es posible que el enlace haya cambiado. Estas son las páginas que la mayoría de las personas busca.",

    "disclaimer.general":
      "Esta página ofrece información general sobre la ley de inmigración. No es asesoría legal para su caso y leerla no crea una relación abogado-cliente. La ley cambia; hable con un abogado sobre su situación.",
    "disclaimer.form":
      "Enviar este formulario no crea una relación abogado-cliente. Comparta solo su nombre, sus datos de contacto y el tema general. No incluya todavía detalles de su historial migratorio.",
  },

  en: {
    "nav.services": "Services",
    "nav.attorney": "The attorney",
    "nav.consultation": "Consultation",
    "nav.faq": "Questions",
    "nav.detained": "A relative was detained",
    "nav.payment": "Pay",
    "nav.orlando": "Orlando",
    "nav.menu": "Menu",
    "nav.closeMenu": "Close menu",
    "nav.openMenu": "Open menu",
    "nav.allServices": "See all services",

    "cta.book": "Book a consultation",
    "cta.call": "Call",
    "cta.callNow": "Call now",
    "cta.write": "Write",
    "cta.seeServices": "See services",
    "cta.readMore": "Keep reading",
    "cta.meetAttorney": "Meet the attorney",

    "a11y.skip": "Skip to main content",
    "a11y.langSwitch": "Change language",
    "a11y.currentLang": "Current language: English",
    "a11y.toEnglish": "View this page in Spanish",
    "a11y.breadcrumb": "Breadcrumb",
    "a11y.mainNav": "Main navigation",
    "a11y.footerNav": "Footer navigation",

    "label.phone": "Phone",
    "label.email": "Email",
    "label.address": "Address",
    "label.hours": "Hours",
    "label.languages": "Languages",
    "label.form": "Form",
    "label.updated": "Last updated",
    "label.reviewedBy": "Written and reviewed by",
    "label.whoFor": "Who this is for",
    "label.whatItIs": "What it is",
    "label.howItWorks": "How it works",
    "label.howWeHelp": "How we help",
    "label.questions": "Common questions",
    "label.related": "Related services",
    "label.nextStep": "Next step",

    "home.eyebrow": "Immigration attorney · Orlando, Florida",
    "footer.rights": "All rights reserved.",
    "footer.legal": "Legal notice",
    "footer.privacy": "Privacy",
    "footer.notNotarios": "We are a law firm. We are not notarios or immigration consultants.",

    "form.firstName": "First name",
    "form.lastName": "Last name",
    "form.phone": "Phone",
    "form.email": "Email",
    "form.language": "Which language should we use to contact you?",
    "form.topic": "What is this about?",
    "form.topicPlaceholder": "Choose one",
    "form.send": "Send",
    "form.sending": "Sending…",
    "form.required": "required",
    "form.errorRequired": "This field is required.",
    "form.errorEmail": "Enter a valid email address.",
    "form.errorPhone": "Enter a valid phone number.",
    "form.success": "We received your message. We will be in touch soon.",
    "form.failure": "We could not send the form. Please call us at",

    "notFound.title": "We could not find that page",
    "notFound.body": "The link may have changed. These are the pages most people are looking for.",

    "disclaimer.general":
      "This page gives general information about immigration law. It is not legal advice about your case, and reading it does not create an attorney-client relationship. The law changes; talk to a lawyer about your own situation.",
    "disclaimer.form":
      "Sending this form does not create an attorney-client relationship. Please share only your name, your contact details and the general topic. Do not include details of your immigration history yet.",
  },
} as const;

export type UIKey = keyof (typeof ui)["es"];

export function t(lang: Lang) {
  return (key: UIKey): string => ui[lang][key] ?? ui[DEFAULT_LANG][key];
}

/** `/` for Spanish, `/en/` for English. */
export function langPath(lang: Lang, path = ""): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  const base = lang === DEFAULT_LANG ? "/" : "/en/";
  return clean ? `${base}${clean}/` : base;
}
