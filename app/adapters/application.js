import DS from "ember-data";

export default DS.ActiveModelAdapter.extend({
  // TODO(fotinakis): #hardcoding.
  // host: 'http://192.168.59.103:3000',
  namespace: 'api',
});
