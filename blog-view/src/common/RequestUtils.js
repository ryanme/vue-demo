// import Vue from 'vue'
import axios from 'axios'


export default class RequestUtils{

    constructor(url, params) {
        this.url = url;
        this.params = params === null ? {} : params;
    }

    get_method (){
        return axios.request({
            baseURL: 'http://ryanme.top',
            url: this.url,
            method: 'get',
            params: this.params
        })
    };

}


