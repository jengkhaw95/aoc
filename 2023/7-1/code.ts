import { readFileSync } from "fs";
import path from "path";

const STRENGTH = ["5ok", "4ok", "fh", "3ok", "2p", "p", "hc"] as const;
const CARDS = "3456789TJQKA";

function getHandStrength(h: string) {
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
    return [h, Number(b), getHandStrength(h)] as const;
  });

  g.sort((a, b) => {
    const s = isHand1StrongerThanHand2(a[0], b[0]);
    return s;
  });

  return g.reduce((a, b, i, d) => {
    return a + b[1] * (d.length - i);
  }, 0);
}

const startTime = performance.now();
main()
  .then(console.log)
  .then(() => {
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`Execution time: ${executionTime.toFixed(2)} ms`);
  });
