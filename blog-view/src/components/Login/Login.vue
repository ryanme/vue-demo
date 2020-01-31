<template>
  <div>
    <ul id="breadcrumbs-one">
    <li><router-link to="/">主页</router-link></li>
    <li><a class="current">用户中心</a></li>
    </ul>
    
    <div class="login_form">
      <div v-if="isLogin">
        <p>恭喜你登录成功了</p>
      </div>
      <div v-else>
        <input type="input" placeholder="用户名" v-model="userName"> <br>
        <input type="password" placeholder="密码" v-model="password"> <br>
        <input type="button" class="special" v-on:click="login()" value="登陆">
      </div>
      <p v-if="message">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Login",
        data() {
            return {"username": null, "password": null, isBtnLoading: false, message: null, isLogin: false, userName: sessionStorage.userName}
        },
        methods: {
          login() {
            if (!this.userName) {
              this.message = '请输入用户名';
            }else if (!this.password) {
              this.message = '请输入密码';
            }else{
                  axios.get('/api/get_token')
                    .then((response) => {
                      this.csrf = response.data["token"];
                      console.log(this.csrf);
                      const post_data = {"username": this.userName, "password": this.BaseFunc.setMd5(this.password)};
                      const post_header = {headers: {'X-CSRFToken': this.csrf}};
                      axios.post('/api/login', post_data, post_header)
                              .then((response) => {
                                if (response.data["code"] === 0) {
                                  this.message = '登录成功';
                                  this.isLogin = true;
                                } else this.message = response.data['message']
                              })
                              .catch((error) => {
                                this.message = error
                              });
                    })
                    .catch((error) => {
                      console.log(error)
                    });
          }
            }            
        }
    }
</script>

<style scoped>
input.input {
    margin: 5px;
    width: 200px;
    height: 30px;
}
</style>
