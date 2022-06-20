import { settings, messages, commands } from './settings.js';
import { goUp, listDirectory, changeDirectory } from './navigation.js';
import {
  cat,
  addFile,
  renameFile,
  _copyFile,
  moveFile,
  remove,
} from './fiop.js';
import { resolve } from 'path';
import { osCommands } from './os.js';
import { calculateHash } from './hash.js';
import { fileArchiver } from './archive.js';

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
        args.slice(1)[0] ?? ''
      );
      break;
    case commands.cat:
      await cat(resolve(settings.currentPath, args.slice(1)[0] ?? ''));
      break;
    case commands.add:
      await addFile(settings.currentPath, args.slice(1)[0] ?? '');
      break;
    case commands.rn:
      await renameFile(
        settings.currentPath,
        args.slice(1)[0] ?? '',
        args.slice(1)[1] ?? ''
      );
      break;
    case commands.cp:
      await _copyFile(args.slice(1)[0] ?? '', args.slice(1)[1] ?? '').catch(console.log);
      break;
    case commands.mv:
      await moveFile(args.slice(1)[0] ?? '', args.slice(1)[1] ?? '').catch(console.log);
      break;
    case commands.rm:
      await remove(settings.currentPath, args.slice(1)[0] ?? '');
      break;
    case commands.os:
      osCommands(args.slice(1)[0] ?? '');
      break;
    case commands.hash:
      await calculateHash(settings.currentPath, args.slice(1)[0] ?? '');
      break;
    case commands.compress:
      await fileArchiver(
        settings.currentPath,
        args.slice(1)[0] ?? '',
        args.slice(1)[1] ?? '',
        true
      );
      break;
    case commands.decompress:
      await fileArchiver(
        settings.currentPath,
        args.slice(1)[0] ?? '',
        args.slice(1)[1] ?? '',
        false
      );
      break;
    case commands.exit:
      process.exit();
      break;
    default:
      console.log(messages.invalidInput);
  }
}
