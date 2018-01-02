import {oneWay} from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  classNames: ['select-dropdown'],
  defaultSelectedWidth: null,
  selectedWidth: oneWay('defaultSelectedWidth'),
  actions: {
    updateSelectedWidth(value) {
      if (value === 'select-width') {
        value = null;
      }

      let updateSelectedWidth = this.get('updateSelectedWidth');
      this.set('selectedWidth', value);
      updateSelectedWidth(value);

      this.analytics.track('Build Width Selected', null, {width: value});
    },
  },
});
