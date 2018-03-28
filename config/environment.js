/* eslint-env node */

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'percy-web',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },
    pageTitle: {
      separator: ' - ',
      prepend: true,
    },

    flashMessageDefaults: {
      timeout: 10000,
      extendedTimeout: 500,
      preventDuplicates: true,
    },

    APP: {
      // Don't use these directly; use utils.buildApiUrl instead.
      apiUrls: {
        logout: '/api/auth/logout',

        builds: '/api/v1/builds',
        githubIntegrationRequest: '/api/v1/organizations/%@/github-integration-request',
        passwordChangeRequest: '/api/v1/user/identities/%@/password-change-request',
        identities: '/api/v1/user/identities',
        projectsCollection: '/api/v1/organizations/%@/projects',
        projectBuilds: '/api/v1/projects/%@/builds',
        organizationUsers: '/api/v1/organizations/%@/organization-users',
        subscription: '/api/v1/organizations/%@/subscription',
        invites: '/api/v1/organizations/%@/invites',
        user: '/api/v1/user',
        userIdentity: '/api/v1/user/identities/%@',
        emailVerifications: '/api/v1/email-verifications/%@',
        baseAsset: '/api/v1/snapshots/%@/assets/base.html',
        headAsset: '/api/v1/snapshots/%@/assets/head.html',
        organizationSnapshots: '/api/v1/builds/%@/snapshots',
      },
      githubUrls: {
        integration: 'https://github.com/apps/percy/installations/new',
      },
    },

    'ember-simple-auth': {
      auth0: {
        logoutReturnToURL: '/',
      },
    },
  };

  ENV.APP.STRIPE_PUBLISHABLE_KEY = 'pk_test_N5PmOTEMBIbsZMjbxnaWthNy';
  ENV.APP.INTERCOM_APP_ID = 'itdwmqct';
  ENV.APP.GOOGLE_ANALYTICS_ID = 'UA-63384548-3';

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    if (process.env.PERCY_DEV_MIRAGE === 'yes') {
      ENV['ember-cli-mirage'] = {
        enabled: true,
        discoverEmberDataModels: true,
      };
    }
    ENV.APP.githubUrls = {
      integration: 'https://github.com/apps/percy-dev/installations/new',
    };

    ENV.APP.percyWebApiHost = process.env.PERCY_WEB_API_HOST;
    ENV.APP.percyWebAuthToken = process.env.PERCY_WEB_AUTH_TOKEN;

    ENV.APP.AMPLITUDE_USERS_INSTANCE_NAME = 'Users';
    ENV.APP.AMPLITUDE_USERS_PROJECT_ID = '5a8c0499760103fcd2754fe7d5756214';
    ENV.APP.AMPLITUDE_ORGANIZATIONS_INSTANCE_NAME = 'Organizations';
    ENV.APP.AMPLITUDE_ORGANIZATIONS_PROJECT_ID = '89f8fae9aab3fccc0740237f17e43745';
    ENV['ember-simple-auth']['auth0'].clientID = '1W3CbZu2iYnvJsilsVV2QG3DCTAcUpp3';
    ENV['ember-simple-auth']['auth0'].domain = 'percy-io-dev.auth0.com';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV['ember-tether'] = {bodyElementId: 'ember-testing'};

    ENV.percy = {
      defaultWidths: [375, 1280],
    };
    ENV['ember-simple-auth']['auth0'].clientID = 'foo';
    ENV['ember-simple-auth']['auth0'].domain = 'percy-io-test.auth0.com';
  }

  if (environment === 'production') {
    ENV.APP.STRIPE_PUBLISHABLE_KEY = 'pk_live_cmaeNcmPuMihdT3Q7QDBDMDr';
    ENV.APP.INTERCOM_APP_ID = 'm37fs4zj';
    ENV.APP.GOOGLE_ANALYTICS_ID = 'UA-63384548-1';

    ENV.APP.AMPLITUDE_USERS_INSTANCE_NAME = 'Users';
    ENV.APP.AMPLITUDE_USERS_PROJECT_ID = 'bdf4d18bc5e905549e63455b54ab40f2';
    ENV.APP.AMPLITUDE_ORGANIZATIONS_INSTANCE_NAME = 'Organizations';
    ENV.APP.AMPLITUDE_ORGANIZATIONS_PROJECT_ID = '43ed24c6891251bbbdddc310a5371afd';

    ENV.APP.SENTRY_URL = 'https://4c28a8c59c934d729d261b988d6187c3@sentry.io/235025';
    ENV['ember-simple-auth']['auth0'].clientID = '9oRqSsl0iEbVK4Zh5AGHeC7pu3ACmnN3';
    ENV['ember-simple-auth']['auth0'].domain = 'percy-io.auth0.com';

    if (process.env.VERSION) {
      ENV.APP.VERSION = process.env.VERSION;
    }
  }

  return ENV;
};
