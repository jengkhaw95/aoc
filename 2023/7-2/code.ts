import { readFileSync } from "fs";
import path from "path";

const STRENGTH = ["5ok", "4ok", "fh", "3ok", "2p", "p", "hc"];
const CARDS = "J23456789TQKA";

function getHandStrength(h: string) {
  // Special case
  if (h === "JJJJJ") {
    return "5ok";
  }
  const mc = h.split("").reduce((a, b) => {
    if (b === "J") {
      return a;
    }
    if (a[b]) {
      a[b] += 1;
    } else {
      a[b] = 1;
    }
    return a;
  }, {} as { [k: string]: number });

  const _mc = [...Object.entries(mc)];
  _mc.sort((a, b) => b[1] - a[1]);

  const __mc = _mc.filter((d, _, a) => d[1] === a[0][1]).map((d) => d[0]);

  const stongestCard = __mc.sort(
    (a, b) => CARDS.indexOf(b) - CARDS.indexOf(a)
  )[0];

  h = h
    .split("")
    .map((d) => (d === "J" ? stongestCard : d))
    .join("");

  const s = new Set(h.split(""));
  if (s.size === 1) {
    return "5ok";
  }

  if (s.size === 2) {
    const d = h.split("").filter((c) => c === h[0]);
    if (d.length === 1 || d.length === 4) {
      return "4ok";
    }
    return "fh";
  }
  if (s.size === 3) {
    const d = h.split("").filter((c) => c === h[0]);
    const e = h.split("").filter((c) => c !== d[0]);

    if (d.length === 3 || d.length === 1) {
      if (e.filter((f) => f === e[0]).length === 2) {
        return "2p";
      }

      return "3ok";
    }
    return "2p";
  }
  if (s.size === 4) {
    return "p";
  }
  return "hc";
}

function isHand1StrongerThanHand2(h1: string, h2: string) {
  const p1 = getHandStrength(h1);
  const p2 = getHandStrength(h2);
  if (p1 !== p2) {
    return STRENGTH.indexOf(p1) - STRENGTH.indexOf(p2);
  }

  for (let i in h1.split("")) {
    const c1 = h1[i];
    const c2 = h2[i];
    // console.log(c1, c2);
    if (c1 === c2) {
      continue;
    }
    return CARDS.indexOf(c2) - CARDS.indexOf(c1);
  }
  return 0;
}

async function main() {
  const input = await readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );

  const g = input.split("\r\n").map((d) => {
    const [h, b] = d.split(" ");
    const s = getHandStrength(h);
    // console.log(h, s);
    return [h, Number(b), s] as const;
  });

  g.sort((a, b) => {
    const s = isHand1StrongerThanHand2(a[0], b[0]);
    return s;
  });

  const err = g.filter((e) => e[0].includes("J") && e[2] === "hc");
  if (err.length) {
    console.table(err);
    throw "ERROR";
  }

  return g.reduce((a, b, i, d) => {
    return a + b[1] * (d.length - i);
  }, 0);
}
main().then(console.log);

// [X] 249929128
// [X] 250390907
// [X] 251051452
// [ ] 250825971
