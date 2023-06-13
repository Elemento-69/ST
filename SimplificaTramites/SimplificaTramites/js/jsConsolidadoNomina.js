var vToken;
var vRol;
var baseURL = '';
var proxyurl;
var vUsuarioActual;
var QueryString, url;

$.LoadingOverlaySetup({
    image: "",
    fontawesome: "fas fa-spinner fa-spin"
})

$(document).ready(function () {
    $("select").select2({ theme: "bootstrap" })
    fnConsultarToken();

    $("#btnGenerarReporte").click(function () {
        var vAnioID = $('#cmbPlanes').val();
        if ($('#r1').is(':checked')) {
            //QueryString = '?IdReporte=67&Parameters=' + vAnioID;
            //url = "../VisorInformes.aspx" + QueryString;         
            opendialog("/VisorInformes.aspx?IdReporte=67&Parameters=" + vAnioID, 'Informe Resumen de Nómina');
        }
        else {
            QueryString = '?IdReporte=68&Parameters=' + vAnioID;
            url = "../VisorInformes.aspx" + QueryString;   
            opendialog("/VisorInformes.aspx?IdReporte=68&Parameters=" + vAnioID, 'Informe Detalle de Nómina');
        }
        //window.open(url, '_blank', 'location=no,height=560,width=887,status=yes,titlebar=yes,scrollbars=yes'); 
        
    })
})

function opendialog(page, vtitle) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: vtitle,
            autoOpen: false,
            dialogClass: 'dialog_fixed,ui-widget-header',
            modal: true,
            height: 500,
            minWidth: $(window).width() * .70,
            minHeight: $(window).height() * .55,
            draggable: true
        });
    $dialog.dialog('open');
}

function fnConsultarToken() {
    $.LoadingOverlay("show");
    const createPromise = () =>
        $.ajax({
            type: "POST",
            url: "../Nominas/frmConsolidadoNomina.aspx/fObtenerToken",
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
                        baseURL = registro.baseURL;
                        proxyurl = registro.proxyURL;
                        vRol = registro.rol;
                    });
                }
            },
            failure: function (response) {
                Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
            }
        });


    var promises = [createPromise()];

    Promise.all(promises)
        .then(responses => {
            fnObtenerPlanesAnuales();
            $.LoadingOverlay("hide");
        });
}

function limpiarSelect(idSelect) {
    document.getElementById(idSelect).options.length = 0;
};


function fnObtenerPlanesAnuales() {
    const url = baseURL + "api/NominasPago/GetPlanesAnualesConsolidadoNomina";
    fetch(proxyurl + url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            var estadoRespuesta = response.status;
            if (estadoRespuesta == 200) return response.json();
            else if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {
                    if (vToken !== '') {
                        clearInterval(interval);
                    }
                }, 1000);
            }
            else {
                Swal.fire({
                    title: "error: " + estadoRespuesta,
                    confirmButtonText: 'OK',
                    icon: 'error',
                    text: response.statusText
                })
            }
        })

        .then(data => {
            vAnios = data;
            limpiarSelect('cmbPlanes');
            if (vAnios !== undefined) {
                if (vAnios.length > 0) {

                    vAnios.forEach(function (registro) {
                        $("#cmbPlanes").append('<option value=' +
                            registro.AnioID + '>' +
                            registro.PlanAnualNombre + '</option>');
                    });
                    document.getElementById("cmbPlanes").selectedIndex = -1;
                }
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire({
                title: "",
                confirmButtonText: 'OK',
                icon: 'error',
                text: error.message
            })
        });
}