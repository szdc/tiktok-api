interface LoginParams {
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
