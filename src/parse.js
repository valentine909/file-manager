import { settings, messages, commands } from './settings.js';
import { goUp, listDirectory, changeDirectory } from './navigation.js';

export async function parseArgs(args) {
  switch (args[0]) {
    case commands.up:
      settings.currentPath = goUp(settings.currentPath);
      break;
    case commands.ls:
      await listDirectory(settings.currentPath);
      break;
    case commands.cd:
      settings.currentPath = changeDirectory(
        settings.currentPath,
        args.slice(1)
      );
      break;
    case commands.cat:
      //
      break;
    case commands.add:
      //
      break;
    case commands.rn:
      //
      break;
    case commands.cp:
      //
      break;
    case commands.mv:
      //
      break;
    case commands.rm:
      //
      break;
    case commands.os:
      //
      break;
    case commands.hash:
      //
      break;
    case commands.compress:
      //
      break;
    case commands.decompress:
      //
      break;
    case commands.exit:
      process.exit();
      break;
    default:
      console.log(messages.invalidInput);
  }
}
