import os from 'os';
import { createInterface } from 'readline';
import { parseArgs } from './parse.js';
import { settings } from './settings.js';

const mainLoop = async () => {
  console.log(`Welcome to the File Manager, ${settings.username}!`);
  console.log(`You are currently in ${settings.currentPath}`);
  const readlineInterface = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  readlineInterface.on('line', (line) => {
    parseArgs(line.split(' '));
    console.log(`You are currently in ${settings.currentPath}`);
  });
  process.on('exit', () => {
    readlineInterface.close();
    console.log(`Thank you for using File Manager, ${settings.username}!`);
  });
};

const validateArgs = () => {
  if (process.argv.length <= 2) {
    console.log('Insufficient arguments');
    process.exit();
  }
};

const validateUsername = (flag) => {
  if (flag !== '--username' || !settings.username) {
    console.log('Incorrect username');
    process.exit();
  }
};

function init() {
  let flag;
  settings.currentPath = os.homedir();
  validateArgs();
  [flag, settings.username] = process.argv.slice(2)[0].split('=');
  validateUsername(flag);
  mainLoop().then();
}

init();
