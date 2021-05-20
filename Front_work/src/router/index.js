import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'
import practice from '@/views/practice.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/practice',
    name: 'practice',
    component: practice
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
