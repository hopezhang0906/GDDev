require('../css/index.less')
var async =require('async')

var isSignedIn = false

var userInfoData = {
    favicon: '/public/img/Aqdas_Malik2.png',
    userEmail: 'malikpersonal@outlook.com',
    userName: 'Aqdas Malik',
    userpassword: '123456',
    userPersonalStatement:'Computing in Social science,PhD'
}

// var resultListInfo = {
//     projects: [
//         {
//             title: 'Uses and Gratifications of digital photo sharing on Facebook',
//             type: '论文',
//             uploader: 'Aqdas Malik',
//             isFavorite: '#FF4081',
//             bgImg: '/public/img/social.jpg'
//         },
//         {
//             title: '多功能智能手环',
//             type: '专利',
//             uploader: '高强',
//             isFavorite: 'grey',
//             bgImg: '/public/img/wristRingProduct.jpg'
//         },
//         {
//             title: 'Hacking the Xbox',
//             type: '出版物',
//             uploader: 'Andrew Huang',
//             isFavorite: 'grey',
//             bgImg: '/public/img/xbox.jpg'
//         }
//     ]

// }


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

        window.location.href = "/portal?signin";
    });

    //skip to sign up page
    var signupButton = document.getElementById("signupButton")

    signupButton.addEventListener("click", function () {

        window.location.href = "/portal?signup";
    });


    console.log(getCookie('token'));

    var tempToken=JSON.parse(getCookie('token'))
    console.log(tempToken);
    console.log(tempToken.token);
    var tempTokenString=tempToken.token;
    var tempUserId=tempToken.userId;


async.waterfall([
    function(callback) {
        $.ajax({
            url: '/portal/token/'+tempTokenString,
            datatype: 'json',
            type: 'get',
            success: (res) => {
                callback(null, res.status == 'OK')
            }
        });
    },
    function(arg1, callback) {
        // arg1 now equals 'one' and arg2 now equals 'two'
        console.log('tokenValidation:'+arg1)
        if(arg1){
        var loginPanel = document.getElementById('logInPanel')
        //var userinfoPanel=document.getElementById('personalInfo')
        loginPanel.style.display = 'none'
        //userinfoPanel.style.display='block'

        }else{
        
        var userinfoPanel = document.getElementById('userinfo')
        userinfoPanel.style.display = 'none'

        }
        callback(null,arg1);
    },
    function(arg1, callback) {
        if(arg1){

        $.ajax({


        url: '/portal/detail/'+tempUserId,
        datatype: 'json',
        type: 'get',
        success: function (res) {
                console.log(res)
                var userinfo =new Vue({
                    el: '#userinfo',
                    data: res.result
                })
                
            }
        });



    }else{
        console.log(arg1)

        }
        callback(null, 'done');
    }
], function (err, result) {
    // result now equals 'done'
});


   var filterType=''
   var filterFaculty=''
   var filterKeywords=''

   var wholeFilter=''

   var selectTypeButton=document.getElementById('selectType')
   var selectMajorButton=document.getElementById('selectMajor')

