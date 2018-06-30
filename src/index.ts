import axiosCookieJarSupport from 'axios-cookiejar-support';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import * as JSONBig from 'json-bigint';
import { CookieJar } from 'tough-cookie';

import { encryptWithXOR } from './cryptography';
import {
  BaseResponseData,
  ListFollowerRequest,
  ListFollowerResponse,
  LoginRequest,
  LoginResponse,
  MusicallyAPIConfig,
  RequiredUserDefinedRequestParams,
  StaticRequestParams,
} from './types';
import {
  paramsOrder,
  paramsSerializer,
  withDefaultListParams,
} from './params';

export default class MusicallyAPI {
  readonly config: MusicallyAPIConfig;
  readonly cookieJar: CookieJar;
  readonly request: AxiosInstance;

  /**
   * Creates a new API instance.
   *
   * @param {StaticRequestParams} requestParams
   * @param {MusicallyAPIConfig} apiConfig
   * @param {AxiosRequestConfig} requestConfig
   */
  constructor(requestParams: StaticRequestParams, apiConfig: MusicallyAPIConfig, requestConfig?: AxiosRequestConfig) {
    if (typeof apiConfig.signURL !== 'function') {
      throw new Error('You must supply a signURL function to the MusicallyAPI config');
    }

    this.config = {
      baseURL: 'https://api2.musical.ly/',
      host: 'api2.musical.ly',
      userAgent: `com.zhiliaoapp.musically/${requestParams.manifest_version_code}`
        + ` (Linux; U; Android ${requestParams.os_version}; ${requestParams.language}_${requestParams.region};`
        + ` ${requestParams.device_type}; Build/NHG47Q; Cronet/58.0.2991.0)`,
      ...apiConfig,
    } as MusicallyAPIConfig;

    this.cookieJar = new CookieJar();
    this.request = axios.create({
      paramsSerializer: paramsSerializer(paramsOrder),
      baseURL: this.config.baseURL,
      headers: {
        host: this.config.host,
        connection: 'keep-alive',
        'accept-encoding': 'gzip',
        'user-agent': this.config.userAgent,
      },
      jar: this.cookieJar,
      params: requestParams,
      transformResponse: this.transformResponse,
      withCredentials: true,
      ...requestConfig,
    } as AxiosRequestConfig);
    axiosCookieJarSupport(this.request);

    this.request.interceptors.request.use(this.signRequest);
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
   * @param {LoginRequest} params
   * @returns {AxiosPromise<LoginResponse>}
   */
  login = (params: LoginRequest) =>
    this.request.post<LoginResponse>('passport/user/login/', null, { params })

  /**
   * Lists a user's followers.
   *
   * @param {ListFollowerRequest} params
   * @returns {AxiosPromise<ListFollowerResponse | BaseResponseData>}
   */
  listFollowers = (params: ListFollowerRequest) =>
    this.request.get<ListFollowerResponse | BaseResponseData>('aweme/v1/user/follower/list/', {
      params: withDefaultListParams(params),
    })

  /**
   * Transform using JSONBig to store big numbers accurately (e.g. user IDs) as strings.
   *
   * @param {any} data
   * @returns {any}
   */
  transformResponse = (data: any) => {
    if (!data || !data.length) {
      return data;
    }
    return JSONBig({ storeAsString: true }).parse(data);
  }

  /**
   * Adds timestamps and calls out to an external method to sign the URL.
   *
   * @param {AxiosRequestConfig} config
   * @returns {Promise<AxiosRequestConfig>}
   */
  private signRequest = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    if (typeof config.paramsSerializer !== 'function') {
      throw new Error('Missing required paramsSerializer function');
    }

    const ts = Math.floor((new Date()).getTime() / 1000);
    const params = {
      ...config.params,
      ts,
      _rticket: new Date().getTime(),
    };

    const url = `${config.baseURL}${config.url}?${config.paramsSerializer(params)}`;
    const signedURL = await this.config.signURL(url, ts, this.request.defaults.params.device_id);

    return {
      ...config,
      url: signedURL,
      params: {},
    };
  }
}

/**
 * Merges required user-defined parameters with default parameters.
 *
 * @param {RequiredUserDefinedRequestParams} requestParams
 * @returns {StaticRequestParams}
 */
export const getRequestParams = (requestParams: RequiredUserDefinedRequestParams): StaticRequestParams => ({
  os_api: '23',
  device_type: 'Pixel',
  ssmix: 'a',
  manifest_version_code: '2018052132',
  dpi: 420,
  app_name: 'musical_ly',
  version_name: '7.2.0',
  timezone_offset: 37800,
  is_my_cn: 0,
  ac: 'wifi',
  update_version_code: '2018052132',
  channel: 'googleplay',
  device_platform: 'android',
  build_number: '7.2.0',
  version_code: 720,
  timezone_name: 'Australia/Lord_Howe',
  resolution: '1080*1920',
  os_version: '7.1.2',
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

export * from './types';
