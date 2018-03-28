import Service, {inject as service} from '@ember/service';

export default Service.extend({
  store: service(),
  getUnchangedSnapshots(buildId) {
    return this.get('store').query('snapshot', {
      filter: {
        build: buildId,
        with_diffs: false,
      },
    });
  },

  getChangedSnapshots(buildId) {
    return this.get('store').query('snapshot', {
      filter: {
        build: buildId,
        with_diffs: true,
      },
    });
  },
});
