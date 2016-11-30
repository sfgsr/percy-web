import { Factory } from 'ember-cli-mirage';
import moment from 'moment';

export default Factory.extend({
  startedProcessingAt: moment().subtract(65, 'seconds'),
  finishedProcessingAt: moment().subtract(23, 'seconds'),
  afterCreate(comparison, server) {
    if (comparison.pdiff === null) {
      let pdiff = server.create('pdiff', {diffRatio: 0.42});
      comparison.update({pdiff});
    }
    if (comparison.baseScreenshot === null) {
      let baseScreenshot = server.create('screenshot');
      comparison.update({baseScreenshot});
    }
    if (comparison.headScreenshot === null) {
      let headScreenshot = server.create('screenshot');
      comparison.update({headScreenshot});
    }
  }
});
