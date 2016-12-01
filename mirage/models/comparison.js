import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  build: belongsTo('build'),
  pdiff: belongsTo('pdiff'),
  headScreenshot: belongsTo('screenshot'),
  baseScreenshot: belongsTo('screenshot'),
  headSnapshot: belongsTo('snapshot'),
  baseSnapshot: belongsTo('snapshot')
});
