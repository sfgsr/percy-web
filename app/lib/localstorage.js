export default {
  get(key, defaultValue) {
    let item;
    try {
      item = JSON.parse(localStorage.getItem(key));
    } catch (_) {
      // Safari throws errors while accessing localStorage in private mode.
    } finally {
      return item || defaultValue; // eslint-disable-line no-unsafe-finally
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_) {
      // Safari throws errors while accessing localStorage in private mode.
    } finally {
      return value; // eslint-disable-line no-unsafe-finally
    }
  },

  removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (_) {
      // Safari throws errors while accessing localStorage in private mode.
    }
  },
};
