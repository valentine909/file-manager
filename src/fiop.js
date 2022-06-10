import { existsSync, createReadStream } from 'fs';
import { messages } from './settings.js';
import { writeFile, access, rename, copyFile, rm } from 'fs/promises';
import { dirname, resolve } from 'path';

export const cat = async (path) => {
  return new Promise((resolve) => {
    if (existsSync(path)) {
      try {
        const stream = createReadStream(path, { encoding: 'utf8' });
        stream.on('error', (err) => {
          console.log(err);
          resolve();
        });
        stream.on('end', () => {
          resolve();
        });
        stream.pipe(process.stdout);
      } catch (e) {
        console.log(e.message);
        resolve();
      }
    } else {
      console.log(messages.operationFailed);
      resolve();
    }
  });
};

export const addFile = async (path, filename) => {
  const file = resolve(path, filename);
  if (!access(file)) {
    try {
      await writeFile(file, '');
    } catch (error) {
      console.log(error.message);
    }
  } else {
    console.log(messages.fileExists);
  }
};

export const renameFile = async (path, old, newname) => {
  try {
    const oldFile = resolve(path, old);
    const newPath = dirname(oldFile);
    const newFile = resolve(newPath, newname);
    await rename(oldFile, newFile);
  } catch (error) {
    console.log(messages.operationFailed);
  }
};

export const _copyFile = async (source, destination) => {
  try {
    await copyFile(source, destination);
  } catch (error) {
    console.log(messages.operationFailed);
  }
};

export const moveFile = async (source, destination) => {
  try {
    await copyFile(source, destination);
    await rm(source);
  } catch (error) {
    console.log(messages.operationFailed);
  }
};

export const remove = async (path, source) => {
  try {
    await rm(resolve(path, source), {recursive: true});
  } catch (error) {
    console.log(messages.operationFailed);
  }
};
