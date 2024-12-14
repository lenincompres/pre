import Copy from "../../lib/Copy.js";
import State from "../classes/State.js";

const WAIT = 4; //seconds between posts
const POSTS = 5;
const RADIUS = 40;

Copy.add({
  actioning: {
    en: 'Actioning',
    es: 'Acción',
  },
  sensing: {
    en: 'Sensing',
    es: 'Sensación',
  },
  abstracting: {
    en: 'Abstracting',
    es: 'Abstracción',
  },
  instincting: {
    en: 'Instincting',
    es: 'Instinto',
  },
  conceiving: {
    en: 'Conceiving',
    es: 'Concepto',
  },
  regulating: {
    en: 'Regulating',
    es: 'Regulación',
  },
  detaching: {
    en: 'Detaching',
    es: 'Desapego',
  },
  empathizing: {
    en: 'Empathizing',
    es: 'Empatía',
  },
  valuing: {
    en: 'Valuing',
    es: 'Valoración',
  },
  relaxing: {
    en: 'Relaxation',
    es: 'Relajación',
  },
  demanding: {
    en: 'Determination',
    es: 'Determinación',
  },
  periphery: {
    en: 'Specializing & Normalizing',
    es: 'Especialización & Normalización',
  }
});

class CubeSection extends HTMLElement {
  constructor({
    ref = undefined,
    noLabels = false,
    onready = () => null,
    onclick = () => null,
    vicinity = false,
    width = undefined,
    height = 400,
    center = '111',
    animated,
    view,
  }) {
    super();

    const _canvas = new Binder();

    this.set({
      small: _canvas.as(`Loading color spectrum…`, ''),
      select: {
        display: _canvas.as("none", "block"),
        backgroundColor: "transparent",
        zIndex: 10,
        position: "relative",
        margin: "2em auto -2em",
        textAlignLast: "center",
        option: [{
          value: "none",
          text: Copy.text({
            en: "Animated view",
            es: 'Cubo Animado',
          }),
        }, {
          value: 1,
          text: Copy.text({
            en: "Physical Plains",
            es: 'Planos Físicos',
          }),
        }, {
          value: 2,
          text: Copy.text({
            en: "Rational Plains",
            es: 'Planos Rationales',
          }),
        }, {
          value: 3,
          text: Copy.text({
            en: "Emotional Plains",
            es: 'Planos Emotionales',
          }),
        }, {
          value: 4,
          text: Copy.text({
            en: "Base vs. Top",
            es: 'Base y Tope',
          }),
        }, {
          value: 0,
          text: Copy.text({
            en: "Top View",
            es: 'Vista de Tope',
          }),
        }, {
          value: -1,
          text: Copy.text({
            en: "Center View",
            es: 'Vista de Centro',
          }),
        }, {
          value: -2,
          text: Copy.text({
            en: "Base View",
            es: 'Vista de Base',
          }),
        }],
        onchange: e => this.view(e.target.value),
      },
      figure: _canvas,
    });

    let isHover = false;
    let nextPost = Math.floor(Math.random() * POSTS);
    let currentPost = 0;
    let changePost = false;
    let overState;

    this.sketch = new p5(p => {

      p.setup = function () {
        if (width === undefined) width = p.windowWidth;
        _canvas.value = p.createCanvas(width, height).elt;
        p.strokeWeight(3);
        p.textFont('Verdana');
        p.textSize(textSize);
        p.center = [width * 0.5, height * 0.5];
        p.textAlign(p.CENTER, p.CENTER);
        if (animated) p.animate();
      }

      p.draw = function () {
        p.clear();
        p.translate(...p.center);
        states.forEach(s => {
          s.setRef(overState);
          s.interact = !!overState;
          s.draw()
        });
        if (overState) {
          let c = p.color('#' + overState.code.codeToHex())
          let l = p.lightness(c) < 45 || p.green(c) < 45;
          p.stroke(c);
          p.fill(l ? 255 : 0);
          p.text(overState.copy.at.archetype.toUpperCase(), p.mouseX - p.center[0], p.mouseY - p.center[1] - textSize);
        }
        if (changePost) {
          states.forEach(s => s.post = s.post === 0 ? nextPost : 0);
          currentPost = states[0].post;
          p.animate();
          changePost = false;
        }
        if (!currentPost || noLabels) return;
        let y = RADIUS * 4.3;
        let x = RADIUS * 4.75;
        let texts = [
          [Copy.at.actioning, -x, y],
          [Copy.at.sensing, 0, y],
          [Copy.at.abstracting, x, y],
        ];
        if (currentPost === 2) texts = [
          [Copy.at.instincting, -x * 1.12, y],
          [Copy.at.conceiving, 0, y],
          [Copy.at.regulating, x * 1.12, y],
        ];
        else if (currentPost === 3) texts = [
          [Copy.at.detaching, -x, y],
          [Copy.at.empathizing, 0, y],
          [Copy.at.valuing, x, y],
        ];
        else if (currentPost === 4) texts = [
          [Copy.at.relaxing, -x * 1.28, y],
          [Copy.at.periphery, 0, y],
          [Copy.at.demanding, x * 1.28, y],
        ];
        p.fill(0);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(RADIUS * 0.34);
        p.noStroke();
        texts.forEach(t => p.text(...t));
      }

      p.animate = function (wait = 1000) {
        if (p.timeOut) clearTimeout(p.timeOut);
        if (this.freeze && currentPost === nextPost) return;
        let isIni = currentPost !== 0 || nextPost === 0;
        p.timeOut = setTimeout(() => changePost = !isHover, wait * (isIni ? WAIT : 0.5));
        if (isIni) nextPost = (nextPost + 1) % POSTS;
      }

      p.mouseMoved = function () {
        if (!animated) return;
        isHover = !!parseInt(p.get(p.mouseX, p.mouseY).join('')); // any pixel color under the mouse
        p.cursor(isHover ? p.HAND : p.ARROW);
        if (isHover) {
          let newOver = states.filter(s => !s.hidden && p.dist(p.mouseX - p.center[0], p.mouseY - p.center[1], ...s.coords) < s.radius).pop();
          if (newOver === overState) return;
          if (overState) overState.selected = false;
          overState = newOver;
          if (overState) overState.selected = true;
          if (p.onmouseover) p.onmouseover(overState);
        } else {
          if (overState) {
            overState.selected = false;
            if (p.onmouseout) p.onmouseout(overState);
            p.animate();
          }
          overState = false;
        }
      }

      p.mouseReleased = function () {
        if (!isHover) return;
        onclick(overState);
      }
    });

    let states = new Array(27).fill().map((_, i) => new State({
      sketch: this.sketch,
      center: center,
      index: i,
    })).filter(state => !vicinity || state.isNear()).sort(state => state.tier);

    if (ref) states.forEach(state => state.setRef(ref));

    let textSize = 0.4 * states[0].radius;


    this.view = (view) => {
      changePost = true;
      if (isNaN(view) && animated) {
        states.forEach(s => s.hidden = false);
        this.freeze = false;
        nextPost = (nextPost + 1) % POSTS;
        this.sketch.animate();
        return;
      }
      this.freeze = true;
      states.forEach(s => s.hidden = view < 0 && !s.isRim && s.level - 3 > 2 * view);
      nextPost = view < 0 ? 0 : parseInt(view);
    }

    if (view !== undefined) this.view(view);
  }
}

customElements.define('cube-section', CubeSection);

export default CubeSection;