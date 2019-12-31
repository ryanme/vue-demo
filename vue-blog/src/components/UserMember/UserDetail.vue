<template>

  <div>
<ul id="breadcrumbs-one">
    <li><router-link to="/">主页</router-link></li>
    <li><router-link to="/managemember">用户管理</router-link></li>
    <li><a class="current">用户详情</a></li>
</ul>


        <div v-if="user_detail" class="user_detail">

        <p>姓名： {{user_detail.user_name}}</p>
        <p>性别： {{user_detail.sex|sex_show}}</p>
        <p>生日： {{user_detail.birthday}}</p>
        <p>邮箱： {{user_detail.email}}</p>
        <p>爱好： {{user_detail.interest}}</p>
        <p>电话： {{user_detail.cell_phone}}</p>
        <p>介绍： {{user_detail.introduction}}</p>

        </div>

    <input type="button" value="返回" @click="go_userlist_page()" class="special"/>


  </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "UserDetail",
        data() {
            return {
                user_detail: null,
                user_id: this.$route.params.userId
            }
        },
        methods: {
            go_userlist_page(){
                    this.$router.push({ name: 'ManageMember'});
                }

        },
        mounted() {
                axios.get('/sjfapi/queryuserdetail/'+this.user_id+'/')
                .then((response) => {
                    if (response.data["code"]===200){
                        // this.userData = response.data["data"]["user_list"];
                        console.log(response.data["data"]);
                        this.user_detail = response.data["data"];
                    }else{
                        alert(response.data);
                        console.error(response.data)
                    }  
                })
                .catch((error) => {
                    console.error(error);
                });
        },  
         filters: {
        sex_show(value){
            const sex_arrary = {"0": "男", "1": "女"}
            return sex_arrary[value]
        }
    }      
    }
</script>

<style lang="scss" scoped>
    
        .user_detail {
        margin-left: 300px;
        padding-top: 100px;
        text-align: left;
        /*float: center;*/
    }
    ul,ol,li{list-style:none;}

    input.special {
    height: 30px;
    width: 100px;
    color: white;
    background-color:slateblue;
    text-align: center;
    float: left;
    margin-left: 300px;
    margin-bottom: 10px;
    margin-top: 10px;
}

</style>
