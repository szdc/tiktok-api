import {
  CountOffsetParams,
  ListRequestParams,
  ListResponseData,
} from './request';
import { Post } from './post';

export interface ListPostsInHashtagRequest extends ListRequestParams, CountOffsetParams {
  /** The ID of the hashtag */
  ch_id: string;

  /** ??? - set to 0 */
  query_type: number;

  /** ??? - set to 5 */
  type: number;
}

export interface ListPostsInHashtagResponse extends ListResponseData, CountOffsetParams {
  /** A list of posts containing the hashtag */
  aweme_list: Post[];
}
