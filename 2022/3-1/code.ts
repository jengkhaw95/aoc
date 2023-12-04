import { readFileSync } from "fs";
import path from "path";

const priority = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

async function main() {
  const input = await readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );

  const result = input.split("\r\n").reduce((a, b) => {
    const [c, d] = [b.slice(0, b.length / 2), b.slice(b.length / 2)];

    let m = "";
    for (let _c of c) {
      if (m !== "") {
        break;
      }
      for (let _d of d) {
        if (m !== "") {
          break;
        }
        if (_d === _c) {
          m = _d;
        }
      }
    }
    return a + priority.indexOf(m) + 1;
  }, 0);

  return result;
}
main().then(console.log);
