import Component from '@ember/component';

export default Component.extend({
  isSaving: null,
  isSaveSuccessful: null,

  tagName: 'span',
  classNames: ['SavingIndicator'],
  classes: null,
  classNameBindings: ['classes'],
});
