import {it, describe, beforeEach} from 'mocha';
import {setupComponentTest} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import {percySnapshot} from 'ember-percy';
import PUSPPO from 'percy-web/tests/pages/components/password-updated-status-panel';

describe('Integration: PasswordUpdatedStatusPanel', function() {
  setupComponentTest('password-updated-status-panel', {
    integration: true,
  });

  beforeEach(function() {
    PUSPPO.setContext(this);
  });

  describe('when success is true', function() {
    it('renders success panel', function() {
      this.set('success', 'true');
      this.render(hbs`{{password-updated-status-panel
        success=success
      }}`);

      expect(PUSPPO.isSuccessIconPresent, 'success icon should be visible').to.equal(true);
      expect(PUSPPO.isFailIconPresent, 'failure icon should not be visible').to.equal(false);

      percySnapshot(this.test.fullTitle(), this.$());
    });

    it('renders "Continue to Profile" button when user is logged in', function() {
      this.set('success', 'true');
      this.set('currentUser', 'something is present');
      this.render(hbs`{{password-updated-status-panel
        success=success
        currentUser=currentUser
      }}`);

      expect(PUSPPO.isSettingsButtonVisible).to.equal(true);
      expect(PUSPPO.isSigninButtonVisible).to.equal(false);

      percySnapshot(this.test.fullTitle(), this.$());
    });

    it('renders "Sign in" button when user is not logged in', function() {
      this.set('success', 'true');
      this.set('currentUser', null);
      this.render(hbs`{{password-updated-status-panel
        success=success
        currentUser=currentUser
      }}`);

      expect(PUSPPO.isSigninButtonVisible).to.equal(true);
      expect(PUSPPO.isSettingsButtonVisible).to.equal(false);

      percySnapshot(this.test.fullTitle(), this.$());
    });
  });
  describe('when success is false', function() {
    it('renders failure panel', function() {
      this.set('success', 'false');
      this.render(hbs`{{password-updated-status-panel success=success}}`);

      expect(PUSPPO.isSuccessIconPresent, 'expect success icon to be visible').to.equal(false);
      expect(PUSPPO.isFailIconPresent, 'expect failure to not be visible').to.equal(true);

      percySnapshot(this.test.fullTitle(), this.$());
    });

    it('renders "Continue to Profile" button when user is logged in', function() {
      this.set('success', 'false');
      this.set('currentUser', 'something is present');
      this.render(hbs`{{password-updated-status-panel
        success=success
        currentUser=currentUser
      }}`);

      expect(PUSPPO.isSettingsButtonVisible).to.equal(true);
      expect(PUSPPO.isSigninButtonVisible).to.equal(false);

      percySnapshot(this.test.fullTitle(), this.$());
    });

    it('renders "Sign in" button when user is not logged in', function() {
      this.set('success', 'false');
      this.set('currentUser', null);
      this.render(hbs`{{password-updated-status-panel
        success=success
        currentUser=currentUser
      }}`);

      expect(PUSPPO.isSigninButtonVisible).to.equal(true);
      expect(PUSPPO.isSettingsButtonVisible).to.equal(false);

      percySnapshot(this.test.fullTitle(), this.$());
    });
  });
});
