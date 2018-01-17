import {visitable, create} from 'ember-cli-page-object';
import {PasswordUpdatedStatusPanel} from 'percy-web/tests/pages/components/password-updated-status-panel'; // eslint-disable-line

const PasswordUpdated = {
  visitSuccessfulPasswordReset: visitable('/auth/password-updated?success=true'),
  visitFailedPasswordReset: visitable('/auth/password-updated?success=false'),

  PasswordUpdatedStatusPanel,
};

export default create(PasswordUpdated);
