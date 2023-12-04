import { readFileSync } from "fs";
import path from "path";

async function main() {
  const input = await readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );

  const map = input.split("\r\n").reduce((a, b, i) => {
    const [_, cardNumbers] = b.split(": ");
    const [w, m] = cardNumbers.split(" | ").map((d) =>
      d
        .split(" ")
        .filter((d) => !!d)
        .map((e) => Number(e.trim()))
    );

    let match = 0;
    for (let n of w) {
      for (let o of m) {
        if (n === o) match++;
      }
    }

    let n = 0;

    if (!(i + 1 in a)) {
      a[i + 1] = 1;
    } else {
      a[i + 1] += 1;
    }
    while (n < match) {
      const k = n + i + 2;
      if (!(k in a)) {
        a[k] = (a[i + 1] || 1) * 1;
      } else {
        a[k] += (a[i + 1] || 1) * 1;
      }
      n++;
    }

    return a;
  }, {} as Record<number, number>);

  return Object.values(map).reduce((a, b) => a + b, 0);
}
main().then(console.log);
