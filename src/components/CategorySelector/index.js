import styles from './CategorySelector.module.scss';

const CategorySelector = ({
  name,
  options,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <select
      className={styles.categorySelector}
      name={name}
      onChange={onCategoryChange}
      aria-label="Select category"
    >
      {options.map(option => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export { CategorySelector };
