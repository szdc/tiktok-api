import { BaseResponseData } from './request';

export interface QRCodeRequest {
  /** The internal version to use; currently 4 */
  schema_type: number;

  /** The ID of the user to get a QR code for */
  object_id: string;
}

export interface QRCodeResponse extends BaseResponseData {
  /** Contains a link to the QR code */
  qrcode_url: {
    /** An in-app link to the QR code */
    uri: string;

    /** Contains a public link to the QR code image (first element in array) */
    url_list: string[];
  };
}
