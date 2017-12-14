import setupAcceptance, {setupSession} from '../helpers/setup-acceptance';
import ProfilePageObject from '../pages/profile';

describe('Acceptance: Profile', function() {
  setupAcceptance();

  setupSession(function(server) {
    server.create('user', {name: 'Tyrion Lannister', email: 'tyrion@lannisters.net'});
  });

  it('displays profile info page', function() {
    ProfilePageObject.visitInfoPage();

    percySnapshot(this.test.fullTitle() + 'before submitting');

    ProfilePageObject.fillInName('Tyrion Targaryen')
      .fillInEmail('tyrion@motherofdragons.biz')
      .submitInfoForm();

    percySnapshot(this.test.fullTitle() + 'after submitting');
  });

  it('displays profile info page', function() {
    ProfilePageObject.visitConnectedAccountsPage();

    percySnapshot(this.test.fullTitle() + 'without github integration');

    // TODO add test for what it looks like when there is a connected github account
  });
});
