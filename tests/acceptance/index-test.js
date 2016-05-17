/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import setupAcceptance from '../helpers/setup-acceptance';
import Ember from 'ember';


describe('Marketing acceptance tests', function() {
  setupAcceptance({'autoPercySnapshot': false});

  it('can visit /', function() {
    visit('/');
    andThen(() => { expect(currentPath()).to.equal('index'); });
  });
  it('can visit /pricing', function() {
    visit('/pricing');
    andThen(() => { expect(currentPath()).to.equal('pricing'); });
  });
  it('can visit /docs', function() {
    visit('/docs');
    andThen(() => { expect(currentPath()).to.equal('docs.index'); });
  });
  it('can visit /privacy', function() {
    visit('/privacy');
    andThen(() => { expect(currentPath()).to.equal('privacy'); });
  });
  it('can visit /terms', function() {
    visit('/terms');
    andThen(() => { expect(currentPath()).to.equal('terms'); });
  });
});
