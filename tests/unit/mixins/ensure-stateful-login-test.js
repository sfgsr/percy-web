/* eslint-disable no-unused-expressions */
import Ember from 'ember';
import {expect} from 'chai';
import {it, describe, beforeEach, afterEach} from 'mocha';
import sinon from 'sinon';
import EnsureStatefulLogin from 'percy-web/mixins/ensure-stateful-login';
import {startMirage} from 'percy-web/initializers/ember-cli-mirage';
import lockOptions from 'percy-web/lib/lock-settings';

describe('EnsureStatefulLoginMixin', function() {
  describe('showLoginModalEnsuringState', function() {
    let subject;
    let fakeMethod;
    let authenticateStub;
    const fakeStateToken = 'fakeStateToken';

    beforeEach(function() {
      fakeMethod = sinon.stub();
      authenticateStub = sinon.stub();
      this.server = startMirage();
      this.server.namespace = '';
      this.server.get('/api/auth/session', () => {
        fakeMethod();
        return {state: fakeStateToken};
      });

      subject = Ember.Object.extend(EnsureStatefulLogin).create({
        session: Ember.Object.create({
          authenticate: authenticateStub,
        }),
      });
    });

    afterEach(function() {
      window.server.shutdown();
    });

    it('gets a state token, sets it on lock options, and calls authenticate', function() {
      const promise = subject.showLoginModalEnsuringState();

      return promise.then(() => {
        expect(fakeMethod, 'it should fetch the state token').to.have.been.called;
        expect(
          lockOptions.auth.params.state,
          'it should update the state param in lock options',
        ).to.equal(fakeStateToken);
        expect(authenticateStub, 'it should call the authenticate method').to.have.been.calledWith(
          'authenticator:auth0-lock',
          lockOptions,
        );
      });
    });
  });
});
