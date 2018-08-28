# Unofficial TikTok/Musical.ly API

<!-- markdownlint-disable MD013 -->
[![npm version](https://img.shields.io/npm/v/tiktok-api.svg?style=flat)](https://www.npmjs.com/package/tiktok-api) [![Coverage Status](https://img.shields.io/coveralls/szdc/tiktok-api/master.svg?style=flat)](https://coveralls.io/github/szdc/tiktok-api?branch=master) [![Build Status](https://travis-ci.com/szdc/tiktok-api.svg?branch=master)](https://travis-ci.com/szdc/tiktok-api) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/szdc/tiktok-api/issues) ![Supported TikTok version](https://img.shields.io/badge/TikTok-8.2.0-blue.svg)
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
* [.getUser(id)](#getuserid)
* [.searchUsers(params)](#searchusersparams)
* [.listPosts(params)](#listpostsparams)
* [.listFollowers(params)](#listfollowersparams)
* [.listFollowing(params)](#listfollowingparams)
* [.follow(id)](#followid)
* [.unfollow(id)](#unfollowid)
* [.likePost(id)](#likepostid)
* [.unlikePost(id)](#unlikepostid)
* [.listComments(params)](#listcommentsparams)
* [.postComment(postId, text, [tags])](#postcommentpostid-text-tags)
* [.listCategories(params)](#listcategoriesparams)
* [.searchHashtags(params)](#searchhashtagsparams)
* [.listForYouFeed([params])](#listforyoufeedparams)
* [.listFollowingFeed([params])](#listfollowingfeedparams)

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

## Resources

* [Reverse engineering the musical.ly API](https://medium.com/@szdc/reverse-engineering-the-musical-ly-api-662331008eb3)

## Legal

This code is in no way affiliated with, authorized, maintained, sponsored or endorsed by TikTok
or any of its affiliates or subsidiaries. This is an independent and unofficial API. Use at your own risk.
