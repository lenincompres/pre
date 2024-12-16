import Copy from "../../lib/Copy.js";
import Collabsable from "../components/Collapsable.js";
import * as STYLE from "../style.js";
import {
  colorBullet
} from "../../lib/auxiliary.js";
import Cube from "../components/Cube.js";

export default {
  css: {
    h2: {
      color: 'black',
      textShadow: `none`,
    },
  },
  backgroundColor: STYLE.lightScreen,

  header: {
    maxWidth: "40em",
    width: "calc(100% - 2rem)",
    margin: "0 auto 1rem",
    label: {
      for: "Cube",
      h2: Copy.text({
        en: "Explore the dimensions of your mind: a framework for human perception, determination, and focus.",
        es: "Explora las dimensiones de tu mente: una visualización para la percepción, determinación y enfoque humano.",
      })
    },
  },

  figure: {
    display: "flex",
    flexDirection: "column",
    placeContent: "center",
    height: "400px",
    margin: "-1em auto 0",
    content: new Cube({
      animated: true,
      onclick: state => state && state.code && (window.location.href = "./?rgb=" + state.code.codeToHex()),
    }),
  },

  main: {
    maxWidth: "40em",
    width: "calc(100% - 2rem)",
    lineHeight: "2.5em",
    margin: "0 auto",
    textAlign: "left",
    lineHeight: "1.5em",
    css: {
      "collabsable-section>a": {
        borderTop: `solid 1px black`,
      }
    },
    p: Copy.text({
      en: `This psychometric tool maps personality archetypes onto three dimensions of focus: <b style="color:darkred">physical</b> (${STYLE.getIcon('arrowDL')}), <b style="color:darkgreen">rational</b> (${STYLE.getIcon('arrowU')}) & <b style="color:darkblue">emotional</b> (${STYLE.getIcon('arrowDR')}). In each, we interact with the world through perception, determination, and disengagement.`,
      es: `Esta herramienta psicométrica asigna arquetipos a tres dimensiones de enfoque: <b style="color:darkred">física</b> (↙), <b style="color:darkgreen">racional</b> ( ↑) y <b style="color:darkblue">emocional</b> (↘). En cada una de estas, interactuamos a través de la percepción, la determinación y la desconexión.`,
    }),
    section: new Collabsable({
        div: [{
          h3: Copy.text({
            en: 'Perception: How we take in information and stimuli.',
            es: 'Percepción: Cómo asimilamos información y estímulos.',
          }),
          ul: {
            li: Copy.text({
              en: [
                `${colorBullet('#822')} Physical perception (sensing): Sensory awareness of one's surroundings.`,
                `${colorBullet('#282')} Rational perception (conceiving): Grasping ideas, meanings, and concepts.`,
                `${colorBullet('#228')} Emotional perception (empathizing): Sensing moods, vibes, and inspiration.`,
              ],
              es: [
                `${colorBullet('#822')} Percepción física (sensación): Observar el entorno sensorial inmediato.`,
                `${colorBullet('#282')} Percepción racional (concepción): Concebir ideas, significados y datos.`,
                `${colorBullet('#228')} Percepción emocional (inspiración): Empatizar o percibir ánimos y vibras.`,
              ]
            }),
          },
        }, {
          h3: Copy.text({
            en: 'Determination: How we reach conclusive judgments or behaviors.',
            es: 'Determinación: Cómo creamos juicios concluyentes o comportamientos.',
          }),
          ul: {
            li: Copy.text({
              en: [
                `${colorBullet('#d22')} Physical determination (actioning): Exerting change on the environment.`,
                `${colorBullet('#2d2')} Rational determination (regulating): Arriving at thinking-based conclusions.`,
                `${colorBullet('#22d')} Emotional determination (valuing): Judging based on emotional affect.`,
              ],
              es: [
                `${colorBullet('#d22')} Determinación física (acción): Ejercer cambios en el medio ambiente.`,
                `${colorBullet('#2d2')} Determinación racional (regulación): Concluir en base al pensamiento.`,
                `${colorBullet('#22d')} Determinación emocional (valoración): Apreciar basándonos en el afecto.`,
              ],
            }),
          },
        }, {
          h3: Copy.text({
            en: `Disengagement: How we neglect one dimension to focus on others.`,
            es: `Desconexión: cómo ignoramos una dimensión para centrarnos en otras.`,
          }),
          ul: {
            li: Copy.text({
              en: [
                `${colorBullet('#222', '#d22c')} Physical disengagement (abstracting) helps problem-solving and creativity.`,
                `${colorBullet('#222', '#2d2c')} Rational disengagement (instincting) enables quick, intuitive responses.`,
                `${colorBullet('#222', '#22dc')} Emotional disengagement (detaching) provides emotional objectivity.`
              ],
              es: [
                `${colorBullet('#222', '#d22c')} Desconexión física (abstracción): Ayuda al análisis y a la creatividad.`,
                `${colorBullet('#222', '#2d2c')} Desconexión racional (instinción): Permite respuestas rápidas e intuitivas.`,
                `${colorBullet('#222', '#22dc')} Desconexión emocional (objetivación): Proporciona objetividad emocional.`
              ],
            })
          }
        }]
      },
      Copy.text({
        en: 'Break down',
        es: 'Expandir',
      }),
      Copy.text({
        en: 'Close',
        es: 'Cerrar',
      })),
    h2: Copy.text({
      en: `Understanding the cube`,
      es: `Entender el cubo`,
    }),
    p_: Copy.text({
      en: [`We engage and disengage with these dimensions to perform tasks, focus, and even relax. In subjects like math, we benefit from physical abstraction to focus on logic. Emotional detachment enhances objectivity in decision-making. And, bypassing rational overthinking is necessary to develop keen instincts.`, `Some tasks are multidimensional. For instance, a dance performance needs physical and emotional focus; car repair calls for physical and rational engagement; while creative writing is a rational and emotional endeavor.`, `These combinations create the dynamic spectrum illustrated above. Each cube represents an archetype that embodies its unique combination. We may be multifaceted, but gravitate to some spaces with more ease than others.`],
      es: [`Nos involucramos y desconectamos de estas dimensiones para realizar tareas, concentrarnos o relajarnos. En materias como matemáticas, nos beneficiamos de la abstracción física para centrarnos en la lógica. El desapego emocional mejora la objetividad en la toma de decisiones. Y necesitamos evitar el pensamiento excesivo racional para agudizar nuestros instintos.`, `
      Algunas tareas son multidimensionales. Por ejemplo, un espectáculo de danza necesita concentración física y emocional; la reparación de automóviles exige un compromiso físico y racional; mientras que la escritura creativa es un asunto racional y emocional.`, `Estas combinaciones crean el espectro dinámico ilustrado arriba. Cada cubo representa un arquetipo que encarna su combinación única. Puede que seamos multifacéticos, pero tenemos tendencia a unos roles más que a otros.`],
    }),
  },
};