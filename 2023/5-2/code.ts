import { readFileSync } from "fs";
import path from "path";

const useLog = !true;
function mergeRanges(ranges: number[][]) {
  if (!Array.isArray(ranges) || ranges.length === 0) {
    return [];
  }

  // Sort the ranges based on their start values
  ranges.sort((a, b) => a[0] - b[0]);

  const mergedRanges = [ranges[0]];

  for (let i = 1; i < ranges.length; i++) {
    const currentRange = ranges[i];
    const lastMergedRange = mergedRanges[mergedRanges.length - 1];

    if (currentRange[0] <= lastMergedRange[1]) {
      // Ranges overlap, merge them
      lastMergedRange[1] = Math.max(lastMergedRange[1], currentRange[1]);
    } else {
      // Ranges do not overlap, add the current range to the merged list
      mergedRanges.push(currentRange);
    }
  }

  return mergedRanges;
}

function splitArray(origin: number[][], filter: number[][]) {
  let _origin = origin;
  let offsetRanges: number[][] = [];
  let passedRanges: number[][] = [];
  for (let f of filter) {
    const [dest, src, count] = f;

    const [fmin, fmax] = [src, src + count - 1];

    useLog && console.log("\n>>   Filter  ", f, "of", filter);

    for (let o of _origin) {
      const tpr: number[][] = [];
      useLog && console.log(">>     Process ", o, "of", _origin);
      const [min, max] = o;

      if (fmin > max || fmax < min) {
        useLog && console.log(">>       Skipped ", f);
        continue;
      }
      useLog && console.log(">>       Pass    ", o);
      if (min < fmin) {
        tpr.push([min, fmin - 1]);
        passedRanges.push([min, fmin - 1]);
      }
      if (max > fmax) {
        tpr.push([fmax + 1, max]);
        passedRanges.push([fmax + 1, max]);
      }

      passedRanges = tpr;

      // filter & offset
      const [amin, amax] = [Math.max(min, fmin), Math.min(max, fmax)];
      const offset = dest - fmin;
      offsetRanges.push([amin + offset, amax + offset]);
      useLog && console.log(">>       Out     ", passedRanges);
      useLog &&
        console.log(">>       Filtered", [amin, amax], " > ", offsetRanges);
    }
    if (passedRanges.length || offsetRanges.length) {
      _origin = passedRanges;
    }
    // _origin = out;
    // console.log(out);
  }

  // Merge
  useLog && console.log({ origin, _origin, offsetRanges, filter });
  const result = mergeRanges([..._origin, ...offsetRanges]);
  useLog && console.log(result);
  return result;
}

async function main() {
  const input = await readFileSync(
    path.resolve(__dirname, "./input.txt"),
    "utf-8"
  );

  const [_, v] = input.split("seeds: ");
  const [_seeds, ..._maps] = v.split("\r\n").filter((d) => !!d);

  const seeds = _seeds
    .split(" ")
    .map(Number)
    .reduce(
      (a, b, i, d) => (i % 2 === 0 ? [...a, [b, d[i + 1]]] : a),
      [] as number[][]
    );

  const [__, ...mapTypes] = _maps
    .join("\r\n")
    .split("map:\r\n")
    .map((d) => d.split("\r\n").filter((_, i, f) => i !== f.length - 1))
    .map((d) => d.map((e) => e.split(" ").map(Number)));

  const __seeds = seeds.reduce(
    (a, b) => [...a, [b[0], b[0] + b[1] - 1]],
    [] as number[][]
  );
  let min = Infinity;
  for (let _s of __seeds) {
    let d = [_s];
    for (let mapType of mapTypes) {
      useLog && console.log(">> Inputs  ", d);
      useLog && console.log(">> Map type", mapType);
      d = splitArray(d, mapType);
      useLog && console.log(">> Result  ", d);
      useLog && console.log("\n");
    }

    const _min = d.reduce(
      (a, b) =>
        Math.min(
          a,
          b.reduce((c, d) => Math.min(c, d), Infinity)
        ),
      Infinity
    );
    useLog && console.log({ _min, min });
    if (_min < min) {
      min = _min;
    }
  }
  useLog && console.log(min);
}
main().then(console.log);
