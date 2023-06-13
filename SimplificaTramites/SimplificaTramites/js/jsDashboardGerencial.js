var vToken;
var vUsuarioActual;
var proxyurl;
var baseURL = '';

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
        url: "DashboardGerencial.aspx/fObtenerToken",
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
                vRespuestaJSON.tablaDevuelta.forEach(function (registro) {
                    vToken = registro.token;
                    vUsuarioActual = registro.usuario;
                    proxyurl = registro.proxyURL;
                    baseURL = registro.baseURL;
                    $.LoadingOverlay("hide");
                });
               
            }
        },
        failure: function (response) {
            swal("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}

function fnRefrescarToken(vTokenVencido) {
    const url = baseURL + "api/login/refreshtoken"
    var dataJSON = JSON.stringify({
        TokenVencido: vTokenVencido
    });
    vToken = '';
    fetch(proxyurl + url, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: dataJSON
    }).then(response => {
        var estadoRespuesta = response.status;

        if (estadoRespuesta == 200) return response.json();

        if (estadoRespuesta == 404) {
            $.LoadingOverlay("hide");
        }
        else {
            swal("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
        }
    }).then(data => {
        var datos = data;

        if (datos.length > 0) {
            fnActualizarToken(datos);

            $.LoadingOverlay("hide");
        }
    }).catch(function (error) {
        $.LoadingOverlay("hide");
        swal("", error.message + " " + vUsuario, "success");
    });
}

function fnActualizarToken(token) {
    var dataJSONt = JSON.stringify({
        pToken: token
    });
    $.ajax({
        type: "POST",
        url: "DashboardGerencial.aspx/fActualizarToken",
        data: dataJSONt,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data) {
                vToken = token
                return true
            }
        },
        failure: function (response) {
            swal("", jQuery.parseJSON(request.responseText).Message, "error");
            return false
        }
    });
}


