import Ember from 'ember';
import BaseFormComponent from './base';
import ProjectEditValidations from '../../validations/project-edit';

export default BaseFormComponent.extend({
  project: null,
  classes: null,

  classNames: ['FormsProjectEdit', 'Form'],
  classNameBindings: ['classes'],

  model: Ember.computed.alias('project'),
  validator: ProjectEditValidations,
});
