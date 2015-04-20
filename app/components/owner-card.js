import Ember from 'ember';

export default Ember.Component.extend({
  owner: null,
  currentOwner: null,
  classes: null,

  classNames: ['OwnerCard', 'OwnerCard--linked'],
  classNameBindings: ['classes', 'isActive:OwnerCard--active'],
  isActive: function() {
    return this.get('owner.login') === this.get('currentOwner.login');
  }.property('owner.login', 'currentOwner.login'),

  click: function() {
    this.send('selectOwner', this.get('owner'));
  },
  actions: {
    selectOwner: function(owner) {
      this.sendAction('selectOwner', owner);
    },
  }
});
