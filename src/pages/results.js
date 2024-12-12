import Bar from '../Bar.js';
import State from "../State.js";
import STATES from "../states.js";
import * as style from "../style.js";
import * as AUX from "../functions.js";
import Stats from '../Stats.js';
import Copy from '../../lib/Copy.js';

export const _mbti = new Binder('- - - -');
export const _feature = new Binder('#808080');
export const _copy = new Binder();
const _stateElement = new Binder();

const bars = {
  e: new Bar('Extro/Intro', '6em', 'gray', 'media/extremes.gif'),
  s: new Bar('Sense/iNtuit', '6em', 'red', 'cyan'),
  f: new Bar('Feel/Think', '6em', 'blue', 'lime'),
  j: new Bar('J/P', '6em', 'white', 'black'),
  id: new Bar('Id', '6em', 'magenta'),
  ego: new Bar('Ego', '6em', 'yellow'),
  sup: new Bar('Superego', '6em', 'cyan'),
  r: new Bar('Physical', '6em', 'red'),
  g: new Bar('Rational', '6em', 'lime'),
  b: new Bar('Emotional', '6em', 'blue')
};

Copy.add({
  physically: {
    en: 'Physically',
    es: 'Físicamente',
  },
  rationally: {
    en: 'Rationally',
    es: 'Racionalmente',
  },
  emotionally: {
    en: 'Emotionally',
    es: 'Emocionalmente',
  },
  relaxed: {
    en: 'relaxed',
    es: 'relajado',
  },
  flexible: {
    en: 'flexible',
    es: 'flexible',
  },
  intense: {
    en: 'intense',
    es: 'intenso',
  },
});

const level = (d, i) => new Object({
  margin: '0.25em',
  padding: '0.25em',
  borderRadius: '50%',
  b: [
    new Bar(null, '1.2em', 'red', 'black', [17, 50, 83][i]),
    new Bar(null, '1.2em', 'lime', 'black', [17, 50, 83][i]),
    new Bar(null, '1.2em', 'blue', 'black', [17, 50, 83][i]),
  ][d],
  span: [{
      marginLeft: '0.5em',
      text: [Copy.at.physically, Copy.at.rationally, Copy.at.emotionally][d] + ' ',
    },
    {
      text: [Copy.at.relaxed, Copy.at.flexible, Copy.at.intense][i],
    }
  ]
});

var stateP5 = new p5(function (me) {
  me.setup = () => {
    _stateElement.value = me.createCanvas(120, 120).elt;
    me.translate(me.width / 2, me.height / 2);
    me.update = code => {
      me.clear();
      let state = new State({
        sketch: me,
        center: code,
        radius: me.width / 2,
      });
      setTimeout(() => state.draw(true), 50);;
    };
    me.update(_feature.value.hexToCode());
  };
});

_feature.onChange(hex => {
  if (!hex) return;
  if (stateP5.update) stateP5.update(hex.hexToCode());
  let [r, g, b] = AUX.rgb(hex).map(v => v * 100 / 255);
  let getI = n => 100 * Math.pow(Math.abs(n - 50) / 50, 0.68);
  let j = (r + g + b) / 3;
  let f = 100 * b / (g + b);
  let s = 100 * r / (0.5 * (g + b) + r);
  let e = 100 - 100 * AUX.dist(r, g, b, 50, 50, 50) / AUX.dist(0, 0, 0, 50, 50, 50);
  //let e = 100 - (getI(r) + getI(g) + getI(b)) / 3;

  const binar = (v, A, B, N = '-', T = 100, D = 1) => v > T / 2 + D ? A : v < T / 2 - D ? B : N;
  _mbti.value = [binar(e, 'E', 'I'), binar(s, 'S', 'N'), binar(f, 'F', 'T'), binar(j, 'J', 'P')].join(' ');

  bars.r.value = r;
  bars.g.value = g;
  bars.b.value = b;
  bars.e.value = e;
  bars.s.value = s;
  bars.f.value = f;
  bars.j.value = j;
  bars.id.value = 0.5 * (r + b);
  bars.ego.value = 0.5 * (g + r);
  bars.sup.value = 0.5 * (g + b);

  _copy.value = new Copy(STATES[hex.hexToCode()]);
});

export const model = {
  div: {
    backgroundColor: '#eee',
    margin: '0 auto',
    borderRadius: '0.5em',
    boxShadow: '1px 1px 2px black',
    position: 'relative',
    width: '18em',
    padding: '1.5em',
    div: _stateElement,
    h3: {
      margin: '0.5em 0',
      text: _copy.as(copy => copy.at.archetype),
    },
    small: {
      display: 'block',
      width: 'fit-content',
      margin: '0 auto',
      div: {
        content: _feature.as(v => {
          let info = STATES[v.hexToCode()];
          return {
            p: _copy.as(copy => `The ${copy.at.tone} (${copy.at.colour}) color is ${copy.at.adjective}; a psyche focused on ${copy.at.concept}, as an archetypical ${copy.at.archetype}.`),
            ul: {
              textAlign: 'left',
              margin: '1em auto 0',
              width: 'fit-content',
              li: [...info.code].map((n, i) => level(i, parseInt(n))),
            }
          }
        })
      }
    }
  },
  section: {
    style: style.floatingSign,
    css: {
      a: {
        color: 'black',
        textDecoration: 'underline',
        textShadow: 'none',
      }
    },
    margin: '1em 0',
    header: {
      h3: 'Break down and extrapolation to other frameworks',
    },
    ul: {
      fontSize: 'small',
      css: {
        display: 'flex',
        flexWrap: 'wrap',
        placeContent: 'space-evenly',
        li: {
          display: 'inline-block ',
          margin: '0.5em 0',
          width: '9em',
          p: {
            margin: '.75em 0 0.25em'
          },
        }
      },
      li: [new Stats('3DPsyche', './', [bars.r, bars.g, bars.b], true),
        new Stats('Freudian', 'https://en.wikipedia.org/wiki/Id,_ego_and_super-ego', [bars.id, bars.ego, bars.sup]),
        new Stats('Jungian', 'https://en.wikipedia.org/wiki/Jungian_cognitive_functions', [bars.f, bars.s, bars.e]),
        new Stats('MBTI', 'https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator', [bars.j,
          {
            tag: 'p',
            fontSize: '1.5em',
            fontFamily: 'monospace',
            margin: '0.5em 0 0 2em',
            text: _mbti
          }
        ])
      ],
      p: '* Extroversion here refers to sociability: empathy, openess, agreeability.',
    },
    footer: {
      p: _feature.as(v => `RGB color code: ${v}`),
    }
  }
};

export default model;