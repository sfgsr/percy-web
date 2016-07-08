import Ember from 'ember';

var ResetScrollMixin = Ember.Mixin.create({
  actions: {
    didTransition() {
      window.scrollTo(0, 0);
    }
  }
});

export default ResetScrollMixin;