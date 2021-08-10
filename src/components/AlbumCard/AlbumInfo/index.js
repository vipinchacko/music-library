import styles from './AlbumInfo.module.scss';

import favouriteIcon from '../../../static/icons/favourite.png';
import addToFavouriteIcon from '../../../static/icons/addToFavourite.png';
import { Fragment } from 'react';

const AlbumInfo = ({
  id,
  album,
  artist,
  price,
  genre,
  songCount,
  showDetails,
  isFavourite,
  hideFavouriteButton,
  onAddToFavourites,
}) => {
  return (
    <div className={styles.albumInfoParent}>
      <div className={styles.albumInfo}>
        <span className={styles.album} data-testid="album">
          {album}
        </span>
        <span className={styles.artist} data-testid="artist">
          {artist}
        </span>
        <div
          className={`${styles.details} ${
            showDetails ? styles.detailsExpand : ''
          }`}
        >
          {showDetails && (
            <Fragment>
              <span className={styles.price} data-testid="price">
                {price}
              </span>
              <span className={styles.genre} data-testid="genre">
                {genre}
              </span>
              <span className={styles.songCount} data-testid="songCount">
                {songCount} Songs
              </span>
            </Fragment>
          )}
        </div>
      </div>
      <button
        value={id}
        className={styles.favouriteButton}
        onClick={onAddToFavourites}
      >
        {!hideFavouriteButton && (
          <img
            className={styles.favouriteIcon}
            src={isFavourite ? favouriteIcon : addToFavouriteIcon}
            alt="favouriteIcon"
            data-testid={isFavourite ? 'favourite' : 'addToFavourite'}
          />
        )}
      </button>
    </div>
  );
};

export { AlbumInfo };
