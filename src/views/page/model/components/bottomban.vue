<template>
  <zm-dialog
    :title="titleText"
    :visible.sync="value"
    append-to-body
    :before-close="dialogClose"
    :close-on-click-modal="false"
  >
    <el-form label-width="150px" :model="form" :rules="formRule" ref="form">
      <el-form-item prop="img" label="Image:">
        <zm-image-upload
          v-model="form.img"
          :limit="1"
          accept=".jpg, .JPG, .jpeg, .JPEG, .png, .PNG"
        ></zm-image-upload>
      </el-form-item>
      <el-form-item prop="url" label="url:">
        <el-input v-model="form.url" placeholder="please insert the link"> </el-input>
      </el-form-item>

      <el-form-item prop="sortNum" label="Sort:">
        <el-input-number
          v-model="form.sortNum"
          :min="1"
          label="Decs"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="tr">
      <el-button @click="dialogClose">Cancel</el-button>
      <el-button type="primary" @click="submit" v-if="form.action !== 'dt'"
        >Yes</el-button
      >
    </div>
  </zm-dialog>
</template>

<script>
import dialogMixin from "@/mixins/dialogMixin";
import bannerApi from "@/api/src/bottomban";
import { ZmImageUpload } from "@/components/ZmUpload/index";
import validateRule from "@/utils/validateRule";
export default {
  data() {
    return {
      options: [],
      banneroptions: [],
      form: {
        img: "",
        url: "",
        sortNum: "",
      },
      formRule: {
        img: {
          required: true,
          message: "Please upload!",
        },
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        },
      },
    };
  },
  computed: {
    titleText() {
      return this.form.action === "dt" ? "Detail" : `${this.title}page`;
    },
  },
  components: { ZmImageUpload },
  mixins: [dialogMixin],
  created() {},
  mounted() {
    this.form = { ...this.form, ...this.obj };
    console.log(this.form, "obj");
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

      await bannerApi.save(Object.assign({}, this.form, { id: this.id }));
      this.$emit("after-save");
      this.$message.success("Success");
      this.dialogClose();
    },
  },
};
</script>
