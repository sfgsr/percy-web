import Ember from 'ember';

export default Ember.Component.extend({
  repo: null,
  classes: null,

  classNames: ['RepoDiffBaseSettings'],
  classNameBindings: [
    'classes',
  ],
  actions: {
    setAutomatic: function() {
      this.get('repo').set('diffBase', 'automatic').save();
    },
    setManual: function() {
      this.get('repo').set('diffBase', 'manual').save();
    },
  },
});
