import axios from "axios";

const post_data = {"username": this.userName, "password": this.setMd5(this.password)};
const post_header = {headers: {'X-CSRFToken': this.getCookie('csrftoken')}};
axios.post('/api/login', post_data , post_header)
    .then((response)=> {
        if (response.data["code"] === 0){
            this.message = '登录成功';
        }
        else this.message = response.data['message']
    })
    .catch((error) => {
        this.message = error
    });