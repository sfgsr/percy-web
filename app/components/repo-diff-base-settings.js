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
      let repo = this.get('repo');
      repo.set('diffBase', 'automatic')
      repo.save();
    },
    setManual: function() {
      let repo = this.get('repo');
      repo.set('diffBase', 'manual');
      repo.save();
    },
  },
});
