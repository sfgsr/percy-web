import Ember from 'ember';

export default Ember.Component.extend({
  classes: null,
  selectNumColumns: null,  // Action to pass in.
  selectedNumColumns: 1,

  classNames: ['ComparisonModePicker'],
  classNameBindings: [
    'classes',
  ],
  actions: {
    selectNumColumns(numColumns) {
      this.set('numColumns', numColumns);
      this.get('selectNumColumns')(numColumns);
    },
  }
});
