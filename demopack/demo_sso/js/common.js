function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function createToken(userId,orgId,roles,pa1,pa2){

    //let user = users.find(findUser
    let token = "u=" + userId + 
    "|r=" + (roles == undefined ? '' : roles) + 
    "|o=" + orgId;

    if(pa1 === undefined || pa1.length == 0){
        token == token;
    }else{
        token += "|StoreType=" + pa1;
    }

    if(pa2 === undefined || pa2.length == 0){
        token == token;
    }else{
        token += "|StoreCountry=" + pa2;
    }

    console.log(token);

    return token;

}

function findAndReplace(string, target, replacement) {
 
    var i = 0, length = string.length;

    for (i; i < length; i++) {

        string = string.replace(target, replacement);

    }

    return string;
 
}
