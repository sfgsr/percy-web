import { Factory, trait } from 'ember-cli-mirage';
import moment from 'moment';

export default Factory.extend({
  startedProcessingAt: moment().subtract(65, 'seconds'),
  finishedProcessingAt: moment().subtract(23, 'seconds'),

  includeBaseScreenshot: true,
  includePdiff: true,
  includeHeadScreenshot: true,

  wasAdded: trait({
    includeBaseScreenshot: false,
    includePdiff: false,
  }),

  wasRemoved: trait({
    includeHeadScreenshot: false,
    includePdiff: false,
  }),

  same: trait({
    includePdiff: false,
    afterCreate(comparison, server) {
      let pdiff = server.create('pdiff', {diffRatio: 0.0});
      comparison.update({pdiff});
    }
  }),

  afterCreate(comparison, server) {
    if (comparison.pdiff === null && comparison.includePdiff) {
      let pdiff = server.create('pdiff', {diffRatio: 0.42});
      comparison.update({pdiff});
    }
    if (comparison.baseScreenshot === null && comparison.includeBaseScreenshot) {
      let baseScreenshot = server.create('screenshot');
      comparison.update({baseScreenshot});
    }
    if (comparison.headScreenshot === null && comparison.includeHeadScreenshot) {
      let headScreenshot = server.create('screenshot');
      comparison.update({headScreenshot});
    }
    comparison.update({
      includeBaseScreenshot: undefined,
      includePdiff: undefined,
      includeHeadScreenshot: undefined}); // remove transient attributes
  }
});
