require('../css/createnewone.less')
//var request = require('request')
var currentUser = {
    favicon: '/public/img/Aqdas_Malik2.png',
    userEmail: 'malikpersonal@outlook.com',
    userName: 'Aqdas Malik',
    id:'123456',
    userpassword: '123456',
    userPersonalStatement:'Computing in Social science,PhD'
}

var patentTemplate = {

    title: '专利名称',
    abstract: '请输入摘要',
    finishDate: '请选择项目结束的日期',
    tags: [
        {
            tag: '核心技术'
        },
    ],
    description: [
        {
            label: '申请公布号',
            content: '例CN103445409A',

        },
        {
            label: '申请人/单位',
            content: '青岛歌尔声学科技有限公司',

        },
        {
            label: '分类号',
            content: 'A44C5/00(2006.01)I',

        },
        {
            label: '代理人/机构',
            content: '潍坊正信专利事务所',

        }

    ]
}

var essayTemplate = {

    title: '论文标题',
    abstract: '请输入摘要',
    finishDate: '请选择论文上线日期',
    tags: [
        {
            tag: '涉及技术'
        },
    ],
    description: [
        {
            label: '期刊名称',
            content: '例:Telematics and Informatics',
        },
        {
            label: '期刊页数',
            content: '例:33卷(2016) 129-138',

        },
        {
            label: '字数',
            content: '例:约2000字',

        },

    ]
}

var softwareTemplate = {

    title: '产品名称',
    abstract: '简介',
    finishDate: '上线日期',
    tags: [
        {
            tag: '涉及技术'
        },
    ],
    description: [
        {
            label: '所在平台',
            content: '例:windows/mac/android',
        },
        {
            label: '支持语言',
            content: '例:中文/英文',

        },
        {
            label: '产品大小',
            content: '例:223.6MB',

        },

    ]
}

var publicationTemplate = {

    title: '出版物名称',
    abstract: '内容简介',
    finishDate: '出版日期',
    tags: [
        {
            tag: '涉及技术'
        },
    ],
    description: [
        {
            label: '出版社',
            content: '例: 北京航空航天大学出版社',
        },
        {
            label: 'ISBN',
            content: '例:9787512417465',

        },
        {
            label: '页数',
            content: '例:300页',

        },

    ]
}

