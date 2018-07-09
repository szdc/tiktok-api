import { Media } from './request';

export interface MusicTrack {
  /** The name of the musician */
  author: string;

  /** A HD version of the music's cover art */
  cover_hd: Media;

  /** A large version of the music's cover art */
  cover_large: Media;

  /** A medium version of the music's cover art */
  cover_medium: Media;

  /** A thumbnail version of the music's cover art */
  cover_thumb: Media;

  /** The duration of the track */
  duration: number;

  /** The ID of the track */
  id: string;

  /** The handle of the owner of the track */
  owner_handle: string;

  /** The ID of the owner of the track */
  owner_id: string;

  /** The nickname of the owner of the track */
  owner_nickname: string;

  /** The link to play this track */
  play_url: Media;

  /** The title of this track */
  title: string;

  /** The number of posts that use this track */
  user_count: number;
}
