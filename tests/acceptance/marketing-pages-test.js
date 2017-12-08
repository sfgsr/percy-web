import setupAcceptance, {setupSession} from '../helpers/setup-acceptance';

describe('Acceptance: Marketing pages', function() {
  function visitAllMarketingPages({takeSnapshot = false}) {
    it('can visit /', function() {
      visit('/');
      andThen(() => expect(currentPath()).to.equal('index'));
      percySnapshot(this.test);
    });
    it('can visit /pricing', function() {
      visit('/pricing');
      andThen(() => expect(currentPath()).to.equal('pricing'));
      if (takeSnapshot) {
        percySnapshot(this.test);
      }
    });
    it('can visit /docs', function() {
      visit('/docs');
      andThen(() => expect(currentPath()).to.equal('docs.index'));
      if (takeSnapshot) {
        percySnapshot(this.test);
      }
    });
    it('can visit /team', function() {
      visit('/team');
      andThen(() => expect(currentPath()).to.equal('team'));
      if (takeSnapshot) {
        percySnapshot(this.test);
      }
    });
    it('can visit /security', function() {
      visit('/security');
      andThen(() => expect(currentPath()).to.equal('security'));
      if (takeSnapshot) {
        percySnapshot(this.test);
      }
    });
    it('can visit /terms', function() {
      visit('/terms');
      andThen(() => expect(currentPath()).to.equal('terms'));
      if (takeSnapshot) {
        percySnapshot(this.test);
      }
    });
    it('can visit /privacy', function() {
      visit('/privacy');
      andThen(() => expect(currentPath()).to.equal('privacy'));
      if (takeSnapshot) {
        percySnapshot(this.test);
      }
    });
  }

  context('user is unauthenticated', function() {
    setupAcceptance({authenticate: false});

    visitAllMarketingPages({takeSnapshot: true});
  });

  context('user is authenticated', function() {
    setupAcceptance({authenticate: true});

    setupSession(function(server) {
      server.create('user');
    });

    visitAllMarketingPages({takeSnapshot: false});
  });
});
