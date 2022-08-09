import * as utils from '@/utils/index'
export default {
  name: 'ColumnRender',
  props: {
    row: Object,
    k1: String, 
    extClass: String, 
    isDate: Boolean,
    kClass: String, 

    renderDom: {
      type: Object
    }

  },
  computed: {
    currentClass () {
      return this.getClass(this.getTarget(this.row))
    },
    currentLable () {
      return this.getValue(this.getTarget(this.row))
    }
  },
  methods: {
    getTarget (row) {
      const prop = this.$attrs.prop || ''
      const props = prop.split('.').filter(i => i)
      let target = utils.deep(row)
      props.forEach(i => {
        target = target[i]
      })

      return target
    },
    getValue (v) {
      if (this.k1) {
        return utils.getBaseDateValue(v, this.k1)
      } else if (this.isDate) {
        return utils.dft(v, 'YYYY-MM-DD', '-')
      } else if (v instanceof Array) {
        return v.length > 0 ? v : '-'
      }
      return v || '-'
    },

    getClass (v) {
      let extClass = this.extClass || ''
      if (this.kClass) {
        const kclass = utils.getBaseDateValue(v, this.kClass, 'zmClass')
        extClass = extClass + ' ' + kclass
      } else if (this.k1) {
        const m1class = utils.getBaseDateValue(v, this.k1, 'zmClass')
        extClass = extClass + ' ' + m1class
      }

      return extClass
    }
  },

  render (h) {
    if (this.renderDom) {
      return this.renderDom.render(h)
    }
    return <div class="wb ell" class={this.currentClass}>{this.currentLable}</div>
  }
}
