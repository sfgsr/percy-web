/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'percy-web',
    environment: environment,
    rootURL: '/',
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
        login: '/api/auth/github',
        loginExtended: '/api/auth/github_extended',
        postMessageIframe: '/api/auth/post_message/iframe.html',
        logout: '/api/auth/logout',

        builds: '/api/v1/builds',
        approveBuild: '/api/v1/builds/%@/approve',
        enableRepo: '/api/v1/repos/%@/enable',
        disableRepo: '/api/v1/repos/%@/disable',
        subscription: '/api/v1/subscription',
      },
    },
  };

  // Intercom development/test app ID.
  ENV.APP.INTERCOM_APP_ID = 'itdwmqct';

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.STRIPE_PUBLISHABLE_KEY = 'pk_test_N5PmOTEMBIbsZMjbxnaWthNy';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.STRIPE_PUBLISHABLE_KEY = 'pk_test_N5PmOTEMBIbsZMjbxnaWthNy';

    ENV.percy = {
      defaultWidths: [375, 1280]
    }
  }

  if (environment === 'production') {
    ENV.APP.STRIPE_PUBLISHABLE_KEY = 'pk_live_cmaeNcmPuMihdT3Q7QDBDMDr';
    ENV.APP.INTERCOM_APP_ID = 'm37fs4zj';
  }

  return ENV;
};
