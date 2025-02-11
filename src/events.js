export const EventType = Object.create(null);
EventType.TIMER_SET = 'TIMER_SET';
EventType.IMAGES_LOADED = 'IMAGES_LOADED';
EventType.START_SESSION = 'START_SESSION';
EventType.END_SESSION = 'END_SESSION';
EventType.SLIDE_END = 'SLIDE_END';

const Events = {
  store: new Map(), // string: [func]
  notify(name, payload) {
    const handlers = this.store.get(name) ?? [];
    handlers.forEach(handle => handle(payload));
  },
  listen(name, fn) {
    let handlers = this.store.get(name);
    if (!handlers) {
      this.store.set(name, []);
      handlers = this.store.get(name);
    }
    this.store.set(name, [...handlers, fn]);
  },

  getListenersFor(name) {
    return this.store.get(name);
  },

  remove(name, fn) {
    const handlers = this.store.get(name);
    if (!handlers) return;

    const filtered = handlers.filter(h => h !== fn);
    this.store.set(name, filtered);
  },

  clear(name) {
    return this.store.delete(name);
  },
};

export default Events;
