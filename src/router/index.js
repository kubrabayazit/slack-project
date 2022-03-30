import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/pages/chat'
import Login from '@/pages/login'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '*',
    //   redirect: '/login'
    // },
    // {
    //   path: '/',
    //   redirect: '/login'
    // },
    {
      path: '/',
      name: 'chat',
      component: Chat
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ],
  mode:'history'
})
