import { readFileSync } from "fs";
import path from "path";

const elf: Record<string, string> = {
  A: "r",
  B: "p",
  C: "s",
};
const decision: Record<string, number> = {
  X: 0,
  Y: 3,
  Z: 6,
};

const score: Record<string, number> = {
  r: 1,
  p: 2,
  s: 3,
};

function myGameDecision(me: string, elf: string) {
  if (me === "Y") {
    return elf;
  } else if (me === "Z") {
    return elf === "s" ? "r" : elf === "r" ? "p" : "s";
  }
  return elf === "s" ? "p" : elf === "r" ? "s" : "r";
}

async function main() {
  const input = await readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );

  const result = input.split("\r\n").reduce((a, b) => {
    const [elfPlay, myPlay] = b.split(" ");
    const result = myGameDecision(myPlay, elf[elfPlay]);

    return a + score[result] + decision[myPlay];
  }, 0);

  return result;
}
main().then(console.log);
