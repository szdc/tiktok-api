export interface TikTokAPIConfig {
  baseURL?: string;
  host?: string;
  signURL: (url: string, ts: number, deviceId: string) => Promise<string> | string;
  userAgent?: string;
}
