<template>
  <el-dialog :visible.sync="visible" :title="title" :width="width" :show-close="showClose">
    <div class="img-container">
      <img :src="src" />
    </div>
  </el-dialog>
</template>

<script>
import { Dialog } from 'element-ui'

export default {
  components: {
    ElDialog: Dialog
  },
  data () {
    return {
      visible: false,
      title: 'Preview',
      width: '80%',
      showClose: true,
      src: false
    }
  }
}
</script>
<style scoped>
.img-container {
  font-size: 0;
  text-align: center;
}
img {
  max-width: 100%;
  max-height: 100%;
}
</style>
