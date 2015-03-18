import DS from "ember-data";

export default DS.ActiveModelAdapter.extend({
  // TODO(fotinakis): #hardcoding.
  host: 'http://localhost:3000',
  namespace: 'v1',
});