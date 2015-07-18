import Ember from 'ember';

export default Ember.Component.extend({
  user: null,
  classes: null,
  linked: false,
  href: function() {
    return this.get('user.githubUrl');
  }.property('user.githubUrl'),
  width: 40,

  classNames: ['UserAvatar'],
  classNameBindings: ['classes'],
});