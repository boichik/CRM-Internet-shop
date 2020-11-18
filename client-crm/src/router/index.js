import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () => import('../views/Register.vue')
  },
  {
    path: '/recovery',
    name: 'recovery',
    meta: {layout: 'empty'},
    component: () => import('../views/Recovery.vue')
  },
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main'},
    component: () => import('../views/Home.vue')
  },
  {
    path: '/clients',
    name: 'clients',
    meta: {layout: 'main'},
    component: () => import('../views/Clients.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    meta: {layout: 'main'},
    component: () => import('../views/Orders.vue')
  },
  {
    path: '/orders-detail/:id',
    name: 'orders-detail',
    meta: {layout: 'main'},
    component: () => import('../views/Orders-detail.vue')
  },
  {
    path: '/documentation',
    name: 'documentation',
    meta: {layout: 'main'},
    component: () => import('../views/Documentation.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main'},
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/goods',
    name: 'goods',
    meta: {layout: 'main'},
    component: () => import('../views/Goods.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
