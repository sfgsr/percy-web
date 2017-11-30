import {it, describe, beforeEach} from 'mocha';
import {setupComponentTest} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import {percySnapshot} from 'ember-percy';
import {manualSetup, make} from 'ember-data-factory-guy';

describe('Integration: JumpToBillingComponent', function() {
  setupComponentTest('jump-to-billing', {
    integration: true,
  });

  beforeEach(function() {
    manualSetup(this.container);
    const user = make('user', 'withOrganizations');
    this.set('user', user);
  });

  it('renders (including power-select)', function() {
    this.render(hbs`{{
      organizations/jump-to-billing
      currentUser=user
    }}`);
    percySnapshot(this.test.fullTitle(), this.$());
  });
});
