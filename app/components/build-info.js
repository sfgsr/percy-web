import Component from '@ember/component';

export default Component.extend({
  build: null,
  showComparisonInfo: true,
  classes: null,

  classNames: ['BuildInfo'],
  classNameBindings: ['classes'],
});
