import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let routerList = [];
function importAll(r){
  r.keys().forEach(item => {
    routerList.push(r(item).default)
  })
};
importAll(require.context('./',true,/\.router\.js/))

const router = new Router({
  routes: [
    ...routerList,
  // 通过路由重定向，让用户在访问路径“/”，自动重定向到“/login”
     {
    path: "/",
    redirect: "/login"
  }
  ]
})
export default router
