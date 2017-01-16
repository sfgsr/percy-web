import Ember from 'ember';
import ResetScrollMixin from '../../mixins/reset-scroll';
import percyDocs from 'percy-docs';

export default Ember.Route.extend(ResetScrollMixin, {
  model(params) {
    let pageMarkdown = Ember.get(percyDocs.markdownFiles, params.path.replace(/\//g, '.'));
    let pageTitleMatch = /# (.*)/.exec(pageMarkdown);
    let pageTitle = pageTitleMatch ? pageTitleMatch[1] : 'Docs';

    return Ember.RSVP.hash({
      docPath: `/docs/${params.path}`,  // TODO(fotinakis): make more dynamic?
      navMarkdown: Ember.get(percyDocs.markdownFiles, 'nav'),
      pageMarkdown: pageMarkdown,
      pageTitle: pageTitle,
    });
  }
});
