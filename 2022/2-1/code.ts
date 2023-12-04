import { readFileSync } from "fs";
import path from "path";

const elf: Record<string, string> = {
  A: "r",
  B: "p",
  C: "s",
};
const me: Record<string, string> = {
  X: "r",
  Y: "p",
  Z: "s",
};

const score: Record<string, number> = {
  r: 1,
  p: 2,
  s: 3,
};

function myGameResult(me: string, elf: string) {
  if (me === elf) {
    return 3; // draw
  }
  if (
    (me === "r" && elf === "s") ||
    (me === "p" && elf === "r") ||
    (me === "s" && elf === "p")
  ) {
    return 6;
  }
  return 0;
}

async function main() {
  const input = await readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );

  const result = input.split("\r\n").reduce((a, b) => {
    const [elfPlay, myPlay] = b.split(" ");
    const result = myGameResult(me[myPlay], elf[elfPlay]);

    return a + result + score[me[myPlay]];
  }, 0);

  return result;
}
main().then(console.log);
