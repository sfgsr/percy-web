import Ember from 'ember';
import ResetScrollMixin from '../mixins/reset-scroll';
import markdownFiles from 'percy-docs/markdownFiles';

export default Ember.Route.extend(ResetScrollMixin, {
  model() {
    return Ember.get(markdownFiles, 'index') || null;
  },
  actions: {
    docsNavigate(docsPath) {
      // docs-renderer hijacks links in the doc pages so we can do in-app transitions here:
      if (docsPath) {
        this.transitionTo('docs.page', docsPath);
      } else {
        this.transitionTo('docs.index');
      }
    }
  }
});
