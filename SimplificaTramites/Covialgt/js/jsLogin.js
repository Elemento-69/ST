var vEncriptarDatos;
var Usuario;
var proxyurl;
var baseURL;
$(document).ready(function () {

    var vCredenciales = getParameterByName('LoginCredentials');
    if (vCredenciales !== '') fnValidarUsuario(vCredenciales);
    fnConsultarURLBase()
    $("#btnLogin").click(function () {
         Usuario = $('#inputEmail').val()
        var Password = $('#inputPassword').val()
       
        if ((Usuario == '') || (Password == ''))
            swal("", "Debe ingresar un usuario y contraseña", "error");

        else {

            
           
            var interval
            vEncriptarDatos = fnEncriptarDatos(Usuario + "," + Password);

            interval = setInterval(function () {

                if (vEncriptarDatos !== undefined) {
                    fnAutenticar(vEncriptarDatos);
                    clearInterval(interval)
                }

            }, 1000);

            
        }
        
    });
    $("#inputPassword").on("keypress", function (event) {
        var keycode = event.keyCode;

        if (keycode == '13') {
            Usuario = $('#inputEmail').val()
            var Password = $('#inputPassword').val()

            if ((Usuario == '') || (Password == ''))
                swal("", "Debe ingresar un usuario y contraseña", "error");

            else {



                var interval
                vEncriptarDatos = fnEncriptarDatos(Usuario + "," + Password);

                interval = setInterval(function () {

                    if (vEncriptarDatos !== undefined) {
                        fnAutenticar(vEncriptarDatos);
                        clearInterval(interval)
                    }

                }, 1000);


            }
        }
    });
})

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function fnAutenticar(vLogin) {
 
     
  
    const url = baseURL +  "api/login/authenticateweb"

    //const proxyurl = "";

    //const url = "http://localhost:62555/api/login/authenticateWeb"
    var dataJSON = JSON.stringify({
        Credenciales: vLogin
    });
    $.LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-spinner fa-spin"
    });

    fetch(proxyurl + url, {
        
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
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
                swal("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
    .then(data => {
        console.log(data);

     //   var datos = JSON.parse(data);

        if (data.length > 0) {
            $.LoadingOverlay("hide");
            fnGuardarDatosUsuario(data, vLogin);
        }


    })
    .catch(function (error) {
        $.LoadingOverlay("hide");
        swal("", error.message + " "  , "success");
       // console.log('Hubo un problema con la petición Fetch:' + error.message);
    });

}

function fnGuardarDatosUsuario(token, Encriptados) {
    var dataJSONt = JSON.stringify({
        pToken: token,
        pEncriptados: Encriptados,
        pUsuario: Usuario
    });
    $.ajax({
        type: "POST",
        url: "FrmLogin.aspx/fGuardarToken",
        data: dataJSONt,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            if (data) {

                window.location.href = "http://localhost:44390/fichaTecnica.aspx";
            }

        },
        failure: function (response) {
            swal("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}

//function fnValidarUsuario(pCredenciales) {
//    var dataJSONt = JSON.stringify({
//        vCredenciales: pCredenciales,
//    });
//    $.ajax({
//        type: "POST",
//        url: "FrmLogin.aspx/fObtenerDatosUsuario",
//        data: dataJSONt,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (data) {

//            var vRespuestaJSON = JSON.parse(data.d);
//            if (vRespuestaJSON.dioError == true) {
//                $.LoadingOverlay("hide");
//                swal("", vRespuestaJSON.descripcionMensaje, "error");
//            }
//            else {
//                fnAutenticar(vRespuestaJSON.datoDevueltoString.split(',')[0], vRespuestaJSON.datoDevueltoString.split(',')[1])
//            }

//        },
//        failure: function (response) {
//            swal("", jQuery.parseJSON(request.responseText).Message, "error");
//        }
//    });
//}
function fnConsultarURLBase() {
   
    $.ajax({
        type: "POST",
        url: "FrmLogin.aspx/fObtenerURL",
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
                 
                    proxyurl = registro.proxyURL;
                    baseURL = registro.baseURL;

                });
            }
        },
        failure: function (response) {
            swal("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}
function fnEncriptarDatos(vDatosEncriptar) {
    var dataJSONt = JSON.stringify({
        vDatosAEncriptar: vDatosEncriptar,
    });
    $.ajax({
        type: "POST",
        url: "FrmLogin.aspx/fEncriptarDatosUsuario",
        data: dataJSONt,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var vRespuestaJSON = JSON.parse(data.d);
            if (vRespuestaJSON.dioError == true) {
                $.LoadingOverlay("hide");
                swal("", vRespuestaJSON.descripcionMensaje, "error");
                
            }
            else {
                //  fnAutenticar(vRespuestaJSON.datoDevueltoString.split(',')[0], vRespuestaJSON.datoDevueltoString.split(',')[1])
                vEncriptarDatos= vRespuestaJSON.datoDevueltoString
            }

        },
        failure: function (response) {
            swal("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}
