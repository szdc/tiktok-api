import MockAdapter from 'axios-mock-adapter';
import { assert } from 'chai';
import { describe, it } from 'mocha';

import TikTokAPI, {
  GetStickersResponse,
  ListPostsByStickerRequest,
  ListPostsByStickerResponse,
} from '../src';
import {
  loadTestData,
  mockConfig,
  mockParams,
} from './util';

describe('#getSticker()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);

    mock
      .onGet(new RegExp('aweme/v1/sticker/detail/\?.*'))
      .reply(200, loadTestData('getSticker.json'), {});

    const res = await api.getSticker('100000');
    const expected: GetStickersResponse = {
      extra: {
        now: 1000000000000,
      },
      sticker_infos: [
        {
          children: [],
          desc: '',
          effect_id: '100000',
          icon_url: {
            url_list: [
              'http://sf-tk-sg.ibytedtos.com/obj/ies.fe.effect.alisg/111111',
            ],
          },
          id: '100000',
          is_favorite: false,
          name: 'sticker1',
          owner_id: '',
          owner_nickname: 'Effect Assistant',
          tags: [],
          user_count: 10000,
        },
      ],
      status_code: 0,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});

describe('#getStickers()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);

    mock
      .onGet(new RegExp('aweme/v1/sticker/detail/\?.*'))
      .reply(200, loadTestData('getStickers.json'), {});

    const res = await api.getStickers(['100000', '100001']);
    const expected: GetStickersResponse = {
      extra: {
        now: 1000000000000,
      },
      sticker_infos: [
        {
          children: [],
          desc: '',
          effect_id: '100000',
          icon_url: {
            url_list: [
              'http://sf-tk-sg.ibytedtos.com/obj/ies.fe.effect.alisg/111111',
            ],
          },
          id: '100000',
          is_favorite: false,
          name: 'sticker1',
          owner_id: '',
          owner_nickname: 'Effect Assistant',
          tags: [],
          user_count: 10000,
        },
        {
          children: [],
          desc: '',
          effect_id: '100001',
          icon_url: {
            url_list: [
              'http://sf-tk-sg.ibytedtos.com/obj/ies.fe.effect.alisg/222222',
            ],
          },
          id: '100001',
          is_favorite: false,
          name: 'sticker2',
          owner_id: '',
          owner_nickname: 'Effect Assistant',
          tags: [],
          user_count: 10001,
        },
      ],
      status_code: 0,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});

describe('#listPostsBySticker()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);

    mock
      .onGet(new RegExp('aweme/v1/sticker/aweme/\?.*'))
      .reply(200, loadTestData('listPostsBySticker.json'), {});

    const res = await api.listPostsBySticker({
      cursor: 0,
      count: 20,
      sticker_id: '100000',
    } as ListPostsByStickerRequest);
    const expected: ListPostsByStickerResponse = {
      extra: {
        now: 1000000000000,
      },
      aweme_list: [],
      cursor: 20,
      has_more: 1,
      status_code: 0,
      stickers: [],
    };
    assert.deepStrictEqual(res.data, expected);
  });
});
