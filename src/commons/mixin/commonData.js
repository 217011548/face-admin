import * as utils from "@/utils"

// import * as selectApi from '@/api/src/publicSelect'
export default {
  props: {
    k1: String,
    labelName: {
      type: String,
      default: 'name'
    },
    list: Array,
    valueKey: {
      type: String,
      default: 'value'
    },
    hasAll: {
      type: Boolean,
      default: false
    },
    allLabel: {
      type: String,
      default: 'All'
    },
    allValue: {
      type: String,
      default: '-1'
    },
    api: String,
    disabledValue: [String, Array], // ',' cannot use
    params: {
      type: Object,
      default () {
        return {}
      }

    }
  },
  data () {
    return {
      apiList: []
    }
  },

  computed: {
    allItem () {
      return {
        [this.labelName]: this.allLabel,
        [this.valueKey]: this.allValue
      }
    },
    dataList () {
      return this.apiList.length ? this.apiList : this.getDataList()
    },
    currentDisabled () {
      let disabledValue = this.disabledValue || ''
      if (disabledValue instanceof Array) {
        return disabledValue
      }
      return disabledValue.split(',').filter(Boolean)
    }
  },
  created () {
    this.getApiList()
  },

  methods: {
    // Init Method
    getDataList () {
      if (this.api) {
        return []
      }
      let list = []
      if (this.list) {
        list = this.list
      } else if (this.k1) {
        list = this.$auth.getBaseDataByType(this.k1)
      }
      list = utils.deep(list)
      if (this.hasAll) {
        list.unshift(this.allItem)
      }
      return list
    },
    getApiList () {
      // if (this.api) {
      //   selectApi[this.api](this.params).then(res => {
      //     let list = res
      //     if (this.hasAll) {
      //       list.unshift(this.allItem)
      //     }
      //     this.apiList = list
      //   })
      // }
    },

    hasDisabled (item) {
      let {[this.valueKey]: value, disabled} = item
      return this.currentDisabled.includes(value) || disabled
    }

  }

}
