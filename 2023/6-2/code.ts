import { readFileSync } from "fs";
import path from "path";

async function main() {
  const input = await readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );

  const [time, distance] = input
    .split("\r\n")
    .map((d) =>
      d
        .split(": ")[1]
        .split(" ")
        .filter((d) => !!d)
        .join("")
    )
    .map(Number);

  // tp^2 -t*tp + d = 0
  // Root 1 >= Root 2

  const root1 = Math.floor(
    (time + Math.sqrt(Math.pow(time, 2) - 4 * distance)) / 2
  );
  const root2 = Math.ceil(
    (time - Math.sqrt(Math.pow(time, 2) - 4 * distance)) / 2
  );

  return root1 - root2 + 1;
}
main().then(console.log);
