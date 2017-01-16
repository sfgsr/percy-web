import config from '../config/environment';

export default {
  name: 'heap-setup',
  initialize() {
    if (window.heap) {
      window.heap.load(config.APP.HEAP_APP_ID);
    }
  },
};
