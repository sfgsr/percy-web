/* jshint expr:true */
import {setupComponentTest} from 'ember-mocha';
import {expect} from 'chai';
import {it, describe, beforeEach} from 'mocha';
import {percySnapshot} from 'ember-percy';
import hbs from 'htmlbars-inline-precompile';
import {make, manualSetup} from 'ember-data-factory-guy';

describe('Integration: ConnectedAccountsPanel', function() {
  setupComponentTest('connected-accounts-panel', {
    integration: true,
  });

  beforeEach(function() {
    manualSetup(this.container);
  });

  describe('when a user has a github identity', function() {
    it('displays correctly', function() {
      const user = make('user');
      const identity = make('identity', 'githubProvider', {user});
      this.set('identities', [identity]);
      this.render(hbs`{{connected-accounts-panel identities=identities}}`);
      percySnapshot(this.test.fullTitle(), this.$());
    });

    it.skip('does the right thing when the disconnect button is clicked', function() {
      return expect(false).to.be.true;
    });
  });

  describe('when a user has an email/password identity', function() {
    it('displays correctly', function() {
      const user = make('user');
      const identity = make('identity', 'auth0Provider', {user});
      this.set('identities', [identity]);
      this.render(hbs`{{connected-accounts-panel identities=identities}}`);
      percySnapshot(this.test.fullTitle(), this.$());
    });

    it.skip('does the right thing when the disconnect button is clicked', function() {
      return expect(false).to.be.true;
    });
  });

  describe('when a user has both an email/password identity and a github identity', function() {
    it('displays correctly', function() {
      const user = make('user');
      const auth0Identity = make('identity', 'auth0Provider', {user});
      const githubIdentity = make('identity', 'auth0Provider', {user});
      this.set('identities', [auth0Identity, githubIdentity]);
      this.render(hbs`{{connected-accounts-panel identities=identities}}`);
      percySnapshot(this.test.fullTitle(), this.$());
    });

    it.skip('does the right thing when the disconnect button is clicked', function() {
      return expect(false).to.be.true;
    });
  });
});
