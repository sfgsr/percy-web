import {visitable, create, clickable, isVisible} from 'ember-cli-page-object';
import {SnapshotViewerFull} from 'percy-web/tests/pages/components/snapshot-viewer-full';
import {SnapshotList} from 'percy-web/tests/pages/components/snapshot-list';
import {alias} from 'ember-cli-page-object/macros';

const SELECTORS = {
  BUILD_LIST: '[data-test-project-container-build-list]',
  UNCHANGED_PANEL: '[data-test-toggle-unchanged]',
  SNAPSHOT_LIST: '[data-test-snapshot-list]',
  BUILD_INFO_DROPDOWN_TOGGLE: '[data-test-build-info-dropdown-toggle]',
  SHOW_SUPPORT_LINK: '[data-test-build-overview-show-support]',
  TOGGLE_DIFFS_BUTTON: '[data-test-toggle-diffs-button]',
};

const BuildPage = {
  visitBuild: visitable('/:orgSlug/:projectSlug/builds/:buildId'),
  visitFullPageSnapshot: visitable(
    '/:orgSlug/:projectSlug/builds/:buildId/view/:snapshotId/:width',
  ),

  toggleBuildInfoDropdown: clickable(SELECTORS.BUILD_INFO_DROPDOWN_TOGGLE),

  isUnchangedPanelVisible: isVisible(SELECTORS.UNCHANGED_PANEL),
  clickToggleNoDiffsSection: clickable(SELECTORS.UNCHANGED_PANEL),

  snapshotList: SnapshotList,
  snapshots: alias('snapshotList.snapshots'),

  snapshotTitles: {
    isDescriptor: true,
    get() {
      return this.snapshots().map(snapshot => snapshot.name);
    },
  },

  findSnapshotByName(name) {
    return this.snapshots()
      .toArray()
      .findBy('name', name);
  },

  focusedSnapshot() {
    return this.snapshots()
      .toArray()
      .findBy('isFocused', true);
  },

  urlWithSnapshotQueryParam(snapshot, build) {
    return `/${build.project.fullSlug}/builds/${build.id}?snapshot=${snapshot.id}`;
  },

  typeDownArrow: alias('snapshotList.typeDownArrow'),
  typeUpArrow: alias('snapshotList.typeUpArrow'),
  typeSpace: alias('snapshotList.typeSpace'),

  snapshotFullscreen: SnapshotViewerFull,
  isFullscreenModalVisible: isVisible(SELECTORS.SNAPSHOT_FULL_MODAL),

  clickShowSupportLink: clickable(SELECTORS.SHOW_SUPPORT_LINK),

  clickToggleDiffsButton: clickable(SELECTORS.TOGGLE_DIFFS_BUTTON),
  isDiffsVisibleForAllSnapshots: alias('snapshotList.isDiffsVisibleForAllSnapshots'),
  isDiffsHiddenForAllSnapshots: alias('snapshotList.isDiffsHiddenForAllSnapshots'),
};

export default create(BuildPage);
