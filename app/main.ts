export {}; // This makes the file a module
// import {Bun} from "bun";
const args = process.argv;
const pattern = args[3];

const inputLine: string = await Bun.stdin.text();

function matchPattern(inputLine: string, pattern: string): boolean {
  if (pattern.length === 1) {
    return inputLine.match(pattern) !== null;
  } else if (pattern === "\\d") {
    return inputLine.match(/\d/) !== null;
  } else if (pattern === "\\w") {
    return inputLine.match(/\w/) !== null;
  } else if (pattern.startsWith("[") && pattern.endsWith("]")) {
    const newPattern = pattern.slice(1, pattern.length - 1).split("");

    // check for negative patterns
    if (newPattern[0] === "^") {
      newPattern.shift();
      return !newPattern.some((c) => inputLine.includes(c));
    }

    return newPattern.some((c) => inputLine.includes(c));
  }
}

if (args[2] !== "-E") {
  console.log("Expected first argument to be '-E'");
  process.exit(1);
}

console.log("Logs from your program will appear here!");

// Uncomment this block to pass the first stage
if (matchPattern(inputLine, pattern)) {
  console.log("pattern matched");
  process.exit(0);
} else {
  console.log("pattern did not match");
  process.exit(1);
}
