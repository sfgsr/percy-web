import {helper} from '@ember/component/helper';
import {htmlSafe} from '@ember/string';
import Ember from 'ember';

// Creates <img> tag strings directly. Helpful when image tags have bound, dynamic src attributes
// and the binding can cause odd image refreshing or resizing.
export function simpleImageHelper(params, options = {}) {
  let image = options.image;
  let classString = Ember.Handlebars.Utils.escapeExpression(options.classes || '');
  return htmlSafe(
    `<img class="${classString}" src="${image.get('url')}" ` +
      `width="${image.get('width')}" height="${image.get('height')}">`,
  );
}

export default helper(simpleImageHelper);
