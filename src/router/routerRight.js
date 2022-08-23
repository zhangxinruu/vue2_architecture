import router from './index'
//  router.beforeEach((to, from, next) => {
//     if (to.path === "/login") return next();
//     const tokenStr = window.sessionStore.getItem("token");
//     if (!tokenStr) return next("/login");
//     next();
//   }); 
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    const token = window.sessionStorage.getItem("token");
    if (!token){
        if(to.meta.token){
            return next({
                path: '/login'
            })
        }else{
            next();
        }
    }
    return next("/login");
  })