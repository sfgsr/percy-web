/* jshint expr:true */
import {setupComponentTest} from 'ember-mocha';
import {beforeEach, it, describe} from 'mocha';
import {percySnapshot} from 'ember-percy';
import hbs from 'htmlbars-inline-precompile';
import {make, manualSetup}  from 'ember-data-factory-guy';
import seedFaker from '../../helpers/seed-faker';

describe('Integration: BuildStateBadgeComponent', function() {
  setupComponentTest('build-state-badge', {
    integration: true
  });

  beforeEach(function() {
    seedFaker();
    manualSetup(this.container);
  });


  let states = [
    ['pending'],
    ['processing'],
    ['finished'],
    ['finished', 'noDiffs'],
    ['failed', 'missingResources'],
    ['failed', 'noSnapshots'],
    ['failed', 'renderTimeout'],
    ['expired'],
  ];

  states.forEach((state) => {
    let testTitle = state.join(' ');

    it(`renders in state: ${testTitle}`, function() {
      let build = make.apply(this, ['build'].concat(state));
      this.set('build', build);

      this.render(hbs`{{build-state-badge build=build}}`);
      percySnapshot(this.test);
    });
  });
});
