require('../css/index.less')


var isSignedIn = true

var userInfoData = {
    favicon: '/public/img/Aqdas_Malik2.png',
    userEmail: 'malikpersonal@outlook.com',
    userName: 'Aqdas Malik',
    userpassword: '123456',
    userPersonalStatement:'Computing in Social science,PhD'
}

var resultListInfo = {
    projects: [
        {
            title: 'Uses and Gratifications of digital photo sharing on Facebook',
            type: '论文',
            uploader: 'Aqdas Malik',
            isFavorite: '#FF4081',
            bgImg: '/public/img/social.jpg'
        },
        {
            title: '多功能智能手环',
            type: '专利',
            uploader: '高强',
            isFavorite: 'grey',
            bgImg: '/public/img/wristRingProduct.jpg'
        },
        {
            title: 'Hacking the Xbox',
            type: '出版物',
            uploader: 'Andrew Huang',
            isFavorite: 'grey',
            bgImg: '/public/img/xbox.jpg'
        }
    ]

}

window.onload = (e) => {

    var dialog = document.querySelector('dialog');
    var showModalButton = document.querySelector('#addNewButton');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    showModalButton.addEventListener('click', function() {
      dialog.showModal();
    });
    dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });
  

    //skip to sign in page
    var signinButton = document.getElementById("signinButton")

    signinButton.addEventListener("click", function () {

        window.location.href = "/login?signin";
    });

    //skip to sign up page
    var signupButton = document.getElementById("signupButton")

    signupButton.addEventListener("click", function () {

        window.location.href = "/login?signup";
    });

    if (isSignedIn) {
        console.log(isSignedIn)
        var loginPanel = document.getElementById('logInPanel')
        //var userinfoPanel=document.getElementById('personalInfo')
        loginPanel.style.display = 'none'
        //userinfoPanel.style.display='block'
    } else {

        console.log(isSignedIn)
        var userinfoPanel = document.getElementById('userinfo')
        userinfoPanel.style.display = 'none'
    }

    var userinfo = new Vue({
        el: '#userinfo',
        data: userInfoData
    })
    Vue.component('picAndCaption-item', {
        props: ['picAndCaption'],
        template: '<li>123</li>',

    })
    var resultList = new Vue({
        el: '#resultList',
        data: resultListInfo
    })
}


