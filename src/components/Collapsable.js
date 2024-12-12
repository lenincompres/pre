// declares the class
class Collabsable extends HTMLElement {
  constructor(content, linkTextOpen = "Expand", linkTextClose = "Close") {
    super();

    binderSet({
      opened: false,
    });

    let contentElt = DOM.element(content, 'section');

    this.set({
      main: {
        maxHeight: _opened.as(val => val ? `${contentElt. offsetHeight}px` : 0),
        overflow: `hidden`,
        transition: `0.5s`,
        section: contentElt,
      },
      a: {
        display: `block`,
        textAlign: `right`,
        onclick: () => opened = !opened,
        content: _opened.as(linkTextOpen, linkTextClose),
      }
    });
  }
}
customElements.define('collabsable-section', Collabsable);

export default Collabsable;