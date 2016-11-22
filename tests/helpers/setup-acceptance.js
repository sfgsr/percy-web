import Ember from 'ember';
import startApp from 'percy-web/tests/helpers/start-app';
import destroyApp from 'percy-web/tests/helpers/destroy-app';
// Import mocha helpers so that they will be included for all tests.
/* jshint unused:false */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';

// This import registers the percy test helpers globally.
import '../helpers/percy/register-helpers';

export default function setupAcceptance() {
  beforeEach(function() {
    this.application = startApp();
    window.localStorage.clear();
  });

  afterEach(function() {
    destroyApp(this.application);
    this.application = null;
  });
}
