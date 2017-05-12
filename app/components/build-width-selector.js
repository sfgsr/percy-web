import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['WidthSelector'],
  defaultSelectedWidth: null,
  selectedWidth: Ember.computed.oneWay('defaultSelectedWidth'),
  actions: {
    updateSelectedWidth(value) {
      if (value === 'select-width') {
        value = null;
      }

      let updateSelectedWidth = this.get('updateSelectedWidth');
      this.set('selectedWidth', value);
      updateSelectedWidth(value);
    }
  },
});
