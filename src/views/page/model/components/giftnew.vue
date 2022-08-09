<template>
  <zm-dialog :title="titleText" :visible.sync="value" append-to-body :before-close="dialogClose" :close-on-click-modal="false">
    <el-form label-width="150px" :model="form" :rules="formRule" ref="form">
      <!-- Gift -->
      <el-form-item prop="name" label="Gift:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <!-- Icon -->
      <el-form-item prop="score" label="score:">
        <el-input v-model="form.score" placeholder="Please insert amount"></el-input>
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
        name: '',
        score: ''
      },
      formRule: {
        name: [
          {
            required: true,
            message: "PLease insert gift icon!",
          },
        ],
        score: [
          {
            required: true,
            message: "PLease insert gift score!",
          },

        ]
      },
    };
  },
  computed: {
    titleText() {
      return "Add Gift";
    },
  },
  components: { ZmImageUpload },
  mixins: [dialogMixin],
  created() {

  },
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
      // Add item
      let url = this.$urls.gift.add;
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
