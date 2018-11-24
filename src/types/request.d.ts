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
  is_my_cn: number;

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
  account_region?: string;

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

  /** You carrer's mobile country code (MCC), e.g. 505 */
  carrier_region_v2: string;

  /** A hard-coded i18n constant set to "1233" */
  aid: string;

  /** ??? - set to 1 */
  'pass-region': number;

  /** ??? - set to 1 */
  'pass-route': number;
}

export interface BaseRequestParams extends StaticRequestParams, AntiSpamParams {
  /** The current timestamp in seconds since UNIX epoch */
  ts: number;

  /** The current timestamp in milliseconds since UNIX epoch */
  _rticket: string;
}

export interface AntiSpamParams {
  /** A 20-character anti-spam parameter */
  as: string;

  /** A 20-character anti-spam parameter */
  cp: string;

  /** An encoded version of the 'as' anti-spam parameter */
  mas: string;
}

export interface ListRequestParams {
  /** The number of results to return */
  count: number;

  /** How the request will be retried on failure - defaults to "no_retry" */
  retry_type?: string;
}

export interface ListResponseData extends BaseResponseData {
  /** Whether there are more results that can be requested */
  has_more: boolean | 0 | 1;

  /** The total number of results returned - not present in all list requests */
  total?: number;
}

export interface TimeOffsetRequestParams {
  /**
   * A timestamp in seconds - the most recent results before this time will be listed.
   * Use min_time from the response data here for pagination.
   */
  max_time: number;
}

export interface TimeOffsetResponseParams {
  /** The timestamp in seconds associated with the first result */
  max_time: number;

  /** The timestamp in seconds associated with the last result - use as max_time for pagination */
  min_time: number;
}

export interface CursorOffsetRequestParams {
  /**
   * A timestamp in milliseconds - the most recent results before this time will be listed.
   * Use max_cursor from the response data here for pagination. Use 0 for the most recent.
   */
  max_cursor: number;
}

export interface CursorOffsetResponseParams {
  /** The timestamp in milliseconds associated with the first result */
  min_cursor: number;

  /** The timestamp in milliseconds associated with the last result - use for pagination */
  max_cursor: number;
}

export interface CountOffsetParams {
  /** The number of results to skip */
  cursor: number;
}

export interface BaseResponseData {
  extra: {
    /** ??? */
    fatal_item_ids?: number[];

    /** A log ID for this request */
    logid?: string;

    /** The current timestamp in milliseconds */
    now: number;
  };

  /** 0 if the request was successful */
  status_code: number;
}

export interface Media {
  /** A list of HTTP URLs to this media */
  url_list: string[];
}
