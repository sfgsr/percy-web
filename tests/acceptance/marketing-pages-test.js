import setupAcceptance from '../helpers/setup-acceptance';

describe('Acceptance: Marketing pages', function() {
  setupAcceptance();

  it('can visit /', function() {
    visit('/');
    andThen(() => { expect(currentPath()).to.equal('index'); });
    percySnapshot(this.test);
  });
  it('can visit /pricing', function() {
    visit('/pricing');
    andThen(() => { expect(currentPath()).to.equal('pricing'); });
    percySnapshot(this.test);
  });
  it('can visit /docs', function() {
    visit('/docs');
    andThen(() => { expect(currentPath()).to.equal('docs.index'); });
    percySnapshot(this.test);
  });
  it('can visit /privacy', function() {
    visit('/privacy');
    andThen(() => { expect(currentPath()).to.equal('privacy'); });
    percySnapshot(this.test);
  });
  it('can visit /terms', function() {
    visit('/terms');
    andThen(() => { expect(currentPath()).to.equal('terms'); });
    percySnapshot(this.test);
  });
});
