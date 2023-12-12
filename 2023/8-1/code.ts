import { readFileSync } from "fs";
import path from "path";

async function main() {
  const input = await readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );

  const [instruction, _, ..._map] = input.split("\r\n");

  const map = _map.reduce((a, b) => {
    const [k, d] = b.split(" = ");
    const n = d.split(", ").map((d) =>
      d
        .split("")
        .map((e) => (["(", ")"].includes(e) ? "" : e))
        .join("")
    );

    return { ...a, [k]: n };
  }, {} as { [k: string]: string[] });

  let startKey = "AAA"; //Object.keys(map)[0];

  let c = 0;
  let i_index = 0;

  while (true) {
    const i = instruction[i_index % instruction.length];
    const index = i === "L" ? 0 : 1;
    startKey = map[startKey][index];
    if (!startKey) {
      throw `Invalid key ${startKey}`;
    }
    c++;
    if (startKey === "ZZZ") {
      return c;
    }
    i_index++;
  }
}

const startTime = performance.now();
main()
  .then(console.log)
  .then(() => {
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`Execution time: ${executionTime.toFixed(2)} ms`);
  });
