import {Factory} from 'ember-cli-mirage';
import {TEST_IMAGE_DIMS, TEST_IMAGE_URLS} from 'percy-web/mirage/factories/screenshot';

export default Factory.extend({
  id(i) {
    return `image-${i}`;
  },

  height: TEST_IMAGE_DIMS.DEFAULT_HEIGHT,
  width: TEST_IMAGE_DIMS.DEFAULT_WIDTH,
  url: TEST_IMAGE_URLS.V2,
});
