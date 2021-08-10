import {
  addToFavourites,
  getFavourites,
  removeFavourite,
} from '../../utils/js/favourites';

const useAddToFavouritesHook = (albums, setTopAlbums) => {
  const onAddToFavourites = e => {
    e.stopPropagation();

    const {
      currentTarget: { value },
    } = e;

    const favourites = getFavourites();
    const favouritesIdMap = favourites.reduce((acc, favourite) => {
      return { ...acc, ...{ [favourite.id.attributes['im:id']]: true } };
    }, {});

    if (favouritesIdMap[value]) {
      removeFavourite(value);
      const albumsWithFavouriteRemoved = albums.map(album => {
        if (album.id.attributes['im:id'] === value) {
          return { ...album, isFavourite: false };
        }

        return album;
      });
      setTopAlbums(albumsWithFavouriteRemoved);
      return;
    }

    const albumsWithFavourite = albums.map(album => {
      if (album.id.attributes['im:id'] === value) {
        return { ...album, isFavourite: true };
      }

      return album;
    });

    const newFavourite = albumsWithFavourite.filter(
      album => album.id.attributes['im:id'] === value,
    );

    addToFavourites(newFavourite[0]);
    setTopAlbums(albumsWithFavourite);
  };

  return { onAddToFavourites };
};

export { useAddToFavouritesHook };
