import setupAcceptance, {setupSession} from '../helpers/setup-acceptance';
import stubLockModal from 'percy-web/tests/helpers/stub-lock-modal';

describe('Acceptance: EmailVerification', function() {
  setupAcceptance({authenticate: false});

  setupSession(function(server) {
    this.loginUser = false;
    this.server = server;
  });

  it('shows page with email verification required message ', async function() {
    await visit('/auth/email-verification-required');
    await percySnapshot(this.test.fullTitle());
  });

  it('shows page with email verification success', async function() {
    stubLockModal(this.application);
    await visit('/auth/verify-email?code=goodCode');
    await percySnapshot(this.test.fullTitle());
    await click('.test-verify-email-signin-link');
    expect(currentURL()).to.equal('/login');
  });

  it('shows page with email verification failure', async function() {
    await visit('/auth/verify-email?code=badCode');
    await percySnapshot(this.test.fullTitle());
  });
});
