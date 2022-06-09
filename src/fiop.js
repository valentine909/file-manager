import { dirname } from 'path';
import { readdir } from 'fs/promises';

export const goUp = (path) => {
  return dirname(path);
};

export const listDirectory = async (path) => {
  (await readdir(path, { withFileTypes: true })).map((file) =>
    console.log(file.name)
  );
};
