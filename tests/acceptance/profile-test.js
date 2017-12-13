import setupAcceptance, {setupSession} from '../helpers/setup-acceptance';

describe('Acceptance: Profile', function() {
  setupAcceptance();

  setupSession(function(server) {
    server.create('user', {name: 'Tyrion Lannister', email: 'tyrion@lannisters.net'});
  });

  it('displays profile page', function() {
    visit('/profile/');
    percySnapshot(this.test.fullTitle() + 'before submitting');

    fillIn('.data-test-profile-edit-name input[type=text]', 'Tyrion Targaryen');
    fillIn('.data-test-profile-edit-email input[type=text]', 'tyrion@motherofdragons.biz');
    click('.data-test-profile-edit-submit input[type=submit]');

    percySnapshot(this.test.fullTitle() + 'after submitting');
  });
});
