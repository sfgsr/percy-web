import DS from 'ember-data';

export default DS.Model.extend({
  isExpired: DS.attr('boolean'),
  fromUser: DS.belongsTo('user', {async: false}),
  organization: DS.belongsTo('organization', {async: false}),

  // Only for creation:
  emails: DS.attr(),
  role: DS.attr(),
});
