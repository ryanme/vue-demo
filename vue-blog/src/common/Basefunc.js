import crypto from "crypto";

export default class BaseFunc {

    /* */
    static setMd5(password){
        const md5 = crypto.createHash("md5");
        md5.update(password);
        return  md5.digest('hex')
    }

    static getCookie(name){
        const value = '; ' + document.cookie;
        const parts = value.split('; ' + name + '=');
        if (parts.length === 2) return parts.pop().split(';').shift();
        else return null
    }

}
