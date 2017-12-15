import {property, clickable, isVisible, create} from 'ember-cli-page-object';

const SELECTORS = {
  ADD_EMAIL_PASSWORD_IDENTITY_BUTTON: '[data-test-connected-accounts-panel-add-ep-identity]',
  DELETE_EMAIL_PASSWORD_IDENTITY_BUTTON: '[data-test-connected-accounts-panel-delete-ep-identity]',
  ADD_GITHUB_IDENTITY_BUTTON: '[data-test-connected-accounts-panel-add-github-identity]',
  DELETE_GITHUB_IDENTITY_BUTTON: '[data-test-connected-accounts-panel-delete-github-identity]',
};

export default create({
  isAddAuth0IdentityVisible: isVisible(SELECTORS.ADD_EMAIL_PASSWORD_IDENTITY_BUTTON),
  clickAddAuth0Identity: clickable(SELECTORS.ADD_EMAIL_PASSWORD_IDENTITY_BUTTON),

  isDeleteAuth0IdentityDisabled: property(
    'disabled',
    SELECTORS.DELETE_EMAIL_PASSWORD_IDENTITY_BUTTON,
  ),
  clickDeleteAuth0Identity: clickable(SELECTORS.DELETE_EMAIL_PASSWORD_IDENTITY_BUTTON),

  isAddGithubIdentityVisible: isVisible(SELECTORS.ADD_GITHUB_IDENTITY_BUTTON),
  clickAddGithubIdentity: clickable(SELECTORS.ADD_GITHUB_IDENTITY_BUTTON),

  isDeleteGithubIdentityDisabled: property('disabled', SELECTORS.DELETE_GITHUB_IDENTITY_BUTTON),
  clickDeleteGithubIdentity: clickable(SELECTORS.DELETE_GITHUB_IDENTITY_BUTTON),
});
