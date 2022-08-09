<!-- ZmTableColumn -->
<template>
  <el-table-column :show-overflow-tooltip="showOverflowTooltip" v-bind="$attrs" v-on="$listeners" :align="align" v-if="!head">
    <template slot-scope="scope">
      <span v-if="isIndex">{{scope.$index + 1}}</span>
      <div v-else class="wb column-content">
        <slot v-bind="scope">
          <RenderDom :row="scope.row" v-bind="$attrs" class="ell" />
        </slot>
      </div>
    </template>
  </el-table-column>
  <el-table-column :show-overflow-tooltip="showOverflowTooltip" v-bind="$attrs" v-on="$listeners" :align="align" v-else>
    <template slot="header" slot-scope="scope">
      <slot name="header" v-bind="scope"></slot>
    </template>
    <template slot-scope="scope">
      <span v-if="isIndex">{{scope.$index + 1}}</span>
      <div v-else class="wb column-content">
        <slot v-bind="scope">
          <RenderDom :row="scope.row" v-bind="$attrs" class="ell" />
        </slot>
      </div>
    </template>
  </el-table-column>
</template>

<script>
import RenderDom from './RenderDom'
export default {
  name: 'ZmTableColumn',
  components: { RenderDom },
  props: {
    align: { type: String, default: 'center' },
    showOverflowTooltip: { type: Boolean, default: true },
    head: { type: Boolean, default: false }
    //

  },
  data () {
    return {

    }
  },
  computed: {
    isIndex () {
      let { type, prop } = this.$attrs
      return type === 'index'
    }
  },

  methods: {
    
    init () { }
  }
}

</script>
<style lang='scss' scoped>
</style>
