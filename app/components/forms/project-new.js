import Ember from 'ember';
import BaseFormComponent from './base';
import ProjectNewValidations from '../../validations/project-new';

export default BaseFormComponent.extend({
  organization: null,

  model: Ember.computed(function() {
    return this.get('store').createRecord('project', {
      organization: this.get('organization'),
    });
  }),
  validator: ProjectNewValidations,
});
