import {Model, belongsTo, hasMany} from 'ember-cli-mirage';

export default Model.extend({
  organization: belongsTo('organization'),
  tokens: hasMany('token'),
  builds: hasMany('build')
});
