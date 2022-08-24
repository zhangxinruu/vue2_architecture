// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import * as echarts from 'echarts';
import 'echarts-gl'
import './request/service.js'
Vue.prototype.$echarts = echarts
import TreeTable from 'vue-table-with-tree-grid'
Vue.component('tree-table', TreeTable)
import store from './store/index.js'
// 导入全局样式表
import "@/assets/css/global.css"
Vue.config.productionTip = false
Vue.use(element)
Vue.use(echarts)
/* eslint-disable no-new */
const vue = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
console.log("vue实例",vue);
