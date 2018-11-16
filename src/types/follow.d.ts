import { CommonUserDetails } from './user';
import {
  BaseResponseData,
  ListRequestParams,
  ListResponseData,
  TimeOffsetRequestParams,
  TimeOffsetResponseParams,
} from './request';

export interface FollowRequest extends BaseResponseData {
  /** The id of the user to follow */
  user_id: string;

  /** 0 to unfollow, 1 to follow */
  type: 0 | 1;
}

export interface FollowResponse extends BaseResponseData {
  /** 0 if not following, 1 if following */
  follow_status: 0 | 1;

  /** 0 if not watching, 1 if watching */
  watch_status: 0 | 1;
}

export interface ListReceivedFollowRequestsRequest extends ListRequestParams, TimeOffsetRequestParams {
}

export interface ListReceivedFollowRequestsResponse extends ListResponseData, TimeOffsetResponseParams {
  /** A list of users who have requested to follow you */
  request_users: CommonUserDetails[];
}

export interface ApproveFollowRequest {
  /** The id of the user to approve */
  from_user_id: string;
}

export interface ApproveFollowResponse extends BaseResponseData {
  /** 0 if the user was successfully approved */
  approve_status: number;
}

export interface RejectFollowRequest {
  /** The id of the user to reject */
  from_user_id: string;
}

export interface RejectFollowResponse extends BaseResponseData {
  /** 0 if the user was successfully rejected */
  reject_status: number;
}
