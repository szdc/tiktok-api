import * as fs from 'fs';
import { getRequestParams } from '../src';
import { TikTokAPIConfig } from '../src/types';

export const mockParams = getRequestParams({
  device_id: '',
  fp: '',
  iid: '',
  openudid: '',
});

export const mockConfig = {
  signURL: (url: string) => url,
} as TikTokAPIConfig;

export const loadTestData = (filename: string) => fs.readFileSync(`test/testdata/${filename}`).toString();
