import { useState } from 'react';

const useCategorySelectorHook = albums => {
  const [selectedCategory, setSelectedCategory] = useState('default');

  const categories = [
    { label: 'Select category', value: 'default' },
    ...Object.values(
      albums.reduce((acc, album) => {
        const { label, 'im:id': id } = album.category.attributes;
        if (acc[id]) {
          return acc;
        }
        return { ...acc, ...{ [id]: { label, value: id } } };
      }, {}),
    ),
  ];

  const onCategoryChange = e => {
    setSelectedCategory(e.target.value);
  };

  return { selectedCategory, onCategoryChange, categories };
};

export { useCategorySelectorHook };
