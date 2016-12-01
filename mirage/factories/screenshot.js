import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  afterCreate(screenshot, server) {
    if (screenshot.lossyImage === null) {
      let lossyImage = server.create('image', {url: '/images/percy-bg.png'});
      screenshot.update({lossyImage});
    }
  }
});
