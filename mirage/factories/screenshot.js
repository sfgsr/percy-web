import {Factory} from 'ember-cli-mirage';

export default Factory.extend({
  afterCreate(screenshot, server) {
    if (screenshot.image === null) {
      let image = server.create('image', {
        url: '/images/test/bs-base.png',
        width: 1280,
        height: 1485
      });
      screenshot.update({image});
    }
    if (screenshot.lossyImage === null) {
      let lossyImage = server.create('image', {
        url: '/images/test/bs-base-lossy.jpg',
        width: 900,
        height: 1044,
      });
      screenshot.update({lossyImage});
    }
  }
});
