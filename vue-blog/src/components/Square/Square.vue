<template>

    <div>
    <ul id="breadcrumbs-one">
    <li><router-link to="/">主页</router-link></li>
    <li><a class="current">大厅</a></li>
    </ul>
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
