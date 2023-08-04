import State from "./State.js";

const [ENG, ESP] = ['eng', 'esp'];
const WAIT = 4; //seconds between posts
const POSTS = 5;
const RADIUS = 40;

function Cube({
  container,
  lang = ENG,
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
    if (container) container.set(canvas.elt, "content", onready);
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
      let c = me.color('#' + overState.info.code.codeToHex())
      let l = me.lightness(c) < 45 || me.green(c) < 45;
      me.stroke(c);
      me.fill(l ? 255 : 0);
      me.text(overState.info.archetype, me.mouseX - me.center[0], me.mouseY - me.center[1] - size);
    }
    if (changePost) {
      states.forEach(s => s.post = s.post === 0 ? nextPost : 0);
      currentPost = states[0].post;
      me.animate();
      changePost = false;
    }
    if (!currentPost || noLabels) return; // not to draw the labels
    let y = RADIUS * 4.5;
    let x = RADIUS * 4.75;
    const esp = lang === ESP;
    let texts = [
      [esp ? 'Activo' : 'Active', -x, y],
      [esp ? 'Atento' : 'Attentive', 0, y],
      [esp ? 'Introspectivo' : 'Introspective', x, y]
    ];
    if (currentPost === 2) texts = [
      [esp ? 'Instintivo' : 'Instinctive', -x * 1.12, y],
      [esp ? 'Informativo' : 'Informative', 0, y],
      [esp ? 'Regulativo' : 'Regulative', x * 1.12, y]
    ];
    else if (currentPost === 3) texts = [
      [esp ? 'Objetivo' : 'Objective', -x, y],
      [esp ? 'Sensible' : 'Responsive', 0, y],
      [esp ? 'Affectivo' : 'Affective', x, y]
    ];
    else if (currentPost === 4) texts = [
      ['Base', -x * 1.28, y],
      [esp ? 'Periféricos & Neutro' : 'Peripheral & Neutral', 0, y],
      [esp ? 'Tope' : 'Top', x * 1.28, y]
    ];
    me.fill(0);
    me.textAlign(me.CENTER, me.CENTER);
    me.textSize(RADIUS * 0.34);
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
