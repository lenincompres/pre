import Cube from "./src/Cube.js";
import * as questionnaire from "./src/questionnaire.js";
import * as results from "./src/results.js";
import * as STYLE from "./src/style.js";

const QS = DOM.querystring();
let rgb = QS.rgb ? "#" + QS.rgb : undefined;
let fav = QS.color ? "#" + QS.color : undefined;

questionnaire.results.bind(results.feature);

if (rgb) results.feature.value = rgb;

const CSS = {
  body: {
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    fontSize: "16px",
  },
  b: {
    fontWeight: "bold"
  },
  a: {
    color: "white",
    textDecoration: "none",
    textShadow: "1px 1px 2px black",
    hover: {
      textDecoration: "underline",
    },
    after: {
      transition: "ease-in 0.1s",
      fontSize: "0.68em",
      verticalAlign: "top",
      paddingLeft: "0.25em",
    }
  },
  h: {
    fontFamily: "fantasy",
  },
  h1: {
    fontSize: "3em",
    color: "white",
    textShadow: "0 0 3px black",
  }
};

DOM.set({
  title: "PRE Spectrum",
  charset: "UTF-8",
  viewport: "width=device-width, initial-scale=1, minimum-scale=1",
  keywords: "3dpsyche, psychology, test, psychology test, personality types, personality, temperament, tendencies, states of mind, emotional state, MBTI, Myers-Briggs, ENTP, ENTJ, INTP, INTJ, ENFP, ENFJ, INFP, INFJ, ESTP, ESTJ, ISTP, ISTJ, ISFP, ISFJ, ESFP, ESFJ, jung, carl jung, freud, sigmund freud, rational, emotional, physical, mind body and soul, abstraction, lenino, lenin compres",
  description: "A psychometric tool to visualize Physical, Rational & Emotional focus.",
  icon: "media/favicon.gif",
  textAlign: "center",
  backgroundColor: rgb ? rgb : questionnaire.favorite,
  css: CSS,
  header: {
    backgroundColor: STYLE.lightSreen,
    boxShadow: "0 1em 1em " + STYLE.lightSreen,
    paddingTop: "2em",
    
    main: {
      maxWidth: "40em",
      lineHeight: "2.34em",
      margin: "0 auto 1em",
      onclick: e => window.location.href = "./",
      h1:["The", "Physical • Rational • Emotional", "Spectrum"],
      a: {
        marginTop: "3em",
        href: "http://lenino.net",
        text: "by Lenino"
      },
      p: {
        textAlign: "left",
        lineHeight: "1.2em",
        margin: "0 1em",
        text:"The PRE spectrum is a psychometric tool that helps us visualize physical, rational & emotional focus, values or tendencies. The questionaire below will average your answers and map them to one of the archetypes in the cube."
      },
    },
    section: {
      id: "cubeContainer",
      display: "flex",
      flexDirection: "column",
      placeContent: "center",
      small: "Loading color spectrum…",
      height: "400px",
      margin: "-2em auto 0"
    },
    select: {
      display: "block",
      backgroundColor: "transparent",
      zIndex: 10,
      position: "relative",
      margin: "-2em auto 3em",
      textAlignLast: "center",
      option: [{
        value: "none",
        text: "Animated view"
      }, {
        value: 1,
        text: "Physical Plains"
      }, {
        value: 2,
        text: "Rational Plains"
      }, {
        value: 3,
        text: "Emotional Plains"
      }, {
        value: 4,
        text: "Base vs. Top"
      }, {
        value: 0,
        text: "Top View"
      }, {
        value: -1,
        text: "Center View"
      }, {
        value: -2,
        text: "Base View"
      }],
      onchange: e => cube.view(e.target.value)
    },
  },

  main: rgb ? undefined : questionnaire.questionnaire,

  footer: {
    boxShadow: rgb ? "0 -1em 1em " + rgb : results.feature.bind(v => "0 -1em 1em " + v),
    backgroundColor: rgb ? rgb : results.feature,

    section: {
      style: STYLE.section,
      display: "flex",
      flexDirection: "column",
      h1: rgb && !fav ? "Featured" : "Results",
      p: !rgb || fav ? {
        margin: "1em 0 -2.25em -11em",
        zIndex: 1,
        text: "Closests:"
      } : undefined,

      div: results.model,

      a: {
        target: "_blank",
        content: [{
          display: rgb ? "none" : "block",
          href: DOM.bind([results.feature, questionnaire.favorite], (r, f) => "./?rgb=" + r.substr(1) + "&color=" + f.substr(1)),
          text: "Link to these results for you to save or share."
        }, !fav ? undefined : {
          margin: "0 auto",
          padding: "0.5em 1em",
          width: "fit-content",
          borderRadius: "0.5em",
          boxShadow: "1px 1px 2px black",
          backgroundColor: fav,
          href: "./?rgb=" + fav.substr(1),
          text: "This is the result of your favorite color: " + fav
        }, {
          fontSize: "1.25em",
          marginTop: "2em",
          href: "./",
          text: "Take the questionnaire."
        }, {
          fontSize: "small",
          marginTop: "3em",
          href: "http://lenino.net",
          text: "Created by Lenin Compres"
        }, {
          fontSize: "small",
          marginTop: "0.68em",
          href: "https://github.com/lenincompres/DOM.js",
          text: "Developed with DOM.js"
        }]
      }
    }
  }
});

let cube = new Cube({
  noLabels: true,
  container: cubeContainer,
  onclick: loadState,
});

function loadState(state){
  if(!state) return;
  window.location.href = "./?rgb=" + state.code.codeToHex();
}