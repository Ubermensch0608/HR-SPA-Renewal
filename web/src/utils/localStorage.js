export const localStorage = (() => {
  return {
    check: (key) => {
      return !!window.localStorage.getItem(key);
    },
    get: (key) => {
      return JSON.parse(window.localStorage.getItem(key));
    },
    set: (key, value) => {
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    removeByOne: (key) => {
      window.localStorage.removeItem(key);
    },
    clearAll: () => {
      window.localStorage.clear();
    },
  };
})();
