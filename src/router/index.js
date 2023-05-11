import { createRouter, createWebHistory } from 'vue-router'
import loginView from '../views/loginView.vue'
import registerView from '../views/registerView.vue'
import dashboardView from '../views/dashboardView.vue'
import homeView from '../views/homeView.vue'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'reg',
      component: registerView
    },
    {
      path: '/login',
      name: 'log',
      component: loginView
    },
    {
      path: '/dashboard',
      name: 'dash',
      component: dashboardView
    },
    {
      path: '/home',
      name: 'home',
      component: homeView
    },
  
  ]
})

export default router
