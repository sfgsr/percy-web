import setupAcceptance, { setupSession } from '../helpers/setup-acceptance';
import freezeMoment from '../helpers/freeze-moment';
import moment from 'moment';

describe('Acceptance: Build', function() {
  freezeMoment('2018-05-22');
  setupAcceptance();

  setupSession(function (server) {
    let organization = server.create('organization', 'withUser');
    let project = server.create('project', {name: 'with builds', organization});
    let build = server.create('build', {project, createdAt: moment().subtract(2, 'minutes') });
    this.comparisons = {
      different: server.create('comparison', {build}),
      gotLonger: server.create('comparison', 'gotLonger', {build}),
      gotShorter: server.create('comparison', 'gotShorter', {build}),
      wasAdded: server.create('comparison', 'wasAdded', {build}),
      wasRemoved: server.create('comparison', 'wasRemoved', {build}),
      same: server.create('comparison', 'same', {build})
    }
    this.project = project;
    this.build = build;
  });

  it('shows the build page', function() {
    visit(`/${this.project.fullSlug}`);
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.index');
    });

    click('.BuildState');
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build');
    });
    percySnapshot(this.test);

    click('.ComparisonModePicker button')
    percySnapshot(this.test.fullTitle() + ' | Overview');
  });

  it('toggles the image and pdiff', function() {
    visit(`/${this.project.fullSlug}/builds/${this.build.id}`);
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build');
    });

    let comparison = this.comparisons.different;
    let comparisonSelector = `.ComparisonViewer:has(div[title="${comparison.headSnapshot.name}"])`

    andThen(() => {
      expect(find(`${comparisonSelector} .pdiffImageOverlay img`).length).to.equal(1);
    });

    click(`${comparisonSelector} .pdiffImageOverlay img`);
    andThen(() => {
      expect(find(`${comparisonSelector} .pdiffImageOverlay img`).length).to.equal(0);
    });
    percySnapshot(this.test.fullTitle() + ' | hides overlay');

    // TODO somehow click is not happening with regular click, had to trigger('click')
    //click(`${comparisonSelector} .ComparisonViewer-pdiffImageBox img`);
    andThen(() => {
      find(`${comparisonSelector} .ComparisonViewer-pdiffImageBox img`).trigger('click');
    });
    andThen(() => {
      expect(find(`${comparisonSelector} .pdiffImageOverlay img`).length).to.equal(1);
    });
    percySnapshot(this.test.fullTitle() + ' | shows overlay');
  });

  it('walk across comparisons with arrow keys', function() {
    const RightArrowKey = 39;
    const LeftArrowKey = 37;
    visit(`/${this.project.fullSlug}/builds/${this.build.id}`);
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build');
      expect(currentURL()).to.equal(`/${this.project.fullSlug}/builds/1`);
    });

    keyEvent('.ComparisonList', 'keydown', RightArrowKey);
    andThen(() => {
      expect(currentURL()).to.equal(`/${this.project.fullSlug}/builds/1?comparison=2`);
    });
    percySnapshot(this.test.fullTitle() + ' | Right');

    keyEvent('.ComparisonList', 'keydown', RightArrowKey);
    andThen(() => {
      expect(currentURL()).to.equal(`/${this.project.fullSlug}/builds/1?comparison=3`);
    });
    percySnapshot(this.test.fullTitle() + ' | Right*2');

    keyEvent('.ComparisonList', 'keydown', LeftArrowKey);
    andThen(() => {
      expect(currentURL()).to.equal(`/${this.project.fullSlug}/builds/1?comparison=2`);
    });
    percySnapshot(this.test.fullTitle() + ' | Right*2 + Left');
  });

  it('jumps to comparison for query params', function() {
    let comparison = this.comparisons.wasAdded;
    visit(`/${this.project.fullSlug}/builds/${this.build.id}?comparison=${comparison.id}`);
    andThen(() => {
      expect(currentPath()).to.equal('organization.project.builds.build');
      expect(
        find('.ComparisonViewer.ComparisonViewer--focus .ComparisonViewer-title a').text()
      ).to.equal(comparison.headSnapshot.name);
      expect('')
    });

    percySnapshot(this.test.fullTitle());
  });
});
