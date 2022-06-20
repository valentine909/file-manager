import { existsSync, createReadStream, createWriteStream } from 'fs';
import { messages } from './settings.js';
import { rename, rm } from 'fs/promises';
import { dirname, resolve, basename } from 'path';

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
  try {
    const writer = createWriteStream(file, 'utf-8');
    writer.write('');
  } catch (error) {
    console.log(messages.operationFailed);
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
  if (!existsSync(source) || existsSync(destination)) {
    console.log(messages.operationFailed);
    return;
  }
  const fileName = basename(source);
  return new Promise((resolve1, reject) => {
    const reader = createReadStream(source);
    const writer = createWriteStream(resolve(destination, fileName));
    reader.on('error', () => {
      console.log(messages.operationFailed);
      reject('error');
    });
    writer.on('error', () => {
      console.log(messages.operationFailed);
      reject('error');
    });
    reader.pipe(writer);
    reader.on('end', () => {
      resolve1('success');
    });
  });
};

export const moveFile = async (source, destination) => {
  const message = await _copyFile(source, destination);
  if (message === 'success') {
    try {
      await rm(source);
    } catch (error) {
      console.log(messages.operationFailed);
    }
  }
};

export const remove = async (path, source) => {
  try {
    await rm(resolve(path, source), { recursive: true });
  } catch (error) {
    console.log(messages.operationFailed);
  }
};
