import setupAcceptance, {setupSession} from '../helpers/setup-acceptance';
import PasswordChangeRequest from '../pages/components/password-change-request';

describe('Acceptance: PasswordChangeRequest', function() {
  setupAcceptance({authenticate: true});

  setupSession(function(server) {
    const user = server.create('user', 'withAuth0Identity');
    this.user = user;
  });

  it('shows page with change password button', function() {
    PasswordChangeRequest.visitUserSettingsPage();
    andThen(() => {
      expect(PasswordChangeRequest.isPasswordChangeMessagePresent).to.equal(false);
      expect(PasswordChangeRequest.isPasswordChangeButtonPresent).to.equal(true);
    });

    percySnapshot(this.test.fullTitle());
  });

  it('shows page with change password sent message', function() {
    PasswordChangeRequest.visitUserSettingsPage();
    andThen(() => {
      PasswordChangeRequest.submitRequest();
    });
    andThen(() => {
      expect(PasswordChangeRequest.isPasswordChangeMessagePresent).to.equal(true);
      expect(PasswordChangeRequest.changePasswordMessageContains(this.user.email)).to.equal(true);
    });

    percySnapshot(this.test.fullTitle());
  });
});
