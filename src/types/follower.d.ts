import { CommonUserDetails } from './user';
import {
  ListRequestParams,
  ListResponseData,
  TimeOffsetRequestParams,
  TimeOffsetResponseParams,
} from './request';

export interface ListFollowersRequest extends ListRequestParams, TimeOffsetRequestParams {
  /** The id of the user whose followers to retrieve */
  user_id: string;
}

export interface ListFollowersResponse extends ListResponseData, TimeOffsetResponseParams {
  followers: CommonUserDetails[];
}
