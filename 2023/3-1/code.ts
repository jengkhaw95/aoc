import {readFileSync} from "fs";
import path from "path";

function isCharANumber(char: string) {
  return "1234567890".includes(char);
}

async function main() {
  const input = await readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );

  const rows = input.split("\r\n");

  const numberIndex = rows.map((row) => {
    return row.split("").reduce((a, b, i) => {
      const last = a[a.length - 1];

      if (!last) {
        if (isCharANumber(b)) {
          return [...a, [i]];
        }
      } else {
        if (last.length === 1) {
          if (!isCharANumber(b)) {
            last[1] = i - 1;

            return a;
          }
          if (i === row.length - 1) {
            last[1] = i;
            return a;
          }
        }
        if (last.length === 2) {
          if (isCharANumber(b)) {
            return [...a, [i]];
          }
        }
      }
      return a;
    }, [] as number[][]);
  });

  let sum = 0;
  numberIndex.forEach((row, index) => {
    if (!row.length) {
      return;
    }

    for (let r of row) {
      const [start, end] = r;
      const number = rows[index].substring(start, end + 1);

      let isSymbolFound = false;
      for (let i = index - 1; i <= index + 1; i++) {
        if (isSymbolFound) {
          break;
        }
        if (!rows?.[i]) {
          continue;
        }
        for (let j = start - 1; j <= end + 1; j++) {
          if (isSymbolFound) {
            break;
          }
          if (!rows[i]?.[j]) {
            continue;
          }
          const char = rows[i][j];

          if (!isCharANumber(char) && char !== ".") {
            isSymbolFound = true;
            sum += Number(number);
          }
        }
      }
    }
  });

  return sum;
}
main().then(console.log);
