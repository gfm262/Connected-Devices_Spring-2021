// //Submit JavaScript AND PhP: https://html.form.guide/web-form/submit-form-multiple-scripts/
// function visit() {
//   console.log('visit run')
//
//     if (document.QRform.reason.value == "empty"){
//       console.log("EMPTY - NEED ERROR MESSAGE")
//       } else if (document.QRform.reason.value == "appt"){
//         console.log("appt")
//       } else if (document.QRform.reason.value == "walkin"){
//         console.log("walkin")
//       } else if (document.QRform.reason.value == "dock"){
//         console.log("dock")
//       } else if (document.QRform.reason.value == "sales"){
//         console.log("sales")
//       }
//       return false;
//
//   }
//
// }

window.onload = function(){
    location.href=document.getElementById("selectbox").value;
}
  //  document.forms['QRform'].method='post';
  //  document.forms['QRform'].target = '_self'
    //document.forms['QRform'].action='form-email-redirect.php';
    var $form = $('form#test-form'),
        url = 'https://script.google.com/macros/s/AKfycbxO2xntH_cMPgfu4xg-4RrN3m2DnFdw2FbrnJO7gjlnDdUi-HsdgziUnfxRNZfLI-ZCVA/exec'

    $('#submit-form').on('click', function(e) {
      e.preventDefault();
      var jqxhr = $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        data: $form.serializeObject()
      }).success(
        // do something
      );
    })
