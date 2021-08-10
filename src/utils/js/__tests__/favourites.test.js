import { addToFavourites, removeFavourite } from '../favourites';

describe('favourites', () => {
  describe('add to favourites', () => {
    describe('when no album is passed as input', () => {
      it('returns undefined', () => {
        expect(addToFavourites()).toBeUndefined();
      });
    });
  });

  describe('remove favourite', () => {
    describe('when no album id is passed as input', () => {
      it('returns undefined', () => {
        expect(removeFavourite()).toBeUndefined();
      });
    });

    describe('when no favourites have been added', () => {
      it('returns undefined', () => {
        expect(removeFavourite('123')).toBeUndefined();
      });
    });
  });
});
