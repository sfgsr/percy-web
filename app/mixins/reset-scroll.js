import Ember from 'ember';

var ResetScrollMixin = Ember.Mixin.create({
  activate() {
    this._super();
    window.scrollTo(0, 0);
  },
});

export default ResetScrollMixin;