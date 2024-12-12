import Copy from "../lib/Copy.js";
import State from "./State.js";

const [ENG, ESP] = ['eng', 'esp'];
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
    es: 'Instintos',
  },
  conceiving: {
    en: 'Conceiving',
    es: 'Conceptos',
  },
  regulating: {
    en: 'Regulating',
    es: 'Reglas',
  },
  detaching: {
    en: 'Detaching',
    es: 'Objetivos',
  },
  empathizing: {
    en: 'Empathizing',
    es: 'Empatía',
  },
  valuing: {
    en: 'Valuing',
    es: 'Valores',
  },
  relaxing: {
    en: 'Disconnection',
    es: 'Desconexión',
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

function Cube({
  container,
  ref = undefined,
  noLabels = false,
  onready = () => null,
  onclick = () => null,
}) {
  let me = new p5(function () {});
  let isHover = false;
  let nextPost = Math.floor(Math.random() * POSTS);
  let currentPost = 0;
  let changePost = false;
  let overState;

  let states = new Array(27).fill().map((_, i) => new State({
    sketch: me,
    index: i
  })).filter(state => !me.vicinity || state.isNear()).sort(state => state.tier);

  if (ref) states.forEach(state => state.setRef(ref));

  let size = 0.4 * states[0].radius;

  me.setup = function () {
    let canvas = me.createCanvas(me.windowWidth, 400);
    me.center = [me.width * 0.5, me.height * 0.5];
    if (container) {
      container.set({
        select: {
          display: "block",
          backgroundColor: "transparent",
          zIndex: 10,
          position: "relative",
          margin: "2em auto -2em",
          textAlignLast: "center",
          option: [{
            value: "none",
            text: Copy.text({
              en: "Animated view",
              es: 'Animación',
            }),
          }, {
            value: 1,
            text: Copy.text({
              en: "Physical Plains",
              es: 'Planos físicos',
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
              es: 'Vista del tope',
            }),
          }, {
            value: -1,
            text: Copy.text({
              en: "Center View",
              es: 'Vista del centro',
            }),
          }, {
            value: -2,
            text: Copy.text({
              en: "Base View",
              es: 'Vista de la base',
            }),
          }],
          onchange: e => me.view(e.target.value)
        },
        canvas: canvas.elt,
      }, "content", onready);
    }
    me.strokeWeight(3);
    me.textFont('Verdana');
    me.textSize(size);
    me.textAlign(me.CENTER, me.CENTER);
    me.animate();
  }

  me.draw = function () {
    me.clear();
    me.translate(...me.center);
    states.forEach(s => {
      s.setRef(overState);
      s.interact = !!overState;
      s.draw()
    });
    if (overState) {
      let c = me.color('#' + overState.code.codeToHex())
      let l = me.lightness(c) < 45 || me.green(c) < 45;
      me.stroke(c);
      me.fill(l ? 255 : 0);
      me.text(overState.copy.at.archetype, me.mouseX - me.center[0], me.mouseY - me.center[1] - size);
    }
    if (changePost) {
      states.forEach(s => s.post = s.post === 0 ? nextPost : 0);
      currentPost = states[0].post;
      me.animate();
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
    me.fill(0);
    me.textAlign(me.CENTER, me.CENTER);
    me.textSize(RADIUS * 0.34);
    me.noStroke();
    texts.forEach(t => me.text(...t));
  }

  me.animate = function (wait = 1000) {
    if (me.timeOut) clearTimeout(me.timeOut);
    if (me.freeze && currentPost === nextPost) return;
    let isIni = currentPost !== 0 || nextPost === 0;
    me.timeOut = setTimeout(() => changePost = !isHover, wait * (isIni ? WAIT : 0.5));
    if (isIni) nextPost = (nextPost + 1) % POSTS;
  }

  me.view = function (view) {
    changePost = true;
    if (isNaN(view)) {
      states.forEach(s => s.hidden = false);
      me.freeze = false;
      nextPost = (nextPost + 1) % POSTS;
      me.animate();
      return;
    }
    me.freeze = true;
    states.forEach(s => s.hidden = view < 0 && !s.isRim && s.level - 3 > 2 * view);
    nextPost = view < 0 ? 0 : parseInt(view);
  }

  me.mouseMoved = function () {
    if (!me.canvas) return;
    isHover = !!parseInt(me.get(me.mouseX, me.mouseY).join('')); // any pixel color under the mouse
    me.cursor(isHover ? me.HAND : me.ARROW);
    if (isHover) {
      let newOver = states.filter(s => !s.hidden && me.dist(me.mouseX - me.center[0], me.mouseY - me.center[1], ...s.coords) < s.radius).pop();
      if (newOver === overState) return;
      if (overState) overState.selected = false;
      overState = newOver;
      if (overState) overState.selected = true;
      if (me.onmouseover) me.onmouseover(overState);
    } else {
      if (overState) {
        overState.selected = false;
        if (me.onmouseout) me.onmouseout(overState);
        me.animate();
      }
      overState = false;
    }
  }

  me.mouseReleased = function () {
    if (!isHover) return;
    onclick(overState);
  }

  return me;
}

export default Cube;