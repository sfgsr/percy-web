import Ember from 'ember';

export default Ember.Component.extend({
  markdown: null,
  isDocsNav: null,

  didInsertElement() {
    this._super(...arguments);

    if (window.location.hash && !this.get('isDocsNav')) {
      Ember.run.next(this, function() {
        this.get('_scrollToAnchor')(window.location.hash);
      });
    }
  },

  click(event) {
    // Handle on page anchor link redirects.
    if (event.target.parentElement.tagName === 'A' && event.target.parentElement.hash) {
      this.get('_scrollToAnchor')(event.target.parentElement.hash);
      return true;
    }

    // Hijack clicks on link to pages that are in-app, so we can let the route handle them nicely.
    // Since docs come from an addon, we do this to handle in-app links smoothly via transitions.
    let hostWithProtocol = window.location.protocol + '//' + window.location.host;
    if (event.target.tagName === 'A' && event.target.href.indexOf(hostWithProtocol) === 0) {
      // The target link is part of this app. Hijack the transition and stop bubbling.
      let docsPath = event.target.href.split(hostWithProtocol + '/docs')[1].split('#')[0].slice(1);
      this.send('docsNavigate', docsPath);
      return false;
    }
  },
  _scrollToAnchor(hash) {
    // Manually resetting the hash seems necessary to "hijack" normal browser anchor jumping
    // behavior.
    window.location.hash = '';
    let scrollTarget = Ember.$(`#_${hash.slice(1)}`);
    let offset = Ember.$(scrollTarget).position().top - 15;

    window.scrollTo(0, offset);
    window.location.hash = hash;
  },
  actions: {
    docsNavigate(docsPath) {
      this.sendAction('docsNavigate', docsPath);
    },
  },
});
