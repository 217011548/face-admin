<template>
  <zm-dialog
    title="Discount"
    :visible.sync="value"
    append-to-body
    :before-close="dialogClose"
    :close-on-click-modal="false"
  >
    <el-form label-width="100px" :model="form" ref="form">
      <el-form-item prop="title" label="Title:">
        <div>{{ form.title }}</div>
      </el-form-item>
      <el-form-item prop="money" label="Amount:">
        <span>{{ form.money }}$</span>
      </el-form-item>
      <el-form-item prop="limitMoney" label="Litmit:">
        <span>{{ form.limitMoney }}$</span>
      </el-form-item>
      <el-form-item prop="img" v-viewer label="Image:">
        <img :src="form.img" class="w200" alt="" />
      </el-form-item>
      <el-form-item prop="content" label="Desc:">
        <div class="rich-box" v-html="form.content">--</div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="tr">
      <el-button @click="dialogClose">Close</el-button>
    </div>
  </zm-dialog>
</template>

<script>
import dialogMixin from "@/mixins/dialogMixin";
export default {
  data() {
    return {
      form: {
        content: "",
        createTime: "",
        detail: "",
        id: 0,
        img: "",
        limitMoney: 0,
        money: 0,
        title: "",
        userId: 0
      }
    };
  },
  computed: {},
  mixins: [dialogMixin],
  created() {},
  mounted() {
    this.form = { ...this.form, ...this.obj };
  },
  methods: {}
};
</script>
