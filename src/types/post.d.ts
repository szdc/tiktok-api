import { CommonUserDetails } from './user';
import {
  BaseResponseData,
  CursorOffsetRequestParams,
  CursorOffsetResponseParams,
  ListRequestParams,
  ListResponseData,
} from './request';
import { MusicTrack } from './music';
import { Video } from './video';

export interface GetPostResponse extends BaseResponseData {
  aweme_detail: Post;
}

export interface ListPostsRequest extends ListRequestParams, CursorOffsetRequestParams {
  /** The id of the user whose posts to retrieve */
  user_id: string;
}

export interface ListPostsResponse extends ListResponseData, CursorOffsetResponseParams {
  aweme_list: Post[];
}

export interface Post {
  /** Details about the author */
  author: CommonUserDetails;

  /** The ID of the author */
  author_user_id: string;

  /** The ID of the post */
  aweme_id: string;

  /** The type of post - 0 for a musical.ly */
  aweme_type: number;

  /** The timestamp in seconds when the post was created */
  create_time: number;

  /** A description of the post */
  desc: string;

  /** Details about the music used in the post */
  music: MusicTrack;

  /** True if the end user should not be provided the option to download the video */
  prevent_download: boolean;

  /** An age rating for the post, e.g. 12 */
  rate: number;

  /** The 2-letter region the post was created in, e.g. US */
  region: string;

  /** Risk information about the post */
  risk_infos: RiskInfo;

  /** Information used when sharing the post */
  share_info: ShareInfo;

  /** A link to the video on the musical.ly website that is used when sharing */
  share_url: string;

  /** Statistics about the post */
  statistics: PostStatistics;

  /** Status information about the post */
  status: PostStatus;

  /** Information about the sticker used in the post */
  sticker_detail: StickerInfo;

  /** The ID of the sticker used in the post (looks to be deprecated by sticker_detail) */
  stickers: string;

  /** Tagged users and hashtags used in the description */
  text_extra: PostTags[];

  /** 1 if the logged in user has liked this post */
  user_digged: number;

  /** Details about the video in the post */
  video: Video;
}

export interface PostStatistics {
  /** The ID of the post */
  aweme_id: string;

  /** The number of comments on the post */
  comment_count: number;

  /** The number of times the post has been liked */
  digg_count: number;

  /** The number of times the post has been forwarded (looks unused?) */
  forward_count: number;

  /** The number of times the post has been viewed - doesn't appear to be public, so always 0 */
  play_count: number;

  /** The number of times the post has been shared */
  share_count: number;
}

export interface PostStatus {
  /** True if the post allows comments */
  allow_comment: boolean;

  /** True if the post allows sharing */
  allow_share: boolean;

  /** 0 if the post can be downloaded */
  download_status: 0 | 1;

  /** True if the post is currently being reviewed */
  in_reviewing: boolean;

  /** True if the post has been deleted */
  is_delete: boolean;

  /** True if the post is private */
  is_private: boolean;

  /** True if the post contains content that is not allowed on the platform */
  is_prohibited: boolean;

  /** 0 if the post is public */
  private_status: 0 | 1;

  /** 1 if the post has been reviewed */
  reviewed: 0 | 1;
}

export interface PostTags {
  /** 0 if the tag is for a user; 1 if the tag is for a hashtag */
  type: number;

  /** The name of the hashtag */
  hashtag_name?: string;

  /** The ID of the tagged user */
  user_id?: string;
}

export interface RiskInfo {
  /** The text shown if the post has been flagged */
  content: string;

  /** ??? */
  risk_sink: false;

  /** The risk type associated with the post - 0 if no risk; 1 if low; 2 if high */
  type: number;

  /** ??? - only present if the post has been flagged */
  vote?: boolean;

  /** True if a warning should be shown to the user */
  warn: boolean;
}

export interface ShareInfo {
  /** ??? */
  bool_persist: number;

  /** The description used when sharing (if set) */
  share_desc: string;

  /** The description used when sharing a link only (if set) */
  share_link_desc: string;

  /** The quote used when sharing (if set) */
  share_quote: string;

  /** The signature used when sharing (if set) */
  share_signature_desc: string;

  /** The signature URL used when sharing (if set) */
  share_signature_url: string;

  /** The title used when sharing */
  share_title: string;

  /** The link to share */
  share_url: string;

  /** The description used when sharing on Weibo */
  share_weibo_desc: string;
}

export interface StickerInfo {
  /** The ID of the sticker, e.g. 22094 */
  id: string;

  /** The display name of the sticker, e.g. Long Face */
  name: string;
}
