import Ember from 'ember';

export default Ember.Component.extend({
  showHints: false,
  isApproved: true,

  classNames: ['MockApprovalFlow'],
  classNameBindings: ['classes'],

  showWhenApproved: function() {
    return (!this.get('isApproved') ? 'display: none' : '').htmlSafe();
  }.property('isApproved'),
  hideWhenApproved: function() {
    return (this.get('isApproved') ? 'display: none' : '').htmlSafe();
  }.property('isApproved'),

  actions: {
    fakeApprovalToggled: function(isButtonApproved) {
      this.set('isApproved', isButtonApproved);
    }
  },
});
