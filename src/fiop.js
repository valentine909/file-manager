import { existsSync, createReadStream } from 'fs';
import { messages } from './settings.js';

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
