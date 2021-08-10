import { render, fireEvent } from '@testing-library/react';
import { within } from '@testing-library/react';
import { get } from 'axios';
import { UsTopAlbums } from '../index';

import { usTopAlbums200Response } from '../../../services/mockData/usTopAlbums';
import { addToFavourites } from '../../../utils/js/favourites';

jest.mock('axios');

describe('Us top albums component', () => {
  describe('When api call responds with status 200 and top albums', () => {
    beforeEach(() => {
      get.mockImplementation(() => Promise.resolve(usTopAlbums200Response));
    });

    it('should display the header - US Top Albums', async () => {
      const { findByText } = render(<UsTopAlbums />);
      const header = await findByText('US Top Albums');

      expect(header).toBeInTheDocument();
    });

    it('should display tabs to visit sections All and Favorites', async () => {
      const { findByText } = render(<UsTopAlbums />);
      const tab1 = await findByText('All');
      const tab2 = await findByText('Favourites');

      expect(tab1).toBeInTheDocument();
      expect(tab2).toBeInTheDocument();
    });

    it('should display the top albums', async () => {
      const { findAllByLabelText } = render(<UsTopAlbums />);

      const albums = await findAllByLabelText('album card');

      expect(albums.length).toBe(4);
    });

    it('should display the text Search by artist or album on the sidebar', async () => {
      const { findByText } = render(<UsTopAlbums />);
      const searchBarLabel = await findByText('Search by artist or album');

      expect(searchBarLabel).toBeInTheDocument();
    });

    it('should display the text Release date between on the sidebar', async () => {
      const { findByText } = render(<UsTopAlbums />);
      const dateFilterLabel = await findByText('Release date between');

      expect(dateFilterLabel).toBeInTheDocument();
    });

    it('should display the text Category on the sidebar', async () => {
      const { findByText } = render(<UsTopAlbums />);
      const categorySelectorLabel = await findByText('Category');

      expect(categorySelectorLabel).toBeInTheDocument();
    });

    describe('When user enters some text in the search bar', () => {
      it('returns albums that have matching artist or album name', async () => {
        const { findByLabelText, findAllByLabelText } = render(<UsTopAlbums />);
        const searchBar = await findByLabelText('search by artist or album');

        fireEvent.change(searchBar, { target: { value: 'Welcome 2' } });

        const albums = await findAllByLabelText('album card');

        expect(albums.length).toBe(1);
      });
    });

    describe('When user selects a start and end value for release date', () => {
      it('returns albums that have release date matching or in between the selected dates', async () => {
        const { findAllByLabelText } = render(<UsTopAlbums />);
        const [fromDateInput, toDateInput] = await findAllByLabelText(
          'Set release date',
        );

        fireEvent.change(fromDateInput, { target: { value: '2021-07-09' } });
        fireEvent.change(toDateInput, { target: { value: '2021-07-20' } });

        const albums = await findAllByLabelText('album card');

        expect(albums.length).toBe(2);
      });
    });

    describe('When user selects a category', () => {
      it('returns albums that fall under selected category', async () => {
        const { findByLabelText, findAllByLabelText } = render(<UsTopAlbums />);
        const categoryDropdown = await findByLabelText('Select category');

        fireEvent.change(categoryDropdown, { target: { value: '21' } });

        const albums = await findAllByLabelText('album card');

        expect(albums.length).toBe(2);
      });
    });

    describe('When user clicks on the add to favourite icon on any album', () => {
      it('adds that album to favourites', async () => {
        const { findAllByLabelText, findAllByTestId, findByText } = render(
          <UsTopAlbums />,
        );

        const addToFavouriteIcons = await findAllByTestId('addToFavourite');
        fireEvent.click(addToFavouriteIcons[0]);

        const favouritesTab = await findByText('Favourites');
        fireEvent.click(favouritesTab);

        const albums = await findAllByLabelText('album card');

        expect(albums.length).toBe(1);
      });
    });

    describe('When user clicks the favourite icon on an album that has already been added to favourite', () => {
      it('removes that album from favourites', async () => {
        const { findAllByLabelText, findAllByTestId, findByText } = render(
          <UsTopAlbums />,
        );

        const addToFavouriteIcons = await findAllByTestId('addToFavourite');
        fireEvent.click(addToFavouriteIcons[0]);

        const favouritesTab = await findByText('Favourites');
        fireEvent.click(favouritesTab);

        const albums = await findAllByLabelText('album card');

        expect(albums.length).toBe(1);

        const allAlbumsTab = await findByText('All');
        fireEvent.click(allAlbumsTab);

        const removeFavouriteIcons = await findAllByTestId('favourite');

        fireEvent.click(removeFavouriteIcons[0]);
        fireEvent.click(favouritesTab);

        const noAlbumsText = await findByText('No albums to display');

        expect(noAlbumsText).toBeInTheDocument();
      });
    });

    describe('When user adds a second album to favourites', () => {
      it('displays both albums in the favourites tab', async () => {
        const { findAllByLabelText, findAllByTestId, findByText } = render(
          <UsTopAlbums />,
        );

        const addToFavouriteIcons = await findAllByTestId('addToFavourite');
        fireEvent.click(addToFavouriteIcons[0]);
        fireEvent.click(addToFavouriteIcons[1]);

        const favouritesTab = await findByText('Favourites');
        fireEvent.click(favouritesTab);

        const albums = await findAllByLabelText('album card');

        expect(albums.length).toBe(2);
      });
    });

    describe('When a favourite album is already present in session storage on page load', () => {
      it('displays that album in the favourites tab', async () => {
        addToFavourites(usTopAlbums200Response.data.feed.entry[0]);
        const { findAllByLabelText, findByText } = render(<UsTopAlbums />);

        const favouritesTab = await findByText('Favourites');
        fireEvent.click(favouritesTab);

        const albums = await findAllByLabelText('album card');

        expect(albums.length).toBe(1);
      });
    });

    describe('When user clicks on an album card', () => {
      it('displays additional info like price, category and number of songs in the album', async () => {
        const { findAllByLabelText, findByText } = render(<UsTopAlbums />);
        const albums = await findAllByLabelText('album card');

        fireEvent.click(albums[0]);

        const price = await findByText(
          usTopAlbums200Response.data.feed.entry[0]['im:price'].label,
        );

        const songCount = await findByText(
          `${usTopAlbums200Response.data.feed.entry[0]['im:itemCount'].label} Songs`,
        );

        const category = await within(albums[0]).findByText(
          usTopAlbums200Response.data.feed.entry[0].category.attributes.label,
        );

        expect(price).toBeInTheDocument();

        expect(songCount).toBeInTheDocument();

        expect(category).toBeInTheDocument();
      });
    });

    describe('When user clicks on an album card whose details are already shown', () => {
      it('hides the additional info like price, category and number of songs in the album', async () => {
        const { findAllByLabelText, queryByText } = render(<UsTopAlbums />);
        const albums = await findAllByLabelText('album card');

        fireEvent.click(albums[0]);

        const price = await within(albums[0]).findByText(
          usTopAlbums200Response.data.feed.entry[0]['im:price'].label,
        );

        const songCount = await within(albums[0]).findByText(
          `${usTopAlbums200Response.data.feed.entry[0]['im:itemCount'].label} Songs`,
        );

        const category = await within(albums[0]).findByText(
          usTopAlbums200Response.data.feed.entry[0].category.attributes.label,
        );

        expect(price).toBeInTheDocument();
        expect(songCount).toBeInTheDocument();
        expect(category).toBeInTheDocument();

        fireEvent.click(albums[0]);

        const priceHidden = queryByText(
          usTopAlbums200Response.data.feed.entry[0]['im:price'].label,
        );

        const songCountHidden = queryByText(
          `${usTopAlbums200Response.data.feed.entry[0]['im:itemCount'].label} Songs`,
        );

        const categoryHidden = within(albums[0]).queryByText(
          usTopAlbums200Response.data.feed.entry[0].category.attributes.label,
        );

        expect(priceHidden).not.toBeInTheDocument();
        expect(songCountHidden).not.toBeInTheDocument();
        expect(categoryHidden).not.toBeInTheDocument();
      });
    });
  });

  describe('When close button on side bar is clicked in mobile view', () => {
    beforeEach(() => {
      get.mockImplementation(() => Promise.resolve(usTopAlbums200Response));
    });

    it('closes side bar', async () => {
      const { findByTestId } = render(<UsTopAlbums />);
      const closeButton = await findByTestId('closeButton');

      fireEvent.click(closeButton);
      fireEvent.click(closeButton);

      expect(await findByTestId('sideBarClosed')).toBeInTheDocument();
    });
  });
});
