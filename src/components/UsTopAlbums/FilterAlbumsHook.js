const useFilterAlbumsHook = (
  albums,
  selectedDates,
  searchTerm,
  selectedCategory,
) => {
  const filteredAlbumsByDate = albums.filter(album => {
    const { fromDate, toDate } = selectedDates;
    const releaseDate = album['im:releaseDate'].label.split('T')[0];

    if (fromDate && toDate) {
      return releaseDate >= fromDate && releaseDate <= toDate;
    }

    if (fromDate) {
      return releaseDate >= fromDate;
    }

    return album;
  });

  const filteredAlbumsBySearchTerm = filteredAlbumsByDate.filter(album => {
    return (
      album['im:name'].label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album['im:artist'].label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filteredAlbumsByCategory =
    selectedCategory === 'default'
      ? filteredAlbumsBySearchTerm
      : filteredAlbumsBySearchTerm.filter(album => {
          return album.category.attributes['im:id'] === selectedCategory;
        });

  return { filteredAlbums: filteredAlbumsByCategory };
};

export { useFilterAlbumsHook };
