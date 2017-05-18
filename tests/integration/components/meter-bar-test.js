import {it, describe} from 'mocha';
import {setupComponentTest} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import {percySnapshot} from 'ember-percy';

describe('Integration: MeterBarComponent', function() {
  setupComponentTest('meter-bar', {
    integration: true
  });

  it('renders', function() {
    this.set('count', 0);
    this.render(hbs`{{meter-bar count=count total=100}}`);
    percySnapshot('meter bar zero');

    this.set('count', 50);
    percySnapshot('meter bar half');

    this.set('count', 100);
    percySnapshot('meter bar full');
  });
});
