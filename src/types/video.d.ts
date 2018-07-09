import { Media } from './request';

export interface Video {
  /** A medium version of the video's cover image */
  cover: Media;

  /** A high-quality link to download the video */
  download_addr: Media;

  /** The video's duration in milliseconds */
  duration: number;

  /** Whether the download link has a watermark */
  has_watermark: boolean;

  /** The video's height, e.g. 960 */
  height: number;

  /** A high-quality version of the video's cover image */
  origin_cover: Media;

  /** The quality of the video, e.g. 720p */
  ratio: string;

  /** The video's width, e.g. 540 */
  width: number;
}
