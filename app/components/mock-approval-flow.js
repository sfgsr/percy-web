import Ember from 'ember';

export default Ember.Component.extend({
  showHints: false,
  isApproved: false,
  isButtonHovered: false,
  isButtonActive: false,

  classNames: ['MockApprovalFlow'],
  classNameBindings: ['classes'],

  showWhenApproved: Ember.computed('isApproved', function() {
    return Ember.String.htmlSafe(!this.get('isApproved') ? 'display: none' : '');
  }),
  hideWhenApproved: Ember.computed('isApproved', function() {
    return Ember.String.htmlSafe(this.get('isApproved') ? 'display: none' : '');
  }),
  setupScrollHandler: Ember.on('didInsertElement', function() {
    this.$('img').on('load', function() {
      Ember.$(window).bind('scroll.MockApprovalFlow', this._animateApprovalIfVisible.bind(this));
      this._animateApprovalIfVisible();
    }.bind(this));
  }),
  destroyScrollHandler: Ember.on('willDestroyElement', function() {
    Ember.$(window).unbind('.MockApprovalFlow');
  }),
  _animateApprovalIfVisible() {
    if (this.get('isDestroyed')) {
      return;
    }
    var elementHeight = this.$().height();
    var elementTop = this.$().offset().top;
    var elementHeightShowing = Ember.$(window).height() - elementTop + Ember.$(window).scrollTop();
    if (elementHeightShowing > elementHeight * (2/3)) {
      Ember.run.later((function() {
        if (this.isDestroyed) {
          // If the user has navigated away before this timer fired, skip.
          return;
        }
        this.set('isButtonHovered', true);
        Ember.run.later((function() {
          this.set('isButtonHovered', false);
          if (!this.get('isApproved')) {
            this.set('isApproved', true);
          }
        }.bind(this)), 500);
      }.bind(this)), 1000);
      Ember.$(window).unbind('.MockApprovalFlow');
    }
  },
});
