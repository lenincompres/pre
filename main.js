import * as questionnaire from "./src/pages/questionnaire.js";
import * as results from "./src/pages/results.js";
import * as STYLE from "./src/style.js";
import Copy from "./lib/Copy.js";
import intro from "./src/pages/intro.js";
import QUESTIONS from "./src/questions.js";

const qTotal = QUESTIONS.length - 1;

const QS = DOM.querystring();
let rgb = QS.rgb ? `#${QS.rgb}` : undefined;
let fav = QS.color ? `#${QS.color}` : undefined;

questionnaire._results.bind(results._feature);

if (rgb) results._feature.value = rgb;

const CSS = {
  html: {
    scrollBehavior: `smooth`,
  },
  b: {
    fontWeight: `bold`,
  },
  a: {
    color: `#fffd`,
    textDecoration: `none`,
    textShadow: `0 0 1px #000c, 1px 1px 2px #000c`,
    hover: {
      textDecoration: `underline`,
    },
    after: {
      transition: `ease-in 0.1s`,
      fontSize: `0.68em`,
      verticalAlign: `top`,
      paddingLeft: `0.25em`,
    }
  },
  p: {
    padding: `0.5em 0`,
    lineHeight: `1.5em`,
    textAlign: 'left',
  },
  ul: {
    padding: `0.5em 0`,
    lineHeight: `1.5em`,
  },
  h: {
    padding: `.5em 0 0.2em`,
    fontWeight: `bold`,
    fontFamily: `title`,
  },
  h1: {
    padding: `0.3rem 0 0`,
    textAlign: `center`,
    fontSize: `3rem`,
    color: `#fffd`,
    textShadow: `0 0 3px #000c, 0 0 3px #000c`,
    textTransform: `capitalize`,
  },
  h2: {
    fontSize: `1.4rem`,
    paddingTop: `1em`,
    textAlign: `center`,
    color: `#fffd`,
    textTransform: `capitalize`,
    textShadow: `0 0 3px #000c, 0 0 3px #000c`,
  },
  h3: {
    fontSize: `1.2rem`,
  },
  h4: {
    fontSize: `1.1rem`,
  }
};

