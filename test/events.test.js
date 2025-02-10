import { describe, it, expect, vi } from 'vitest';
import Events from '../src/events';

describe('Events', () => {
  it('should have empty map after init', () => {
    expect(Events.store).toBeDefined();
    expect(Events.store.get).toBeDefined();
    expect(Events.store.set).toBeDefined();
  });

  it('should add event listeners', () => {
    Events.store = new Map();

    Events.listen('x', x => x);
    expect(Events.store.size).toBe(1);

    Events.listen('y', y => y);
    expect(Events.store.size).toBe(2);

    Events.listen('x', x => x);
    expect(Events.store.size).toBe(2);
  });

  it('should notify correct listeners', () => {
    const h1 = vi.fn();
    const h2 = vi.fn();
    const h3 = vi.fn();

    Events.listen('x', h1);
    Events.listen('x', h2);
    Events.listen('y', h3);

    Events.notify('x');

    expect(h1).toHaveBeenCalledTimes(1);
    expect(h1).toHaveBeenCalledWith(undefined);
    expect(h2).toHaveBeenCalledTimes(1);
    expect(h2).toHaveBeenCalledWith(undefined);
    expect(h3).not.toHaveBeenCalled();

    vi.clearAllMocks();

    Events.notify('y');
    Events.notify('y');

    expect(h1).not.toHaveBeenCalled();
    expect(h2).not.toHaveBeenCalled();
    expect(h3).toHaveBeenCalledTimes(2);

    vi.clearAllMocks();

    Events.notify('x', 42);

    expect(h1).toHaveBeenCalledWith(42);
    expect(h2).toHaveBeenCalledWith(42);
  });

  it('should remove handler function', () => {
    Events.store = new Map();
    const h1 = vi.fn();
    const h2 = vi.fn();

    Events.listen('x', h1);
    Events.listen('x', h2);

    Events.notify('x');
    Events.remove('x', h1);
    Events.remove('not existing', h2);
    Events.notify('x');

    expect(h1).toHaveBeenCalledTimes(1);
    expect(h2).toHaveBeenCalledTimes(2);
    expect(Events.getListenersFor('x').length).toBe(1);
  });

  it('should clear handlers for specific event', () => {
    Events.store = new Map();

    Events.listen('x', x => x);
    Events.listen('x', x => x);
    Events.listen('y', y => y);

    expect(Events.store.size).toBe(2);
    expect(Events.getListenersFor('x').length).toBe(2);
    expect(Events.getListenersFor('y').length).toBe(1);

    let wasInStore = Events.clear('x');

    expect(wasInStore).toBe(true);
    expect(Events.store.size).toBe(1);
    expect(Events.getListenersFor('x')).toBeUndefined();
    expect(Events.getListenersFor('y').length).toBe(1);

    wasInStore = Events.clear('not existing');
    expect(wasInStore).toBe(false);

    Events.listen('x', x => x);
    expect(Events.store.size).toBe(2);
  });

  it('should return listeners for specific event', () => {
    Events.store = new Map();

    Events.listen('x', x => x);
    Events.listen('x', x => x);
    Events.listen('y', y => y);

    expect(Events.getListenersFor('x').length).toBe(2);
    expect(Events.getListenersFor('y').length).toBe(1);
  });
});
