# Unofficial TikTok/Musical.ly API

<!-- markdownlint-disable MD013 -->
[![npm version](https://img.shields.io/npm/v/tiktok-api.svg?style=flat)](https://www.npmjs.com/package/tiktok-api) [![Coverage Status](https://img.shields.io/coveralls/szdc/tiktok-api/master.svg?style=flat)](https://coveralls.io/github/szdc/tiktok-api?branch=master) [![Build Status](https://travis-ci.com/szdc/tiktok-api.svg?branch=master)](https://travis-ci.com/szdc/tiktok-api) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/szdc/tiktok-api/issues) ![Supported TikTok version](https://img.shields.io/badge/TikTok-9.1.0-blue.svg)
<!-- markdownlint-enable MD013 -->

A reverse-engineered implementation of the [TikTok](https://www.tiktok.com/) (previously musical.ly) app's API.

## Installation

```bash
npm i tiktok-api
```

## Usage

### Creating an instance

```js
import TikTokAPI, { getRequestParams } from 'tiktok-api';

// Required - a method that signs the URL with anti-spam parameters
// You must provide an implementation yourself to successfully make
// most requests with this library.
const signURL = async (url, ts, deviceId) => {
  const as = 'anti-spam parameter 1';
  const cp = 'anti-spam parameter 2'
  const mas = 'anti-spam parameter 3';
  return `${url}&as=${as}&cp=${cp}&mas=${mas}`;
}

// Required - device parameters
// You need to source these using a man-in-the-middle proxy such as mitmproxy,
// CharlesProxy or PacketCapture (Android)
const params = getRequestParams({
  device_id: '<device_id>',
  fp: '<device_fingerprint>',
  iid: '<install_id>',
  openudid: '<device_open_udid>',
});

const api = new TikTokAPI(params, { signURL });

// You are now able to make successful requests

```

### Instance methods

* [.loginWithEmail(email, password)](#loginwithemailemail-password)
* [.loginWithUsername(username, password)](#loginwithusernameusername-password)
* [.getUser(id)](#getuserid)
* [.searchUsers(params)](#searchusersparams)
* [.getQRCode(id, [schemaType])](#getqrcodeid-schematype)
* [.getPost(id)](#getpostid)
* [.listPosts(params)](#listpostsparams)
* [.listFollowers(params)](#listfollowersparams)
* [.listFollowing(params)](#listfollowingparams)
* [.follow(id)](#followid)
* [.unfollow(id)](#unfollowid)
* [.listReceivedFollowRequests(params)](#listreceivedfollowrequestsparams)
* [.approveFollowRequest(id)](#approvefollowrequestid)
* [.rejectFollowRequest(id)](#rejectfollowrequestid)
* [.likePost(id)](#likepostid)
* [.unlikePost(id)](#unlikepostid)
* [.listComments(params)](#listcommentsparams)
* [.postComment(postId, text, [tags])](#postcommentpostid-text-tags)
* [.listCategories(params)](#listcategoriesparams)
* [.searchHashtags(params)](#searchhashtagsparams)
* [.listPostsInHashtag(params)](#listpostsinhashtagparams)
* [.listForYouFeed([params])](#listforyoufeedparams)
* [.listFollowingFeed([params])](#listfollowingfeedparams)
* [.getSticker(id)](#getstickerid)
* [.getStickers([ids])](#getstickersids)
* [.listPostsBySticker(params)](#listpostsbystickerparams)
* [.joinLiveStream(id)](#joinlivestreamid)
* [.leaveLiveStream(id)](#leavelivestreamid)
* [.canStartLiveStream()](#canstartlivestream)
* [.startLiveStream(title, [contactsAuthorized])](#startlivestreamtitle-contactsauthorized)
* [.endLiveStream(roomId, streamId)](#endlivestreamroomid-streamid)
* [.createLiveStreamRoom(title, [contactsAuthorized])](#createlivestreamroomtitle-contactsauthorized)
* [.updateLiveStreamStatus(params)](#updatelivestreamstatusparams)

#### .loginWithEmail(email, password)

Authenticates you with the API and stores your session data in a cookie jar.
Subsequent requests will include these cookies.

```javascript
api.loginWithEmail('<email>', '<password>')
  .then(res => console.log(res.data))
  .catch(console.log)

// Outputs:
// { email: '<email>', session_key: '123456', user_id: '123456', ... }

```

See the [login types](src/types/login.d.ts) for the response data.

#### .loginWithUsername(username, password)

Authenticates you with the API and stores your session data in a cookie jar.
Subsequent requests will include these cookies.

```javascript
api.loginWithUsername('<username>', '<password>')
  .then(res => console.log(res.data))
  .catch(console.log)

// Outputs:
// { username: '<email>', session_key: '123456', user_id: '123456', ... }

```

See the [login types](src/types/login.d.ts) for the response data.

#### .getUser(id)

Gets a user's profile.

```javascript
api.getUser('<user_id>')
  .then(res => console.log(res.data.user))
  .catch(console.log);

// Outputs:
// { aweme_count: 1000, nickname: 'example', unique_id: 'musername', ... }

```

See the [user types](src/types/user.d.ts) for the response data.

#### .searchUsers(params)

Searches for users.

```javascript
api.searchUsers({
  keyword: 'example',
  count: 10,
  cursor: 0,
})
  .then(res => console.log(res.data.user_list))
  .catch(console.log);

// Outputs:
// [{ user_info: {...}, position: [], uniqposition: [] }, ...]

```

See the [search types](src/types/search.d.ts) for the complete request/response objects.

#### .getQRCode(id, [schemaType])

Gets the QR code for a user.

```javascript
api.getQRCode('<user_id>')
  .then(res => console.log(res.data.qrcode_url.url_list[0]))
  .catch(console.log);

// Outputs:
// 'http://p16.muscdn.com/img/musically-qrcode/1111111111111111111~c5_720x720.image'

```

See the [QR code types](src/types/qr-code.d.ts) for the complete request/response objects.

#### .getPost(id)

Gets a post.

```javascript
api.getPost('<user_id>')
  .then(res => console.log(res.data.aweme_detail))
  .catch(console.log);

// Outputs:
// { author: {...}, aweme_id: '999', desc: 'description', music: {...}, statistics: {...}, video: {...}, ... }

```

See the [post types](src/types/post.d.ts) for the complete response object.

#### .listPosts(params)

Lists a user's posts.

```javascript
api.listPosts({
  user_id: '<user_id>',
  max_cursor: 0,
})
  .then(res => console.log(res.data.aweme_list))
  .catch(console.log);

// Outputs:
// [{ author: {...}, aweme_id: '999', desc: 'description', music: {...}, statistics: {...}, video: {...} }, ...]

```

See the [post types](src/types/post.d.ts) for the complete request/response objects.

#### .listFollowers(params)

Lists the users that follow the specified user.

```javascript
api.listFollowers({
  user_id: '<user_id>',
  max_time: Math.floor(new Date().getTime() / 1000),
})
  .then(res => console.log(res.data.followers))
  .catch(console.log);

// Outputs:
// [{ unique_id: 'follower1' }, { unique_id: 'follower2' }, ...]

```

See the [follower types](src/types/follower.d.ts) for the complete request/response objects.

#### .listFollowing(params)

Lists the users that the specified user follows.

```javascript
api.listFollowing({
  user_id: '<user_id>',
  max_time: Math.floor(new Date().getTime() / 1000),
})
  .then(res => console.log(res.data.followings))
  .catch(console.log);

// Outputs:
// [{ unique_id: 'following1' }, { unique_id: 'following2' }, ...]

```

See the [following types](src/types/follower.d.ts) for the complete request/response objects.

#### .follow(id)

Follows a user.

```javascript
api.follow('<user_id>')
  .then(res => console.log(res.data.follow_status))
  .catch(console.log);

// Outputs:
// 1

```

See the [follow types](src/types/follow.d.ts) for the response data.

#### .unfollow(id)

Stops following a user.

```javascript
api.unfollow('<user_id>')
  .then(res => console.log(res.data.follow_status))
  .catch(console.log);

// Outputs:
// 0

```

See the [follow types](src/types/follow.d.ts) for the response data.

#### .listReceivedFollowRequests(params)

Lists the users that have requested to follow the logged in user.

```javascript
api.listReceivedFollowRequests({
  max_time: Math.floor(new Date().getTime() / 1000),
  count: 10,
})
  .then(res => console.log(res.data.request_users))
  .catch(console.log);

// Outputs:
// [{ unique_id: 'user1' }, { unique_id: 'user2' }, ...]

```

See the [follow types](src/types/follow.d.ts) for the complete request/response objects.

#### .approveFollowRequest(id)

Approves a user's request to follow you.

```javascript
api.approveFollowRequest('<user_id>')
  .then(res => console.log(res.data.approve_status))
  .catch(console.log);

// Outputs:
// 0

```

See the [follow types](src/types/follow.d.ts) for the response data.

#### .rejectFollowRequest(id)

Rejects a user's request to follow you.

```javascript
api.rejectFollowRequest('<user_id>')
  .then(res => console.log(res.data.reject_status))
  .catch(console.log);

// Outputs:
// 0

```

See the [follow types](src/types/follow.d.ts) for the response data.

#### .likePost(id)

Likes a post.

```javascript
api.likePost('<post_id>')
  .then(res => console.log(res.data.is_digg))
  .catch(console.log);

// Outputs:
// 1

```

#### .unlikePost(id)

Unlikes a post.

```javascript
api.unlikePost('<post_id>')
  .then(res => console.log(res.data.is_digg))
  .catch(console.log);

// Outputs:
// 0

```

#### .listComments(params)

Lists comments for a post.

```javascript
api.listComments({
  aweme_id: '<post_id>',
  cursor: 0,
})
  .then(res => console.log(res.data.comments))
  .catch(console.log);

// Outputs:
// [{ text: 'first!', user: {...} }, { text: 'second!', user: {...} }, ...]

```

See the [comment types](src/types/comment.d.ts) for the response data.

#### .postComment(postId, text, [tags])

Comments on a post.

```javascript
api.postComment('<post_id>', 'first!')
  .then(res => console.log(res.data.comment))
  .catch(console.log);

// Outputs:
// { cid: '<comment_id>', text: 'first!', user: {...}, ... }

```

See the [comment types](src/types/comment.d.ts) for the response data.

#### .listCategories(params)

Lists popular categories/hashtags.

```javascript
api.listCategories({
  count: 10,
  cursor: 0,
})
  .then(res => console.log(res.data.category_list))
  .catch(console.log);

// Outputs:
// [{ { challenge_info: { cha_name: 'posechallenge', cid: '123' }, desc: 'Trending Hashtag' }, ...]

```

See the [category types](src/types/category.d.ts) for the complete request/response objects.

#### .searchHashtags(params)

Searches for hashtags.

```javascript
api.searchHashtags({
  keyword: 'example',
  count: 10,
  cursor: 0,
})
  .then(res => console.log(res.data.challenge_list))
  .catch(console.log);

// Outputs:
// [{ challenge_info: {...}, position: [] }, ...]

```

See the [search types](src/types/search.d.ts) for the complete request/response objects.

#### .listPostsInHashtag(params)

Lists posts in a hashtag.

```javascript
api.listPostsInHashtag({
  ch_id: '<hashtag_id>',
})
  .then(res => console.log(res.data.aweme_list))
  .catch(console.log);

// Outputs:
// [{ author: {...}, aweme_id: '999', desc: 'description', music: {...}, statistics: {...}, video: {...} }, ...]

```

See the [hashtag types](src/types/hashtag.d.ts) for the complete request/response objects.

#### .listForYouFeed([params])

Lists posts in the For You feed.

```javascript
api.listForYouFeed()
  .then(res => console.log(res.data.aweme_list))
  .catch(console.log);

// Outputs:
// [{ author: {...}, aweme_id: '999', desc: 'description', music: {...}, statistics: {...}, video: {...} }, ...]

```

See the [feed types](src/types/feed.d.ts) for the complete request/response objects.

#### .listFollowingFeed([params])

Lists posts in the Following feed.

```javascript
api.listFollowingFeed()
  .then(res => console.log(res.data.aweme_list))
  .catch(console.log);

// Outputs:
// [{ author: {...}, aweme_id: '999', desc: 'description', music: {...}, statistics: {...}, video: {...} }, ...]

```

See the [feed types](src/types/feed.d.ts) for the complete request/response objects.

#### .getSticker(id)

Gets information about a sticker/effect.

```javascript
api.getSticker('<sticker_id>')
  .then(res => console.log(res.data.sticker_infos))
  .catch(console.log);

// Outputs:
// [{ id: '100000', name: 'cloned', owner_nickname: 'Effect Assistant', ...}]

```

See the [sticker types](src/types/sticker.d.ts) for the complete response object.

#### .getStickers([ids])

Gets information about many stickers/effects.

```javascript
api.getStickers(['<sticker_id>', '<sticker_id>'])
  .then(res => console.log(res.data.sticker_infos))
  .catch(console.log);

// Outputs:
// [{ id: '100000', name: 'cloned', owner_nickname: 'Effect Assistant', ...}, ...]

```

See the [sticker types](src/types/sticker.d.ts) for the complete response object.

#### .listPostsBySticker(params)

Lists posts that use a sticker/effect.

```javascript
api.listPostsBySticker({
  count: 20,
  cursor: 0,
  sticker_id: '100000',
})
  .then(res => console.log(res.data.aweme_list))
  .catch(console.log);

// Outputs:
// [{ author: {...}, aweme_id: '999', desc: 'description', music: {...}, statistics: {...}, video: {...} }, ...]
```

See the [sticker types](src/types/sticker.d.ts) for the complete request/response object.

#### .joinLiveStream(id)

Joins a live stream.  

The `rtmp_pull_url` value can be used with VLC's `Open Network Stream` option.

```javascript
api.joinLiveStream('<room_id>')
  .then(res => console.log(res.data.room))
  .catch(console.log);

// Outputs:
// { create_time: 1000000000, owner: {...}, stream_url: {...}, title: 'Example', user_count: 1000, ... }

```

See the [live stream types](src/types/live-stream.d.ts) for the response data.

#### .leaveLiveStream(id)

Leaves a live stream.

```javascript
api.leaveLiveStream('<room_id>')
  .then(res => console.log(res.data.status_code))
  .catch(console.log);

// Outputs:
// 0

```

#### .canStartLiveStream()

Determines if the current user is allowed to start a live stream.

```javascript
api.canStartLiveStream()
  .then(res => console.log(res.data.can_be_live_podcast))
  .catch(console.log);

// Outputs:
// true

```

See the [live stream types](src/types/live-stream.d.ts) for the response data.

#### .startLiveStream(title, [contactsAuthorized])

Starts a live stream by calling [`createLiveStreamRoom`](#createlivestreamroomtitle-contactsauthorized)
then [`updateLiveStreamStatus`](#updatelivestreamstatusparams).

Keep note of the `room_id` and `stream_id` properties because you will need them to end the live stream.

The `rtmp_push_url` value can be used with streaming applications such as OBS.

```javascript
api.startLiveStream('title')
  .then(res => console.log(res.data.room))
  .catch(console.log);

// Outputs:
// { create_time: 1000000000, owner: {...}, stream_url: {...}, title: 'Example', user_count: 1000, ... }

```

See the [live stream types](src/types/live-stream.d.ts) for the response data.

#### .endLiveStream(roomId, streamId)

Ends a live stream.

You **must** call this method to so you are no longer marked as "live" in the app.

```javascript
api.endLiveStream('<room_id>', '<stream_id>')
  .then(res => console.log(res.data.status_code))
  .catch(console.log);

// Outputs:
// 0

```

#### .createLiveStreamRoom(title, [contactsAuthorized])

Creates a room to host a live stream.

The `rtmp_push_url` value can be used with streaming applications such as OBS.

**Note:** This method only creates the room for the live stream.  You'll need to call
[`updateLiveStreamStatus`](#updatelivestreamstatusparams) to mark the stream as started.
See [`startLiveStream`](#startlivestreamtitle-contactsauthorized) for a helper method that makes these calls for you.

```javascript
api.startLiveStream('title')
  .then(res => console.log(res.data.room))
  .catch(console.log);

// Outputs:
// { create_time: 1000000000, owner: {...}, stream_url: {...}, title: 'Example', user_count: 1000, ... }

```

See the [live stream types](src/types/live-stream.d.ts) for the response data.

#### .updateLiveStreamStatus(params)

Updates the status of a live stream.

```javascript
api.updateLiveStreamStatus({
  room_id: '<room_id>',
  stream_id: '<stream_id>',
  status: LiveStreamStatus.Ended,
  reason_no: LiveStreamStatusChangedReason.InitiatedByUser,
})
  .then(res => console.log(res.data.status_code))
  .catch(console.log);

// Outputs:
// 0

```

See the [live stream types](src/types/live-stream.d.ts) for the complete request/response objects.

## Resources

* [Reverse engineering the musical.ly API](https://medium.com/@szdc/reverse-engineering-the-musical-ly-api-662331008eb3)

## Legal

This code is in no way affiliated with, authorized, maintained, sponsored or endorsed by TikTok
or any of its affiliates or subsidiaries. This is an independent and unofficial API. Use at your own risk.
