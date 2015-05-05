import config from '../config/environment';

export default {
  name: 'canary-api-override',
  before: 'simple-auth',
  initialize: function() {
    // Override the base API URL if we are in canary.
    if (window.location.origin === 'https://canary.perceptual-ci.com') {
      config.APP.apiUrls.base = 'https://canary-api.perceptual-ci.com';
    }
  },
};
