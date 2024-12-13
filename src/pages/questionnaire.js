import * as style from "../style.js";
import * as AUX from "../../lib/auxiliary.js";
import QUESTIONS from "../questions.js";
import Copy from "../../lib/Copy.js";

/* Methods to calculate the results */

export const _favorite = new Binder('#808080');
export const _results = new Binder('#808080');

const sampleQuestions = [{
  question: Copy.text({
    en: "How much do you like these colors?",
    es: "Qué tanto te gustan estos colores?",
  }),
  options: [{
      choice: Copy.text({
        en: "Reds",
        es: "Rojos",
      }),
      hint: Copy.text({
        en: "scarlet, maroon, brick",
        es: "escarlata, vino, labrillo",
      }),
    },
    {
      choice: Copy.text({
        en: "Greens",
        es: "Verdes",
      }),
      hint: Copy.text({
        en: "lime, army, mint",
        es: "lima, olivo, menta",
      }),
    },
    {
      choice: Copy.text({
        en: "Blues",
        es: "Azules",
      }),
      hint: Copy.text({
        en: "sky, sapphire, navy",
        es: "cielo, safiro, marino",
      }),
    }
  ]
}, {
  question: "Adjust your color preference given these tendencies.",
  options: [
    [{
      choice: Copy.text({
        en: "Neutral",
        es: "Opaco",
      }),
    }, {
      choice: Copy.text({
        en: "Bright",
        es: "Brillante",
      }),
    }],
    [{
      choice: Copy.text({
        en: "Dark",
        es: "Oscuro",
      }),
    }, {
      choice: Copy.text({
        en: "Light",
        es: "Claro",
      }),
    }]
  ]
}];

const modelQuestion = q => {
  const frequencies = [Copy.text({
    en: 'Rarely',
    es: "Raramente",
  }), Copy.text({
    en: 'Seldom',
    es: "Escasamente",
  }), Copy.text({
    en: 'Occasionally',
    es: "Ocasionalmente",
  }), Copy.text({
    en: 'Moderately',
    es: "Moderadamente",
  }), Copy.text({
    en: 'Frequently',
    es: "Fequentemente",
  }), Copy.text({
    en: 'Generally',
    es: "Generalmente",
  }), Copy.text({
    en: 'Usually',
    es: "Usualmente",
  }), Copy.text({
    en: 'Extremely',
    es: "Extremadamente",
  })];
  q.answers = [];
  q.model = {
    section: {
      marginTop: q.question ? '2em' : undefined,
      borderRadius: '1em',
      overflow: 'hidden',
      h3: !q.question ? undefined : {
        color: '#fff',
        backgroundColor: style.darkScreen,
        text: q.question
      },
      ul: {
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        li: q.options.map(o => {
          var isVS = Array.isArray(o);
          if (!isVS) o = [o];
          var answer = new Binder(50);
          q.answers.push(answer);
          return {
            backgroundColor: style.whiteScreen,
            margin: '1px 0',
            padding: '0.68em',
            position: 'relative',
            order: Math.floor(100 * Math.random()),
            div: {
              margin: '0 1em',
              display: 'flex',
              flexDirection: 'row',
              placeContent: 'space-around',
              label: o.map(option => new Object({
                span: {
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  fontFamily: 'title',
                  marginTop: '0.5em',
                  textShadow: 'none',
                  text: option.choice,
                },
                p: {
                  fontSize: 'small',
                  text: option.hint,
                }
              }))
            },
            input: {
              display: 'block',
              width: '100%',
              type: 'range',
              min: 1,
              max: 99,
              value: answer.value,
              oninput: e => {
                answer.value = parseInt(e.target.value);
                updateResults();
              }
            },
            small: {
              fontSize: isVS ? '1em' : 'small',
              lineHeight: '1rem',
              color: '#06c',
              bottom: '3em',
              position: 'absolute',
              pointerEvents: 'none',
              margin: isVS ? '0 2em' : '0 1em',
              maxWidth: '15%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              content: [{
                right: 0,
                text: isVS ? '⟶' : answer.as(v => v + '%')
              }, {
                left: 0,
                text: isVS ? '⟵' : answer.as(v => frequencies[Math.floor(v * frequencies.length / 100)])
              }, !isVS ? undefined : {
                left: '50%',
                marginLeft: '-0.5em',
                text: 'or'
              }]
            }
          }
        })
      }
    }
  }
  return q;
};

const questions = new Binder(QUESTIONS.map(modelQuestion));

export const questionnaire = {
  style: style.section,
  header: {
    style: style.floatingSign,
    backgroundColor: style.darkScreen,
    color: 'white',
    p: Copy.text({
      en: 'The following questionaire averages your answers and map them to a color archetype in the cube. To answer it, you must rate each option individually, but compare them to others in the same group.',
      es: 'El siguiente cuestionario promedia tus respuestas y las asigna a un arquetipo de color en el cubo. Para responderla, debes calificar cada opción individualmente, pero compararlas con otras del mismo grupo.'
    }),
  },
  main: {
    content: [{
      h2: Copy.text({
        en: 'Example',
        es: "Ejemplo",
      }),
      section: sampleQuestions.map(q => modelQuestion(q).model),
    }, {
      marginTop: '1em',
      a: {
        fontSize: '1.14em',
        target: '_blank',
        text: _favorite.as(v => Copy.text({
          en: 'The RGB code for the resulting average color is: ',
          es: "El código RGB para el color promedio resultante es:",
        }) + v),
        href: _favorite.as(v => './?rgb=' + v.substr(1)),
      }
    }, {
      marginTop: '4em',
      h2: Copy.text({
        en: 'Questionaire',
        es: "Cuestionario",
      }),
      section: questions.as(qs => qs.map(q => q.model))
    }]
  }
};


const getAverage = (first, last) => {
  var output = Array(questions.value[first].answers.length).fill(0);
  questions.value.filter((q, i) => i >= first && i <= last).forEach(q => output = output.plus(q.answers.map(a => !q.reverse ? a.value : 100 - a.value)));
  return output.map(v => v / (last - first + 1));
}

const updateResults = _ => {
  // Sample question favorite color
  _favorite.value = AUX.hex(
    ...sampleQuestions[0].answers.map(v => v.value * 255 / 100),
    ...sampleQuestions[1].answers.map(v => v.value)
  );
  //PRE results
  let rgb = getAverage(0, 5).map(v => v * 255 / 100);
  let lights = getAverage(6, 9);
  let sats = getAverage(10, 13);
  //console.log(rgb, sats, lights, );
  _results.value = AUX.hex(...rgb,
    sats.reduce((o, v) => v + o, 0) / 3,
    lights.reduce((o, v) => v + o, 0) / 3
  );
}

export default questionnaire;