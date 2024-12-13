const TAG = 'results-bar';

export class Bar extends HTMLElement {

  constructor(label, width = '100%', barColor = 'white', baseColor = 'black', value = 50) {
    super();
    this.single = !baseColor;
    this._percent = new Binder(value);
    this._showPercent = new Binder(false);
    const _hue = new Binder(50);
    const hueL = () => 10 * (_hue.value % 60) / 6;
    if (baseColor === true) setInterval(() => {
      _hue.value = (_hue.value + 2) % 360;
    }, 24);

    this.set({
      whiteSpace: 'nowrap',
      position: 'relative',
      p: {
        marginBottom: '-0.5em',
        fontFamily: 'monospace',
        textAlign: 'center',
        marginRight: '0.25em',
        text: label
      },
      div: {
        position: 'relative',
        backgroundColor: baseColor === true ? _hue.as(v => `hsl(${v} 100 ${hueL()})`) : baseColor.includes('.') ? 'black' : baseColor,
        backgroundImage: baseColor !== true && baseColor.includes('.') ? `url(${baseColor})` : undefined,
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
          width: this._percent.as(v => `${v}%`),
          margin: 0,
          height: '100%',
          transition: '0.5s',
        }
      },
      i: {
        backgroundColor: 'white',
        display: this._showPercent.as('none', 'block'),
        position: 'absolute',
        boxShadow: '1px 1px 2px black',
        borderRadius: '1em',
        top: '1.5em',
        padding: '0 0.25em',
        margin: 0,
        pointerEvents: 'none',
        zIndex: 10,
        minWidth: 'fit-content',
        left: '-2em',
        text: this._percent.as(v => `${Math.round(v)}%`),
      },
      onmouseover: e => this._showPercent.value = true,
      onmouseout: e => this._showPercent.value = false
    });
  }

  set value(val) {
    if (isNaN(val)) return;
    this._percent.value = val;
  }

  get value() {
    return this._percent.value;
  }

}

customElements.define(TAG, Bar);
export default Bar;