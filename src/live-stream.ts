export enum LiveStreamStatus {
  Created = 1,
  Started = 2,
  Ended = 4,
}

export enum LiveStreamStatusChangedReason {
  InitiatedByApp = 0,
  InitiatedByUser = 1,
}
