# Unofficial Musical.ly API

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
