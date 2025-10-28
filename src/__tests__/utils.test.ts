// Example test file for utilities
import { formatPrice } from '@/lib/utils';

describe('formatPrice', () => {
  it('should format price correctly', () => {
    expect(formatPrice(49.99)).toBe('₹49.99');
  });
});