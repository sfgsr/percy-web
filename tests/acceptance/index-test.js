import setupAcceptance, { setupSession } from '../helpers/setup-acceptance';
import Ember from 'ember';
import config from '../../config/environment';

describe('Acceptance: Marketing pages', function() {
  setupAcceptance();

  it('can visit /', function() {
    visit('/');
    andThen(() => { expect(currentPath()).to.equal('index'); });
    percySnapshot(this.test.fullTitle());
  });
  it('can visit /pricing', function() {
    visit('/pricing');
    andThen(() => { expect(currentPath()).to.equal('pricing'); });
    percySnapshot(this.test.fullTitle());
  });
  it('can visit /docs', function() {
    visit('/docs');
    andThen(() => { expect(currentPath()).to.equal('docs.index'); });
    percySnapshot(this.test.fullTitle());
  });
  it('can visit /privacy', function() {
    visit('/privacy');
    andThen(() => { expect(currentPath()).to.equal('privacy'); });
    percySnapshot(this.test.fullTitle());
  });
  it('can visit /terms', function() {
    visit('/terms');
    andThen(() => { expect(currentPath()).to.equal('terms'); });
    percySnapshot(this.test.fullTitle());
  });

  context('for authenticated user', function() {
    setupSession();

    it('can navigate to repository listing', function() {
      visit('/');
      click('.ReposLink a');
      andThen(() => {
        expect(currentPath()).to.equal('namespace.index');
      });
      percySnapshot(this.test.fullTitle());
    });
  });
});
