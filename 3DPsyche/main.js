window.results = new Binder([]);

window.rawData = [];

/* AUXILIARY */

const dist = (a1 = 1, b1 = 1, c1 = 1, a2 = 0, b2 = 0, c2 = 0) => Math.sqrt(Math.pow((a1 - a2), 2) + Math.pow((b1 - b2), 2) + Math.pow((c1 - c2), 2));

const pct = (n) => Math.round(n * 100) + "%";

function fixHex(hex) {
  if (hex.includes(",")) {
    let arr = hex.split(",");
    hex = "" + parseInt(arr[0], 10).toString(16) + parseInt(arr[1], 10).toString(16) + parseInt(arr[2], 10).toString(16);
  }
  while (hex.length < 6) {
    hex = "0" + hex;
  }
  return "#" + hex.toUpperCase();
}

function preToMBTI(hex) {
  const choose = (val, s1, s2) => val >= 0.5 ? s1 : s2;
  if (hex[0] === "#") hex = hex.substr(1);
  let R = parseInt(hex.substr(0, 2), 16) / 255;
  let G = parseInt(hex.substr(2, 2), 16) / 255;
  let B = parseInt(hex.substr(4, 2), 16) / 255;
  let I = dist(R, G, B, 0.5, 0.5, 0.5) / dist(0.5, 0.5, 0.5);
  let S = R / (0.5 * (G + B) + R);
  let F = B / (B + G);
  let J = (R + G + B) / 3;
  let mbti = choose(I, "I", "E") + choose(S, "S", "N") + choose(F, "F", "T") + choose(J, "J", "P");
  return {
    R: R,
    G: G,
    B: B,
    I: I,
    S: S,
    F: F,
    J: J,
    mbti: mbti,
    mbtiConf: {
      span: [{
          text: mbti.charAt(0),
          color: confColor(I),
        },
        {
          text: mbti.charAt(1),
          color: confColor(S),
        },
        {
          text: mbti.charAt(2),
          color: confColor(F),
        },
        {
          text: mbti.charAt(3),
          color: confColor(J),
        },
      ]
    }
  };
}

const average = (arr, key) => {
  if (!arr.length) return;
  arr = arr.filter(a => a[key] !== "").map(a => a[key].content);
  console.log(arr.length);
  let red = arr.reduce((o, a) => {
    if (isNaN(a)) console.log(a);
    return o + Number(a);
  }, 0);
  return pct(red / arr.length);
};

const monospace = (content, width) => {
  return {
    fontFamily: "monospace",
    width: width + "em",
    content: content
  }
}

function confColor(n, alpha = true) {
  if (typeof n === "string") {
    if (n.includes("%")) n = parseInt(n.replace("%", "")) / 100;
    else n = parseInt(n);
  }
  if (isNaN(n) || n > 1 || n < 0) return;
  n = 1 - Math.abs(0.5 - n) / 0.5;
  if (alpha) return `rgba(0,0,0,${(1-n)})`;
  return `rgb(${n * 255},${(1-n) * 255},0)`;
}

function colorBox(hex) {
  if (typeof hex != "string" || hex.length != 7 || hex.charAt(0) != "#") return hex;
  let dim = parseInt("40", 16);
  dim = (parseInt(hex.substr(1, 2), 16) + parseInt(hex.substr(3, 2), 16) + parseInt(hex.substr(5, 2), 16)) / 3 < dim;
  return {
    fontFamily: "monospace",
    span: {
      display: "inline-block",
      borderRadius: "0.15em",
      padding: "0.15em",
      backgroundColor: hex,
      color: dim ? "#eee" : "black",
      text: hex,
    },
  }
}

