/* eslint-disable no-unused-expressions */
import {expect} from 'chai';
import {
  describeModule,
  it,
} from 'ember-mocha';

describeModule(
  'service:analytics',
  'AnalyticsService',
  {
    needs: ['service:session', 'service:adminMode']
  },
  function() {
    // Replace this with your real tests.
    it('exists', function() {
      let service = this.subject();
      expect(service).to.be.ok;
    });
  }
);
