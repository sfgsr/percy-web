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

  keys() {
    try {
      const ret = [];
      for (var i = 0; i < localStorage.length; i++) {
        ret.push(localStorage.key(i));
      }
      return ret;
    } catch (_) {
      // Safari throws errors while accessing localStorage in private mode.
    }
  },

  keysWithString(string) {
    return this.keys().filter(key => {
      return new RegExp(string).test(key);
    });
  },

  removeKeysWithString(string) {
    this.keysWithString(string).forEach(key => {
      this.removeItem(key);
    });
  },
};
