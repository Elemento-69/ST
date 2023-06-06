$(document).ready(function () {
    $("#aCerrarSesion").click(function () {

   alert("bye bye!!")
    }) 
})
function fnCerrarSesion() {
   
    $.ajax({
        type: "POST",
        url: "FrmLogin.aspx/fCerrarSesion",
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            if (data) {

                window.location.href = "frmLogin.aspx";
            }

        },
        failure: function (response) {
            swal("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}