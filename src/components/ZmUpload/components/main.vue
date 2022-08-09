<template>
  <el-upload
    :action="action"
    :headers="headers"
    :multiple="multiple"
    :data="data"
    :name="name"
    :with-credentials="withCredentials"
    :show-file-list="showFileList"
    :drag="drag"
    :accept="accept"
    :list-type="listType"
    :auto-upload="autoUpload"
    :file-list="computedFileList"
    :http-request="uploadHttpRequest"
    :disabled="disabled"
    :limit="limit"
    :on-preview="onPreview"
    :on-remove="onRemove"
    :on-success="onSuccess"
    :on-error="onError"
    :on-progress="onProcess"
    :on-change="onChange"
    :before-upload="beforeUpload"
    :on-exceed="onExceed"
    :class="{ 'upload-hide-add': computedFileList.length >= limit }"
    ref="upload"
  >
    <slot>
      <i class="el-icon-plus" v-if="!drag"></i>
      <div v-else>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">drag file here，or<em>click upload</em></div>
      </div>
    </slot>
    <template v-if="$slots.tip" slot="tip">
      <slot name="tip" />
    </template>
  </el-upload>
</template>

<script type="text/babel">
import { Upload } from "element-ui";
import { callOrApply, isIE } from "../utils";
import { success, warning } from "@/components/Notify";
import elementHttpRequest from "./src/ajax";
// import qiniuHttpRequest from '@packages/third/qiniu/qiniuHttpRequest'

export default {
  components: {
    ElUpload: Upload
  },
  model: {
    prop: "fileList",
    event: "change"
  },
  props: {
    action: {
      type: String,
      default: ""
    },
    headers: {
      type: Object,
      default() {
        return null;
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    name: {
      type: String,
      default: "file"
    },
    withCredentials: {
      type: Boolean,
      default: false
    },
    showFileList: {
      type: Boolean,
      default: true
    },
    drag: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: "*"
    },
    listType: {
      type: String,
      default: "text"
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    fileList: {
      type: [Array, String],
      default() {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number
    },

    exts: {
      type: Array,
      default() {
        return [];
      }
    },

    singleFileSize: {
      type: Number,
      default: 0
    },

    showMsg: {
      type: Boolean,
      default: true
    },
    httpRequest: {
      type: [String, Function],
      required: false
    }
  },
  data() {
    return {
      fileMap: {},
      tempFileList: "[]",
      removeUrl: ""
    };
  },
  computed: {
    fileSizeByte() {
      return this.singleFileSize * 1024 * 1024;
    },
    computedFileList: {
      get() {
        console.log(this.tempFileList, "tempFileList");
        console.log(this.fileList, "this.fileList");
        let tempFileList = JSON.parse(this.tempFileList);
        let fileMap = this.fileMap;
        let fileList = Array.isArray(this.fileList)
          ? this.fileList
          : this.fileList
          ? this.fileList.split(",")
          : [];
        let arr = fileList.map(v => {
          let items = tempFileList.find(item => item.url === v);
          if (typeof v === "string") {
            return (
              fileMap[v] || {
                name: items ? items.name : v,
                url: v
              }
            );
          } else {
            return v;
          }
        });
        console.log(arr, "arr");
        return arr;
      },
      set(val) {
        console.log(val, "setval");
        this.tempFileList = JSON.stringify(val);
        let fileMap = this.fileMap;
        val.forEach(v => {
          fileMap[v.url] = v;
        });
        let ret = (val || []).map(v => v.url);
        let res = Array.isArray(this.fileList) ? ret : ret.join(",");
        this.$emit("change", res);
      }
    },
    uploadHttpRequest() {
      if (typeof this.httpRequest === "function") {
        return this.httpRequest;
      } else {
        return elementHttpRequest;
      }
    }
  },
  mounted() {
    if (this.computedFileList.length) {
      this.computedFileList = this.$refs.upload.uploadFiles;
    }
  },
  methods: {
    applyEmit(emitName, args) {
      let argsArr = Array.from(args);
      argsArr.unshift(emitName);
      return callOrApply(this, this.$emit, argsArr);
    },
    onPreview() {
      this.applyEmit("on-preview", arguments);
    },
    onRemove(file, fileList) {
      let index = -1;
      if ((index = this.computedFileList.indexOf(file)) > -1) {
        let fileList = this.computedFileList.slice(0);
        fileList.splice(index, 1);
        this.computedFileList = fileList;
        delete this.fileMap[file.url];
        this.removeUrl = file.url;
      }
      this.applyEmit("on-remove", arguments);
    },
    onSuccess(res, file, fileList) {
      fileList = fileList.map(v => {
        if (v.status === "success" && v.response) {
          v.url =
            this.httpRequest === "qiniu"
              ? v.response.domain + "/" + v.response.hash
              : v.response;
        }
        return v;
      });

      this.computedFileList = fileList.slice(0);
      let msg = `upload success`;
      this.showMessage(success, msg);
      this.applyEmit("on-success", arguments, msg);
    },
    onError(err) {
      this.applyEmit("on-error", arguments, err.message);
    },
    onProcess() {
      this.applyEmit("on-process", arguments);
    },
    onChange() {
      this.applyEmit("on-change", arguments);
    },
    beforeUpload(file) {
      if (this.verifyFile(file)) {
        let res = this.applyEmit("before-upload", arguments);
        return res === undefined ? true : res;
      }
      return false;
    },
    onExceed() {
      let msg = `only allow upload${this.limit}files`;
      this.showMessage(warning, msg);
      this.applyEmit("on-exceed", arguments, msg);
    },
    emitExtsExceed(file) {
      let msg = `only allow[${this.exts.join(",")}]file type`;
      this.showMessage(warning, msg);
      this.applyEmit("on-exts-exceed", [file, msg]);
    },
    emitFileSizeExceed(file) {
      let msg = `file size include${this.singleFileSize}MB`;
      this.showMessage(warning, msg);
      this.applyEmit("on-file-size-exceed", [file, msg]);
    },
    verifyFile(file) {
      return this.verifyExts(file) && this.verifyFileSize(file);
    },
    verifyExts(file) {
      return this.checkExts(file) ? true : (this.emitExtsExceed(file), false);
    },
    verifyFileSize(file) {
      return this.checkFileSize(file)
        ? true
        : (this.emitFileSizeExceed(file), false);
    },
    checkExts(file) {
      if (this.exts.length === 0) {
        return true;
      }
      let fileName = isIE ? file.value : file.name;
      let index;
      if ((index = fileName.lastIndexOf(".")) > -1) {
        let ext = fileName.substr(index + 1).toLowerCase();
        return this.exts.some(predictExt => {
          return predictExt.toLowerCase() === ext;
        });
      }
      return false;
    },
    checkFileSize(file) {
      return (
        this.singleFileSize <= 0 ||
        (isIE ? this.checkFileSizeIE(file) : this.checkFileSizeOthers(file))
      );
    },
    checkFileSizeIE(file) {

    },
    checkFileSizeOthers(file) {
      return file.size <= this.fileSizeByte;
    },
    showMessage(fn, msg) {
      if (this.showMsg) {
        fn(msg);
      }
    },
    handelChoose() {
      this.$refs.upload.$el.getElementsByTagName("input")[0].click();
    }
  }
};
</script>
