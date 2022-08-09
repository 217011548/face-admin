import Vue from "vue";
import Router from "vue-router";
import * as Store from "../utils/store";
import { supportH5Storage, checkPermission } from "./util";
import bus from "../views/common/bus";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/model/banner"
    },
    {
      path: "/",
      component: resolve => require(["../views/common/Home.vue"], resolve),
      meta: { title: "file" },
      children: [
        {
          path: "/model/banner",
          component: resolve =>
            require(["../views/page/model/banner.vue"], resolve)
        }
      ]
    },

    {
      path: "/login",
      component: resolve => require(["../views/page/Login.vue"], resolve)
    }
  ]
});

let roleList = [];
bus.$on("user_role_list", function(list) {
  Store.setUrlList(JSON.stringify(list));
  roleList = list;
});


router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else {
    let pathToCheck = to.path;
    if (roleList.length > 0) {
      checkPermission(roleList, pathToCheck) ? next() : next("/login");
    } else {
      if (supportH5Storage()) {
        if (Store.getUrlList()) {
          roleList = JSON.parse(Store.getUrlList());
        } else {
          next("/login");
        }
        if (!roleList || roleList.length === 0) {
          next("/login");
        } else {
          checkPermission(roleList, pathToCheck) ? next() : next("/login");
        }
      } else {
        next();
      }
    }
  }
});

export default router;
