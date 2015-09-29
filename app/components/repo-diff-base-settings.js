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
      var self = this;
      this.get('repo').set('diffBase', 'automatic').save().then(function(repo) {
        repo.reload();
      });
    },
    setManual: function() {
      var self = this;
      this.get('repo').set('diffBase', 'manual').save().then(function(repo) {
        repo.reload();
      });
    },
  },
});
