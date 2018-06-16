# Unofficial Musical.ly API &middot; [![npm version](https://img.shields.io/npm/v/musically-api.svg?style=flat)](https://www.npmjs.com/package/musically-api) [![Coverage Status](https://img.shields.io/coveralls/szdc/musically-api/master.svg?style=flat)](https://coveralls.io/github/szdc/musically-api?branch=master) [![Build Status](https://travis-ci.com/szdc/musically-api.svg?branch=master)](https://travis-ci.com/szdc/musically-api) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/szdc/musically-api/issues)

A reverse-engineered implementation of the [musical.ly](https://musical.ly) app's API.

## Installation

```bash
npm i musically-api
```

## Usage

```js
import MusicallyAPI, { getRequestParams } from 'musically-api';

const params = getRequestParams({
  device_id: '<device_id>',
  fp: '<device_fingerprint>',
  iid: '<install_id>',
  openudid: '<device_open_udid>',
});
const api = new MusicallyAPI(params);
api.loginWithEmail('user@example.com', 'password');

```

**Note:** You need to source the above parameters using a man-in-the-middle proxy such as
[mitmproxy](https://mitmproxy.org/) or [Charles Proxy](https://www.charlesproxy.com/).

## Resources

* [Reverse engineering the musical.ly API](https://medium.com/@szdc/reverse-engineering-the-musical-ly-api-662331008eb3)
