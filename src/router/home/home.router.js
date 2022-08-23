import Home from '@/components/Home.vue'
import Welcome from '@/components/Welcome.vue'
import Users from '@/components/user/users.vue'
import Rights from '@/components/power/rights.vue'
import Roles from '@/components/power/roles.vue'
import Cate from '@/components/goods/cate.vue'
import Goods from '@/components/goods/goods.vue'
import bigscreen from '@/components/bigScreen/bigScreen.vue'
export default{

      path: '/home',
      component: Home,
      meta: {
        token: true
      },
      redirect: "/welcome",
      children: [
        {
        path: '/welcome',
        component: Welcome,
        }, 
        {
        path: '/users',
        component: Users
        },
        {
          path: '/rights',
          component: Rights
        },
        {
          path: '/roles',
          component: Roles
        },
        {
          path: '/categories',
          component: Cate
        },
        {
          path: '/goods',
          component: Goods
        },
        {
          path: '/bigscreen',
          component: bigscreen
        }
    ]
}