export enum FeedType {
  ForYou,
  Following,
}

export enum PullType {
  /** The feed was loaded by default, e.g. by clicking the tab or loading the app */
  Default,

  /** The feed was explicitly refreshed by the user, e.g. by swiping down */
  Refresh,

  /** More posts were requested by the user, e.g. by swiping up */
  LoadMore,
}
