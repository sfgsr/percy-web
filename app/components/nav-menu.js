import {inject as service} from '@ember/service';
import Component from '@ember/component';
import TargetApplicationActionsMixin from '../mixins/target-application-actions';

export default Component.extend(TargetApplicationActionsMixin, {
  user: null,
  classes: null,

  session: service(),
  classNames: ['NavMenu'],
  classNameBindings: ['classes'],
});
