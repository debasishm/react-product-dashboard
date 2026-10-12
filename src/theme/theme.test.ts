import { describe, it, expect } from 'vitest';
import theme from './theme';

describe('theme', () => {
  it('defines primary, secondary and tertiary colors', () => {
    expect(theme.palette.primary.main).toBe('#1976d2');
    expect(theme.palette.secondary.main).toBe('#00796b');
    expect(theme.palette.tertiary.main).toBe('#ffb300');
  });

  it('uses a no-uppercase button style', () => {
    expect(theme.typography.button.textTransform).toBe('none');
  });
});
