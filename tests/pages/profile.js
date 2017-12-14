import {fillable, clickable, visitable, create} from 'ember-cli-page-object';

const SELECTORS = {
  NAME_INPUT: '[data-test-profile-edit-name] input[type=text]',
  EMAIL_INPUT: '[data-test-profile-edit-email] input[type=text]',
  INFO_SUBMIT_BUTTON: '[data-test-profile-edit-submit] input[type=submit]',
};

export default create({
  visitInfoPage: visitable('/profile'),
  visitConnectedAccountsPage: visitable('/profile/connected-accounts'),

  fillInName: fillable(SELECTORS.NAME_INPUT),
  fillInEmail: fillable(SELECTORS.EMAIL_INPUT),

  submitInfoForm: clickable(SELECTORS.INFO_SUBMIT_BUTTON),
});
