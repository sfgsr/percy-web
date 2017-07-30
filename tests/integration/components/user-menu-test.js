/* jshint expr:true */
import {setupComponentTest} from 'ember-mocha';
import {beforeEach, afterEach, it, describe} from 'mocha';
import {percySnapshot} from 'ember-percy';
import hbs from 'htmlbars-inline-precompile';
import {startMirage} from 'percy-web/initializers/ember-cli-mirage';

describe('Integration: UserMenuComponent', function() {
  setupComponentTest('user-menu', {
    integration: true,
  });

  beforeEach(function() {
    this.server = startMirage();
    let user = server.create('user');
    this.set('user', user);
  });

  afterEach(function() {
    this.server.shutdown();
  });

  it('renders', function() {
    this.render(hbs`{{user-menu user=user}}`);
    percySnapshot(this.test);
  });

  it('toggles menu', function() {
    this.render(hbs`{{user-menu user=user showMenu=true}}`);
    percySnapshot(this.test.fullTitle() + ' | Menu is visible');
  });
});
