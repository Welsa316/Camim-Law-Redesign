/**
 * The firm's services.
 *
 * Names come from Campos Muños Law's site (camulaw.com) and its ES/EN
 * dictionaries, on the client's instruction of 2026-09-10 that this firm's
 * services mirror that firm's. One-line descriptions and page text are
 * reworded from that site, and for the Spanish asylum page from camimlaw.com's
 * own asylum page, on the client's instruction of 2026-09-26 that the pages
 * not match the sister firm's word for word, with the legal meaning kept.
 * Every reworded string sits next to the source text it restates in
 * docs/sources/paraphrases.json. Blocks that named the sister firm, its city
 * or state stay omitted (docs/sources/omissions.json).
 * verify/copy-provenance.py checks every rendered string against the sources
 * under docs/sources/.
 *
 * Written by scripts/build-services.py from docs/sources/paraphrases.json;
 * edit that file and rerun the script rather than editing this one.
 */

export type Block =
  | { type: "heading" | "subheading" | "paragraph"; text: string }
  | { type: "list"; items: string[] };

export interface Service {
  id: string;
  order: number;
  /** camulaw.com's slug, used for both languages. */
  slug: string;
  featured: boolean;
  name: { es: string; en: string };
  line: { es: string; en: string };
  blocks: { es: Block[]; en: Block[] };
  related: string[];
  source: string;
  /**
   * Stock photograph for the home accordion, on the client's instruction of
   * 2026-09-10 (Unsplash first, the sister site's images as fallback). Each is
   * under the Unsplash License; photographer and page are recorded here and
   * in docs/sources/images.json. Decorative: the panel's text is the link, so
   * the image carries an empty alt and no written description.
   */
  image?: { src: string; width: number; height: number; focus: string; credit: string; page: string };
}

