<!--
/**
* Author: ganqz
* Date: 2020-12-11 15:49
* Desc: HeaderSelectDialog header
*/
-->

<template>
  <el-drawer
    class="header-select"
    title="defult display"
    :visible.sync="value"
    :before-close="dialogClose"
    append-to-body
    :wrapper-closable="true"
    direction="rtl"
    size="550px"
  >
    <div class=" df-col  header-select__box">
      <div class="header-select__desc">
        list cannot select{{ min }}，only supoort{{ max }}
      </div>
      <div class="headerTable flex1" ref="headerTable">
        <zm-table :data="resultList" v-if="show" ref="table" height="100%">
          <el-table-column align="center" label="show" width="50px">
            <template slot-scope="{ row }">
              <el-checkbox
                true-label="1"
                false-label="0"
                v-model="row[CHECKED]"
              ></el-checkbox>
            </template>
          </el-table-column>
          <zm-table-column prop="label" label="column" />
          <zm-table-column label="拖动顺序" width="100px">
            <div><i class="el-icon-rank rank-icon"></i></div>
          </zm-table-column>
        </zm-table>
      </div>

      <div class="df mt10">
        <div class="flex1 tl">
          <el-button @click="resetData" type="text">reset</el-button>
        </div>
        <el-button @click="dialogClose">cancel</el-button>
        <el-button type="primary" @click="submit">confirm</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { CHECKED, HEAD_FIXED } from "../const";
import Sortable from "sortablejs";
export default {
  name: "HeaderSelectDialog",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    originColumns: Array,
    columns: Array,
    min: {
      type: [Number, String],
      default: 5
    },
    max: {
      type: [Number, String],
      default: 15
    }
  },
  data() {
    return {
      resultList: [],
      show: true,
      CHECKED
    };
  },
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      }
    }
  },
  created() {
    this.init();
  },
  mounted() {
    this.initSortable();
  },
  methods: {
    init() {
      this.setResultList();
    },
   
    setResultList(list) {
      let columns = list || this.columns.filter(i => !i.hide);
      columns.forEach(item => {
        item[CHECKED] = item[CHECKED] || "0";
      });

      this.resultList = JSON.parse(JSON.stringify(columns));
    },
    dialogClose() {
      this.visible = false;
    },
    submit() {
      let checkLen = this.resultList.filter(i => i[CHECKED] === "1").length;
      if (checkLen > +this.max || checkLen < +this.min) {
        this.$message.warning(
          `Not Less than${this.min}，Only support${this.max}`
        );
        return;
      }
      this.$emit("submit", this.resultList);
    },

    async initSortable() {
      await this.$nextTick();
      const el = this.$refs.headerTable.querySelector(
        ".el-table__body-wrapper tbody"
      );
      this.sortable = Sortable.create(el, {
        draggable: ".headerTable .el-table__body .el-table__row",
        handle: ".headerTable .rank-icon",
        ghostClass: "sortable-ghost",
        onEnd: evt => {
          this.show = false;
          const nIndex = evt.newIndex;
          const oIndex = evt.oldIndex;
          let insertIndex = nIndex > oIndex ? nIndex - 1 : nIndex;
          let resultList = JSON.parse(JSON.stringify(this.resultList));
          resultList.splice(nIndex, 0, resultList.splice(oIndex, 1)[0]);
          this.resultList = resultList;
          this.reset();
        }
      });
    },
    reset() {
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
        this.initSortable();
      });
    },
    resetData() {
      this.show = false;
      let resultList = JSON.parse(
        JSON.stringify(this.originColumns.filter(i => !i[HEAD_FIXED]))
      );
      this.setResultList(resultList);
      this.reset();
    }
  }
};
</script>
<style lang="scss" scoped>
.rank-icon {
  font-size: 20px;
  cursor: pointer;
}
.header-select__desc {
  margin-top: -15px;
  color: #999;
  margin-bottom: 15px;
}

.header-select__box {
  height: 99%;
  box-sizing: border-box;
  padding-bottom: 20px;
  padding-right: 15px;
  padding-left: 15px;
}
</style>

<style lang="scss">
.header-select {
  .el-drawer__header {
    font-size: 20px;
    font-weight: bold;
    // color: #333;
  }
}
</style>
