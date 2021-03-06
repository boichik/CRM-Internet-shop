import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'



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
    meta: {layout: 'main', auth:true},
    component: () => import('../views/Home.vue')
  },
  {
    path: '/clients',
    name: 'clients',
    meta: {layout: 'main', auth:true},
    component: () => import('../views/Clients.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    meta: {layout: 'main', auth:true},
    component: () => import('../views/Orders.vue')
  },
  {
    path: '/orders-detail/:id',
    name: 'orders-detail',
    meta: {layout: 'main', auth:true},
    component: () => import('../views/Orders-detail.vue')
  },
  {
    path: '/clients-detail/:id',
    name: 'clients-detail',
    meta: {layout: 'main', auth:true},
    component: () => import('../views/Clients-detail.vue')
  },
  {
    path: '/goods-detail/:id',
    name: 'goods-detail',
    meta: {layout: 'main', auth:true},
    component: () => import('../views/Goods-detail.vue')
  },
  {
    path: '/api',
    name: 'api',
    meta: {layout: 'main', auth:true},
    component: () => import('../views/Documentation.vue')
  },
  {
    path: '/apiexample',
    name: 'apiexample',
    meta: {layout: 'main', auth:true},
    component: () => import('../views/APIExample.vue')
  },
  {
    path: '/wiki',
    name: 'wiki',
    meta: {layout: 'main', auth:true},
    component: () => import('../views/Wiki.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main', auth:true},
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/goods',
    name: 'goods',
    meta: {layout: 'main', auth:true},
    component: () => import('../views/Goods.vue')
  },
  {
    path: '/testg',
    name: 'testgood',
    meta: {layout: 'main', auth:true},
    component: () => import('../views/TestGood.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) =>{
  const currentUser = localStorage.getItem('token')
    
  const requireAuth = to.matched.some(record => record.meta.auth)

  if(requireAuth && !currentUser){
    next('/login')
  }else{
     next()
  }
})

export default router
