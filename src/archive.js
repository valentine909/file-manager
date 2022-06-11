import { createReadStream, createWriteStream } from 'fs';
import { resolve, basename } from 'path';
import { messages } from './settings.js';
import * as zlib from 'zlib';

export const fileArchiver = async (
  path,
  source,
  destination,
  compress = true
) => {
  return new Promise((resolve1) => {
    const sourceFile = resolve(path, source);
    const targetFileName = compress
      ? basename(sourceFile) + '.br'
      : basename(sourceFile).split('.').slice(0, -1).join('.');
    const reader = createReadStream(sourceFile);
    const writer = createWriteStream(resolve(destination, targetFileName));
    const brotli = compress
      ? zlib.createBrotliCompress()
      : zlib.createBrotliDecompress();
    reader.pipe(brotli).pipe(writer);
    reader.on('error', () => {
      console.log(messages.operationFailed);
      resolve1();
    });
    writer.on('error', () => {
      console.log(messages.operationFailed);
      resolve1();
    });
    reader.on('end', () => {
      resolve1();
    });
    brotli.on('error', () => {
      console.log(messages.operationFailed);
      resolve1();
    });
  });
};
