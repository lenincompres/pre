import State from "../classes/State.js";

class StateElement extends HTMLElement {
  constructor(code = '111', w = 140, h = 120) {
    super();

    const _canvas = new Binder();;

    this.set({
      small: _canvas.as(`Loading color spectrum…`, ''),
      figure: _canvas,
    });

    const me = new p5(function () {});
    me.setup = () => {
      _canvas.value = me.createCanvas(w, h).elt;
      me.translate(me.width / 2, me.height / 2);
      me.update = code => {
        me.clear();
        let state = new State({
          sketch: me,
          center: code,
          radius: me.height / 2,
        });
        setTimeout(() => state.draw(true), 50);
      }
      me.update(code);
      this.update = code => me.update(code);
    };

  }
}

customElements.define('state-element', StateElement);
export default StateElement;