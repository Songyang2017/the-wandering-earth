import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/home')
    },
    {
      path: '/chapter1',
      name: 'chapter1',
      component: () => import('@/components/chapter1')
    },
    {
      path: '/chapter2',
      name: 'chapter2',
      component: () => import('@/components/chapter2')
    },
    {
      path: '/chapter3',
      name: 'chapter3',
      component: () => import('@/components/chapter3')
    },
    {
      path: '/earth',
      name: 'earth',
      component: () => import('@/components/earth')
    }
  ]
})
