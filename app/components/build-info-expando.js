import Ember from 'ember';

export default Ember.Component.extend({
  build: null,

  isExpanded: false,
  classNames: ['BuildInfoExpando'],
  classNameBindings: ['classes', 'isExpanded:BuildInfoExpando--expanded'],
  actions: {
    toggle: function() {
      this.get('toggleBuildInfo')();
    },
  },
});
