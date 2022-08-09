<template>
  <zm-dialog :title="titleText" :visible.sync="value" append-to-body :before-close="dialogClose" :close-on-click-modal="false">
    <el-form label-width="150px" :model="form" :rules="formRule" ref="form">

      <!-- Icon -->
      <el-form-item prop="url" label="Icon:">
        <zm-image-upload v-model="form.url" :limit="1" accept=".jpg, .JPG, .jpeg, .JPEG, .png, .PNG"></zm-image-upload>
      </el-form-item>
      <!-- Remark -->
      <el-form-item prop="remark" label="Remark:">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="tr">
      <el-button @click="dialogClose">Cancel</el-button>
      <el-button type="primary" @click="submit" v-if="form.action !== 'dt'">Yes</el-button>
    </div>
  </zm-dialog>
</template>

<script>
import dialogMixin from "@/mixins/dialogMixin";
import { ZmImageUpload } from "@/components/ZmUpload/index";
export default {
  data() {
    return {
      form: {
        url: '',
        remark: ''
      },
      formRule: {
        url: [
          {
            required: true,
            message: "Please upload!",
          },
        ]
      },
    };
  },
  computed: {
    titleText() {
      return "add item";
    },
  },
  components: { ZmImageUpload },
  mixins: [dialogMixin],
  created() { },
  mounted() {
    this.form = { ...this.form, ...this.obj };
    console.log(this.form, "obj");
    this.sececttype = this.form.bannerTypeName;
  },
  methods: {
    async submit() {
      let _valid = false;
      this.$refs.form.validate((valid) => {
        _valid = valid;
      });
      if (!_valid) return;
      console.log(this.form, "this.form");
      console.log(this.form, "this.form");
      // add item
      let url = this.$urls.singer.add;
      let param = this.form;
      this.$api.post(url, param).then((res) => {

        if (res.status === 0) {
          this.$message.success({ message: "Save Success", duration: 10000 });
          this.$emit("after-save");
          this.dialogClose();
        } else {
          console.log("shibaile");
          this.$message.error({ message: "Save Fail", duration: 10000 });
        }
      });
    },
  },
};
</script>
