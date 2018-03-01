/* jshint expr:true */
/* eslint-disable no-unused-expressions */
import {setupComponentTest} from 'ember-mocha';
import {expect} from 'chai';
import {it, describe, beforeEach} from 'mocha';
import {percySnapshot} from 'ember-percy';
import hbs from 'htmlbars-inline-precompile';
import {make, manualSetup, makeList} from 'ember-data-factory-guy';
import sinon from 'sinon';
import {resolve, defer} from 'rsvp';
import wait from 'ember-test-helpers/wait';
import BuildApprovalButton from 'percy-web/tests/pages/components/build-approval-button';

describe('Integration: BuildApprovalButton', function() {
  setupComponentTest('build-approval-button', {
    integration: true,
  });

  let build;

  beforeEach(function() {
    manualSetup(this.container);
    BuildApprovalButton.setContext(this);
    build = make('build', {snapshots: makeList('snapshot', 4)});
    const stub = sinon.stub().returns(resolve());
    this.setProperties({build, stub});
  });

  it('displays correctly when build is not approved ', function() {
    this.render(hbs`{{build-approval-button
      build=build
      createReview=stub
    }}`);
    percySnapshot(this.test);
  });

  it('displays correctly when build is approved', function() {
    this.render(hbs`{{build-approval-button
      build=build
      createReview=stub
    }}`);
    this.set('build.reviewState', 'approved');
    percySnapshot(this.test);
  });

  it('calls createReview with correct args when clicked', function() {
    // This stub needs to return a promise AND we need to stub the `then` block
    // because the `then` block makes a server call that we don't want to happen in tests.
    let createReviewStub = sinon.stub().returns(resolve({then: sinon.stub()}));
    this.set('createReviewStub', createReviewStub);

    this.render(hbs`{{build-approval-button
      build=build
      createReview=createReviewStub
    }}`);
    BuildApprovalButton.clickButton();

    expect(createReviewStub).to.have.been.calledWith('approve', build, build.get('snapshots'));
  });

  it('displays correctly when in loading state ', function() {
    const deferred = defer();
    const createReview = sinon.stub().returns(deferred.promise);
    this.set('createReview', createReview);
    this.render(hbs`{{build-approval-button
      build=build
      createReview=(action stub)
    }}`);

    BuildApprovalButton.clickButton();

    return wait().then(() => {
      percySnapshot(this.test);
    });
  });
});
