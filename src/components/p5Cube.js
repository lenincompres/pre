import Copy from "../../lib/Copy.js";
import State from "../classes/State.js";

const WAIT = 4; //seconds between posts
const POSTS = 5;
const RADIUS = 40;

class p5Cube extends p5 {
  constructor(sketch, node, {
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
    super(sketch, node);

    let isHover = false;
    let nextPost = Math.floor(Math.random() * POSTS);
    let currentPost = 0;
    let changePost = false;
    let overState;

    if (width === undefined) width = this.windowWidth;

    let states = new Array(27).fill().map((_, i) => new State({
      sketch: this,
      center: center,
      index: i,
    })).filter(state => !vicinity || state.isNear()).sort(state => state.tier);

    if (ref) states.forEach(state => state.setRef(ref));

    let textSize = 0.4 * states[0].radius;

    this.setup = function () {
      this._canvas.value = this.createCanvas(width, height).elt;
      this.strokeWeight(3);
      this.textFont('Verdana');
      this.textSize(textSize);
      this.center = [width * 0.5, height * 0.5];
      this.textAlign(this.CENTER, this.CENTER);
      if (animated) this.animate();
    }

    this.animate = function (wait = 1000) {
      if (this.timeOut) clearTimeout(this.timeOut);
      if (this.freeze && currentPost === nextPost) return;
      let isIni = currentPost !== 0 || nextPost === 0;
      this.timeOut = setTimeout(() => changePost = !isHover, wait * (isIni ? WAIT : 0.5));
      if (isIni) nextPost = (nextPost + 1) % POSTS;
    }

    this.mouseMoved = function () {
      if (!this.canvas || !animated) return;
      isHover = !!parseInt(this.get(this.mouseX, this.mouseY).join('')); // any pixel color under the mouse
      this.cursor(isHover ? this.HAND : this.ARROW);
      if (isHover) {
        let newOver = states.filter(s => !s.hidden && this.dist(this.mouseX - this.center[0], this.mouseY - this.center[1], ...s.coords) < s.radius).pop();
        if (newOver === overState) return;
        if (overState) overState.selected = false;
        overState = newOver;
        if (overState) overState.selected = true;
        if (this.onmouseover) this.onmouseover(overState);
      } else {
        if (overState) {
          overState.selected = false;
          if (this.onmouseout) this.onmouseout(overState);
          this.animate();
        }
        overState = false;
      }
    }

    this.mouseReleased = function () {
      if (!isHover) return;
      onclick(overState);
    }

    if (view !== undefined) this.view(view);
  }

  draw() {
    this.clear();
    this.translate(...this.center);
    states.forEach(s => {
      s.setRef(overState);
      s.interact = !!overState;
      s.draw()
    });
    if (overState) {
      let c = this.color('#' + overState.code.codeToHex())
      let l = this.lightness(c) < 45 || this.green(c) < 45;
      this.stroke(c);
      this.fill(l ? 255 : 0);
      this.text(overState.copy.at.archetype.toUpperCase(), this.mouseX - this.center[0], this.mouseY - this.center[1] - textSize);
    }
    if (changePost) {
      states.forEach(s => s.post = s.post === 0 ? nextPost : 0);
      currentPost = states[0].post;
      this.animate();
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
    this.fill(0);
    this.textAlign(this.CENTER, this.CENTER);
    this.textSize(RADIUS * 0.34);
    this.noStroke();
    texts.forEach(t => this.text(...t));
  }

  view(view) {
    changePost = true;
    if (isNaN(view) && animated) {
      states.forEach(s => s.hidden = false);
      this.freeze = false;
      nextPost = (nextPost + 1) % POSTS;
      p5Sketch.animate();
      return;
    }
    this.freeze = true;
    states.forEach(s => s.hidden = view < 0 && !s.isRim && s.level - 3 > 2 * view);
    nextPost = view < 0 ? 0 : parseInt(view);
  }
}

export default p5Cube;