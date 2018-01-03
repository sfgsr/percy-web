import {inject as service} from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  user: null,
  classes: null,

  session: service(),
  classNameBindings: ['classes'],
});
