import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);


export default new Router({
    linkExactActiveClass: 'actice',
    routes: [
        {
            path: '/',
            name: 'Index',
            component: () => import('@/components/Index/Index')
        },
        {
            path: '/managegroup',
            name: 'ManageGroup',
            component: () => import('@/components/GroupManage/ManageGroup')
        },
        {
            path: '/square',
            name: 'Square',
            component: () => import('@/components/Square/Square')
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
            path: '/managemember',
            name: 'ManageMember',
            meta: {
                title: '用户管理',
            },
            component: () => import('@/components/UserMember/ManageMember'),
            redirect: "managemember/userlist",
            children: [
                {
                    path: 'userlist',
                    name: 'UserList',
                    component: () => import('@/components/UserMember/UserList'),
                    meta: {
                        title: '用户列表',
                    },
                },
                {
                    path: 'userdetail/:userId',
                    name: 'UserDetail',
                    component: () => import('@/components/UserMember/UserDetail'),
                    meta: {
                        title: '用户详情',
                    },
                },
                {
                    path: 'userregister',
                    name: 'UserRegister',
                    component: () => import('@/components/UserMember/UserRegister'),
                    meta: {
                        title: '用户新增',
                    },
                },]
        },
        // {
        //     path: '/userdetail/:userId',
        //     name: 'UserDetail',
        //     meta: {
        //         parent_title: '用户管理',
        //         title: '用户详情',
        //     },
        //     component: () => import('@/components/UserMember/UserDetail')
        // },
        // {
        //     path: '/userregister',
        //     name: 'UserRegister',
        //     meta: {
        //         parent_title: '用户管理',
        //         title: '用户新增',
        //     },
        //     component: () => import('@/components/UserMember/UserRegister')
        // },
    ]
})
