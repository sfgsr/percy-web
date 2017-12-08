import Component from '@ember/component';

export default Component.extend({
  classNames: ['team-member', 'mb-8'],
  attributeBindings: ['style'],
  style: '',

  setGridItemOrder: function() {
    let gridItemOrder = Math.floor(Math.random() * 100 + 1);
    this.set('style', 'order: ' + gridItemOrder);
  }.on('didInsertElement'),
});
