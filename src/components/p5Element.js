
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
        t.innerHTML = '';
        t.append(p.createCanvas(t.width ? t.width : p.windowWidth, t.height).elt);
        t.setup(p);
      }
      p.draw = () => t.draw(p);
      p.mouseReleased = () => t.mouseReleased(p);
      p.mouseMoved = () => t.mouseMoved(p);
    });
  }
}
customElements.define('p5-element', p5Element);
export default p5Element;