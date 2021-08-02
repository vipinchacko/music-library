import { render } from '@testing-library/react';
import { AlbumImage } from '..';

describe('Album Image', () => {
  it('should have render an image with the right alt text and url', () => {
    const altText = 'Album Label';
    const imgUrl = 'http://album-image.com/1';

    const { getByAltText } = render(
      <AlbumImage imgUrl={imgUrl} alt={altText} />,
    );

    const image = getByAltText(altText);

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', imgUrl);
  });
});
