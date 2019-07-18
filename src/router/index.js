import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/layout/Home'
import Index from '@/page/index'
import MovieHot from '@/page/movieHot'
import MovieSoon from '@/page/movieSoon'
import MovieTop from '@/page/movieTop'
import MovieDetail from '@/page/movieDetail'
import Celebrity from '@/page/celebrity'

Vue.use(Router)
let routes=[
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'/index',
        name:'首页',
        component: Index,
      },
      {
        path:'/movie_hot',
        name:'最近热映',
        component:MovieHot,
      },
      {
        path:'/movie_soon',
        name:'即将上映',
        component:MovieSoon,
      },
      {
        path:'/movie_top250',
        name:'top250',
        component:MovieTop,
      },
      {
        path:'/movie_detail',
        name:'detail',
        component:MovieDetail,
      },
      
      {
        path:'/celebrity',
        name:'celebrity',
        component:Celebrity,
      },
      {
        path:'/infoManage/infoShow',
        name:'个人信息',
        component:Index
      },
      {
        path:'/infoManage/infoModify',
        name:'修改信息',
        component:Index
      }
    ]
  },
  
]

export default new Router({
  routes
})
