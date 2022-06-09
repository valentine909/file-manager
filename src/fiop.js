import { settings } from './settings.js';
import { dirname } from 'path';
import { readdir } from 'fs';

export const goUp = (path) => {
  return dirname(path);
};

export const listDirectory = (path) => {
  return readdir(path);
};
