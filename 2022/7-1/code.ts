import { readFileSync } from "fs";
import path from "path";

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
      const [size, filename] = c.split(" ");
      const paths = _path.split(".");

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
  return Object.values(pathSizeMap).reduce((a, b) => (b <= 1e5 ? a + b : a), 0);
}
main().then(console.log);
