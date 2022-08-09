<template>
  <div class="wrapper">
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <v-top></v-top>
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import vSidebar from './Sidebar.vue';
  import vTop from './HeadTop.vue';
  import bus from './bus';
  import {set} from "../../utils/auth";

  export default {
    data() {
      return {
        tagsList: [],
        collapse: false,
      }
    },
    components: {
      vSidebar, vTop
    },
    created() {
      bus.$on('collapse', msg => {
        this.collapse = msg;
      });
      this.getApplicationList()
    },
    methods: {
      getApplicationList() {
        console.log("Access Home Page")
      }

    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
