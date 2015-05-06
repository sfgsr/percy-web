import JsonApiAdapter from 'ember-json-api/json-api-adapter';
import utils from '../lib/utils';

export default JsonApiAdapter.extend({
  namespace: 'api/v1',
  headers: function() {
    var token = this.get('session.secure.token');
    if (token) {
      return {'Authorization': 'Token token=' + token};
    }
    return {};
  }.property(),
});
