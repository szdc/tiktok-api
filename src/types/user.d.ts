import { BaseResponseData, Media } from './request';

export interface UserProfileResponse extends BaseResponseData {
  user: UserProfile;
}

export interface UserProfile extends CommonUserDetails {
  /** The number of videos the user has uploaded */
  aweme_count: number;

  /** The number of videos the user has liked */
  favoriting_count: number;

  /** The number of users who follow this user */
  follower_count: number;

  /** The number of users this user follows */
  following_count: number;

  /** The total number of likes the user has received */
  total_favorited: number;
}

export interface CommonUserDetails {
  /** A large version of the user's avatar */
  avatar_larger: Media;

  /** A medium version of the user's avatar */
  avatar_medium: Media;

  /** A thumbnail version of the user's avatar */
  avatar_thumb: Media;

  /** The timestamp in seconds when the user's account was created */
  create_time: number;

  /** The badge name with a verified user (e.g. comedian, style guru) */
  custom_verify: string;

  /** 1 if you follow this user */
  follow_status: number;

  /** 1 if this user follows you */
  follower_status: number;

  /** The user's Instagram handle */
  ins_id: string;

  /** Indicates if the user has been crowned */
  is_verified: boolean;

  /** The user's profile name */
  nickname: string;

  /** A 2-letter country code representing the user's region, e.g. US */
  region: string;

  /** If the user is live, a string ID used to join their stream, else 0 */
  room_id: string|number;

  /** 1 if the user's profile is set to private */
  secret: number;

  /** The user's profile signature */
  signature: string;

  /** The user's Twitter handle */
  twitter_id: string;

  /** The user's ID */
  uid: string;

  /** The user's musername */
  unique_id: string;

  /** 1 if the user has been crowned */
  verification_type: number;

  /** The user's YouTube channel ID */
  youtube_channel_id: string;
}
