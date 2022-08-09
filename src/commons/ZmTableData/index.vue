<!--
 /**
   * Author: wzw
   * Date: 2020-07-07 16:31
   * Desc: 完整表格
 */
-->
<template>
  <div class="zm-table-data">
    <!-- {{resultColumns}} -->
    <el-button
      v-if="configHeader"
      @click="showHeaderDialog"
      type="mini"
      class="fr mb5"
    >
      list
    </el-button>
    <zm-table
      ref="ZmTableData"
      v-bind="$attrs"
      v-on="$listeners"
      :row-key="pk"
      :highl-light-current-row="highlLightCurrentRow"
      @row-click="handleRowClick"
      @select="handleSelect"
      @select-all="handleSelectAll"
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentChange"
      @expand-change="handleExpandChange"
      v-if="tableVisible"
    >
      <el-table-column
        v-if="mutilple"
        type="selection"
        align="center"
        :reserve-selection="true"
        style="width:50px"
      />

      <template v-if="resultColumns && resultColumns.length">
        <template v-for="(column, index) in resultColumns">
          <zm-table-column
            :key="'table-render-' + index"
            v-if="!column.hide"
            :prop="column.prop"
            :label="column.label"
            :sortable="!!column.sortable"
            :sort-method="column.sortMethod"
            :align="column.align || 'center'"
            :width="column.width"
            :min-width="column.minWidth"
            :fixed="column.fixed"
            :type="column.type || ''"
            :show-overflow-tooltip="typeof(column.toolTip)==='undefined'?true:!!column.toolTip"
            :k1="column.k1"
            :ext-class="column.extClass"
            :is-date="!!column.isDate"
            :k-class="column.kClass"
            :head="!!column.renderHead"
          >
            <template
              slot="header"
              slot-scope="scope"
              v-if="!!column.renderHead"
            >
              <RenderHead
                :head-index="scope.$index"
                :render-head="column.renderHead"
                :column="column"
              />
            </template>

            <template slot-scope="scope" v-if="!!column.render">
              <RenderDom
                :row="scope.row"
                :col-index="index"
                :row-index="scope.$index"
                :render="column.render"
                :column="column"
              />
            </template>
          </zm-table-column>
        </template>
      </template>
      <slot />
    </zm-table>

    <zm-page-bar
      v-if="showPage && tableParams.data && tableParams.data.length"
      :total="Number(tableParams.total)"
      :current-page="tableParams.page"
      :page-size="tableParams.pageSize"
      :page-sizes="pageSizes"
      :layout="layout"
      @size-change="handleSizeChange"
      @current-change="handleIndexChange"
      class="mt20 tr"
      background
    />

    <header-select-dialog
      v-model="visible"
      v-if="visible"
      :min="headMin"
      :max="headMax"
      :origin-columns="columns"
      :columns="getConfigList()"
      @submit="headSubmit"
    />
  </div>
