/**
 * The practice model. Navigation, the services hub, the A-Z index, footers,
 * breadcrumbs, related links, sitemap and JSON-LD all read from here, so they
 * cannot drift apart.
 *
 * `status`:
 *   "live"     — the client has confirmed the firm handles this. Renders.
 *   "pending"  — strong evidence the firm handles it (the same attorney
 *                publishes a page or a video about it on his other site), but
 *                not confirmed for the Orlando practice. Does NOT render.
 *   "draft"    — designed into the architecture, no evidence yet. Does NOT render.
 *
 * Florida Bar Rule 4-7.13(b)(4) forbids advertising practice areas the firm
 * does not actually handle, so this field is a compliance gate, not a
 * content preference. Flip to "live" only on the attorney's written confirmation.
 */

export type Status = "live" | "pending" | "draft";
export type GroupId = "familia" | "residencia" | "humanitaria" | "corte" | "perdones" | "trabajo";

export interface Group {
  id: GroupId;
  order: number;
  name: { es: string; en: string };
  /** One plain-language line. Not a tagline. */
  line: { es: string; en: string };
  /** The situation a person would recognise themselves in. */
  situation: { es: string; en: string };
}

export interface Matter {
  id: string;
  group: GroupId;
  status: Status;
  order: number;
  slug: { es: string; en: string };
  name: { es: string; en: string };
  /** USCIS form or visa code, shown as a reference code in tabular figures. */
  form?: string;
  /** The 40-60 word direct answer that opens the page. */
  summary: { es: string; en: string };
  whoFor: { es: string[]; en: string[] };
  what: { es: string; en: string };
  steps: { es: string[]; en: string[] };
  weHelp: { es: string[]; en: string[] };
  faqs: { q: { es: string; en: string }; a: { es: string; en: string } }[];
  related: string[];
  title: { es: string; en: string };
  description: { es: string; en: string };
  /** Evidence that the firm handles this, for the client review document. */
  evidence: string;
}

export const GROUPS: Group[] = [
  {
    id: "familia",
    order: 1,
    name: { es: "Familia", en: "Family" },
    line: {
      es: "Traer a su cónyuge, a sus hijos o a sus padres, y arreglar el estatus de quien ya está aquí.",
      en: "Bringing a spouse, children or parents, and fixing the status of someone already here.",
    },
    situation: { es: "Quiero traer a un familiar", en: "I want to bring a relative" },
  },
  {
    id: "residencia",
    order: 2,
    name: { es: "Residencia y ciudadanía", en: "Green card and citizenship" },
    line: {
      es: "Obtener la residencia permanente, mantenerla, y hacerse ciudadano.",
      en: "Getting permanent residence, keeping it, and becoming a citizen.",
    },
    situation: { es: "Quiero mi residencia o la ciudadanía", en: "I want my green card or citizenship" },
  },
  {
    id: "humanitaria",
    order: 3,
    name: { es: "Protección humanitaria", en: "Humanitarian protection" },
    line: {
      es: "Para quien huye de persecución o sobrevivió a un delito o a maltrato.",
      en: "For people fleeing persecution, or who survived a crime or abuse.",
    },
    situation: { es: "Tengo miedo de volver, o fui víctima", en: "I am afraid to go back, or I was a victim" },
  },
  {
    id: "corte",
    order: 4,
    name: { es: "Corte y detención", en: "Court and detention" },
    line: {
      es: "Si tiene una cita en la corte de inmigración o detuvieron a un familiar.",
      en: "If you have an immigration court date, or a relative has been detained.",
    },
    situation: { es: "Tengo corte o detuvieron a alguien", en: "I have court, or someone was detained" },
  },
  {
    id: "perdones",
    order: 5,
    name: { es: "Perdones", en: "Waivers" },
    line: {
      es: "Cuando una entrada, una salida o un problema anterior bloquea el caso.",
      en: "When a prior entry, departure or problem is blocking the case.",
    },
    situation: { es: "Tengo un problema del pasado", en: "Something in my past is blocking me" },
  },
  {
    id: "trabajo",
    order: 6,
    name: { es: "Permiso de trabajo", en: "Work authorisation" },
    line: {
      es: "Permiso de trabajo mientras su caso principal avanza.",
      en: "Work authorisation while your main case is pending.",
    },
    situation: { es: "Necesito permiso de trabajo", en: "I need a work permit" },
  },
];

