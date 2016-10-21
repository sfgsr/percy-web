import Ember from 'ember';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';


export default Ember.Component.extend({
  // To be defined by superclass:
  model: null,
  validator: null,

  isSaving: false,
  isSaveSuccessful: null,

  store: Ember.inject.service(),
  changeset: Ember.computed('model', function() {
    let model = this.get('model');
    let validator = this.get('validator') || {};
    return new Changeset(model, lookupValidator(validator), validator);
  }),
  focusOnInsert: Ember.on('didInsertElement', function() {
    // We can't only use autofocus=true because it apparently only works on first load.
    this.$('[autofocus]').focus();
  }),

  actions: {
    saving(promise) {
      this.set('isSaving', true);
      promise.then(() => {
        this.set('isSaving', false);
        this.set('isSaveSuccessful', true);
      }, () => {
        this.set('isSaving', false);
        this.set('isSaveSuccessful', false);
      });
    },

    validateProperty(changeset, property) {
      return changeset.validate(property);
    },

    save() {
      let model = this.get('model');
      let changeset = this.get('changeset');

      if (Ember.get(changeset, 'isValid')) {
        let savingPromise = changeset.save();
        this.send('saving', savingPromise);

        savingPromise.then(() => {
          // Bubble the successfully saved model upward, so the route can react to it.
          this.sendAction('saveSuccess', model);
          changeset.rollback();
        }).catch(() => {
          // TODO: clean this up when this issue is addressed:
          // https://github.com/DockYard/ember-changeset/issues/100
          let errorData = {};
          this.get('model.errors').forEach(({attribute, message}) => {
            if (!errorData[attribute]) {
              errorData[attribute] = [];
            }
            errorData[attribute].push(message);
          });
          Object.keys(errorData).forEach((key) => {
            changeset.addError(key, errorData[key]);
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
