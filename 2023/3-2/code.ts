import { readFileSync } from "fs";
import path from "path";

function isCharANumber(char: string) {
  return "1234567890".includes(char);
}

function getRowNumbers(str: string, start: number, end: number) {
  const chars = str.split("");
  let ranges: number[][] = [];

  for (let i in chars) {
    const lastRange = ranges[ranges.length - 1];
    const index = Number(i);

    const char = chars[i];
    if (isCharANumber(char)) {
      if (!lastRange) {
        if (index > end) {
          break;
        }
        ranges.push([index]);
      } else if (lastRange.length === 2) {
        if (index > end) {
          break;
        }
        ranges.push([index]);
      } else if (lastRange.length === 1 && index === chars.length - 1) {
        lastRange[1] = index;
      }
    } else {
      if (index <= start) {
        ranges = [];
      } else if (lastRange?.length === 1) {
        lastRange[1] = index - 1;
      }
    }
  }
  return ranges.map((d) => Number(str.substring(d[0], d[1] + 1)));
}

async function main() {
  const input = await readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );

  const rows = input.split("\r\n");

  let numbers: number[] = [];
  for (let i in rows) {
    const I = Number(i);
    const row = rows[i];
    const cols = row.split("");
    for (let j in cols) {
      let ns: number[] = [];
      const J = Number(j);
      const char = row[j];

      if (char !== "*") {
        continue;
      }

      if (I - 1 >= 0) {
        const n = getRowNumbers(rows[I - 1], J - 1, J + 1);
        ns = ns.concat(n);
        if (n.length === 2) {
          numbers = numbers.concat();
        }
      }

      if (I + 1 < rows.length) {
        const n = getRowNumbers(rows[I + 1], J - 1, J + 1);
        ns = ns.concat(n);
        if (n.length === 2) {
          numbers = numbers.concat();
        }
      }

      const n = getRowNumbers(rows[I], J - 1, J + 1);
      ns = ns.concat(n);
      if (n.length === 2) {
        numbers = numbers.concat();
      }

      if (ns.length === 2) {
        numbers = numbers.concat(ns.reduce((a, b) => a * b, 1));
      }

      if (Number(i) - 1 >= 0) {
        rows[i][j];
      }
    }
  }

  return numbers.reduce((a, b) => a + b, 0);
}

const startTime = performance.now();
main()
  .then(console.log)
  .then(() => {
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`Execution time: ${executionTime.toFixed(2)} ms`);
  });
