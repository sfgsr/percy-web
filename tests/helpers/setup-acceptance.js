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
import testUserFixture from 'percy-web/mirage/fixtures/user';

// This import registers the percy test helpers globally.
import '../helpers/percy/register-helpers';

let application;

export default function setupAcceptance() {
  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    Ember.run(application, 'destroy');
  });
}

export function setupSession() {
  beforeEach(function() {
    authenticateSession(application, testUserFixture);
  });
}
