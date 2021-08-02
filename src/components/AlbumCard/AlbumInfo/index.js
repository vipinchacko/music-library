import styles from './AlbumInfo.module.scss';

const AlbumInfo = ({ album, artist }) => {
  return (
    <div className={styles.albumInfo}>
      <span className={styles.album}>{album}</span>
      <span className={styles.artist}>{artist}</span>
    </div>
  );
};

export { AlbumInfo };
