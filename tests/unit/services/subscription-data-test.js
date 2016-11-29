/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';

describeModule(
  'service:subscription-data',
  'SubscriptionDataService',
  function() {
    it('exists', function() {
      let service = this.subject();
      expect(service).to.be;
      expect(service.DATA).to.be;
    });
  }
);
