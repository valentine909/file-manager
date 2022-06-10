import { existsSync, createReadStream, accessSync } from 'fs';
import { messages } from './settings.js';
import { writeFile, access } from 'fs/promises';
import { resolve } from 'path';

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
