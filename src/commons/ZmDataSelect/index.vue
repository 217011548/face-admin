<!-- ZmDataSelect -->
<template>
  <zm-select v-model="Value" v-bind="$attrs" v-on="$listeners">
    <el-option :disabled="hasDisabled(item)" v-for="(item,index) in dataList" :key="index" :label="item[labelName]" :value="item[valueKey]+''">
      <slot v-bind="item" />
    </el-option>
  </zm-select>
</template>

<script>
import commonData from '../mixin/commonData'
export default {
  name: 'ZmDataSelect',
  mixins: [commonData],
  props: {

    value: [String, Number, Array]

  },
  data () {
    return {
    }
  },
  computed: {
    Value: {
      set (v) {
        this.$emit('input', v)
      },
      get () {
        const v = this.value
        if (v instanceof Array) {
          return v
        }
        return v + ''
      }
    }
  },
  methods: {
    getItem () {
      const dataList = this.getDataList()
      const v = this.value + ''
      const item = dataList.find(i => (i[this.valueKey] + '') === v) || {}
      return this.$utils.deep(item)
    }

  }
}

</script>
<style lang='scss' scoped>
</style>
