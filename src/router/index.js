import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import Goods from '@/views/Goods.vue'
const routes = [
  {
    path: "/",
    redirect: "/goods",
  },
  {
    path: "/goods",
    component: Goods,
  },
  {
    path: '/ratings',
    component: () => import('@/views/Ratings.vue')//评价
  },
  {
    path: '/seller',
    component: () => import('@/views/Seller.vue')//商家
  },


]

const router = new VueRouter({
  routes
})

export default router
