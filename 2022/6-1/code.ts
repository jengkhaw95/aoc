import { readFileSync } from "fs";
import path from "path";

async function main() {
  const input = await readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );

  const record: string[] = [];

  for (let i in input.split("")) {
    const c = input[i];
    if (record.length < 4) {
      record.push(c);
      continue;
    }

    if (new Set(record).size === 4) {
      return i;
    }
    record.push(c);
    record.shift();
  }
}
main().then(console.log);
