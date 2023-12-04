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

  result.sort((a, b) => b - a);

  return result.slice(0, 3).reduce((a, b) => a + b, 0);
}
main().then(console.log);
