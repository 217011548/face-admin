const urls = {
  // management page
  singer: {
    add: "/admin/link/save",
    list: "/admin/link/page",
    del: "/admin/link/delete"
  },
  login: "/admin/user/login"
};

export default {
  install: function(Vue, Option) {
    Object.defineProperty(Vue.prototype, "$urls", { value: urls });
  }
};
