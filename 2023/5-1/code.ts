import { readFileSync } from "fs";
import path from "path";

async function main() {
  const input = await readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );

  const [_seeds, ..._maps] = input.split("\r\n");

  const seeds = _seeds.split(": ")[1].split(" ").map(Number);

  const answers: number[] = [];
  for (let i in seeds) {
    const s = seeds[i];
    answers[i] = s;

    let found = false;

    for (let m of _maps) {
      if (!m) {
        continue;
      }
      if (m.includes(" map:")) {
        // checkpoint
        found = false;
        continue;
      }
      if (found) {
        continue;
      }

      const [dest, src, count] = m.split(" ").map(Number);

      if (answers[i] >= src && answers[i] < src + count) {
        found = true;
        answers[i] = answers[i] - src + dest;
      }
    }
  }

  return Math.min(...answers);
}
main().then(console.log);
