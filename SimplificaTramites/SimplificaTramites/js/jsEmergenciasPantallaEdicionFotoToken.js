function fnConsultarToken() {

    $.LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-spinner fa-spin"
    });

    $.ajax({
        type: "POST",
        url: "frmEmergenciasEdicionFoto.aspx/fObtenerToken",
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var vRespuestaJSON = JSON.parse(data.d);
            if (vRespuestaJSON.dioError == true) {
                $.LoadingOverlay("hide");
                Swal.fire("", vRespuestaJSON.descripcionMensaje, "error");
            }
            else {
                vRespuestaJSON.tablaDevuelta.forEach(function (registro) {
                    vToken = registro.token;
                    vUsuarioActual = registro.usuario;
                    proxyurl = registro.proxyURL;
                    baseHostURL = registro.baseURL;
                });

               // baseHostURL = "http://localhost:62555/";
                fnMostrarRegistro();
            }

        },
        failure: function (response) {
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
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

    })
        .then(response => {
            var estadoRespuesta = response.status;

            if (estadoRespuesta == 200) return response.json();

            if (estadoRespuesta == 404) {
                $.LoadingOverlay("hide");
            }
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            var datos = data;

            if (datos.length > 0) {
                fnActualizarToken(datos);
                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " " + vUsuario, "success");
        });
}

function fnActualizarToken(token) {
    var dataJSONt = JSON.stringify({
        pToken: token
    });
    $.ajax({
        type: "POST",
        url: "frmEmergenciasEdicionFoto.aspx/fActualizarToken",
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
            return false
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}