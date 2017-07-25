import Ember from 'ember';

export default Ember.Component.extend({
  icon: null,
  renderInPlace: null,
  isShowingModal: false,
  classNames: ['BuildInfoDropdown'],

  actions: {
    toggleModal: function() {
      this.toggleProperty('isShowingModal');
    }
  }
});
