import {readOnly} from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  user: null,
  classes: null,
  linked: false,
  width: 40,
  height: readOnly('width'),

  classNames: ['UserAvatar'],
  classNameBindings: ['classes'],
});
