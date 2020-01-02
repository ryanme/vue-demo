<template>
    <div id="app">
     <div id="header">
        <div id="menu_1">
            <ul class="menu">
                <img src="forklift.png" alt="logo" class="logo">

                <li>
                    <router-link to="/" class="top_menu">首页</router-link>
                </li>
                <li>
                    <router-link to="/square" class="top_menu">任务大厅</router-link>
                </li>
                <li>
                    <router-link to="/managemember" class="top_menu">用户管理</router-link>
                </li>
                 <li>
                    <router-link to="/managegroup" class="top_menu">组织管理</router-link>
                </li>
                <li>
                    <router-link to="/usercenter" class="top_menu">个人中心</router-link>
                </li>
            </ul>
        </div>

        <div id="menu_2">
                    <input type="search" placeholder="搜索" class="top_menu">
                    <li><router-link to="/search" class="top_menu">搜索</router-link></li>
                    <li>
                        <router-link to="/login" class="top_menu" v-if="isLogin">登出</router-link>
                        <router-link to="/login" class="top_menu" v-else>登陆</router-link>
                    </li>
        </div>
    </div>
        
        <div id="body">
            <div id="left_menu">
                <ul>
                    <li><router-link to="" class="left_menu">发布大盘</router-link></li>
                    <li><router-link to="" class="left_menu">待我处理</router-link></li>
                     <li><router-link to="" class="left_menu">发布管理</router-link></li>
                     <li><router-link to="" class="left_menu">环境管理</router-link></li>
                     <li><router-link to="" class="left_menu">系统管理</router-link></li>
                     <li><router-link to="" class="left_menu">组织管理</router-link></li>
                     <li><router-link to="" class="left_menu"> 报表</router-link></li>

                </ul>
            </div>
            <div id="content">
                <router-view/>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {isLogin: false}
        },

    }

</script>

<style>
    @import "statics/css/bread.css";
    @import "statics/css/global.css";
</style>
