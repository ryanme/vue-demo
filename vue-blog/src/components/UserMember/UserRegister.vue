<template>
 <div>
<ul id="breadcrumbs-one">
    <li><router-link to="/">主页</router-link></li>
    <li><router-link to="/managemember">用户管理</router-link></li>
    <li><a class="current">个人信息填写</a></li>
</ul>
        <div class="userInfo">

        <form action="null">
                <b>个人信息填写</b>
               <p>
            <label for="name" class="miaoshu">姓    名：</label>
            <input type="text" id="username" maxlength="10" class="input" v-model="userinfo.username">  
            <label class="mustChoice">*</label>
            <label for="mssage1" v-if="errormessage.message1" class="errorMessage">{{ errormessage.message1 }}</label>
           </p>
           <p>
            <label for="sex" class="miaoshu">性     别：</label>
            <select name="sex" id="sex" v-model="userinfo.sex">
                    <option value="--">--</option>
                    <option value="man">男</option>
                    <option value="woman">女</option>
            </select>
            <label class="mustChoice"> *</label>
            <label for="mssage2" v-if="errormessage.message2" class="errorMessage">{{ errormessage.message2 }}</label>
           </p>
            
            <p>
                <label for="birthday" class="miaoshu">出 生 日 期：</label>
                <input type="date" value="" id="birthday" v-model="userinfo.birthday" />
            </p>
            
            <p>
                <label for="phonenumber" class="miaoshu">手  机  号：</label>
                <input type="number" id="phonenumber" class="input" v-model="userinfo.phonenumber">
                <label class="mustChoice">*</label>
                <label for="mssage3" v-if="errormessage.message3" class="errorMessage">{{ errormessage.message3 }}</label>

            </p>

            <p>
                <label for="interest" class="miaoshu">兴 趣 爱 好：</label>
                <input name="interest" type="checkbox" value="sleep" class="interest" />睡觉 
                <input name="interest" type="checkbox" value="sport" class="interest" />运动
                <input name="interest" type="checkbox" value="eat" class="interest" />吃
                <input name="interest" type="checkbox" value="game" class="interest" />游戏
            </p>

            <p>
                <label for="email" class="miaoshu">邮 箱：</label>
                <input type="email" id="email" class="input" maxlength="20" v-model="userinfo.email">
                
                <label class="mustChoice">*</label>
                <label for="mssage4" v-if="errormessage.message4" class="errorMessage">{{ errormessage.message4 }}</label>

            </p>

            <p>
                <label for="intro" class="miaoshu">自 我 介 绍：</label>
                <textarea name="intro" cols="100" rows="10" id="intro" maxlength="100" v-model="userinfo.intro"></textarea>
            </p>

            <p>
                <input type="button" id="reset" value="重置" @click="clear()" class="special"/>
                <input type="button" id="register" value="提交" @click="submit()" class="special"/>
                <input type="button" value="返回" @click="go_userlist_page()" class="special"/>

                <label v-if="sucessMesage" class="successmessage">{{ sucessMesage }}</label>
            </p>
        </form>
    </div>
 </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'UserRegister',
        data() {
            return { userinfo: {}, errormessage: {message1: null, message2: null, message3: null, message4: null}, sucessMesage:null,
            }
        },

        methods: {
            
            check_data(){
                /*每次检测前清除上一次的essage*/ 
                this.sucessMesage=null;
                this.errormessage={}

                if (!this.userinfo.username){
                    this.errormessage.message1 = "姓名必填!";
                }
                if (this.userinfo.sex != "man" && this.userinfo.sex != "woman"){
                    this.errormessage.message2 = "性别必填";
                }
                if (!this.userinfo.phonenumber){
                    this.errormessage.message3 = "手机号必填！";
                }
                else if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.userinfo.phonenumber)){
                    this.errormessage.message3 = "请输入正确的手机号";
                }
                if (!this.userinfo.email){
                    this.errormessage.message4 = "邮箱号必填!";
                }
                else if  (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.userinfo.email)) {
                    this.errormessage.message4 = "邮箱格式错误";
                }
                // else if (this.userinfo.email.indexOf("@") !=-1 && this.userinfo.email.indexOf(".")!=-1){
                //     const lists_1 = this.userinfo.email.split("@")
                //     const lists_2 = this.userinfo.email.split(".")

                //     const end_symbol_1 = lists_1[lists_1.length-1]
                //     const end_symbol_2 = lists_2[lists_2.length-1]
                //     if (end_symbol_1 && end_symbol_2) {
                //          if (end_symbol_1!="@" && end_symbol_1!="."){
                //             this.errormessage.message4 = null;
                //         }
                //     }
                // }

                for (var key in this.errormessage) {
　　                var item = this.errormessage[key];
　　                if (item) return false
                }   
                return true;

            },

            submit(){
                if (this.check_data()){
                     
                    const post_data2={
                        "user_name":this.userinfo.username,
                        "sex":this.userinfo.sex,
                        "birthday":this.userinfo.birthday,
                        "email":this.userinfo.email,
                        "interest":this.userinfo.interest,
                        "cell_phone":this.userinfo.phonenumber,
                        "introduction":this.userinfo.intro
                        }
                    axios.post('/sjfapi/userregister/', post_data2)
                        .then((response) => {
                            if (response.data.code===200){
                            this.sucessMesage = "新增成功"
                            console.log(response.data);
                        }else{
                            alert(response.data);
                            console.error(response.data)
                        }  
                    })
                        .catch((error) => {
                            console.error(error);
                    });
                }
            },

            clear() {
                this.userinfo = {}
            },

            go_userlist_page(){
                this.$router.push({ name: 'ManageMember'});
            }
        
        },
    }
</script>

<style scoped>

.userInfo {
    text-align: left;
    font-size: 15px;
    padding: 5px;
    margin-left: 300px;
    /* width: 35%; */
}


label.miaoshu {
    text-align: right;
    width: 150px;
    display: inline-table;
    padding: 5px;
}

.mustChoice, .errorMessage {
    padding-left: 5px;
    color: red;
}

.successmessage {
    color: green;
    padding-left: 10px;
}

#intro {
    width: 300px;
}

input.input, #sex, #birthday {
    margin: 5px;
    width: 200px;
    height: 30px;
}
</style>
