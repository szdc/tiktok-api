import * as fs from 'fs';
import { getRequestParams } from '../src';
import { MusicallyAPIConfig } from '../src/types';

export const mockParams = getRequestParams({
  device_id: '',
  fp: '',
  iid: '',
  openudid: '',
});

export const mockConfig = {
  signURL: (url: string) => url,
} as MusicallyAPIConfig;

export const loadTestData = (filename: string) => fs.readFileSync(`test/testdata/${filename}`).toString();
