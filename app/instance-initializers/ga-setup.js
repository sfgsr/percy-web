import config from '../config/environment';

export default {
  name: 'ga-setup',
  initialize() {
    if (window.ga) {
      window.ga('create', config.APP.GOOGLE_ANALYTICS_ID, 'auto');
    }
  },
};
