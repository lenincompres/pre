const TAG = 'results-bar';

export class Bar extends HTMLElement {

  constructor(label, width = '100%', barColor = 'white', baseColor = 'black', value = 50) {
    super();
    this.single = !baseColor;
    this.percent = new Binder(value);
    this.showPercent = new Binder(false);

    this.set({
      whiteSpace: 'nowrap',
      position: 'relative',
      label: {
        display: 'inline-block',
        minWidth: label ? '3em' : 0,
        fontFamily: 'monospace',
        textAlign: 'right',
        marginRight: '0.25em',
        text: label
      },
      div: {
        position: 'relative',
        backgroundColor: baseColor.includes('.') ? 'black' : baseColor,
        backgroundImage: baseColor.includes('.') ? `url(${baseColor})` : undefined,
        backgroundSize: '6.66%',
        display: 'inline-block',
        width: width,
        height: '.68em',
        boxShadow: '0 0 1px black',
        verticalAlign: 'middle',
        cursor: 'pointer',
        borderRadius: '1em',
        overflow: 'hidden',
        b: {
          display: 'block',
          backgroundColor: barColor.includes('.') ? 'white' : barColor,
          backgroundImage: barColor.includes('.') ? `url(${barColor})` : undefined,
          backgroundSize: '100%',
          position: 'absolute',
          width: this.percent.bind(v => v + '%'),
          margin: 0,
          height: '100%',
          transition: '0.5s',
        }
      },
      i: {
        backgroundColor: 'white',
        display: this.showPercent.bind(['none', 'block']),
        position: 'absolute',
        boxShadow: '1px 1px 2px black',
        borderRadius: '1em',
        right: '-1em',
        top: '-1em',
        padding: '0 0.25em',
        margin: 0,
        pointerEvents: 'none',
        zIndex: 10,
        minWidth: 'fit-content',
        text: this.percent.bind(v => Math.round(v) + '%'),
      },
      onmouseover: e => this.showPercent.value = true,
      onmouseout: e => this.showPercent.value = false
    });
  }

  set value(val) {
    if (isNaN(val)) return;
    this.percent.value = val;
  }

  get value() {
    return this.percent.value;
  }

}

customElements.define(TAG, Bar);
export default Bar;