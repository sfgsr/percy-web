import Ember from 'ember';

export default Ember.Component.extend({
  classes: null,
  selectNumColumns: null,  // Action to pass in.
  selectedNumColumns: 1,

  classNames: ['BuildModePicker'],
  classNameBindings: [
    'classes',
  ],
  actions: {
    selectNumColumns(numColumns) {
      this.set('numColumns', numColumns);
      this.get('selectNumColumns')(numColumns);

      this.analytics.track('Build Zoom Level Selected', null, {num_columns: numColumns});
    },
  }
});
