import fs from "fs"

const input = fs
  .readFileSync("input")
  .toString()
  .split(/\n\n/)
  .map((e) => e
    .split(/\n/)
    .map((e) => +e)
    .reduce((a, b) => a + b, 0)
  );

const p2 = input
  .sort((a, b) => a - b)
  .reverse()
  .slice(0, 3)
  .reduce((a, b) => a + b);

const result = Math.max(...input);

console.log(result, p2);
