import {clickable, contains, isPresent, create, visitable} from 'ember-cli-page-object';

const SELECTORS = {
  CHANGE_PASSWORD_BUTTON: '[data-test-profile-password-change-request-button]',
  CHANGE_PASSWORD_MESSAGE: '[data-test-profile-password-change-request-message]',
};

const PasswordChangeRequest = {
  visitUserSettingsPage: visitable('/settings'),

  submitRequest: clickable(SELECTORS.CHANGE_PASSWORD_BUTTON),

  isPasswordChangeButtonPresent: isPresent(SELECTORS.CHANGE_PASSWORD_BUTTON),
  isPasswordChangeMessagePresent: isPresent(SELECTORS.CHANGE_PASSWORD_MESSAGE),
  changePasswordMessageContains: contains(SELECTORS.CHANGE_PASSWORD_MESSAGE),
};

export default create(PasswordChangeRequest);
