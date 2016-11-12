import Ember from 'ember';

export default Ember.Component.extend({
  classes: null,

  classNames: ['OrganizationsSettingsNavWrapper'],
  classNameBindings: [
    'classes',
  ],

  actions: {
    chooseProject(project) {
      // Send action directly up to application controller, so we don't have to delegate every
      // time in the template.
      let applicationController = Ember.getOwner(this).lookup('controller:application');
      applicationController.send('navigateToProjectSettings', project);
    },
  }
});
