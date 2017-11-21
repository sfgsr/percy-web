import {beforeEach} from 'mocha';
import setupAcceptance, {setupSession} from '../helpers/setup-acceptance';
import {mockAuth0Lock} from 'percy-web/tests/helpers/ember-simple-auth-auth0';
import {authenticateSession} from 'percy-web/tests/helpers/ember-simple-auth';

describe('Acceptance: Login', function() {
  setupAcceptance({authenticate: false});

  beforeEach(function() {
    mockAuth0Lock(this.application);
  });

  setupSession(function(server) {
    this.loginUser = false;
    this.server = server;
  });

  it('should login and logout user', function() {
    visit('/');
    percySnapshot(this.test.fullTitle() + ' | Logged out');

    andThen(() => {
      this.server.create('user', {_currentLoginInTest: true});
    });

    andThen(() => {
      authenticateSession(this.application);
    });

    andThen(() => {
      expect(currentPath()).to.equal('organizations.new');
    });

    percySnapshot(this.test.fullTitle() + ' | Logged in');
  });
});
