import { useState } from 'react';

const useSearchHook = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const onSearchTermChange = e => {
    setSearchTerm(e.target.value);
  };

  return { searchTerm, onSearchTermChange };
};

export { useSearchHook };
