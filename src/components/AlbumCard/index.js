import { AlbumImage } from './AlbumImage';
import styles from './AlbumCard.module.scss';
import { AlbumInfo } from './AlbumInfo';

const AlbumCard = ({
  id,
  label,
  imgUrl,
  album,
  artist,
  price,
  songCount,
  genre,
  onClick,
  isFavourite,
  hideFavouriteButton,
  onAddToFavourites,
  showDetails,
}) => {
  return (
    <button
      className={`${styles.albumCard} ${showDetails ? styles.detail : ''}`}
      value={id}
      onClick={onClick}
      aria-label="album card"
    >
      <div className={styles.albumImage}>
        <AlbumImage imgUrl={imgUrl} alt={label} />
      </div>
      <AlbumInfo
        id={id}
        album={album}
        artist={artist}
        price={price}
        genre={genre}
        songCount={songCount}
        showDetails={showDetails}
        onAddToFavourites={onAddToFavourites}
        hideFavouriteButton={hideFavouriteButton}
        isFavourite={isFavourite}
      />
    </button>
  );
};

export { AlbumCard };
