<!-- ZmDatePicker -->
<template>
  <el-date-picker :default-time="defTime" v-model="currentValue" v-bind="$attrs" v-on="$listeners" :type="type" :range-separator="rangeSeparator" :start-placeholder="startPlaceholder" :end-placeholder="endPlaceholder" :placeholder="placeholder" :value-format="vFormat" :picker-options="pickerOptions" ref="picker">
  </el-date-picker>
</template>

<script>
export default {
  name: 'ZmDatePicker',
  props: {
    placeholder: {
      type: String,
      default: 'Pick up the date'
    },
    type: {
      type: String,
      default: 'daterange'
    },
    rangeSeparator: {
      type: String,
      default: 'to'

    },
    startPlaceholder: {
      type: String,
      default: 'Start date'

    },
    endPlaceholder: {
      type: String,
      default: 'End Date'

    },
    value: {
      type: [String, Array]
    },

    valueFormat: {
      type: String

    },
 
    target: Object,
    startKey: {
      type: String,
      default: 'startAt'
    },
    endKey: {
      type: String,
      default: 'endAt'
    },

    hasTip: Boolean, 

    defaultTime: {
      type: Array,
      default: () => {
        return ['00:00:00', '23:59:59']
      }
    }

  },

  data () {
    return {

    }
  },

  computed: {
    currentValue: {
      set (v) {
        const target = this.target
        if (target) {
          v = v || []
          target[this.startKey] = v[0] || ''
          target[this.endKey] = v[1] || ''
          return
        }
        this.$nextTick(() => {
          this.$emit('input', v || '')
        })
      },
      get () {
        const target = this.target
        if (target) {
          const array = [target[this.startKey], target[this.endKey]].filter(Boolean)
          return array
        }
        return this.value || ''
      }
    },
    vFormat () {
      let valueFormat = this.valueFormat
      if (valueFormat) {
        return valueFormat
      }
      let type = this.type
      if (type === 'daterange' || type === 'date') {
        valueFormat = 'yyyy-MM-dd'
      } else if (type === 'monthrange' || type === 'month') {
        valueFormat = 'yyyy-MM'
      } else if (type === 'datetimerange' || type === 'datetime') {
        valueFormat = 'yyyy-MM-dd HH:mm:ss'
      }
      return valueFormat
    },

    pickerOptions () {
      const shortcuts = [{
        text: 'today',
        onClick (picker) {
          picker.$emit('pick', [new Date(), new Date()])
        }
      }, {
        text: 'yesterday',
        onClick (picker) {
          const end = new Date()
          const start = new Date(end.getTime() - 24 * 60 * 60 * 1000)
          picker.$emit('pick', [start, end])
        }
      },
      {
        text: 'last 7 day',
        onClick (picker) {
          const end = new Date()
          const start = new Date(end.getTime() - 24 * 60 * 60 * 1000 * 7)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '近30天',
        onClick (picker) {
          const end = new Date()
          const start = new Date(end.getTime() - 24 * 60 * 60 * 1000 * 30)

          picker.$emit('pick', [start, end])
        }
      }]

      return this.hasTip ? { shortcuts } : {}
    },
    defTime () {
      let defTime = this.defaultTime
      if (this.type === 'datetimerange') {
        return defTime
      } else {
        return false
      }
    }
  },
  mounted () {

  },
  methods: {
  
    init () { }
  }
}

</script>
<style lang='scss' scoped>
</style>
