import Ember from 'ember';

var ResetScrollMixin = Ember.Mixin.create({
  scrollToTop: Ember.on('activate', function() {
    window.scrollTo(0, 0);
  }),
});

export default ResetScrollMixin;