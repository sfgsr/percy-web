import setupAcceptance, {setupSession} from '../helpers/setup-acceptance';
import stubLockModal from 'percy-web/tests/helpers/stub-lock-modal';

describe('Acceptance: EmailVerification', function() {
  setupAcceptance({authenticate: false});

  setupSession(function(server) {
    this.loginUser = false;
    this.server = server;
  });

  it('shows page with email verification required message ', function() {
    visit('/auth/email-verification-required');
    percySnapshot(this.test.fullTitle());
  });

  it('shows page with email verification success', function() {
    stubLockModal(this.application);
    visit('/auth/verify-email?code=goodCode');
    percySnapshot(this.test.fullTitle());
    click('.test-verify-email-signin-link');
    andThen(() => {
      expect(currentURL()).to.equal('/login');
    });
  });

  it('shows page with email verification failure', function() {
    visit('/auth/verify-email?code=badCode');
    percySnapshot(this.test.fullTitle());
  });
});
