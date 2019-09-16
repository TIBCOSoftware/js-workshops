"use strict";

// Simple JSON database mod to store users
var JsonDB = require('node-json-db');
var db = new JsonDB("userDataBase", true, true);

module.exports = {
    // very simple search example for the demo
    search: function(user){
        // pull back all users
        let users = db.getData("/users");

        // look at each user and see if one has same username as one offered
        var i;
        for (i = 0; i < users.length; i++) { 
            if (users[i].username == user.username){
                return users[i];
            }
        }
        return null;
    },
    // 
    validatePassword: function(user){
        let userCheck = this.search(user);

        if (userCheck == null){
            return "no_user_found";
        }else if (userCheck.password != user.password){
            return "password_mismatch";
        }else{
            return true;
        }
    },
    createToken :function (user){
        var data = "";
        data = 'u=' + user.username
        data += "|o=" + user.org
    
        if (user.roles){
            if(user.roles.length > 0){
                data += "|r=" + user.roles;
            }
        }

        if (user.pa1){
            if(user.pa1.length > 0){
                data += "|StoreType=" + user.pa1;
            }
        }

        if (user.pa2){
            if(user.pa2.length > 0){
                data += "|StoreCountry=" + user.pa2;
            }
        }
    
        var buff = new Buffer.from(data);  
        var base64data = buff.toString('base64');
        
        console.log(base64data);  
    
        // This example is using the base64 decoder for a demo
        // You comment out and use encodeURI to send non-encoded token to out of the box JRS
        return base64data
        //return encodeURI(data);
    }
};


