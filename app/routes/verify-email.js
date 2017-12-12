import Route from '@ember/routing/route';
import $ from 'jquery';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {
  queryParams: {
    code: '',
  },
  model(params) {
    return $.ajax({
      type: 'PATCH',
      url: `/api/v1/email-verifications/${params.code}`,
    })
      .then(() => {
        return {success: true};
      })
      .catch(e => {
        try {
          return e.responseJSON.errors[0].detail;
        } catch (_) {
          // no-op
        }
      });
  },
});
