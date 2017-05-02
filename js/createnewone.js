require('../css/createnewone.less')


var NewProjectTemplate = {

    title: '专利名称',
    abstract: '请输入摘要',
    finishDate: '请选择项目结束的日期',
    tags: [
        {
            tag: '核心技术'
        },
    ],
    makers: [
        {
            name: '张某某',
            credits: '负责人'
        },
    ],
    description: [
        {
            label: '申请公布号',
            content: '例CN103445409A'
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

var ProjectAllInfo = {

    title: '专利名称',
    abstract: '请输入摘要',
    finishDate: '请选择项目结束的日期',
    img: '/public/img/Aqdas_Malik2.png',
    tags: [
        {
            tag: '例:多传感器'
        },
        {
            tag: '例:智能'
        },
    ],
    makers: [
        {
            name: '高强',
            credits: '发明人'
        },
        {
            name: '戚建成',
            credits: '发明人'
        }
    ],
    description: [
        {
            label: '申请公布号',
            content: '例CN103445409A'
        },
        {
            label: '申请人/单位',
            content: '青岛歌尔声学科技有限公司',
        },
        {
            label: '分类号',
            content: 'A44C5/00(2006.01)I',
        }

    ]
}

window.onload = (e) => {

    //init format for boostrap date picker
    $('.datepicker').datepicker({
        format: 'mm/dd/yyyy',
        startDate: '-3d',
    });

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

    addCustomDescriptionButton.addEventListener("click",function(){
        console.log(descriptionTitle.value)
        console.log(descriptionText.innerHTML)


        var new_description = $(
         "<form class=\"addedDescription\" action=\"#\">"+
         "<div class=\"mdl-textfield mdl-js-textfield\">"+
         "<label id=\"labelforTextArea\">"+descriptionTitle.value+"</label>"+
         "<textarea disabled=\"disabled\" class=\"mdl-textfield__input\" type=\"text\" rows=\"3\">"+descriptionText.innerHTML+"</textarea>"+
         "</div>"+
         "<button id=\"removeCreditButton\" onclick=\"removeThisChip(this)\"  class=\"mdl-button mdl-js-button mdl-button--icon mdl-button--colored\">"+
         "<i class=\"material-icons\">delete</i>"+
         "</button>"+
         "</form>"

        ).hide();

        $(".oneCustomItem").append(new_description);

        new_description.show('normal')

    })

    addNewCreditButton.addEventListener("click",function(){

       console.log(makerName.value)
       console.log(makerCredit.value)


        var new_credit = $(
              "<div id=\"creditAdded\">"+
              "<form id=\"inputForMaker\" class=\"addInfoInput\" action=\"#\">"+
              "<div class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\">"+
              "<input  disabled=\"disabled\" value=\""+ makerName.value +"\"class=\"mdl-textfield__input\" type=\"text\" >"+
              "<span class=\"mdl-textfield__error\"></span>"+
              "</div>"+
              "</form>"+
              "<form id=\"inputForMaker\" class=\"addInfoInput\" action=\"#\">"+
              "<div class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\">"+
              "<input  disabled=\"disabled\" value=\""+ makerCredit.value +"\" class=\"mdl-textfield__input\" type=\"text\">"+
              "<span class=\"mdl-textfield__error\"></span>"+
              "</div>"+
              "</form>"+
              "<button id=\"removeCreditButton\" onclick=\"removeThisChip(this)\"  class=\"mdl-button mdl-js-button mdl-button--icon mdl-button--colored\">"+
              "<i class=\"material-icons\">delete</i>"+
              "</button>"+
              "</div>"

).hide();

        $("#creditsSection").append(new_credit);

        new_credit.show('normal')

    })

    // removeTagButton.addEventListener("click",function(){
    //       removeTagButton.parentNode.remove()
    // })

    addNewTagButton.addEventListener("click", function () {

        console.log(inputForTag.value)


        var new_tag = $(
            "<span id=\"chip\" class=\"mdl-chip mdl-chip--deletable\">" +
            "<span class=\"mdl-chip__text\">" +
            inputForTag.value + "</span>" +
            "<button type=\"button\" onclick=\"removeThisChip(this)\" id=\"removeTagButton\" class=\"mdl-chip__action\"><i class=\"material-icons\">cancel</i></button>" +
            "</span>").hide();

        $("#tagsSection").append(new_tag);

        new_tag.show('normal')

    });


    var basicInfo = new Vue({
        el: '#basicInfo',
        data: NewProjectTemplate
    })

    var descriptionSection = new Vue({
        el: '#descriptionSection',
        data: NewProjectTemplate
    })



}


