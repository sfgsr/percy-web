import {alias} from '@ember/object/computed';
import BaseFormComponent from './base';
import ProjectEditValidations from '../../validations/project-edit';

export default BaseFormComponent.extend({
  project: null,
  classes: null,

  classNames: ['FormsProjectEdit', 'Form'],
  classNameBindings: ['classes'],

  model: alias('project'),
  validator: ProjectEditValidations,
});
