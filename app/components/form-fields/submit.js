import Ember from 'ember';

export default Ember.Component.extend({
  classes: null,
  value: 'Submit',

  showSavingIndicator: true,
  isSaving: null,
  isSaveSuccessful: null,

  classNames: ['FormFieldsSubmit'],
  classNameBindings: ['classes'],
});
