import { readFileSync } from "fs";
import path from "path";

async function main() {
  const input = await readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );

  const result = input.split("\r\n").reduce((a, b) => {
    const [g1, g2] = b.split(",");

    const [g1s, g1e] = g1.split("-").map(Number);
    const [g2s, g2e] = g2.split("-").map(Number);

    if (g1s >= g2s && g1s <= g2e) {
      return a + 1;
    }

    if (g2s >= g1s && g2s <= g1e) {
      return a + 1;
    }

    return a;
  }, 0);

  return result;
}
main().then(console.log);