var artTemplate = {

    title: '作品名称',
    abstract: '作品简介',
    finishDate: '完成日期',

    description: [

    ]
}
$(document).ready(function() {

       var backButton = document.getElementById("backButton")

    backButton.addEventListener("click", function () {

        window.location.href = "/";

    });




    //init format for boostrap date picker


    //add tag button click fuction
    var addNewTagButton = document.getElementById("addNewTagButton")
    var inputForTag = document.getElementById("inputForTag")
    //add credit button click function 
    var addNewCreditButton=document.getElementById("addNewCreditButton")
    var makerName=document.getElementById("makerName")
    var makerCredit=document.getElementById("makerCredit")
    //add description button click fuction
    var addCustomDescriptionButton=document.getElementById("addCustomDescriptionButton")
    var descriptionTitle=document.getElementById("descriptionTitle")
    var descriptionText=document.getElementById("descriptionText") 
    var hintParagrah=document.getElementById('hintParagrah')

    var infoCount=5
    addCustomDescriptionButton.addEventListener("click",function(){
            if(descriptionTitle.value==null||descriptionText.value==""){

                console.log('invalid info title/text')
                hintParagrah.innerHTML='请输入有效信息！'
                hintParagrah.style.color='#d50000'
                return false


            }
                hintParagrah.innerHTML='自定义描述信息'
                hintParagrah.style.color='#95989a'
        
        var new_description = $(
          "<div class=\"submitOneCustomItem\">"+
          "<div id=\"firstOne\" class=\"form\">"+
          "<div style=\"padding-top: 5px;\" class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\">"+
          "<input disabled=\"disabled\"  style=\"width: 275px;\" value=\""+descriptionTitle.value+"\" id=\"descriptionTitle\" class=\"mdl-textfield__input\" type=\"text\">"+
          "<input name=\"infoTitle["+infoCount+"]\" value=\""+ descriptionTitle.value +"\" style=\"display: none\">"+
          "</div>"+
          "</div>"+
          "<div class=\"description form\" >"+
          "<div class=\"mdl-textfield mdl-js-textfield\">"+
          "<textarea  disabled=\"disabled\" id=\"descriptionText\" class=\"mdl-textfield__input\" type=\"text\" rows=\"3\">"+descriptionText.value+"</textarea>"+
          "<input name=\"infoContent["+infoCount+"]\" value=\""+descriptionText.value+"\" style=\"display:none\">"+
          "</div>"+
          "</div>"+
          "<button type=\"button\" onclick=\"removeThisChip(this)\" class=\"mdl-button mdl-js-button mdl-button--icon mdl-button--colored\">"+
          "<i class=\"material-icons\">delete</i>"+
          "</button>"+
          "</div>"

        ).hide();
        infoCount++;
        descriptionTitle.value=''
        descriptionText.value=''
        $("#CustomDescriptionSection").append(new_description);

        new_description.show('normal')

    })

    var makersCount=0;
    addNewCreditButton.addEventListener("click",function(){

       console.log(makerName.value)
       console.log(makerCredit.value)
       var hintPForMakers=document.getElementById('hintPForMakers')


        if(makerName.value==null||makerCredit.value==""){

                console.log('invalid maker info')
                hintPForMakers.innerHTML='请输入有效信息！'
                hintPForMakers.style.color='#d50000'
                return false


            }

            hintPForMakers.innerHTML='成员与身份'
            hintPForMakers.style.color='#95989a'


        var new_credit = $(

              "<div id=\"SubmitForMaker\" class=\"form\" class=\"addInfoInput\">"+
              "<div id=\"makerNameItem\" class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\">"+
              "<input id=\"makerName\"  value=\""+makerName.value+"\" disabled=\"disabled\"  class=\"mdl-textfield__input\" type=\"text\">"+
              "<input  style=\"display:none\" value=\""+makerName.value+"\" name=\"makersName["+makersCount +"]\" type=\"text\">"+
              "</div>"+
              "<div id=\"makerCreditItem\"  class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\">"+
              "<input id=\"makerCredit\"  disabled=\"disabled\" value=\""+makerCredit.value+"\" class=\"mdl-textfield__input\" type=\"text\">"+
              "<input name=\"makersRole["+makersCount+"]\"  value=\""+makerCredit.value+"\"style=\"display:none\"  type=\"text\">"+
              "</div>"+
              "<button type=\"button\" id=\"removeCreditButton\" onclick=\"removeThisChip(this)\" class=\"mdl-button mdl-js-button mdl-button--icon mdl-button--colored\">"+
              "<i class=\"material-icons\">delete</i>"+
              "</button>"+
              "</div>"

).hide();

        $("#creditsSection").append(new_credit);
        makersCount++;
        new_credit.show('normal')

    })

    // removeTagButton.addEventListener("click",function(){
    //       removeTagButton.parentNode.remove()
    // })
    var tagCount=0

    addNewTagButton.addEventListener("click", function () {
        var hintPForTag=document.getElementById('hintPForTag')
        if(inputForTag.value==null||inputForTag.value==""){

                console.log('invalid tag')
                
                hintPForTag.innerHTML='请不要输入空标签!'
                hintPForTag.style.color='#d50000'
                return false


            }
        

        console.log(inputForTag.value)
        hintPForTag.innerHTML='标签'
        hintPForTag.style.color='#95989a'


        var new_tag = $(
            "<span id=\"chip\" class=\"mdl-chip mdl-chip--deletable\">" +
            "<span class=\"mdl-chip__text\">" +
            inputForTag.value + "</span>" +
            "<input name=\"tags["+tagCount+"]\" value=\""+inputForTag.value+"\" style=\"display:none\">"+
            "<button type=\"button\" onclick=\"removeThisChip(this)\" id=\"removeTagButton\" class=\"mdl-chip__action\"><i class=\"material-icons\">cancel</i></button>" +
            "</span>").hide();

        $("#tagsSection").append(new_tag);
        tagCount++;
        inputForTag.value=''
        new_tag.show('normal')

    });


    var addReactInfo = window.location.href;                                                                //获取url
    var projectType = addReactInfo.split("?")[1]; 

    console.log(projectType)

    var basicInfo = new Vue({
        el: '#basicInfo',
        data: eval(projectType+"Template")
    })

    var descriptionSection = new Vue({
        el: '#descriptionSection',
        data: eval(projectType+"Template")
    })

    var submitTypeInput=document.getElementById('submitType')
    submitTypeInput.value=projectType
    var submitUploaderInput=document.getElementById('submitUploader')
    submitUploaderInput.value=currentUser.id



});

function finalSubmit(e){
    //e.preventDefault()
    return false;
}


function selectFile() {

    //触发 文件选择的click事件 
    $("#fileInput").trigger("click");
    //其他code如 alert($("#file").attr("value")) 
}

