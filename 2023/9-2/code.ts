import { readFileSync } from "fs";
import path from "path";

function getDiff(a: number[]) {
  const result: number[] = [];
  for (let i = 0; i < a.length - 1; i++) {
    const diff = a[i + 1] - a[i];
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

    let r = d;
    let q: number[][] = [d];
    while (!r.every((e) => e === 0)) {
      r = getDiff(r);
      q.push(r);
    }
    q.reverse();

    // console.log(q);
    let last = 0;
    for (let i in q) {
      const d = q[i];
      if (Number(i) === 0) {
        d.unshift(0);
        last = 0;
      } else {
        last = d[0] - last;
        // console.log(last);
        d.unshift(last);
      }
    }

    // q = q.map((s, i, z) => (i === 0 ? [0, ...s] : [s[0] - z[i - 1][0], ...s]));
    console.log(q[q.length - 1]);

    return a + q[q.length - 1][0];
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
