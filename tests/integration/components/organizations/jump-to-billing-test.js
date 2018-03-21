import {it, describe, beforeEach} from 'mocha';
import {setupComponentTest} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import {percySnapshot} from 'ember-percy';
import {manualSetup, make} from 'ember-data-factory-guy';
import {resolve} from 'rsvp';
import Service from '@ember/service';
import wait from 'ember-test-helpers/wait';

describe('Integration: JumpToBillingComponent', function() {
  setupComponentTest('jump-to-billing', {
    integration: true,
  });

  beforeEach(function() {
    manualSetup(this.container);
    const user = make('user', 'withOrganizations');
    const sessionServiceStub = Service.extend({
      forceReloadUser() {
        return resolve(user);
      },
    });
    this.register('service:session', sessionServiceStub);
    this.inject.service('session', {as: 'sessionService'});
    this.set('user', user);
  });

  it('renders (including power-select)', function() {
    this.render(hbs`{{
      organizations/jump-to-billing
      currentUser=user
    }}`);

    return wait().then(() => {
      percySnapshot(this.test.fullTitle(), this.$());
    });
  });
});
