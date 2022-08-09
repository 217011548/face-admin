<template>
  <div>
    <el-form label-width="100px" :model="form" :rules="formRule" ref="form">
      <el-form-item prop="type" label="Type:">
        <el-select
          v-model="sececttype"
          value-key="value"
          @change="typechange"
          placeholder="Please select"
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
      <el-form-item prop="indexType" label="Article Index:">
        <el-select
          v-model="form.indexType"
          value-key="value"
          placeholder="Please select"
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
        <el-input v-model="form.title" placeholder="Please insert the Title" />
      </el-form-item>
      <el-form-item prop="title" label="Title color:">
        <el-color-picker v-model="form.color"></el-color-picker>
      </el-form-item>
      <el-form-item prop="author" label="Author:">
        <el-input v-model="form.author" placeholder="Please insert the Author" />
      </el-form-item>
      <el-form-item prop="shortContent" label="Short Content">
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
        >Confirm</el-button
      >
    </div>
  </div>
</template>

<script>
import { ZmImageUpload } from "@/components/ZmUpload/index";
export default {
  components: { ZmImageUpload },
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
        color: "#000000",
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
          message: "Please Upload!",
        },
      },
    };
  },
  methods: {
    dialogClose() {
      this.$router.go(-1);
    },
    typechange(e) {
      console.log(e);
      this.form.articleTypeName = e.label;
      this.form.type = e.value;
    },
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
          this.$message.success({ message: "Save success", duration: 10000 });
          this.$emit("after-save");
          this.dialogClose();
        } else {
          console.log("shibaile");
          this.$message.error({ message: "Save Fail", duration: 10000 });
        }
      });
    },
    rowfn() {
      let row = JSON.parse(this.$route.query.row);
      console.log(row, "row");
      if (row != undefined) {
        console.log(this.$route.query.row, "rou");
        console.log(row, "row");
        this.form = row;
        this.sececttype = this.form.articleTypeName;
      }
    },
  },
  created() {
    console.log(this.$route, "JSON.parse(this.$route.query.row)");
    this.getListRequest();
    this.getwzListRequest();
    this.rowfn();
  },
};
</script>

<style lang='less' scoped>
/deep/.ql-container {
  max-height: 1000px;
  overflow-y: auto;
}
</style>