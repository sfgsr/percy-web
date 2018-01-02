import {visitable, create} from 'ember-cli-page-object';
import {ProfileEdit} from './components/forms/profile-edit';
import {ConnectedAccountsPanel} from './components/connected-accounts-panel';

const ProfilePage = {
  visitInfoPage: visitable('/profile'),
  infoForm: ProfileEdit,

  visitConnectedAccountsPage: visitable('/profile/connected-accounts'),
  connectedAccountsPanel: ConnectedAccountsPanel,
};

export default create(ProfilePage);
