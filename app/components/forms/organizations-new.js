import Ember from 'ember';
import OrganizationNewValidations from '../../validations/organization-new';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';


export default Ember.Component.extend({
  organizationCreated: null,

  store: Ember.inject.service(),
  model: Ember.computed('store', function() {
    return this.get('store').createRecord('organization', {});
  }),

  changeset: Ember.computed('model', function() {
    let model = this.get('model');
    let validator = OrganizationNewValidations;
    return new Changeset(model, lookupValidator(validator), validator);
  }),

  actions: {
    validateProperty(changeset, property) {
      return changeset.validate(property);
    },

    save() {
      let changeset = this.get('changeset');
      let snapshot = changeset.snapshot();

      if (Ember.get(changeset, 'isValid')) {
        changeset
          .save()
          .then(() => {
            // Bubble the successfully saved model upward, so the route can react to it.
            this.sendAction('organizationCreated', this.get('model'));
          })
          .catch(() => {
            this.get('model.errors').forEach(({attribute, message}) => {
              changeset.addError(attribute, message);
            });
            changeset.restore(snapshot);
          });
      }
    },

    reset(changeset) {
      return changeset.rollback();
    },
  },
});
