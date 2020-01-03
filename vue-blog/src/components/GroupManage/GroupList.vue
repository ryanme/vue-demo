<template>
    <div>
        <breadnavigation/>

        <span v-bind:title="message2">
    鼠标悬停几秒钟查看此处动态绑定的提示信息！
  </span>
    </div>
</template>

<script>
    import breadnavigation from "../../Biz/breadnavigation.vue";

    export default {
        name: "GroupList",
        data() {
            return {
                message2: '现在是 ' + new Date().toLocaleString()
            }
        },
        components: {
            breadnavigation
        }
    }
</script>
