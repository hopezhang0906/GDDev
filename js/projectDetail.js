require('../css/projectDetail.less')

//var request = require('request');

var projectData = {

    uploadedOn: '2017-05-12BkegRx2py-',
    finishDate: '2017-05-12',
    uploaderId:'Aqdas Malik',
    type:'论文',
    faculty:'理工学部',
    title:'Uses and Gratifications of digital photo sharing on Facebook',
    thumbnail:'social.jpg',
    description:'Despite the rapid adoption of Facebook as a means of photo sharing, minimal research hasbeen conducted to understand user gratiﬁcation behind this activity. In order to addressthis gap, the current study examines users’ gratiﬁcations in sharing photos on Facebookby applying Uses and Gratiﬁcation (U&G) theory. ',
    tags: [
        {
            name: 'FaceBook'
        },{
            name: 'Photo sharing'
        },{
            name: 'Social networking sites'
        },{
            name: 'cross-sectional research'
        },
    ],
    makers: [
        {
            name: 'Aqdas Malik',
            role: 'writer'
        },{
            name: 'Amandeep Dhir',
            role: 'co-writer'
        },{
            name: 'Marko Nieminen',
            role: 'co-writer'
        },
    ],
    info: [
        {
            title: '期刊名称',
            content: 'Telematics and Informatics'
        },
        {
            title: '期刊页数',
            content: '33卷(2016) 129-138',
        },
        {
            title: '字数',
            content: '约2000字',
        },
        {
            title: 'Pdf Link',
            content: 'https://www.researchgate.net/publication/279314060_Uses_and_Gratifications_of_digital_photo_sharing_on_Facebook',
        }

    ]
}



window.onload = (e) => {


    var backButton = document.getElementById("backButton")

    backButton.addEventListener("click", function () {

        window.location.href = "/";
    });

    // request
    // .get('/db/get/project/:HJ0DNjp1-')
    // .on('response', function(response) {
    // console.log(response.statusCode) // 200
    // //console.log(response.headers['content-type']) // 'image/png'
    // })
    // .pipe()

$.ajax({
        url: '/project/detail/HJ0DNjp1-',
        datatype: 'json',
        type: 'get',
        success: function (data) {
            console.log(data.result)
            projectData=data.result
            //console.log(projectData)
            


    var basicInfo = new Vue({
        el: '#basicInfo',
        data: projectData
    })


    var tagsSection = new Vue({
        el: '#tagsSection',
        data: projectData
    })

    var creditsSection = new Vue({
        el: '#creditsSection',
        data: projectData
    })

    var CustomDescriptionSection = new Vue({
        el: '#CustomDescriptionSection',
        data: projectData
    })

    var uploadInfoAndPhoto = new Vue({
        el: '#uploadInfoAndPhoto',
        data: projectData
    })



        }
    });

// $.get("/db/get/project/:HJ0DNjp1-", function(data){

//   alert("Data Loaded: " + data);
// });



}


