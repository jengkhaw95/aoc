import { readFileSync } from "fs";
import path from "path";

class Stack {
  private stack: string[][];
  constructor(initialStack: string[][]) {
    this.stack = initialStack;
  }

  move(n: number, from: number, to: number) {
    for (let i = 0; i < n; i++) {
      const el = this.stack[from].pop();
      if (!el) {
        throw "Nothing to be moved";
      }
      this.stack[to].push(el);
    }
  }
  getTopElements() {
    return this.stack.map((d) => d[d.length - 1]);
  }
}

async function main() {
  const input = await readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );

  const result = input.split("\r\n");

  const divider = result.indexOf("");

  const stacks = result.slice(0, divider - 1);

  const col = result[divider - 1];

  const totalCol = Math.max(...col.replace(" ", "").split("").map(Number));

  stacks.reverse();
  const index = "123456789".slice(0, totalCol);
  const els = index.split("").map((d) => col.indexOf(d));
  const initialStack: string[][] = [];
  for (let s of stacks) {
    const chars = s.split("");
    els.forEach((at, i) => {
      const el = chars[at];

      if (el.trim() === "") {
        return;
      }
      if (!initialStack[i]) {
        initialStack[i] = [el];
      } else {
        initialStack[i].push(el);
      }
    });
  }
  const stack = new Stack(initialStack);

  const instructions = result.slice(divider + 1);

  instructions.forEach((i) => {
    const [action, detail] = i.split(" from ");

    const toMove = Number(action.split("move ")[1]);
    const [from, to] = detail.split(" to ").map(Number);
    stack.move(toMove, from - 1, to - 1);
  });
  return stack.getTopElements().join("");
}
main().then(console.log);
