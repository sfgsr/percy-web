import {
  validatePresence,
} from 'ember-changeset-validations/validators';

export default {
  name: [
    validatePresence(true),
  ],
  slug: [
    validatePresence({presence: true, message: "Short name can't be blank"}),
  ],
};
