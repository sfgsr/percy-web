import Ember from 'ember';

export default Ember.Component.extend({
  user: null,
  classes: null,
  linked: true,

  tag: 'span',
  classNames: ['UserName'],
  classNameBindings: ['classes'],

  href: function() {
    return this.get('user.githubUrl');
  }.property('user.githubUrl'),
});