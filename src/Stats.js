export class Stats extends HTMLElement {

  constructor(title, link, bars, blank) {
    super();
    this.set({
      display: 'flex',
      flexDirection: 'column',
      h6: {
        a: {
          text: title,
          href: link,
          target: blank === true ? '_blank' : undefined,
        }
      },
      div: bars,
    });
  }

}

customElements.define('stats-bar', Stats);
export default Stats;