import Ember from 'ember';

export default Ember.Component.extend({
  isSaving: null,
  isSaveSuccessful: null,

  tagName: 'span',
  classNames: ['SavingIndicator'],
  classes: null,
  classNameBindings: [
    'classes',
  ],
});
