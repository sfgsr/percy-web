import Ember from 'ember';

export default Ember.Component.extend({
  showHints: false,
  isApproved: false,
  isButtonHovered: false,
  isButtonActive: false,

  classNames: ['MockApprovalFlow'],
  classNameBindings: ['classes'],

  showWhenApproved: function() {
    return (!this.get('isApproved') ? 'display: none' : '').htmlSafe();
  }.property('isApproved'),
  hideWhenApproved: function() {
    return (this.get('isApproved') ? 'display: none' : '').htmlSafe();
  }.property('isApproved'),

  animateOnScrollVisible: function() {
    var self = this;
    var windowHeight = Ember.$(window).height(); // Assume no resize, for performance sake.
    var element = this.$();

    Ember.$(window).bind('scroll.MockApprovalFlow', function(){
      var elementHeightShowing = windowHeight - element.offset().top + Ember.$(window).scrollTop();
      /////////// whyyyyyyy does it reflow?
      console.log('---');
      console.log(elementHeightShowing);
      if (elementHeightShowing > 250) {
        Ember.run.later((function() {
          self.set('isButtonHovered', true);
          Ember.run.later((function() {
            self.set('isButtonHovered', false);
            self.set('isApproved', true);
          }), 1000);
        }), 2000);
        // Ember.$(window).unbind('.MockApprovalFlow');
      }
    });
  }.on('didInsertElement'),
});
