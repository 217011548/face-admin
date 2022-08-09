<!-- ZmTable-->
<template>
  <el-table ref="zmTable" v-viewer v-bind="$attrs" v-on="$listeners" :border="border" :highlight-current-row="highlightCurrentRow" :stripe="stripe" :tooltip-effe="tooltipEffect" :size="size">
    <slot />
  </el-table>
</template>

<script>
export default {
  name: 'ZmTable',
  props: {

    size: {
      type: String,
      default: 'mini'
    },
    border: {
      type: Boolean,
      default: true
    },
    highlightCurrentRow: {
      type: Boolean,
      default: true
    },

    stripe: {
      type: Boolean,
      default: true
    },
    tooltipEffect: {
      type: String,
      default: 'dark'
    }
  },
  data () {
    return {
      selects: []
    }
  },
  created () {

  },
  methods: {
    getRef () {
      return this.$refs.zmTable
    }

  }
}

</script>
<style lang='scss' scoped>
</style>
