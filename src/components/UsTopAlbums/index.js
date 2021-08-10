import { useEffect, useState } from 'react';

import { usTopAlbums } from '../../services/usTopAlbums';
import { useDateSelectorHook } from './DateSelectorHook';
import { useSearchHook } from './SearchHook';
import { useFilterAlbumsHook } from './FilterAlbumsHook';
import { useCategorySelectorHook } from './CategorySelectorHook';
import { useAddToFavouritesHook } from './AddToFavouriteHook';

import { AlbumCard } from '../AlbumCard';
import { SideBar } from '../SideBar';
import { SideBarHeader } from './SideBarHeader';
import { sectionNames, SectionNames } from '../SectionNames';
import { NoAlbums } from '../NoAlbums';

import { getFavourites } from '../../utils/js/favourites';
import { capitalize } from '../../utils/js/capitalize';

import filterIcon from '../../static/icons/filter.png';

import styles from './usTopAlbums.module.scss';

const UsTopAlbums = () => {
  const [topAlbums, setTopAlbums] = useState([]);
  const [favouriteAlbums, setFavouriteAlbums] = useState([]);
  const [clickedAlbum, setClickedAlbum] = useState('');
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(sectionNames.ALL);

  const { setDate, selectedDates, toDateLowerBound } = useDateSelectorHook();
  const { searchTerm, onSearchTermChange } = useSearchHook();
  const { categories, selectedCategory, onCategoryChange } =
    useCategorySelectorHook(topAlbums);
  const { onAddToFavourites } = useAddToFavouritesHook(topAlbums, setTopAlbums);

  const albumsToDisplay =
    selectedSection === sectionNames.ALL ? topAlbums : favouriteAlbums;

  const { filteredAlbums } = useFilterAlbumsHook(
    albumsToDisplay,
    selectedDates,
    searchTerm,
    selectedCategory,
  );

  useEffect(() => {
    const favourites = getFavourites();
    const favouritesIdMap = favourites.reduce((acc, favourite) => {
      return { ...acc, ...{ [favourite.id.attributes['im:id']]: true } };
    }, {});

    setFavouriteAlbums(favourites);

    async function fetchTopAlbums() {
      const topAlbums = await usTopAlbums();
      setTopAlbums(
        topAlbums.map(album => {
          if (favouritesIdMap[album.id.attributes['im:id']]) {
            return { ...album, isFavourite: true };
          }
          return album;
        }),
      );
    }
    fetchTopAlbums();
  }, []);

  const onAlbumClick = e => {
    const {
      currentTarget: { value },
    } = e;
    if (value === clickedAlbum) {
      return setClickedAlbum('');
    }
    setClickedAlbum(value);
  };

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const onSectionChange = e => {
    if (e.target.value === sectionNames.FAVOURITES) {
      setFavouriteAlbums(getFavourites());
    }
    setSelectedSection(e.target.value);
  };

  return (
    <div className={styles.content}>
      <button
        data-testid="toggleSideBar"
        className={`${styles.filterButton} ${
          isSideBarOpen ? styles.hideFilterButton : styles.showFilterButton
        }`}
        onClick={toggleSideBar}
      >
        <img
          className={styles.filterIcon}
          src={filterIcon}
          alt="filter-icon"
        ></img>
      </button>
      <section
        data-testid={isSideBarOpen ? 'sideBarOpen' : 'sideBarClosed'}
        className={`${styles.sideBar} ${
          isSideBarOpen ? styles.sideBarOpen : styles.sideBarClosed
        }`}
      >
        <SideBar
          header={<SideBarHeader onClose={toggleSideBar} />}
          toggleSideBar={toggleSideBar}
          isOpen={isSideBarOpen}
          onDateChange={setDate}
          selectedDates={selectedDates}
          toDateLowerBound={toDateLowerBound}
          searchTerm={searchTerm}
          onSearchTermChange={onSearchTermChange}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </section>
      <main
        className={`${styles.topAlbumsParent} ${
          isSideBarOpen ? styles.hideAlbums : styles.showAlbums
        }`}
      >
        <header>
          <h1 className={styles.topAlbumsHeader}>US Top Albums</h1>
        </header>
        <SectionNames
          selectedSection={selectedSection}
          onSectionChange={onSectionChange}
        />
        <div className={styles.topAlbums}>
          {!filteredAlbums.length && <NoAlbums />}
          {filteredAlbums.map(album => (
            <div
              className={styles.albumCard}
              key={album.id.attributes['im:id']}
            >
              <AlbumCard
                id={album.id.attributes['im:id']}
                label={capitalize(album['im:name'].label)}
                imgUrl={album['im:image'][2].label}
                album={capitalize(album['im:name'].label)}
                artist={capitalize(album['im:artist'].label)}
                price={album['im:price'].label}
                songCount={album['im:itemCount'].label}
                genre={album.category.attributes.label}
                showDetails={album.id.attributes['im:id'] === clickedAlbum}
                onClick={onAlbumClick}
                isFavourite={album.isFavourite}
                hideFavouriteButton={
                  selectedSection === sectionNames.FAVOURITES
                }
                onAddToFavourites={onAddToFavourites}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export { UsTopAlbums };