async.waterfall([
    function(callback) {
        var addReactInfo = window.location.href;   
        if(addReactInfo.split("?")[1]){
            var filterTemp=addReactInfo.split("?")[1];
            if(filterTemp.split("=")[0]=='type')
            {
                filterType =filterTemp.split("=")[1];
                console.log(filterType)
                if(filterType=="ALL"){
                    console.log('filter all types')

                }else{
                selectTypeButton.innerHTML=filterType;
                selectTypeButton.style.borderColor='#FF4081'
                selectTypeButton.style.color='#FF4081'
                filterType='type=="'+filterType+'"'
                wholeFilter='filter='+filterType
                console.log(wholeFilter)


                }

            }else{
                if(filterTemp.split("=")[0]=='faculty'){
                filterFaculty =filterTemp.split("=")[1];
                console.log(filterFaculty)
                if(filterFaculty=="ALL"){
                console.log('filter all faculty')
                }else{
                var encodeFaculty =decodeURI(filterFaculty)
                selectMajorButton.innerHTML=encodeFaculty;
                selectMajorButton.style.borderColor='#FF4081'
                selectMajorButton.style.color='#FF4081'
                filterFaculty='faculty=="'+filterFaculty+'"'
                wholeFilter='filter='+filterFaculty   
                console.log(wholeFilter)
                }


            }else{
                    filterKeywords=filterTemp.split("=")[1];
                    console.log(filterKeywords)
                    filterKeywords='title CONTAINS"'+filterKeywords+'"'
                    wholeFilter='filter='+filterKeywords
                    console.log(wholeFilter)

                }

            }
            

        }else{

            console.log('no filter')
            
        }
        
        callback(null)
    },
    function(callback) {
        var addReactInfo = window.location.href;   
        if(addReactInfo.split("?")[2]){
            var filterTemp=addReactInfo.split("?")[2];
            if(filterTemp.split("=")[0]=='type')
            {
                filterType =filterTemp.split("=")[1];
                console.log(filterType)
                if(filterType=="ALL"){
                    console.log('second filter all types')
                }else{
                
                selectTypeButton.innerHTML=filterType;
                selectTypeButton.style.borderColor='#FF4081'
                selectTypeButton.style.color='#FF4081'
                filterType='type=="'+filterType+'"'
                wholeFilter=wholeFilter+'AND '+filterType
                console.log(wholeFilter)

                }

            }else{
                if(filterTemp.split("=")[0]=='faculty'){

                filterFaculty =filterTemp.split("=")[1];
                console.log(filterFaculty)
                if(filterFaculty=='ALL'){
                    console.log('second filter all faculty')               
                 }else{
                var temp1=addReactInfo.split("?")[1]
                var filterType =temp1.split("=")[1];
                console.log(filterType)
                 var encodeFaculty =decodeURI(filterFaculty)

                selectMajorButton.innerHTML=encodeFaculty;
                selectMajorButton.style.borderColor='#FF4081'
                selectMajorButton.style.color='#FF4081'
                filterFaculty='faculty=="'+filterFaculty+'"'
                if(filterType=='ALL'){
                    wholeFilter=filterFaculty
                    console.log(wholeFilter)
                 }else{
                    wholeFilter=wholeFilter+'AND '+filterFaculty   
                    console.log(wholeFilter)
                 }


                }

            }else{
                    filterKeywords=filterTemp.split("=")[1];
                    console.log(filterKeywords)
                    filterKeywords='title CONTAINS"'+filterKeywords+'"'
                    wholeFilter=wholeFilter+'AND '+filterKeywords
                    console.log(wholeFilter)

                }

            }
            

        }else{

            console.log('no filter after second?')
            
        }
      
        callback(null);
    },    function(callback) {
                var addReactInfo = window.location.href;   
        if(addReactInfo.split("?")[3]){
            var filterTemp=addReactInfo.split("?")[3];
            if(filterTemp.split("=")[0]=='type')
            {
                filterType =filterTemp.split("=")[1];
                console.log(filterType)
                selectTypeButton.innerHTML=filterType;
                selectTypeButton.style.borderColor='#FF4081'
                selectTypeButton.style.color='#FF4081'
                filterType='type=="'+filterType+'"'
                wholeFilter=wholeFilter+'AND '+filterType
                console.log(wholeFilter)
            }else{
                if(filterTemp.split("=")[0]=='faculty'){
                filterFaculty =filterTemp.split("=")[1];
                console.log(filterFaculty)
                var encodeFaculty =decodeURI(filterFaculty)
                selectMajorButton.innerHTML=encodeFaculty;
                selectMajorButton.style.borderColor='#FF4081'
                selectMajorButton.style.color='#FF4081'
                filterFaculty='faculty=="'+filterFaculty+'"'
                wholeFilter=wholeFilter+'AND '+filterFaculty   
                console.log(wholeFilter)
            }else{
                    filterKeywords=filterTemp.split("=")[1];
                    console.log(filterKeywords)
                    filterKeywords='title CONTAINS"'+filterKeywords+'"'
                    wholeFilter=wholeFilter+'AND '+filterKeywords
                    console.log(wholeFilter)

                }

            }
            

        }else{

            console.log('no filter after third?')
            
        }
      
        callback(null);
    },
    function(callback) {

         $.ajax({
        url: `/project/query?`+wholeFilter,
        datatype: 'json',
        type: 'get',
        success: function (data) {
            var resultList = new Vue({
            el: '#resultList',
            data: data
            })


        }
    });
    callback(null);
    }
], function (err, result) {
    // result now equals 'done'
});









});



window.onload = (e) => {


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