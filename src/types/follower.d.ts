import { ListRequestParams, ListResponseData } from './request';
import { CommonUserDetails } from './user';

export interface ListFollowerRequest extends ListRequestParams {
  /** The id of the user whose followers to retrieve */
  user_id: string;
}

export interface ListFollowerResponse extends ListResponseData {
  followers: CommonUserDetails[];
}