function matchMBTI(s1, s2) {
  if (!s1 || !s2) return;
  if (s1.includes("-")) return;
  let l = Math.min(s1.length, s2.length);
  if (l < 4) return;
  let arr = new Array(l).fill().map((_, i) => {
    if (s1[i] === "-") return 1;
    return s1[i] === s2[i] ? 1 : 0;
  });
  let total = arr.reduce((o, a) => o + a, 0) / l;
  return {
    values: arr,
    total: total,
  };
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/* CORE */

function sortDataBy(tag = "time", dir = -1) {
  let data = rawData;
  data = data.sort((a, b) => dir * a[tag].localeCompare(b[tag]));
  data = data.filter(d => d.results);
  console.log("fine");
  results.value = data.map(item => {
    item.mbti = item.mbti.toUpperCase();
    let mbti = "";
    if (item.mbti.length >= 4) {
      mbti += item.mbti[0].replace(new RegExp(`[^IE]`, 'g'), '-');
      mbti += item.mbti[1].replace(new RegExp(`[^SN]`, 'g'), '-');
      mbti += item.mbti[2].replace(new RegExp(`[^FT]`, 'g'), '-');
      mbti += item.mbti[3].replace(new RegExp(`[^JP]`, 'g'), '-');
    }
    let pre = preToMBTI(fixHex(item.results));
    let accur = matchMBTI(mbti, pre.mbti);
    let op = {
      index: monospace(item.index),
      time: monospace(item.time),
      id: item.id,
      name: item.name.split("@")[0],
      MBTI: monospace(mbti),
      "MBTI*": monospace(pre.mbtiConf),
      IvE: accur ? monospace(accur.values[0], 3) : "",
      SvN: accur ? monospace(accur.values[1], 3) : "",
      FvT: accur ? monospace(accur.values[2], 3) : "",
      JvP: accur ? monospace(accur.values[3], 3) : "",
      accuracy: accur ? monospace(accur.total, 4) : "",
      PRE: fixHex(item.results),
      daily: fixHex(item.daily),
      fave: fixHex(item.tone),
    }/*
    item.answers.split(",").forEach((v, i) => {
      op["q" + (i + 1)] = fixHex(v);
    });*/
    return op;
  })
}

fetch("test_results.json", )
  .then(response => response.json())
  .then(data => {
    rawData = data[2].data.map((item, i) => {
      if (item.fbName == "undefined") item.fbName = "";
      if (item.testee == "undefined") item.testee = "";
      if (item.fbId == "undefined") item.fbId = "";
      item.index = i;
      item.id = item.fbId ? item.fbId.toLowerCase() :
        item.email ? item.email.toLowerCase() : item.testee.toLowerCase();
      item.name = item.fbName ? item.fbName : item.testee;
    return item;
    });
    sortDataBy();
  });

function getTimeRange(arr) {
  if (!arr || !arr.length) return "";
  arr = arr.filter(i => i && i.time.content).sort((a, b) => a.time.content > b.time.content);
  let fromDate = new Date(arr[0].time.content);
  let toDate = new Date(arr[arr.length - 1].time.content);
  return `${MONTH_NAMES[fromDate.getMonth()]} ${fromDate.getFullYear()} 
    to ${MONTH_NAMES[toDate.getMonth()]} ${toDate.getFullYear()}`;
}

DOM.set({
  css: {
    tbody: {
      tr: {
        hover: {
          backgroundColor: "lightcyan",
        },
      },
    },
    "td,th": {
      whiteSpace: "nowrap",
      textAlign: "right",
      maxWidth: "15em",
      overflow: "hidden",
      width: "fit-content",
      padding: "8px",
      margin: "0 8px",
      borderBottom: "1px solid lightsteelblue",
    },
  },
  backgroundColor: "slategray",
  section: {
    width: "fit-content",
    maxWidth: "80em",
    margin: "0 auto",
    header: {
      padding: "1em",
      backgroundColor: "lightsteelblue",
      textAlign: "center",
      h1: "3D Psyche",
      p: "by Lenin Compres",
      h3: "Data collected during 3dpsyche.com test",
      h5: {
        content: results.bind(getTimeRange)
      },
      h6: {
        text: "Total: ",
        i: {
          content: results.bind(arr => arr.length),
        }
      }
    },
    main: {
      padding: "1em",
      backgroundColor: "aliceblue",
      overflowX: "auto",
      table: {
        thead: {
          color: "white",
          backgroundColor: "black",
          textAlign: "center",
          tr: results.bind(arr => !arr[0] ? null : {
            th: Object.keys(arr[0]).map(item => new Object({
              content: item,
              p: ["IvE", "SvN", "FvT", "JvP", "accuracy"].includes(item) ? {
                content: results.bind(items => average(items, item)),
              } : null,
            }))
          }),
        },
        tbody: {
          tr: results.bind(arr => arr.map(entry => new Object({
            td: Object.values(entry).map(colorBox)
          })))
        },
      }
    }
  }
});