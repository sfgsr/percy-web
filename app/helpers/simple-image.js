import Ember from 'ember';

// Creates <img> tag strings directly. Helpful when image tags have bound, dynamic src attributes
// and the binding can cause odd image refreshing or resizing.
export function simpleImageHelper(params, options = {}) {
  let classString = Ember.Handlebars.Utils.escapeExpression(options.classes || '');
  return Ember.String.htmlSafe(`<img class="${classString}" src="${options.src}">`);
}

export default Ember.Helper.helper(simpleImageHelper);
