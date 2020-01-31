import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);


export default new Router({
    linkExactActiveClass: 'actice',
    routes: [
        {
            path: '/',
            name: 'Index',
            redirect: "blog",
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/components/Login/Login')
        },
        {
            path: '/logout',
            name: 'Logout',
            component: () => import('@/components/Login/Logout')
        },

        {
            path: '/blog',
            name: 'Blog',
            component: () => import('@/components/BlogManage/Blog'),
            redirect: "/",
            children: [
                {
                    path: '/',
                    name: 'BlogIndex',
                    component: () => import('@/components/BlogManage/BlogIndex'),
                },
                {
                    path: ':categorytype/detail/:id',
                    name: 'BlogDetail',
                    component: () => import('@/components/BlogManage/BlogDetail'),
                },
                {
                    path: ':categorytype',
                    name: 'CategoryTypeList',
                    component: () => import('@/components/BlogManage/CategoryTypeList'),
                },]
        },
    ]
})
