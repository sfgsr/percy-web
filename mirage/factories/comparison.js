import { Factory, trait } from 'ember-cli-mirage';
import moment from 'moment';

export default Factory.extend({
  startedProcessingAt() { return moment().subtract(65, 'seconds') },
  finishedProcessingAt() { return moment().subtract(23, 'seconds') },

  includeBaseScreenshot: true,
  includePdiff: true,
  includeHeadScreenshot: true,
  includeMobileScreenshot: false,

  wasAdded: trait({
    includeBaseScreenshot: false,
    includePdiff: false,
  }),

  wasRemoved: trait({
    includeHeadScreenshot: false,
    includePdiff: false,
  }),

  mobile: trait({
    includeMobileVersion: true
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
    let settings = {
      prefix: 'bs',
      width: 1280,
      pdiff: {width: 1280, height: 600, ratio: 0.42, postfix: ''},
      lossy: {width: 900, height: 422, postfix: ''},
      longer: {
        pdiff: {width: 1280, height: 953, ratio: 0.62, postfix: '-longer'},
        lossy: {width: 900, height: 670, postfix: '-longer'}
      }
    };
    if (comparison.includeMobileVersion) {
      settings.prefix = 'bs-mobile';
      settings.width = 320;
      settings.pdiff = {width: 320, height: 600, ratio: 0.32, postfix: ''};
      settings.lossy = settings.pdiff;
      settings.longer.pdiff = {width: 320, height: 1040, ratio: 0.72, postfix: '-longer'};
      settings.longer.lossy = settings.longer.pdiff;
    }
    if (comparison.pdiff === null && comparison.includePdiff) {
      let pdiffSettings = settings.pdiff;
      if (comparison.includePdiff === 'longer') {pdiffSettings = settings.longer.pdiff;}
      let diffImage = server.create('image', {
        url: `/images/test/${settings.prefix}-pdiff-base-head${pdiffSettings.postfix}.png`,
        width: pdiffSettings.width, height: pdiffSettings.height
      });
      let pdiff = server.create('pdiff', {diffRatio: pdiffSettings.ratio, diffImage});
      comparison.update({pdiff});
    }
    if (comparison.baseScreenshot === null && comparison.includeBaseScreenshot) {
      let lossy = settings.lossy;
      let variant = 'base';
      if (comparison.includeBaseScreenshot === 'longer') {
        lossy = settings.longer.lossy;
        variant = 'head';
      }
      let lossyImage = server.create('image', {
        url: `/images/test/${settings.prefix}-${variant}${lossy.postfix}-lossy.jpg`,
        width: lossy.width, height: lossy.height
      });
      let baseScreenshot = server.create('screenshot', {lossyImage});
      comparison.update({baseScreenshot});
    }
    if (comparison.headScreenshot === null && comparison.includeHeadScreenshot) {
      let lossy = settings.lossy;
      let variant = 'head';
      if (comparison.includeBaseScreenshot === 'longer') {
        variant = 'base';
      }
      if (comparison.includeHeadScreenshot === 'longer') {
        lossy = settings.longer.lossy;
      }
      let lossyImage = server.create('image', {
          url: `/images/test/${settings.prefix}-${variant}${lossy.postfix}-lossy.jpg`,
          width: lossy.width, height: lossy.height
        });
      let headScreenshot = server.create('screenshot', {lossyImage});
      comparison.update({headScreenshot});
      if (comparison.headSnapshot === null) {
        let headSnapshot = server.create('snapshot');
        comparison.update({headScreenshot, headSnapshot});
      }
    }
    if (comparison.width === undefined &&
          (comparison.includeHeadScreenshot || comparison.includeBaseScreenshot)) {
      comparison.update({width: settings.width});
    }

    // Remove transient attributes.
    comparison.update({
      includeBaseScreenshot: undefined,
      includePdiff: undefined,
      includeHeadScreenshot: undefined,
      includeMobileVersion: undefined,
    });
  }
});