export const MATTERS: Matter[] = [
  /* ---------------------------------------------------------------- asilo */
  {
    id: "asilo",
    group: "humanitaria",
    status: "live", // the only service the current site publishes
    order: 1,
    slug: { es: "asilo-orlando", en: "asylum-lawyer-orlando" },
    name: { es: "Asilo", en: "Asylum" },
    form: "I-589",
    evidence: "Published on camimlaw.com/asilo today, the firm's only service page.",
    summary: {
      es: "El asilo protege a personas que ya están en Estados Unidos y no pueden regresar a su país por persecución o por un temor fundado de persecución. Campos Immigration Law lleva casos de asilo afirmativo ante USCIS y asilo defensivo en la Corte de Inmigración de Orlando. Llame al (407) 418-9193.",
      en: "Asylum protects people already in the United States who cannot return home because of persecution, or a well-founded fear of it. Campos Immigration Law handles affirmative asylum before USCIS and defensive asylum at the Orlando Immigration Court. Call (407) 418-9193.",
    },
    whoFor: {
      es: [
        "Está en Estados Unidos y teme regresar a su país.",
        "El temor es por su raza, religión, nacionalidad, opinión política o por pertenecer a un grupo social determinado.",
        "Llegó hace menos de un año, o tiene una razón por la que no pudo pedir a tiempo.",
        "Está en proceso de deportación y necesita presentar el asilo como defensa.",
      ],
      en: [
        "You are in the United States and are afraid to return to your country.",
        "The fear is because of your race, religion, nationality, political opinion or membership in a particular social group.",
        "You arrived less than a year ago, or there is a reason you could not file in time.",
        "You are in removal proceedings and need to raise asylum as a defence.",
      ],
    },
    what: {
      es: "El asilo y el estatus de refugiado protegen a la misma clase de persona; se diferencian en dónde se pide. El refugio se solicita fuera de Estados Unidos y el asilo se solicita estando aquí. Si le conceden asilo puede vivir y trabajar en el país, y un año después puede solicitar la residencia permanente. Su cónyuge y sus hijos solteros menores de 21 años pueden incluirse en su solicitud si están en Estados Unidos.",
      en: "Asylum and refugee status protect the same kind of person; they differ in where you apply. Refugee status is requested from outside the United States, asylum from inside it. If asylum is granted you may live and work here, and one year later you may apply for permanent residence. Your spouse and unmarried children under 21 can be included in your application if they are in the United States.",
    },
    steps: {
      es: [
        "Revisamos su historia y las fechas: cuándo entró, qué pasó, qué pruebas existen.",
        "Determinamos si su caso va por la vía afirmativa ante USCIS o defensiva ante un juez.",
        "Preparamos la solicitud I-589 y la declaración, y reunimos la evidencia del país y de su caso.",
        "Presentamos el caso y lo acompañamos a la entrevista o a la audiencia.",
        "Si el oficial de asilo no concede el caso, lo remiten a un juez de inmigración y usted tiene otra oportunidad de presentarlo.",
      ],
      en: [
        "We go through your account and the dates: when you entered, what happened, what evidence exists.",
        "We work out whether your case goes the affirmative route before USCIS or the defensive route before a judge.",
        "We prepare the I-589 and your declaration, and gather country conditions and case evidence.",
        "We file the case and go with you to the interview or the hearing.",
        "If the asylum officer does not grant the case, it is referred to an immigration judge and you get another opportunity to present it.",
      ],
    },
    weHelp: {
      es: [
        "Evaluamos si el plazo de un año le aplica y qué excepciones podrían servirle.",
        "Preparamos la declaración con usted, en español, hasta que refleje lo que realmente pasó.",
        "Reunimos evidencia de las condiciones de su país.",
        "Solicitamos el permiso de trabajo cuando el reloj de asilo lo permite.",
        "Lo representamos ante la Corte de Inmigración de Orlando si el caso es defensivo.",
      ],
      en: [
        "We assess whether the one-year deadline applies to you and which exceptions might help.",
        "We prepare your declaration with you, in Spanish, until it reflects what actually happened.",
        "We gather country-conditions evidence.",
        "We request work authorisation when the asylum clock allows it.",
        "We represent you at the Orlando Immigration Court if the case is defensive.",
      ],
    },
    faqs: [
      {
        q: {
          es: "¿Puedo trabajar mientras espero mi caso de asilo?",
          en: "Can I work while my asylum case is pending?",
        },
        a: {
          es: "Después de cierto número de días con una solicitud debidamente presentada y pendiente, puede pedir un documento de autorización de empleo. Las reglas y los plazos cambian, así que conviene revisar su caso concreto antes de presentar el I-765. El permiso de trabajo no sirve para viajar ni para volver a entrar al país.",
          en: "After a set number of days with a properly filed, pending application, you can request an employment authorisation document. The rules and timeframes change, so it is worth reviewing your specific case before filing the I-765. A work permit does not let you travel or re-enter the country.",
        },
      },
      {
        q: {
          es: "¿Cuánto tarda el proceso de asilo?",
          en: "How long does the asylum process take?",
        },
        a: {
          es: "Varía mucho según la jurisdicción. USCIS tiene varias oficinas de asilo en el país y cada una tiene su propia carga de casos. En algunas jurisdicciones las personas esperan años; en otras la entrevista llega dentro del primer año. Le diremos qué esperar en su caso y en su oficina, no un promedio nacional.",
          en: "It varies a great deal by jurisdiction. USCIS runs several asylum offices and each has its own caseload. In some jurisdictions people wait years; in others the interview comes within the first year. We will tell you what to expect in your case and your office, not a national average.",
        },
      },
      {
        q: {
          es: "¿Puedo regresar a mi país si tengo asilo o una solicitud pendiente?",
          en: "Can I go back to my country if I have asylum or a pending application?",
        },
        a: {
          es: "No es aconsejable. El asilo se basa en que usted teme regresar. Una persona con una solicitud pendiente puede pedir un documento de viaje solo para viajes breves y de emergencia; sin aprobación previa, USCIS puede considerar abandonada la solicitud. Hable con un abogado antes de comprar cualquier boleto.",
          en: "It is not advisable. Asylum rests on your fear of returning. Someone with a pending application can request a travel document for brief, emergency travel only; without prior approval, USCIS may treat the application as abandoned. Speak to a lawyer before buying any ticket.",
        },
      },
      {
        q: {
          es: "¿Qué pasa si la oficina de asilo no me concede el asilo?",
          en: "What happens if the asylum office does not grant asylum?",
        },
        a: {
          es: "Depende de su estatus migratorio en ese momento. Si tiene un estatus válido, puede permanecer bajo ese estatus. Si no lo tiene, el caso se remite a la corte de inmigración, donde tendrá una nueva oportunidad de presentar su solicitud ante un juez.",
          en: "It depends on your immigration status at that moment. If you hold valid status, you can remain under it. If you do not, the case is referred to immigration court, where you get a fresh opportunity to present your application to a judge.",
        },
      },
    ],
    related: ["permiso-trabajo", "deportacion", "visa-u"],
    title: {
      es: "Abogado de Asilo en Orlando | Afirmativo y Defensivo",
      en: "Orlando Asylum Lawyer | Affirmative and Defensive",
    },
    description: {
      es: "Abogado de asilo en Orlando: solicitudes I-589 afirmativas ante USCIS y asilo defensivo en la Corte de Inmigración de Orlando. Plazo de un año y permiso de trabajo, explicados en español.",
      en: "Asylum lawyer in Orlando: affirmative I-589 filings before USCIS and defensive asylum at the Orlando Immigration Court. The one-year deadline and the work-permit clock, explained plainly.",
    },
  },

  /* ------------------------------------------------------- pending matters
     Everything below is evidenced by the same attorney's published pages,
     consultation form options or videos on his Louisiana firm's site, or by
     his own social content. None of it renders until confirmed for Orlando. */
  {
    id: "vawa",
    group: "humanitaria",
    status: "pending",
    order: 2,
    slug: { es: "abogado-vawa-orlando", en: "vawa-lawyer-orlando" },
    name: { es: "VAWA", en: "VAWA" },
    form: "I-360",
    evidence: "camulaw.com/servicios/vawa; consultation form option 'VAWA'. Confirm for the Orlando practice.",
    summary: {
      es: "VAWA permite que una persona maltratada por su cónyuge, su padre o su hijo ciudadano o residente pida la residencia por su cuenta, sin que esa persona lo sepa ni firme nada. Campos Immigration Law lleva autopeticiones VAWA desde Orlando. Llame al (407) 418-9193.",
      en: "VAWA lets someone abused by a U.S. citizen or resident spouse, parent or child apply for residence on their own, without that person knowing or signing anything. Campos Immigration Law handles VAWA self-petitions from Orlando. Call (407) 418-9193.",
    },
    whoFor: {
      es: [
        "Su cónyuge es ciudadano o residente y le ha maltratado física o emocionalmente.",
        "Su padre o su madre es ciudadano o residente y le maltrató cuando usted era menor.",
        "Su hijo o hija mayor de 21 años es ciudadano y le ha maltratado.",
        "Se divorció hace menos de dos años de un cónyuge que le maltrataba.",
        "Le prometieron arreglar sus papeles y usaron esa promesa para controlarle.",
      ],
      en: [
        "Your spouse is a citizen or resident and has abused you physically or emotionally.",
        "Your parent is a citizen or resident and abused you when you were a child.",
        "Your son or daughter is over 21 and a citizen, and has abused you.",
        "You divorced an abusive spouse less than two years ago.",
        "You were promised your papers, and that promise was used to control you.",
      ],
    },
    what: {
      es: "VAWA es la Ley de Violencia Contra la Mujer, aunque protege a hombres y mujeres por igual. Normalmente, para pedir la residencia por familia, su familiar ciudadano o residente tiene que presentar la petición por usted. VAWA quita ese requisito en casos de maltrato: usted presenta su propia petición, la persona que le maltrató no recibe aviso, no la firma y no puede detenerla. El maltrato no tiene que ser físico. El control del dinero, las amenazas con la migración, el aislamiento y la humillación constante también cuentan.",
      en: "VAWA is the Violence Against Women Act, though it protects men and women equally. Normally, to get residence through family, your citizen or resident relative has to file the petition for you. VAWA removes that requirement where there has been abuse: you file your own petition, the person who abused you is not notified, does not sign it, and cannot stop it. The abuse does not have to be physical. Control of money, threats about immigration status, isolation and constant humiliation also count.",
    },
    steps: {
      es: [
        "Hablamos en privado sobre lo que pasó. Usted decide cuánto contar y cuándo.",
        "Revisamos si su relación y su situación encajan en la ley, y qué evidencia existe.",
        "Reunimos las pruebas: mensajes, fotos, reportes médicos o policiales si los hay, cartas de personas que sepan lo que pasó.",
        "Preparamos la autopetición I-360 y su declaración, y la presentamos.",
        "Si USCIS aprueba la petición, seguimos con el trámite de residencia según su categoría.",
      ],
      en: [
        "We talk privately about what happened. You decide how much to say and when.",
        "We check whether your relationship and your situation fit the law, and what evidence exists.",
        "We gather the proof: messages, photographs, medical or police reports if any exist, letters from people who know what happened.",
        "We prepare the I-360 self-petition and your declaration, and file it.",
        "If USCIS approves the petition, we continue with the residence process for your category.",
      ],
    },
    weHelp: {
      es: [
        "Le explicamos qué significa cada paso antes de darlo, para que nada le tome por sorpresa.",
        "Preparamos su declaración con usted, en español, a su ritmo.",
        "Reunimos evidencia sin poner en riesgo su seguridad.",
        "Solicitamos el permiso de trabajo cuando corresponde.",
        "Le decimos con claridad si su caso no encaja en VAWA y qué otras opciones existen.",
      ],
      en: [
        "We explain what each step means before we take it, so nothing takes you by surprise.",
        "We prepare your declaration with you, in your language, at your pace.",
        "We gather evidence without putting your safety at risk.",
        "We request work authorisation when it applies.",
        "We tell you plainly if your case does not fit VAWA, and what other options exist.",
      ],
    },
    faqs: [
      {
        q: { es: "¿Se va a enterar mi esposo de que presenté?", en: "Will my spouse find out that I filed?" },
        a: {
          es: "La ley protege esa información. VAWA fue creada precisamente para que la persona que maltrata no pueda enterarse ni intervenir: no se le notifica, no firma nada y no se le pide su versión. Hay reglas federales de confidencialidad que limitan lo que el gobierno puede revelar sobre una autopetición VAWA. Aun así, si teme por su seguridad, dígalo desde la primera conversación y ajustamos cómo y cuándo le contactamos.",
          en: "The law protects that information. VAWA exists precisely so that the person who abused you cannot find out or interfere: they are not notified, they sign nothing, and they are not asked for their version. Federal confidentiality rules limit what the government may disclose about a VAWA self-petition. Even so, if you fear for your safety, say so in the first conversation and we will adjust how and when we contact you.",
        },
      },
      {
        q: { es: "¿Puedo pedir VAWA si soy hombre?", en: "Can I apply for VAWA if I am a man?" },
        a: {
          es: "Sí. El nombre de la ley confunde a mucha gente. VAWA protege a cualquier persona maltratada por un cónyuge, un padre o un hijo ciudadano o residente, sin importar su género.",
          en: "Yes. The name of the act confuses many people. VAWA protects anyone abused by a citizen or resident spouse, parent or child, regardless of gender.",
        },
      },
      {
        q: { es: "¿Necesito una denuncia policial?", en: "Do I need a police report?" },
        a: {
          es: "No es obligatoria. Muchas personas nunca llamaron a la policía, y eso no cierra la puerta. Se puede demostrar el maltrato de muchas formas: mensajes, correos, fotografías, expedientes médicos, cartas de personas que lo presenciaron, registros de una consejera o un refugio, y su propia declaración detallada.",
          en: "It is not required. Many people never called the police, and that does not close the door. Abuse can be shown in many ways: messages, emails, photographs, medical records, letters from people who witnessed it, records from a counsellor or a shelter, and your own detailed declaration.",
        },
      },
      {
        q: { es: "¿Y si ya me divorcié?", en: "What if I am already divorced?" },
        a: {
          es: "Puede seguir calificando. La ley permite presentar la autopetición dentro de un plazo después del divorcio, siempre que el divorcio esté relacionado con el maltrato. El plazo importa, así que conviene revisar las fechas cuanto antes.",
          en: "You may still qualify. The law allows a self-petition within a period after the divorce, provided the divorce is connected to the abuse. The timing matters, so it is worth reviewing the dates as soon as possible.",
        },
      },
    ],
    related: ["visa-u", "asilo"],
    title: {
      es: "Abogado VAWA en Orlando | Autopetición Confidencial",
      en: "Orlando VAWA Lawyer | Confidential Self-Petition",
    },
    description: {
      es: "Autopetición VAWA en Orlando para cónyuges, hijos y padres maltratados. La persona que le maltrató no es notificada. Le explicamos su caso en español.",
      en: "VAWA self-petitions in Orlando for abused spouses, children and parents. The person who abused you is never notified. Your case explained plainly.",
    },
  },
  {
    id: "visa-u",
    group: "humanitaria",
    status: "pending",
    order: 3,
    slug: { es: "abogado-visa-u-orlando", en: "u-visa-lawyer-orlando" },
    name: { es: "Visa U", en: "U visa" },
    form: "I-918",
    evidence: "camulaw.com/servicios/visa-u; consultation form option 'U Visa'. Confirm for the Orlando practice.",
    summary: {
      es: "La visa U es para víctimas de ciertos delitos que sufrieron daño y que ayudaron o están dispuestas a ayudar a la policía o al fiscal. Campos Immigration Law prepara peticiones de visa U desde Orlando, incluida la certificación del Suplemento B. Llame al (407) 418-9193.",
      en: "The U visa is for victims of certain crimes who suffered harm and who helped, or are willing to help, the police or prosecutor. Campos Immigration Law prepares U visa petitions from Orlando, including the Supplement B certification. Call (407) 418-9193.",
    },
    whoFor: {
      es: [
        "Fue víctima de un delito en Estados Unidos.",
        "Sufrió daño físico o mental considerable por ese delito.",
        "Tiene información sobre lo que pasó y ha ayudado, ayuda o está dispuesta a ayudar a las autoridades.",
        "El delito ocurrió en Estados Unidos o violó leyes de Estados Unidos.",
      ],
      en: [
        "You were the victim of a crime in the United States.",
        "You suffered substantial physical or mental harm from that crime.",
        "You have information about what happened and have helped, are helping, or are willing to help the authorities.",
        "The crime happened in the United States or violated United States law.",
      ],
    },
    what: {
      es: "La visa U existe porque el gobierno necesita que las víctimas denuncien delitos, y muchas no lo hacen por miedo a inmigración. Da estatus temporal y permiso de trabajo, y después de cierto tiempo abre la puerta a la residencia. Hay un límite anual de visas, así que existe una lista de espera larga; mientras tanto, muchas personas pueden recibir protección y permiso de trabajo. Los delitos que califican incluyen violencia doméstica, agresión sexual, secuestro, tráfico de personas, agresión con agravantes y varios más.",
      en: "The U visa exists because the government needs victims to report crimes, and many do not because they are afraid of immigration consequences. It gives temporary status and work authorisation, and after a period it opens a path to residence. There is an annual cap, so the waiting list is long; in the meantime many people can receive protection and work authorisation. Qualifying crimes include domestic violence, sexual assault, kidnapping, human trafficking, felonious assault and several others.",
    },
    steps: {
      es: [
        "Revisamos qué pasó y si el delito está en la lista que califica.",
        "Reunimos la evidencia del daño que sufrió y de su cooperación.",
        "Pedimos la certificación Suplemento B a la agencia que investigó el caso. Este es el paso que más se atasca.",
        "Preparamos la petición I-918 con su declaración y la presentamos.",
        "Le explicamos qué esperar de la lista de espera y qué protección hay mientras tanto.",
      ],
      en: [
        "We review what happened and whether the crime is on the qualifying list.",
        "We gather evidence of the harm you suffered and of your cooperation.",
        "We request the Supplement B certification from the agency that investigated. This is the step that most often stalls.",
        "We prepare the I-918 petition with your declaration and file it.",
        "We explain what to expect from the waiting list and what protection exists meanwhile.",
      ],
    },
    weHelp: {
      es: [
        "Gestionamos la certificación Suplemento B y damos seguimiento cuando la agencia no responde.",
        "Preparamos su declaración con usted, en español.",
        "Reunimos expedientes médicos, policiales y judiciales.",
        "Solicitamos el permiso de trabajo cuando corresponde.",
        "Revisamos si sus familiares pueden incluirse.",
      ],
      en: [
        "We handle the Supplement B certification and follow up when the agency does not respond.",
        "We prepare your declaration with you, in your language.",
        "We gather medical, police and court records.",
        "We request work authorisation when it applies.",
        "We check whether your family members can be included.",
      ],
    },
    faqs: [
      {
        q: { es: "¿Qué es el Suplemento B y quién lo firma?", en: "What is Supplement B and who signs it?" },
        a: {
          es: "Es un formulario en el que una agencia (la policía, la fiscalía, a veces un juez o una agencia de protección) certifica que usted fue víctima de un delito que califica y que ha sido de ayuda. Sin él, la petición no se puede presentar. La agencia no está obligada a firmarlo, y ahí es donde se detienen muchos casos.",
          en: "It is a form in which an agency (the police, the prosecutor, sometimes a judge or a protective agency) certifies that you were the victim of a qualifying crime and have been helpful. Without it the petition cannot be filed. The agency is not required to sign it, and that is where many cases stall.",
        },
      },
      {
        q: { es: "¿Y si la policía no quiere firmar?", en: "What if the police will not sign?" },
        a: {
          es: "Pasa. A veces es cuestión de dirigir la solicitud a la persona correcta dentro de la agencia, de adjuntar los expedientes que demuestran su cooperación, o de acudir a otra agencia que también tenga autoridad para certificar. No es automático, pero tampoco es siempre el final del camino.",
          en: "It happens. Sometimes it is a matter of directing the request to the right person inside the agency, attaching the records that show your cooperation, or going to another agency that also has authority to certify. It is not automatic, but it is not always the end of the road either.",
        },
      },
      {
        q: { es: "¿Tengo que haber denunciado en el momento?", en: "Did I have to report it at the time?" },
        a: {
          es: "No necesariamente. Lo que la ley pide es que usted tenga información y que haya sido, sea o esté dispuesta a ser de ayuda. Denuncias tardías se pueden explicar, sobre todo cuando el retraso se debió al miedo o al control de la persona que cometió el delito.",
          en: "Not necessarily. What the law asks is that you have information and that you have been, are, or are willing to be helpful. Late reports can be explained, particularly where the delay was caused by fear or by control exercised by the person who committed the crime.",
        },
      },
    ],
    related: ["vawa", "visa-t", "asilo"],
    title: {
      es: "Abogado de Visa U en Orlando | Víctimas de Delitos",
      en: "Orlando U Visa Lawyer | Crime Victims",
    },
    description: {
      es: "Visa U en Orlando para víctimas de delitos que cooperan con las autoridades. Le ayudamos con el I-918 y con la certificación Suplemento B. En español.",
      en: "U visas in Orlando for crime victims who cooperate with the authorities. We handle the I-918 and the Supplement B certification. Explained plainly.",
    },
  },
  {
    id: "visa-t", group: "humanitaria", status: "pending", order: 4,
    slug: { es: "abogado-visa-t-orlando", en: "t-visa-lawyer-orlando" },
    name: { es: "Visa T", en: "T visa" }, form: "I-914",
    evidence: "camulaw.com/servicios/visa-t; consultation form option 'T Visa'.",
    summary: { es: "", en: "" }, whoFor: { es: [], en: [] }, what: { es: "", en: "" },
    steps: { es: [], en: [] }, weHelp: { es: [], en: [] }, faqs: [],
    related: ["visa-u", "vawa"],
    title: { es: "Abogado de Visa T en Orlando", en: "Orlando T Visa Lawyer" },
    description: { es: "", en: "" },
  },
  {
    id: "peticiones-familiares",
    group: "familia",
    status: "pending",
    order: 1,
    slug: { es: "abogado-peticiones-familiares-orlando", en: "family-petitions-orlando" },
    name: { es: "Peticiones familiares", en: "Family petitions" },
    form: "I-130",
    evidence: "camulaw.com/servicios/peticiones-familiares; Instagram posts about I-130 approvals. Confirm for the Orlando practice.",
    summary: {
      es: "Un ciudadano o residente permanente puede pedir a ciertos familiares para que obtengan la residencia. Quién califica y cuánto demora depende de su estatus y del parentesco. Campos Immigration Law prepara peticiones familiares desde Orlando. Llame al (407) 418-9193.",
      en: "A citizen or permanent resident can petition for certain relatives so they can obtain residence. Who qualifies and how long it takes depends on your status and the relationship. Campos Immigration Law prepares family petitions from Orlando. Call (407) 418-9193.",
    },
    whoFor: {
      es: [
        "Es ciudadano y quiere pedir a su cónyuge, a sus hijos, a sus padres o a sus hermanos.",
        "Es residente permanente y quiere pedir a su cónyuge o a sus hijos solteros.",
        "Su familiar ya está en Estados Unidos y quiere saber si puede arreglar aquí.",
        "Su familiar está fuera del país y hay que hacer el trámite por el consulado.",
        "Ya presentó una petición y no sabe en qué punto está.",
      ],
      en: [
        "You are a citizen and want to petition for your spouse, children, parents or siblings.",
        "You are a permanent resident and want to petition for your spouse or unmarried children.",
        "Your relative is already in the United States and you want to know whether they can adjust here.",
        "Your relative is abroad and the process has to go through a consulate.",
        "You already filed a petition and do not know where it stands.",
      ],
    },
    what: {
      es: "La petición familiar, formulario I-130, establece que existe una relación real entre usted y su familiar. Es el primer paso, no el último. Después viene el trámite de residencia, que puede hacerse dentro del país con un ajuste de estatus, o fuera con un trámite consular, según cómo entró la persona y qué historial tiene. Los familiares inmediatos de un ciudadano (cónyuge, hijos menores solteros y padres) no esperan visa disponible. Las demás categorías sí, y esas esperas pueden ser de años.",
      en: "The family petition, Form I-130, establishes that a real relationship exists between you and your relative. It is the first step, not the last. After it comes the residence process, which can happen inside the country through adjustment of status, or outside through consular processing, depending on how the person entered and what their history is. Immediate relatives of a citizen (spouse, unmarried minor children and parents) do not wait for a visa to become available. The other categories do, and those waits can run to years.",
    },
    steps: {
      es: [
        "Confirmamos su estatus y el parentesco, y en qué categoría cae su familiar.",
        "Revisamos cómo entró su familiar al país y qué historial tiene, porque eso decide el camino.",
        "Preparamos la petición I-130 con la evidencia de la relación.",
        "Según el caso, seguimos con el ajuste de estatus o con el trámite consular.",
        "Le preparamos para la entrevista y lo acompañamos.",
      ],
      en: [
        "We confirm your status and the relationship, and which category your relative falls into.",
        "We review how your relative entered the country and what their history is, because that decides the route.",
        "We prepare the I-130 petition with evidence of the relationship.",
        "Depending on the case, we continue with adjustment of status or with consular processing.",
        "We prepare you for the interview and attend it with you.",
      ],
    },
    weHelp: {
      es: [
        "Le decimos desde el principio cuál es el camino realista y cuánto suele tardar.",
        "Reunimos la evidencia de la relación de forma que resista una revisión estricta.",
        "Revisamos si hace falta un perdón antes de mover el caso.",
        "Preparamos a la pareja para la entrevista.",
        "Damos seguimiento cuando el gobierno pide más evidencia.",
      ],
      en: [
        "We tell you at the outset what the realistic route is and how long it usually takes.",
        "We assemble relationship evidence in a form that stands up to close review.",
        "We check whether a waiver is needed before the case moves.",
        "We prepare the couple for the interview.",
        "We follow up when the government asks for more evidence.",
      ],
    },
    faqs: [
      {
        q: { es: "¿Cuánto tarda una petición I-130?", en: "How long does an I-130 petition take?" },
        a: {
          es: "Depende de dos cosas: cuánto tarda USCIS en decidir la petición, y si su familiar tiene que esperar a que haya visa disponible en su categoría. Para familiares inmediatos de ciudadanos no hay espera de visa. Para otras categorías la espera puede ser de años y varía por país. Le damos el rango realista para su caso concreto, no un promedio.",
          en: "It depends on two things: how long USCIS takes to decide the petition, and whether your relative has to wait for a visa to become available in their category. Immediate relatives of citizens do not wait for a visa. Other categories can wait years, and the wait varies by country. We give you the realistic range for your specific case, not an average.",
        },
      },
      {
        q: { es: "¿Puedo pedir a mis padres o a mis hermanos?", en: "Can I petition for my parents or my siblings?" },
        a: {
          es: "A sus padres, sí, si usted es ciudadano y mayor de 21 años; entran como familiares inmediatos y no esperan visa. A sus hermanos también puede pedirles si es ciudadano mayor de 21, pero esa categoría tiene una espera larga. Un residente permanente no puede pedir ni a padres ni a hermanos.",
          en: "Your parents, yes, if you are a citizen over 21; they are immediate relatives and do not wait for a visa. You can also petition for siblings if you are a citizen over 21, but that category has a long wait. A permanent resident cannot petition for parents or siblings.",
        },
      },
      {
        q: { es: "Mi familiar entró sin inspección. ¿Puede arreglar aquí?", en: "My relative entered without inspection. Can they adjust here?" },
        a: {
          es: "Normalmente no directamente, y esa es una de las diferencias más importantes en todo el proceso. Hay excepciones y hay caminos que pasan por un perdón y por el consulado. Es exactamente el tipo de detalle que conviene revisar antes de presentar nada, porque el orden de los pasos puede cambiar el resultado.",
          en: "Usually not directly, and that is one of the most important distinctions in the whole process. There are exceptions, and there are routes that go through a waiver and the consulate. It is exactly the kind of detail worth reviewing before anything is filed, because the order of the steps can change the outcome.",
        },
      },
    ],
    related: ["residencia-matrimonio", "ajuste-estatus", "tramite-consular"],
    title: {
      es: "Peticiones Familiares en Orlando | I-130 y Residencia",
      en: "Family Petitions in Orlando | I-130 and Green Cards",
    },
    description: {
      es: "Peticiones familiares I-130 en Orlando: quién puede pedir a quién, ajuste de estatus o trámite consular, y los tiempos reales de espera. En español.",
      en: "I-130 family petitions in Orlando: who can petition for whom, adjustment of status or consular processing, and the real waiting times.",
    },
  },
  {
    id: "residencia-matrimonio", group: "familia", status: "pending", order: 2,
    slug: { es: "residencia-por-matrimonio-orlando", en: "marriage-green-card-orlando" },
    name: { es: "Residencia por matrimonio", en: "Marriage green card" }, form: "I-130 / I-485",
    evidence: "Instagram bio 'Uniendo Familias con Green Cards'; the most-named matter type in Google reviews.",
    summary: { es: "", en: "" }, whoFor: { es: [], en: [] }, what: { es: "", en: "" },
    steps: { es: [], en: [] }, weHelp: { es: [], en: [] }, faqs: [],
    related: ["peticiones-familiares", "ajuste-estatus"],
    title: { es: "Residencia por Matrimonio en Orlando", en: "Marriage Green Card Lawyer in Orlando" },
    description: { es: "", en: "" },
  },
  {
    id: "ajuste-estatus", group: "familia", status: "pending", order: 3,
    slug: { es: "ajuste-de-estatus-orlando", en: "adjustment-of-status-orlando" },
    name: { es: "Ajuste de estatus", en: "Adjustment of status" }, form: "I-485",
    evidence: "camulaw.com service pages; consultation form option.",
    summary: { es: "", en: "" }, whoFor: { es: [], en: [] }, what: { es: "", en: "" },
    steps: { es: [], en: [] }, weHelp: { es: [], en: [] }, faqs: [],
    related: ["peticiones-familiares", "tramite-consular"],
    title: { es: "Ajuste de Estatus en Orlando | I-485", en: "Adjustment of Status in Orlando | I-485" },
    description: { es: "", en: "" },
  },
  {
    id: "visa-prometido", group: "familia", status: "pending", order: 4,
    slug: { es: "visa-de-prometido-orlando", en: "fiance-visa-k1-orlando" },
    name: { es: "Visa de prometido(a)", en: "Fiancé(e) visa" }, form: "K-1",
    evidence: "camulaw.com/servicios/visas-de-prometido; Instagram 02 Sep 2026.",
    summary: { es: "", en: "" }, whoFor: { es: [], en: [] }, what: { es: "", en: "" },
    steps: { es: [], en: [] }, weHelp: { es: [], en: [] }, faqs: [],
    related: ["residencia-matrimonio", "tramite-consular"],
    title: { es: "Visa de Prometido K-1 en Orlando", en: "K-1 Fiancé Visa Lawyer in Orlando" },
    description: { es: "", en: "" },
  },
  {
    id: "tramite-consular", group: "familia", status: "pending", order: 5,
    slug: { es: "tramite-consular-orlando", en: "consular-processing-orlando" },
    name: { es: "Trámite consular", en: "Consular processing" }, form: "DS-260",
    evidence: "camulaw.com/servicios/tramite-consular; bio references the U.S. Department of State.",
    summary: { es: "", en: "" }, whoFor: { es: [], en: [] }, what: { es: "", en: "" },
    steps: { es: [], en: [] }, weHelp: { es: [], en: [] }, faqs: [],
    related: ["ajuste-estatus", "perdon-i601a"],
    title: { es: "Trámite Consular en Orlando", en: "Consular Processing Lawyer in Orlando" },
    description: { es: "", en: "" },
  },
  {
    id: "ciudadania",
    group: "residencia",
    status: "pending",
    order: 1,
    slug: { es: "abogado-de-ciudadania-orlando", en: "citizenship-lawyer-orlando" },
    name: { es: "Ciudadanía y naturalización", en: "Citizenship and naturalisation" },
    form: "N-400",
    evidence: "camulaw.com/servicios/ciudadania; consultation form option 'Citizenship'. Confirm for the Orlando practice.",
    summary: {
      es: "La naturalización convierte a un residente permanente en ciudadano estadounidense. Se pide con el formulario N-400 y hay requisitos de tiempo, presencia física, buen carácter moral y un examen. Campos Immigration Law prepara casos de ciudadanía desde Orlando. Llame al (407) 418-9193.",
      en: "Naturalisation turns a permanent resident into a United States citizen. It is requested on Form N-400, with requirements on time, physical presence, good moral character and an examination. Campos Immigration Law prepares citizenship cases from Orlando. Call (407) 418-9193.",
    },
    whoFor: {
      es: [
        "Es residente permanente y ya cumplió el tiempo que la ley exige.",
        "Ha estado fuera del país por temporadas y no sabe si eso le afecta.",
        "Tiene algo en su historial, aunque sea antiguo o menor, y quiere saber si le perjudica.",
        "Le preocupa el examen de inglés y civismo.",
        "Quiere que sus hijos obtengan la ciudadanía cuando usted la obtenga.",
      ],
      en: [
        "You are a permanent resident and have met the time the law requires.",
        "You have spent periods outside the country and do not know whether that affects you.",
        "There is something in your record, even old or minor, and you want to know whether it hurts.",
        "You are worried about the English and civics test.",
        "You want your children to become citizens when you do.",
      ],
    },
    what: {
      es: "Para naturalizarse hay que haber sido residente permanente durante cierto tiempo, haber vivido físicamente en el país una parte de ese tiempo, no haber roto la residencia continua con viajes largos, demostrar buen carácter moral en el período que la ley mira, y aprobar un examen de inglés y de civismo, con excepciones por edad o por condición médica. La solicitud de ciudadanía abre su expediente completo, así que si hay algo en su historial conviene revisarlo antes de presentar, no después.",
      en: "To naturalise you must have been a permanent resident for a set period, have been physically present in the country for part of that time, not have broken continuous residence with long trips, show good moral character during the period the law examines, and pass an English and civics test, with exceptions for age or medical condition. A citizenship application opens your whole file, so if there is anything in your history it is better reviewed before filing, not after.",
    },
    steps: {
      es: [
        "Revisamos sus fechas: cuándo obtuvo la residencia y cuánto tiempo ha estado dentro y fuera del país.",
        "Repasamos su historial completo, incluidos arrestos antiguos y casos cerrados.",
        "Preparamos el N-400 y reunimos la documentación de respaldo.",
        "Le preparamos para la entrevista y para el examen.",
        "Lo acompañamos a la entrevista de naturalización.",
      ],
      en: [
        "We review your dates: when you became a resident and how long you have been inside and outside the country.",
        "We go through your full record, including old arrests and closed cases.",
        "We prepare the N-400 and gather the supporting documents.",
        "We prepare you for the interview and the test.",
        "We attend the naturalisation interview with you.",
      ],
    },
    weHelp: {
      es: [
        "Revisamos su historial antes de presentar, para que la solicitud no abra un problema.",
        "Calculamos si sus viajes rompen la residencia continua.",
        "Preparamos la solicitud y la evidencia.",
        "Le preparamos para el examen y para las preguntas de la entrevista.",
        "Lo acompañamos a la entrevista.",
      ],
      en: [
        "We review your record before filing, so the application does not open a problem.",
        "We work out whether your trips break continuous residence.",
        "We prepare the application and the evidence.",
        "We prepare you for the test and for the interview questions.",
        "We attend the interview with you.",
      ],
    },
    faqs: [
      {
        q: { es: "Viajé fuera del país varios meses. ¿Me afecta?", en: "I travelled abroad for several months. Does that affect me?" },
        a: {
          es: "Puede afectar. La ley mira dos cosas distintas: la presencia física, que es la suma de días dentro del país, y la residencia continua, que se rompe con ausencias largas. Un viaje de más de seis meses levanta preguntas y uno de un año o más normalmente rompe la continuidad, con algunas excepciones. Traiga sus fechas de salida y entrada a la consulta y las revisamos una por una.",
          en: "It can. The law looks at two different things: physical presence, which is the total days inside the country, and continuous residence, which is broken by long absences. A trip of more than six months raises questions, and one of a year or more normally breaks continuity, with some exceptions. Bring your entry and exit dates to the consultation and we go through them one by one.",
        },
      },
      {
        q: { es: "Tengo un caso viejo en mi historial. ¿Me descalifica?", en: "I have something old on my record. Does it disqualify me?" },
        a: {
          es: "Depende de qué fue, cuándo fue y cómo terminó. Algunas cosas son un impedimento permanente, otras solo importan dentro del período que la ley examina, y muchas no impiden nada pero hay que declararlas correctamente. Lo que sí es un problema serio es no declararlo. Traiga los documentos del caso, incluso si le dijeron que estaba borrado.",
          en: "It depends on what it was, when it was and how it ended. Some things are a permanent bar, others matter only within the period the law examines, and many do not prevent anything but must be disclosed correctly. What is a serious problem is not disclosing it. Bring the case documents, even if you were told the record was cleared.",
        },
      },
      {
        q: { es: "¿Mis hijos se hacen ciudadanos cuando yo me naturalizo?", en: "Do my children become citizens when I naturalise?" },
        a: {
          es: "Algunos sí, automáticamente, si son menores de 18, son residentes permanentes y viven bajo su custodia cuando usted se naturaliza. Se cumplen varias condiciones a la vez, así que conviene revisar la situación de cada hijo por separado.",
          en: "Some do, automatically, if they are under 18, are permanent residents, and live in your custody when you naturalise. Several conditions apply at once, so each child's situation is worth reviewing separately.",
        },
      },
    ],
    related: ["residencia-permanente", "peticiones-familiares"],
    title: {
      es: "Abogado de Ciudadanía en Orlando | Naturalización N-400",
      en: "Orlando Citizenship Lawyer | N-400 Naturalisation",
    },
    description: {
      es: "Naturalización N-400 en Orlando: requisitos de tiempo, residencia continua, buen carácter moral, examen de inglés y civismo, y la entrevista. En español.",
      en: "N-400 naturalisation in Orlando: time requirements, continuous residence, good moral character, the English and civics test, and the interview.",
    },
  },
  {
    id: "residencia-permanente", group: "residencia", status: "pending", order: 2,
    slug: { es: "residencia-permanente-orlando", en: "green-card-lawyer-orlando" },
    name: { es: "Residencia permanente", en: "Permanent residence" },
    evidence: "camulaw.com/servicios/green-card.",
    summary: { es: "", en: "" }, whoFor: { es: [], en: [] }, what: { es: "", en: "" },
    steps: { es: [], en: [] }, weHelp: { es: [], en: [] }, faqs: [],
    related: ["ciudadania", "ajuste-estatus"],
    title: { es: "Residencia Permanente en Orlando", en: "Green Card Lawyer in Orlando" },
    description: { es: "", en: "" },
  },
  {
    id: "deportacion",
    group: "corte",
    status: "pending",
    order: 1,
    slug: { es: "abogado-de-deportacion-orlando", en: "deportation-defense-orlando" },
    name: { es: "Defensa contra la deportación", en: "Deportation defence" },
    evidence: "camulaw.com/servicios/defensa-contra-la-deportacion; recurring Instagram content on court procedure. Confirm for the Orlando practice.",
    summary: {
      es: "Si recibió una Notice to Appear o ya tiene fecha en la corte, tiene un caso de deportación abierto y hay defensas que se pueden presentar. Campos Immigration Law representa a personas ante la Corte de Inmigración de Orlando, en 3535 Lawton Road. Llame al (407) 418-9193.",
      en: "If you have received a Notice to Appear, or already have a court date, you have an open removal case and there are defences that can be raised. Campos Immigration Law represents people at the Orlando Immigration Court, 3535 Lawton Road. Call (407) 418-9193.",
    },
    whoFor: {
      es: [
        "Recibió un documento llamado Notice to Appear.",
        "Tiene una fecha de audiencia en la corte de inmigración.",
        "Detuvieron a un familiar y quieren saber qué sigue.",
        "Le dieron una orden de deportación en ausencia porque no llegó a una audiencia.",
        "Entró al país y le pusieron en proceso en la frontera.",
      ],
      en: [
        "You received a document called a Notice to Appear.",
        "You have a hearing date at the immigration court.",
        "A relative has been detained and you need to know what comes next.",
        "You were ordered removed in absentia because you missed a hearing.",
        "You were placed in proceedings when you entered the country.",
      ],
    },
    what: {
      es: "Un proceso de deportación no es un juicio penal. Es un procedimiento administrativo ante un juez de inmigración, y usted tiene derecho a estar representado, aunque el gobierno no le da un abogado. La primera audiencia suele ser corta: el juez confirma quién es usted, si tiene abogado y qué va a solicitar. La audiencia de fondo, donde se decide el caso, viene después. Las defensas posibles dependen de su historia: asilo, cancelación de remoción, ajuste de estatus, VAWA, visa U, o pedir que se reabra un caso decidido en su ausencia.",
      en: "A removal case is not a criminal trial. It is an administrative proceeding before an immigration judge, and you have the right to be represented, though the government does not provide a lawyer. The first hearing is usually short: the judge confirms who you are, whether you have a lawyer, and what you intend to apply for. The individual hearing, where the case is decided, comes later. What defences exist depends on your history: asylum, cancellation of removal, adjustment of status, VAWA, a U visa, or asking to reopen a case decided in your absence.",
    },
    steps: {
      es: [
        "Revisamos su Notice to Appear y las fechas. Qué se le acusa y cuándo tiene que comparecer.",
        "Repasamos su historia completa: entradas, salidas, familia, tiempo en el país, antecedentes.",
        "Identificamos qué defensas están disponibles y cuál es la más fuerte.",
        "Presentamos las solicitudes y la evidencia dentro de los plazos de la corte.",
        "Lo acompañamos a la audiencia de calendario maestro y a la audiencia de fondo.",
      ],
      en: [
        "We read your Notice to Appear and the dates. What is alleged, and when you must appear.",
        "We go through your full history: entries, departures, family, time in the country, any record.",
        "We identify which defences are available and which is strongest.",
        "We file the applications and evidence within the court's deadlines.",
        "We appear with you at the master calendar hearing and at the individual hearing.",
      ],
    },
    weHelp: {
      es: [
        "Nos presentamos ante la corte como sus abogados, para que usted no llegue solo.",
        "Cumplimos los plazos de presentación, que en esta corte no se perdonan.",
        "Preparamos su testimonio con usted antes de la audiencia.",
        "Revisamos si hay opción de fianza cuando la persona está detenida.",
        "Le decimos con honestidad qué tan fuerte es su caso, incluso cuando no es lo que quiere oír.",
      ],
      en: [
        "We enter our appearance as your lawyers, so you do not arrive alone.",
        "We meet the filing deadlines, which this court does not forgive.",
        "We prepare your testimony with you before the hearing.",
        "We check whether bond is an option when someone is detained.",
        "We tell you honestly how strong your case is, even when that is not what you want to hear.",
      ],
    },
    faqs: [
      {
        q: { es: "¿Qué pasa si no voy a la audiencia?", en: "What happens if I do not go to the hearing?" },
        a: {
          es: "El juez puede ordenar su deportación en ausencia, sin escucharle. Es una de las cosas más graves que pueden pasar y una de las más comunes, porque muchas veces el aviso llegó a una dirección vieja. Si se mudó, hay que informar el cambio de dirección a la corte. Si ya le ordenaron la deportación en ausencia, a veces se puede pedir que reabran el caso, y el plazo importa.",
          en: "The judge can order you removed in absentia, without hearing you. It is one of the most serious things that can happen and one of the most common, because the notice often went to an old address. If you move, the change of address must be reported to the court. If you have already been ordered removed in absentia, it is sometimes possible to ask that the case be reopened, and the timing matters.",
        },
      },
      {
        q: { es: "¿Dónde queda la corte de inmigración de Orlando?", en: "Where is the Orlando Immigration Court?" },
        a: {
          es: "En 3535 Lawton Road, Suite 200, Orlando, FL 32803. Llegue con tiempo: hay control de seguridad. Lleve identificación y todos los papeles que le haya enviado la corte o el gobierno.",
          en: "At 3535 Lawton Road, Suite 200, Orlando, FL 32803. Arrive early: there is a security screening. Bring identification and every paper the court or the government has sent you.",
        },
      },
      {
        q: { es: "¿Puedo pedirle al juez tiempo para buscar abogado?", en: "Can I ask the judge for time to find a lawyer?" },
        a: {
          es: "Normalmente sí, sobre todo en la primera audiencia. Los jueces suelen conceder una prórroga para que la persona consiga representación. No es ilimitado y no conviene pedirlo varias veces, así que use ese tiempo.",
          en: "Usually yes, particularly at the first hearing. Judges commonly grant a continuance so that someone can obtain representation. It is not unlimited and asking repeatedly is unwise, so use that time.",
        },
      },
    ],
    related: ["asilo", "vawa", "peticiones-familiares"],
    title: {
      es: "Abogado de Deportación en Orlando | Defensa en Corte",
      en: "Orlando Deportation Defense Attorney | Removal Cases",
    },
    description: {
      es: "Defensa contra la deportación en la Corte de Inmigración de Orlando. Notice to Appear, audiencias, fianza y opciones de alivio, explicadas en español.",
      en: "Removal defence at the Orlando Immigration Court. Notice to Appear, hearings, bond and the available forms of relief, explained plainly.",
    },
  },
  {
    id: "fianza", group: "corte", status: "draft", order: 2,
    slug: { es: "fianza-de-inmigracion-orlando", en: "immigration-bond-orlando" },
    name: { es: "Fianza de inmigración", en: "Immigration bond" },
    evidence: "Not published on either site. Designed into the architecture; needs confirmation.",
    summary: { es: "", en: "" }, whoFor: { es: [], en: [] }, what: { es: "", en: "" },
    steps: { es: [], en: [] }, weHelp: { es: [], en: [] }, faqs: [],
    related: ["deportacion"],
    title: { es: "Fianza de Inmigración en Orlando", en: "Immigration Bond Lawyer in Orlando" },
    description: { es: "", en: "" },
  },
  {
    id: "perdon-i601a", group: "perdones", status: "draft", order: 1,
    slug: { es: "perdon-i-601a-orlando", en: "i-601a-waiver-orlando" },
    name: { es: "Perdón provisional", en: "Provisional waiver" }, form: "I-601A",
    evidence: "Not a listed service on either site, but covered repeatedly in his Instagram content.",
    summary: { es: "", en: "" }, whoFor: { es: [], en: [] }, what: { es: "", en: "" },
    steps: { es: [], en: [] }, weHelp: { es: [], en: [] }, faqs: [],
    related: ["tramite-consular", "deportacion"],
    title: { es: "Perdón I-601A en Orlando", en: "I-601A Waiver Lawyer in Orlando" },
    description: { es: "", en: "" },
  },
  {
    id: "permiso-trabajo", group: "trabajo", status: "pending", order: 1,
    slug: { es: "permiso-de-trabajo-orlando", en: "work-permit-orlando" },
    name: { es: "Permiso de trabajo", en: "Work permit" }, form: "I-765",
    evidence: "camulaw.com/servicios/ead; consultation form option 'Employment Authorization'.",
    summary: { es: "", en: "" }, whoFor: { es: [], en: [] }, what: { es: "", en: "" },
    steps: { es: [], en: [] }, weHelp: { es: [], en: [] }, faqs: [],
    related: ["asilo", "daca"],
    title: { es: "Permiso de Trabajo en Orlando | I-765", en: "Work Permit Lawyer in Orlando | I-765" },
    description: { es: "", en: "" },
  },
  {
    id: "daca", group: "trabajo", status: "pending", order: 2,
    slug: { es: "daca-orlando", en: "daca-lawyer-orlando" },
    name: { es: "DACA", en: "DACA" }, form: "I-821D",
    evidence: "camulaw.com/servicios/daca; consultation form option 'DACA'.",
    summary: { es: "", en: "" }, whoFor: { es: [], en: [] }, what: { es: "", en: "" },
    steps: { es: [], en: [] }, weHelp: { es: [], en: [] }, faqs: [],
    related: ["permiso-trabajo"],
    title: { es: "Abogado de DACA en Orlando", en: "Orlando DACA Lawyer" },
    description: { es: "", en: "" },
  },
];

