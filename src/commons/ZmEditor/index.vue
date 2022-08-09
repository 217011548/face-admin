<template>
  <vue-editor
    id="editor"
    use-custom-image-handler
    @image-added="handleImageAdded"
    v-model="currentValue"
    :editor-options="options"
    v-bind="$attrs"
    :placeholder="placeholder"
  ></vue-editor>
</template>

<script>
import { VueEditor } from "vue2-editor";
import api from "@/api/src/upload";

export default {
  name: "ZmEditor",
  components: {
    VueEditor
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      // placeholder:

      options: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            // [{ script: 'sub' }, { script: 'super' }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            // [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image"]
          ]
        }
      }
    };
  },
  computed: {
    currentValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  created() {},
  methods: {
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      // formData.append("fileData", file);
      formData.append("name", file.name);
      formData.append("file", file);

      // formData.append("token", this.$store.state.user.token);
      api
        .uploadFiles(formData)
        .then(result => {
          console.log(result);
          const url = result.data;
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss">
.ql-container {
  min-height: 200px !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-item::before,
.ql-snow .ql-picker.ql-header .ql-picker-label::before {
  display: inline-block;
  vertical-align: top;
}
</style>
