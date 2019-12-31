<template>
  <div>
     <ul id="breadcrumbs-one">
    <li><router-link to="/">主页</router-link></li>
    <li><a class="current">组织管理</a></li>
    </ul>
    
    <span v-bind:title="message2">
    鼠标悬停几秒钟查看此处动态绑定的提示信息！
  </span>
  </div>
</template>

<script>
    export default {
        name: "ManageGroup",
        data() {
            return {
                message2: '现在是 ' + new Date().toLocaleString()
            }
        },
        // computed: {
        //     updateTime() {
        //         this.message2 = '现在是 ' + new Date().toLocaleString()
        //     }
        // },
    }
</script>
