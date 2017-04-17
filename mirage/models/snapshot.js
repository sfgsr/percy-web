import {Model, belongsTo, hasMany} from 'ember-cli-mirage';

export default Model.extend({
  build: belongsTo('build'),
  screenshots: hasMany('screenshot')
});
