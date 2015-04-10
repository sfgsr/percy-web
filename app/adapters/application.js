import JsonApiAdapter from 'ember-json-api/json-api-adapter';
import utils from '../lib/utils';

export default JsonApiAdapter.extend({
  host: utils.buildApiUrl('base'),
  namespace: 'v1',
  headers: {
    'Authorization': 'Token token=' + window.sessionStorage.getItem('user_token'),
  },
});