export const SERVICES: Service[] = [
  {
    "id": "greenCard",
    "order": 1,
    "slug": "green-card",
    "featured": true,
    "name": {
      "es": "Green Card",
      "en": "Green Card"
    },
    "line": {
      "es": "Acompañamos y representamos a nuestros clientes en el proceso de obtener la residencia permanente legal, ya sea por la vía familiar, por empleo o por otras opciones disponibles.",
      "en": "We guide and represent clients through the process of obtaining lawful permanent residence, whether through family, employment, or other available options."
    },
    "blocks": {
      "es": [
        {
          "type": "heading",
          "text": "¿En qué consiste la Green Card (residencia permanente)?"
        },
        {
          "type": "paragraph",
          "text": "Para un inmigrante, conseguir la green card es uno de los momentos más importantes de su vida: representa estabilidad, nuevas oportunidades y la posibilidad de construir su futuro en los Estados Unidos. Con la residencia permanente puede vivir y trabajar en el país de forma indefinida, y se abre el camino hacia la ciudadanía. Solo la ciudadanía ofrece una protección migratoria mayor."
        },
        {
          "type": "heading",
          "text": "Vías para llegar a la residencia"
        },
        {
          "type": "paragraph",
          "text": "Hay más de una vía hacia la residencia permanente; las más frecuentes son las peticiones familiares, las peticiones basadas en el empleo y ciertos procesos humanitarios. Ningún caso es igual a otro: la elegibilidad depende, entre otros factores, de cómo ingresó al país, de su historial migratorio, de sus antecedentes personales y de su relación con la persona que presenta la petición."
        },
        {
          "type": "heading",
          "text": "Obstáculos y posibles complicaciones"
        },
        {
          "type": "paragraph",
          "text": "El trámite puede complicarse cuando hay entradas sin inspección, salidas prolongadas del país, antecedentes penales o casos migratorios mal manejados en el pasado. Hasta un error pequeño o un documento incompleto puede provocar retrasos importantes o una negación."
        }
      ],
      "en": [
        {
          "type": "heading",
          "text": "What Is Permanent Residence (the Green Card)?"
        },
        {
          "type": "paragraph",
          "text": "For an immigrant, obtaining a green card is one of the most significant milestones in life, bringing stability, new opportunities, and the chance to build a future in the United States. With permanent residence you can live and work in the country indefinitely, and the path to citizenship opens up. Only citizenship offers stronger immigration protection."
        },
        {
          "type": "heading",
          "text": "Ways to Become a Permanent Resident"
        },
        {
          "type": "paragraph",
          "text": "Permanent residence can be reached in more than one way; the most frequent are family petitions, employment-based petitions, and certain humanitarian processes. No two cases are alike: eligibility turns on factors that include how you entered the country, your immigration history, your personal background, and your relationship to the person filing the petition, among others."
        },
        {
          "type": "heading",
          "text": "Obstacles and Possible Complications"
        },
        {
          "type": "paragraph",
          "text": "The process can get complicated where there are entries without inspection, long absences from the country, criminal records, or immigration cases mishandled in the past. Even a small error or an incomplete document can lead to significant delays or a denial."
        }
      ]
    },
    "related": [
      "ciudadania",
      "peticiones-familiares",
      "ead"
    ],
    "source": "camulaw.com/servicios/green-card; names and lines from the site's ES/EN dictionaries; practice confirmed by client instruction 2026-09-10 (services mirror Campos Muños Law LLC); text reworded 2026-09-26 (docs/sources/paraphrases.json)",
    "image": {
      "src": "/img/services/green-card.jpg",
      "width": 2000,
      "height": 1334,
      "focus": "50% 45%",
      "credit": "Jakub Żerdzicki (@jakubzerdzicki), Unsplash License",
      "page": "https://unsplash.com/photos/hand-holding-keys-with-house-keychain-V7Q94jc04wQ"
    }
  },
  {
    "id": "peticionesFamiliares",
    "order": 2,
    "slug": "peticiones-familiares",
    "featured": true,
    "name": {
      "es": "Peticiones Familiares",
      "en": "Family Petitions"
    },
    "line": {
      "es": "A través de una petición familiar, ciudadanos y residentes permanentes pueden solicitar a ciertos familiares para que obtengan estatus legal y residencia permanente en EE. UU.",
      "en": "With a family petition, citizens and permanent residents can ask for certain relatives to receive legal status and permanent residence in the U.S."
    },
    "blocks": {
      "es": [
        {
          "type": "heading",
          "text": "¿En qué consisten las peticiones familiares?"
        },
        {
          "type": "paragraph",
          "text": "La reunificación familiar es uno de los pilares sobre los que descansa el sistema migratorio estadounidense. Mediante una petición familiar, los ciudadanos estadounidenses y los residentes permanentes pueden pedir la residencia para ciertos parientes y así vivir con sus seres queridos y formar un hogar estable y seguro."
        },
        {
          "type": "heading",
          "text": "¿Quién puede presentar una petición y para quién?"
        },
        {
          "type": "paragraph",
          "text": "Un ciudadano estadounidense puede pedir a su cónyuge, a sus hijos, a sus hermanos y a sus padres, y cuando se trata de los hijos, ni la edad ni el estado civil son un obstáculo. Un residente permanente, en cambio, puede pedir a su cónyuge y a sus hijos de cualquier edad, con la condición de que sigan solteros."
        },
        {
          "type": "heading",
          "text": "Peticiones por matrimonio"
        },
        {
          "type": "paragraph",
          "text": "Si la petición se basa en un matrimonio, es necesario demostrar que la relación es auténtica y de buena fe; por eso USCIS revisa a fondo la historia de la pareja y las pruebas que usted presente."
        },
        {
          "type": "heading",
          "text": "Obstáculos y posibles complicaciones"
        },
        {
          "type": "paragraph",
          "text": "Un caso puede complicarse si hay matrimonios anteriores, divorcios, hijos de relaciones previas, entradas sin inspección, domicilios distintos o antecedentes migratorios o penales. Asimismo, las solicitudes mal preparadas en el pasado pueden provocar retrasos o consecuencias negativas cuando se decida su caso."
        }
      ],
      "en": [
        {
          "type": "heading",
          "text": "What Is a Family Petition?"
        },
        {
          "type": "paragraph",
          "text": "Family reunification is one of the foundations on which the U.S. immigration system rests. With a family petition, U.S. citizens and permanent residents can request residency for certain relatives, making it possible to live with their loved ones and build a stable, secure home."
        },
        {
          "type": "heading",
          "text": "Who May File, and for Whom?"
        },
        {
          "type": "paragraph",
          "text": "A U.S. citizen may petition for a spouse, children, siblings, and parents, and where children are concerned, neither age nor marital status is a barrier. A permanent resident, by contrast, may petition for a spouse and for children of any age, as long as those children remain unmarried."
        },
        {
          "type": "heading",
          "text": "Petitions Based on Marriage"
        },
        {
          "type": "paragraph",
          "text": "If a petition is based on a marriage, it must be shown that the relationship is genuine and entered into in good faith, which is why USCIS reviews the couple’s history and the evidence you submit in detail."
        },
        {
          "type": "heading",
          "text": "Obstacles and Possible Complications"
        },
        {
          "type": "paragraph",
          "text": "A case can become complicated if there are prior marriages, divorces, children from earlier relationships, entries without inspection, separate addresses, or immigration or criminal records. Poorly prepared applications from the past can also cause delays or unfavorable outcomes when your case is decided."
        }
      ]
    },
    "related": [
      "green-card",
      "ciudadania",
      "visas-de-prometido"
    ],
    "source": "camulaw.com/servicios/peticiones-familiares; names and lines from the site's ES/EN dictionaries; practice confirmed by client instruction 2026-09-10 (services mirror Campos Muños Law LLC); text reworded 2026-09-26 (docs/sources/paraphrases.json)",
    "image": {
      "src": "/img/services/peticiones-familiares.jpg",
      "width": 2000,
      "height": 1333,
      "focus": "50% 50%",
      "credit": "rfp80 (@rfp80), Unsplash License",
      "page": "https://unsplash.com/photos/a-group-of-people-looking-out-a-window-at-an-airplane-cKN6mJqP43U"
    }
  },
  {
    "id": "ciudadania",
    "order": 3,
    "slug": "ciudadania",
    "featured": true,
    "name": {
      "es": "Ciudadanía",
      "en": "Citizenship"
    },
    "line": {
      "es": "Lo acompañamos en cada etapa del camino hacia la ciudadanía estadounidense: desde la solicitud hasta la entrevista y el examen de naturalización.",
      "en": "We walk with you through every stage of becoming a U.S. citizen, from the application to the interview and the naturalization exam."
    },
    "blocks": {
      "es": [
        {
          "type": "heading",
          "text": "¿Qué significa ser ciudadano estadounidense?"
        },
        {
          "type": "paragraph",
          "text": "Hacerse ciudadano es, para muchas personas, bastante más que un trámite: significa tranquilidad, dejar atrás el miedo y la seguridad de pertenecer por completo a los Estados Unidos. No existe un estatus migratorio más sólido que la ciudadanía, que le permite votar, pedir a ciertos familiares, viajar con más libertad y, ante todo, vivir sin incertidumbre. Para quien ya es residente permanente, suele marcar el final de un camino largo y, con frecuencia, lleno de sacrificios."
        },
        {
          "type": "heading",
          "text": "Qué se necesita para solicitar la ciudadanía"
        },
        {
          "type": "paragraph",
          "text": "En general, para naturalizarse hay que haber sido residente permanente durante cierto tiempo y haber mantenido presencia física y residencia continua en el país. Además, se debe demostrar buen carácter moral y aprobar los exámenes de inglés y de educación cívica. Con todo, la elegibilidad de cada persona depende de su historia migratoria y personal, así que conviene revisarla con atención antes de empezar."
        },
        {
          "type": "heading",
          "text": "Obstáculos y posibles complicaciones"
        },
        {
          "type": "paragraph",
          "text": "Puede parecer un trámite sencillo, pero muchas solicitudes se topan con retrasos y obstáculos. Las entradas previas al país, los antecedentes penales —por antiguos que sean—, los viajes largos fuera de los Estados Unidos, los asuntos pendientes con el IRS o las inconsistencias con casos anteriores pueden complicar el proceso. En ciertos casos, presentar la solicitud en un mal momento puede incluso suponer un riesgo."
        }
      ],
      "en": [
        {
          "type": "heading",
          "text": "What Does It Mean to Be a U.S. Citizen?"
        },
        {
          "type": "paragraph",
          "text": "For many people, becoming a citizen is far more than a formality: it means peace of mind, leaving fear behind, and the security of belonging fully to the United States. No immigration status is stronger than citizenship, which lets you vote, petition for certain relatives, travel more freely, and, above all, live without uncertainty. For someone who is already a permanent resident, it often marks the end of a long road, frequently one of sacrifice."
        },
        {
          "type": "heading",
          "text": "What You Need to Apply for Citizenship"
        },
        {
          "type": "paragraph",
          "text": "In general, naturalization requires having been a permanent resident for a certain period and having maintained continuous residence and physical presence in the country. You also need to demonstrate good moral character and pass the English and civics exams. Still, each person’s eligibility depends on their immigration and personal history, so it is worth reviewing closely before you start."
        },
        {
          "type": "heading",
          "text": "Obstacles and Possible Complications"
        },
        {
          "type": "paragraph",
          "text": "It may look like a simple procedure, but many applications meet delays and obstacles. Prior entries to the country, criminal records however old, long trips outside the United States, unresolved matters with the IRS, or inconsistencies with earlier cases can all complicate things. In certain situations, filing at the wrong moment can even carry risk."
        }
      ]
    },
    "related": [
      "green-card",
      "peticiones-familiares"
    ],
    "source": "camulaw.com/servicios/ciudadania; names and lines from the site's ES/EN dictionaries; practice confirmed by client instruction 2026-09-10 (services mirror Campos Muños Law LLC); text reworded 2026-09-26 (docs/sources/paraphrases.json)",
    "image": {
      "src": "/img/services/ciudadania.jpg",
      "width": 2000,
      "height": 1174,
      "focus": "55% 50%",
      "credit": "Kelly Sikkema (@kellysikkema), Unsplash License",
      "page": "https://unsplash.com/photos/passport-book-RiUZQOfQ8XE"
    }
  },
  {
    "id": "defensaDeportacion",
    "order": 4,
    "slug": "defensa-contra-la-deportacion",
    "featured": true,
    "name": {
      "es": "Defensa Contra la Deportación",
      "en": "Deportation Defense"
    },
    "line": {
      "es": "Representamos ante los tribunales de inmigración a personas que enfrentan un proceso de deportación, y preparamos defensas sólidas para proteger su derecho a permanecer en los Estados Unidos.",
      "en": "We represent people in deportation proceedings before immigration court, building strong defenses to protect their right to remain in the United States."
    },
    "blocks": {
      "es": [
        {
          "type": "heading",
          "text": "¿En qué consiste la defensa contra la deportación?"
        },
        {
          "type": "paragraph",
          "text": "Si recibe una Notificación de Comparecencia (Notice to Appear) ante la corte de inmigración, significa que está en un proceso de deportación. Es normal sentir miedo, pero tener una audiencia no quiere decir necesariamente que su caso esté perdido. La defensa consiste en representar y proteger a quien debe presentarse ante un juez de inmigración, buscando las formas de alivio que, según el caso, le permitan quedarse legalmente en el país. A veces, la mejor estrategia es organizar un regreso ordenado al país de origen, con la posibilidad de volver por la vía legal."
        },
        {
          "type": "heading",
          "text": "Opciones de defensa, en términos generales"
        },
        {
          "type": "paragraph",
          "text": "A su situación podrían aplicarse diversos alivios, como las solicitudes humanitarias, la cancelación de la deportación, los ajustes de estatus y, en ciertos casos, las peticiones de discreción dirigidas a la fiscalía o a la corte. Cuál conviene más depende, entre otros factores, del tiempo que lleve residiendo en el país, de sus vínculos familiares y de su historial migratorio y criminal."
        },
        {
          "type": "heading",
          "text": "Obstáculos y posibles complicaciones"
        },
        {
          "type": "paragraph",
          "text": "Los procesos ante la corte de inmigración son muy técnicos y están sujetos a plazos estrictos. Un error de procedimiento, no contar con una estrategia o desconocer las consecuencias legales puede terminar en una orden de deportación. Por eso es indispensable una evaluación legal minuciosa."
        }
      ],
      "en": [
        {
          "type": "heading",
          "text": "What Does Deportation Defense Involve?"
        },
        {
          "type": "paragraph",
          "text": "If you receive a Notice to Appear in immigration court, you are in removal proceedings. It is natural to feel afraid, but a hearing does not necessarily mean your case is lost. Deportation defense means representing and protecting those who must appear before an immigration judge, and pursuing the forms of relief that, depending on the case, may let you remain in the country lawfully. Sometimes the best strategy is to arrange an orderly return to your home country, with the possibility of coming back through legal channels."
        },
        {
          "type": "heading",
          "text": "Defense Options in General"
        },
        {
          "type": "paragraph",
          "text": "Various forms of relief might apply to your situation, among them humanitarian applications, cancellation of removal, adjustments of status and, in certain cases, requests for discretion directed to the prosecutor or the court. Which option fits best depends on factors including how long you have lived in the country, your family ties, and your immigration and criminal history, among others."
        },
        {
          "type": "heading",
          "text": "Obstacles and Possible Complications"
        },
        {
          "type": "paragraph",
          "text": "Immigration court proceedings are highly technical and subject to strict deadlines. A procedural error, the absence of a clear strategy, or a misreading of the legal consequences can end in an order of removal. That is why a careful legal evaluation is essential."
        }
      ]
    },
    "related": [
      "asilo",
      "daca",
      "vawa"
    ],
    "source": "camulaw.com/servicios/defensa-contra-la-deportacion; names and lines from the site's ES/EN dictionaries; practice confirmed by client instruction 2026-09-10 (services mirror Campos Muños Law LLC); text reworded 2026-09-26 (docs/sources/paraphrases.json)",
    "image": {
      "src": "/img/services/defensa-contra-la-deportacion.jpg",
      "width": 2000,
      "height": 1500,
      "focus": "50% 55%",
      "credit": "fotomagi (@fotomagi), Unsplash License",
      "page": "https://unsplash.com/photos/an-empty-courtroom-with-wooden-paneling-and-columns-Bh6u25Qv9qA"
    }
  },
  {
    "id": "visasJovenes",
    "order": 5,
    "slug": "visas-especial-para-jovenes",
    "featured": false,
    "name": {
      "es": "Visas Especial para Jóvenes",
      "en": "Special Immigrant Juvenile Visas"
    },
    "line": {
      "es": "La Visa Especial para Jóvenes (SIJS) es una protección para menores de 21 años que han sufrido abandono, maltrato o descuido, y les permite solicitar la residencia permanente en EE. UU.",
      "en": "Special Immigrant Juvenile Status (SIJS) is a protection for young people under 21 who have suffered abandonment, abuse, or neglect, and it lets them apply for permanent residence in the U.S."
    },
    "blocks": {
      "es": [
        {
          "type": "heading",
          "text": "¿En qué consiste la Visa Especial para Jóvenes?"
        },
        {
          "type": "paragraph",
          "text": "La Visa Especial para Jóvenes (SIJS) es una figura migratoria creada para proteger a menores que han sufrido abandono, maltrato o negligencia de parte de uno o de ambos padres. Si un niño o adolescente no vive con sus padres por alguno de estos motivos, la ley puede ofrecerle un camino hacia la residencia permanente, y con el tiempo este estatus también le permite aspirar a la ciudadanía estadounidense."
        },
        {
          "type": "heading",
          "text": "Qué se necesita para calificar"
        },
        {
          "type": "paragraph",
          "text": "Para obtener este beneficio, se necesita una orden de una corte estatal que determine que el menor no puede reunirse con uno o con ambos padres por abandono, abuso o negligencia. Esa misma resolución debe establecer que regresar a su país de origen no responde al interés superior del niño. También hay que cumplir requisitos de edad y normas migratorias específicas."
        },
        {
          "type": "heading",
          "text": "Obstáculos y posibles complicaciones"
        },
        {
          "type": "paragraph",
          "text": "Son casos especialmente delicados, ya que intervienen dos autoridades distintas: la corte estatal y USCIS. Son trámites en los que el tiempo importa y de gran complejidad legal. Un error en la orden judicial, hallazgos poco claros o cualquier demora pueden poner en riesgo el resultado."
        }
      ],
      "en": [
        {
          "type": "heading",
          "text": "What Does the Special Immigrant Juvenile Visa Involve?"
        },
        {
          "type": "paragraph",
          "text": "Special Immigrant Juvenile Status (SIJS) is an immigration protection created for minors who have suffered abandonment, mistreatment, or neglect by one or both parents. If a child no longer lives with a parent for one of these reasons, the law may offer a path toward permanent residence, and over time this status can also lead to eligibility for U.S. citizenship."
        },
        {
          "type": "heading",
          "text": "What It Takes to Qualify"
        },
        {
          "type": "paragraph",
          "text": "To obtain this benefit, the case needs an order from a state court finding that the child cannot be reunited with one or both parents due to abandonment, abuse, or neglect. The same ruling must establish that returning to the child’s home country is not in his or her best interest. Specific age requirements and immigration rules must also be met."
        },
        {
          "type": "heading",
          "text": "Obstacles and Possible Complications"
        },
        {
          "type": "paragraph",
          "text": "These cases are especially delicate because two separate authorities are involved: the state court and USCIS. They are time-sensitive and legally complex. A flaw in the court order, unclear findings, or any delay can put the outcome at risk."
        }
      ]
    },
    "related": [
      "asilo",
      "defensa-contra-la-deportacion",
      "green-card"
    ],
    "source": "camulaw.com/servicios/visas-especial-para-jovenes; names and lines from the site's ES/EN dictionaries; practice confirmed by client instruction 2026-09-10 (services mirror Campos Muños Law LLC); text reworded 2026-09-26 (docs/sources/paraphrases.json)"
  },
  {
    "id": "visasPrometido",
    "order": 6,
    "slug": "visas-de-prometido",
    "featured": false,
    "name": {
      "es": "Visas de Prometido(a)",
      "en": "Fiancé Visas"
    },
    "line": {
      "es": "Le acompañamos en el trámite de la visa de prometido(a) para que pueda reunirse con su pareja, ciudadana estadounidense, y contraer matrimonio legalmente en EE. UU.",
      "en": "We help you through the fiancé(e) visa process so that you can be reunited with your U.S. citizen partner and marry lawfully in the United States."
    },
    "blocks": {
      "es": [
        {
          "type": "paragraph",
          "text": "Un ciudadano estadounidense comprometido con una persona extranjera, con la intención genuina de casarse y formar una vida en pareja, puede pedir una Visa de Prometido(a) (K-1). Esta visa permite que su pareja entre al país y que ambos se casen en un plazo de 90 días a partir de su llegada."
        },
        {
          "type": "paragraph",
          "text": "Lo ventajoso de esta visa es que, si la boda se celebra dentro de ese plazo, podrá pedirse de inmediato la residencia permanente (Green Card) para su pareja."
        },
        {
          "type": "heading",
          "text": "Qué exige la visa K-1"
        },
        {
          "type": "paragraph",
          "text": "De acuerdo con USCIS, usted puede ser elegible para traer a su prometido(a) a los Estados Unidos con una visa K-1 si reúne estas condiciones:"
        },
        {
          "type": "list",
          "items": [
            "Usted tiene la ciudadanía estadounidense.",
            "Ambos tienen la intención de casarse en un plazo de 90 días desde que su prometido(a) sea admitido(a) en los Estados Unidos con una visa K-1 de no inmigrante.",
            "Ambos tienen libertad legal para casarse: los dos pueden contraer matrimonio legalmente en los Estados Unidos, y cualquier matrimonio anterior terminó legalmente por divorcio, fallecimiento o anulación.",
            "Se han visto en persona por lo menos una vez en los 2 años previos a la presentación de la petición. Puede pedir una exención de este requisito si demuestra que el encuentro en persona violaría costumbres estrictas y de larga tradición de la cultura o práctica social extranjera de su prometido(a), o le causaría a usted, como ciudadano(a) peticionario(a), una dificultad extrema."
          ]
        },
        {
          "type": "heading",
          "text": "¿Cuáles son los pasos para traer a su prometido(a) a los Estados Unidos con una visa K-1?"
        },
        {
          "type": "subheading",
          "text": "Paso 1 – La petición"
        },
        {
          "type": "paragraph",
          "text": "Siguiendo sus instrucciones, llene el Formulario I-129F para dejar constancia de su relación con el ciudadano extranjero. USCIS puede pedir documentos, formales o informales, que prueben la relación. Si reconoce la relación y aprueba la petición, el formulario pasa al Centro Nacional de Visas (NVC). Si no la aprueba, se le informarán los motivos de la negación."
        },
        {
          "type": "paragraph",
          "text": "El NVC le dará un número de caso y enviará la petición a la embajada o el consulado estadounidense en el país de su prometido(a)."
        },
        {
          "type": "subheading",
          "text": "Paso 2 – La solicitud de visa"
        },
        {
          "type": "paragraph",
          "text": "Cuando la embajada recibe el formulario, cita a su prometido(a) a una entrevista. Es importante que se presente el día fijado con todos los formularios y documentos que se le pidan."
        },
        {
          "type": "paragraph",
          "text": "En la entrevista, un oficial del Departamento de Estado decidirá si la relación es genuina y si su prometido(a) califica para la visa K-1. Si la visa se aprueba, su prometido(a) tendrá que viajar a los Estados Unidos para seguir con el proceso."
        },
        {
          "type": "subheading",
          "text": "Paso 3 – Ajuste de estatus"
        },
        {
          "type": "paragraph",
          "text": "Si se casan dentro de los 90 días siguientes a la entrada, su pareja puede pedir la residencia permanente (Green Card) presentando el Formulario I-485."
        },
        {
          "type": "paragraph",
          "text": "Al igual que en los pasos anteriores, USCIS puede pedir más información sobre el matrimonio antes de programar la entrevista para aprobar la residencia permanente."
        },
        {
          "type": "heading",
          "text": "¿Y si mi prometido(a) tiene hijos? ¿Pueden venir a los Estados Unidos?"
        },
        {
          "type": "paragraph",
          "text": "Los hijos de su prometido(a) que sean solteros y menores de 21 años califican para una visa K-2."
        },
        {
          "type": "paragraph",
          "text": "No olvide anotar sus nombres en el Formulario I-129F."
        },
        {
          "type": "paragraph",
          "text": "Si ustedes se casan dentro de los 90 días posteriores a la entrada, los hijos que llegaron con visa K-2 también pueden pedir la residencia permanente (Green Card)."
        }
      ],
      "en": [
        {
          "type": "paragraph",
          "text": "A U.S. citizen who is engaged to a foreign national, and who genuinely intends to marry and build a life together as a couple, may request a Fiancé(e) Visa (K-1). The visa lets the partner enter the country so the two can marry within 90 days of arrival."
        },
        {
          "type": "paragraph",
          "text": "What makes this visa useful is that, if the wedding takes place within that window, permanent residence (Green Card) can be requested for your partner right away."
        },
        {
          "type": "heading",
          "text": "What the K-1 Visa Requires"
        },
        {
          "type": "paragraph",
          "text": "USCIS states that you may be eligible to bring your fiancé(e) to the United States on a K-1 visa when you meet each of these requirements:"
        },
        {
          "type": "list",
          "items": [
            "You hold U.S. citizenship.",
            "You both intend to marry within 90 days of your fiancé(e) being admitted to the United States on a nonimmigrant K-1 visa.",
            "You are both legally free to marry: each of you can lawfully marry in the United States, and any earlier marriage has ended legally through divorce, death, or annulment.",
            "You have met in person at least once in the 2 years before filing the petition. You can request a waiver of this requirement if you show that meeting in person would violate strict, long-established customs of your fiancé(e)’s foreign culture or social practice, or would cause extreme hardship to you, the U.S. citizen petitioner."
          ]
        },
        {
          "type": "heading",
          "text": "What Are the Steps to Bring Your Fiancé(e) to the United States on a K-1 Visa?"
        },
        {
          "type": "subheading",
          "text": "Step 1 — The Petition"
        },
        {
          "type": "paragraph",
          "text": "Fill out Form I-129F according to its instructions to record your relationship with the foreign national. USCIS may ask for formal or informal documentation proving the relationship. If USCIS recognizes the relationship and approves the petition, the form is sent on to the National Visa Center (NVC). If it is not approved, you will be told the reasons for the denial."
        },
        {
          "type": "paragraph",
          "text": "The NVC will assign you a case number and send the petition on to the U.S. embassy or consulate in your fiancé(e)’s country."
        },
        {
          "type": "subheading",
          "text": "Step 2 — The Visa Application"
        },
        {
          "type": "paragraph",
          "text": "When the embassy receives the form, it schedules an interview for your fiancé(e). It is important for your fiancé(e) to attend on the scheduled date with every required form and document."
        },
        {
          "type": "paragraph",
          "text": "At the interview, a Department of State officer decides whether the relationship is genuine and whether your fiancé(e) qualifies for a K-1 visa. If the visa is approved, your fiancé(e) must travel to the United States to continue the process."
        },
        {
          "type": "subheading",
          "text": "Step 3 — Adjustment of Status"
        },
        {
          "type": "paragraph",
          "text": "If the two of you marry within 90 days of entry, your partner may apply for permanent residence (Green Card) by filing Form I-485."
        },
        {
          "type": "paragraph",
          "text": "As with the earlier steps, USCIS may ask for more information about the marriage before it schedules an interview to approve permanent residence."
        },
        {
          "type": "heading",
          "text": "What If My Fiancé(e) Has Children? Can They Come to the United States?"
        },
        {
          "type": "paragraph",
          "text": "Your fiancé(e)’s children who are unmarried and under 21 qualify for a K-2 visa."
        },
        {
          "type": "paragraph",
          "text": "Make sure their names are listed on Form I-129F."
        },
        {
          "type": "paragraph",
          "text": "Children who entered on a K-2 visa may also apply for a green card, provided you and your fiancé(e) marry within 90 days of entry."
        }
      ]
    },
    "related": [
      "tramite-consular",
      "green-card",
      "peticiones-familiares"
    ],
    "source": "camulaw.com/servicios/visas-de-prometido; names and lines from the site's ES/EN dictionaries; practice confirmed by client instruction 2026-09-10 (services mirror Campos Muños Law LLC); text reworded 2026-09-26 (docs/sources/paraphrases.json)"
  },
  {
    "id": "asilo",
    "order": 7,
    "slug": "asilo",
    "featured": false,
    "name": {
      "es": "Asilo",
      "en": "Asylum"
    },
    "line": {
      "es": "Apoyamos legalmente a quienes buscan protección en los Estados Unidos por persecución o peligro en su país de origen, y llevamos cada caso con confidencialidad y cuidado.",
      "en": "We give legal support to people seeking protection in the United States from persecution or danger in their home country, and we handle each case with confidentiality and care."
    },
    "blocks": {
      "es": [
        {
          "type": "heading",
          "text": "¿Qué es el asilo?"
        },
        {
          "type": "paragraph",
          "text": "El asilo puede concederse a quien ya se encuentra en los Estados Unidos y no puede o no quiere volver a su país de origen a causa de la persecución, o de un temor fundado de persecución, por motivos de raza, religión, nacionalidad, pertenencia a un grupo social en particular u opinión política."
        },
        {
          "type": "paragraph",
          "text": "Quien obtiene el asilo puede vivir y trabajar en los Estados Unidos y, un año después de que se le conceda, puede solicitar la residencia permanente."
        },
        {
          "type": "paragraph",
          "text": "Si su cónyuge o sus hijos solteros menores de 21 años se encuentran en los Estados Unidos, puede incluirlos en su propia solicitud de asilo."
        },
        {
          "type": "heading",
          "text": "Asilo o refugio: ¿en qué se diferencian?"
        },
        {
          "type": "paragraph",
          "text": "La condición de asilado y la de refugiado están muy relacionadas; la diferencia principal está en el lugar donde se solicita el estatus."
        },
        {
          "type": "paragraph",
          "text": "El asilo se pide desde dentro de los Estados Unidos; el estatus de refugiado, desde fuera."
        },
        {
          "type": "paragraph",
          "text": "Aun así, toda persona a la que se concede asilo debe cumplir con la definición de refugiado. Si usted no califica para el asilo pero teme ser torturado si regresa a su país de origen, puede pedir que su caso se considere bajo la Convención contra la Tortura."
        },
        {
          "type": "paragraph",
          "text": "El Congreso ha limitado las solicitudes de asilo presentadas más de un año después de la llegada a los EE. UU., salvo que existan circunstancias extraordinarias o cambios importantes en la situación del solicitante."
        },
        {
          "type": "heading",
          "text": "Cómo se solicita el asilo"
        },
        {
          "type": "paragraph",
          "text": "Hay dos vías para pedir asilo. En las dos, la persona debe demostrar un “temor fundado” de persecución en su país de origen, en los términos explicados arriba."
        },
        {
          "type": "subheading",
          "text": "Asilo afirmativo"
        },
        {
          "type": "paragraph",
          "text": "Puede acudir al proceso afirmativo quien entró a los Estados Unidos con una visa, o el menor no acompañado que está físicamente presente en el país sin importar cómo entró, siempre que presente la solicitud dentro del primer año tras su llegada. También es posible pedir asilo en un puerto de entrada."
        },
        {
          "type": "paragraph",
          "text": "En este proceso, es un oficial de asilo de USCIS quien decide si se concede el asilo en los Estados Unidos."
        },
        {
          "type": "paragraph",
          "text": "El oficial puede conceder el asilo o remitir el caso a un juez de inmigración. Si lo remite, el solicitante tendrá una nueva oportunidad de probar su elegibilidad ante el juez."
        },
        {
          "type": "subheading",
          "text": "Asilo defensivo"
        },
        {
          "type": "paragraph",
          "text": "El proceso defensivo permite pedir asilo como defensa frente a la deportación, después de que la persona ha sido detenida por el Servicio de Inmigración y Control de Aduanas (ICE) o por la Oficina de Aduanas y Protección Fronteriza (CBP), o en cualquier puerto de entrada sin una visa válida."
        },
        {
          "type": "paragraph",
          "text": "En el proceso defensivo, la solicitud se presenta ante un tribunal de inmigración, y es un juez quien decide si concede el asilo."
        },
        {
          "type": "heading",
          "text": "Preguntas frecuentes sobre el asilo"
        },
        {
          "type": "subheading",
          "text": "¿Puede un asilado o refugiado volver a su país de origen?"
        },
        {
          "type": "paragraph",
          "text": "No se recomienda que los solicitantes de asilo ni los asilados vuelvan a su país de origen. El refugiado o asilado es alguien que se ha acogido a la protección de los Estados Unidos porque teme volver a su país ante una posible persecución o daño futuro allí. Quien tiene una solicitud de asilo pendiente puede pedir un documento de viaje únicamente para viajes cortos y de emergencia al extranjero. Sin esa aprobación previa, USCIS considerará abandonada la solicitud de asilo que esté abierta."
        },
        {
          "type": "subheading",
          "text": "¿Cuánto tarda el trámite de asilo en los Estados Unidos?"
        },
        {
          "type": "paragraph",
          "text": "Depende de la jurisdicción. USCIS cuenta con once oficinas de asilo en el país, cada una con su propia carga de casos, y las entrevistas se programan siguiendo un protocolo que fija USCIS."
        },
        {
          "type": "paragraph",
          "text": "En algunas jurisdicciones hay solicitantes que llevan muchos años esperando, mientras que a otros se les cita a entrevista antes de que pase un año."
        },
        {
          "type": "subheading",
          "text": "¿Pueden trabajar en los Estados Unidos quienes solicitan asilo?"
        },
        {
          "type": "paragraph",
          "text": "La ley sobre este punto está cambiando, y puede ser posible según el tipo de caso. En pocas palabras: una vez transcurrido cierto número de días con una solicitud pendiente y presentada correctamente, el solicitante puede pedir un documento de autorización de empleo. Ese permiso puede aprobarse por dos años y solo puede usarse con fines de empleo. Tenga en cuenta, además, que la tarjeta de autorización de empleo no sirve para viajar ni para volver a entrar a los EE. UU."
        },
        {
          "type": "paragraph",
          "text": "Antes de hacer cualquier plan de viaje con un caso de asilo pendiente, o para saber cómo solicitar la autorización de trabajo, hable con un abogado."
        },
        {
          "type": "subheading",
          "text": "¿Qué pasa si la oficina de asilo no concede el asilo después de la entrevista?"
        },
        {
          "type": "paragraph",
          "text": "Depende de la situación migratoria del solicitante. Si en el momento de la decisión tiene un estatus migratorio válido, podrá seguir en los EE. UU. con ese estatus. Si no lo tiene, el caso pasa al tribunal de inmigración, donde tendrá una nueva oportunidad de presentar su solicitud de asilo ante un juez de inmigración."
        }
      ],
      "en": [
        {
          "type": "heading",
          "text": "What Is Asylum?"
        },
        {
          "type": "paragraph",
          "text": "Someone already in the United States may be granted asylum if they are unable or unwilling to return to their home country because of persecution, or a well-founded fear of persecution, on account of race, religion, nationality, membership in a particular social group, or political opinion."
        },
        {
          "type": "paragraph",
          "text": "Once granted asylum, you may live and work in the United States, and one year after the grant you may apply for permanent residence."
        },
        {
          "type": "paragraph",
          "text": "If your spouse or unmarried children under 21 are in the United States, you can include them in your own asylum application."
        },
        {
          "type": "heading",
          "text": "Asylum or Refugee Status: What Is the Difference?"
        },
        {
          "type": "paragraph",
          "text": "Asylee and refugee status are closely linked, and what mainly separates them is where the person applies."
        },
        {
          "type": "paragraph",
          "text": "Asylum is sought from inside the United States; refugee status is sought from outside it."
        },
        {
          "type": "paragraph",
          "text": "Even so, everyone granted asylum must meet the definition of a refugee. If you do not qualify for asylum but fear being tortured if you return to your home country, you may ask to be considered under the Convention Against Torture."
        },
        {
          "type": "paragraph",
          "text": "Congress has limited asylum applications filed more than one year after arrival in the U.S., except where there are extraordinary circumstances or significant changes in the applicant’s situation."
        },
        {
          "type": "heading",
          "text": "How Asylum Is Requested"
        },
        {
          "type": "paragraph",
          "text": "There are two routes to asylum. In either one, the person must show a “well-founded fear” of persecution in their home country, as described above."
        },
        {
          "type": "subheading",
          "text": "Affirmative Asylum"
        },
        {
          "type": "paragraph",
          "text": "A person may use the affirmative process if they entered the United States on a visa, or if they are an unaccompanied child physically present in the country regardless of how they entered, as long as the application is filed within the first year after arrival. Asylum can also be requested at a port of entry."
        },
        {
          "type": "paragraph",
          "text": "In this process, a USCIS asylum officer decides whether asylum will be granted in the United States."
        },
        {
          "type": "paragraph",
          "text": "The officer may grant asylum or refer the case to an immigration judge. If it is referred, the applicant gets another opportunity to prove eligibility before the judge."
        },
        {
          "type": "subheading",
          "text": "Defensive Asylum"
        },
        {
          "type": "paragraph",
          "text": "The defensive process allows a person to seek asylum as a defense against deportation, after being detained by U.S. Immigration and Customs Enforcement (ICE) or U.S. Customs and Border Protection (CBP), or at any port of entry without a valid visa."
        },
        {
          "type": "paragraph",
          "text": "In the defensive process, the request is made before an immigration court, and a judge decides whether to grant asylum."
        },
        {
          "type": "heading",
          "text": "Asylum: Frequently Asked Questions"
        },
        {
          "type": "subheading",
          "text": "Can an Asylee or Refugee Go Back to Their Home Country?"
        },
        {
          "type": "paragraph",
          "text": "Asylum applicants and asylees are advised not to return to their home country. A refugee or asylee is someone who has sought the protection of the United States because they fear going back and facing future persecution or harm there. A person with a pending asylum application may request a travel document only for brief, emergency trips abroad. Without that prior approval, USCIS will consider an open asylum application abandoned."
        },
        {
          "type": "subheading",
          "text": "How Long Does the Asylum Process Take in the United States?"
        },
        {
          "type": "paragraph",
          "text": "It depends on the jurisdiction. USCIS has eleven asylum offices around the country, each with its own caseload, and interviews are scheduled according to a protocol set by USCIS."
        },
        {
          "type": "paragraph",
          "text": "In some jurisdictions applicants have been waiting for many years, while others are called for an interview within a year."
        },
        {
          "type": "subheading",
          "text": "Can Asylum Applicants Work in the United States?"
        },
        {
          "type": "paragraph",
          "text": "The law on this point is changing, and it may be possible depending on the type of case. In short, once a certain number of days have passed with a properly filed application pending, an applicant can apply for an employment authorization document. The permit may be approved for two years and may be used for employment purposes only. Keep in mind, too, that the work authorization card cannot be used to travel or to re-enter the U.S."
        },
        {
          "type": "paragraph",
          "text": "Talk to an attorney before making any travel plans while an asylum case is pending, or to learn how to apply for work authorization."
        },
        {
          "type": "subheading",
          "text": "What Happens If the Asylum Office Does Not Grant Asylum After the Interview?"
        },
        {
          "type": "paragraph",
          "text": "It depends on the applicant’s immigration situation. If they hold valid immigration status when the decision is made, they may remain in the U.S. under that status. If they do not, the case is referred to immigration court, where the applicant gets a new opportunity to present the asylum application before an immigration judge."
        }
      ]
    },
    "related": [
      "visa-t",
      "vawa",
      "defensa-contra-la-deportacion"
    ],
    "source": "camimlaw.com/asilo (es); camulaw.com/servicios/asilo (en); practice confirmed by client instruction 2026-09-10 (services mirror Campos Muños Law LLC); text reworded 2026-09-26 (docs/sources/paraphrases.json)"
  },
  {
    "id": "vawa",
    "order": 8,
    "slug": "vawa",
    "featured": false,
    "name": {
      "es": "VAWA",
      "en": "VAWA"
    },
    "line": {
      "es": "Ayudamos a víctimas de abuso cometido por un ciudadano estadounidense o residente permanente a pedir estatus legal de manera confidencial y sin depender del agresor.",
      "en": "We help people abused by a U.S. citizen or permanent resident seek legal status confidentially, without depending on the abuser."
    },
    "blocks": {
      "es": [
        {
          "type": "heading",
          "text": "¿En qué consiste VAWA?"
        },
        {
          "type": "paragraph",
          "text": "VAWA es una ley de inmigración que protege a quienes han sufrido abuso de un cónyuge, padre, madre o hijo que es ciudadano estadounidense o residente permanente. Y, sobre todo, le permite pedir la residencia permanente por sí mismo, sin que la persona que le hizo daño tenga que ayudarle, ni siquiera enterarse. Nadie debería tener que depender de su agresor para vivir en paz."
        },
        {
          "type": "heading",
          "text": "El abuso no siempre es físico"
        },
        {
          "type": "paragraph",
          "text": "Mucha gente no sabe que el abuso no se limita a lo físico: el abuso verbal, emocional, psicológico y económico también cuenta. Si le han maltratado, humillado, controlado con el dinero o incluso amenazado con llamar a inmigración, podría calificar."
        },
        {
          "type": "heading",
          "text": "¿Quién puede pedir la protección de VAWA?"
        },
        {
          "type": "paragraph",
          "text": "Pueden solicitarla quienes han sufrido abuso de su cónyuge ciudadano o residente, los hijos maltratados por su padre o madre ciudadano o residente, y los padres maltratados por un hijo ciudadano mayor de 21 años. Cada caso es distinto; lo fundamental es probar el vínculo familiar y el efecto que el abuso tuvo en usted."
        },
        {
          "type": "heading",
          "text": "Un proceso totalmente confidencial"
        },
        {
          "type": "paragraph",
          "text": "Son casos sensibles que requieren pruebas, declaraciones personales y un manejo muy cuidadoso. Y lo más importante: todo el proceso es confidencial; nadie tiene por qué enterarse, y menos aún su agresor."
        }
      ],
      "en": [
        {
          "type": "heading",
          "text": "What VAWA Is"
        },
        {
          "type": "paragraph",
          "text": "VAWA is an immigration law protecting people who have been abused by a spouse, parent, or child who is a U.S. citizen or permanent resident. Above all, it allows you to seek permanent residence on your own, without the person who hurt you having to help or even know about it. No one should have to depend on their abuser in order to live in peace."
        },
        {
          "type": "heading",
          "text": "Abuse Is Not Always Physical"
        },
        {
          "type": "paragraph",
          "text": "Many people are unaware that abuse is more than physical: verbal, emotional, psychological, and financial abuse count too. If you have been mistreated, humiliated, controlled through money, or even threatened with a call to immigration, you might qualify."
        },
        {
          "type": "heading",
          "text": "Who May Apply Under VAWA?"
        },
        {
          "type": "paragraph",
          "text": "People abused by their citizen or resident spouse, children mistreated by a citizen or resident parent, and parents abused by a citizen son or daughter over 21 can all apply. Each case is different; the key is proving the family relationship and how the abuse affected you."
        },
        {
          "type": "heading",
          "text": "A Fully Confidential Process"
        },
        {
          "type": "paragraph",
          "text": "These are sensitive cases that call for evidence, personal statements, and very careful handling. Most important of all, the whole process is confidential: no one needs to find out, least of all your abuser."
        }
      ]
    },
    "related": [
      "visa-u",
      "visa-t",
      "asilo"
    ],
    "source": "camulaw.com/servicios/vawa; names and lines from the site's ES/EN dictionaries; practice confirmed by client instruction 2026-09-10 (services mirror Campos Muños Law LLC); text reworded 2026-09-26 (docs/sources/paraphrases.json)"
  },
  {
    "id": "daca",
    "order": 9,
    "slug": "daca",
    "featured": false,
    "name": {
      "es": "DACA",
      "en": "DACA"
    },
    "line": {
      "es": "Ayudamos a los jóvenes que cumplen los requisitos a pedir o renovar DACA, que les da protección frente a la deportación y autorización para trabajar.",
      "en": "We help young people who meet the requirements apply for or renew DACA, which gives them protection from deportation and permission to work."
    },
    "blocks": {
      "es": [
        {
          "type": "paragraph",
          "text": "Esta política protege a casi un millón de jóvenes que entraron al país de forma ilegal siendo niños. No abre un camino hacia la ciudadanía, pero quienes se acogen a ella pueden obtener un número de Seguro Social y un permiso de trabajo."
        },
        {
          "type": "heading",
          "text": "Lo que ofrece DACA"
        },
        {
          "type": "paragraph",
          "text": "DACA puede transformar la vida de una persona, porque le abre mejores oportunidades de trabajo y de estudio. Su mayor beneficio es que permite obtener un número de Seguro Social y, en algunos estados, una licencia de conducir."
        },
        {
          "type": "paragraph",
          "text": "Con eso podrá solicitar atención médica, contratar servicios públicos a su nombre y hasta empezar a formar un historial de crédito."
        },
        {
          "type": "heading",
          "text": "¿Qué quiere decir “acción diferida” en DACA?"
        },
        {
          "type": "paragraph",
          "text": "En el derecho administrativo de los Estados Unidos, “acción diferida” es la forma técnica de decir que el beneficiario queda protegido temporalmente de la deportación."
        },
        {
          "type": "paragraph",
          "text": "Es una decisión discrecional de aplazar la expulsión de una persona, tomada como acto de discreción procesal. No constituye un estatus legal: es un aplazamiento indefinido de la deportación."
        },
        {
          "type": "heading",
          "text": "¿Solicitar DACA tiene riesgos?"
        },
        {
          "type": "paragraph",
          "text": "Iniciar la solicitud sin cumplir los criterios de elegibilidad puede llevar a que se la rechacen e incluso a que se acelere su proceso de deportación. Recuerde también que DACA es discrecional: las autoridades pueden decidir revocarlo en cualquier momento. Por eso es recomendable hablar con un abogado de inmigración antes de presentar la solicitud."
        },
        {
          "type": "heading",
          "text": "¿Pueden viajar al extranjero los beneficiarios de DACA?"
        },
        {
          "type": "paragraph",
          "text": "Sí. Algunos beneficiarios pueden pedir un permiso anticipado de viaje (Advance Parole), que les permite salir del país sin perder la protección de DACA."
        },
        {
          "type": "paragraph",
          "text": "Ahora bien, este documento no cubre todos los casos ni todos los motivos de viaje, así que confirme que es elegible antes de solicitarlo."
        }
      ],
      "en": [
        {
          "type": "paragraph",
          "text": "This policy protects nearly one million young people who came into the country unlawfully as children. It does not lead to citizenship, but those covered by it can obtain a Social Security number and a work permit."
        },
        {
          "type": "heading",
          "text": "What DACA Offers"
        },
        {
          "type": "paragraph",
          "text": "DACA can change someone’s life by opening up better work and education opportunities. Its greatest benefit is that recipients can get a Social Security number and, in some states, a driver’s license."
        },
        {
          "type": "paragraph",
          "text": "With these, you can apply for health care, put utilities in your own name, and even begin building a credit history."
        },
        {
          "type": "heading",
          "text": "“Deferred Action” in DACA: What Does It Mean?"
        },
        {
          "type": "paragraph",
          "text": "In U.S. administrative law, “deferred action” is a technical way of saying that the recipient is shielded from deportation for a time."
        },
        {
          "type": "paragraph",
          "text": "It is a discretionary decision to put off a person’s removal, made as an act of prosecutorial discretion. It is not a legal status; it is an indefinite postponement of deportation."
        },
        {
          "type": "heading",
          "text": "Does Applying for DACA Carry Risks?"
        },
        {
          "type": "paragraph",
          "text": "Starting an application without meeting the eligibility criteria can lead to a denial and may even speed up your deportation process. Remember, too, that DACA is discretionary: the authorities can decide to revoke it at any time. That is why it is advisable to consult an immigration attorney before you apply."
        },
        {
          "type": "heading",
          "text": "Can DACA Recipients Travel Abroad?"
        },
        {
          "type": "paragraph",
          "text": "Yes. Some recipients can apply for Advance Parole, which lets them leave the country without losing DACA protection."
        },
        {
          "type": "paragraph",
          "text": "This document does not cover every case or every reason for travel, though, so confirm that you are eligible before applying."
        }
      ]
    },
    "related": [
      "ead",
      "defensa-contra-la-deportacion",
      "green-card"
    ],
    "source": "camulaw.com/servicios/daca; names and lines from the site's ES/EN dictionaries; practice confirmed by client instruction 2026-09-10 (services mirror Campos Muños Law LLC); text reworded 2026-09-26 (docs/sources/paraphrases.json)"
  },
  {
    "id": "tramiteConsular",
    "order": 10,
    "slug": "tramite-consular",
    "featured": false,
    "name": {
      "es": "Trámite Consular",
      "en": "Consular Processing"
    },
    "line": {
      "es": "Le acompañamos en el trámite consular para obtener su visa desde su país de origen, y cuidamos que su solicitud cumpla todos los requisitos legales.",
      "en": "We help you through consular processing to obtain your visa from your home country, making sure your application meets every legal requirement."
    },
    "blocks": {
      "es": [
        {
          "type": "heading",
          "text": "¿En qué consiste el trámite consular?"
        },
        {
          "type": "paragraph",
          "text": "Mediante el trámite consular, su caso migratorio se resuelve desde su país de origen: en vez de hacer todo dentro de los Estados Unidos, usted se presenta en una embajada o consulado estadounidense en el extranjero para pedir su residencia."
        },
        {
          "type": "heading",
          "text": "Qué exige y cómo prepararse"
        },
        {
          "type": "paragraph",
          "text": "Ante las autoridades consulares, estos procesos requieren una preparación minuciosa. Antes de ir a la embajada o al consulado, es esencial que toda su documentación esté completa y se haya presentado correctamente."
        },
        {
          "type": "heading",
          "text": "Qué tener en cuenta al viajar al extranjero"
        },
        {
          "type": "paragraph",
          "text": "Si está en los Estados Unidos, salir al extranjero es un paso importante en su camino migratorio. Cualquier descuido al prepararse puede provocar errores, así que conviene cuidar cada detalle con tiempo."
        }
      ],
      "en": [
        {
          "type": "heading",
          "text": "What Is Involved in Consular Processing?"
        },
        {
          "type": "paragraph",
          "text": "Through consular processing, your immigration case is resolved from your home country: rather than completing everything inside the United States, you go to a U.S. embassy or consulate abroad to request your residency."
        },
        {
          "type": "heading",
          "text": "What It Requires, and How to Prepare"
        },
        {
          "type": "paragraph",
          "text": "Before consular authorities, these processes call for thorough preparation. It is essential that your documentation be complete and correctly submitted before you go to the embassy or consulate."
        },
        {
          "type": "heading",
          "text": "What to Consider Before Traveling Abroad"
        },
        {
          "type": "paragraph",
          "text": "If you are in the United States, going abroad is a significant step in your immigration journey. Any lapse in preparation can lead to errors, so it pays to attend to every detail ahead of time."
        }
      ]
    },
    "related": [
      "green-card",
      "visas-de-prometido",
      "peticiones-familiares"
    ],
    "source": "camulaw.com/servicios/tramite-consular; names and lines from the site's ES/EN dictionaries; practice confirmed by client instruction 2026-09-10 (services mirror Campos Muños Law LLC); text reworded 2026-09-26 (docs/sources/paraphrases.json)"
  },
  {
    "id": "ead",
    "order": 11,
    "slug": "ead",
    "featured": false,
    "name": {
      "es": "Permiso de Trabajo (EAD)",
      "en": "Employment Authorization (EAD)"
    },
    "line": {
      "es": "El permiso de trabajo permite a ciertos inmigrantes trabajar legalmente en los Estados Unidos mientras su caso migratorio está en trámite o si están en una categoría elegible. Le ayudamos a presentar la solicitud correctamente.",
      "en": "An employment authorization document, or work permit, lets certain immigrants work legally in the United States while their immigration case is pending or when they fall within an eligible category. We help you file the application correctly."
    },
    "blocks": {
      "es": [
        {
          "type": "heading",
          "text": "¿Cómo se consigue un permiso de trabajo?"
        },
        {
          "type": "paragraph",
          "text": "Un permiso de trabajo no es fácil de conseguir ni llega por sí solo. En la mayoría de los casos, las autoridades de inmigración solo lo conceden a quien ya tiene un caso en trámite. Por eso es esencial entender bien su situación antes de presentar cualquier solicitud."
        },
        {
          "type": "heading",
          "text": "Requisito: un caso de buena fe pendiente"
        },
        {
          "type": "paragraph",
          "text": "En general, para que se le tome en cuenta debe tener un caso de buena fe pendiente ante inmigración y ser elegible para el permiso. Como la elegibilidad depende de cada situación, lo recomendable es revisarla con un abogado de inmigración antes de dar cualquier paso."
        },
        {
          "type": "heading",
          "text": "Desconfíe de las ofertas engañosas"
        },
        {
          "type": "paragraph",
          "text": "Tenga cuidado con quien le ofrezca un permiso de trabajo sin conocer su caso. Pedir un beneficio al que no tiene derecho puede dañar seriamente su situación migratoria en vez de mejorarla. No se deje llevar por promesas fáciles."
        }
      ],
      "en": [
        {
          "type": "heading",
          "text": "How Is a Work Permit Obtained?"
        },
        {
          "type": "paragraph",
          "text": "A work permit is neither easy to get nor automatic. In most cases, immigration authorities grant one only to someone who already has a case under way. That is why it is essential to understand your situation fully before filing any application."
        },
        {
          "type": "heading",
          "text": "The Requirement: A Pending Good-Faith Case"
        },
        {
          "type": "paragraph",
          "text": "As a rule, to be considered you need a good-faith case pending with immigration and must be eligible for the permit. Since eligibility depends on each situation, it is wise to review yours with an immigration attorney before taking any step."
        },
        {
          "type": "heading",
          "text": "Watch Out for Misleading Offers"
        },
        {
          "type": "paragraph",
          "text": "Be careful with anyone who offers you a work permit without knowing your case. Applying for a benefit you are not entitled to can seriously damage your immigration situation instead of improving it. Do not be taken in by easy promises."
        }
      ]
    },
    "related": [
      "daca",
      "estatus-de-proteccion-temporal",
      "green-card"
    ],
    "source": "camulaw.com/servicios/ead; names and lines from the site's ES/EN dictionaries; practice confirmed by client instruction 2026-09-10 (services mirror Campos Muños Law LLC); text reworded 2026-09-26 (docs/sources/paraphrases.json)"
  },
  {
    "id": "tps",
    "order": 12,
    "slug": "estatus-de-proteccion-temporal",
    "featured": false,
    "name": {
      "es": "Estatus de Protección Temporal",
      "en": "Temporary Protected Status"
    },
    "line": {
      "es": "Ayudamos a las personas elegibles a solicitar o renovar el Estatus de Protección Temporal, que les permite vivir y trabajar legalmente en los EE. UU.",
      "en": "We help eligible people apply for or renew Temporary Protected Status, which allows them to live and work legally in the U.S."
    },
    "blocks": {
      "es": [
        {
          "type": "heading",
          "text": "¿Qué es el TPS dentro del sistema migratorio de los Estados Unidos?"
        },
        {
          "type": "paragraph",
          "text": "Como su nombre lo dice, el Estatus de Protección Temporal (TPS) es un estatus migratorio no permanente que se otorga a no ciudadanos en los Estados Unidos."
        },
        {
          "type": "paragraph",
          "text": "El Congreso de los EE. UU. creó el TPS en 1990, al reformar la Ley de Inmigración y Nacionalidad, por lo que es un beneficio migratorio relativamente reciente."
        },
        {
          "type": "paragraph",
          "text": "El TPS está dirigido a los ciudadanos de los países que designe el Congreso de los EE. UU. o el Departamento de Seguridad Nacional (DHS)."
        },
        {
          "type": "paragraph",
          "text": "Su finalidad es proteger a personas de países designados que podrían encontrarse con condiciones peligrosas o con dificultades importantes si volvieran a su país de origen."
        },
        {
          "type": "paragraph",
          "text": "Los Estados Unidos designan países para el TPS en respuesta a crisis humanitarias causadas por desastres naturales, conflictos armados, disturbios civiles, violencia generalizada u otras condiciones extraordinarias y temporales."
        },
        {
          "type": "paragraph",
          "text": "Normalmente, un país se designa para el TPS después de que el gobierno concluye que, dada su situación actual, no es seguro regresar a él."
        },
        {
          "type": "paragraph",
          "text": "En pocas palabras, el Gobierno de los Estados Unidos, por medio del Congreso o del Poder Ejecutivo, puede designar países para el Estatus de Protección Temporal (TPS) y dar a sus ciudadanos un estatus migratorio temporal que les permita quedarse legalmente en los Estados Unidos mientras sigan presentes las condiciones que motivaron la designación."
        },
        {
          "type": "heading",
          "text": "¿Quién puede recibir el TPS?"
        },
        {
          "type": "paragraph",
          "text": "En general, quien solicita el Estatus de Protección Temporal (TPS) debe cumplir tres requisitos básicos."
        },
        {
          "type": "paragraph",
          "text": "El primero es demostrar que es ciudadano del país designado, o una persona sin nacionalidad que residía habitualmente en ese país."
        },
        {
          "type": "paragraph",
          "text": "La manera más simple de probar la ciudadanía es con un pasaporte o un acta de nacimiento expedidos por las autoridades de ese país."
        },
        {
          "type": "paragraph",
          "text": "El segundo es demostrar que estaba físicamente presente en los Estados Unidos en la fecha en que se oficializó la designación del TPS."
        },
        {
          "type": "paragraph",
          "text": "Por lo general, el Departamento de Seguridad Nacional (DHS) publica un aviso en el Registro Federal que establece que los ciudadanos del país designado que estaban físicamente en EE. UU. antes de cierta fecha son elegibles para el estatus temporal."
        },
        {
          "type": "paragraph",
          "text": "Esa fecha suele ser anterior a la publicación oficial de la designación. La presencia física antes de la fecha fijada puede probarse de varias maneras, por ejemplo con estados de cuenta bancarios, contratos de alquiler, recibos de nómina, comprobantes de seguro o expedientes escolares."
        },
        {
          "type": "paragraph",
          "text": "Ante las autoridades migratorias puede presentarse cualquier documento o declaración jurada que confirme que la persona estaba en EE. UU."
        },
        {
          "type": "paragraph",
          "text": "Por último, el solicitante debe demostrar residencia continua en los Estados Unidos desde la designación hasta la presentación formal de la solicitud. Aun así, en circunstancias excepcionales pueden aceptarse ausencias breves o accidentales del territorio estadounidense."
        },
        {
          "type": "paragraph",
          "text": "Para probar que el solicitante ha permanecido en EE. UU. desde la designación del TPS pueden usarse los registros de viaje de la Oficina de Aduanas y Protección Fronteriza (CBP), copias de las páginas del pasaporte u otras pruebas de la presencia física antes mencionada."
        },
        {
          "type": "paragraph",
          "text": "Además, quien solicita el TPS no puede ser inadmisible según la ley de inmigración."
        },
        {
          "type": "paragraph",
          "text": "El concepto de inadmisibilidad viene de la Ley de Inmigración y Nacionalidad (INA), que en circunstancias específicas impide a ciertas personas entrar o permanecer en los Estados Unidos."
        },
        {
          "type": "paragraph",
          "text": "De acuerdo con la INA, se considera inadmisible a la persona que tiene ciertas condiciones médicas, ha cometido ciertos tipos de delitos, ha violado las leyes de inmigración o supone un riesgo para la seguridad de los Estados Unidos."
        },
        {
          "type": "paragraph",
          "text": "En este contexto, significa que el solicitante no debe haber cometido un delito grave ni dos delitos menores, porque los solicitantes de TPS están exentos de la mayoría de las causales de inadmisibilidad, en especial las relacionadas con violaciones de las leyes de inmigración."
        },
        {
          "type": "heading",
          "text": "¿Qué beneficios da el TPS una vez aprobada la solicitud?"
        },
        {
          "type": "paragraph",
          "text": "El TPS tiene dos efectos legales principales: protege de la deportación a sus titulares y les autoriza a trabajar legalmente en los Estados Unidos."
        },
        {
          "type": "paragraph",
          "text": "Con todo, quien solicita el TPS no está obligado a pedir el permiso de trabajo de inmediato. El titular de TPS también puede pedir autorización para viajar al extranjero."
        },
        {
          "type": "paragraph",
          "text": "La protección contra la deportación puede significar cosas distintas: que no se deporte a quien entró ilegalmente a los Estados Unidos; que no se inicie un proceso de deportación contra quien entró con una visa temporal y perdió su estatus; que no se expulse del país a quien se le negó una visa o un alivio migratorio; o que quien ya tiene un caso de deportación activo pueda lograr que se suspenda su proceso."
        },
        {
          "type": "paragraph",
          "text": "En resumen, mientras su estatus de TPS siga vigente, sus titulares no pueden ser expulsados de los Estados Unidos."
        },
        {
          "type": "subheading",
          "text": "Autorización de empleo con TPS"
        },
        {
          "type": "paragraph",
          "text": "Al solicitar el TPS, la persona puede pedir a la vez un permiso de trabajo."
        },
        {
          "type": "paragraph",
          "text": "Si prefiere no hacerlo en ese momento, podrá pedirlo cuando su solicitud de TPS sea aprobada."
        },
        {
          "type": "paragraph",
          "text": "El permiso de trabajo de la categoría TPS (A-12 / C-19) autoriza a trabajar legalmente en los Estados Unidos sin restricciones importantes."
        },
        {
          "type": "paragraph",
          "text": "Estos permisos se expiden por el mismo tiempo que dure el estatus de TPS y se pueden renovar mientras la designación siga activa."
        },
        {
          "type": "heading",
          "text": "Países que han recibido la designación de TPS en los Estados Unidos"
        },
        {
          "type": "list",
          "items": [
            "El Salvador",
            "Honduras",
            "Nepal",
            "Nicaragua",
            "Haití",
            "Birmania (Myanmar)",
            "Somalia",
            "Siria",
            "Venezuela",
            "Sudán",
            "Sudán del Sur",
            "Yemen"
          ]
        },
        {
          "type": "heading",
          "text": "¿Lleva el TPS a la residencia permanente?"
        },
        {
          "type": "paragraph",
          "text": "Al momento de escribir este texto, la Ley de Inmigración y Nacionalidad no permite que los titulares de TPS ajusten su estatus migratorio a residente permanente solo por tener TPS."
        },
        {
          "type": "paragraph",
          "text": "No obstante, si un titular de TPS consigue una visa de inmigrante mientras conserva el TPS, podría llegar a ser residente permanente."
        },
        {
          "type": "paragraph",
          "text": "El objetivo principal del TPS es proteger de forma temporal a los nacionales de un país designado, para que no tengan que volver a su país y exponerse al peligro."
        },
        {
          "type": "paragraph",
          "text": "Sin embargo, cuando alguien tiene dos nacionalidades, cabe la posibilidad de que busque refugio o residencia en un país distinto del designado para el TPS."
        },
        {
          "type": "paragraph",
          "text": "Eso no impide que una persona con doble ciudadanía solicite el TPS, pero sí exige analizar con detalle su vínculo real con el país designado o con el no designado."
        },
        {
          "type": "paragraph",
          "text": "Para determinar si el solicitante se ha establecido de forma permanente en ese tercer país pueden evaluarse factores como la manera en que obtuvo la segunda ciudadanía, las barreras de idioma, el tiempo que vivió allí, la frecuencia de sus viajes, sus lazos familiares, sus propiedades u otros vínculos con ese país."
        },
        {
          "type": "paragraph",
          "text": "Si así fuera, es poco probable que la solicitud de TPS se apruebe, porque se entiende que la persona puede encontrar un refugio seguro en otro lugar."
        },
        {
          "type": "heading",
          "text": "¿Y si se cancela mi TPS?"
        },
        {
          "type": "paragraph",
          "text": "Si su TPS se cancela o está por cancelarse, es importante que consulte a un abogado de inmigración para estudiar otras opciones por motivos familiares, laborales o humanitarios."
        }
      ],
      "en": [
        {
          "type": "heading",
          "text": "What Is TPS Within the U.S. Immigration System?"
        },
        {
          "type": "paragraph",
          "text": "Temporary Protected Status (TPS), as the name suggests, is an immigration status for non-citizens in the United States that is not permanent."
        },
        {
          "type": "paragraph",
          "text": "Congress created TPS in 1990, when it reformed the Immigration and Nationality Act, which makes it a relatively recent immigration benefit."
        },
        {
          "type": "paragraph",
          "text": "TPS is for citizens of countries that the U.S. Congress or the Department of Homeland Security (DHS) has designated."
        },
        {
          "type": "paragraph",
          "text": "Its aim is to protect people from designated countries who might face dangerous conditions or significant hardship if they went back home."
        },
        {
          "type": "paragraph",
          "text": "The United States designates countries for TPS when a humanitarian crisis arises from natural disasters, armed conflict, civil unrest, generalized violence, or other extraordinary and temporary conditions."
        },
        {
          "type": "paragraph",
          "text": "Typically, a country is designated for TPS after the government concludes that, given its current situation, it is not safe to return there."
        },
        {
          "type": "paragraph",
          "text": "Put simply, the U.S. Government, through Congress or the Executive Branch, can designate countries for Temporary Protected Status (TPS) and give their citizens a temporary immigration status allowing them to stay legally in the United States for as long as the conditions behind the designation continue."
        },
        {
          "type": "heading",
          "text": "Who Is Eligible for TPS?"
        },
        {
          "type": "paragraph",
          "text": "In general, a person applying for Temporary Protected Status (TPS) must satisfy three basic requirements."
        },
        {
          "type": "paragraph",
          "text": "The first is to show that they are a citizen of the designated country, or a stateless person who habitually resided there."
        },
        {
          "type": "paragraph",
          "text": "The easiest way to prove citizenship is a passport or birth certificate issued by that country’s authorities."
        },
        {
          "type": "paragraph",
          "text": "The second is to show physical presence in the United States on the date the TPS designation became official."
        },
        {
          "type": "paragraph",
          "text": "The Department of Homeland Security (DHS) usually publishes a notice in the Federal Register stating that citizens of the designated country who were physically present in the U.S. before a certain date are eligible for the temporary status."
        },
        {
          "type": "paragraph",
          "text": "That date usually falls before the designation is officially published. Physical presence before the set date can be shown in several ways, for example with bank statements, leases, pay stubs, insurance receipts, or school records."
        },
        {
          "type": "paragraph",
          "text": "Any document or sworn statement that confirms a person was in the U.S. can be submitted to immigration authorities."
        },
        {
          "type": "paragraph",
          "text": "Finally, the applicant must show continuous residence in the United States from the time of designation until the application is formally filed. Even so, brief or accidental absences from U.S. territory may be accepted in exceptional circumstances."
        },
        {
          "type": "paragraph",
          "text": "Travel records from U.S. Customs and Border Protection (CBP), copies of passport pages, or other proof of the physical presence described above can be used to show that the applicant has stayed in the U.S. since the TPS designation."
        },
        {
          "type": "paragraph",
          "text": "What is more, a TPS applicant must not be inadmissible under immigration law."
        },
        {
          "type": "paragraph",
          "text": "Inadmissibility is a concept from the Immigration and Nationality Act (INA), which, under specific circumstances, keeps certain people from entering or remaining in the United States."
        },
        {
          "type": "paragraph",
          "text": "Under the INA, inadmissibility covers people who have certain medical conditions, who have committed certain kinds of crimes, who have violated immigration laws, or who pose a risk to U.S. security."
        },
        {
          "type": "paragraph",
          "text": "In this context, that means the applicant must not have committed a felony or two misdemeanors, since most grounds of inadmissibility are waived for TPS applicants, particularly those tied to violations of immigration law."
        },
        {
          "type": "heading",
          "text": "What Does TPS Provide Once the Application Is Approved?"
        },
        {
          "type": "paragraph",
          "text": "TPS has two principal legal effects: holders are protected from deportation, and they are authorized to work legally in the United States."
        },
        {
          "type": "paragraph",
          "text": "TPS applicants do not, however, have to request a work permit right away. A TPS holder can also ask for authorization to travel abroad."
        },
        {
          "type": "paragraph",
          "text": "Protection from deportation can mean several things: that someone who entered the U.S. unlawfully will not be deported; that someone who came in on a temporary visa and fell out of status will not be placed in removal proceedings; that someone refused a visa or other relief will not be removed; or that someone already in active removal proceedings can have those proceedings suspended."
        },
        {
          "type": "paragraph",
          "text": "In short, as long as TPS remains valid, the holder cannot be removed from the United States."
        },
        {
          "type": "subheading",
          "text": "Employment Authorization with TPS"
        },
        {
          "type": "paragraph",
          "text": "When applying for TPS, a person can request a work permit at the same time."
        },
        {
          "type": "paragraph",
          "text": "If they prefer not to do so then, they can request it once the TPS application has been approved."
        },
        {
          "type": "paragraph",
          "text": "Under the TPS category (A-12 / C-19), a work permit lets the holder work legally in the United States without significant restrictions."
        },
        {
          "type": "paragraph",
          "text": "These permits are issued for the same period as the TPS status itself and can be renewed as long as the TPS designation stays active."
        },
        {
          "type": "heading",
          "text": "Countries That Have Received a TPS Designation in the U.S."
        },
        {
          "type": "list",
          "items": [
            "El Salvador",
            "Honduras",
            "Nepal",
            "Nicaragua",
            "Haiti",
            "Burma (Myanmar)",
            "Somalia",
            "Syria",
            "Venezuela",
            "Sudan",
            "South Sudan",
            "Yemen"
          ]
        },
        {
          "type": "heading",
          "text": "Does TPS Lead to Permanent Residence?"
        },
        {
          "type": "paragraph",
          "text": "At the time of writing, the Immigration and Nationality Act does not allow TPS holders to adjust their immigration status to that of a lawful permanent resident solely because they have TPS."
        },
        {
          "type": "paragraph",
          "text": "Even so, obtaining an immigrant visa while keeping TPS may make it possible for a TPS holder to become a permanent resident."
        },
        {
          "type": "paragraph",
          "text": "The main purpose of TPS is to give nationals of a designated country temporary protection, so that they do not have to return home and face danger."
        },
        {
          "type": "paragraph",
          "text": "When someone holds two nationalities, however, it is possible that they could seek refuge or residence in a country other than the TPS-designated one."
        },
        {
          "type": "paragraph",
          "text": "That does not stop a dual citizen from applying for TPS, but it does call for a close look at the applicant’s actual ties to the designated or non-designated country."
        },
        {
          "type": "paragraph",
          "text": "To decide whether the applicant has settled permanently in that third country, factors such as how the second citizenship was obtained, language barriers, time spent living there, how often they travel, family ties, property, or other connections to that country may be weighed."
        },
        {
          "type": "paragraph",
          "text": "If that is the case, the TPS application is unlikely to be approved, since the person is considered able to find safe refuge elsewhere."
        },
        {
          "type": "heading",
          "text": "What Happens If My TPS Is Canceled?"
        },
        {
          "type": "paragraph",
          "text": "If your TPS is canceled or about to be, it is important to consult an immigration attorney to explore other options based on family, employment, or humanitarian grounds."
        }
      ]
    },
    "related": [
      "ead",
      "defensa-contra-la-deportacion",
      "asilo"
    ],
    "source": "camulaw.com/servicios/estatus-de-proteccion-temporal; names and lines from the site's ES/EN dictionaries; practice confirmed by client instruction 2026-09-10 (services mirror Campos Muños Law LLC); text reworded 2026-09-26 (docs/sources/paraphrases.json)"
  },
  {
    "id": "visaU",
    "order": 13,
    "slug": "visa-u",
    "featured": false,
    "name": {
      "es": "Visa U",
      "en": "U Visa"
    },
    "line": {
      "es": "Para las víctimas de ciertos delitos que han colaborado con las autoridades, ofrecemos representación legal en la búsqueda de protección y estatus legal en los Estados Unidos.",
      "en": "For victims of certain crimes who have cooperated with the authorities, we provide legal representation in seeking protection and legal status in the United States."
    },
    "blocks": {
      "es": [
        {
          "type": "heading",
          "text": "Sobre la visa U"
        },
        {
          "type": "paragraph",
          "text": "La visa U es un beneficio migratorio para quienes fueron víctimas de delitos graves en los Estados Unidos y colaboraron con las autoridades, o están dispuestos a hacerlo. Esa colaboración puede consistir en participar en la investigación, en el procesamiento del delito y en el juicio. El programa busca proteger a las víctimas y, a la vez, promover la cooperación con las fuerzas del orden."
        },
        {
          "type": "heading",
          "text": "Lo que se exige"
        },
        {
          "type": "paragraph",
          "text": "Para calificar, la persona tiene que haber sufrido un daño físico o psicológico importante por causa del delito. Además, necesita una certificación de una autoridad, como la policía o la fiscalía, que confirme su colaboración. Y deben cumplirse también los demás requisitos migratorios que establece la ley."
        },
        {
          "type": "heading",
          "text": "Dificultades y posibles complicaciones"
        },
        {
          "type": "paragraph",
          "text": "Los casos de visa U suelen ser largos y complejos. Como cada año hay una cantidad limitada de visas, la espera puede alargarse bastante. Por eso es esencial reunir las pruebas adecuadas, conseguir la certificación correcta y tratar con cuidado cualquier antecedente migratorio o penal que pueda tener."
        }
      ],
      "en": [
        {
          "type": "heading",
          "text": "About the U Visa"
        },
        {
          "type": "paragraph",
          "text": "The U visa is an immigration benefit for people who were victims of serious crimes in the United States and who cooperated with the authorities or are willing to do so. That cooperation can involve taking part in the investigation, the prosecution of the offense, and the related court proceedings. The program aims to protect victims while also promoting cooperation with law enforcement."
        },
        {
          "type": "heading",
          "text": "What Is Required"
        },
        {
          "type": "paragraph",
          "text": "To qualify, the person must have suffered significant physical or psychological harm as a result of the crime. They also need a certification from an authority, such as the police or the prosecutor’s office, confirming their cooperation. The other immigration requirements set by law must be met as well."
        },
        {
          "type": "heading",
          "text": "Difficulties and Possible Complications"
        },
        {
          "type": "paragraph",
          "text": "U visa cases are usually long and complex. Since the number of visas is limited each year, the wait can stretch out considerably. That is why it is essential to gather the right evidence, obtain the proper certification, and handle any immigration or criminal history you may have with care."
        }
      ]
    },
    "related": [
      "visa-t",
      "vawa",
      "ead"
    ],
    "source": "camulaw.com/servicios/visa-u; names and lines from the site's ES/EN dictionaries; practice confirmed by client instruction 2026-09-10 (services mirror Campos Muños Law LLC); text reworded 2026-09-26 (docs/sources/paraphrases.json)"
  },
  {
    "id": "visaT",
    "order": 14,
    "slug": "visa-t",
    "featured": false,
    "name": {
      "es": "Visa T",
      "en": "T Visa"
    },
    "line": {
      "es": "La Visa T está pensada para víctimas de trata de personas. Le ofrecemos representación legal confidencial para ayudarle a obtener protección y estatus legal en los Estados Unidos.",
      "en": "The T Visa exists for victims of human trafficking. We offer confidential legal representation to help you obtain protection and legal status in the United States."
    },
    "blocks": {
      "es": [
        {
          "type": "heading",
          "text": "Sobre la Visa T"
        },
        {
          "type": "paragraph",
          "text": "El propósito de la Visa T es ofrecer alivio migratorio a quienes han sido víctimas de formas graves de trata de personas."
        },
        {
          "type": "paragraph",
          "text": "Protege de la deportación a quienes la reciben y les da permiso para trabajar en los Estados Unidos."
        },
        {
          "type": "paragraph",
          "text": "Quienes solicitan una Visa T de buena fe tienen además acceso a los mismos beneficios que los refugiados, entre ellos asistencia económica, ayuda alimentaria y capacitación laboral."
        },
        {
          "type": "paragraph",
          "text": "La condición de derivado puede extenderse al cónyuge y a los hijos solteros menores de edad de la víctima de trata. Si el solicitante tiene menos de 21 años, también pueden incluirse como beneficiarios derivados sus padres y sus hermanos solteros menores de edad."
        },
        {
          "type": "heading",
          "text": "¿Quién puede obtener una Visa T?"
        },
        {
          "type": "paragraph",
          "text": "Un inmigrante puede ser elegible para una Visa T si reúne estas condiciones:"
        },
        {
          "type": "list",
          "items": [
            "Es víctima de una forma grave de trata de personas, lo que incluye la trata sexual (cuando se consigue un acto sexual comercial por medio de fraude, fuerza o coerción, o cuando la víctima es menor de 18 años) o la trata laboral (captar, transportar, acoger o proporcionar a una persona para trabajos o servicios por medio de fuerza, fraude o coerción, con el fin de someterla a servidumbre involuntaria o esclavitud).",
            "Está físicamente presente en los Estados Unidos como consecuencia directa de la trata.",
            "Colabora con las autoridades en la investigación o el enjuiciamiento de los tratantes (este requisito no se aplica a las víctimas menores de 18 años).",
            "Puede demostrar que sufriría dificultades extremas, con un daño inusual o severo, si se le expulsara de los Estados Unidos."
          ]
        }
      ],
      "en": [
        {
          "type": "heading",
          "text": "About the T Visa"
        },
        {
          "type": "paragraph",
          "text": "The purpose of the T Visa is to offer immigration relief to people who have been victims of severe forms of human trafficking."
        },
        {
          "type": "paragraph",
          "text": "It shields recipients from deportation and gives them permission to work in the United States."
        },
        {
          "type": "paragraph",
          "text": "People who apply for a T Visa in good faith also have access to the same benefits as refugees, among them financial assistance, food aid, and job training."
        },
        {
          "type": "paragraph",
          "text": "Derivative status may extend to the trafficking victim’s spouse and unmarried minor children. When the applicant is under 21, the applicant’s parents and unmarried minor siblings may also be included as derivative beneficiaries."
        },
        {
          "type": "heading",
          "text": "Who Can Qualify for a T Visa?"
        },
        {
          "type": "paragraph",
          "text": "An immigrant who meets these requirements may be eligible for a T Visa:"
        },
        {
          "type": "list",
          "items": [
            "Is a victim of a severe form of human trafficking, which includes sex trafficking (where a commercial sex act is induced through fraud, force, or coercion, or where the victim is under 18) or labor trafficking (recruiting, transporting, harboring, or providing a person for labor or services through force, fraud, or coercion, in order to subject them to involuntary servitude or slavery).",
            "Is in the United States physically, and that presence is a direct result of the trafficking.",
            "Cooperates with the authorities in the investigation or prosecution of the traffickers (a requirement that does not apply to victims under 18).",
            "Can show that removal from the United States would cause them extreme hardship involving unusual or severe harm."
          ]
        }
      ]
    },
    "related": [
      "visa-u",
      "vawa",
      "asilo"
    ],
    "source": "camulaw.com/servicios/visa-t; names and lines from the site's ES/EN dictionaries; practice confirmed by client instruction 2026-09-10 (services mirror Campos Muños Law LLC); text reworded 2026-09-26 (docs/sources/paraphrases.json)"
  }
];

export const featured = (): Service[] => SERVICES.filter((s) => s.featured);
export const serviceBySlug = (slug: string): Service | undefined => SERVICES.find((s) => s.slug === slug);
export const serviceById = (id: string): Service | undefined => SERVICES.find((s) => s.id === id);
