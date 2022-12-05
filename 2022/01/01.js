import fs from "fs"

const input = fs
  .readFileSync('input')
  .toString()
  .split(/\n\n/)
  .map((e) => e
    .split(/\n/)
    .map((e) => +e)
    .reduce((a, b) => a + b, 0)
  );

const p1 = Math.max(...input);

const p2 = input
  .sort((a, b) => a - b)
  .reverse()
  .slice(0, 3)
  .reduce((a, b) => a + b);

console.log(p1, p2);
