import Bar from '../components/Bar.js';
import State from "../classes/State.js";
import STATES from "../states.js";
import * as style from "../style.js";
import * as AUX from "../../lib/auxiliary.js";
import Stats from '../components/Stats.js';
import Copy from '../../lib/Copy.js';
import {
  colorBullet
} from "../../lib/auxiliary.js";
import StateElement from '../components/StateElement.js';
import CubeSection from '../components/Cube.js';

export const _mbti = new Binder('- - - -');
export const _feature = new Binder('#808080');
export const _copy = new Binder();
const _cubeState = new Binder();

const bars = {
  e: new Bar('Extro/Intro', '6em', 'gray', true),
  s: new Bar('Sense/iNtuit', '6em', 'red', 'cyan'),
  t: new Bar('Think/Feel', '6em', 'lime', 'blue'),
  j: new Bar('Judge/Perceive', '6em', 'white', 'black'),
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

const level = (d, i) => {
  const vals = ['2a', '80', 'd5'];
  const bullet = [
    colorBullet(`#${vals[i]}0000`),
    colorBullet(`#00${vals[i]}00`),
    colorBullet(`#0000${vals[i]}`),
  ][d];
  const dimension = [Copy.at.physically, Copy.at.rationally, Copy.at.emotionally][d];
  const level = [Copy.at.relaxed, Copy.at.flexible, Copy.at.intense][i];
  return {
    margin: '0.25em',
    html: `${bullet} ${dimension} ${level}`,
  };
};

var stateElt = new StateElement();

_feature.onChange(hex => {
  if (!hex) return;
  stateElt.code = hex.hexToCode();
  let [r, g, b] = AUX.rgb(hex).map(v => v * 100 / 255);
  let getI = n => 100 * Math.pow(Math.abs(n - 50) / 50, 0.68);
  let j = (r + g + b) / 3;
  let t = 100 * g / (g + b);
  let s = 100 * r / (0.5 * (g + b) + r);
  let e = 100 - 100 * AUX.dist(r, g, b, 50, 50, 50) / AUX.dist(0, 0, 0, 50, 50, 50);
  //let e = 100 - (getI(r) + getI(g) + getI(b)) / 3;

  const binar = (v, A, B, N = '-', T = 100, D = 1) => v > T / 2 + D ? A : v < T / 2 - D ? B : N;
  _mbti.value = [binar(e, 'E', 'I'), binar(s, 'S', 'N'), binar(t, 'T', 'F'), binar(j, 'J', 'P')].join(' ');

  bars.r.value = r;
  bars.g.value = g;
  bars.b.value = b;
  bars.e.value = e;
  bars.s.value = s;
  bars.t.value = t;
  bars.j.value = j;
  bars.id.value = 0.5 * (r + b);
  bars.ego.value = 0.5 * (g + r);
  bars.sup.value = 0.5 * (g + b);

  _copy.value = new Copy(STATES[hex.hexToCode()]);
});

const _fixed = new Binder(false);

export const model = {
  main: {
    style: style.floatingSign,
    position: 'relative',
    padding: '1.5em',
    figure: stateElt,
    h3: {
      textTransform: 'capitalize',
      margin: '0.5em 0',
      text: _copy.as(copy => copy.at.archetype),
    },
    div: _feature.as(v => ({
      p: _copy.as(copy => Copy.text({
        en: `The ${copy.at.tone} (${copy.at.colour}) color is ${copy.at.adjective}; a psyche focused on ${copy.at.concept} as an archetypical ${copy.at.archetype}. It fits comfortably at a ${copy.at.location} (${copy.at.map}).`,
        es: `El color ${copy.at.tone} (${copy.at.colour}) es ${copy.at.adjective}; una psiquis efocada en ${copy.at.concept}, como el arquetipo de ${copy.at.archetype}. Se manifiesta a gusto en ${copy.at.location}s (${copy.at.map}).`,
      })),
      ul: {
        textAlign: 'left',
        margin: '1em auto 0',
        width: 'fit-content',
        li: [...STATES[v.hexToCode()].code].map((n, i) => level(i, parseInt(n))),
      },
      //aside: _cubeState,
    })),
  },
  aside: {
    css: style.floatingSign,
    margin: '1em 0',
    header: {
      h4: Copy.text({
        en: 'Break down and extrapolation to other frameworks',
        es: 'Desglose y extrapolación a otros sistemas.',
      }),
    },
    ul: {
      css: {
        fontSize: 'small',
        display: 'flex',
        flexWrap: 'wrap',
        placeContent: 'space-evenly',
        li_: {
          display: 'inline-block ',
          margin: '0.5em 0',
          width: '9em',
          p: {
            margin: '.75em 0 0.25em'
          },
        },
      },
      position: _fixed.as('relative', 'fixed'),
      backgroundColor: _fixed.as('none', style.lightScreen),
      padding: _fixed.as(0, '1rem'),
      flexDirection: _fixed.as('row', 'column'),
      top: 0,
      left: 0,
      margin: 0,
      li: [
        new Stats('3DPsyche', './', [bars.r, bars.g, bars.b], true),
        new Stats('Freudian', 'https://en.wikipedia.org/wiki/Id,_ego_and_super-ego', [bars.id, bars.ego, bars.sup], true),
        new Stats('Jungian', 'https://en.wikipedia.org/wiki/Jungian_cognitive_functions', [bars.e, bars.s, bars.t], true),
        new Stats('MBTI', 'https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator', [bars.j,
          {
            tag: 'p',
            fontSize: '1.5em',
            fontFamily: 'monospace',
            margin: '1em 0',
            text: _mbti,
          }
        ], true)
      ].map(s => ({
        stat: s,
      })),
      /*p: Copy.text({
        en: `* Extroversion here refers to sociability (${Copy.text(STATES['111'].colour)} color): empathy, openness, agreeability. Meanwhile, there are three paths to infroversion: physical impulses, rational conclusions, and emotional biases.`,
        es: `* La extroversión aquí se refiere a la sociabilidad (${Copy.text(STATES['111'].colour)} color): empatía, apertura, amabilidad.`,
      }),*/
    },
    dragstart: () => _fixed.value = !_fixed.value,
    footer: {
      small: _feature.as(v => Copy.text({
        en: `RGB color code: ${v}`,
        es: `Código de color RGB: ${v}`,
      })),
    }
  }
};

export default model;