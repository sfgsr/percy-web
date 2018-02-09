import localStorageProxy from 'percy-web/lib/localstorage';

export const ADMIN_MODE_KEY = 'percyMode';
export const ADMIN_MODE_VALUE = 'admin';

export default {
  isAdmin() {
    return localStorageProxy.get(ADMIN_MODE_KEY) === ADMIN_MODE_VALUE;
  },
  getAdminMode() {
    return localStorageProxy.get(ADMIN_MODE_KEY);
  },
  setAdminMode() {
    return localStorageProxy.set(ADMIN_MODE_KEY, ADMIN_MODE_VALUE);
  },
  excludeFromAnalytics() {
    return this.isAdmin();
  },
  clear() {
    localStorageProxy.removeItem(ADMIN_MODE_KEY);
  },
};
