import { CountOffsetParams, ListRequestParams, ListResponseData } from './request';
import { CommonUserDetails } from './user';

export interface SearchUsersRequest extends ListRequestParams, CountOffsetParams {
  /** The term to search for */
  keyword: string;

  /** The scope of the search - users = 1 */
  type?: number;
}

export interface SearchUsersResponse extends ListResponseData, CountOffsetParams {
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

  /** Details about the user */
  user_info: CommonUserDetails;
}

/**
 * Represents the location of a substring in a string.
 *
 * e.g. For the string "The quick brown fox", the substring "quick" would be:
 * {
 *     begin: 4,
 *     end: 6
 * }
 */
export interface SubstringPosition {
  /** The start index of the substring */
  begin: number;

  /** The end index of the substring */
  end: number;
}
