<style lang="less">
@import url("../common.less");
</style>
<template>
  <div class="list3">
    <div slot="body">
      <by-filter
        ref="filter"
        class="filter-box"
        :children="filterData.children"
        :title="filterData.title"
        @filter="handleFilterClick"
      />
    </div>
    <div class="tableBox">
      <by-table-head :actions="actions"></by-table-head>
      <div>
        <!--  Group Detail -->
        <el-table :data="groupDetail" style="width: 100%">
          <el-table-column type="index" label="Index" align="center" />

          <el-table-column prop="username" label="Username" align="center">
          </el-table-column>
          <el-table-column prop="email" label="Email" align="center" />
          <el-table-column prop="content" label="Content" align="center" />

          <el-table-column prop="createTime" label="CreateTime" align="center" />

          <el-table-column align="center" label="control" width="100">
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="small"
                @click="deleteRow(scope.row)"
                >Delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-box">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 30, 100]"
            :page-size="currentSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalNum"
          >
          </el-pagination>
        </div>
        <!-- Add user Modal -->
        <addUser
          :data="EditData"
          ref="yonghuform"
          @refresh="refresh"
          @close="closeDialog"
        />
      </div>
    </div>
  </div>
</template>
<script>
import ByDialog from "../../common/ByDialog";
import ByFilter from "../../common/ByFilter";
import ByTableHead from "../../common/ByTableHead";
import addUser from "./components/adduser.vue";

export default {
  components: { ByTableHead, ByFilter, ByDialog, addUser },
  data() {
    return {
      sear: false,
      filterData: {
        title: "searh filter",
        status: 1,
        children: [
          {
            type: "input",
            name: "keyword",
            label: "Keyword：",
            placeholder: "Keyword",
            long: true,
          },
        ],
      },
      actions: [],

      groupName: "sdf",
      groupDetail: [],
      currentPage: 1,
      currentSize: 10,
      totalNum: 0,
      isDialogVis: false,
      EditData: {
        title: "",
        isAdd: false,
        visible: false,
        ispwd: false,
        form: {
          isAdmin: false,
        },
      },
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //  Del data
    deleteRow(row) {
      console.log(JSON.stringify(row));
      console.log("Deleted");

      this.$confirm(`Confirm to Del?`, "Tips", {
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "warning",
      }).then(async () => {
        this.$api
          .post(this.$urls.contact.dellist, { id: row.id })
          .then((res) => {
            console.log(res);
            this.getListRequest();
          });
        this.$message({
          message: "Delete success",
          type: "success",
        });
      });
    },
    handleEdit(row) {
      console.log(JSON.stringify(row));
      console.log("handleEdit");
      this.EditData.visible = true;
      this.EditData.isAdd = false;
      this.EditData.ispwd = false;
      this.EditData.form = row;
      this.EditData.form.password = "";
      this.EditData.form.community = row.communityName;
      this.EditData.form.communityName = row.communityName;
      this.EditData.form.communityId = row.communityId;
    },
    // add group
    addCommunity() {
      this.EditData.form.isAdmin = false;

      this.EditData.visible = true;
      this.EditData.isAdd = true;
      this.EditData.ispwd = true;
    },
    // Get List
    getListRequest() {
      let param = this.$refs.filter.getQueryObj();
      param.page = this.currentPage;
      param.size = this.currentSize;
      this.$api.get(this.$urls.contact.list, { params: param }).then((res) => {
        console.log(res);
        this.groupDetail = res.data;
        this.totalNum = parseInt(res.recordsTotal);
      });
    },
    refresh() {
      this.closeDialog();
      this.getListRequest();
    },
    closeDialog() {
      this.EditData.visible = false;
    },
    handleFilterClick() {
      console.log("click");
      this.sear = true;
      this.currentPage = 1;
      this.getListRequest && this.getListRequest();
    },
    handleSizeChange(size) {
      this.currentSize = size;
      this.getListRequest && this.getListRequest();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getListRequest && this.getListRequest();
    },
  },
  mounted() {
    this.getListRequest();
  },
};
</script>
