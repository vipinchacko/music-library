import axios from 'axios';

async function usTopAlbums() {
  const url = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

  var response = await axios.get(url);

  if (response.status === 200) {
    let {
      data: {
        feed: { entry: topAlbums },
      },
    } = response;

    return topAlbums;
  }

  return undefined;
}

export { usTopAlbums };
