import states from "./states.js";

const STATE_ICON_GRID = 36;
const CENTERCODE = '111';
const [ENG, ESP] = ['eng', 'esp'];
const [COS30, SIN30] = [Math.cos(Math.PI / 6), Math.sin(Math.PI / 6)];

/* -------------------------- // Auxiliary general -------------------------- */

String.prototype.toRGB = function () {
  return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this).filter((v, i) => i > 0 && 1 < 4).map(v => parseInt(v, 16));
}
Array.prototype.plus = function (arr = 0) { // adds arrays to array, or number
  return this.map((n, i) => n + (typeof arr === 'number' ? arr : arr[i % arr.length]));
}
Number.prototype.ordinalToCode = function (base) {
  let code = '' + Math.floor(this / 9) % 3 + Math.floor(this / 3) % 3 + this % 3;
  if (base) code = code.codeToCoords().plus(base.codeToCoords()).map(o => o % 3).join('');
  return code;
}
Number.prototype.codeToCoords = function () {
  return this.ordinalToCode().codeToCoords();
}
Number.prototype.codeToColor = function () {
  return this.ordinalToCode().codeToColor();
}
String.prototype.codeToCoords = function () {
  return this.split('').codeToCoords();
}
String.prototype.codeToOrdinal = function () {
  return this.codeToCoords().codeToOrdinal();
}
String.prototype.codeToHex = function () {
  return this.codeToCoords().codeToHex();
}
String.prototype.hexToCode = function () {
  let s = this.startsWith('#') ? this.substr(1) : this;
  let arr = s.length > 3 ? [s[0] + s[1], s[2] + s[3], s[4] + s[5]] : [s[0] + s[0], s[1] + s[1], s[2] + s[2]];
  return arr.map(s => Math.round(2 * parseInt('0x' + s) / 255)).join('');
}
String.prototype.codeToColor = function () {
  return this.codeToCoords().codeToColor();
}
Array.prototype.codeToCoords = function () {
  return this.map(n => parseInt(n) % 3);
}
Array.prototype.codeToOrdinal = function () {
  return this.reverse().reduce((o, v, i) => o + (v % 28) * Math.pow(3, i), 0);
}
Array.prototype.codeToHex = function (shades) {
  return this.map(v => hexCode(v)).join('');
}
Array.prototype.codeToColor = function () {
  return this.map(v => Math.round('0x' + hexCode(v)));
}
Array.prototype.colorToCode = function () {
  return this.map(n => Math.round(n * 2 / 255)).join('');
}

const hexNum = n => parseInt(n, 10).toString(16);

const hexCode = code => [hexNum(0xff / 6), hexNum(0xff / 2), hexNum(5 * 0xff / 6)][code];

function drawBox(radius = 40, colour = [128, 128, 128], alpha = 1, inside = true, sketch) {
  if (!sketch) return;
  let [x, y] = [radius * COS30, radius * SIN30];
  alpha *= 255;
  if (inside) sketch.rotate(Math.PI);
  sketch.fill(...colour.plus(32), alpha);
  sketch.quad(0, 0, x, -y, 0, -radius, -x, -y);
  sketch.fill(...colour, alpha);
  sketch.quad(0, 0, 0, radius, -x, y, -x, -y);
  sketch.fill(...colour.plus(-32), alpha);
  sketch.quad(0, 0, x, -y, x, y, 0, radius);
  if (inside) sketch.rotate(Math.PI);
}

function polygon(x, y, radius, npoints, sketch) {
  if (!sketch) sketch = this;
  let angle = Math.TWO_PI / npoints;
  sketch.beginShape();
  for (let a = 0; a < Math.TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    sketch.vertex(sx, sy);
  }
  sketch.endShape(sketch.CLOSE);
}

