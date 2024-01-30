import { readFileSync } from "fs";
import path from "path";

const log = false;
const PIPE_MAP = {
  North: "F7|",
  East: "7J-",
  South: "|LJ",
  West: "L-F",
};

const CHAR_MAP: Record<any, any> = {
  F: "╔",
  "7": "╗",
  L: "╚",
  J: "╝",
  "|": "║",
  "-": "═",
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
        log && console.log("N");
        pos = [r - 1, c];
        from = "S";
        step += 1;
        // map[r][c] = CHAR_MAP[nextTile as any];
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
        log && console.log("E");
        pos = [r, c + 1];
        from = "W";
        step += 1;
        // map[r][c] = CHAR_MAP[nextTile as any];
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
        log && console.log("S");
        pos = [r + 1, c];
        from = "N";
        step += 1;
        // map[r][c] = CHAR_MAP[nextTile as any];
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
        log && console.log("W");
        pos = [r, c - 1];
        from = "E";
        step += 1;
        // map[r][c] = CHAR_MAP[nextTile as any];
        path.push(pos);
        continue;
      }
    }
  }
  // console.log(path[0]);
  return path;
  // return step;
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

  const p = exec(sPos, area);

  const clonedMap = structuredClone(area);

  // for (let r = 0; r < clonedMap.length; r++) {
  //   for (let c = 0; c < clonedMap[0].length; c++) {
  //     if (p.some(([x, y]) => r === x && c === y)) {
  //       continue;
  //     }
  //     if (
  //       r === 0 ||
  //       c === 0 ||
  //       clonedMap[r - 1]?.[c] === "O" ||
  //       clonedMap[r - 1]?.[c] === "O" ||
  //       clonedMap[r]?.[c - 1] === "O" ||
  //       clonedMap[r]?.[c + 1] === "O"
  //     ) {
  //       clonedMap[r][c] = "O";
  //     } else {
  //       clonedMap[r][c] = "?";
  //     }
  //   }
  // }

  p.forEach((e) => {
    area[e[0]][e[1]] = CHAR_MAP[area[e[0]][e[1]]];
  });
  // draw([0, 0], p, area);
  // console.log(area);

  return area.map((d) => d.join("")).join("\n");
}

function draw(pos: number[], skip: number[][], area: string[][]) {
  const [x, y] = pos;

  if (!area[x]?.[y]) {
    return;
  }
  if (!skip.some((d) => d[0] === x && d[1] === y)) {
    area[x][y] = "O";
  }
  //
  if (!skip.some((d) => d[0] === x + 1 && d[1] === y)) {
    draw([x + 1, y], skip, area);
  }
  if (!skip.some((d) => d[0] === x && d[1] === y + 1)) {
    draw([x, y + 1], skip, area);
  }
  if (!skip.some((d) => d[0] === x + 1 && d[1] === y + 1)) {
    draw([x + 1, y + 1], skip, area);
  }
  // if (!skip.some((d) => d[0] === x && d[1] - 1 === y - 1)) {
  //   draw([x, y -1], skip, area);
  // }
  // if (!skip.some((d) => d[0] - 1 === x - 1 && d[1] === y)) {
  //   draw([x -1, y], skip, area);
  // }
  // if (!skip.some((d) => d[0] - 1 === x - 1 && d[1] === y - 1)) {
  //   draw([x -1, y -1], skip, area);
  // }
}

const startTime = performance.now();
main()
  .then(console.log)
  .then(() => {
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`Execution time: ${executionTime.toFixed(2)} ms`);
  });
