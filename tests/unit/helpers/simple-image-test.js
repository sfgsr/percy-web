import {expect} from 'chai';
import {describe, it} from 'mocha';
import {simpleImageHelper} from 'percy-web/helpers/simple-image';

describe('simple-image helper', function() {
  it('renders image tag', function() {
    let html = simpleImageHelper(undefined, {src: '/foo'});
    expect(html.string).to.equal('<img class="" src="/foo">');
    html = simpleImageHelper(undefined, {src: '/foo', classes: 'bar'});
    expect(html.string).to.equal('<img class="bar" src="/foo">');
  });
});
