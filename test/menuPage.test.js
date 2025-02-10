import { describe, it, expect } from 'vitest';
import { Sidebar } from '../src/sidebar';

describe('MenuPage', () => {
  it('should get parts for valid string', () => {
    expect(Sidebar.parseTimerData('1234')).toMatchObject({
      duration: 1234,
      interval: 's',
    });

    expect(Sidebar.parseTimerData('42s')).toMatchObject({
      duration: 42,
      interval: 's',
    });

    expect(Sidebar.parseTimerData('42m')).toMatchObject({
      duration: 42,
      interval: 'm',
    });

    expect(Sidebar.parseTimerData('42   m')).toMatchObject({
      duration: 42,
      interval: 'm',
    });
  });

  it('should not get parts from empty string', () => {
    expect(Sidebar.parseTimerData('')).toBeNull();
  });

  it('should not get parts from invalid string', () => {
    expect(Sidebar.parseTimerData('21q')).toBeNull();
    expect(Sidebar.parseTimerData('qwer')).toBeNull();
    expect(Sidebar.parseTimerData('qwer21s')).toBeNull();
  });
});
