import Component from '@ember/component';
import TargetApplicationActionsMixin from '../mixins/target-application-actions';

export default Component.extend(TargetApplicationActionsMixin, {
  classNames: ['UserMenu'],
  showMenu: false,
  click() {
    this.toggleProperty('showMenu');
  },
});
