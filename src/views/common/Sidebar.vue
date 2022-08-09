<template>
  <div style="display: flex">
    <div class="sidebar">
      <el-menu
        class="sidebar-el-menu"
        :default-active="onRoutes"
        :collapse="collapse"
        background-color="rgb(50, 64, 87)"
        text-color="#ffffff"
        active-text-color="#20a0ff"
        unique-opened
        router
      >
        <template v-for="item in items">
          <template v-if="item.subs">
            <el-submenu :index="item.index" :key="item.index">
              <template slot="title">
                <i class="icon" :class="item.icon"></i
                ><span slot="title">{{ item.title }}</span>
              </template>
              <el-menu-item
                v-for="(subItem, i) in item.subs"
                :key="i"
                :index="subItem.index"
              >
                {{ subItem.title }}
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.index" :key="item.index">
              <i class="icon" :class="item.icon"></i
              ><span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
    <div
      id="version"
      :class="vCollapse ? 'version-collapse' : 'version-not-collapse'"
    >
      V1.0
    </div>
  </div>
</template>

<script>
import bus from "../common/bus";
import * as Store from "../../utils/store";
import fullMenu from "./menu";

function supportH5Storage() {
  try {
    return "localStorage" in window && window["localStorage"] != null;
  } catch (e) {
    return false;
  }
}

let roleList = [];
bus.$on("user_role_list", list => {
  roleList = list;
});

const defaultItems = [
  {
    icon: "sprite-home",
    index: "dashboard",
    title: "Home page"
  }
];

export default {
  data() {
    return {
      collapse: false,
      vCollapse: false,
      items: defaultItems
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path;
    }
  },
  created() {
    bus.$on("collapse", msg => {
      this.collapse = msg;
      if (msg) {
        setTimeout(() => {
          this.vCollapse = msg;
        }, 500);
      } else {
        this.vCollapse = msg;
      }
    });
    try {
      this.items = this.getMenu();
    } catch (e) {
      // ignore, if exception catch, use default items to ensure page show
      console.log("build sidebar items error: ", e);
    }
  },
  methods: {
    getRoleList() {
      if (!roleList || roleList.length === 0) {
        if (supportH5Storage()) {
          roleList = JSON.parse(Store.getUrlList());
        } else {
          //TODO: request to get url list
        }
      }
    },
    loopRoleList(roleList) {
      let map = {};
      if (roleList) {
        roleList.forEach(item => {
          map[item] = "1";
        });
      }
      return map;
    },
    filterMenu(menu, map) {
      for (let i = menu.length - 1; i >= 0; i--) {
        let item = menu[i];
        if (item.hasOwnProperty("subs") && item.subs.length > 0) {
          item.subs = this.filterArray(item.subs, map);
        }
        if (map[item.index] !== "1") {
          if (item.hasOwnProperty("subs")) {
            if (item.subs.length === 0) {
              menu.splice(i, 1);
            }
          } else {
            menu.splice(i, 1);
          }
        }
      }
      return menu;
    },
    filterArray(arr, map) {
      for (let i = arr.length - 1; i >= 0; i--) {
        if (map[arr[i].index] !== "1") {
          arr.splice(i, 1);
        }
      }
      return arr;
    },
    getMenu() {
      this.getRoleList();
      console.log(roleList);
      let map = this.loopRoleList(roleList);
      let m = JSON.parse(JSON.stringify(fullMenu));
      console.log(m);
      return this.filterMenu(m, map);
    }
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 30px;
  overflow-y: scroll;
  border-top: 1px solid #ffffff;
  background-color: #2e88e4;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.sidebar > ul {
  height: 100%;
}

.icon {
  display: inline-block;
  margin-right: 13px;
}

.version-collapse {
  width: 64px;
}

.version-not-collapse {
  width: 250px;
}

#version {
  border-right: solid 1px #e6e6e6;
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  color: #fff;
  font-size: 12px;
  height: 30px;
  text-align: center;
  background: rgb(50, 64, 87);
}
>>> .el-submenu__title:hover,
.el-menu-item:hover {
  background-color: #48576a !important;
}
>>> .el-submenu__title i {
  color: #ffffff;
  font-size: 14px;
}
</style>
