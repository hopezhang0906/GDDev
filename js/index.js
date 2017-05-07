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


$(document).ready(function() {
console.log("this document is ready")

 var selectTypeDialog = document.querySelector('#selectTypeDialog');
 var dialogBgMask=document.getElementById('dialogBgMask');
 var addNewButton = document.querySelector('#addNewButton');
 var closeSelectTypeDialogButton =document.querySelector('.closeSelectTypeDialog');
 var sortedByTypeButton=document.getElementById("selectType");
 var SortingTypeDialog=document.getElementById('SortingTypeDialog')
 var closeSortedTypeDialogButton=document.querySelector('.closeSortedTypeDialog');

 //sorted by Faculty
 var selectMajorButton=document.getElementById('selectMajor');
 var closeSortedFacultyDialogButton=document.querySelector('.closeSortedFacultyDialog');
 var SortingFacultyDialog=document.getElementById('SortingFacultyDialog');

 selectMajorButton.addEventListener('click',function(){
          dialogBgMask.style.display='block';
     SortingFacultyDialog.style.display='block';
 })

 closeSortedFacultyDialogButton.addEventListener('click',function(){
     
     SortingFacultyDialog.style.display='none';
     dialogBgMask.style.display='none';
 })



 sortedByTypeButton.addEventListener('click',function(){
     dialogBgMask.style.display='block';
     SortingTypeDialog.style.display='block';
 })

  closeSortedTypeDialogButton.addEventListener('click',function(){

     SortingTypeDialog.style.display='none';
     dialogBgMask.style.display='none';

 });

 dialogBgMask.addEventListener('click',function(){
     selectTypeDialog.style.display='none'
     dialogBgMask.style.display='none';
     SortingTypeDialog.style.display='none';
     SortingFacultyDialog.style.display='none';

 });

 closeSelectTypeDialogButton.addEventListener('click',function(){

     selectTypeDialog.style.display='none';
     dialogBgMask.style.display='none';

 });
 addNewButton.addEventListener('click',function(){
        dialogBgMask.style.display='block';
        selectTypeDialog.style.display='block';

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

    var resultList = new Vue({
        el: '#resultList',
        data: resultListInfo
    })

});


window.onload = (e) => {


}


