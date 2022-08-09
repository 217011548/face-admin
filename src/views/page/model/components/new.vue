<template>
  <zm-dialog
    :title="titleText"
    :visible.sync="value"
    append-to-body
    :before-close="dialogClose"
    :close-on-click-modal="false"
  >
    <el-form label-width="100px" :model="form" :rules="formRule" ref="form">
      <el-form-item prop="type" label="Type:">
        <el-select
          v-model="sececttype"
          value-key="value"
          @change="typechange"
          placeholder="PLease select"
          style="width: 100%"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="indexType" label="Type index:">
        <el-select
          v-model="form.indexType"
          value-key="value"
          placeholder="PLease select"
          style="width: 100%"
        >
          <el-option
            v-for="item in locationoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="title" label="Title:">
        <el-input v-model="form.title" placeholder="Please insert the titel" />
      </el-form-item>
      <el-form-item prop="author" label="author:">
        <el-input v-model="form.author" placeholder="Please insert the author" />
      </el-form-item>
      <el-form-item prop="shortContent" label="Content">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="Please insert the Content"
          v-model="form.shortContent"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="img" label="Image:">
        <zm-image-upload
          v-model="form.img"
          :limit="1"
          accept=".jpg, .JPG, .jpeg, .JPEG, .png, .PNG"
        ></zm-image-upload>
      </el-form-item>
      <el-form-item prop="content" label="Content">
        <zm-editor v-model="form.content"></zm-editor>
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
import couponApi from "@/api/src/coupon";
import { ZmImageUpload } from "@/components/ZmUpload/index";
import validateRule from "@/utils/validateRule";
export default {
  data() {
    return {
      options: [],
      locationoptions: [],
      form: {
        type: "",
        articleTypeName: "",
        title: "",
        author: "",
        content: "",
        img: "",
        shortContent: "",
      },
      sececttype: "",
      formRule: {
        type: [
          {
            required: true,
            message: "Please Select!",
          },
        ],
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
      return this.form.action === "dt" ? "Article details" : `${this.title}Article`;
    },
  },
  components: { ZmImageUpload },
  mixins: [dialogMixin],
  created() {},
  mounted() {
    this.form = { ...this.form, ...this.obj };
    console.log(this.form, "obj");
    this.sececttype = this.form.articleTypeName;
    // this.form.indexType = this.form.indexType;
    this.getListRequest();
    this.getwzListRequest();
  },
  methods: {
    getListRequest() {
      this.$api.get(this.$urls.article.list).then((res) => {
        console.log(res, "--");
        this.options = res.data;
      });
    },
    getwzListRequest() {
      this.$api.get(this.$urls.article.homelocation).then((res) => {
        console.log(res);
        this.locationoptions = res.data;
      });
    },
    typechange(e) {
      console.log(e);
      this.form.articleTypeName = e.label;
      this.form.type = e.value;
    },
    async submit() {
      let _valid = false;
      this.$refs.form.validate((valid) => {
        _valid = valid;
      });
      if (!_valid) return;
      console.log(this.form, "this.form");
      console.log(this.form, "this.form");


      let url = this.$urls.article.savearticle;
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
