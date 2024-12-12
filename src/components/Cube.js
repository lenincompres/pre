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
  }) {
    super();

    const _canvas = new Binder();
    const thisP5 = new p5(function () {});

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
        onchange: e => thisP5.view(e.target.value),
      },
      figure: _canvas,
    });

    let isHover = false;
    let nextPost = Math.floor(Math.random() * POSTS);
    let currentPost = 0;
    let changePost = false;
    let overState;

    let states = new Array(27).fill().map((_, i) => new State({
      sketch: thisP5,
      index: i
    })).filter(state => !thisP5.vicinity || state.isNear()).sort(state => state.tier);

    if (ref) states.forEach(state => state.setRef(ref));

    let size = 0.4 * states[0].radius;

    thisP5.setup = function () {
      let canvas = thisP5.createCanvas(thisP5.windowWidth, 400);
      thisP5.center = [thisP5.width * 0.5, thisP5.height * 0.5];
      console.log(canvas);
      _canvas.value = canvas.elt;
      thisP5.strokeWeight(3);
      thisP5.textFont('Verdana');
      thisP5.textSize(size);
      thisP5.textAlign(thisP5.CENTER, thisP5.CENTER);
      thisP5.animate();
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
      if (thisP5.freeze && currentPost === nextPost) return;
      let isIni = currentPost !== 0 || nextPost === 0;
      thisP5.timeOut = setTimeout(() => changePost = !isHover, wait * (isIni ? WAIT : 0.5));
      if (isIni) nextPost = (nextPost + 1) % POSTS;
    }

    thisP5.view = function (view) {
      changePost = true;
      if (isNaN(view)) {
        states.forEach(s => s.hidden = false);
        thisP5.freeze = false;
        nextPost = (nextPost + 1) % POSTS;
        thisP5.animate();
        return;
      }
      thisP5.freeze = true;
      states.forEach(s => s.hidden = view < 0 && !s.isRim && s.level - 3 > 2 * view);
      nextPost = view < 0 ? 0 : parseInt(view);
    }

    thisP5.mouseMoved = function () {
      if (!thisP5.canvas) return;
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