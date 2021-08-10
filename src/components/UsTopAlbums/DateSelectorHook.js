import { useState } from 'react';

const useDateSelectorHook = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const [toDateLowerBound, setToDateLowerBound] = useState('');

  const setDate = e => {
    const { name, value } = e.target;
    if (name === 'fromDate') {
      setFromDate(value);
      setToDateLowerBound(value);
      setToDate('');
      return;
    }

    setToDate(value);
  };

  return { setDate, selectedDates: { fromDate, toDate }, toDateLowerBound };
};

export { useDateSelectorHook };
