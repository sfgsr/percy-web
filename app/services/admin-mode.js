import Ember from 'ember';

export default Ember.Service.extend({
  // We're using get and set here instead of a computed property
  // so the value returned always matches what's in local storage
  // even if the value in local storage is updated on another tab etc.
  get() {
    return window.localStorage && window.localStorage.getItem('percyMode');
  },

  set(mode) {
    window.localStorage.setItem('percyMode', mode);
  },

  clear() {
    window.localStorage.removeItem('percyMode');
  },

  // If the user has any mode set, exclude them from Analytics
  excludeFromAnalytics() {
    return !!this.get();
  },
});
