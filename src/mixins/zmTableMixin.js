export default {
  data () {
    return {
      tableParams: {
        total: 0,
        page: 1,
        pageSize: 10,
        data: [],
        pageSizes: [10, 20, 30, 999],
        selectList: []
      },
      pk: 'id'
    }
  },
  methods: {
    assignQuery (query) {
      query = JSON.parse(JSON.stringify(query))
      let obj = {
        page: this.tableParams.page,
        size: this.tableParams.pageSize,
        ...query
      }
      return obj
    },
    onSearch () {
      this.clearSelection()
      this.$set(this.tableParams, 'page', 1)
      this.loadList && this.loadList()
    },
    onReset () {
      if (this.$refs.searchForm) {
        this.$refs.searchForm.resetFields()
        this.rangeTime = []
        this.onSearch()
      }
    },
    initialTableData (dataList, totalCount) {
      const tableParams = this.tableParams
      tableParams.total = totalCount || 0
      tableParams.data = Object.freeze(dataList || [])
    },
    /**
     * 获取table组件的引用
     */
    getTableRef () {
      return this.$refs.multipleTable
    },
    /**
     * 清除表格选中列的数组
     */
    clearSelection () {
      let table = this.getTableRef()
      if (table) table.clearSelection()
    },
    /**
     * 获取已选的id
     */
    getSelectionIds (idName) {
      return this.tableParams.selectList.map(i => i[idName || this.pk])
    }

  }
}
