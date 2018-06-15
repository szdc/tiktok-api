import * as fs from 'fs';
import { getRequestParams } from '../src';

export const mockParams = getRequestParams({
  device_id: '',
  fp: '',
  iid: '',
  openudid: '',
});

export const loadTestData = (filename: string) => fs.readFileSync(`test/testdata/${filename}`).toString();
