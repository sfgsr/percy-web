import FactoryGuy from 'ember-data-factory-guy';
import faker from 'faker';
import {makeList, make} from 'ember-data-factory-guy';

FactoryGuy.define('organization', {
  default: {
    name: () => faker.company.companyName(),

    projects: FactoryGuy.hasMany('project'),
    githubIntegration: FactoryGuy.belongsTo('github-integration'),
    repos: FactoryGuy.hasMany('repo'),
  },
  traits: {
    withGithubIntegration: {githubIntegration: () => make('github-integration')},
    withRepos: {repos: () => makeList('repo', 3)},
    withProjects: {projects: () => makeList('project', 5)},
  },
});
