<template>
  <by-dialog
    :title="data.title"
    :visible="data.visible"
    @ok="onSubmit('form')"
    @cancel="closeDialog"
    @close="closeDialog"
    width="30%"
  >
    <div slot="body">
      <el-form ref="form" :model="data.form" label-width="120px">
        <el-form-item label="id" v-if="!data.isAdd">
          <el-input v-model="data.form.id" :disabled="!data.isAdd"></el-input>
        </el-form-item>
        <div>
          <el-form-item label="ID：" prop="username">
            <el-input v-model="data.form.username" :disabled="!data.isAdd" />
          </el-form-item>

          <el-form-item label="PW：" prop="password">
            <el-input v-model="data.form.password" show-password />
          </el-form-item>
        </div>

      </el-form>
    </div>
  </by-dialog>
</template>
<script>
import ByDialog from "../../../common/ByDialog";

export default {
  components: { ByDialog },
  props: {
    data: Object,
  },
  data() {
    return {
      groupList: [],
      form: {
        username: "",
        password: "",
        nickname: "",
        phone: "",
        isAdmin: false,
        communityId: "",
      },
      options: [],
      value: "",
      rules: {
        communityId: [
          { required: true, message: "Select the group", trigger: "blur" },
        ],
        username: [{ required: true, message: "Enter ID", trigger: "blur" }],
        password: [{ required: true, message: "Enter PW", trigger: "blur" }],
        nickname: [
          { required: true, message: "Enter user name", trigger: "blur" },
        ],
        phone: [{ required: true, message: "Enter phone", trigger: "blur" }],
      },
    };
  },
  methods: {
    onSubmit(formName) {
      console.log("Login success");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("Complete fill");
          let url = this.$urls.comuser.adduser;
          let param = this.data.form;
          console.log(param);
          console.log(param);
          console.log(JSON.stringify(param));
          this.$api.post(url, param).then((res) => {
            if (res.status === 0) {
              this.$message.success({ message: "Save Success", duration: 10000 });
              this.$emit("refresh");
            } else {
              console.log("shibaile");
              this.$message.error({ message: "Save Fail", duration: 10000 });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getAllGroups() {
      this.$api.get(this.$urls.communityGroup.list2).then((res) => {
        console.log(res);
        this.groupList = res.data;
      });
    },

    getshequlist() {
      this.$api
        .get(this.$urls.comuser.shequlist, { params: { limit: 100 } })
        .then((res) => {
          console.log(res);
          this.options = res.data;

        });
    },
    //
    communchange(e) {
      console.log(e);
      this.data.form.communityName = e.communityName;
      this.data.form.communityId = e.id;
    },
    closeDialog() {
      this.$emit("close");
    },
    onSelectChange() {},
  },
  mounted() {
  },
};
</script>
