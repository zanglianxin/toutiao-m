import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login') // 路由懒加载，需要哪个页面加载哪个页面
  }
]

const router = new VueRouter({
  routes
})

export default router
