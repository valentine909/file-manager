import { createReadStream } from 'fs';
import crypto from 'crypto';
import { messages } from './settings.js';
import { resolve } from 'path';

export const calculateHash = async (path, name) => {
  return new Promise((resolve1) => {
    const file = resolve(path, name);
    const stream = createReadStream(file);
    const hash = crypto.createHash('sha256');
    stream.on('error', () => {
      console.log(messages.operationFailed);
      resolve1();
    });
    stream.on('data', (chunk) => {
      hash.update(chunk);
    });
    stream.on('end', () => {
      console.log(messages.hash, hash.digest('hex'));
      resolve1();
    });
  });
};
