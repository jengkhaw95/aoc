import {readFileSync} from "fs";
import path from "path";

async function main() {
  const input = await readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );

  const result = input
    .split("\r\n")
    .map((g) =>
      Object.values(
        g
          .split(": ")[1]
          .split("; ")
          .reduce(
            (a, s) => {
              s.split(", ").forEach((b) => {
                const [amount, color] = b.split(" ");
                if (a[color] < Number(amount)) {
                  a[color] = Number(amount);
                }
              });

              return a;
            },
            {red: 0, green: 0, blue: 0} as Record<string, number>
          )
      ).reduce((a, b) => a * b, 1)
    )
    .reduce((a, b) => a + b, 0);

  return result;
}
main().then(console.log);
