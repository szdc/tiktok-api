import { Post } from './post';
import { CommonUserDetails } from './user';
import {
  CountOffsetParams,
  ListRequestParams,
  ListResponseData
} from './request';

export interface ListCategoriesRequest extends ListRequestParams, CountOffsetParams {}

export interface ListCategoriesResponse extends ListResponseData, CountOffsetParams {
  /** A list of categories */
  category_list: Category[];
}

export interface Category {
  /** A list of posts in the category */
  aweme_list: Post[];

  /** The type of category - 0 for hashtag? */
  category_type: number;

  /** Information about the category */
  challenge_info: ChallengeInfo;

  /** A description of the category type, e.g. "Trending Hashtag" */
  desc: string;
}

export interface ChallengeInfo {
  /** The user who created the challenge, or an empty object */
  author: CommonUserDetails | {};

  /** The name of the challenge */
  cha_name: string;

  /** The ID of the challenge */
  cid: string;

  /** A description of the challenge */
  desc: string;

  /** ??? */
  is_pgcshow: boolean;

  /** An in-app link to the challenge */
  schema: string;

  /** The type of challenge - 0 for hashtag? */
  type: number;

  /** The number of users who have uploaded a video for the challenge */
  user_count: number;
}
