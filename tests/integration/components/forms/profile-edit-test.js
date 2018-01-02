import {it, describe, beforeEach} from 'mocha';
import {setupComponentTest} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import {manualSetup, make} from 'ember-data-factory-guy';
import ProfileEditPageObject from '../../../pages/components/forms/profile-edit';

describe('Integration: FormsProfileEditComponent', function() {
  setupComponentTest('forms/profile-edit', {
    integration: true,
  });

  let user;
  beforeEach(function() {
    manualSetup(this.container);
    ProfileEditPageObject.setContext(this);

    user = make('user', {name: 'Jamie Lannister', email: 'jamie@lannisters.net'});
    this.set('user', user);
  });

  it('displays user information in form fields', function() {
    this.render(hbs`{{forms/profile-edit user=user}}`);
    expect(ProfileEditPageObject.emailInputContains).to.equal(user.get('email'));
    expect(ProfileEditPageObject.nameInputContains).to.equal(user.get('name'));
    expect(ProfileEditPageObject.isSubmitDisabled).to.equal(true);
    expect(ProfileEditPageObject.isUnverifiedEmailMessagePresent).to.equal(false);
  });

  it('enables the submit button when the name has been changed', function() {
    this.render(hbs`{{forms/profile-edit user=user}}`);
    ProfileEditPageObject.fillInName('big softie');

    expect(ProfileEditPageObject.isSubmitDisabled).to.equal(false);
  });

  it('enables the submit button when the email has been changed', function() {
    this.render(hbs`{{forms/profile-edit user=user}}`);
    ProfileEditPageObject.fillInEmail('foo@bar.com');

    expect(ProfileEditPageObject.isSubmitDisabled).to.equal(false);
  });

  it('shows a message when a user has an unverified email', function() {
    const unverifiedEmail = 'lol@rofl.com';
    const unverifiedEmailUser = make('user', {unverifiedEmail: unverifiedEmail});
    this.set('unverifiedEmailUser', unverifiedEmailUser);
    this.render(hbs`{{forms/profile-edit user=unverifiedEmailUser}}`);

    expect(ProfileEditPageObject.isUnverifiedEmailMessagePresent).to.equal(true);
    expect(ProfileEditPageObject.unverifiedEmailMessageContains(unverifiedEmail)).to.equal(true);
  });
});
