import { CategorySelector } from '../CategorySelector';
import { DateSelector } from '../DateSelector';
import { SearchBar } from '../SearchBar';

import styles from './SideBar.module.scss';

const SideBar = ({
  header,
  onDateChange,
  selectedDates,
  toDateLowerBound,
  searchTerm,
  onSearchTermChange,
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className={styles.sideBar}>
      {header}
      <div className={styles.searchBar}>
        <span className={styles.searchBarLabel}>Search by artist or album</span>
        <SearchBar
          searchTerm={searchTerm}
          onSearchTermChange={onSearchTermChange}
        />
      </div>
      <div className={styles.dateFilter}>
        <span className={styles.dateSelectorLabel}>Release date between</span>
        <div className={styles.fromDateSelector}>
          <DateSelector
            onDateChange={onDateChange}
            name="fromDate"
            selectedDate={selectedDates.fromDate}
          />
        </div>
        <div className={styles.toDateSelector}>
          <DateSelector
            onDateChange={onDateChange}
            name="toDate"
            selectedDate={selectedDates.toDate}
            min={toDateLowerBound}
          />
        </div>
      </div>
      <div className={styles.categorySelector}>
        <span className={styles.categorySelectorLabel}>Category</span>
        <CategorySelector
          name="category-selector"
          options={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>
    </div>
  );
};

export { SideBar };
