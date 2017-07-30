/* jshint expr:true */
import {setupComponentTest} from 'ember-mocha';
import {beforeEach, afterEach, it, describe} from 'mocha';
import {percySnapshot} from 'ember-percy';
import hbs from 'htmlbars-inline-precompile';
import {startMirage} from 'percy-web/initializers/ember-cli-mirage';

describe('Integration: QuickstartButtonComponent', function() {
  setupComponentTest('quickstart-button', {
    integration: true,
  });

  beforeEach(function() {
    this.server = startMirage();
    let organization = server.create('organization');
    let project = server.create('project', {organization});

    this.set('project', project);
  });

  afterEach(function() {
    this.server.shutdown();
  });

  it('renders', function() {
    this.render(hbs`{{quickstart-button}}`);
    percySnapshot(this.test);
  });
});
