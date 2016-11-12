import Ember from 'ember';

export default Ember.Component.extend({
  changeset: null,
  title: null,
  property: null,
  autofocus: false,
  classes: null,

  classNames: ['FormFieldsTextarea'],
  classNameBindings: ['classes'],

  fieldErrors: Ember.computed('changeset.error', function() {
    return Ember.get(this.get('changeset.error'), this.get('property'));
  }),
});
