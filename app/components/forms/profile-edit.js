import {alias} from '@ember/object/computed';
import BaseFormComponent from './base';
import ProfileEditValidations from '../../validations/profile-edit';

export default BaseFormComponent.extend({
  user: null,
  classes: null,
  showEmailValidationMessage: false,

  classNames: ['Form'],
  classNameBindings: ['classes'],

  model: alias('user'),
  validator: ProfileEditValidations,
});
