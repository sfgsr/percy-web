/* jshint expr:true */
import {
  describeComponent,
  it
} from 'ember-mocha';
import {beforeEach, afterEach} from 'mocha';
import {percySnapshot} from 'ember-percy';
import hbs from 'htmlbars-inline-precompile';
import {startMirage} from 'percy-web/initializers/ember-cli-mirage';

describeComponent(
  'quickstart-button',
  'Integration: QuickstartButtonComponent',
  {
    integration: true
  },
  function() {
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
  }
);
