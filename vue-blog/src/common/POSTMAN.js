var appKey = "203772574";
var appSecret = "mqcq9bdhaclb94yy505gjsgahgyacu3j";
var md5 = calcMd5();
var dateObject = Date;
var date = dateObject.toLocaleString();
var nonce = createUuid();
var textToSign = "";
var accept = "*/*";
var contentType = "";


if(request.headers["accept"]){
    accept = request.headers["accept"];
}
if(request.headers["content-type"]){
    contentType = request.headers["content-type"];
}
textToSign += request.method + "\n";
textToSign += accept + "\n";
textToSign += md5 + "\n";
textToSign += contentType + "\n";
textToSign += date + "\n";
var headers = headersToSign();
var signatureHeaders;
var sortedKeys = Array.from(headers.keys()).sort()
for (var headerName of sortedKeys) {
    textToSign += headerName + ":" + headers.get(headerName) + "\n";
    signatureHeaders = signatureHeaders ? signatureHeaders + "," + headerName : headerName;
}
textToSign += urlToSign();

var hash = CryptoJS.HmacSHA256(textToSign, appSecret)

var signature = hash.toString(CryptoJS.enc.Base64)

pm.globals.set('AppKey', appKey);
pm.globals.set('Md5', md5);
pm.globals.set("Date", date);
pm.globals.set("Signature", signature);
pm.globals.set("SignatureHeaders", signatureHeaders);
pm.globals.set("Nonce", nonce);

function headersToSign() {
    var headers = new Map();
    for (var name in request.headers) {
        name = name.toLowerCase();
        if (!name.startsWith('x-ca-')) {
            continue;
        } 
        if (name === "x-ca-signature" || name === "x-ca-signature-headers" || name == "x-ca-key" || name === 'x-ca-nonce') {
            continue;
        }
        var value = request.headers[name];
        headers.set(name, value);
    }
    headers.set('x-ca-key', appKey);
    headers.set('x-ca-nonce', nonce);
    return headers;
}

function urlToSign() {
    var params = new Map();
    var contentType = request.headers["content-type"];
    if (contentType && contentType.startsWith('application/x-www-form-urlencoded')) {
       for(var x in request.data){
           params.set(x, request.data[x]);
       }
    }
    var queryParam = pm.request.url.query.members;
    for (let i in queryParam) {
        params.set(queryParam[i].key, queryParam[i].value);
    }
    var sortedKeys = Array.from(params.keys())
    sortedKeys.sort();
    var url = "";
    for(var k of pm.request.url.path){
        url = url + "/" + k;
    }
    var qs;
    for (var kk of sortedKeys) {
        var s = kk + "=" + params.get(kk);
        qs = qs ? qs + "&" + s : s;
    }
    return qs ? url + "?" + qs : url;
}

function calcMd5() {
    var contentType = String(request.headers["content-type"]);
    if (!JSON.stringify(request.data).startsWith('{}') && !contentType.startsWith('application/x-www-form-urlencoded')) {
        var data = request.data;
        var md5 = CryptoJS.MD5(data);
        var md5String = md5.toString(CryptoJS.enc.Base64);
        return md5String;
    } else {
        return "";
    }
}

function createUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

postman.clearGlobalVariable("variable_key");