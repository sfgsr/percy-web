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
        `Are you sure you want to disable ${this.get('repo.slug')}?` +
        '\n\nPercy builds for this repo will be disabled and ' +
        'we may remove stored images at any time.'
      );
      if (confirm(message)) {
        this.sendAction('disableRepo', this.get('repo'));
      }
    },
  },
});