import axios from 'axios';
import { usTopAlbums } from '../usTopAlbums';

import { usTopAlbums200Response } from '../mockData/usTopAlbums';

jest.mock('axios');

describe('US top albums service', () => {
  describe('when response status code is 200', () => {
    it('returns a list of top albums returned from API', async () => {
      axios.get.mockImplementation(() =>
        Promise.resolve(usTopAlbums200Response),
      );

      var topAlbums = await usTopAlbums();

      expect(topAlbums).toEqual(usTopAlbums200Response.data.feed.entry);
    });
  });

  describe('when response status code is not 200', () => {
    it('returns undefined', async () => {
      axios.get.mockImplementation(() => Promise.resolve({ status: 500 }));

      var topAlbums = await usTopAlbums();

      expect(topAlbums).toBeUndefined();
    });
  });
});
