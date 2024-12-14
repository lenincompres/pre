export class Stats extends HTMLElement {

  constructor(title, link, bars, blank, ) {
    super();
    this.set({
      display: 'flex',
      flexDirection: 'column',
      heading: {
        a: {
          text: title,
          href: link,
          target: blank === true ? '_blank' : undefined,
        }
      },
      ul: {
        margin: '0 0 1em',
        li: bars.map(b => ({
          margin: 0,
          bar: b,
        })),
      },
    });
  }

}

customElements.define('stats-bar', Stats);
export default Stats;