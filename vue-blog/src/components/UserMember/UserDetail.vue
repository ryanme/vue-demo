<template>

  <div>

      <breadnavigation/>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span  v-if="user_detail">{{user_detail.user_name}}的信息</span>
            <span v-else>无名</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="editUserInfo">Edit</el-button>
          </div>
          <div class="text item">
                    <div v-if="user_detail" class="user_detail">

                    <p>姓名： {{user_detail.user_name}}</p>
                    <p>性别： {{user_detail.sex|sex_show}}</p>
                    <p>生日： {{user_detail.birthday}}</p>
                    <p>邮箱： {{user_detail.email}}</p>
                    <p>爱好： {{user_detail.interest}}</p>
                    <p>电话： {{user_detail.cell_phone}}</p>
                    <p>介绍： {{user_detail.introduction}}</p>

                    </div>
            <p v-else>无用户信息</p>
          </div>
        </el-card>
    <input type="button" value="返回" @click="go_userlist_page()" class="special"/>


    <!--        <div v-if="user_detail" class="user_detail">-->

<!--        <p>姓名： {{user_detail.user_name}}</p>-->
<!--        <p>性别： {{user_detail.sex|sex_show}}</p>-->
<!--        <p>生日： {{user_detail.birthday}}</p>-->
<!--        <p>邮箱： {{user_detail.email}}</p>-->
<!--        <p>爱好： {{user_detail.interest}}</p>-->
<!--        <p>电话： {{user_detail.cell_phone}}</p>-->
<!--        <p>介绍： {{user_detail.introduction}}</p>-->

<!--        </div>-->


  </div>
</template>

<script>
    import axios from 'axios';
    import breadnavigation from "../../Biz/breadnavigation.vue";


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
                },

          editUserInfo(){
              this.$message.warning("这个功能还没开发!")
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
    },
        components: {
            breadnavigation
        }
    }
</script>

<style lang="scss" scoped>
    
        .user_detail {
        text-align: left;
        /*float: center;*/
    }
    /*ul,ol,li{list-style:none;}*/

/*    input.special {*/
/*    height: 30px;*/
/*    width: 100px;*/
/*    color: white;*/
/*    background-color:slateblue;*/
/*    text-align: center;*/
/*    float: left;*/
/*    margin-left: 300px;*/
/*    margin-bottom: 10px;*/
/*    margin-top: 10px;*/
/*}*/

        input.special{
          margin-left: -500px;
        }

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 500px;
  margin-left: 300px;
  margin-top: 100px;
  size: 24px;
  background-color: #232121;
  border: 0;
}

  .box-card p,  .box-card{
    padding: 5px;
    color: white;
    font-weight: 500;
    font-size: 16px;
  }

</style>
