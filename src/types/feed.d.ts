import {
  CursorOffsetRequestParams,
  CursorOffsetResponseParams,
  ListRequestParams,
  ListResponseData,
} from './request';
import { Post } from './post';
import { FeedType, PullType } from '../feed';

export interface ListFeedRequest extends ListRequestParams, CursorOffsetRequestParams {
  /** The type of feed to load */
  type: FeedType;

  /** Your device's current volume level on a scale of 0 to 1, e.g. 0.5 */
  volume: number;

  /** How the feed was requested */
  pull_type: PullType;

  /** ??? - empty */
  req_from?: string;

  /** ??? - 0 */
  is_cold_start?: 0 | 1;

  /** ??? */
  gaid?: string;

  /** A user agent for your device */
  ad_user_agent?: string;
}

export interface ListFeedResponse extends ListResponseData, CursorOffsetResponseParams {
  /** A list of posts in the feed */
  aweme_list: Post[];
}

export interface ListForYouFeedResponse extends ListFeedResponse {
  /** ??? - 1 */
  home_model: number;

  /** ??? - 1 */
  refresh_clear: number;
}
