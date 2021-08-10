const sessionStorageKeys = { FAVOURITES: 'favourites' };

function getFavourites() {
  const favourites = JSON.parse(
    sessionStorage.getItem(sessionStorageKeys.FAVOURITES),
  );
  return favourites || [];
}

function addToFavourites(album) {
  if (!album) {
    return;
  }

  const favourites = getFavourites();

  if (favourites.length) {
    sessionStorage.setItem(
      sessionStorageKeys.FAVOURITES,
      JSON.stringify([...favourites, album]),
    );
    return;
  }

  sessionStorage.setItem(
    sessionStorageKeys.FAVOURITES,
    JSON.stringify([album]),
  );
}

function removeFavourite(id) {
  if (!id) {
    return;
  }

  const favourites = getFavourites();

  if (!favourites.length) {
    return;
  }

  const filteredFavourites = favourites.filter(
    favourite => favourite.id.attributes['im:id'] !== id,
  );

  sessionStorage.setItem(
    sessionStorageKeys.FAVOURITES,
    JSON.stringify(filteredFavourites),
  );
}

export { getFavourites, addToFavourites, removeFavourite };
