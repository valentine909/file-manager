import { dirname, resolve } from 'path';
import { readdir } from 'fs/promises';
import { existsSync, realpathSync, lstatSync } from 'fs';
import { messages } from './settings.js';

export const goUp = (path) => {
  return dirname(path);
};

export const listDirectory = async (path) => {
  (await readdir(path, { withFileTypes: true })).map((file) =>
    console.log(file.name)
  );
};

export const changeDirectory = (current, destination) => {
  const newPath = resolve(current, destination);
  if (existsSync(newPath) && lstatSync(newPath).isDirectory()) {
    return realpathSync.native(newPath);
  } else {
    console.log(messages.operationFailed);
    return current;
  }
};
