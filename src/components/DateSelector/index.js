import styles from './DateSelector.module.scss';

const DateSelector = ({ name, min, max, selectedDate, onDateChange }) => {
  return (
    <input
      name={name}
      type="date"
      value={selectedDate}
      min={min}
      max={max}
      onChange={onDateChange}
      className={styles.dateSelector}
      aria-label="Set release date"
    ></input>
  );
};

export { DateSelector };
