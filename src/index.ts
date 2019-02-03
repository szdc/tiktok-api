import axiosCookieJarSupport from 'axios-cookiejar-support';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import * as JSONBig from 'json-bigint';
import * as qs from 'qs';
import { CookieJar } from 'tough-cookie';

import * as API from './types';
import { encryptWithXOR } from './cryptography';
import { FeedType, PullType } from './feed';
import { LiveStreamStatus, LiveStreamStatusChangedReason } from './live-stream';
import { paramsOrder, paramsSerializer, withDefaultListParams } from './params';

export default class TikTokAPI {
  readonly config: API.TikTokAPIConfig;
  readonly cookieJar: CookieJar;
  readonly request: AxiosInstance;

  /**
   * Creates a new API instance.
   *
   * @param {StaticRequestParams} reqParams
   * @param {TikTokAPIConfig} apiConfig
   * @param {AxiosRequestConfig} requestConfig
   */
  constructor(reqParams: API.StaticRequestParams, apiConfig: API.TikTokAPIConfig, requestConfig?: AxiosRequestConfig) {
    if (typeof apiConfig.signURL !== 'function') {
      throw new Error('You must supply a signURL function to the TikTokAPI config');
    }

    this.config = {
      baseURL: 'https://api2.musical.ly/',
      host: 'api2.musical.ly',
      userAgent: `com.zhiliaoapp.musically/${reqParams.manifest_version_code}`
        + ` (Linux; U; Android ${reqParams.os_version}; ${reqParams.language}_${reqParams.region};`
        + ` ${reqParams.device_type}; Build/NHG47Q; Cronet/58.0.2991.0)`,
      ...apiConfig,
    } as API.TikTokAPIConfig;

    this.cookieJar = new CookieJar();
    this.request = axios.create({
      paramsSerializer: paramsSerializer(paramsOrder),
      baseURL: this.config.baseURL,
      headers: {
        host: this.config.host,
        connection: 'keep-alive',
        'accept-encoding': 'gzip',
        'user-agent': this.config.userAgent,
        'sdk-version': 1,
        'x-ss-tc': 0,
      },
      jar: this.cookieJar,
      params: reqParams,
      transformResponse: this.transformResponse,
      withCredentials: true,
      ...requestConfig,
    } as AxiosRequestConfig);
    axiosCookieJarSupport(this.request);

    this.request.interceptors.request.use(this.signRequest);
  }

  /**
   * Logs in using an email and password.
   *
   * @param {string} email
   * @param {string} password
   * @returns {AxiosPromise<LoginResponse>}
   */
  loginWithEmail = (email: string, password: string) => this.login({
    email: encryptWithXOR(email),
    password: encryptWithXOR(password),
  })

  /**
   * Logs in using a username and password.
   *
   * @param {string} username
   * @param {string} password
   * @returns {AxiosPromise<LoginResponse>}
   */
  loginWithUsername = (username: string, password: string) => this.login({
    username: encryptWithXOR(username),
    password: encryptWithXOR(password),
  })

  /**
   * Logs in to the app.
   *
   * @param {LoginRequest} params
   * @returns {AxiosPromise<LoginResponse>}
   */
  login = (params: API.LoginRequest) =>
    this.request.post<API.LoginResponse>('passport/user/login/', null, {
      params: <API.LoginRequest>{
        mix_mode: 1,
        username: '',
        email: '',
        mobile: '',
        account: '',
        password: '',
        captcha: '',
        ...params,
      },
    })
      .then((res) => {
        if (res.headers['x-tt-token']) {
          this.request.defaults.headers.common['x-tt-token'] = res.headers['x-tt-token'];
        }
        return res;
      })

  /**
   * Gets a user's profile.
   *
   * @param {string} userId
   * @returns {AxiosPromise<UserProfileResponse>}
   */
  getUser = (userId: string) =>
    this.request.get<API.UserProfileResponse | API.BaseResponseData>('aweme/v1/user/', { params: { user_id: userId } })

  /**
   * Searches for users.
   *
   * @param params
   * @returns {AxiosPromise<UserSearchResponse | BaseResponseData>}
   */
  searchUsers = (params: API.UserSearchRequest) =>
    this.request.get<API.UserSearchResponse | API.BaseResponseData>('aweme/v1/discover/search/', {
      params: <API.UserSearchRequest>{
        type: 1,
        ...withDefaultListParams(params),
      },
    })

