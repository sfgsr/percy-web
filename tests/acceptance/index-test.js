/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import Ember from 'ember';

describe('Acceptance: Homepage', function() {
  let application;

  this.timeout(20000);

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    Ember.run(application, 'destroy');
  });

  it('can visit /', function() {
    visit('/');

    andThen(function() {
      expect(currentPath()).to.equal('index');
    });
    andThen(function() {
      let doctypeNode = document.doctype;
      let doctype = "<!DOCTYPE "
        + doctypeNode.name
        + (doctypeNode.publicId ? ' PUBLIC "' + doctypeNode.publicId + '"' : '')
        + (!doctypeNode.publicId && doctypeNode.systemId ? ' SYSTEM' : '')
        + (doctypeNode.systemId ? ' "' + doctypeNode.systemId + '"' : '')
        + '>';

      Ember.$('#ember-testing-container').css('height', '100%');
      Ember.$('#ember-testing-container').css('width', '100%');
      Ember.$('#ember-testing').css('zoom', '100%');

      let html = Ember.$('html')[0].outerHTML;

      Ember.$.ajax('/_percy/snapshot', {
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
          name: 'homepage stuff (foo)',
          content: doctype + html,
        }),
      }).then(function() {
        Ember.$.ajax('/_percy/finalize_build', {
          method: 'POST',
        });
      });
    });
  });
});
