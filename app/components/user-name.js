import Ember from 'ember';

export default Ember.Component.extend({
  user: null,
  classes: null,
  linked: true,

  tagName: 'span',
  classNames: ['UserName'],
  classNameBindings: ['classes'],

  href: Ember.computed('user.githubUrl', function() {
    return this.get('user.githubUrl');
  }),
});