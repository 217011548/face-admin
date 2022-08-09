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
        <el-form-item prop="keyword" label="Keyword:">
          <el-input
            v-model="form.keyword"
            class="w150"
            placeholder="Please insert the keyword"
          />
        </el-form-item>
        <el-form-item prop="type" label="Please insert the Type:">
          <el-select
            v-model="form.bannerTypeName"
            clearable
            placeholder="Please select"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="type" label="Article type:">
          <el-select v-model="form.type" clearable placeholder="Please select">
            <el-option
              v-for="item in locationoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">Search</el-button>
          <el-button type="default" @click="onReset">REset</el-button>
          <el-button type="success" @click="onEdit({})">Create</el-button>
        </el-form-item>
      </el-form>
    </app-block>
    <app-block>
      <zm-table-data
        :data="tableParams.data"
        :columns="columns"
        :fetch="loadList"
        :table-params="tableParams"
      ></zm-table-data>
    </app-block>
    <NewCoupon
      v-model="showEdit"
      v-if="showEdit"
      :obj="currentItem"
      :id="currentItem.id"
      @after-save="onSearch"
    ></NewCoupon>
    <detail
      v-model="showDetail"
      v-if="showDetail"
      :obj="currentItem"
      :id="currentItem.id"
      @after-save="onSearch"
    ></detail>
  </app-container>
</template>

<script>
import tableMixin from "@/mixins/zmTableMixin";
import couponApi from "@/api/src/coupon";
import { couponColumns } from "./const";
import NewCoupon from "./components/new";
import Detail from "./components/detail";
export default {
  name: "CouponList",
  data() {
    return {
      options: [],
      locationoptions: [],
      columns: couponColumns(this),
      form: {
        keyword: "",
        type: "",
      },
      showEdit: false,
      showDetail: false,
      finarticleDataMap: {},
    };
  },
  mixins: [tableMixin],
  created() {
    this.getListRequest();
    this.getwzListRequest();
    this.getwzArticleData();
  },
  components: { NewCoupon, Detail },
  computed: {},
  watch: {},
  methods: {
    getListRequest() {
      this.$api.get(this.$urls.article.list).then((res) => {
        this.options = res.data;
      });
    },
    getwzListRequest() {
      this.$api.get(this.$urls.article.homelocation).then((res) => {
        console.log(res);
        this.locationoptions = res.data;
      });
    },
    getwzArticleData() {
      this.$api
        .get(this.$urls.article.homelocation, { params: { size: 100 } })
        .then((res) => {
          console.log(res);
          let obj = {};
          res.data.map((i) => {
            console.log(i);
            obj[i.value] = i;
          });

          this.finarticleDataMap = obj;
          console.log(this.finarticleDataMap, "this.finarticleDataMap");
        });
    },
    async loadList() {
      const _res = await couponApi.getPage(this.assignQuery(this.form));
      console.log(_res);

      this.initialTableData(_res.data, _res.recordsTotal);
    },
    onEdit(row) {

      console.log(row);
      if (JSON.stringify(row) == "{}") {
        this.$router.push("/model/finacialpage");
      } else {
        let obj = {
          path: "/model/finacialpage",
          query: { row: JSON.stringify(row) },
        };
        this.$router.push(obj);
      }
    },
    onDetail(row) {
      this.showDetail = true;
      this.currentItem = row;
    },
    onDel(row) {
      this.$confirm(`Confirm to Delete${row.title}?`, "Tips", {
        confirmButtonText: "YEs",
        cancelButtonText: "No",
        type: "warning",
      }).then(async () => {
        await couponApi.del({ id: row.id });
        this.loadList();
        this.$message({
          message: "Delete Success",
          type: "success",
        });
      });
    },
  },
};
</script>
