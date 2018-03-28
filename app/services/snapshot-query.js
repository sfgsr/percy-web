import Service, {inject as service} from '@ember/service';

export default Service.extend({
  store: service(),
  getUnchangedSnapshots() {
    return this.get('store').query('snapshot', {
      filter: {
        build: this.get('build.id'),
        with_diffs: false,
      },
    });
  },

  getChangedSnapshots() {
    return this.get('store').query('snapshot', {
      filter: {
        build: this.get('build.id'),
        with_diffs: true,
      },
    });
  },
});
