import Ember from 'ember';
import ResetScrollMixin from '../../mixins/reset-scroll';
import markdownFiles from 'percy-docs/markdownFiles';

export default Ember.Route.extend(ResetScrollMixin, {
  model(params) {
    return Ember.RSVP.hash({
      navMarkdown: Ember.get(markdownFiles, 'nav'),
      pageMarkdown: Ember.get(markdownFiles, params.path.replace(/\//g, '.')),
    });
  }
});
