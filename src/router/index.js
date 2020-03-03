import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login'
import Admin from '@/components/admin'
import User from '@/components/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      component: Admin,
      
      children:[
        {
          path: '/',
          name: 'User',
          component: User,
          beforeEnter: (to, from, next) => {
            if(localStorage.getItem("name")=="wcy"){
              next();
            }else{
              next({
                name: "login"
              })
            }
          }
        },
      ]
    }
  ]
})
