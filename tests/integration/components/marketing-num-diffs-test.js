import {it, describe} from 'mocha';
import {setupComponentTest} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import {percySnapshot} from 'ember-percy';

describe('Integration: MarketingNumDiffsComponent', function() {
  setupComponentTest('marketing-num-diffs', {
    integration: true
  });

  it('renders', function() {
    this.render(hbs`{{marketing-num-diffs}}`);
    percySnapshot(this.test.fullTitle(), this.$());
  });
});
