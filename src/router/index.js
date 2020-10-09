import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const loadPage = function(page){
  return () => import(/* webpackChunkName: "about" */ `@/views/${page}`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/bluetooth',
    name: 'bluetooth',
    component: loadPage('Bluetooth')
  },
  {
    path: '/graph',
    name: 'Graph',
    component: loadPage('Graph')
  },
  {
    path: '/about',
    name: 'About', 
    component: loadPage('About')
  },
  {
    path: '/login',
    name: 'Login', 
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
 // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