export class State {
  constructor({
    sketch,
    center,
    index = false,
    animate = false,
    radius = 40,
    lang = ENG,
    onupdate = s => s,
    noText
  }) {
    this.noText = noText;
    this.onupdate = onupdate;
    this.sketch = sketch;
    let base = center !== undefined ? center : CENTERCODE;
    if (index === false) index = CENTERCODE.codeToOrdinal();
    let inCoords = index.codeToCoords();
    let baseCode = base.codeToCoords().plus(2).codeToCoords();
    let code = index.ordinalToCode(baseCode);
    this.ordinal = code.codeToOrdinal();
    this.color = code.codeToColor();
    let diff = index.ordinalToCode().codeToCoords().plus(-1);
    let [spacing, spread] = [radius * 1.5, 3.68];
    this.isRim = inCoords.includes(2) && inCoords.includes(0);
    this.level = diff.reduce((o, v) => o + v, 0);
    this.tier = this.isRim || !this.level ? 1 : this.level < 0 ? 0 : 2;
    this.posts = [
      [
        -diff[0] * spacing * COS30 + diff[2] * spacing * COS30,
        -diff[1] * spacing + diff[0] * spacing * SIN30 + diff[2] * spacing * SIN30
      ],
      [
        -spread * diff[0] * spacing * COS30 + diff[2] * spacing * COS30,
        -diff[1] * spacing + diff[0] * spacing * SIN30 + diff[2] * spacing * SIN30
      ],
      [
        -diff[0] * spacing * COS30 + diff[2] * spacing * COS30 + spread * diff[1] * spacing,
        -diff[1] * spacing + diff[0] * spacing * SIN30 + diff[2] * spacing * SIN30
      ],
      [
        -diff[0] * spacing * COS30 + spread * diff[2] * spacing * COS30,
        -diff[1] * spacing + diff[0] * spacing * SIN30 + diff[2] * spacing * SIN30
      ],
      [
        -diff[0] * spacing * COS30 + diff[2] * spacing * COS30 + 1.14 * spread * (this.tier - 1) * spacing,
        -diff[1] * spacing + diff[0] * spacing * SIN30 + diff[2] * spacing * SIN30
      ]
    ];

    this.code = code;
    this.index = index;
    this.radius = radius;
    this.post = 0;
    this.coords = animate ? [0, 0] : this.posts[0];
    this.hex = code.codeToHex();
    this.value = 1;
    this.info = states[code];

    sketch.loadImage('assets/symbolspritenew.png', img => {
      this.symbolSprite = img;
      this.draw();
    });

    this.draw = _ => {
      let x = this.value;
      let opacity = !this.interact ? 1 : 0.5 + Math.cos(3 * Math.cos(1.57 * x)) / 2;
      let size = this.radius;// * (!this.interact ?  1 : this.sketch.map(opacity,0,1,0.68,1.14));
      if (!this.symbolSprite) return;
      this.onupdate(this);
      if (isNaN(this.post)) this.post = 0;
      let end = this.posts[this.post];
      let ended = sketch.dist(...end, ...this.coords) < 0.25;
      if (!ended) this.coords = this.coords.map((v, i) => v += (end[i] - v) * 0.25);
      if (this.hidden) return;
      sketch.push();
      sketch.noStroke();
      sketch.translate(...this.coords);
      // base
      drawBox(size, this.color, 0.86 * opacity, true, sketch);
      // icon
      sketch.tint(...this.color, opacity * 255);
      var iSize = size * 0.86;
      sketch.image(this.symbolSprite, -iSize * 0.5, -iSize * 0.5, iSize, iSize, (this.ordinal % 3) * STATE_ICON_GRID, Math.floor(this.ordinal / 3) * STATE_ICON_GRID, STATE_ICON_GRID, STATE_ICON_GRID);
      // text
      if (!this.noText) {
        let l = sketch.lightness(this.color) < 45 || sketch.green(this.color) < 45;
        sketch.fill(l ? 255 : 0, opacity * 255);
        sketch.strokeWeight(2.5);
        if(!this.interact) sketch.stroke(l ? 0 : 255,  opacity * 100);
        sketch.textFont('Verdana');
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.textLeading(0);
        sketch.textSize(size * 0.25);
        sketch.text(this.info.archetype, 0, size * 0.5);
      }
      // top
      sketch.noStroke();
      drawBox(size, this.color, 0.34 * opacity, false, sketch);
      //
      if (this.selected) {
        sketch.fill(0, 0);
        sketch.rotate(Math.PI / 6);
        sketch.strokeWeight(6);
        sketch.stroke(0, 140);
        polygon(1, 1, size, 6, sketch);
        sketch.strokeWeight(4);
        sketch.stroke(255);
        polygon(0, 0, size, 6, sketch);
      }
      sketch.pop();
    }
  }

  isNear() {
    inCoords.filter(v => v === 1).length >= 2;
  }

  setRef(hexRef) {
    if (!hexRef) return this.value = 1;
    if (this === hexRef) return this.value = 1;
    if (hexRef.code) hexRef = hexRef.code.codeToHex();
    this.value = 1 - this.getDistance(hexRef, this.code.codeToHex(), true) / this.getDistance('ffffff', '808080');
  }

  getDistance(hex1, hex2, closerCycle = false) {
    var [p1, p2] = [hex1.toRGB().map(v => v / 255), hex2.toRGB().map(v => v / 255)];
    if (closerCycle) p1 = p1.map((v, i) => {
      let d = v - p2[i];
      return Math.abs(d) <= 0.5 ? v : Math.abs(d + 1) < Math.abs(d - 1) ? v + 1 : v - 1;
    });
    return this.sketch.dist(...p2, ...p1);
  };

}

export default State;