const p5Aux = new p5(function (me) {
  me.setup = _ => {
    me.createCanvas(0, 0).elt.style.display = 'none';
    me.hex = (r, g, b, s, l) => {
      if (s === undefined) return '#' + hex(r) + hex(g) + hex(b);
      me.colorMode(me.RGB);
      let colour = me.color(r, g, b);
      me.colorMode(me.HSL);
      colour = me.color(me.hue(colour), s, l);
      return me.hex(me.red(colour), me.green(colour), me.blue(colour));
    }
  }
});

export const colorBullet = (c = "black", b = "#0006") => DOM.html({
  display: "inline-block",
  height: "0.7em",
  width: "0.7em",
  margin: "0 1px",
  backgroundColor: c,
  color: "transparent",
  border: "solid 1px " + b,
  text: "*",
  verticalAlign: "middle",
}, 'b');

export const hex = (r, g, b, s, l) => {
  if (g === undefined) return (r < 16 ? '0' : '') + 
parseInt(r).toString(16);
  return p5Aux.hex(r, g, b, s, l);
}

export const color = c => p5Aux.color(c);

export const rgb = c => {
  c = color(c.startsWith('#') ? c : '#' + c);
  return [p5Aux.red(c), p5Aux.green(c), p5Aux.blue(c)]
};

export const dist = (...args) => p5Aux.dist(...args);