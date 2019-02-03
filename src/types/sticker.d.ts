import {
  BaseResponseData,
  Media,
} from './request';

export interface GetStickersRequest {
  /** A list of sticker ids to get information about */
  sticker_ids: string;
}

export interface GetStickersResponse extends BaseResponseData {
  sticker_infos: Sticker[];
}

export interface Sticker {
  /** ??? */
  children: [];

  /** A description of the sticker */
  desc: string;

  /** The ID of the sticker */
  effect_id: string;

  /** The icon associated with the sticker */
  icon_url: Media;

  /** The ID of the sticker */
  id: string;

  /** True if the current user has favorited the sticker */
  is_favorite: boolean;

  /** The name of the sticker */
  name: string;

  /** The ID the user that owns the sticker (empty if owned by the Effect Assistant) */
  owner_id: string;

  /** The nickname of the owner, e.g. "Effect Assistant" */
  owner_nickname: string;

  /** ??? */
  tags: any[];

  /** The total number of posts using this sticker */
  user_count: number;
}
