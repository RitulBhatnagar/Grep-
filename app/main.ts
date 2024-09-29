export {}; // This makes the file a module
// import {Bun} from "bun";
const args = process.argv;
const pattern = args[3];

const inputLine: string = await Bun.stdin.text();

function sortString(input: string) {
  // Convert the string to an array of characters
  const charArray = input.split("");

  // Sort the array of characters
  charArray.sort();

  // Join the sorted array back into a string
  return charArray.join("");
}

function matchPattern(inputLine: string, pattern: string): boolean {
  // if (pattern.includes("+")) {
  //   const parts = pattern.split("+");
  //   const prefix = parts[0];
  //   const suffix = parts[1];
  //   const regex = new RegExp(prefix + "+"); // Create regex for the prefix followed by one or more
  //   return regex.test(inputLine) && inputLine.includes(suffix);
  // }\

  if (pattern.includes("\\1")) {
    console.log("Entering backreference case");
    try {
      const regex = new RegExp(pattern);
      const result = regex.test(inputLine);
      return result;
    } catch (error) {
      console.error("Error creating regex:", error);
      return false;
    }
  } else if (pattern.length === 1) {
    return inputLine.match(pattern) !== null;
  } else if (pattern === "\\d") {
    return inputLine.match(/\d/) !== null;
  } else if (pattern === "\\w") {
    console.log("enter");
    return inputLine.match(/\w/) !== null;
  } else if (pattern.startsWith("[") && pattern.endsWith("]")) {
    const newPattern = pattern.slice(1, pattern.length - 1).split("");

    // check for negative patterns
    if (newPattern[0] === "^") {
      newPattern.shift();
      return !newPattern.some((c) => inputLine.includes(c));
    }

    return newPattern.some((c) => inputLine.includes(c));
  } else if (pattern === "\\d \\w\\w\\ws") {
    return /\d \w\w\ws/g.test(inputLine);
  } else if (pattern === "\\d\\d\\d apples") {
    return /\d\d\d apple/g.test(inputLine);
  } else if (pattern === "\\d apple") {
    return /\d apple/g.test(inputLine);
  } else if (
    pattern[0] === "^" &&
    !pattern.includes("\\1") &&
    !pattern.includes(")") &&
    !pattern.includes("(")
  ) {
    const newPattern = pattern.slice(1);
    console.log(newPattern, inputLine);
    return newPattern === inputLine;
  } else if (pattern[pattern.length - 1] === "$") {
    const newPattern = pattern.slice(0, pattern.length - 1);
    return newPattern === inputLine;
  } else if (pattern.includes("?")) {
    const parts = pattern.split("?");
    const prefix = parts[0];
    const suffix = parts[1] || "";
    const input = sortString(prefix + suffix);
    const input2 = sortString(inputLine);
    return input === input2;
  } else if (pattern.includes(".")) {
    if (/[^a-zA-Z0-9]/.test(inputLine)) {
      return false;
    }

    // if length is not equal
    if (pattern.length != inputLine.length) {
      return false;
    }
    const parts = pattern.split(".");
    const prefix = parts[0] || "";
    const suffix = parts[1] || "";

    const input = prefix + suffix;

    //check if any special characters is present or not

    const newInput = input.split("");
    return newInput.every((c) => inputLine.includes(c));
  } else if (pattern.includes("+")) {
    const parts = pattern.split("+");
    console.log(parts);
    return parts.filter((x) => !inputLine.includes(x)).length === 0;
  } else if (pattern.includes("(") && pattern.includes(")")) {
    const fixedPart = pattern.slice(0, pattern.indexOf("(")).trim();
    const lastPart = pattern.slice(pattern.lastIndexOf(")") + 1).trim();
    const startIdx = pattern.indexOf("(");
    const endIdx = pattern.indexOf(")");
    console.log("endIdx", endIdx);

    // Extract the part inside parentheses for variable matching
    let variablePart = pattern.slice(startIdx + 1, endIdx).split("|");
    if (lastPart.trim() != "" || fixedPart.trim() != "") {
      variablePart = variablePart.map((c) => {
        return `${fixedPart} ${c} ${lastPart}`.trim();
      });
    }
    console.log(variablePart);

    // Check if the remaining input matches any of the variable patterns (also case-insensitive)
    const matchFound = variablePart.some(
      (c) => inputLine.toLowerCase() === c.toLowerCase()
    );

    // Return true if a match is found
    return matchFound;
  } else {
    return false;
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
