import os from "os";
import { createInterface } from "readline";

const validateStartFlag = (flag) => {
  return flag === "--username";
};

let flag;
let username;
[flag, username] = process.argv.slice(2)[0].split("=");
console.log(`Welcome to the File Manager, ${username}!`);

console.log(validateStartFlag(flag));
let currentPath = os.homedir();
console.log(`You are currently in ${currentPath}`);
const readlineInterface = createInterface({
  input: process.stdin,
  output: process.stdout,
});
readlineInterface.on("line", (line) => {
  console.log(line);
});
process.on("SIGINT", () => {
  readlineInterface.close();
  console.log(`Thank you for using File Manager, ${username}!`);
});
