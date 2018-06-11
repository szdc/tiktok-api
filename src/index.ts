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
      userAgent: `com.zhiliaoapp.musically/${requestParams.manifest_version_code}`
        + ` (Linux; U; Android ${requestParams.os_version}; ${requestParams.language}_${requestParams.region};`
        + ` ${requestParams.device_type}; Build/NHG47Q; Cronet/58.0.2991.0)`,
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
  private addTimestampsToRequest = (config: AxiosRequestConfig): AxiosRequestConfig => ({
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
  device_type: 'Pixel',
  ssmix: 'a',
  manifest_version_code: '2018052132',
  dpi: 420,
  app_name: 'musical_ly',
  version_name: '7.2.0',
  timezone_offset: 37800,
  is_my_cn: false,
  ac: 'wifi',
  update_version_code: '2018052132',
  channel: 'googleplay',
  device_platform: 'android',
  build_number: '7.2.0',
  version_code: 720,
  timezone_name: 'Australia/Lord_Howe',
  account_region: 'AU',
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

export interface MusicallyAPIConfig {
  baseURL: string;
  host: string;
  userAgent: string;
}

export interface RequiredUserDefinedRequestParams {
  /** The 16-character ID of your installation, e.g. 4549764744226841084 */
  iid: string;

  /** A 16-character hexadecimal identifier associated with your device, e.g. 4b903fbb9d457937 */
  openudid: string;

  /** The ID of your device that has already been registered with musical.ly */
  device_id: string;

  /** An anti-fraud fingerprint of your device requested from a different API */
  fp: string;
}

export interface StaticRequestParams extends RequiredUserDefinedRequestParams {
  /** Your Android version, e.g. 23 */
  os_api: string;

  /** Your device model, e.g. Pixel 2 */
  device_type: string;

  /** ??? - set to "a" */
  ssmix: string;

  /** The SS_VERSION_CODE metadata value from the AndroidManifest.xml file, e.g. 2018060103 */
  manifest_version_code: string;

  /** Your device's pixel density, e.g. 480 */
  dpi: number;

  /** The application name - hard-coded to "musical_ly" */
  app_name: string;

  /** The SS_VERSION_NAME metadata value from the AndroidManifest.xml file, e.g. 7.2.0 */
  version_name: string;

  /** The UTC offset in seconds of your timezone, e.g. 37800 for Australia/Lord_Howe */
  timezone_offset: number;

  /** ??? - are we in China / using the Chinese version? Set to 0 */
  is_my_cn: boolean;

  /** Network connection type, e.g. "wifi" */
  ac: string;

  /** The UPDATE_VERSION_CODE metadata value from the AndroidManifest.xml file, e.g. 2018060103 */
  update_version_code: string;

  /** The channel you downloaded the app through, e.g. googleplay */
  channel: string;

  /** Your device's platform, e.g. android */
  device_platform: string;

  /** The build number of the application, e.g. 7.2.0 */
  build_number: string;

  /** A numeric version of the version_name metadata value, e.g. 720 */
  version_code: number;

  /** The name of your timezone as per the tz database, e.g. Australia/Sydney */
  timezone_name: string;

  /**
   * The region of the account you are logging into, e.g. AU.
   *
   * This field is only present if you are logging in from a device that hasn't had a
   * user logged in before.
   */
  account_region: string;

  /** Your device's resolution, e.g. 1080*1920 */
  resolution: string;

  /** Your device's operating system version, e.g. 8.0.0 */
  os_version: string;

  /** Your device's brand, e.g. Google */
  device_brand: string;

  /** ??? - empty */
  mcc_mnc: string;

  /** The application's two-letter language code, e.g. en */
  app_language: string;

  /** Your i18n language, e.g. en */
  language: string;

  /** Your region's i18n locale, e.g. US */
  region: string;

  /** Your device's i18n locale, e.g. US */
  sys_region: string;

  /** Your carrier's region (a two-letter country code), e.g. AU */
  carrier_region: string;

  /** A hard-coded i18n constant set to "1233" */
  aid: string;
}

export interface BaseRequestParams extends StaticRequestParams, AntiSpamParams {
  /** The current timestamp in seconds since UNIX epoch */
  ts: number;

  /** The current timestamp in milliseconds since UNIX epoch */
  _rticket: string;
}

export interface AntiSpamParams {
  /** An anti-spam parameter - not required */
  as?: string;

  /** An anti-spam parameter - not required */
  cp?: string;

  /** An anti-spam parameter - not required */
  mas?: string;
}

export interface LoginParams {
  /** Unsure, but looks to be hard-coded to 1 */
  mix_mode: number;

  /** The unique username ("musername") of the user */
  username: string;

  /** The email address associated with the user account */
  email: string;

  /** The mobile number associated with the user account */
  mobile: string;

  /** ??? */
  account: string;

  /** The password to the user account */
  password: string;

  /** The captcha answer - only required if a captcha was shown */
  captcha: string;

  /** Hard-coded to "normal" */
  app_type: string;
}
