import Ember from 'ember';
import ResetScrollMixin from '../mixins/reset-scroll';
import percyDocs from 'percy-docs';

export default Ember.Route.extend(ResetScrollMixin, {
  model() {
    return Ember.RSVP.hash({
      navMarkdown: Ember.get(percyDocs.markdownFiles, 'nav'),
      pageMarkdown: Ember.get(percyDocs.markdownFiles, 'index'),
    });
  },
  actions: {
    docsNavigate(docsPath) {
      // Avoid doing full-page refreshes when navigating around doc pages. The docs-renderer
      // component hijacks links to internal pages so we can do smooth in-app transitions here:
      if (docsPath) {
        this.transitionTo('docs.page', docsPath);
      } else {
        this.transitionTo('docs.index');
      }
    }
  }
});
