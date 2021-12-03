import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '../store/index'

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/me',
    name: 'Me',
    component: () => import('@/views/Me.vue'),
    beforeEnter(to, from, next) {
      Object.keys(store.getters.authUser).length !== 0 ? next() : next({ path: '/' })
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
