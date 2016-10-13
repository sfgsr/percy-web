import Ember from 'ember';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';


export default Ember.Component.extend({
  // To be defined by superclass:
  model: null,
  validator: null,

  store: Ember.inject.service(),
  changeset: Ember.computed('model', function() {
    let model = this.get('model');
    let validator = this.get('validator');
    return new Changeset(model, lookupValidator(validator), validator);
  }),

  actions: {
    validateProperty(changeset, property) {
      return changeset.validate(property);
    },

    save() {
      let model = this.get('model');
      let changeset = this.get('changeset');

      if (Ember.get(changeset, 'isValid')) {
        changeset
          .save()
          .then(() => {
            // Bubble the successfully saved model upward, so the route can react to it.
            this.sendAction('saveSuccess', model);
          })
          .catch(() => {
            this.get('model.errors').forEach(({attribute, message}) => {
              // TODO: we currently only show the last error message because we have to set this
              // as an array. https://github.com/DockYard/ember-changeset/issues/100
              changeset.addError(attribute, [message]);
            });
            // Make sure the model ditry attrs are rolled back.
            // TODO: this causes flashing when page state is bound to a model attribute that is
            // dirtied by the changeset save(), but it's better than leaving the model dirty
            // and having page state be out of date. Better way to handle this?
            model.rollbackAttributes();
          });
      }
    },

    reset(changeset) {
      return changeset.rollback();
    },
  },
});
