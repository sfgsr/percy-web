import {Model, belongsTo} from 'ember-cli-mirage';

export default Model.extend({
  snapshot: belongsTo('snapshot'),
  image: belongsTo('image'),
  lossyImage: belongsTo('image')
});
