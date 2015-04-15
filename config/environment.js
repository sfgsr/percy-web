/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'perceptual-ui',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
    },

    APP: {
      // Don't use these directly; use utils.buildApiUrl instead.
      apiUrls: {
        base: null,  // Set by environment.

        login: '/auth/github',
        postMessageIframe: '/auth/post_message/iframe.html',

        resources: '/v1/resources/',
        builds: '/v1/builds/',
        approveBuild: '/v1/builds/%@/approve',
      },
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.apiUrls.base = 'http://localhost:3000';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.apiUrls.base = 'https://api.perceptual-ci.com';
  }

  return ENV;
};
