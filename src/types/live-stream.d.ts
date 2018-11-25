import { BaseResponseData } from './request';
import { CommonUserDetails } from './user';
import { LiveStreamStatus, LiveStreamStatusChangedReason } from '../live-stream';

export interface LiveStreamRequest {
  /** The ID of the live stream to join or leave */
  room_id: string;
}

export interface JoinLiveStreamResponse extends BaseResponseData {
  /** Details about the live stream */
  room: LiveStream;
}

export interface CanStartLiveStreamResponse extends BaseResponseData {
  /** True if your account can start a live stream */
  can_be_live_podcast: boolean;
}

export interface CreateLiveStreamRoomRequest {
  /** The name of the live stream */
  title: string;

  /** 1 if the user has given the app permission to read their contacts */
  contacts_authorized: 0 | 1;
}

export interface CreateLiveStreamRoomResponse extends BaseResponseData {
  room: LiveStream;
}

export interface UpdateLiveStreamStatusRequest {
  /** The ID of the stream */
  room_id: string;

  /** The ID used in the stream URL */
  stream_id: string;

  /** The status to update to */
  status: LiveStreamStatus;

  /** Why the status is being updated */
  reason_no: LiveStreamStatusChangedReason;
}

export interface UpdateLiveStreamStatusResponse extends BaseResponseData {
}

export interface LiveStream {
  /** The timestamp in seconds when the stream was created */
  create_time: number;

  /** The timestamp in seconds when this request was processed */
  finish_time: number;

  /** Details about the user hosting the stream */
  owner: CommonUserDetails;

  /** The ID of the stream */
  room_id: string;

  /** ??? */
  status: number;

  /** The ID used in the stream URL */
  stream_id: string;

  /** Contains a link to the stream */
  stream_url: {
    /** A link to the stream source */
    rtmp_pull_url: string;

    /** A link used to publish to the stream (only present if you own the live stream) */
    rtmp_push_url?: string;

    /** The ID used in the stream URL */
    sid: string;
  };

  /** The title of the stream */
  title: string;

  /** The number of users currently in the stream */
  user_count: number;
}
