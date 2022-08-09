import {
  restructureDefaultPropsOfVueCtorFromOptions
} from './utils'
import AtUploadCtor from './components/main'
import AtImageUploadCtor from './components/ImageUpload'

let ZmUpload = AtUploadCtor
let ZmImageUpload = AtImageUploadCtor

export {
  ZmUpload,
  ZmImageUpload
}

export default {
  install (Vue, opts = {}) {
    let {
      upload,
      imageUpload
    } = Object.assign({}, opts)

    if (upload !== false) {
      Vue.component('at-upload', restructureDefaultPropsOfVueCtorFromOptions(AtUploadCtor, upload))

      if (imageUpload !== false) {
        Vue.component('at-image-upload', restructureDefaultPropsOfVueCtorFromOptions(AtImageUploadCtor, imageUpload))
      }
    }
  }
}
