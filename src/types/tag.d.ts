/**
 * Represents a text link to a user, e.g. "@username" in a comment
 */
export interface Tag {
  /** The type of user being tagged? */
  at_user_type: string;

  /** The zero-based index in the text where the tag starts */
  end: number;

  /** The zero-based index in the text where the tag ends */
  start: number;

  /** The type of tag? */
  type: number;

  /** The ID of the user being tagged */
  user_id: string;
}
