import Ember from 'ember';

export default Ember.Component.extend({
  markdown: null,

  click(event) {
    // Hijack clicks on link to pages that are in-app, so we can let the route handle them nicely.
    // Since docs come from an addon, we do this to handle in-app links smoothly via transitions.
    let hostWithProtocol = window.location.protocol + '//' + window.location.host;
    if (event.target.tagName === 'A' && event.target.href.indexOf(hostWithProtocol) === 0) {
      // The target link is part of this app. Hijack the transition and stop bubbling.
      let docsPath = event.target.href.split(hostWithProtocol + '/docs')[1].slice(1);
      this.send('docsNavigate', docsPath);
      return false;
    }
  },
  actions: {
    docsNavigate(docsPath) {
      this.sendAction('docsNavigate', docsPath);
    }
  }
});
