import setupAcceptance, { setupSession } from '../helpers/setup-acceptance';

describe('Acceptance: Login', function() {
  setupAcceptance();
  setupSession(function (server) {
    this.loginUser = false;
    this.server = server;
  });
  it ('should login and logout user', function () {
    visit('/');
    percySnapshot(this.test.fullTitle() + ' | Logged out');

    andThen(() => {
      this.server.create('user', {_currentLoginInTest: true});
    })
    click('a.LoginButton');
    andThen(() => {
      expect(currentPath()).to.equal('index');
    });
    percySnapshot(this.test.fullTitle() + ' | Logged in');

    // Logout flow.
    visit('/account');
    andThen(() => {
      expect(currentPath()).to.equal('account');
    });
    percySnapshot(this.test.fullTitle() + ' | Account');

    click('a:contains("Logout")');
    andThen(() => {
      expect(currentPath()).to.equal('account');
      expect(
        server.schema.users.first()._currentLoginInTest
      ).to.equal(false);
    });
  });
});
