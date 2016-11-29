import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { percySnapshot } from 'ember-percy';

describeComponent(
  'marketing-num-diffs',
  'Integration: MarketingNumDiffsComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      this.render(hbs`{{marketing-num-diffs}}`);
      percySnapshot(this.test.fullTitle(), this.$());
    });
  }
);
