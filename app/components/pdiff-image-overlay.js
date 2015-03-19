import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['PdiffImageOverlay'],
  classNameBindings: [
    'showBase::PdiffImageOverlay--hideBaseScreenshot',
    'showOther::PdiffImageOverlay--hideOtherScreenshot',
    'showDiff::PdiffImageOverlay--hideDiff',
  ],

  showBase: true,
  showOther: false,
  showDiff: true,

  actions: {
    toggleBase: function() {
      this.set('showBase', !this.get('showBase'));
    },
    toggleOther: function() {
      this.set('showOther', !this.get('showOther'));
    },
    toggleDiff: function() {
      this.set('showDiff', !this.get('showDiff'));
    },
  },
});