import { osParameters, messages } from './settings.js';
import os from 'os';

export const osCommands = (parameter) => {
  switch (parameter.slice(2)) {
    case osParameters.EOL:
      console.log(messages.eol + JSON.stringify(os.EOL));
      break;
    case osParameters.cpus:
      parseCPUs();
      break;
    case osParameters.homedir:
      console.log(messages.homedir, os.homedir());
      break;
    case osParameters.username:
      console.log(messages.username, os.userInfo().username);
      break;
    case osParameters.architecture:
      console.log(messages.architecture, os.arch());
      break;
    default:
      console.log(messages.invalidInput);
      break;
  }
};

const parseCPUs = () => {
  const coreNumber = os.cpus().length;
  console.log(messages.cpus + coreNumber);
  const result = [];
  os.cpus().forEach((cpu) => {
    result.push({ model: cpu.model, speed: cpu.speed });
  });
  console.log(result);
};
