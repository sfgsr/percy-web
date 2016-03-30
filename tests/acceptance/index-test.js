/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import percyFinalizeBuild from '../helpers/percy/finalize';
import Ember from 'ember';

describe('Acceptance: Homepage', function() {
  let application;

  this.timeout(0);

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    Ember.run(application, 'destroy');
  });

  after(function() {
    percyFinalizeBuild();
  });

  it('can visit /', function() {
    visit('/');

    andThen(function() {
      expect(currentPath()).to.equal('index');
    });

    percySnapshot('homepage');

    visit('/pricing');
    percySnapshot('pricing');

    visit('/docs');
    percySnapshot('docs');

    visit('/privacy');
    percySnapshot('privacy');

    visit('/terms');
    percySnapshot('terms');
  });
});
