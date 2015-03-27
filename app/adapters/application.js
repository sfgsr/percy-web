import JsonApiAdapter from 'ember-json-api/json-api-adapter';

export default JsonApiAdapter.extend({
  // TODO(fotinakis): #hardcoding.
  host: 'http://localhost:3000',
  namespace: 'v1',
});
