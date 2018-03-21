import {it, describe, beforeEach} from 'mocha';
import {setupComponentTest} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import {make} from 'ember-data-factory-guy';
import ProfileEditForm from '../../../pages/components/forms/profile-edit';
import setupFactoryGuy from 'percy-web/tests/helpers/setup-factory-guy';

describe('Integration: ProfileEditForm', function() {
  setupComponentTest('forms/profile-edit', {
    integration: true,
  });

  let user;
  beforeEach(function() {
    setupFactoryGuy(this.container);
    ProfileEditForm.setContext(this);

    user = make('user', {name: 'Jamie Lannister', email: 'jamie@lannisters.net'});
    this.set('user', user);
  });

  it('displays user information in form fields', function() {
    this.render(hbs`{{forms/profile-edit user=user}}`);
    expect(ProfileEditForm.emailInputContains).to.equal(user.get('email'));
    expect(ProfileEditForm.nameInputContains).to.equal(user.get('name'));
    expect(ProfileEditForm.isSubmitDisabled).to.equal(true);
    expect(ProfileEditForm.isUnverifiedEmailMessagePresent).to.equal(false);
  });

  it('enables the submit button when the name has been changed', function() {
    this.render(hbs`{{forms/profile-edit user=user}}`);
    ProfileEditForm.fillInName('big softie');

    expect(ProfileEditForm.isSubmitDisabled).to.equal(false);
  });

  it('enables the submit button when the email has been changed', function() {
    this.render(hbs`{{forms/profile-edit user=user}}`);
    ProfileEditForm.fillInEmail('foo@bar.com');

    expect(ProfileEditForm.isSubmitDisabled).to.equal(false);
  });

  it('shows a message when a user has an unverified email', function() {
    const unverifiedEmail = 'lol@rofl.com';
    const unverifiedEmailUser = make('user', {unverifiedEmail: unverifiedEmail});
    this.set('unverifiedEmailUser', unverifiedEmailUser);
    this.render(hbs`{{forms/profile-edit user=unverifiedEmailUser}}`);

    expect(ProfileEditForm.isUnverifiedEmailMessagePresent).to.equal(true);
    expect(ProfileEditForm.unverifiedEmailMessageContains(unverifiedEmail)).to.equal(true);
  });
});
