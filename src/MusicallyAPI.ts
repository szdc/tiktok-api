import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { encryptWithXOR } from './cryptography';

export default class MusicallyAPI {
  private request: AxiosInstance;

  /**
   * Creates a new API instance.
   *
   * @param {StaticRequestParams} requestParams
   * @param {MusicallyAPIConfig} apiConfig
   */
  constructor(requestParams: StaticRequestParams, apiConfig?: MusicallyAPIConfig) {
    const config = {
      baseURL: 'https://api2.musical.ly/',
      host: 'api2.musical.ly',
      userAgent: 'com.zhiliaoapp.musically/2018052132 (Linux; U; Android 6.0.1; en_US; MI 3W; ' +
        'Build/MMB29M; Cronet/58.0.2991.0)',
      ...apiConfig,
    } as MusicallyAPIConfig;

    this.request = axios.create({
      baseURL: config.baseURL,
      headers: {
        host: config.host,
        connection: 'keep-alive',
        'accept-encoding': 'gzip',
        'user-agent': config.userAgent,
      } as AxiosRequestConfig,
      params: requestParams,
    });
    this.request.interceptors.request.use(this.addTimestampsToRequest);
  }

  /**
   * Logs into musical.ly using an email and password.
   *
   * @param {string} email
   * @param {string} password
   * @returns {AxiosPromise}
   */
  loginWithEmail = (email: string, password: string) => this.login({
    mix_mode: 1,
    username: '',
    email: encryptWithXOR(email),
    mobile: '',
    account: '',
    password: encryptWithXOR(password),
    captcha: '',
    app_type: 'musical_ly',
  })

  /**
   * Logs into musical.ly.
   *
   * @param {LoginParams} params
   * @returns {AxiosPromise}
   */
  login = (params: LoginParams) => this.request.post('passport/user/login', null, { params });

  /**
   * Adds timestamp query string parameters to requests.
   *
   * @param {AxiosRequestConfig} config
   * @returns {AxiosRequestConfig}
   */
  addTimestampsToRequest = (config: AxiosRequestConfig): AxiosRequestConfig => ({
    ...config,
    params: {
      ts: Math.floor((new Date()).getTime() / 1000),
      _rticket: (new Date()).getTime(),
      ...config.params,
    },
  })
}

/**
 * Merges required user-defined parameters with default parameters.
 *
 * @param {RequiredUserDefinedRequestParams} requestParams
 * @returns {StaticRequestParams}
 */
export const getRequestParams = (requestParams: RequiredUserDefinedRequestParams): StaticRequestParams => ({
  os_api: '23',
  device_type: 'Pixel 2',
  ssmix: 'a',
  manifest_version_code: '2018052132',
  dpi: 480,
  app_name: 'musical_ly',
  version_name: '7.2.0',
  timezone_offset: 37800,
  is_my_cn: false,
  fp: '',
  ac: 'wifi',
  update_version_code: '2018052132',
  channel: 'googleplay',
  device_platform: 'android',
  build_number: '7.2.0',
  version_code: 720,
  timezone_name: 'Australia/Lord_Howe',
  account_region: 'AU',
  resolution: '1080*1920',
  os_version: '8.0.0',
  device_brand: 'Google',
  mcc_mnc: '',
  app_language: 'en',
  language: 'en',
  region: 'US',
  sys_region: 'US',
  carrier_region: 'AU',
  aid: '1233',
  ...requestParams,
});
