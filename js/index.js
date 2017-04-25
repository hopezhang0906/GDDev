require('../css/index.less')


window.onload = (e) => {
    //skip to sign in page
    var signinButton=document.getElementById("signinButton")

    signinButton.addEventListener("click", function(){

     window.location.href = "/login?signin";
    });
   
    //skip to sign up page
    var signupButton=document.getElementById("signupButton")

    signupButton.addEventListener("click", function(){

     window.location.href = "/login?signup";
    });
    
}