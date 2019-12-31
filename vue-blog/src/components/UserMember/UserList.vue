<template>

    <div>

<!--        <ul id="breadcrumbs-one">-->
<!--            <li v-for="(children, i) in bread_doms" :key="i">-->
<!--                <a class="current" v-if="i===bread_doms.length-1">{{children.title}}</a>-->
<!--                <router-link  :to="{path: children.path}" v-else> {{children.title}}</router-link>-->
<!--            </li>-->
<!--        </ul>-->

        <div id="zw">

        </div>
        <input type="button" value="查询" @click="getUserList()" class="special"/>
        <input type="button" value="新增" @click="router_add()" class="special"/>

        <div v-if="userData">
            <table border="1">
                <tr>
                    <th>ID</th>
                    <th>名字</th>
                    <th>性别</th>
                    <th>生日</th>
                    <th>邮箱</th>
                    <th>兴趣爱好</th>
                    <th>电话</th>
                    <th>介绍</th>
                </tr>

                <tr v-for="user in userData" :key="user.id">

                    <td>
                        <p>{{ user.user_id }}</p>
                    </td>

                    <td>
                        <p @click="onClickUserId(user)" class="hrefclass"> {{ user.user_name }}</p>
                    </td>

                    <td>
                        <!-- <p>{{ user.sex == 0 ? '女士': '先生' }}</p> -->
                        <p>{{ user.sex| sex_show}}</p>

                    </td>

                    <td>
                        <p>{{ user.birthday }}</p>
                    </td>

                    <td>
                        <p>{{ user.email }}</p>
                    </td>

                    <td>
                        <p>{{ user.interest }}</p>
                    </td>

                    <td>
                        <p>{{ user.cell_phone }}</p>
                    </td>

                    <td>
                        <p>{{ user.introduction }}</p>
                    </td>
                </tr>

            </table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {create_navigation} from '../../Biz/BreadNavigation'

    export default {
        name: "UserList",
        data() {
            // this.create_navigation =create_navigation;
            return {
                userData: null,
                // bread_doms: this.navigation_setup()
            }
        },
        methods: {
            getUserList(){
                axios.get('/sjfapi/queryuserlist/')
                    .then((response) => {
                        if (response.data["code"]===200){
                            this.userData = response.data["data"]["user_list"];
                            console.log(this.userData);
                        }else{
                            alert("查询失败:"+response.data["message"]);
                            console.error(response.data)
                        }
                    })
                    .catch((error) => {
                        alert("系统错误，查询失败");
                        console.error(error);
                    });
            },

            navigation_setup() {
                console.error(this.$router);
                create_navigation(this.$router.currentRoute)
                // return [
                //     {
                //         path: '/',
                //         title: '首页'
                //     },
                //     {
                //         path: this.$router.currentRoute.matched[0].path,
                //         title: this.$router.currentRoute.matched[0].meta.title
                //     },
                //     {
                //         path: this.$router.currentRoute.path,
                //         title: this.$router.currentRoute.meta.title
                //     }
                // ]

            },

            onClickUserId(user) {
                this.$router.push({ name: 'UserDetail', params: { userId: user.user_id } });
            },

            router_add(){
                this.$router.push({ name: 'UserRegister'});
            }
        },
        mounted() {
            this.getUserList();
            this.navigation_setup()
        },

        filters: {
            sex_show(value){
                const sex_arrary = {"0": "男", "1": "女"}
                return sex_arrary[value]
            }
        },
        created() {
            // console.log(this.$route.query.meta)
            // this.navigation_setup()
        },


    }
</script>

<style scoped>
    table {
        display: table;
        border-collapse: collapse;
        border-spacing: 10px 10px;
        border-color:black;
        text-align: left;
        padding: 10px;
        margin-left: 400px;
        border-style: solid;
    }
    .hrefclass {
        color: lightblue
    }

    input.special {
        height: 30px;
        width: 100px;
        color: white;
        background-color:slateblue;
        text-align: center;
        margin-left: 100px;
        margin-bottom: 10px;
        margin-top: 10px;

    }
</style>
