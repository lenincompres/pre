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
    textSize = 12,
  }) {
    super();

    const t = this;

    this.isHover = false;
    this.nextPost = Math.floor(Math.random() * POSTS);
    this.currentPost = 0;
    this.changePost = false;
    this.overState;

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
          s.setRef(t.overState);
          s.interact = !!t.overState;
          s.draw()
        });
        if (t.overState) {
          let c = p.color('#' + t.overState.code.codeToHex())
          let l = p.lightness(c) < 45 || p.green(c) < 45;
          p.stroke(c);
          p.fill(l ? 255 : 0);
          p.text(t.overState.copy.at.archetype.toUpperCase(), p.mouseX - p.center[0], p.mouseY - p.center[1] - textSize);
        }
        if (t.changePost) {
          states.forEach(s => s.post = s.post === 0 ? t.nextPost : 0);
          t.currentPost = states[0].post;
          p.animate();
          t.changePost = false;
        }
        if (!t.currentPost || noLabels) return;
        let y = RADIUS * 4.3;
        let x = RADIUS * 4.75;
        let texts = [
          [Copy.at.actioning, -x, y],
          [Copy.at.sensing, 0, y],
          [Copy.at.abstracting, x, y],
        ];
        if (t.currentPost === 2) texts = [
          [Copy.at.instincting, -x * 1.12, y],
          [Copy.at.conceiving, 0, y],
          [Copy.at.regulating, x * 1.12, y],
        ];
        else if (t.currentPost === 3) texts = [
          [Copy.at.detaching, -x, y],
          [Copy.at.empathizing, 0, y],
          [Copy.at.valuing, x, y],
        ];
        else if (t.currentPost === 4) texts = [
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
        if (this.freeze && t.currentPost === t.nextPost) return;
        let isIni = t.currentPost !== 0 || t.nextPost === 0;
        p.timeOut = setTimeout(() => t.changePost = !t.isHover, wait * (isIni ? WAIT : 0.5));
        if (isIni) t.nextPost = (t.nextPost + 1) % POSTS;
      }

      p.mouseMoved = function () {
        if (!animated) return;
        t.isHover = !!parseInt(p.get(p.mouseX, p.mouseY).join('')); // any pixel color under the mouse
        p.cursor(t.isHover ? p.HAND : p.ARROW);
        if (t.isHover) {
          let newOver = states.filter(s => !s.hidden && p.dist(p.mouseX - p.center[0], p.mouseY - p.center[1], ...s.coords) < s.radius).pop();
          if (newOver === t.overState) return;
          if (t.overState) t.overState.selected = false;
          t.overState = newOver;
          if (t.overState) t.overState.selected = true;
          if (p.onmouseover) p.onmouseover(t.overState);
        } else {
          if (t.overState) {
            t.overState.selected = false;
            if (p.onmouseout) p.onmouseout(t.overState);
            p.animate();
          }
          t.overState = false;
        }
      }

      p.mouseReleased = function () {
        if (!t.isHover) return;
        onclick(t.overState);
      }
    });

    let states = new Array(27).fill().map((_, i) => new State({
      sketch: this.sketch,
      center: center,
      index: i,
    })).filter(state => !vicinity || state.isNear()).sort(state => state.tier);

    if (ref) states.forEach(state => state.setRef(ref));

    if (view !== undefined) this.view(view);
  }

  view(view) {
    this.changePost = true;
    if (isNaN(view) && animated) {
      states.forEach(s => s.hidden = false);
      this.freeze = false;
      this.nextPost = (this.nextPost + 1) % POSTS;
      this.sketch.animate();
      return;
    }
    this.freeze = true;
    states.forEach(s => s.hidden = view < 0 && !s.isRim && s.level - 3 > 2 * view);
    this.nextPost = view < 0 ? 0 : parseInt(view);
  }
}

customElements.define('cube-section', CubeSection);

export default CubeSection;