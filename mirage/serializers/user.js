import { JSONAPISerializer } from 'ember-cli-mirage';

export default JSONAPISerializer.extend({
  links(user) {
    return {
      'organizations': {
        related: `/api/v1/users/${user.id}/organizations`
      }
    };
  }
});
