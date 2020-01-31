<template>
    <ul id="breadcrumbs-one">
        <router-link to="/">首页</router-link>
        <router-link :to="{path: parent_path}">{{parent_title}}</router-link>
        <a class="current">{{current_title}}</a>
    </ul>
</template>

<script>
    export default {
        name: "breadnavigation",
        data() {
            return {
                parent_title: '',
                parent_path: '',
                current_title: ''
            }
        },
        created() {
            const currentRoute = this.$route;
            // console.log(currentRoute)
            this.parent_path = currentRoute.matched[0].path;
            this.parent_title = currentRoute.matched[0].meta.title;


            // const current_path = currentRoute.path;
            this.current_title = currentRoute.meta.title;
        }
    }
</script>

<style scoped>

</style>