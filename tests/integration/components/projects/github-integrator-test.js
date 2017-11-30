import {it, describe, beforeEach} from 'mocha';
import {setupComponentTest} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import {percySnapshot} from 'ember-percy';
import {manualSetup, make} from 'ember-data-factory-guy';
import {clickTrigger} from 'ember-power-select/test-support/helpers';

describe('Integration: GithubIntegratorComponent', function() {
  setupComponentTest('github-integrator', {
    integration: true,
  });

  beforeEach(function() {
    manualSetup(this.container);
    const project = make('project');
    const organization = make('organization', 'withGithubIntegration', 'withRepos');
    project.organization = organization;

    this.set('project', project);
  });

  it('renders powerselect closed', function() {
    this.render(hbs`{{projects/github-integrator project=project}}`);

    percySnapshot(this.test.fullTitle(), this.$());
  });

  it('renders powerselect open', function() {
    this.render(hbs`{{projects/github-integrator project=project}}`);
    clickTrigger();

    percySnapshot(this.test.fullTitle(), this.$());
  });
});
