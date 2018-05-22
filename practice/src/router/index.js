import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import menu from '@/components/menu'
import admin from '@/components/admin'
import about from '@/components/about/about'
import login from '@/components/login'
import register from '@/components/register'

// 二级路由
import contact from '@/components/about/contact'
import delivery from '@/components/about/delivery'
import guide from '@/components/about/guide'
import history from '@/components/about/history'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/', name: 'home', components:{
            default: home,
            guide,
            delivery,
            history
        }},
        {path: '/menu', name: 'menu', component: menu},
        {path: '/admin', name: 'admin', component: admin},
        {path: '/about', name: 'about', redirect: '/history', component: about, children: [
            {path: '/contact', name: 'contact', component: contact},
            {path: '/delivery', name: 'delivery', component: delivery},
            {path: '/guide', name: 'guide', component: guide},
            {path: '/history', name: 'history', component: history}
        ]},
        {path: '/login', name: 'login', component: login},
        {path: '/register', name: 'register', component: register},
        {path: '*', redirect: '/'}
    ],
    mode: 'history',
    scrollBehavior(to,from,ition){
        //return{x:0, y:100}
        //return {selector: '.btn'} 选择器定位到该地方
        if(ition){   // 记忆上一个页面的离开时的位子(需要浏览器回退)
            return ition
        }else{
            return {x:0, y:0}
        }
    }
});