  /**
   * Gets the QR code image for a user.
   *
   * @param userId
   * @param schemaType
   * @returns {AxiosPromise<QRCodeResponse | BaseResponseData>}
   */
  getQRCode = (userId: string, schemaType = 4) =>
    this.request.post<API.QRCodeResponse | API.BaseResponseData>(
      'aweme/v1/fancy/qrcode/info/',
      qs.stringify(<API.QRCodeRequest>{
        schema_type: schemaType,
        object_id: userId,
      }),
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        params: {
          js_sdk_version: '',
          app_type: 'normal',
        },
      },
    )

  /**
   * Gets a post.
   *
   * @param {string} postId
   * @returns {AxiosPromise<GetPostResponse>}
   */
  getPost = (postId: string) =>
    this.request.get<API.GetPostResponse | API.BaseResponseData>('aweme/v1/aweme/detail/', {
      params: {
        aweme_id: postId,
      },
    })

  /**
   * Lists a user's posts.
   *
   * @param {ListPostsRequest} params
   * @returns {AxiosPromise<ListPostsResponse | BaseResponseData>}
   */
  listPosts = (params: API.ListPostsRequest) =>
    this.request.get<API.ListPostsResponse | API.BaseResponseData>('aweme/v1/aweme/post/', {
      params: withDefaultListParams(params),
    })

  /**
   * Lists a user's followers.
   *
   * @param {ListFollowersRequest} params
   * @returns {AxiosPromise<ListFollowersResponse | BaseResponseData>}
   */
  listFollowers = (params: API.ListFollowersRequest) =>
    this.request.get<API.ListFollowersResponse | API.BaseResponseData>('aweme/v1/user/follower/list/', {
      params: withDefaultListParams(params),
    })

  /**
   * Lists the users a user is following.
   *
   * @param {ListFollowingRequest} params
   * @returns {AxiosPromise<ListFollowingResponse | BaseResponseData>}
   */
  listFollowing = (params: API.ListFollowingRequest) =>
    this.request.get<API.ListFollowingResponse | API.BaseResponseData>('aweme/v1/user/following/list/', {
      params: withDefaultListParams(params),
    })

  /**
   * Follows a user.
   *
   * @param userId
   * @returns {AxiosPromise<FollowResponse | BaseResponseData>}
   */
  follow = (userId: string) =>
    this.request.get<API.FollowResponse | API.BaseResponseData>('aweme/v1/commit/follow/user/', {
      params: <API.FollowRequest>{
        user_id: userId,
        type: 1,
      },
    })

  /**
   * Unfollows a user.
   *
   * @param userId
   * @returns {AxiosPromise<FollowResponse | BaseResponseData>}
   */
  unfollow = (userId: string) =>
    this.request.get<API.FollowResponse | API.BaseResponseData>('aweme/v1/commit/follow/user/', {
      params: <API.FollowRequest>{
        user_id: userId,
        type: 0,
      },
    })

  /**
   * Lists the users who have requested to follow the logged in user.
   *
   * @param {ListReceivedFollowRequestsRequest} params
   * @returns {AxiosPromise<ListReceivedFollowRequestsResponse | BaseResponseData>}
   */
  listReceivedFollowRequests = (params: API.ListReceivedFollowRequestsRequest) =>
    this.request.get<API.ListReceivedFollowRequestsResponse | API.BaseResponseData>(
      'aweme/v1/user/following/request/list/',
      { params: withDefaultListParams(params) },
    )

  /**
   * Approves a request from a user to follow you.
   *
   * @param userId
   * @returns {AxiosPromise<ApproveFollowResponse | BaseResponseData>}
   */
  approveFollowRequest = (userId: string) =>
    this.request.get<API.ApproveFollowResponse | API.BaseResponseData>('aweme/v1/commit/follow/request/approve/', {
      params: <API.ApproveFollowRequest>{
        from_user_id: userId,
      },
    })

  /**
   * Rejects a request from a user to follow you.
   *
   * @param userId
   * @returns {AxiosPromise<RejectFollowResponse | BaseResponseData>}
   */
  rejectFollowRequest = (userId: string) =>
    this.request.get<API.RejectFollowResponse | API.BaseResponseData>('aweme/v1/commit/follow/request/reject/', {
      params: <API.RejectFollowRequest>{
        from_user_id: userId,
      },
    })

  /**
   * Likes a post.
   *
   * @param postId
   * @returns {AxiosPromise<LikePostResponse | BaseResponseData>}
   */
  likePost = (postId: string) =>
    this.request.get<API.LikePostResponse | API.BaseResponseData>('aweme/v1/commit/item/digg/', {
      params: <API.LikePostRequest>{
        aweme_id: postId,
        type: 1,
      },
    })

  /**
   * Unlikes a post.
   *
   * @param postId
   * @returns {AxiosPromise<LikePostResponse | BaseResponseData>}
   */
  unlikePost = (postId: string) =>
    this.request.get<API.LikePostResponse | API.BaseResponseData>('aweme/v1/commit/item/digg/', {
      params: <API.LikePostRequest>{
        aweme_id: postId,
        type: 0,
      },
    })

  /**
   * Lists comments for a post.
   *
   * @param params
   */
  listComments = (params: API.ListCommentsRequest) =>
    this.request.get<API.ListCommentsResponse | API.BaseResponseData>('aweme/v1/comment/list/', {
      params: withDefaultListParams(<API.ListCommentsRequest>{
        comment_style: 2,
        digged_cid: '',
        insert_cids: '',
        ...params,
      }),
    })

  /**
   * Posts a comment on a post.
   *
   * @param postId
   * @param text
   * @param tags
   */
  postComment = (postId: string, text: string, tags: API.Tag[] = []) =>
    this.request.post<API.PostCommentResponse | API.BaseResponseData>(
      'aweme/v1/comment/publish/',
      qs.stringify(<API.PostCommentRequest>{
        text,
        aweme_id: postId,
        text_extra: tags,
        is_self_see: 0,
      }),
      {
        headers: {
          'content-type': 'application.x-www-form-urlencoded',
        },
      },
    )

  /**
   * Lists popular categories/hashtags.
   *
   * @param params
   */
  listCategories = (params: API.ListCategoriesRequest = { count: 10, cursor: 0 }) =>
    this.request.get<API.ListCategoriesResponse | API.BaseResponseData>('aweme/v1/category/list/', {
      params: withDefaultListParams(params),
    })

  /**
   * Searches for hashtags.
   *
   * @param params
   * @returns {AxiosPromise<HashtagSearchResponse | BaseResponseData>}
   */
  searchHashtags = (params: API.SearchRequest) =>
    this.request.get<API.HashtagSearchResponse | API.BaseResponseData>('aweme/v1/challenge/search/', {
      params: withDefaultListParams(params),
    })

  /**
   *
   * @param params
   * @returns {AxiosPromise<ListPostsInHashtagRequest | BaseResponseData>}
   */
  listPostsInHashtag = (params: API.ListPostsInHashtagRequest) =>
    this.request.get<API.ListPostsInHashtagResponse | API.BaseResponseData>('aweme/v1/challenge/aweme/', {
      params: withDefaultListParams(<API.ListPostsInHashtagRequest>{
        query_type: 0,
        type: 5,
        ...params,
      }),
    })

  /**
   * Lists posts in the For You feed.
   *
   * max_cursor should always be 0.
   *
   * @param params
   */
  listForYouFeed = (params?: API.ListFeedRequest) =>
    this.request.get<API.ListForYouFeedResponse | API.BaseResponseData>('aweme/v1/feed/', {
      params: withDefaultListParams(<API.ListFeedRequest>{
        count: 6,
        is_cold_start: 1,
        max_cursor: 0,
        pull_type: PullType.LoadMore,
        type: FeedType.ForYou,
        ...params,
      }),
    })

  /**
   * Lists posts in the Following feed.
   *
   * max_cursor should always be 0.
   *
   * @param params
   */
  listFollowingFeed = (params?: API.ListFeedRequest) =>
    this.request.get<API.ListFeedResponse | API.BaseResponseData>('aweme/v1/feed/', {
      params: withDefaultListParams(<API.ListFeedRequest>{
        count: 6,
        is_cold_start: 1,
        max_cursor: 0,
        pull_type: PullType.LoadMore,
        type: FeedType.Following,
        ...params,
      }),
    })

  /**
   * Gets information about a sticker/effect.
   *
   * @param stickerId
   */
  getSticker = (stickerId: string) => this.getStickers([stickerId]);

  /**
   * Gets information about many stickers/effects.
   *
   * @param stickerIds
   */
  getStickers = (stickerIds: string[]) =>
    this.request.get<API.GetStickersResponse | API.BaseResponseData>('aweme/v1/sticker/detail/', {
      params: <API.GetStickersRequest>{
        sticker_ids: stickerIds.join(','),
      },
    })

  /**
   * Lists posts that use a sticker/effect.
   *
   * @param params
   */
  listPostsBySticker = (params: API.ListPostsByStickerRequest) =>
    this.request.get<API.ListPostsByStickerResponse | API.BaseResponseData>('aweme/v1/sticker/aweme/', {
      params: withDefaultListParams(params),
    })

  /**
   * Joins a live stream.
   *
   * @param id
   */
  joinLiveStream = (id: string) =>
    this.request.get<API.JoinLiveStreamResponse | API.BaseResponseData>('aweme/v1/room/enter/', {
      params: <API.LiveStreamRequest>{
        room_id: id,
      },
    })

  /**
   * Leaves a live stream.
   *
   * @param id
   */
  leaveLiveStream = (id: string) =>
    this.request.get<API.BaseResponseData>('aweme/v1/room/leave/', {
      params: <API.LiveStreamRequest>{
        room_id: id,
      },
    })

  /**
   * Determines if you are allowed to start a live stream.  Typically you need 1,000 followers.
   */
  canStartLiveStream = () =>
    this.request.get<API.CanStartLiveStreamResponse | API.BaseResponseData>('aweme/v1/live/podcast/')

  /**
   * Creates a live stream room and sets the status to started.
   *
   * @param title
   * @param contactsAuthorized
   */
  startLiveStream = (title: string, contactsAuthorized = 0) =>
    this.createLiveStreamRoom(title, contactsAuthorized)
      .then((createRoomRes) => {
        if (createRoomRes.data.status_code !== 0) {
          throw new Error(`The live stream room could not be created: ${JSON.stringify(createRoomRes.data)}`);
        }

        const { room } = createRoomRes.data as API.CreateLiveStreamRoomResponse;
        return this.updateLiveStreamStatus({
          room_id: room.room_id,
          stream_id: room.stream_id,
          status: LiveStreamStatus.Started,
          reason_no: LiveStreamStatusChangedReason.InitiatedByApp,
        }).then((updateStatusRes) => {
          if (updateStatusRes.data.status_code !== 0) {
            throw new Error(`The live stream could not be started: ${JSON.stringify(updateStatusRes.data)}`);
          }

          return createRoomRes;
        });
      })

  /**
   * Ends a live stream.
   *
   * @param roomId
   * @param streamId
   */
  endLiveStream = (roomId: string, streamId: string) =>
    this.updateLiveStreamStatus({
      room_id: roomId,
      stream_id: streamId,
      status: LiveStreamStatus.Ended,
      reason_no: LiveStreamStatusChangedReason.InitiatedByUser,
    })

  /**
   * Creates a room to host a live stream.
   *
   * @param title
   * @param contactsAuthorized
   */
  createLiveStreamRoom = (title: string, contactsAuthorized = 0) =>
    this.request.post<API.CreateLiveStreamRoomResponse | API.BaseResponseData>('aweme/v1/room/create/', {
      params: <API.CreateLiveStreamRoomRequest>{
        title,
        contacts_authorized: contactsAuthorized,
      },
    })

  /**
   * Updates the status of a live stream.
   *
   * @param params
   */
  updateLiveStreamStatus = (params: API.UpdateLiveStreamStatusRequest) =>
    this.request.get<API.UpdateLiveStreamStatusResponse>('aweme/v1/room/update/status/', {
      params: <API.UpdateLiveStreamStatusRequest>{
        status: LiveStreamStatus.Ended,
        reason_no: LiveStreamStatusChangedReason.InitiatedByUser,
        ...params,
      },
    })

  /**
   * Transform using JSONBig to store big numbers accurately (e.g. user IDs) as strings.
   *
   * @param {any} data
   * @returns {any}
   */
  transformResponse = (data: any) => {
    if (!data || !data.length) {
      return data;
    }
    return JSONBig({ storeAsString: true }).parse(data);
  }

  /**
   * Adds timestamps and calls out to an external method to sign the URL.
   *
   * @param {AxiosRequestConfig} config
   * @returns {Promise<AxiosRequestConfig>}
   */
  private signRequest = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    if (typeof config.paramsSerializer !== 'function') {
      throw new Error('Missing required paramsSerializer function');
    }

    const ts = Math.floor((new Date()).getTime() / 1000);
    const params = {
      ...config.params,
      ts,
      _rticket: new Date().getTime(),
    } as API.BaseRequestParams;

    const url = `${config.baseURL}${config.url}?${config.paramsSerializer(params)}`;
    const signedURL = await this.config.signURL(url, ts, this.request.defaults.params.device_id);

    return {
      ...config,
      url: signedURL,
      params: {},
    };
  }
}

/**
 * Merges required user-defined parameters with default parameters.
 *
 * @param {RequiredUserDefinedRequestParams} requestParams
 * @returns {StaticRequestParams}
 */
export const getRequestParams = (requestParams: API.RequiredUserDefinedRequestParams): API.StaticRequestParams => ({
  os_api: '23',
  device_type: 'Pixel',
  ssmix: 'a',
  manifest_version_code: '2018111632',
  dpi: 420,
  app_name: 'musical_ly',
  version_name: '9.1.0',
  timezone_offset: 36000,
  is_my_cn: 0,
  ac: 'wifi',
  update_version_code: '2018111632',
  channel: 'googleplay',
  device_platform: 'android',
  build_number: '9.1.0',
  version_code: 910,
  timezone_name: 'Australia/Brisbane',
  resolution: '1080*1920',
  os_version: '7.1.2',
  device_brand: 'Google',
  mcc_mnc: '',
  app_language: 'en',
  language: 'en',
  region: 'US',
  sys_region: 'US',
  carrier_region: 'AU',
  carrier_region_v2: '505',
  aid: '1233',
  'pass-region': 1,
  'pass-route': 1,
  ...requestParams,
});

export * from './types';
