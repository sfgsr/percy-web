import {expect} from 'chai';
import {describe, beforeEach, it} from 'mocha';
import snapshotSort from 'percy-web/lib/snapshot-sort';
import Object from '@ember/object';

describe('snapshot-sort', function() {
  const wideWidth = 800;
  const narrowWidth = 400;

  const highDiffRatio = 0.99;
  const lowDiffRatio = 0.25;
  const noDiffRatio = 0.0;

  let wideComparisonWithHighDiff;
  let narrowComparisonWithHighDiff;
  let wideComparisonWithLowDiff;
  let wideComparisonWithNoDiff;

  beforeEach(() => {
    wideComparisonWithHighDiff = Object.create({width: wideWidth, smartDiffRatio: highDiffRatio});
    narrowComparisonWithHighDiff = Object.create({
      width: narrowWidth,
      smartDiffRatio: highDiffRatio,
    });
    wideComparisonWithLowDiff = Object.create({width: wideWidth, smartDiffRatio: lowDiffRatio});
    wideComparisonWithNoDiff = Object.create({width: wideWidth, smartDiffRatio: noDiffRatio});
  });

  it('returns snapshots with diffs before snapshots with no diffs', function() {
    const snapshotWithDiffs = Object.create({comparisons: [wideComparisonWithLowDiff]});
    const snapshotWithNoDiffs = Object.create({comparisons: [wideComparisonWithNoDiff]});
    const unorderedSnapshots = [snapshotWithNoDiffs, snapshotWithDiffs];

    expect(snapshotSort(unorderedSnapshots)).to.eql([snapshotWithDiffs, snapshotWithNoDiffs]);
  });

  it('returns snapshots with diffs at widest widths before snapshots with no diffs at widest width', function() { // eslint-disable-line
    const snapshotWithWideDiff = Object.create({comparisons: [wideComparisonWithHighDiff]});
    const snapshotWithNarrowDiff = Object.create({comparisons: [narrowComparisonWithHighDiff]});
    const unorderedSnapshots = [snapshotWithNarrowDiff, snapshotWithWideDiff];

    expect(snapshotSort(unorderedSnapshots)).to.eql([snapshotWithWideDiff, snapshotWithNarrowDiff]);
  });

  it('returns snapshots with high diff ratio before snapshots with low diff ratio', function() {
    const snapshotWithHighDiffRatio = Object.create({comparisons: [wideComparisonWithHighDiff]});
    const snapshotWithLowDiffRatio = Object.create({comparisons: [wideComparisonWithLowDiff]});
    const unorderedSnapshots = [snapshotWithLowDiffRatio, snapshotWithHighDiffRatio];

    expect(snapshotSort(unorderedSnapshots)).to.eql([
      snapshotWithHighDiffRatio,
      snapshotWithLowDiffRatio,
    ]);
  });
});
