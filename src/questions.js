import Copy from "../lib/Copy.js";

export default [{
    question: Copy.text({
      en: "When contemplating art, what do you appreciate?",
      es: "Cuando contemplas arte, ¿qué aprecias?",
    }),
    options: [{
        choice: Copy.text({
          en: "Execution",
          es: "Ejecución",
        }),
        hint: Copy.text({
          en: "magnitude, elaboration, dexterity",
          es: "magnitud, elaboración, destreza",
        }),
      },
      {
        choice: Copy.text({
          en: "Concept",
          es: "Concepto",
        }),
        hint: Copy.text({
          en: "meaning, idea, message",
          es: "significado, idea, mensaje",
        }),
      },
      {
        choice: Copy.text({
          en: "Feeling",
          es: "Sentimiento",
        }),
        hint: Copy.text({
          en: "sentiment, emotion, nostalgia",
          es: "conexión, emoción, nostalgia",
        }),
      }
    ]
  },
  {
    question: Copy.text({
      en: "In physical activities, what do you get into?",
      es: "En las actividades físicas ¿en qué te involucras?",
    }),
    options: [{
        choice: Copy.text({
          en: "Practice",
          es: "Práctica",
        }),
        hint: Copy.text({
          en: "training, challenge, competition",
          es: "entrenamiento, desafío, competencia",
        }),
      },
      {
        choice: Copy.text({
          en: "Knowledge",
          es: "Conocimiento",
        }),
        hint: Copy.text({
          en: "records, stats, strategies",
          es: "registros, estadísticas, estrategias",
        }),
      },
      {
        choice: Copy.text({
          en: "Camaraderie",
          es: "Camaradería",
        }),
        hint: Copy.text({
          en: "fandom, environment, team",
          es: "fanaticada, ambiente, equipo",
        }),
      }
    ]
  },
  {
    question: Copy.text({
      en: "In studies, what peaks your interest?",
      es: "En los estudios, ¿qué despierta tu interés?",
    }),
    options: [{
        choice: Copy.text({
          en: "Industry",
          es: "Industria",
        }),
        hint: Copy.text({
          en: "application, commerce, production",
          es: "aplicación, comercio, producción",
        }),
      },
      {
        choice: Copy.text({
          en: "Science",
          es: "Ciencia",
        }),
        hint: Copy.text({
          en: "logic, structure, functionality",
          es: "lógica, estructura, funcionalidad",
        }),
      },
      {
        choice: Copy.text({
          en: "Culture",
          es: "Cultura",
        }),
        hint: Copy.text({
          en: "art, literature, history",
          es: "arte, literatura, historia",
        }),
      }
    ]
  },
  {
    question: Copy.text({
      en: "As an ideal meal, what comes to your mind?",
      es: "Como comida ideal, ¿qué te viene a la cabeza?",
    }),
    options: [{
        choice: Copy.text({
          en: "Feast",
          es: "Festín",
        }),
        hint: Copy.text({
          en: "abundance, indulgence, treats",
          es: "abundancia, indulgencia, golosinas",
        }),
      },
      {
        choice: Copy.text({
          en: "Nutrition",
          es: "Nutrición",
        }),
        hint: Copy.text({
          en: "diet, balance, timing",
          es: "dieta, equilibrio, tiempo",
        }),
      },
      {
        choice: Copy.text({
          en: "Ceremony",
          es: "Ceremonia",
        }),
        hint: Copy.text({
          en: "setting, presentation, company",
          es: "entorno, presentación, empresa",
        }),
      }
    ]
  },
  {
    question: Copy.text({
      en: "In a work environment, what do you focus on?",
      es: "En un ambiente laboral, ¿en qué te concentras?",
    }),
    options: [{
        choice: Copy.text({
          en: "Productivity",
          es: "Productividad",
        }),
        hint: Copy.text({
          en: "execute, deliver, profit",
          es: "ejecutar, entregar, obtener ganancias",
        }),
      },
      {
        choice: Copy.text({
          en: "Methodology",
          es: "Metodología",
        }),
        hint: Copy.text({
          en: "anylisis, process, assessment",
          es: "análisis, proceso, evaluación",
        }),
      },
      {
        choice: Copy.text({
          en: "Service",
          es: "Servicio",
        }),
        hint: Copy.text({
          en: "help, support, contribute",
          es: "ayudar, apoyar, contribuir",
        }),
      }
    ]
  }, {
    question: Copy.text({
      en: "In stories, what draws you in?",
      es: "En las historias, ¿qué te atrae?",
    }),
    options: [{
        choice: Copy.text({
          en: "Action",
          es: "Acción",
        }),
        hint: Copy.text({
          en: "thrill, pace, audiovisuals",
          es: "emoción, ritmo, audiovisuales",
        }),
      },
      {
        choice: Copy.text({
          en: "Plot",
          es: "Trama",
        }),
        hint: Copy.text({
          en: "development, intrigue, sense",
          es: "desarrollo, intriga, sentido",
        }),
      },
      {
        choice: Copy.text({
          en: "Drama",
          es: "Drama",
        }),
        hint: Copy.text({
          en: "romance, misfortune, joy",
          es: "romance, desgracia, alegría",
        }),
      }
    ]
  }, {
    question: Copy.text({
      en: "On your free time, how open are you to these?",
      es: "En tu tiempo libre, ¿qué tan abierto estás a esto?",
    }),
    options: [{
        choice: Copy.text({
          en: "Performing activities",
          es: "Realizar actividades",
        }),
        hint: Copy.text({
          en: "play, chores, exercise",
          es: "jugar, tareas domésticas, hacer ejercicio",
        }),
      },
      {
        choice: Copy.text({
          en: "Analyzing concepts",
          es: "Analizar conceptos",
        }),
        hint: Copy.text({
          en: "ponder, research, clarify",
          es: "reflexionar, investigar, aclarar",
        }),
      },
      {
        choice: Copy.text({
          en: "Considering feelings",
          es: "Considerar sentimientos",
        }),
        hint: Copy.text({
          en: "affection, appreciation, care",
          es: "cariño, aprecio, cuidado",
        }),
      }
    ]
  }, {
    reverse: true,
    question: Copy.text({
      en: "When relaxing, what do you tend to do?",
      es: "Cuando te relajas, ¿qué sueles hacer?",
    }),
    options: [{
      choice: Copy.text({
        en: "Mental recreation",
        es: "Recreación mental",
      }),
      hint: Copy.text({
        en: "read, write, converse",
        es: "leer, escribir, conversar",
      }),
    }, {
      choice: Copy.text({
        en: "Carefree fun",
        es: "Diversión despreocupada",
      }),
      hint: Copy.text({
        en: "play, party, indulge",
        es: "jugar, festejar, disfrutar",
      }),
    }, {
      choice: Copy.text({
        en: "Practical tasks",
        es: "Tareas prácticas",
      }),
      hint: Copy.text({
        en: "fix/make, work out, organize",
        es: "arreglar/hacer, resolver, organizar",
      }),
    }]
  }, {
    question: Copy.text({
      en: "In general, how intent are you on these?",
      es: "En general, ¿qué tanto te preocupa esto?",
    }),
    options: [{
        choice: Copy.text({
          en: "Fulfilling duties",
          es: "Cumplir deberes",
        }),
        hint: Copy.text({
          en: "Gotta be done.",
          es: "Hay que hacerlo.",
        }),
      },
      {
        choice: Copy.text({
          en: "Setting plans",
          es: "Establecer planes",
        }),
        hint: Copy.text({
          en: "Want to be clear.",
          es: "Que queden claro.",
        }),
      },
      {
        choice: Copy.text({
          en: "Upholding values",
          es: "Defender valores",
        }),
        hint: Copy.text({
          en: "Won't give them up.",
          es: "No los rendiras.",
        }),
      }
    ]
  }, {
    question: Copy.text({
      en: "What's your tendency?",
      es: "¿Cuál es tu tendencia?",
    }),
    options: [
      [{
        choice: Copy.text({
          en: "Thoughts",
          es: "Pensamientos",
        }),
      }, {
        choice: Copy.text({
          en: "Actions",
          es: "Acciones",
        }),
      }],
      [{
        choice: Copy.text({
          en: "Whims",
          es: "Caprichos",
        }),
      }, {
        choice: Copy.text({
          en: "Plans",
          es: "Planes",
        }),
      }],
      [{
        choice: Copy.text({
          en: "Facts",
          es: "Hechos",
        }),
      }, {
        choice: Copy.text({
          en: "Feelings",
          es: "Sentimientos",
        }),
      }]
    ]
  }, {
    question: Copy.text({
      en: "How much would these adjectives define you?",
      es: "¿Cuánto te definen estos adjetivos?",
    }),
    options: [{
        choice: Copy.text({
          en: "Consistent",
          es: "Consistente",
        }),
        hint: Copy.text({
          en: "Do as you always do.",
          es: "Haces lo que siempre haces.",
        }),
      },
      {
        choice: Copy.text({
          en: "Determined",
          es: "Determinante",
        }),
        hint: Copy.text({
          en: "Stick to your decisions.",
          es: "Te ciñes a tus decisiones.",
        }),
      }, {
        choice: Copy.text({
          en: "Picky",
          es: "Quisquilloso/a",
        }),
        hint: Copy.text({
          en: "Like it the way you like it.",
          es: "De gustos específicos.",
        }),
      }
    ]
  }, {
    reverse: true,
    options: [{
        choice: Copy.text({
          en: "Alert",
          es: "Alerta",
        }),
        hint: Copy.text({
          en: "Aware of your surroundings",
          es: "Consciente de tu entorno.",
        }),
      },
      {
        choice: Copy.text({
          en: "Inquisitive",
          es: "Inquisitivo/a",
        }),
        hint: Copy.text({
          en: "Look to understand and clarify",
          es: "Buscas discernir y aclarar.",
        }),
      },
      {
        choice: Copy.text({
          en: "Softhearted",
          es: "Bondadoso/a",
        }),
        hint: Copy.text({
          en: "Even with strangers or critters.",
          es: "Incluso con extraños o alimañas.",
        }),
      }
    ]
  }, {
    question: Copy.text({
      en: "How strong is your tendency to these?",
      es: "¿Qué tan fuerte es tu tendencia a esto?",
    }),
    options: [{
        choice: Copy.text({
          en: "Rather work alone",
          es: "Trabajar a solas",
        }),
      },
      {
        choice: Copy.text({
          en: "Demand freedom and control",
          es: "Demandar libertad y control",
        }),
      },
      {
        choice: Copy.text({
          en: "Ignore gossip and drama",
          es: "Ignorar chismes y drama",
        }),
      }
    ]
  }, {
    reverse: true,
    options: [{
        choice: Copy.text({
          en: "Seek group activities",
          es: "Buscar actividades grupales",
        }),
      },
      {
        choice: Copy.text({
          en: "Enjoy discussions",
          es: "Disfrutar de debates",
        }),
      },
      {
        choice: Copy.text({
          en: "Interact with a diversity of people",
          es: "Interactuar con personas diversas",
        }),
        hint: Copy.text({
          en: "other ages, genders, backgrounds",
          es: "otras edades, géneros, orígenes",
        }),
      }
    ]
  }
];