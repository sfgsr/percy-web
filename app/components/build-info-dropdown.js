import Component from '@ember/component';

export default Component.extend({
  icon: null,
  renderInPlace: null,
  isShowingModal: false,
  classNames: ['BuildInfoDropdown'],

  actions: {
    toggleModal: function() {
      this.toggleProperty('isShowingModal');
    },
  },
});
