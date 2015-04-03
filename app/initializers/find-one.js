import DS from 'ember-data';

export default {
  name: 'find-query-one',
  initialize: function() {
    DS.Store.reopen({
      // Custom findOne method that supports query params.
      findOne: function(type, id, query) {
        var store = this;
        var typeClass = store.modelFor(type);
        var adapter = store.adapterFor(typeClass);
        var serializer = store.serializerFor(typeClass);
        var url = adapter.buildURL(type, id);
        var ajaxPromise = adapter.ajax(url, 'GET', {data: query});

        return ajaxPromise.then(function(rawPayload) {
          var extractedPayload = serializer.extract(store, typeClass, rawPayload, id, 'find');
          return store.push(typeClass, extractedPayload);
        });
      }
    });
  }
};