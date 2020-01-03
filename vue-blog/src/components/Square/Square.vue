<template>

    <div>
        <breadnavigation/>

        <div class="main_content">
            <ol>
                <li v-for="todo in todos" :key="todo.text">
                    <p>{{ todo.text }}</p>
                </li>
            </ol>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import breadnavigation from "../../Biz/breadnavigation.vue";

    export default {
        name: "Square",
        data() {
            return {
                userData: null,
                todos: [
                    {text: '学习 JavaScript'},
                    {text: '学习 Vue'},
                    {text: '整个牛项目'}
                ]
            }
        },
        components:{
            breadnavigation
        }
    }
</script>
<style  scoped>
    .main_content {
        margin: 30px 50px;
    }
    ol {
        list-style-type: decimal;
        text-align: left;
        padding: 5px;
    }

</style>
