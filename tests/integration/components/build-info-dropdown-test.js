/* jshint expr:true */
import {setupComponentTest} from 'ember-mocha';
import {beforeEach, it, describe} from 'mocha';
import {percySnapshot} from 'ember-percy';
import hbs from 'htmlbars-inline-precompile';
import {make}  from 'ember-data-factory-guy';
import {manualSetup}  from 'ember-data-factory-guy';
import seedFaker from '../../helpers/seed-faker';

describe('Integration: BuildInfoDropdownComponent', function() {
  setupComponentTest('build-info-dropdown', {
    integration: true
  });

  beforeEach(function() {
    seedFaker();
    manualSetup(this.container);
  });

  let states = [
    ['pending'],
    ['processing'],
    ['finished', 'withBaseBuild'],
    ['finished', 'noDiffs', 'withBaseBuild'],
    ['failed', 'missingResources', 'withBaseBuild'],
    ['failed', 'noSnapshots', 'withBaseBuild'],
    ['failed', 'renderTimeout', 'withBaseBuild'],
    ['expired', 'withBaseBuild'],
    ['finished', 'withRepo', 'withBaseBuild', 'withLongBranch'],
    ['finished', 'withRepo', 'withBaseBuild', 'withLongHeadCommitMessage'],
    ['finished', 'withRepo', 'withBaseBuild', 'withNoSpacesMessageCommitMessage'],
    ['finished', 'withRepo', 'hasPullRequest'],
  ];

  states.forEach((state) => {
    let testTitle = state.join(' ');

    it(`renders in state: ${testTitle}`, function() {
      let build = make.apply(this, ['build'].concat(state));
      this.set('build', build);

      this.render(hbs`{{build-info-dropdown build=build isShowingModal=true renderInPlace=true}}`);

      percySnapshot(this.test);
    });
  });
});
