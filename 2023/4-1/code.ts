import { readFileSync } from "fs";
import path from "path";

async function main() {
  const input = await readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );

  return input.split("\r\n").reduce((a, b, i) => {
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

    if (match === 0) {
      return a;
    }
    return a + Math.pow(2, match - 1);
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
