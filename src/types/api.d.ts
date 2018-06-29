export interface MusicallyAPIConfig {
  baseURL?: string;
  host?: string;
  signURL: (url: string, ts: number, deviceId: string) => Promise<string> | string;
  userAgent?: string;
}
