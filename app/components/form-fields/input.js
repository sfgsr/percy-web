import Ember from 'ember';

export default Ember.Component.extend({
  changeset: null,
  title: null,
  property: null,
  type: 'text',

  classNames: ['FormFieldsInput'],

  fieldErrors: Ember.computed('changeset.error', function() {
    return Ember.get(this.get('changeset.error'), this.get('property'));
  }),
});
