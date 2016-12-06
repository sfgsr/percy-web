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
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
    authenticator: 'authenticator:custom',

    APP: {
      // Don't use these directly; use utils.buildApiUrl instead.
      apiUrls: {
        login: '/api/auth/github',
        loginExtended: '/api/auth/github_extended',
        postMessageIframe: '/api/auth/post_message/iframe.html',
        logout: '/api/auth/logout',

        builds: '/api/v1/builds',
        approveBuild: '/api/v1/builds/%@/approve',
        githubIntegrationRequest: '/api/v1/organizations/%@/github-integration-request',
        projectsCollection: '/api/v1/organizations/%@/projects',
        projectBuilds: '/api/v1/projects/%@/builds',
        organizationUsers: '/api/v1/organizations/%@/organization-users',
        subscription: '/api/v1/organizations/%@/subscription',
        invites: '/api/v1/organizations/%@/invites',
      },
      githubUrls: {
        integration: 'https://github.com/integrations/percy/installations/new',
      }
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
    if (process.env.PERCY_DEV_MIRAGE === 'yes') {
      ENV.authenticator = "authenticator:test";
      ENV['ember-cli-mirage'] = {
        enabled: true
      }
    }
    ENV.APP.githubUrls = {
      integration: 'https://github.com/integrations/percy-dev/installations/new',
    }
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.STRIPE_PUBLISHABLE_KEY = 'pk_test_N5PmOTEMBIbsZMjbxnaWthNy';

    ENV.authenticator = 'authenticator:test';
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
