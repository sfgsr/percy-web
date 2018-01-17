import Component from '@ember/component';
import seededRandom from 'percy-web/lib/random';

export default Component.extend({
  classNames: ['team-member', 'mb-7'],
  attributeBindings: ['style'],
  style: '',

  setGridItemOrder: function() {
    let gridItemOrder = Math.floor(seededRandom() * 100 + 1);
    this.set('style', 'order: ' + gridItemOrder);
  }.on('didInsertElement'),
});
