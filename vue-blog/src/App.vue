<template>
    <div id="app">
     <div id="header">
    </div>
        
        <div id="body">
            <div id="left_menu">
                <ul>
                    <li class="logo"><router-link to="/"> <img src="forklift.png" alt="logo" class="logo"></router-link></li>
                    <li><router-link to="" class="left_menu_li">发布大盘</router-link></li>
                    <li><router-link to="/square" class="left_menu_li">待我处理</router-link></li>
                     <li><router-link to="" class="left_menu_li">发布管理</router-link></li>
                     <li><router-link to="" class="left_menu_li">环境管理</router-link></li>
                     <li><router-link to="" class="left_menu_li">系统管理</router-link></li>
                     <li><router-link to="/managegroup" class="left_menu_li">组织管理</router-link></li>
                    <li><router-link to="/managemember" class="left_menu_li">用户管理</router-link></li>
                     <li><router-link to="" class="left_menu_li"> 报表</router-link></li>

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
        data() {},

    }

</script>

<style>
    @import "statics/css/bread.css";
    @import "statics/css/global.css";
</style>
