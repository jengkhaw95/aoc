import {readFileSync} from "fs";
import path from "path";

const NumberList = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

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
          .reduce((a, b, i) => {
            if (a.length === 0) {
              if (!isNaN(Number(b))) {
                return [Number(b), Number(b)];
              } else {
                const index = NumberList.findIndex((n) =>
                  d.slice(i).startsWith(n)
                );
                if (index >= 0) {
                  return [index + 1, index + 1];
                }
              }
            }
            if (a.length === 2) {
              if (!isNaN(Number(b))) {
                return [a[0], Number(b)];
              } else {
                const index = NumberList.findIndex((n) =>
                  d.slice(i).startsWith(n)
                );
                if (index >= 0) {
                  return [a[0], index + 1];
                }
              }
            }
            return a;
          }, [] as any[])
          .join("")
      )
    )
    .reduce((a, b) => a + b, 0);
  return result;
}
main().then(console.log);
