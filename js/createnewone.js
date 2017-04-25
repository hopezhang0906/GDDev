require('../css/createnewone.less')

var typeChoosed
var isFirstimeChooseType

$('.datepicker').datepicker({
    format: 'mm/dd/yyyy',
    startDate: '-3d',
});



// function changeSelectType(t){

//     if(document.getElementById('typeSelected'))
//     {
//         let type=document.getElementById('typeSelected')
//         type.id='typeUnselected'
//         //a.style.borderBottom='0px solid #FF4081'
//         type.innerHTML='radio_button_unchecked'
//         isFirstimeChooseType=false
        
//     }
//     else{
//         isFirstimeChooseType=true
//     }



//     t.id='typeSelected'
//     //t.style.borderBottom='2px solid #FF4081'
//      //t.nextSibling.innerHTML()='done';
//     t.innerHTML='radio_button_checked'

//     var obj=document.getElementById('typeSelected')
//     typeChoosed=obj.parentElement.id;
//     console.log(typeChoosed)
//     console.log(isFirstimeChooseType)



// }


function changeForms(){

    if(isFirstimeChooseType){
          tab=document.getElementById('tab2')
          tab.style.display='block'
          tab.href='#fixed-'+typeChoosed
          console.log('firstTIME'+tab.href)

    }
    else{
          tab=document.getElementById('tab2')
          tab.style.display='block'
          tab.href='#fixed-'+typeChoosed
          console.log(tab.href)

    }
}

