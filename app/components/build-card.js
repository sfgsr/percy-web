import {getOwner} from '@ember/application';
import Component from '@ember/component';

export default Component.extend({
  build: null,
  classes: null,
  tagName: '',

  actions: {
    navigateToBuild() {
      // Send action directly up to application controller, so we don't have to delegate every
      // time in the template.
      let applicationController = getOwner(this).lookup('controller:application');
      applicationController.send('navigateToBuild', this.get('build'));
    },
  },
});
