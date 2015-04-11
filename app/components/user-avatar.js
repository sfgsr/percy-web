import Ember from 'ember';

export default Ember.Component.extend({
  user: null,
  classes: null,
  width: 40,

  classNames: ['UserAvatar'],
  classNameBindings: ['classes'],
});