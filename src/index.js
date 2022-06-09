import { homedir } from 'os';
import { createInterface } from 'readline';
import { parseArgs } from './parse.js';
import { messages, settings } from './settings.js';

const mainLoop = async () => {
  console.log(messages.hello + settings.username + '!');
  console.log(messages.currentPath + settings.currentPath);
  const readlineInterface = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  readlineInterface.on('line', async (line) => {
    await parseArgs(line.split(' '));
    console.log(messages.currentPath + settings.currentPath);
  });
  process.on('exit', () => {
    readlineInterface.close();
    console.log(messages.goodbye + settings.username + '!');
  });
};

const validateArgs = () => {
  if (process.argv.length <= 2) {
    console.log(messages.insufficientArgs);
    process.exit();
  }
};

const validateUsername = (flag) => {
  if (flag !== '--username' || !settings.username) {
    console.log(messages.incorrectUsername);
    process.exit();
  }
};

function init() {
  let flag;
  settings.currentPath = homedir();
  validateArgs();
  [flag, settings.username] = process.argv.slice(2)[0].split('=');
  validateUsername(flag);
  mainLoop().then();
}

init();