/* ------------------------------------------------------------------ helpers */

/**
 * Review builds.
 *
 * `PUBLIC_REVIEW_BUILD=1 npm run build` also renders matters whose status is
 * "pending" — those with real evidence that the attorney handles them, and
 * with drafted copy — so the client can judge page rhythm and content
 * architecture before confirming anything.
 *
 * Those pages carry a visible review banner and are excluded from the sitemap
 * and marked noindex, so a review build can never be mistaken for a launch.
 * The production default renders confirmed matters only, because Rule
 * 4-7.13(b)(4) forbids advertising practice areas the firm does not handle.
 */
export const IS_REVIEW_BUILD =
  import.meta.env.PUBLIC_REVIEW_BUILD === "1" || import.meta.env.PUBLIC_REVIEW_BUILD === "true";

const renderable = (m: Matter): boolean =>
  m.status === "live" || (IS_REVIEW_BUILD && m.status === "pending" && m.summary.es !== "");

export const isDraft = (m: Matter): boolean => m.status !== "live";

export const liveMatters = (): Matter[] =>
  MATTERS.filter(renderable).sort((a, b) => a.order - b.order);

export const mattersInGroup = (g: GroupId): Matter[] =>
  liveMatters().filter((m) => m.group === g);

/** Groups that have at least one live matter. Empty groups never render. */
export const liveGroups = (): Group[] =>
  GROUPS.filter((g) => mattersInGroup(g.id).length > 0).sort((a, b) => a.order - b.order);

export const matterById = (id: string): Matter | undefined =>
  MATTERS.find((m) => m.id === id);

export const groupById = (id: GroupId): Group | undefined =>
  GROUPS.find((g) => g.id === id);
