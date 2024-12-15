import State from "../classes/State.js";
import p5Element from "./p5Element.js";

class StateElement extends p5Element {
  constructor(code = '111', w = 140, h = 120) {
    super(w, h);
    this.state = new State({
      center: code,
      radius: h / 2,
    });
    this.updated = true;
  }

  draw(){
    if(!this.updated) return;
    this.sketch.clear();
    this.sketch.push();
    this.sketch.translate(this.width / 2, this.height / 2);
    this.state.draw(this.sketch);
    this.sketch.pop();
    if(!this.state.image) return;
    this.updated = false;
  }

  set code(code){
    this.state.center = code;
    this.updated = true;
  }

}

customElements.define('state-element', StateElement);
export default StateElement;