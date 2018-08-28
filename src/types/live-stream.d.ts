import { BaseResponseData } from './request';
import { CommonUserDetails } from './user';

export interface LiveStreamRequest {
  /** The ID of the live stream to join or leave */
  room_id: string;
}

export interface JoinLiveStreamResponse extends BaseResponseData {
  /** Details about the live stream */
  room: LiveStream;
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

    /** The ID used in the stream URL */
    sid: string;
  };

  /** The title of the stream */
  title: string;

  /** The number of users currently in the stream */
  user_count: number;
}
