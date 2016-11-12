import Ember from 'ember';

export default Ember.Component.extend({
  // In this case, we pass classes through to the input element itself.
  classes: null,
  value: 'Submit',
  disabled: false,

  confirmationMessage: null,
  showSavingIndicator: true,
  isSaving: null,
  isSaveSuccessful: null,

  classNames: ['FormFieldsSubmit'],
  actions: {
    perform() {
      let confirmationMessage = this.get('confirmationMessage');
      if (confirmationMessage && !confirm(confirmationMessage)) {
        return;
      }
      this.get('submit')();
    },
  }
});
