import { readFileSync } from "fs";
import path from "path";

const diskSize = 70_000_000;
const requiredSize = 30_000_000;

async function main() {
  const input = await readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );

  const pathSizeMap: Record<string, number> = {};

  let _path = "/";

  const commands = input.split("\r\n");
  commands.forEach((c) => {
    if (c.startsWith("$ cd ")) {
      const dest = c.split("$ cd ")[1];
      if (dest === "/") {
        // back to root
        _path = "/";
      } else if (dest === "..") {
        // back to previous
        const _p = _path.split(".");
        _p.pop();
        _path = _p.join(".");
      } else {
        _path += `.${dest}`;
      }
    } else if (c.startsWith("$ ls")) {
      // ignore?
    } else if (c.startsWith("dir")) {
      // ignore?
    } else {
      const [size] = c.split(" ");
      const paths = _path.split(".");

      // let dir = structure;
      let cp = "";
      for (let p of paths) {
        cp += `.${p}`;

        if (!(cp in pathSizeMap)) {
          pathSizeMap[cp] = Number(size);
        } else {
          pathSizeMap[cp] += Number(size);
        }

        if (p === "/") {
          continue;
        }
      }
    }
  });

  const sizeToFree = requiredSize - (diskSize - pathSizeMap["./"]);

  const d = Math.min(
    ...Object.values(pathSizeMap).filter((d) => d >= sizeToFree)
  );
  return d;
}
main().then(console.log);
