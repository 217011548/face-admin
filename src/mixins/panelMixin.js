export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    obj: {
      type: Object,
      default () {
        return {}
      }
    },
    id: {
      type: [String, Number],
      default: ''
    },
    title: {
      type: String,
      default: '新建'
    }
  },
  methods: {
    close () {
      this.$emit('input', false)
      // 有新建时关闭方法单独写on-cancel重置id
    }
  }
}
