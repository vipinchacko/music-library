import { capitalize } from '../capitalize';

describe('capitalize', () => {
  it('converts input to proper case', () => {
    expect(capitalize('john')).toBe('John');
  });
});
