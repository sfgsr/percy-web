import Ember from 'ember';

export default Ember.Component.extend({
  user: null,
  classes: null,
  linked: false,
  href: Ember.computed('user.githubUrl', function() {
    return this.get('user.githubUrl');
  }),
  width: 40,
  height: Ember.computed.alias('width'),

  classNames: ['UserAvatar'],
  classNameBindings: ['classes'],
});