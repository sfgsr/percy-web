import Ember from 'ember';
import ResetScrollMixin from '../../mixins/reset-scroll';
import percyDocs from 'percy-docs';

export default Ember.Route.extend(ResetScrollMixin, {
  model(params) {
    let pageMarkdown = Ember.get(percyDocs.markdownFiles, params.path.replace(/\//g, '.')) || '';
    let pageTitleMatch = /# (.*)/.exec(pageMarkdown);
    let pageTitle = pageTitleMatch ? pageTitleMatch[1] : 'Docs';

    let headerRegex = /\n(#{2,3}) ((.+))\n/g;
    let anchoredMarkdown = pageMarkdown.replace(headerRegex, function(match, hashes, title) {
      let titleDashed = title.replace(/( \(.*?\))/g, '').dasherize();

      return `\n${hashes} ${title} \
        <a href="#${titleDashed}" id="_${titleDashed}" class="DocsAnchor"> \
          <i aria-hidden="true" class="fa fa-link"></i> \
        </a>\n`;
    });

    return Ember.RSVP.hash({
      docPath: `/docs/${params.path}`,  // TODO(fotinakis): make more dynamic?
      navMarkdown: Ember.get(percyDocs.markdownFiles, 'nav'),
      pageMarkdown: anchoredMarkdown,
      pageTitle: pageTitle,
    });
  },
});
