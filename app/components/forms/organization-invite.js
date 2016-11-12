import Ember from 'ember';
import BaseFormComponent from './base';


export default BaseFormComponent.extend({
  organization: null,
  classes: null,

  classNames: ['FormsOrganizationInvite', 'Form'],
  classNameBindings: ['classes'],

  // Due to how invites work, we need to reset the model manually after each submission so
  // that we don't get stuck trying to update an old model (which is just a dumb response wrapper).
  newModel() {
    return this.get('store').createRecord('invite', {
      emails: '',
      role: null,
      organization: this.get('organization'),
    });
  },
  model: Ember.computed('organization', 'store', function() {
    return this.newModel();
  }),
  validator: null,
  actions: {
    saving(promise) {
      this._super(...arguments);

      this.set('errorMessage', null);
      promise.then(() => {
        // Fully reset the model + changeset if saved successfully.
        this.set('model', this.newModel());
      }, (errors) => {
        this.set('errorMessage', errors.errors[0].detail);
      });
    },
  },
});
