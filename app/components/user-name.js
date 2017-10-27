import {computed} from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  user: null,
  classes: null,
  linked: true,

  tagName: 'span',
  classNames: ['UserName'],
  classNameBindings: ['classes'],

  href: computed('user.githubUrl', function() {
    return this.get('user.githubUrl');
  }),
});
