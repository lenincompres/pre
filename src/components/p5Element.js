
class p5Element extends HTMLElement {
  constructor(w, h) {
    super();
    this._canvas = new Binder();
    this.width = w;
    this.height = h;
    const t = this;
    new p5(p => {
      t.p5 = t.sketch = p;
      p.setup = () => {
        t.canvas = p.createCanvas(t.width ? t.width : p.windowWidth, t.height).elt;
        t.append(t.canvas);
        if(t.setup) t.setup(p);
      }
      if(t.draw) p.draw = () => t.draw(p);
      if(t.mouseReleased) p.mouseReleased = () => t.mouseReleased(p);
      if(t.mouseMoved) p.mouseMoved = () => t.mouseMoved(p);
    });
  }
}
customElements.define('p5-element', p5Element);
export default p5Element;