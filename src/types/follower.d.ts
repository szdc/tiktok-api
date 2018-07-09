import { CommonUserDetails } from './user';
import {
  ListRequestParams,
  ListResponseData,
  TimeOffsetRequestParams,
  TimeOffsetResponseParams,
} from './request';

export interface ListFollowerRequest extends ListRequestParams, TimeOffsetRequestParams {
  /** The id of the user whose followers to retrieve */
  user_id: string;
}

export interface ListFollowerResponse extends ListResponseData, TimeOffsetResponseParams {
  followers: CommonUserDetails[];
}
