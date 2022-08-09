<!-- ZmPageBar -->
<template>
  <el-pagination v-bind="$attrs" v-on="$listeners" :current-page.sync="CurrentPage" :page-sizes="pageSizes" :layout="layout">
  </el-pagination>
</template>

<script>
export default {
  name: 'ZmPageBar',
  props: {
    currentPage: Number,
    pageSizes: {
      type: Array,
      default () { return [1, 10, 20, 30, 40, 50] }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  data () {
    return {
    }
  },
  computed: {
    CurrentPage: {
      set (v) {
        this.$emit('update:currentPage', v)
      },
      get () {
        return this.currentPage
      }
    }
  },
  methods: {
    init () { }
  }
}

</script>
<style lang='scss' scoped>
</style>
