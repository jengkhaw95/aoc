import { readFileSync } from "fs";
import path from "path";

const priority = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function getCommonsBetweenStrings(s1: string, s2: string) {
  const res: string[] = [];
  for (let c1 of s1) {
    for (let c2 of s2) {
      if (c1 === c2) {
        if (!res.includes(c1)) {
          res.push(c1);
        }
      }
    }
  }
  return res;
}

async function main() {
  const input = await readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );

  const result = input.split("\r\n").reduce((a, b, i, z) => {
    if (i % 3 !== 0 || i + 2 >= z.length) {
      return a;
    }
    const [g1, g2, g3] = [z[i], z[i + 1], z[i + 2]];

    const m = getCommonsBetweenStrings(
      getCommonsBetweenStrings(g1, g2).join(""),
      g3
    );
    return a + priority.indexOf(m[0]) + 1;
  }, 0);

  return result;
}
main().then(console.log);
