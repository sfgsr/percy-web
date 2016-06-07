import Ember from 'ember';
import startApp from 'percy-web/tests/helpers/start-app';
// Import mocha helpers so that they will be included for all tests.
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import { authenticateSession } from 'percy-web/tests/helpers/ember-simple-auth';

// This import registers the percy test helpers globally.
import 'percy-web/tests/helpers/percy/register-helpers';

let application;

export default function setupAcceptance(options) {
  options = options || {autoPercySnapshot: true};

  beforeEach(function() {
    application = startApp();
  });

  // afterEach(function() {
  //   if (options.autoPercySnapshot) {
  //     percySnapshot();
  //   }
  // });


  // afterEach(function() {
  //   percySnapshot();
  // });
}

export function setupSession() {
  beforeEach(function() {
    // TODO: move this auth payload to a real fixture and make it able to be more dynamic.
    authenticateSession(application, {
      "data": {
        "id": "123",
        "type": "users",
        "attributes": {
          "login": "test-user",
          "name": "Test User",
          "email": "fake@example.com",
          "avatar-url": "https://avatars.githubusercontent.com/u/75300?v=3",
          "github-id": 75300,
          "last-synced-at": "2015-10-20T22:25:04.000Z",
          "last-private-synced-at": "2015-10-20T22:25:04.000Z",
          "created-at": "2015-10-20T18:17:13.000Z",
          "updated-at": "2016-04-13T22:16:38.000Z"
        },
        "links": {
          "self": "/api/v1/users/123"
        },
        "relationships": {
          "subscription": {
            "links": {
              "related": "/api/v1/subscription"
            },
            "data": {
              "type": "subscriptions",
              "id": "234"
            }
          }
        }
      },
      "included": [
        {
          "id": "234",
          "type": "subscriptions",
          "attributes": {
            "plan": "v1-premium-xl",
            "plan-name": "Premium XL plan",
            "plan-usage-limit": 200000,
            "plan-history-limit-days": 90,
            "current-usage": 0,
            "billing-email": "fake@example.com"
          }
        }
      ]
    })
  });
}
