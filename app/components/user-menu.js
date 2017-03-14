import Ember from 'ember';
import TargetApplicationActionsMixin from '../mixins/target-application-actions';

export default Ember.Component.extend(TargetApplicationActionsMixin, {
  classNames: ['UserMenu'],
  showMenu: false,
  click() {
    this.toggleProperty('showMenu');
  },
});
