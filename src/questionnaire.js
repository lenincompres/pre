import * as style from "./style.js";
import * as AUX from "./functions.js";
import QUESTIONS from "./questions.js";

/* Methods to calculate the results */

export const favorite = new Binder('#808080');
export const results = new Binder('#808080');

const sampleQuestions = [{
  "question": "How much do you like these colors?",
  "options": [{
      "choice": "Reds",
      "hint": "scarlet, maroon, brick"
    },
    {
      "choice": "Greens",
      "hint": "lime, army, mint"
    },
    {
      "choice": "Blues",
      "hint": "sky, azure, navy"
    }
  ]
}, {
  "question": "Which way does your color preference lean?",
  "options": [
    [{
      "choice": "Neutral"
    }, {
      "choice": "Intense"
    }],
    [{
      "choice": "Dark"
    }, {
      "choice": "Light"
    }]
  ]
}];

const modelQuestion = q => {
  const frequencies = ['Rarely', 'Seldom', 'Occasionally', 'Moderately', 'Frequently', 'Generally', 'Usually', 'Extremely'];
  q.answers = [];
  q.model = {
    h2: !q.question ? undefined : {
      marginTop: '2em',
      fontSize: '1.5em',
      padding: '0.68em 1em 0',
      backgroundColor: style.darkSreen,
      text: q.question
    },
    div: q.options.map(o => {
      var isVS = Array.isArray(o);
      if (!isVS) o = [o];
      var answer = new Binder(50);
      q.answers.push(answer);
      return {
        backgroundColor: style.whiteSreen,
        margin: '1px 0',
        padding: '0.68em',
        position: 'relative',
        color: 'black',
        div: {
          margin: '0 1em',
          display: 'flex',
          flexDirection: 'row',
          placeContent: 'space-around',
          div: o.map(option => new Object({
            h3: {
              fontSize: '1.5em',
              marginTop: '0.5em',
              color: 'black',
              textShadow: 'none',
              text: option.choice
            },
            p: {
              fontSize: 'small',
              color: '#777',
              text: option.hint
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
          color: '#06c',
          bottom: isVS ? '3.5em' : '3em',
          position: 'absolute',
          pointerEvents: 'none',
          margin: isVS ? '0 2em' : '0 1em',
          maxWidth: '15%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          content: [{
            right: 0,
            text: isVS ? '⟶' : answer.bind(v => v + '%')
          }, {
            left: 0,
            text: isVS ? '⟵' : answer.bind(v => frequencies[Math.floor(v * frequencies.length / 100)])
          }, !isVS ? undefined : {
            left: '50%',
            marginLeft: '-0.5em',
            text: 'or'
          }]
        }
      }
    })
  }
  return q;
};

const questions = new Binder(QUESTIONS.map(modelQuestion));

export const questionnaire = {
  style: style.section,
  header: {
    style: style.floatingSign,
    h4: 'Questionnaire Instructions',
    p: [
      'Rate options individually, but mind how they compare to others in the same group.',
    ]
  },
  article: {
    color: '#fff',
    margin: '4em 0 0',
    content: [{
      h1: 'Practice Section',
      div: sampleQuestions.map(q => modelQuestion(q).model),
    }, {
      marginTop: '1em',
      a: {
        fontSize: '1.14em',
        target: '_blank',
        text: favorite.bind(v => 'The RGB code for the resulting average color is: ' + v),
        href: favorite.bind(v => './?rgb=' + v.substr(1)),
      }
    }, {
      marginTop: '8em',
      h1: 'The actual PRE questionaire',
      div: questions.bind(qs => qs.map(q => q.model))
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
  favorite.value = AUX.hex(
    ...sampleQuestions[0].answers.map(v => v.value * 255 / 100),
    ...sampleQuestions[1].answers.map(v => v.value)
  );
  //PRE results
  let rgb = getAverage(0, 5).map(v => v * 255 / 100);
  let lights = getAverage(6, 9);
  let sats = getAverage(10, 13);
  console.log(rgb, sats, lights, );
  results.value = AUX.hex(...rgb,
    sats.reduce((o, v) => v + o, 0) / 3,
    lights.reduce((o, v) => v + o, 0) / 3
  );
}

export default questionnaire;