<template>

  <el-upload
    ref="uploadChild"
    class="avatar-uploader"
    action=""
    :http-request="uploadFile"
    :show-file-list="true"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"/>
</template>

<script>

import OSS from "ali-oss"

export default {
  name: "CodingUpload",
  components: {},
  data() {
    return {}
  },
  props: {
    title: String,
    visible: Boolean,
    isAdd: Boolean,
    data: Object
  },
  methods: {

    onOk() {
      let url = this.$urls.banner.add;
      if (!this.data.isAdd) {
        url = this.$urls.banner.update;
      }
      let param = this.data.form;
      console.log(url)
      console.log(JSON.stringify(param))
      this.$api.post(url, param).then((res) => {
        if (res.status === 0) {
          this.$message.success({message: "Save success", duration: 10000})
          this.$emit("refresh")
        } else {
          this.$message.error({message: "Save fail", duration: 10000})
        }
      });
    },
    onClose() {
      this.$emit("close");
      console.log("close")
    },
    onCancel() {
      this.$emit("cancel");
      console.log("cancel")
    },
    onSelectChange() {

    },
    uploadFile() {
      //
      console.log('on upload')
    },
    uploadToServer(file) {
      const formData = new FormData()
      formData.append('name', file.name)
      formData.append('file', file)

      let url = "/file/api/file/ossRoleResponse"

      this.$api.get(url, {params: {filename: file.name}})
        .then(res => {
          console.log(JSON.stringify(res))
          let data = res.data
          const client = new OSS({
            region: data.region,
            accessKeyId: data.accessKeyId,
            accessKeySecret: data.accessKeySecret,
            bucket: data.bucketName,
            stsToken: data.securityToken
          });
          console.log("ready to upload")
          client.put(data.fileName, file).then((result) => {
            let url = data.fileBase + result.name;
            this.$emit("success", url);
            this.$forceUpdate()
            return result.url
          }).then(url => {
            console.log("upload url")
            console.log(url)
          })
        })
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const fileTypeName = this.getFileType(file.name)
      const picMax = file.size / 1024 / 1024 < 10
      console.log(this.filetype)
      if (fileTypeName === 'image') {
        console.log('file is image')
        this.filetype = 2
        if (!picMax) {
          this.$message.error('file cannot over 10MB!')
          return false
        }
        this.uploadToServer(file)
      } else if (fileTypeName === 'video') {
        this.filetype = 1
        console.log('file is video')
        this.uploadToServer(file)
      } else {
        this.filetype = 3
        console.log('file is video')
        this.uploadToServer(file)
      }
    },
    // check file is：image/video
    getFileType(name) {
      if (!name) return false
      let imgType = ['gif', 'jpeg', 'jpg', 'bmp', 'png']
      let videoType = ['avi', 'wmv', 'mkv', 'mp4', 'mov', 'rm', '3gp', 'flv', 'mpg', 'rmvb']
      if (RegExp('\\.(' + imgType.join('|') + ')$', 'i').test(name.toLowerCase())) {
        return 'image'
      } else if (RegExp('\\.(' + videoType.join('|') + ')$', 'i').test(name.toLowerCase())) {
        return 'video'
      } else {
        return false
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },

  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
