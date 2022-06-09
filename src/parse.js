import { settings } from './settings.js';
import { goUp, listDirectory, changeDirectory } from './navigation.js';

export async function parseArgs(args) {
  switch (args[0]) {
    case 'up':
      settings.currentPath = goUp(settings.currentPath);
      break;
    case 'ls':
      await listDirectory(settings.currentPath);
      break;
    case 'cd':
      settings.currentPath = changeDirectory(
        settings.currentPath,
        args.slice(1)
      );
      break;
    case 'cat':
      //
      break;
    case 'add':
      //
      break;
    case 'rn':
      //
      break;
    case 'cp':
      //
      break;
    case 'mv':
      //
      break;
    case 'rm':
      //
      break;
    case 'os':
      //
      break;
    case 'hash':
      //
      break;
    case 'compress':
      //
      break;
    case 'decompress':
      //
      break;
    case '.exit':
      process.exit();
      break;
    default:
      console.log('Invalid input');
  }
}
