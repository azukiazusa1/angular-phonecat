import { checkmark } from './checkmark';

describe('checkmark', () => {
  it('should convert boolean values to unicode checkmark or cross', () => {
    expect(checkmark(true)).toBe('\u2713');
    expect(checkmark(false)).toBe('\u2718');
  });
});
