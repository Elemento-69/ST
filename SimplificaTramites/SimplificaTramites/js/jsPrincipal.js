var vToken;

$(document).ready(function () {
    fnConsultarToken();
})

function fnConsultarToken() {
    $.LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-spinner fa-spin"
    });
    $.ajax({
        type: "POST",
        url: "frmPrincipal.aspx/fObtenerToken",
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var vRespuestaJSON = JSON.parse(data.d);
            if (vRespuestaJSON.dioError == true) {
                $.LoadingOverlay("hide");
                swal("", vRespuestaJSON.descripcionMensaje, "error");
            }
            else {
                vToken = vRespuestaJSON.datoDevueltoString;
                $.LoadingOverlay("hide");
               // fnCargarPlanAnual();
            }

        },
        failure: function (response) {
            swal("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}
/*
function fnCargarPlanAnual () {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    
    const url = "http://covialgt.com/api_rest_covial/Api/plananual/get "
    fetch(proxyurl + url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          
        },
             
    })
        .then(data => data.text())
        .then(data => {
       


            var datos = JSON.parse(data);
            limpiarSelect('cmbPlanAnual');
            if (datos.length > 0) {


                datos.forEach(function (registro) {
                    $("#cmbPlanAnual").append('<option value=' +
                        registro.AnioID + '>' +
                        registro.PlanAnualNombre +
                        '</option>');

                })
                $.LoadingOverlay("hide");
              
            }


        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            swal("", error.message + " success");
            // console.log('Hubo un problema con la petición Fetch:' + error.message);
        });
}

function limpiarSelect(idSelect) {
    var select = document.getElementById(idSelect);
    while (select.length > 1) {
        select.remove(1);
    }
}
*/