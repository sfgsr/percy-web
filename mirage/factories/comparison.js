import { Factory, trait } from 'ember-cli-mirage';
import moment from 'moment';

export default Factory.extend({
  startedProcessingAt() { return moment().subtract(65, 'seconds') },
  finishedProcessingAt() { return moment().subtract(23, 'seconds') },

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

  gotLonger: trait({
    includePdiff: 'longer',
    includeHeadScreenshot: 'longer'
  }),

  gotShorter: trait({
    includePdiff: 'longer',
    includeBaseScreenshot: 'longer'
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
      let pdiff;
      if (comparison.includePdiff === 'longer') {
        let diffImage = server.create('image', {
          url: '/images/test/bs-pdiff-base-head-longer.png',
          width: 1280,
          height: 953
        });
        pdiff = server.create('pdiff', {diffRatio: 0.62, diffImage});
      } else {
        let diffImage = server.create('image', {
          url: '/images/test/bs-pdiff-base-head.png',
          width: 1280,
          height: 600
        });
        pdiff = server.create('pdiff', {diffRatio: 0.42, diffImage});
      }
      comparison.update({pdiff});
    }
    if (comparison.baseScreenshot === null && comparison.includeBaseScreenshot) {
      let lossyImage;
      if (comparison.includeBaseScreenshot === 'longer') {
        lossyImage = server.create('image', {
          url: '/images/test/bs-head-longer-lossy.jpg',
          width: 900,
          height: 670
        });
      } else {
        lossyImage = server.create('image', {
          url: '/images/test/bs-base-lossy.jpg',
          width: 900,
          height: 422
        });
      }
      let baseScreenshot = server.create('screenshot', {lossyImage});
      comparison.update({baseScreenshot});
    }
    if (comparison.headScreenshot === null && comparison.includeHeadScreenshot) {
      let lossyImage;
      if (comparison.includeHeadScreenshot === 'longer') {
        lossyImage = server.create('image', {
          url: '/images/test/bs-head-longer-lossy.jpg',
          width: 900,
          height: 670
        });
      } else {
        lossyImage = server.create('image', {
          url: '/images/test/bs-head-lossy.jpg',
          width: 900,
          height: 422
        });
      }
      let headScreenshot = server.create('screenshot', {lossyImage});
      let headSnapshot = server.create('snapshot');
      comparison.update({headScreenshot, headSnapshot});
    }
    comparison.update({
      includeBaseScreenshot: undefined,
      includePdiff: undefined,
      includeHeadScreenshot: undefined}); // remove transient attributes
  }
});
