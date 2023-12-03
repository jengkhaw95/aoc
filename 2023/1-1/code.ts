import {readFileSync} from "fs";
import path from "path";

async function main() {
  const input = await readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );

  const result = input
    .split("\r\n")
    .map((d) =>
      Number(
        d
          .split("")
          .reduce(
            (a, b) =>
              a.length === 0 && !isNaN(Number(b))
                ? [Number(b), Number(b)]
                : a.length === 2 && !isNaN(Number(b))
                ? [a[0], Number(b)]
                : a,
            [] as any[]
          )
          .join("")
      )
    )
    .reduce((a, b) => a + b, 0);
  return result;
}
main().then(console.log);
