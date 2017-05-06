require('../css/projectDetail.less')


var patentTemplate = {

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



window.onload = (e) => {



    var backButton = document.getElementById("backButton")

    backButton.addEventListener("click", function () {

        window.location.href = "/";
    });


}


