import styles from './AlbumImage.module.scss';

const AlbumImage = ({ imgUrl, alt }) => {
  return <img className={styles.albumImage} src={imgUrl} alt={alt} />;
};

export { AlbumImage };
