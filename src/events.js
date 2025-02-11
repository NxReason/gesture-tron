export const EventT = Object.create(null);
EventT.TIMER_SET = 'TIMER_SET';
EventT.IMAGES_LOADED = 'IMAGES_LOADED';

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
