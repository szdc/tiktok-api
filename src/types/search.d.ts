import { ChallengeInfo } from './category';
import { CountOffsetParams, ListRequestParams, ListResponseData } from './request';
import { CommonUserDetails } from './user';

export interface SearchRequest extends ListRequestParams, CountOffsetParams {
  /** The term to search for */
  keyword: string;
}

export interface UserSearchRequest extends SearchRequest {
  /** Required - the scope of the search - users = 1. */
  type?: number;
}

export interface UserSearchResponse extends ListResponseData, CountOffsetParams {
  /** A list of users that match the search term */
  user_list: UserSearchResult[];

  /** The scope of the search - users = 1 */
  type: number;
}

export interface UserSearchResult {
  /** If the user's nickname contains the search term, this array contains the location of the term */
  position: SubstringPosition[];

  /** If the user's username (unique_id) contains the search term, this array contains the location of the term */
  uniqid_position: SubstringPosition[];

  /** Information about the user */
  user_info: CommonUserDetails;
}

export interface HashtagSearchResponse extends ListResponseData, CountOffsetParams {
  /** A list of hashtags that match the search term */
  challenge_list: HashtagSearchResult[];

  /** True if a challenge matches the search term */
  is_match: boolean;

  /** 1 if the search term is disabled */
  keyword_disabled: 0 | 1;
}

export interface HashtagSearchResult {
  /** Information about the hashtag */
  challenge_info: ChallengeInfo;

  /** If the hashtag contains the search term, this array contains the location of the term */
  position: SubstringPosition[];
}

/**
 * Represents the location of a substring in a string.
 *
 * e.g. For the string "The quick brown fox", the substring "quick" would be:
 * {
 *     begin: 4,
 *     end: 8
 * }
 */
export interface SubstringPosition {
  /** The start index of the substring */
  begin: number;

  /** The end index of the substring */
  end: number;
}
