import {get} from '@ember/object';
import {hash} from 'rsvp';
import Route from '@ember/routing/route';
import ResetScrollMixin from '../mixins/reset-scroll';
import percyDocs from 'percy-docs';

export default Route.extend(ResetScrollMixin, {
  model() {
    return hash({
      navMarkdown: get(percyDocs.markdownFiles, 'nav'),
      pageMarkdown: get(percyDocs.markdownFiles, 'index'),
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
    },
  },
});
