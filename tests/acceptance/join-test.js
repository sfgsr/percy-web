import setupAcceptance, {
  setupSession, renderAdapterErrorsAsPage
} from '../helpers/setup-acceptance';

describe('Acceptance: Join', function() {
  setupAcceptance();

  setupSession(function (server) {
    let user = server.create('user', {name: 'Test user', id: 'test_user'});
    let organization = server.create('organization', {name: 'Test org'});
    server.create('organizationUser', {user: user, organization: organization});
    let anotherOrganization = server.create('organization', {name: 'Other org'});
    server.create('invite', {id: 'valid-code', organization: anotherOrganization});
    server.create('invite', {id: 'expired-code', isExpired: true});
    this.loginUser = user;
  });

  it('expired rejected', function () {
    visit('/join/expired-code');
    andThen(() => {
      expect(currentPath()).to.equal('join');
    });
    return percySnapshot(this.test.fullTitle());
  });

  it('invalid rejected', function() {
    renderAdapterErrorsAsPage(() => {
      visit('/join/invalid-code');
      andThen(() => {
        expect(currentPath()).to.equal('error');
      });
      return percySnapshot(this.test.fullTitle());
    });
  });

  it('valid accepted', function() {
    visit('/join/valid-code');
    andThen(() => {
      expect(currentPath()).to.equal('join');
    });
    percySnapshot(this.test.fullTitle());

    click('.InvitationHandler button:contains("Accept invitation")');
    andThen(() => {
      expect(currentPath()).to.equal('organization.index');
    });
    percySnapshot(this.test.fullTitle() + ' | Into organization');
  });
});
