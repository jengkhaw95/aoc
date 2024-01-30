import { readFileSync } from "fs";
import path from "path";

const PIPE_MAP = {
  North: "F7|",
  East: "7J-",
  South: "|LJ",
  West: "L-F",
};

function exec(pos: number[], map: string[][]) {
  let step = 0;

  let from: "N" | "E" | "S" | "W" | undefined = undefined;

  let isEnded = false;

  const path: number[][] = [pos];

  while (!isEnded) {
    let [r, c] = pos;
    let tile = map[r][c];

    // North
    if (
      r > 0 &&
      "." !== map[r - 1][c] &&
      from !== "N" &&
      "JL|S".includes(tile)
    ) {
      let nextTile = map[r - 1][c];
      if (nextTile === "S" && step > 0) {
        step += 1;
        break;
      }
      if (PIPE_MAP.North.includes(nextTile)) {
        tile = nextTile;
        step < 100 && console.log("N");
        pos = [r - 1, c];
        from = "S";
        step += 1;
        path.push(pos);
        continue;
      }
    }
    // East
    if (
      c < map[0].length - 1 &&
      "." !== map[r][c + 1] &&
      from !== "E" &&
      "-LFS".includes(tile)
    ) {
      let nextTile = map[r][c + 1];
      if (nextTile === "S" && step > 0) {
        step += 1;
        break;
      }
      if (PIPE_MAP.East.includes(nextTile)) {
        tile = nextTile;
        step < 100 && console.log("E");
        pos = [r, c + 1];
        from = "W";
        step += 1;
        path.push(pos);
        continue;
      }
    }
    // South
    if (
      r < map.length - 1 &&
      "." !== map[r + 1][c] &&
      from !== "S" &&
      "7F|S".includes(tile)
    ) {
      let nextTile = map[r + 1][c];
      if (nextTile === "S" && step > 0) {
        step += 1;
        break;
      }
      if (PIPE_MAP.South.includes(nextTile)) {
        tile = nextTile;
        step < 100 && console.log("S");
        pos = [r + 1, c];
        from = "N";
        step += 1;
        path.push(pos);
        continue;
      }
    }
    // West
    if (
      c > 0 &&
      "." !== map[r][c - 1] &&
      from !== "W" &&
      "J-7S".includes(tile)
    ) {
      let nextTile = map[r][c - 1];
      if (nextTile === "S" && step > 0) {
        step += 1;
        break;
      }
      if (PIPE_MAP.West.includes(nextTile)) {
        tile = nextTile;
        step < 100 && console.log("W");
        pos = [r, c - 1];
        from = "E";
        step += 1;
        path.push(pos);
        continue;
      }
    }
  }
  console.log(path[0]);
  return step;
}

async function main() {
  const input = await readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );

  const area = input.split("\r\n").map((d) => d.split(""));

  const sPos = area.reduce(
    (a, b, i) => (b.includes("S") ? [i, b.indexOf("S")] : a),
    [] as number[]
  );
  // console.log(area);
  console.log({ sPos });
  return exec(sPos, area);

  return sPos;
}

const startTime = performance.now();
main()
  .then(console.log)
  .then(() => {
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`Execution time: ${executionTime.toFixed(2)} ms`);
  });
