import Vue from 'vue'
import Router from 'vue-router'

import Register from '../components/register'
import Deftpage from '../components/404'
import Index from '../components/index'
import Login from '../components/login'
import Shouye from '../components/shouye'
import Info from '../components/info'
import Zijin from '../components/zijin'


Vue.use(Router)

let router=new Router({
  mode:'history',
  routes: [
		{
			path: '*',
			name: '/404',
			component: Deftpage
		},
		{
			path: '/',
			redirect:'/index'
		},
		{
			path: '/index',
			component: Index,
			children:[
				{
					path:'',
					component:Shouye
				},
				{
					path:'/info',
					component:Info
				},
				{
					path:'/zijin',
					component:Zijin
				}
			]
		},
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
		{
			path: '/login',
			name: 'Login',
			component: Login
		}
  ]
})

router.beforeEach((to,from,next)=>{
	let bol=localStorage.jwToken?true:false
	if(to.path=='/login'||to.path=='/register'){
		next()
	}else{
		bol?next():next('/login')
	}
})

export default router