export interface LoginRequest {
  /** Unsure, but looks to be hard-coded to 1 */
  mix_mode?: number;

  /** The unique username ("musername") of the user */
  username?: string;

  /** The email address associated with the user account */
  email?: string;

  /** The mobile number associated with the user account */
  mobile?: string;

  /** ??? */
  account?: string;

  /** The password to the user account */
  password?: string;

  /** The captcha answer - only required if a captcha was shown */
  captcha?: string;
}

export interface LoginResponse {
  data: LoginSuccessData | LoginErrorData;

  /** A message indicating whether the request was successful or not */
  message: string;
}

export interface LoginSuccessData {
  /** ??? */
  area: string;

  /** The URL of the user's avatar */
  avatar_url: string;

  /** ??? */
  bg_img_url: string;

  /** The user's birthday */
  birthday: string;

  /** If the user allows people to find them by their phone number */
  can_be_found_by_phone: number;

  /** ??? */
  connects: any[];

  /** ??? */
  description: string;

  /** The email address associated with the account */
  email: string;

  /** The number of users that follow the user */
  followers_count: 0;

  /** The number of users the user is following */
  followings_count: 0;

  /** An integer representing the gender of the user */
  gender: number;

  /** ??? */
  industry: string;

  /** Indicates if the user account is blocked */
  is_blocked: number;

  /** ??? */
  is_blocking: number;

  /** ??? */
  is_recommend_allowed: number;

  /** ??? */
  media_id: number;

  /** The mobile number of the user */
  mobile: string;

  /** The name of the user - does not appear to be used */
  name: string;

  /** Indicates if the user is new or not */
  new_user: number;

  /** A Chinese character hint */
  recommend_hint_message: string;

  /** The screen name of the user - does not appear to be used */
  screen_name: string;

  /** The session ID used to authenticate subsequent requests in the sessionid cookie */
  session_key: string;

  /** ??? */
  skip_edit_profile: number;

  /** ??? */
  user_auth_info: string;

  /** The ID of the user */
  user_id: string;

  /** If the user is verified or not */
  user_verified: boolean;

  /** ??? */
  verified_agency: string;

  /** ??? */
  verified_content: string;

  /** The number of users that have visited the user's profile recently */
  visit_count_recent: number;
}

export interface LoginErrorData {
  /** If required, the captcha that must solved */
  captcha: string;

  /** A message explaining why the request failed */
  description: string;

  /** An error code */
  error_code: number;
}
