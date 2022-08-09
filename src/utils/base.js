import {log, error} from './log.js';
import * as msg from './message';
import ImageCompressor from 'image-compressor';
import {Message, MessageBox} from "element-ui";

function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function submitForm(formName, callback) {
  this.$refs[formName].validate((valid) => {
    if (valid) {
      callback();
    } else {
      console.log(`error submit ${formName}!`);
      return false;
    }
  });
}

function getDrugImgSrc(row) {
  try {
    if (row.urlMain) {
      return row.urlMain;
    } else if (row.urls) {
      let images = JSON.parse(row.urls);
      if (images.length === 0) {
        return "static/img/drug_default.jpg";
      }
      let main = images.filter(item => item.isMain == "1");
      if (main.length > 0) {
        return main[0].url;
      } else {
        return images[0].url;
      }
    } else {
      return "static/img/drug_default.jpg";
    }
  } catch (e) {
    return "static/img/drug_default.jpg";
  }
}

function uploadImage(file, options, callback) {
  const self = this;
  new ImageCompressor(file, {
    convertSize: 500000,
    maxWidth: 800,
    ...options,
    success(result) {
      const formData = new FormData();
      formData.append('updateFile', result, result.name);
      // Send the compressed image file to server with XMLHttpRequest.
      self.$api.post(self.$urls.uploadImg, formData, {
        headers: {
          "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryZzNqBadsfadsfxWLV"
        },
        hideLoading: true
      }).then((res) => {
        callback(null, res, file);
      });
    },
    error(e) {
      callback(e);
    },
  });
}


function deleteApiData(dataId, url, tips, callbackssss) {
  MessageBox.confirm('Confirm to Del?', tips, {
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    type: 'info'
  })
    .then(async () => {
      let data = {
        id: dataId
      }
      this.$api.post(url, data).then((res) => {
        if (res.status === 0) {
          this.$message.success({message: "Delete success", duration: 10000})
          callbackssss()
        }
      });
    })
    .catch(reason => {
      this.$message.info({message: "Already delete", duration: 10000})
    })
}

export default function install(Vue, options) {
  Vue.prototype.isArray = isArray;
  Vue.prototype.deepCopy = deepCopy;
  Vue.prototype.log = log;
  Vue.prototype.error = error;
  Vue.prototype.msg = msg;
  Vue.prototype.submitForm = submitForm;
  Vue.prototype.uploadImage = uploadImage;
  Vue.prototype.getDrugImgSrc = getDrugImgSrc;
  Vue.prototype.$deleteApiData = deleteApiData;
}
