import { readFileSync } from "fs";
import path from "path";

function getDiff(a: number[]) {
  const result: number[] = [];
  for (let i = 0; i < a.length - 1; i++) {
    const diff = a[i] - a[i + 1];
    result.push(diff);
  }
  return result;
}

async function main() {
  const input = await readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );

  const quiz = input.split("\r\n");

  return quiz.reduce((a, b) => {
    const d = b.split(" ").map(Number);
    d.reverse();

    let r = d;
    const q: number[][] = [d];
    while (!r.every((e) => e === 0)) {
      r = getDiff(r);
      q.push(r);
    }
    return a + q.reduce((a, b) => a + b[0], 0);
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
