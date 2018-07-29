import { BaseResponseData } from './request';

export interface LikePostRequest extends BaseResponseData {
  /** The id of the post to like */
  aweme_id: string;

  /** 0 to unlike, 1 to like */
  type: 0 | 1;
}

export interface LikePostResponse extends BaseResponseData {
  /**
   * 0 if liked, 1 if not liked
   *
   * Note: for some reason, this value is the opposite of what you would expect
   */
  is_digg: 0 | 1;
}
