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
  /** A list of the user's followers */
  followers: CommonUserDetails[];
}

export interface ListFollowingRequest extends ListRequestParams, TimeOffsetRequestParams {
  /** The id of the user whose followers to retrieve */
  user_id: string;
}

export interface ListFollowingResponse extends ListResponseData, TimeOffsetResponseParams {
  /** A list of users the user is following */
  followings: CommonUserDetails[];
}
