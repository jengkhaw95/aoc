import { readFileSync } from "fs";
import path from "path";

const LIMIT: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

async function main() {
  const input = await readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );

  const result = input
    .split("\r\n")
    .map((g, index) =>
      g
        .split(": ")[1]
        .split("; ")
        .reduce((a, s) => {
          const isFulfilled = s.split(", ").every((b) => {
            const [amount, color] = b.split(" ");
            return LIMIT[color] >= Number(amount);
          });
          return a === 0 || !isFulfilled ? 0 : index + 1;
        }, index + 1)
    )
    .reduce((a, b) => a + b, 0);

  return result;
}
const startTime = performance.now();
main()
  .then(console.log)
  .then(() => {
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`Execution time: ${executionTime.toFixed(2)} ms`);
  });
