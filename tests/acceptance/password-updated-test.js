import setupAcceptance, {setupSession} from '../helpers/setup-acceptance';
import stubLockModal from 'percy-web/tests/helpers/stub-lock-modal';

describe('Acceptance: PasswordUpdated', function() {
  setupAcceptance({authenticate: false});

  setupSession(function(server) {
    this.server = server;
    this.loginUser = false;
  });

  it('shows page with password update message', function() {
    stubLockModal(this.application);

    visit('/auth/password-updated');
    percySnapshot(this.test.fullTitle());

    click('.test-password-updated-signin-link');
    andThen(() => {
      expect(currentURL()).to.equal('/login');
    });
  });
});