</template>
<script>
import HeaderSelectDialog from './components/HeaderSelectDialog'
import headConf from './mixins/headConf' // 头部配置mixins
export default {
  name: 'ZmTableData',
  components: {
    HeaderSelectDialog,
    RenderDom: {
      name: 'renderTable',
      functional: true, // 函数式组件 - 无 data 和 this 上下文 => better render
      props: {
        row: Object,
        colIndex: Number,
        rowIndex: Number,
        render: Function,
        column: {
          type: Object,
          default: null
        }
      },
      /**
       * @param {Function} createElement - 原生创建dom元素的方法， 弃用，推荐使用 jsx
       * @param {Object} ctx - 渲染的节点的this对象
       * @argument 传递参数 row index
       */
      render (createElement, ctx) {
        const { row, colIndex, rowIndex } = ctx.props
        return ctx.props.render(createElement, row, rowIndex, colIndex)
      }
    },
    RenderHead: {
      name: 'renderTableHead',
      functional: true, // 函数式组件 - 无 data 和 this 上下文 => better render
      props: {
        headIndex: Number,
        renderHead: Function,
        column: {
          type: Object,
          default: null
        }
      },
      /**
       * @param {Function} createElement - 原生创建dom元素的方法， 弃用，推荐使用 jsx
       * @param {Object} ctx - 渲染的节点的this对象
       * @argument 传递参数 column index
       */
      render (createElement, ctx) {
        const { column, headIndex } = ctx.props
        return ctx.props.renderHead(createElement, column, headIndex)
      }
    }
  },
  mixins: [headConf],
  props: {
    configHeader: Boolean, // 是否可配置表头
    storeKey: '', // 配置表头 本地存储的key
    pageSizes: {
      type: Array,
      default () {
        return [10, 20, 30, 50]
      }
    },
    columns: Array, // jsx表格内容
    fetch: Function, // 获取数据的函数
    showPage: {
      // 是否分页
      type: Boolean,
      default: true
    },
    layout: {
      // 分页参数
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    highlLightCurrentRow: {
      // 是否高亮
      type: Boolean,
      default: false
    },
    mutilple: {
      // 是否多选
      type: Boolean,
      default: false
    },
    rowKey: {
      // row唯一标识
      type: String,
      default: 'id'
    },
    createFetch: {
      // 是否直接加载数据
      type: Boolean,
      default: true
    },
    checked: {
      // 回填Id数组
      type: Array,
      default () {
        return []
      }
    },
    tableParams: {
      type: [String, Boolean, Object],
      default () {
        return {
          data: [],
          page: 1,
          pageSize: 10,
          total: 0,
          selectList: []
        }
      }
    },
    expand: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: false,
      selectCache: [], // 二维数组，包含每页勾选
      tableVisible: true,
      configHeadList: null
    }
  },
  computed: {
    pk () {
      return this.rowKey
    },
    resultColumns () {
      let columns = this.columns
      // 可配置表头 & 默认展示表头有数据
      if (this.configHeader) {
        return this.configHeadList || this.getConfigHeadList()
      }
      return columns
    }
  },
  watch: {
    checked (val) {
      const arr = val || []
      this.backCheckTable(arr)
    }
  },
  created () {},
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // 初始化
      if (this.fetch && this.createFetch) {
        this.innerFetch()
      }
    },
    async innerFetch () {
      // 嵌套fetch
      await this.fetch()
      const cacheArr = this.pageCacheComputor()
      const ids = cacheArr.map(i => i[this.pk])
      this.backCheckTable(ids)
    },
    pageCacheComputor () {
      // 翻页勾选数组缓存获取
      const cacheArr = this.selectCache[this.tableParams.page - 1]
      if (cacheArr) {
        return cacheArr
      } else {
        return (
          this.tableParams.data.filter(i =>
            this.checked.includes(i[this.pk])
          ) || []
        )
      }
    },
    async handleSizeChange (size) {
      // 切换每页显示的数量
      this.tableParams.page = 1 // 重置为第一页
      this.tableParams.pageSize = size
      await this.innerFetch()
    },
    handleIndexChange (current) {
      // 切换页码
      this.tableParams.page = current
      this.innerFetch()
    },
    handleRowClick (row, col, e) {
      // 当某一行被点击时会触发该事件
      this.$emit('row-click', row, col, e)
    },
    handleSelect (selection, row) {
      // 当用户手动勾选数据行的 Checkbox 时触发的事件
      this.$emit('select', selection, row)
      this.$emit('once-select', row)
    },
    handleSelectAll (selection) {
      // 当用户手动勾选全选 Checkbox 时触发的事件
      this.$emit('select-all', selection)
      this.$emit('once-select-all', selection)
    },
    handleSelectionChange (selection) {
      // 当选择项发生变化时会触发该事件
      this.$set(this.selectCache, this.tableParams.page - 1, selection)
      this.tableParams.selectList = [...selection]
      this.$emit('selection-change', selection)
    },
    handleCurrentChange (currentRow, oldCurrentRow) {
      // 当表格的当前行发生变化的时候会触发该事件
      if (currentRow && this.highlLightCurrentRow) {
        this.tableParams.selectList = [{ ...currentRow }]
      }
      this.$emit('current-change', currentRow, oldCurrentRow)
    },
    handleExpandChange (row, expandedRow) {
      // 当用户对某一行展开或者关闭的时候会触发该事
      this.$emit('expand-change', row, expandedRow)
    },
    clearSelection () {
      // 清空选择
      const parent = this.$refs.ZmTableData
      parent.$refs.zmTable.clearSelection()
    },
    backCheckTable (arr = []) {
      // 回填
      if (!arr.length) return
      for (let len = this.tableParams.data.length; len--;) {
        const row = this.tableParams.data[len]
        if (arr.includes(row[this.pk])) {
          this.toggleRow(row, true)
        }
      }
    },
    toggleRow (row, status) {
      // 改变行选择状态
      const parent = this.$refs.ZmTableData
      parent.$refs.zmTable.toggleRowSelection(row, status)
    },

    showHeaderDialog () {
      this.visible = true
    },

    reviewTable () {
      this.tableVisible = false
      this.$nextTick(() => {
        this.tableVisible = true
      })
    },
    // 重置功能，清除已勾选的缓存数据
    clearCacheData () {
      this.selectCache = []
    }
  }
}
</script>
