import setupAcceptance, {setupSession} from '../helpers/setup-acceptance';

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
    });

    click('a.LoginButton');
    andThen(() => {
      expect(currentPath()).to.equal('index');
    });

    percySnapshot(this.test.fullTitle() + ' | Logged in');
  });
});
