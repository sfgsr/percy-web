import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  namespace: 'api/v1',

  isInvalid: function(status, headers, payload) {
    // NOTE: right now, the Percy API uses HTTP 400 when it should use HTTP 422 in many cases.
    // For that reason, we need to add 400 to the isInvalid check so that model.errors is populated
    // correctly.
    // TODO: when the API is changed to be more correct, we should drop this method.
    return status === 422 || status === 400;
  },
});

