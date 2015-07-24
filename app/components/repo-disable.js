import Ember from 'ember';

export default Ember.Component.extend({
  repo: null,
  classes: null,
  text: 'Disable Repo',

  tagName: 'button',
  classNames: ['RepoDisable', 'Button'],
  classNameBindings: ['classes'],
  attributeBindings: ['disabled'],

  click: function() {
    this.send('action');
  },
  actions: {
    action: function() {
      var message = (
        'Are you sure you want to disable %@?\n\nPercy builds for this repo will be disabled and ' +
        'we may remove stored images at any time.'
      ).fmt(this.get('repo.slug'));
      if (confirm(message)) {
        this.sendAction('disableRepo', this.get('repo'));
      }
    },
  },
});