import { ListRequestParams, ListResponseData, Media } from './request';

export interface ListFollowerRequest extends ListRequestParams {
  /** The id of the user whose followers to retrieve */
  user_id: string;
}

export interface ListFollowerResponse extends ListResponseData {
  followers: {
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
  }[];
}
