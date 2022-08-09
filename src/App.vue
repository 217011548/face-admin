<template>
  <div class="app-outer">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style>
@import "../static/css/main.css";
.app-outer {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
