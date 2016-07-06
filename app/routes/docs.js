import Ember from 'ember';
import ResetScrollMixin from '../mixins/reset-scroll';
import markdownFiles from 'percy-docs/markdownFiles';

export default Ember.Route.extend(ResetScrollMixin, {
  model() {
    return Ember.RSVP.hash({
      navMarkdown: Ember.get(markdownFiles, 'nav'),
      pageMarkdown: Ember.get(markdownFiles, 'index'),
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
