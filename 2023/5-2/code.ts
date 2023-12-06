import { readFileSync } from "fs";
import path from "path";

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

  // let __min = Infinity;

  // const __seeds = seeds.reduce(
  //   (a, b) => [...a, [b[0], b[0] + b[1]]],
  //   [] as number[][]
  // );

  // for (let _s of __seeds) {
  //   for (let s of Array.from(new Array(_s[1])).map((d,i)=>_s[0]+i)) {
  //     let d = s;
  //     let _min = Infinity;
  //     for (let mapType of mapTypes) {
  //       for (let map of mapType) {
  //         const [dest, src, count] = map;
  //         const mapMin = src;
  //         const mapMax = src + count - 1;
  //         if (mapMin <= s && s < mapMax) {
  //           d=src+count + s - src;
  //         }
  //       }
  //     }
  //   }

  //   if (_min < __min) __min = _min;
  // }

  console.log(seeds);
  let seed = [seeds];
  let result: number[][] = [];

  let min = Infinity;
  for (let s of seeds) {
    let data: number[][] = [[s[0], s[0] + s[1] - 1]];

    for (let mapType of mapTypes) {
      let tempCheckRange: number[][] = [];
      let matchedRange: number[][] = [];
      console.log("\n??? NEXT SECTION");
      for (let map of mapType) {
        let skippedRange: number[][] = [];
        const [dest, src, count] = map;
        const mapMin = src;
        const mapMax = src + count - 1;
        console.log("\n");
        console.log("/// NEXT MAP:");
        console.log("To flow", data);
        for (let b of data) {
          const [min, max] = b;

          console.log("\n");
          console.log("map range", [mapMin, mapMax]);
          if (mapMax < min || mapMin > max) {
            skippedRange.push([min, max]);
            console.log(`Skipped  `, b);
            continue;
          }
          console.log(`Process  `, b);

          const absMin = Math.max(min, mapMin);
          const absMax = Math.min(max, mapMax);

          console.log("seed     ", [min, max]);
          console.log("abs      ", [absMin, absMax]);

          let comment = "";
          // [    x        ]
          //      [        ]
          // [....]
          if (absMin > min) {
            comment = `${min}___${absMin - 1}` + comment;
            tempCheckRange.push([min, absMin - 1]);
          }

          // [        x    ]
          // [        ]
          //          [....]
          if (absMax < max) {
            comment += `${absMax + 1}___${max}`;
            tempCheckRange.push([absMax + 1, max]);
          }

          matchedRange.push([absMin, absMax].map((d) => d - mapMin + dest));

          console.log("Split   >", tempCheckRange, [absMin, absMax]);
          console.log("Map     >", tempCheckRange, matchedRange);
          // console.log(`> ${}`)
          // return tempCheckRange;
        }
        if (tempCheckRange.length) {
          data = tempCheckRange;
        }
      }
      if (matchedRange.length) {
        data = tempCheckRange.concat(matchedRange);
      }
    }
    const min_ = data.reduce(
      (a, b) =>
        Math.min(
          a,
          b.reduce((c, d) => Math.min(c, d)),
          Infinity
        ),
      Infinity
    );
    console.log({ min_ });

    if (min > min_) {
      min = min_;
    }
  }

  return min;
  // for (let i = 0; i < seeds.length / 2; i++) {
  //   let start = seeds[2 * i];
  //   const range = seeds[2 * i + 1];
  //   console.log(start, range);

  //   const [min, max] = [start, start + range - 1];

  //   for (let m of _maps) {
  //     if (!m) {
  //       continue;
  //     }
  //     if (m.includes(" map:")) {
  //       // checkpoint
  //       continue;
  //     }
  //   }
  // }

  // // let result: number[][] = [];

  // let resultMin = Infinity;
  // let checkRange: number[][] = [];

  // let tempCheckRange: number[][] = checkRange;

  // for (let i = 0; i < seeds.length / 2; i++) {
  //   {
  //     let start = seeds[2 * i];
  //     const range = seeds[2 * i + 1];
  //     console.log(start, range);

  //     const [min, max] = [start, start + range - 1];
  //     checkRange = [[min, max]];
  //     tempCheckRange = checkRange;
  //     for (let m of _maps) {
  //       // console.log(m);
  //       if (!m) {
  //         if (!tempCheckRange[0]) {
  //           tempCheckRange = checkRange;
  //         }

  //         continue;
  //       }
  //       if (m.includes(" map:")) {
  //         console.log(`\n************${m}`);
  //         checkRange = tempCheckRange;
  //         tempCheckRange = [];
  //         // checkpoint
  //         continue;
  //       }

  //       console.log("\n\n");

  //       const checkRangeLength = checkRange.reduce(
  //         (a, b) => a + Math.abs(b[0] - b[1]) + 1,
  //         0
  //       );

  //       if (checkRangeLength !== range) {
  //         console.warn("!!! Not balanced");
  //         console.log({
  //           checkRangeLength,
  //           checkRange,
  //           tempCheckRange,
  //         });
  //         console.warn("!!! Not balanced");
  //       }

  //       const [dest, src, count] = m.split(" ").map(Number);

  //       const mapMin = src;
  //       const mapMax = src + count - 1;
  //       console.log(checkRange);
  //       console.log(tempCheckRange);
  //       // console.log("\nCHECK");
  //       checkRange.forEach((b) => {
  //         const [min, max] = b;
  //         if (max < mapMin || min > mapMax) {
  //           console.log(
  //             `Skip: ${JSON.stringify({ max, mapMin, min, mapMax })}`
  //           );
  //           return;
  //         }

  //         const absMin = Math.max(min, mapMin);
  //         const absMax = Math.min(max, mapMax);
  //         console.log(
  //           `[${mapMin}...${mapMax}] -> [${dest}...${dest + count - 1}]`
  //         );
  //         let comment = `|${absMin}...${absMax}|`;

  //         // [    x        ]
  //         //      [        ]
  //         // [....]
  //         if (absMin > min) {
  //           comment = `${min}___${absMin - 1}` + comment;
  //           tempCheckRange.push([min, absMin - 1]);
  //         }

  //         // [        x    ]
  //         // [        ]
  //         //          [....]
  //         if (absMax < max) {
  //           comment += `${absMax + 1}___${max}`;
  //           tempCheckRange.push([absMax + 1, max]);
  //         }
  //         console.log(comment);
  //         tempCheckRange.push([absMin, absMax].map((d) => d - mapMin + dest));
  //         console.log(tempCheckRange);
  //         console.log({ min, max, absMin, absMax, mapMin, mapMax });
  //       });

  //       result = tempCheckRange;
  //     }

  //     console.log({ checkRange, tempCheckRange });
  //     const _min = checkRange?.reduce(
  //       (a, b) =>
  //         Math.min(
  //           a,
  //           b.reduce((c, d) => Math.min(c, d), Infinity)
  //         ),
  //       Infinity
  //     );
  //     console.log(_min);
  //     if (resultMin > _min) {
  //       resultMin = _min;
  //     }
  //   }
  // }

  // return resultMin;
}
main().then(console.log);

// [X] 33942462
// [X] 33942462
