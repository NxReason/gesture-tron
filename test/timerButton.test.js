import { describe, expect, it } from 'vitest';
import {
  createTimerButtonData,
  createTimerButton,
  isValidData,
} from '../src/timerButton';

describe('createTimerButtonData', () => {
  it('returns null on invalid interval', () => {
    const result = createTimerButtonData(30, 'h');

    expect(result).toBeNull();
  });

  it('should parse seconds correctly', () => {
    const result = createTimerButtonData(30, 's');

    expect(result.duration).toBe(30);
    expect(result.interval).toBe('s');
    expect(result.seconds).toBe(30);
  });

  it('should parse minutes correctly', () => {
    const result = createTimerButtonData(5, 'm');

    expect(result.duration).toBe(5);
    expect(result.interval).toBe('m');
    expect(result.seconds).toBe(300);
  });
});

describe('createTimerButton', () => {
  it('should return li element with 2 spans', () => {
    const result = createTimerButton(createTimerButtonData(45, 's'));

    expect(result.childElementCount).toBe(2);
  });

  it('should have correct values in child nodes', () => {
    const result = createTimerButton(createTimerButtonData(5, 'm'));

    expect(result.childNodes[0].textContent).toBe('5');
    expect(result.childNodes[1].textContent).toBe('m');
  });
});

describe('isValidData', () => {
  it('should return false if argument is null', () => {
    const result = isValidData(null);

    expect(result).toBe(false);
  });

  it('should return false if duration is not a number', () => {
    const result = isValidData({ duration: 'string' });

    expect(result).toBe(false);
  });
});
