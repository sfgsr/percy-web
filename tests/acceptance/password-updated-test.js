import setupAcceptance, {setupSession} from '../helpers/setup-acceptance';
import stubLockModal from 'percy-web/tests/helpers/stub-lock-modal';

describe('Acceptance: PasswordUpdated', function() {
  setupAcceptance({authenticate: false});

  it('shows page with password update message and login button', function() {
    stubLockModal(this.application);

    visit('/auth/password-updated');
    percySnapshot(this.test.fullTitle());

    click('.test-password-updated-signin-link');
    andThen(() => {
      expect(currentURL()).to.equal('/login');
    });
  });
});

describe('Acceptance: PasswordUpdated', function() {
  setupAcceptance({authenticate: true});

  setupSession(function(server) {
    server.create('user');
  });

  it('shows page with password update message and continue to profile button', function() {
    stubLockModal(this.application);

    visit('/auth/password-updated');
    percySnapshot(this.test.fullTitle());

    click('.test-password-updated-settings-link');
    andThen(() => {
      expect(currentURL()).to.equal('/settings/profile');
    });
  });
});
