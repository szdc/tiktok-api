import * as qs from 'qs';
import { ListRequestParams } from './types';

/**
 * A map containing the order of the base query string parameters.
 *
 * @type {Map<string, number>}
 */
export const paramsOrder = [
  'app_language',
  'language',
  'region',
  'sys_region',
  'carrier_region',
  'carrier_region_v2',
  'build_number',
  'timezone_offset',
  'timezone_name',
  'mcc_mnc',
  'is_my_cn',
  'fp',
  'account_region',
  'pass-region',
  'pass-route',
  'iid',
  'device_id',
  'ac',
  'channel',
  'aid',
  'app_name',
  'version_code',
  'version_name',
  'device_platform',
  'ssmix',
  'device_type',
  'device_brand',
  'os_api',
  'os_version',
  'openudid',
  'manifest_version_code',
  'resolution',
  'dpi',
  'update_version_code',
  '_rticket',
  'ts',
  'as',
  'cp',
  'mas',
].reduce((map, param, i) => map.set(param, i), new Map<string, number>());

/**
 * Converts a object of parameters into a query string based on the given order.
 */
export const paramsSerializer = (order: Map<string, number>) => (params: object) => qs.stringify(params, {
  encode: false,
  format: 'RFC1738',
  sort: (a: any, b: any) => {
    const ai = order.get(a);
    const bi = order.get(b);
    return (typeof ai === 'undefined' ? -1 : ai) - (typeof bi === 'undefined' ? -1 : bi);
  },
});

/**
 * Merges default list parameters with an existing parameter object.
 *
 * @param {ListRequestParams} params
 * @returns {object}
 */
export const withDefaultListParams = (params: ListRequestParams) => ({
  count: 20,
  retry_type: 'no_retry',
  ...params,
});
