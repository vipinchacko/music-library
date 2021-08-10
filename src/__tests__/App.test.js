import { render } from '@testing-library/react';
import { get } from 'axios';

import App from '../App';
import { usTopAlbums200Response } from '../services/mockData/usTopAlbums';

jest.mock('axios');

describe('App', () => {
  beforeEach(() => {
    get.mockImplementation(() => Promise.resolve(usTopAlbums200Response));
  });

  it('should render correctly', async () => {
    const { findByText } = render(<App />);
    const header = await findByText('US Top Albums');

    expect(header).toBeInTheDocument();
  });
});
