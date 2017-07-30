import Ember from 'ember';

export default Ember.Component.extend({
  image: null,
  imageClass: '',

  action: null,
  bubbles: true,

  classNames: ['ImageSpacer'],
  attributeBindings: ['style'],
  style: Ember.computed('image.width', 'image.height', function() {
    let scale = this.get('image.height') * 100.0 / this.get('image.width');
    return Ember.String.htmlSafe(`padding-top: ${scale}%`);
  }),

  click(e) {
    let action = this.get('action');
    if (action) {
      action();
    }
    if (!this.get('bubbles')) {
      e.stopPropagation();
    }
  },
});
