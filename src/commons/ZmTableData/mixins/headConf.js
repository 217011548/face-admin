import {CHECKED, HEAD_FIXED} from '../const'
import LocStore from '../locStore/index'
let locStore = new LocStore('tableHead', {}, 'loc')
export default {
  props: {
    headMin: {
      type: [Number, String],
      default: 5
    },
    headMax: {
      type: [Number, String],
      default: 15
    }
  },
  methods: {

    // 获取配置表头数据，用于表格展示
    getConfigHeadList () {
      let storeList = this.getStoreHeadList()
      let map = []
      let fixedList = this.columns.filter(i => i[HEAD_FIXED] === '1') // 设置固定的项
      if (!storeList.length) {
        map = this.columns.filter(i => i[CHECKED] === '1' && !i[HEAD_FIXED])
      } else {
        let visibleList = storeList.filter(item => item[CHECKED] === '1')

        visibleList.forEach(item => {
          let target = this.columns.find(i => i.prop === item.prop)
          if (target) {
            map.push(target)
          }
        })
      }
      let resultList = [...map.filter(i => i[HEAD_FIXED] !== '1'), ...fixedList] // 过滤掉原有掉固定项，将现有固定项插入尾部
      return resultList
    },

    headSubmit (list) {
      this.setStoreHeadList(list)
      this.configHeadList = this.getConfigHeadList()
      this.reviewTable()
      this.visible = false
    },

    // 获取缓存数据
    getStoreHeadList () {
      let tableHead = locStore.get()
      return tableHead[this.storeKey] || []
    },

    // 设置缓存数据
    setStoreHeadList (list) {
      let tableHead = locStore.get()
      if (!this.storeKey) {
        console.error('storeKey must pass')
        return
      }
      tableHead[this.storeKey] = list
      locStore.set(tableHead)
    },

    // 获取可配置表头数据
    getConfigList () {
      let storeList = this.getStoreHeadList()
      let map = []
      if (!storeList.length) {
        map = this.columns
      } else {
        // 对比原来数据,处理原有字段丢失或者新增
        storeList.forEach(item => {
          if (this.columns.find(i => i.prop === item.prop)) {
            map.push(item)
          }
        })

        this.columns.forEach(item => {
          if (!storeList.find(i => i.prop === item.prop)) {
            map.push(item)
          }
        })
      }
      return map.filter(i => i[HEAD_FIXED] !== '1') //
    }
  }
}
