import Vue from 'vue'
import ImagePreviewBox from './components/ImagePreviewBox'

const ImagePreviewBoxConstructor = Vue.extend(ImagePreviewBox)

let instance = null
let getInstance = () => {
  if (!instance) {
    instance = new ImagePreviewBoxConstructor()
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
  }
  return instance
}

const showPreview = (src) => {
  let instance = getInstance()
  instance.vm.src = src
  instance.vm.visible = true
}

export {
  showPreview
}

export default {
  install (Vue, opts) {
    // 图片预览
    Vue.prototype.showPreview = (src) => {
      showPreview(src)
    }
  }
}
