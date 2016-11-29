import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { percySnapshot } from 'ember-percy';

describeComponent(
  'meter-bar',
  'Integration: MeterBarComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      this.set('count', 0);
      this.render(hbs`{{meter-bar count=count total=100}}`);
      percySnapshot('meter bar zero');

      this.set('count', 50);
      percySnapshot('meter bar half');

      this.set('count', 100);
      percySnapshot('meter bar full');
    });
  }
);
