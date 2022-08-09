<!--/**
* Author: Felix
* Date: 2022-02-11 11:14
* Desc: CouponList
*/
-->
<template>
  <app-container>
    <app-block is-search>

    </app-block>
    <app-block>
      <zm-table-data :data="tableData" :columns="columns"></zm-table-data>
      <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" :total="totalNum" layout="total,prev, pager, next">
      </el-pagination>
    </app-block>
    <!--  pop up windows -->
    <NewCoupon v-model="showEdit" v-if="showEdit" :obj="currentItem" :id="currentItem.id" @after-save="getSingereData"></NewCoupon>
  </app-container>
</template>
<script>
import tableMixin from "@/mixins/zmTableMixin";
import bannerApi from "@/api/src/banner";
import { bannerColumns } from "./const";
import NewCoupon from "./components/bannernew";
import Detail from "./components/detail";
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'



export default {
  name: "CouponList",
  data() {
    return {
      param: { page: 1, size: 10 },
      currentPage: 1,
      tableData: [],
      totalNum: 0,
      columns: bannerColumns(this),
      form: {
        url: "",
        remark: "",
      },
      showEdit: false,
      showDetail: false,
      articleDataMap: {},
	  locale: en
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
    // Get Data
    getSingereData() {
      this.$api.get(this.$urls.singer.list, { params: this.param })
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
        await this.$api.post(this.$urls.singer.del, { id: row.id })
        this.getSingereData();
        this.$message({
          message: "Del suceess",
          type: "success",
        });
      });
    },
    
    onSearch() {
      this.param.remark = this.form.remark
      this.getSingereData()
    }
  },
};
</script>
