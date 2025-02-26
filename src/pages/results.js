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
  disconnected: {
    en: 'disconnected',
    es: 'desconectado',
  },
  perceptible: {
    en: 'perceptible',
    es: 'perceptible',
  },
  determined: {
    en: 'determined',
    es: 'determinado',
  },
  only: {
    en: 'only',
    es: 'solo',
  },
  and: {
    en: 'and',
    es: 'y',
  },
});

const INTROS = [
  [
    Copy.text({
      en: 'physical abstraction can make it aloof and fearful',
      es: 'la abstracción física lo puede hacer apartado y temeroso',
    }),
    undefined,
    Copy.text({
      en: 'physical action can make it competitive and impatient',
      es: 'la acción física lo puede hacer competitivo e impaciente',
    }),
  ],
  [
    Copy.text({
      en: 'rational instiction can make it impulsive and obstinate',
      es: 'la instinción racional lo puede hacer impulsivo y obstinado',
    }),
    undefined,
    Copy.text({
      en: 'rational regulation can make it rightgeous and sctrict',
      es: 'la regulación racional lo puede hacer santurrón y estricto',
    }),
  ],
  [
    Copy.text({
      en: 'emotional detachment can make it eccentric and insensitive',
      es: 'el desapego emocional lo puede hacer excéntrico e insensible',
    }),
    undefined,
    Copy.text({
      en: 'emotional valuation can make it biased and sensitive',
      es: 'la valoración emocional lo puede hacer sesgado y sensible',
    }),
  ],
];

const TENDECIES = [
  Copy.text({
    es: 'altamente introvertida',
    en: 'highly introverted',
  }),
  Copy.text({
    es: 'mayormente introvertida',
    en: 'more introverted',
  }),
  Copy.text({
    es: 'mayormente extrovertida',
    en: 'more extroverted',
  }),
  Copy.text({
    es: 'altamente extrovertida',
    en: 'highly extroverted',
  }),
];

const level = (d, i) => {
  const vals = ['2a', '80', 'd5'];
  const blank = colorBullet(`transparent`);
  let bullet = [
    colorBullet(`#${vals[i]}0000`),
    colorBullet(`#00${vals[i]}00`),
    colorBullet(`#0000${vals[i]}`),
  ][d];
  bullet = [
    `${bullet}${blank}${blank}`,
    `${blank}${bullet}${blank}`,
    `${blank}${blank}${bullet}`,
  ][i];
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
  let code = hex.hexToCode();
  stateElt.code = code;
  _copy.value = new Copy(STATES[code]);
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
    /**
     * The best concept to define the focus of this state is responsibility. It is the state of determination and duty. It represents a psyche that is physically, rationally and emotionally tense. In it we are prepared to act towards a predetermined goal. We have no time for banalities, and feel deeply involved, pro or con, with everything. It is not really socially extroverted, but socially committed.

By definition, this is the state of focus in action, regulation and valuation. Its main properties are bringing principles to action, order to passions, and value to industry. This defines our ability to carry on our ideals with conviction and sense of duty.

It has three tendencies towards introversion:

- Action cultivates competition and impatience, prompting self-reliance.
- Regulation cultivates righteousness and strictness, maintaining self-confidence.
- Valuation cultivates particular interests and sensibility, causing self-absorption.

Topographic Map location: Government

MBTI approximation: I**J


Archetype: The Chief

Rulers, Executives… people who have a constant tendency to this state love being productive, are passionate about order, and religious about habits. They tend to achieve relaxation through control. They are committed, and remain focused on their duties even on vacation. Others would think they make a big event out of trivial things, or stress unnecessarily. They are effective in carrying out any enterprise, as they struggle to cover every subject. They may tend to feel righteous; this can make them the most decisive and successful people, but the less likely to question their goals. They are bound for leadership. They enjoy acknowledging merits, inspiring others, having strong adversaries, power and victory.

People that are strongly imperial like to analyze things thoroughly, but are passionate about their feelings, beliefs, likes and dislikes; this may constrict analysis towards a particular goal. Also, they are eager to act, and this limits patience. They look at the greater good or big picture, but are lenient towards customs, routines and personal preferences. They have great focus, and thus a tunneled view. This combination results in great achievements, but they must beware not to lead arbitrarily. They tend to be philosophic when relaxed, passionate when having fun, and industrious when alone.
     */
    section: _copy.as(copy => ({
      p: Copy.text({
        en: `The ${copy.at.tone} (${copy.at.colour}) color is ${copy.at.adjective}; a psyche focused on ${copy.at.concept} as an archetypical ${copy.at.archetype}. It fits comfortably at ${copy.at.location} (${copy.at.map}).`,
        es: `El color ${copy.at.tone} (${copy.at.colour}) es ${copy.at.adjective}; una psiquis enfocada en ${copy.at.concept}. Como su arquetipo de ${copy.at.archetype}, se manifiesta a gusto en ${copy.at.location} (${copy.at.map}).`,
      })
    })),
    ul: _feature.as(v => ({
      textAlign: 'left',
      margin: '0 auto',
      width: 'fit-content',
      li: [...STATES[v.hexToCode()].code].map((n, i) => level(i, parseInt(n) || 0)),
    })),
    footer: {
      p: _feature.as(v => {
        let code = [...STATES[v.hexToCode()].code].map(n => parseInt(n));
        let ext = code.reduce((o, n) => n === 1 ? (o + 1) : o, 0);
        let s = ext === 1 ? '' : 's';
        let only = ext === 1 ? Copy.at.only : '';
        let intros = code.map((n, i) => INTROS[i][n]).filter(n => n);
        intros[intros.length-1] = Copy.at.and + ' ' + intros[intros.length-1];
        return Copy.text({
          en: `The levels or coordinates in the three dimensions of the psyche could be ${Copy.at.relaxed}, ${Copy.at.flexible} or ${Copy.at.intense}. The middle level (${Copy.at.flexible}) is equivalent to perception—the point of extroversion or external focus. There ${s?'are':'is'} ${only} ${ext} ${Copy.at.flexible} tendencies, which indicates a ${TENDECIES[ext]} personality. In this case: ${intros.join('; ')}.`,
          es: `Los niveles o coordenadas en las tres dimentiones de la psiquis pueden ser ${Copy.at.relaxed}, ${Copy.at.flexible} o ${Copy.at.intense}. El nivel medio (${Copy.at.flexible}) equivale a la percepción o enfoque externo. Tenemos ${only} ${ext} tendencia${s} ${Copy.at.flexible}${s}; lo que indica una personalidad ${TENDECIES[ext]}. De modo que: ${intros.join('; ')}.`,
        })
      }),
    }
    //aside: _cubeState,
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
        new Stats('MBTI', 'https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator', [{
            display: 'block',
            margin: '2em 0 0.5em',
            fontSize: '1.5em',
            fontFamily: 'monospace',
            text: _mbti,
          },
          bars.j,
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
        es: `Código de color RGB: ${v} (${v.toRGB().map(n => Math.round(100*n/255) + '%')})`,
      })),
    }
  }
};

export default model;