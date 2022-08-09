<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handleCommand" menu-align='start'>
      <img :src="baseImgPath" class="avator">
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home">Home</el-dropdown-item>
        <el-dropdown-item command="signout">Signout</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        baseImgPath: 'static/img/avator.jpg',
      }
    },
    methods: {
      async handleCommand(command) {
        if (command == 'home') {
          this.$router.push('/');
        } else if (command == 'signout') {
          this.$message({
            type: 'success',
            message: 'Signout success'
          });
          this.$router.push('/login');
        }
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .header_container {
    background-color: #EFF2F7;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
  }

  .avator {
    width 36px
    height: 36px
    border-radius: 50%;
    margin-right: 37px;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }
</style>