DOM.set({
  title: `3DPsyche`,
  charset: `UTF-8`,
  viewport: `width=device-width, initial-scale=1, minimum-scale=1`,
  keywords: `3dpsyche, psychology, test, psychology test, personality types, personality, temperament, tendencies, states of mind, emotional state, MBTI, Myers-Briggs, ENTP, ENTJ, INTP, INTJ, ENFP, ENFJ, INFP, INFJ, ESTP, ESTJ, ISTP, ISTJ, ISFP, ISFJ, ESFP, ESFJ, jung, carl jung, freud, sigmund freud, rational, emotional, physical, mind body and soul, abstraction, lenino, lenin compres`,
  description: `A psychometric tool to visualize the Physical, Rational & Emotional spectrum.`,
  icon: `media/favicon.gif`,
  textAlign: `center`,
  backgroundColor: rgb ? rgb : questionnaire._favorite,
  font: {
    fontFamily: `title`,
    src: `assets/PTSerif-Regular.ttf`,
  },
  css: CSS,
  fontFamily: `Verdana, Geneva, Tahoma, sans-serif`,
  fontSize: `16px`,
  overflowX: `hidden`,

  nav: {
    textAlign: `right`,
    padding: `0.5em 1em`,
    menu: {
      a: Copy.getToggleLink(),
    },
  },

  header: {
    background: rgb ? undefined : `linear-gradient(to bottom, #fff0 0%, ${STYLE.lightScreen} 100%)`,
    h1: {
      a: {
        href: `.`,
        text: Copy.text({
          en: `The 3DPsyche`,
          es: `La Psiquis 3D`,
        })
      },
    },
    a: {
      display: `block`,
      href: `http://lenino.net`,
      text: `${Copy.text({en: `by`, es: `por`})} Lenin Comprés`,
    },
  },

  section: rgb ? undefined : intro,

  div: rgb ? undefined : {
    height: `6rem`,
    background: `linear-gradient(to bottom, ${STYLE.lightScreen} 0%, #fff0 100%)`,
  },

  main: {
    display: questionnaire._qCounter.as(n => n >= -2 ? 'block' : 'none'),
    content: rgb ? undefined : questionnaire.questionnaire,
  },

  div_: rgb ? undefined : {
    display: questionnaire._qCounter.as(n => n > qTotal ? 'block' : 'none'),
    height: `60rem`,
    background: rgb ? rgb : results._feature.as(v => `linear-gradient(to bottom, ${questionnaire._favorite.value} 0%, ${v} 100%)`),
  },

  footer: {
    display: rgb ? undefined : questionnaire._qCounter.as(n => n > qTotal ? 'block' : 'none'),
    backgroundColor: rgb ? rgb : results._feature,
    a: {
      name: 'q14',
    },
    section: {
      style: STYLE.section,
      display: `flex`,
      flexDirection: `column`,
      h2: rgb && !fav ? undefined : Copy.text({
        en: `Results`,
        es: `Resultados`,
      }),
      small: rgb && !fav ? undefined : {
        margin: `1em 0 -2.25em -11em`,
        zIndex: 1,
        text: Copy.text({
          en: `Closests:`,
          es: `Más cercano:`,
        }),
      },

      main: results.model,

      a: {
        content: [{
          display: rgb ? `none` : `block`,
          href: DOM.bind([results._feature, questionnaire._favorite], (r, f) => `./?rgb=${r.substr(1)}&color=${f.substr(1)}`),
          text: Copy.text({
            en: `Link to these results for you to save or share.`,
            es: `Enlace a estos resultados para guardarlos o compartirlos.`,
          }),
        }, !fav ? undefined : {
          margin: `0 auto`,
          padding: `0.5em 1em`,
          width: `fit-content`,
          borderRadius: `0.5em`,
          boxShadow: `1px 1px 2px #000c`,
          backgroundColor: fav,
          href: `./?rgb=${fav.substr(1)}`,
          target: `_blank`,
          text: Copy.text({
            en: `This is the result of your favorite color: ${fav}`,
            es: `Este es el resultado para tu color favorito: ${fav}`,
          }),
        }, {
          fontSize: `1.25em`,
          marginTop: `2em`,
          href: `./`,
          text: Copy.text({
            en: `${rgb ? `Take` : `Restart`} the questionnaire.`,
            es: `${rgb ? `Tomar` : `Reiniciar`} el cuestionario.`,
          }),
        }, {
          fontSize: `small`,
          marginTop: `3em`,
          target: `_blank`,
          href: `http://lenino.net`,
          text: `Created by Lenin Comprés`,
        }, {
          fontSize: `small`,
          marginTop: `0.68em`,
          target: `_blank`,
          href: `https://github.com/lenincompres/DOM.js`,
          text: `Developed with DOM.js`,
        }]
      }
    }
  },

  button: rgb ? undefined : {
    text: questionnaire._qCounter.as({
      [-3]: Copy.text({
        en: 'Take the test',
        es: 'Toma el test',
      }),
      [-1]: Copy.text({
        en: 'Start',
        es: 'Comenzar',
      }),
      [qTotal]: Copy.text({
        en: 'Results',
        es: 'Resultados',
      }),
      default: Copy.text({
        en: 'Next',
        es: 'Siguiente',
      }),
    }),
    background:`linear-gradient(to bottom, #fff8 0%, #8880 15%, #8880 85%, #0006 100%)`,
    backgroundColor: questionnaire._qCounter.as({
      [-3]: '#000a',
      [-1]: '#000a',
      [qTotal]: '#000a',
      default: '#fffa',
    }),
    color: questionnaire._qCounter.as({
      [-3]: '#fff',
      [-1]: '#fff',
      [qTotal]: '#fff',
      default: '#000',
    }),
    boxShadow: '1px 1px 3px black',
    fontSize: '1.2em',
    margin: '-1em auto 3em',
    borderRadius: '2em',
    padding: '0.6em 3em',
    display: questionnaire._qCounter.as(n => n > qTotal ? 'none' : 'block'),
    click: () => {
      questionnaire._qCounter.value = questionnaire._qCounter.value + 1;
      location.href = "#q" + questionnaire._qCounter.value;
    },
  },
});