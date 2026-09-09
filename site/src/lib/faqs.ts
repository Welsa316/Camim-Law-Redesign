import type { Lang } from "../i18n/ui";

/**
 * The site-wide FAQ. Written against the eight anxieties in
 * docs/CONTENT_STRATEGY.md section 2, in that order, because those are the
 * questions people actually arrive with.
 *
 * Every answer explains the law or the firm's process. None assesses the
 * reader's case.
 */
export interface Faq {
  id: string;
  q: Record<Lang, string>;
  a: Record<Lang, string[]>;
}

export const FAQS: Faq[] = [
  {
    id: "es-abogado",
    q: {
      es: "¿Cómo sé que estoy hablando con un abogado y no con un notario?",
      en: "How do I know I am talking to a lawyer and not a notario?",
    },
    a: {
      es: [
        "En Estados Unidos un notary public no es abogado y no puede darle asesoría legal ni representarle ante inmigración. En muchos países de habla hispana un notario sí es abogado, y esa confusión es la que causa más daño en esta comunidad.",
        "Campos Immigration Law es un bufete de abogados. Juan Campos está admitido para ejercer la abogacía y es miembro de la American Immigration Lawyers Association. Puede pedirle a cualquier persona que diga ser abogado el estado donde está admitida y verificarlo con el colegio de abogados de ese estado, gratis.",
      ],
      en: [
        "In the United States a notary public is not a lawyer and cannot give you legal advice or represent you in immigration matters. In many Spanish-speaking countries a notario is a lawyer, and that confusion causes more damage in this community than almost anything else.",
        "Campos Immigration Law is a law firm. Juan Campos is admitted to practise law and is a member of the American Immigration Lawyers Association. You can ask anyone who says they are a lawyer which state they are admitted in, and check it with that state's bar for free.",
      ],
    },
  },
  {
    id: "es-idioma",
    q: {
      es: "¿Me van a atender en español?",
      en: "Will I be helped in Spanish?",
    },
    a: {
      es: [
        "Sí. El abogado habla español; no necesita intérprete para hablar con él, y las explicaciones, los correos y las llamadas son en el idioma que usted prefiera.",
      ],
      en: [
        "Yes. The attorney speaks Spanish, so you do not need an interpreter to speak with him, and explanations, emails and calls happen in whichever language you prefer.",
      ],
    },
  },
  {
    id: "es-costo",
    q: {
      es: "¿Cuánto cuesta?",
      en: "How much does it cost?",
    },
    a: {
      es: [
        "Le decimos el costo antes de empezar, por escrito. Hay dos cosas distintas que se pagan: los honorarios del abogado y las tarifas del gobierno, que se pagan a USCIS o al Departamento de Estado y no dependen de nosotros.",
        "En la consulta le decimos cuál sería cada una en su caso. Si en algún momento el caso cambia y el costo cambiaría, se lo decimos antes, no después.",
      ],
      en: [
        "We tell you the cost before we start, in writing. Two separate things get paid: the attorney's fee, and the government filing fees, which go to USCIS or the State Department and are not set by us.",
        "At the consultation we tell you what each would be in your case. If the case changes in a way that would change the cost, we tell you before, not after.",
      ],
    },
  },
  {
    id: "es-tarde",
    q: {
      es: "¿Ya es tarde para mi caso?",
      en: "Is it too late for my case?",
    },
    a: {
      es: [
        "Algunos trámites tienen plazos y otros no. El asilo, por ejemplo, tiene una regla de un año desde la llegada, con excepciones. Una cita en la corte de inmigración tiene una fecha que no se puede ignorar.",
        "Aunque haya pasado un plazo, casi siempre queda algo por revisar. Lo peor que puede hacer es no preguntar por miedo a la respuesta.",
      ],
      en: [
        "Some filings have deadlines and some do not. Asylum, for example, has a one-year rule from arrival, with exceptions. An immigration court date has a date that cannot be ignored.",
        "Even where a deadline has passed, there is almost always something worth reviewing. The worst thing you can do is not ask because you are afraid of the answer.",
      ],
    },
  },
  {
    id: "es-privado",
    q: {
      es: "¿Es privado lo que les cuente? ¿Me puede meter en problemas?",
      en: "Is what I tell you private? Could it get me in trouble?",
    },
    a: {
      es: [
        "Lo que usted le cuenta a un abogado sobre su caso está protegido por el secreto profesional, incluso si al final no nos contrata.",
        "El formulario público de este sitio es distinto: por eso le pedimos solamente su nombre, cómo contactarle y el tema general. Los detalles de su historia migratoria se hablan en la consulta, no en un formulario web.",
        "No somos una agencia del gobierno y no compartimos su información con ninguna.",
      ],
      en: [
        "What you tell a lawyer about your case is protected by attorney-client confidentiality, even if you do not end up hiring us.",
        "The public form on this site is different, which is why we ask only for your name, how to reach you and the general topic. The details of your immigration history belong in the consultation, not in a web form.",
        "We are not a government agency and we do not share your information with one.",
      ],
    },
  },
  {
    id: "es-mi-caso",
    q: {
      es: "¿Llevan casos como el mío?",
      en: "Do you handle cases like mine?",
    },
    a: {
      es: [
        "Inmigración es lo único que hacemos, así que si su asunto es migratorio hay buenas probabilidades de que sí. En la página de servicios están los casos que llevamos, agrupados por situación.",
        "Si su asunto necesita otro tipo de abogado, se lo decimos claramente en vez de aceptarlo.",
      ],
      en: [
        "Immigration law is all we do, so if your matter is an immigration one there is a good chance the answer is yes. The services page lists what we handle, grouped by situation.",
        "If your matter needs a different kind of lawyer, we say so plainly instead of taking it on.",
      ],
    },
  },
  {
    id: "es-tiempo",
    q: {
      es: "¿Cuánto va a tardar?",
      en: "How long will it take?",
    },
    a: {
      es: [
        "Depende del trámite y de la oficina que lo procese, y los tiempos del gobierno cambian. Cualquiera que le prometa una fecha exacta le está prometiendo algo que no controla.",
        "Lo que sí podemos darle es el rango realista para su tipo de caso en este momento, y avisarle cuando ese rango cambie.",
      ],
      en: [
        "It depends on the filing and on the office processing it, and government timeframes change. Anyone promising you an exact date is promising something they do not control.",
        "What we can give you is the realistic range for your type of case right now, and tell you when that range changes.",
      ],
    },
  },
  {
    id: "es-detenido",
    q: {
      es: "Detuvieron a un familiar. ¿Qué hago ahora mismo?",
      en: "A relative has been detained. What do I do right now?",
    },
    a: {
      es: [
        "Reúna el nombre completo, la fecha de nacimiento, el país de nacimiento, el número A si lo tiene, y dónde y cuándo ocurrió. Con eso se puede empezar a ubicar el caso.",
        "Hay una página de este sitio dedicada solo a eso, con los pasos en orden.",
      ],
      en: [
        "Gather the full name, date of birth, country of birth, the A-number if you have it, and where and when it happened. That is enough to start locating the case.",
        "There is a page on this site for exactly this, with the steps in order.",
      ],
    },
  },
  {
    id: "es-fuera-florida",
    q: {
      es: "Vivo fuera de Florida. ¿Pueden llevar mi caso?",
      en: "I live outside Florida. Can you take my case?",
    },
    a: {
      es: [
        "Sí. El derecho de inmigración es federal, así que un abogado admitido en cualquier estado puede representar a personas ante USCIS, ante las cortes de inmigración y ante los consulados de Estados Unidos, sin importar dónde viva el cliente.",
        "Juan Campos está admitido en Louisiana y atiende desde la oficina de Orlando a personas en Florida, en otros estados y fuera del país.",
      ],
      en: [
        "Yes. Immigration law is federal, so a lawyer admitted in any state can represent people before USCIS, the immigration courts and U.S. consulates, wherever the client lives.",
        "Juan Campos is admitted in Louisiana and, from the Orlando office, represents people in Florida, in other states and outside the country.",
      ],
    },
  },
];
