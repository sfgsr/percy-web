import Mixin from '@ember/object/mixin';

var ResetScrollMixin = Mixin.create({
  actions: {
    didTransition() {
      window.scrollTo(0, 0);
    },
  },
});

export default ResetScrollMixin;
