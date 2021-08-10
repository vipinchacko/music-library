import styles from './SectionNames.module.scss';

const sectionNames = {
  FAVOURITES: 'favourites',
  ALL: 'all',
};

const SectionNames = ({ selectedSection, onSectionChange }) => {
  const isSelected = value => {
    return value === selectedSection;
  };

  return (
    <div className={styles.sectionNames}>
      <label
        className={`${styles.sectionNameLabel} ${
          isSelected(sectionNames.ALL) ? styles.selected : ''
        }`}
        htmlFor="all"
      >
        <input
          id="all"
          className={styles.sectionNameInput}
          type="radio"
          onChange={onSectionChange}
          value={sectionNames.ALL}
          checked={isSelected(sectionNames.ALL)}
        />
        All
      </label>
      <label
        className={`${styles.sectionNameLabel} ${
          isSelected(sectionNames.FAVOURITES) ? styles.selected : ''
        }`}
        htmlFor="favourites"
      >
        <input
          id="favourites"
          className={styles.sectionNameInput}
          type="radio"
          onChange={onSectionChange}
          value={sectionNames.FAVOURITES}
          checked={isSelected(sectionNames.FAVOURITES)}
        />
        Favourites
      </label>
    </div>
  );
};

export { SectionNames, sectionNames };
