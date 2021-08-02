import { render } from '@testing-library/react';
import { AlbumInfo } from '..';

describe('Album Info', () => {
  it('should display artist and album name', () => {
    const artist = 'John';
    const album = '2000 Hits';

    const { getByText } = render(<AlbumInfo album={album} artist={artist} />);

    const artistName = getByText(artist);
    const albumName = getByText(album);

    expect(artistName).toBeInTheDocument();
    expect(albumName).toBeInTheDocument();
  });
});
