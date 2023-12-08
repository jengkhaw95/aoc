import { readFileSync } from "fs";
import path from "path";

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

function arrayLCM(numbers: number[]): number {
  if (numbers.length === 0) {
    throw new Error("Array must not be empty");
  }

  let result = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    result = lcm(result, numbers[i]);
  }

  return result;
}

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

  let startKeys = Object.keys(map).filter((d) => d[2] === "A");
  let i_index = 0;

  const record = startKeys.map((_) => 0);

  while (true) {
    const i = instruction[i_index % instruction.length];
    const index = i === "L" ? 0 : 1;
    for (let ki in startKeys) {
      const startKey = startKeys[ki];

      startKeys[ki] = map[startKey][index];

      if (startKeys[ki][2] === "Z" && record[ki] === 0) {
        record[ki] = i_index + 1;
      }
      if (record.every((d) => d > 0)) {
        return arrayLCM(record);
      }
    }
    i_index++;
  }
}
main().then(console.log);
