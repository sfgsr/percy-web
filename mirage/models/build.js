import {Model, belongsTo, hasMany} from 'ember-cli-mirage';

export default Model.extend({
  project: belongsTo('project'),
  baseBuild: belongsTo('build'),
  snapshots: hasMany('snapshot'),
  comparisons: hasMany('comparison'),
  approvedBy: belongsTo('user'),
});
