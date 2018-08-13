import {
  BaseResponseData,
  CountOffsetParams,
  ListRequestParams,
  ListResponseData,
} from './request';
import { CommonUserDetails } from './user';
import { Tag } from './tag';

export interface ListCommentsRequest extends ListRequestParams, CountOffsetParams {
  /** The ID of the post to list comments for */
  aweme_id: string;

  /** ??? - default is 2 */
  comment_style?: number;

  /** ??? */
  digged_cid?: any;

  /** ??? */
  insert_cids?: any;
}

export interface ListCommentsResponse extends ListResponseData, CountOffsetParams {
  comments: Comment[];
}

export interface PostCommentRequest {
  /** The ID of the post to comment on */
  aweme_id: string;

  /** The comment text */
  text: string;

  /** The ID of the comment that is being replied to */
  reply_id?: string;

  /** Details about any tags in the comment */
  text_extra: Tag[];

  /** ??? */
  is_self_see: 0 | 1;
}

export interface PostCommentResponse extends BaseResponseData {
  /** The comment that was posted */
  comment: Comment;
}

export interface Comment {
  /** The ID of the post */
  aweme_id: string;

  /** The ID of the comment */
  cid: string;

  /** The timestamp in seconds when the comment was posted */
  create_time: number;

  /** The number of times the comment has been liked */
  digg_count: number;

  /** If this comment is replying to a comment, this array contains the original comment */
  reply_comment?: Comment[];

  /** If this comment is replying to a comment, the ID of that comment - "0" if not a reply */
  reply_id: string;

  /** The status of the comment - 1 = published, 4 = published by you? */
  status: number;

  /** The comment text */
  text: string;

  /** Details about any tags in the comment */
  text_extra: Tag[];

  /** Details about the author */
  user: CommonUserDetails;

  /** 1 if the user likes the comment */
  user_digged: 0 | 1;
}
