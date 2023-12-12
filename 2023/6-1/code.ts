import { readFileSync } from "fs";
import path from "path";

async function main() {
  const input = await readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );

  const [time, distance] = input.split("\r\n").map((d) =>
    d
      .split(": ")[1]
      .split(" ")
      .filter((d) => !!d)
      .map(Number)
  );

  let mul = 1;
  for (let index in time) {
    const i = Number(index);
    const t = time[i];
    const d = distance[i];
    let timePress = t;
    console.log(t);
    let count = 0;

    while (timePress > 0) {
      const distance = (t - timePress) * timePress;
      if (distance > d) {
        count++;
      }
      timePress--;
    }
    mul *= count;
  }
  return mul;
}

const startTime = performance.now();
main()
  .then(console.log)
  .then(() => {
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`Execution time: ${executionTime.toFixed(2)} ms`);
  });
