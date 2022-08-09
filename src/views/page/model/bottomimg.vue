<!--/**
* Author: Felix
* Date: 2022-02-11 11:14
* Desc: CouponList
*/
-->
<template>
  <app-container>
    <app-block is-search>
      <el-form inline :model="form" ref="searchForm" size="small">
        <el-form-item prop="keyword" label="keyword:">
          <el-input v-model="form.keyword" class="w150" placeholder="Please insert the data" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">search</el-button>
          <el-button type="default" @click="onReset">reset</el-button>
          <el-button type="success" @click="onEdit({})">create</el-button>
        </el-form-item>
      </el-form>
    </app-block>
    <app-block>
      <zm-table-data :data="tableData" :columns="columns"></zm-table-data>
      <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" :total="totalNum" layout="total,prev, pager, next">
      </el-pagination>
    </app-block>
    <NewCoupon v-model="showEdit" v-if="showEdit" :obj="currentItem" :id="currentItem.id" @after-save="getSingereData"></NewCoupon>
  </app-container>
</template>
<script>
import tableMixin from "@/mixins/zmTableMixin";
import bannerApi from "@/api/src/banner";
import { giftColumns } from "./const";
import NewCoupon from "./components/giftnew";
import Detail from "./components/detail";
export default {
  name: "CouponList",
  data() {
    return {
      param: { page: 1, size: 10, keyword: "" },
      currentPage: 1,
      tableData: [],
      totalNum: 0,
      columns: giftColumns(this),
      form: {
        keyword: "",
        articleId: "",
      },
      showEdit: false,
      showDetail: false,
      articleDataMap: {},
    };
  },
  mixins: [tableMixin],
  created() {
    this.getSingereData();
  },
  components: { NewCoupon, Detail },
  computed: {},
  watch: {},
  methods: {
    getSingereData() {
      this.$api.get(this.$urls.gift.list, { params: this.param })
        .then((res) => {
          console.log(res);
          this.tableData = res.data
          this.totalNum = parseInt(res.recordsTotal)
        });
    },
    handleCurrentChange(val) {
      this.param.page = val
      this.getSingereData()
    },
    onEdit(row) {
      this.showEdit = true;
      this.currentItem = row;
      console.log(row, "row");
    },
    onDel(row) {
      this.$confirm(`Confirm to Del?`, "Tips", {
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "warning",
      }).then(async () => {
        await this.$api.post(this.$urls.gift.del, { id: row.id })
        this.getSingereData();
        this.$message({
          message: "Del suceess",
          type: "success",
        });
      });
    },
    onSearch() {
      this.param.keyword = this.form.keyword
      this.getSingereData()
    }
  },
};
</script>
