/* jshint expr:true */
import {setupComponentTest} from 'ember-mocha';
import {beforeEach, it, describe} from 'mocha';
import {percySnapshot} from 'ember-percy';
import hbs from 'htmlbars-inline-precompile';
import {make, manualSetup} from 'ember-data-factory-guy';
import seedFaker from '../../helpers/seed-faker';
import SnapshotViewerHeaderPO from 'percy-web/tests/pages/components/snapshot-viewer-header';
import sinon from 'sinon';

describe('Integration: SnapshotViewerHeader', function() {
  setupComponentTest('snapshot-viewer-header', {
    integration: true,
  });

  beforeEach(function() {
    manualSetup(this.container);
    SnapshotViewerHeaderPO.setContext(this);



//     {{snapshot-viewer-header
//   fullscreen=false
//   snapshot=snapshot
//   buildWidths=buildWidths
//   selectedWidth=snapshotSelectedWidth
//   selectedComparison=selectedComparison
//   hasComparisonAtSelectedWidth=hasComparisonAtSelectedWidth
//   toggleViewMode=(action showSnapshotFullModalTriggered snapshot.id snapshotSelectedWidth)
//   updateSelectedWidth=(action "updateSelectedWidth")

//   registerChild=(action "registerChild")
// }}
  });

  describe('dropdown', function() {
    beforeEach(function() {
      const stub = sinon.stub();
      this.set('stub', stub);

      this.render(hbs`{{
        snapshot-viewer-header
        toggleViewMode=stub
        updateSelectedWidth=stub
      }}`);
    });

    it('shows dropdown toggle', function() {
      expect(SnapshotViewerHeaderPO.isDropdownToggleVisible).to.equal(true);
    });

    it('toggles dropdown pane when dropdown toggle is clicked', function() {
      expect(SnapshotViewerHeaderPO.isDropdownPaneVisible).to.equal(false);
      SnapshotViewerHeaderPO.clickDropdownToggle();
      expect(SnapshotViewerHeaderPO.isDropdownPaneVisible).to.equal(true);
      SnapshotViewerHeaderPO.clickDropdownToggle();
      expect(SnapshotViewerHeaderPO.isDropdownPaneVisible).to.equal(false);
    });

    it('shows copy url option', function() {
      SnapshotViewerHeaderPO.clickDropdownToggle();
      expect(SnapshotViewerHeaderPO.dropdownOptions(0).text).to.equal('Copy snapshot URL');
    });

  });



});
