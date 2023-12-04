import { readFileSync } from "fs";
import path from "path";

async function main() {
  const input = await readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );

  const result = input.split("\r\n").reduce((a, b) => {
    if (b === "") {
      return [...a, 0];
    }
    a[a.length - 1] += Number(b);
    return a;
  }, [] as number[]);

  return Math.max(...result);
}
main().then(console.log);
