import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['QuickstartButton'],
  click() {
    this.toggleProperty('showQuickstart');
  },
});
