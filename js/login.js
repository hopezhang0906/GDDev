require('../css/login.less')
var React = require('react');
var ReactDOM = require('react-dom');




window.onload = (e) => {

    var backButton=document.getElementById("backButton")
    var signupButton=document.getElementById('signupButton')
    var signupModule = document.getElementById('signupModule')
    var signinModule = document.getElementById('signinModule')
    var signinButton=document.getElementById('signinButton')
    
    signinButton.addEventListener('click',function(){
    var username=document.getElementById('usernameAuthen').value
    var password=document.getElementById('userpasswordAuthen').value
    var zzForEmail = /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/;
    var zzForPassword =/^[a-zA-Z]\w{5,17}$/;
         if(!zzForEmail.test(username)&&!zzForPassword.test(password)){
        console.log('invalid input')
         }else{
         console.log('valid signin')
            $.ajax({
            url: "/portal/auth",
            type: "post",
            dataType: "json",
            data: { username: username, password: password},
            success: function (res) {

                console.log(res.status)
                console.log(res.token)
                setCookie('token',JSON.stringify(res.token),20)
                console.log( getCookie('token'))

                 window.location.href = "/";


            }

            });


        }
    })

    backButton.addEventListener("click", function(){
     window.location.href = "/";
    });

    signupButton.addEventListener("click", function(){
      signinModule.style.display='none'
      signupModule.style.display='block'
    });
    
    var addReactInfo = window.location.href;                                                                //获取url
    var module = addReactInfo.split("?")[1]; 

    console.log(module)

    if(module=='signin'){
       
        signinModule.style.display='block'

    }else{
        
        signupModule.style.display='block'
    }

    console.log(getCookie('test'))

}



function signInAuth(){

    var username=document.getElementById('usernameAuthen').value
    var userpassword=document.getElementById('userpasswordAuthen').value
    var zzForEmail = /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/;
    var zzForPassword =/^[a-zA-Z]\w{5,17}$/;
    if(!zzForEmail.test(username)&&!zzForPassword.test(userpassword)){
        console.log('invalid input')
    }else{
         console.log('valid signin')
            // $.ajax({
            // url: "",
            // type: "post",
            // dataType: "json",
            // data: "{username:"+username+",userpassword:"+userpassword+"}",
            // success: function (res) {

            // }

            // });


}

}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}


function clearCookie(name) {  
    setCookie(name, "", -1);  
}  