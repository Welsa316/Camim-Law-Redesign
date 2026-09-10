/**
 * Interface strings. Every value is copied from camimlaw.com or from Campos
 * Muños Law's ES/EN dictionaries (docs/sources/camulaw.com.site-data.json);
 * the comment beside each names the source key. Nothing here was written for
 * this site. verify/copy-provenance.py checks every rendered string.
 */

export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "es";

export const ui = {
  es: {
    "nav.home": "Inicio", // camulaw nav.home
    "nav.services": "Servicios", // camulaw nav.servicios
    "nav.attorney": "Acerca de", // camulaw nav.acercaDe
    "nav.consultation": "Consulta", // camulaw nav.consulta
    "nav.payment": "Pago", // camulaw nav.pago
    "nav.allServices": "Ver todos los servicios", // camulaw nav.verTodosServicios
    "cta.book": "Consulta aquí", // camulaw home.consultaBtn
    "cta.call": "Llámenos", // camulaw mobileContact.cta
    "cta.contact": "Contáctenos", // camulaw home.contactenosBtn
    "cta.whatsapp": "Escríbanos por WhatsApp", // camulaw mobileContact.whatsappLabel
    "a11y.skip": "Saltar al contenido principal", // camulaw a11y.skipToContent
    "a11y.menu": "Menú", // camulaw a11y.menu
    "a11y.closeMenu": "Cerrar menú", // camulaw a11y.closeMenu
    "a11y.close": "Cerrar", // camulaw a11y.close
    "a11y.viewServices": "Ver servicios", // camulaw a11y.toggleServices
    "lang.es": "Español", // camulaw language switch
    "lang.en": "English", // camulaw language switch
    "form.firstName": "Nombre", // camulaw contact.firstName
    "form.lastName": "Apellido", // camulaw contact.lastName
    "form.email": "Correo electrónico", // camulaw contact.email
    "form.phone": "Teléfono", // camulaw contact.phone
    "form.message": "Mensaje", // camulaw contact.message
    "form.send": "Enviar", // camulaw contact.submit
    "form.sending": "Enviando...", // camulaw contact.sending
    "form.success": "¡Gracias por enviar su formulario! Nos comunicaremos con usted pronto.", // camulaw contact.successMessage
    "form.failure": "No se pudo enviar el formulario. Por favor, inténtelo de nuevo.", // camulaw contact.errorMessage
    "form.rateLimit": "Demasiadas solicitudes. Por favor espere un momento e inténtelo de nuevo.", // camulaw contact.rateLimitError
    "form.type": "Tipo de consulta", // camulaw consultationForm.consultationType
    "form.selectType": "Seleccione un tipo de consulta", // camulaw consultationForm.selectConsultation
    "form.notSure": "No estoy seguro / Otro", // camulaw consultationForm.notSure
    "contact.title": "Agende Su Consulta Ahora", // camulaw contact.title
    "contact.subtitle": "Estamos aquí para ayudarle", // camulaw contact.subtitle
    "contact.confidential": "Consultas confidenciales", // camulaw contact.subtitleAlt
    "contact.virtual": "Consulta virtual disponible", // camulaw home.virtualAvailable
    "contact.address": "Ubicación", // camimlaw footer
    "contact.hours": "Horario", // camimlaw footer
    "contact.contact": "Contactanos", // camimlaw footer
    "contact.monFri": "Lunes — Viernes", // camimlaw footer
    "contact.connect": "Conéctese", // camulaw contact.conectese
    "contact.paymentQ": "¿Desea realizar un pago?", // camulaw contact.paymentBtn
    "home.where": "Dónde Encontrarnos", // camulaw home.dondeEstamos
    "home.questions": "¿Tiene preguntas sobre su situación legal?", // camulaw home.popupTitle
    "press.heading": "Destacado en:", // camulaw home.pressHeading
    "press.aria": "Apariciones de Juan Campos en televisión", // camulaw home.pressAria
    "press.alt.telemundo": "Juan Campos entrevistado en Telemundo — segmento \"Hoy en Inmigración\"", // camulaw home.pressAltTelemundo
    "press.alt.univision": "Juan Campos entrevistado en Univision sobre trámites de ciudadanía", // camulaw home.pressAltUnivision
    "press.alt.tvv": "Juan Campos entrevistado en TVV en el programa \"La Última\"", // camulaw home.pressAltTvv
    "services.related": "Servicios Relacionados", // camulaw serviceDetail.relatedTitle
    "services.relatedSub": "También le pueden interesar los siguientes servicios:", // camulaw serviceDetail.relatedSubtitle
    "payment.title": "Hacer un pago", // camimlaw nav
    "payment.subtitle": "Cómo pagar por nuestros servicios", // camulaw payment.subtitle
    "payment.body": "Por favor contacte a nuestra oficina para coordinar el pago de los servicios que le ofrecemos.", // camulaw payment.contactMessage
    "notFound.title": "Página no encontrada", // camulaw notFound.title
    "notFound.body": "La página que buscaba no existe o fue movida. Permítanos guiarle al lugar correcto.", // camulaw notFound.body
    "notFound.home": "Ir al inicio", // camulaw notFound.homeBtn
    "notFound.services": "Ver servicios", // camulaw notFound.servicesBtn
    "readMore": "Leer más", // camulaw readMore
  },
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.attorney": "About us",
    "nav.consultation": "Consultation",
    "nav.payment": "Payment",
    "nav.allServices": "View all services",
    "cta.book": "Consultation here",
    "cta.call": "Call us",
    "cta.contact": "Contact Us",
    "cta.whatsapp": "Message us on WhatsApp",
    "a11y.skip": "Skip to main content",
    "a11y.menu": "Menu",
    "a11y.closeMenu": "Close menu",
    "a11y.close": "Close",
    "a11y.viewServices": "View services",
    "lang.es": "Español",
    "lang.en": "English",
    "form.firstName": "First Name",
    "form.lastName": "Last Name",
    "form.email": "Email",
    "form.phone": "Phone",
    "form.message": "Message",
    "form.send": "Send",
    "form.sending": "Sending...",
    "form.success": "Thank you for submitting your form! We will contact you soon.",
    "form.failure": "Failed to submit the form. Please try again.",
    "form.rateLimit": "Too many requests. Please wait a moment and try again.",
    "form.type": "Type of consultation",
    "form.selectType": "Select a consultation type",
    "form.notSure": "Not sure / Other",
    "contact.title": "Schedule Your Consultation Now",
    "contact.subtitle": "We are here to help you",
    "contact.confidential": "Confidential consultations",
    "contact.virtual": "Virtual consultation available",
    "contact.address": "Address",
    "contact.hours": "Hours",
    "contact.contact": "Contact Us",
    "contact.monFri": "Monday - Friday",
    "contact.connect": "Connect",
    "contact.paymentQ": "Want to make a payment?",
    "home.where": "Where to Find Us",
    "home.questions": "Do you have questions about your legal situation?",
    "press.heading": "Featured on:",
    "press.aria": "Juan Campos TV appearances",
    "press.alt.telemundo": "Juan Campos interviewed on Telemundo — \"Hoy en Inmigración\" segment",
    "press.alt.univision": "Juan Campos interviewed on Univision about citizenship procedures",
    "press.alt.tvv": "Juan Campos interviewed on TVV on the show \"La Última\"",
    "services.related": "Related Services",
    "services.relatedSub": "You may also be interested in the following services:",
    "payment.title": "Want to make a payment?",
    "payment.subtitle": "How to pay for our services",
    "payment.body": "Please contact our office to arrange payment for the services we are offering.",
    "notFound.title": "Page not found",
    "notFound.body": "The page you were looking for doesn't exist or has moved. Let us guide you back.",
    "notFound.home": "Go home",
    "notFound.services": "See services",
    "readMore": "Read More",
  },
} as const;

export type UIKey = keyof typeof ui.es;

export function t(lang: Lang) {
  return (key: UIKey): string => ui[lang][key] ?? ui[DEFAULT_LANG][key];
}

/** `/` for Spanish, `/en/` for English. */
export function langPath(lang: Lang, path = ""): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  const base = lang === DEFAULT_LANG ? "/" : "/en/";
  return clean ? `${base}${clean}/` : base;
}
