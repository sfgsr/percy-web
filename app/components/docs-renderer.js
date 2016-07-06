import Ember from 'ember';

export default Ember.Component.extend({
  markdown: null,

  click(event) {
    // Hijack link clicks and stop bubbling so we can let the route decide how to handle the click.
    // Since docs come from an addon, we do this to handle in-app links smoothly via transitions.
    let hostWithProtocol = window.location.protocol + '//' + window.location.host;
    if (event.target.tagName == 'A' && event.target.href.indexOf(hostWithProtocol) === 0) {
      // The target link is part of this app. Hijack the transition to make it smoothly
      // transition in-app and avoid a full page refresh.
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
