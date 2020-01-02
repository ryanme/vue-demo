<template>

    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <img src="forklift.png" alt="logo" class="logo">

        <el-menu-item index="1"><a href="/" target="_blank">首页</a></el-menu-item>
        <el-menu-item index="2"><a href="/square" target="_blank">任务大厅</a></el-menu-item>
        <el-menu-item index="3"><a href="/managemember" target="_blank">用户列表</a></el-menu-item>
        <el-menu-item index="4"><a href="/managegroup" target="_blank">组织管理</a></el-menu-item>
        <el-menu-item index="5"><a href="/usercenter" target="_blank">个人中心</a></el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "test",
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
