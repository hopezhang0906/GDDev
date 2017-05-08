require('../css/login.less')
var React = require('react');
var ReactDOM = require('react-dom');




window.onload = (e) => {

    var backButton=document.getElementById("backButton")
    var signupButton=document.getElementById('signupButton')
    var signupModule = document.getElementById('signupModule')
    var signinModule = document.getElementById('signinModule')

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

}