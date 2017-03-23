/* eslint-disable no-unused-expressions */
import {expect} from 'chai';
import {it, describe} from 'mocha';
import {setupTest} from 'ember-mocha';

describe('SubscriptionDataService', function() {
  setupTest('service:subscription-data', {});

  it('exists', function() {
    let service = this.subject();
    expect(service).to.be;
    expect(service.DATA).to.be;
  });
});
