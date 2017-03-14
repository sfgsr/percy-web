import Ember from 'ember';

export default Ember.Component.extend({
  user: null,
  classes: null,
  linked: false,
  href: Ember.computed.readOnly('user.githubUrl'),
  width: 40,
  height: Ember.computed.readOnly('width'),

  classNames: ['UserAvatar'],
  classNameBindings: ['classes'],
});
