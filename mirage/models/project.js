import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  organization: belongsTo('organization'),
  builds: hasMany('build')
});
