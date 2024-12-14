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
        display: animated ? _canvas.as("none", "block") : "none",
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
      content: _canvas,
    });

    let isHover = false;
    let nextPost = Math.floor(Math.random() * POSTS);
    let currentPost = 0;
    let changePost = false;
    let overState;

    const thisP5 = new p5(function () {});
    if(width === undefined) width = thisP5.windowWidth;

    let states = new Array(27).fill().map((_, i) => new State({
      sketch: thisP5,
      center: center,
      index: i,
    })).filter(state => !vicinity || state.isNear()).sort(state => state.tier);

    if (ref) states.forEach(state => state.setRef(ref));

    let size = 0.4 * states[0].radius;
    
    thisP5.center = [width * 0.5, height * 0.5];

    thisP5.setup = function () {
      _canvas.value = thisP5.createCanvas(width, height).elt;
      thisP5.strokeWeight(3);
      thisP5.textFont('Verdana');
      thisP5.textSize(size);
      thisP5.textAlign(thisP5.CENTER, thisP5.CENTER);
      if(animated) thisP5.animate();
    }

    thisP5.draw = function () {
      thisP5.clear();
      thisP5.translate(...thisP5.center);
      states.forEach(s => {
        s.setRef(overState);
        s.interact = !!overState;
        s.draw()
      });
      if (overState) {
        let c = thisP5.color('#' + overState.code.codeToHex())
        let l = thisP5.lightness(c) < 45 || thisP5.green(c) < 45;
        thisP5.stroke(c);
        thisP5.fill(l ? 255 : 0);
        thisP5.text(overState.copy.at.archetype.toUpperCase(), thisP5.mouseX - thisP5.center[0], thisP5.mouseY - thisP5.center[1] - size);
      }
      if (changePost) {
        states.forEach(s => s.post = s.post === 0 ? nextPost : 0);
        currentPost = states[0].post;
        thisP5.animate();
        changePost = false;
      }
      if (!currentPost || noLabels) return; // not to draw the labels
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
      thisP5.fill(0);
      thisP5.textAlign(thisP5.CENTER, thisP5.CENTER);
      thisP5.textSize(RADIUS * 0.34);
      thisP5.noStroke();
      texts.forEach(t => thisP5.text(...t));
    }

    thisP5.animate = function (wait = 1000) {
      if (thisP5.timeOut) clearTimeout(thisP5.timeOut);
      if (this.freeze && currentPost === nextPost) return;
      let isIni = currentPost !== 0 || nextPost === 0;
      thisP5.timeOut = setTimeout(() => changePost = !isHover, wait * (isIni ? WAIT : 0.5));
      if (isIni) nextPost = (nextPost + 1) % POSTS;
    }

    this.view = function (view) {
      changePost = true;
      if (isNaN(view) && animated) {
        states.forEach(s => s.hidden = false);
        this.freeze = false;
        nextPost = (nextPost + 1) % POSTS;
        thisP5.animate();
        return;
      }
      this.freeze = true;
      states.forEach(s => s.hidden = view < 0 && !s.isRim && s.level - 3 > 2 * view);
      nextPost = view < 0 ? 0 : parseInt(view);
    }
    if(view !== undefined) this.view(view);

    thisP5.mouseMoved = function () {
      if (!thisP5.canvas || !animated) return;
      isHover = !!parseInt(thisP5.get(thisP5.mouseX, thisP5.mouseY).join('')); // any pixel color under the mouse
      thisP5.cursor(isHover ? thisP5.HAND : thisP5.ARROW);
      if (isHover) {
        let newOver = states.filter(s => !s.hidden && thisP5.dist(thisP5.mouseX - thisP5.center[0], thisP5.mouseY - thisP5.center[1], ...s.coords) < s.radius).pop();
        if (newOver === overState) return;
        if (overState) overState.selected = false;
        overState = newOver;
        if (overState) overState.selected = true;
        if (thisP5.onmouseover) thisP5.onmouseover(overState);
      } else {
        if (overState) {
          overState.selected = false;
          if (thisP5.onmouseout) thisP5.onmouseout(overState);
          thisP5.animate();
        }
        overState = false;
      }
    }

    thisP5.mouseReleased = function () {
      if (!isHover) return;
      onclick(overState);
    }
  }
}

customElements.define('cube-section', CubeSection);

export default CubeSection;