import { CommonUserDetails } from './user';
import {
  CursorOffsetRequestParams,
  CursorOffsetResponseParams,
  ListRequestParams,
  ListResponseData,
} from './request';
import { MusicTrack } from './music';
import { Video } from './video';

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

  /** An age rating for the post */
  rate: string;

  /** The 2-letter region the post was created in, e.g. US */
  region: string;

  /** A link to the video on the musical.ly website that is used when sharing */
  share_url: string;

  /** Statistics about the post */
  statistics: PostStatistics;

  /** Status information about the post */
  status: PostStatus;

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

  /** The number of times the post has been viewed - doesn't appear to be public, so always 0 */
  play_count: number;

  /** The number of times the post has been shared */
  share_count: number;
}

export interface PostStatus {
  /** Whether the post allows comments */
  allow_comment: boolean;

  /** Whether the post allows sharing */
  allow_share: boolean;

  /** Whether the post has been deleted */
  is_delete: boolean;

  /** Whether the post is private */
  is_private: boolean;
}

export interface PostTags {
  /** 0 if the tag is for a user; 1 if the tag is for a hashtag */
  type: number;

  /** The name of the hashtag */
  hashtag_name?: string;

  /** The ID of the tagged user */
  user_id?: string;
}
