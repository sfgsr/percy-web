import setupAcceptance, {setupSession} from '../helpers/setup-acceptance';
import ProfilePageObject from '../pages/profile';

describe('Acceptance: Profile', function() {
  setupAcceptance();

  setupSession(function(server) {
    const user = server.create('user', {name: 'Tyrion Lannister', email: 'tyrion@lannisters.net'});
    server.create('identity', 'githubIdentity', {user});
  });

  it('displays profile info page', function() {
    ProfilePageObject.visitInfoPage();

    percySnapshot(this.test.fullTitle() + 'before submitting');

    ProfilePageObject.fillInName('Tyrion Targaryen')
      .fillInEmail('tyrion@motherofdragons.biz')
      .submitInfoForm();

    percySnapshot(this.test.fullTitle() + 'after submitting');
  });

  it('displays connected-accounts info page', function() {
    ProfilePageObject.visitConnectedAccountsPage();

    percySnapshot(this.test.fullTitle() + 'without github integration');
  });
});
