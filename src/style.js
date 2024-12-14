export const lightScreen = '#fffb';
export const darkScreen = '#0008';
export const whiteScreen = '#fffd';
export const grayScreen = '#777c';

export const floatingSign = {
  a: {
    color: 'black',
    textDecoration: 'underline',
    textShadow: 'none',
  },
  color: 'black',
  padding: '1em',
  backgroundColor: whiteScreen,
  borderRadius: '1em',
}

export const section = {
  margin: '0 auto',
  padding: '3em 1em',
  maxWidth: '42em',
}

export const icon = {
  arrowU: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="M444-192v-438L243-429l-51-51 288-288 288 288-51 51-201-201v438h-72Z"/></svg>`,
  arrowDR: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="M384-216v-72h237L192-717l51-51 429 429v-237h72v360H384Z"/></svg>`,
  arrowDL: `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="M216-216v-360h72v237l429-429 51 51-429 429h237v72H216Z"/></svg>`,
}

export const getIcon = name => `<span style="width:1em;height:1em;vertical-align:middle">${icon[name]}</span>`;