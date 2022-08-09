<template>
  <div :class="{'app-container':!$route.query.linkIframe, 'no-bg df hp100': hasLeft }">
    <template v-if="$slots.left">
      <div class="left extend" :style="leftStyle">
        <slot name="left" />
      </div>
      <div class="center flex-one">
        <slot />
      </div>
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>
<script>
export default {
  name: 'AppContainer',
  props: {
    leftWidth: {
      type: [String, Number],
      default: 180
    },
    gutters: {
      type: [String, Number],
      default: '20px'
    }
  },
  computed: {
    hasLeft () {
      return this.$slots.left
    },
    leftStyle () {
      return {
        marginRight: this.gutters,
        width: this.leftWidth
      }
    },
    data () {
      return {}
    }
  }
}
</script>
<style lang="scss">
.app-container {
  &.no-bg {
    background-color: transparent;
    // padding: 0;
  }
  .center {
    padding: 20px;
  }
  .center,
  .left {
    background: #fff;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding:1.3rem;
  }
}
</style>
