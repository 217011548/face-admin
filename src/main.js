// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss'    
import './utils/city-data-2d.js'
import ZmCommons from '@/commons/index'
import base from './utils/base.js';
import validatorPlugin from "./utils/validator"
import api from './api';
import urls from './api/urls';
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import VueQr from "vue-qr";
Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });
Vue.use(base);
Vue.use(VueQr)
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 8888
  }
})
Vue.use(ZmCommons)
Vue.use(validatorPlugin);
Vue.use(api);
Vue.use(urls);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
