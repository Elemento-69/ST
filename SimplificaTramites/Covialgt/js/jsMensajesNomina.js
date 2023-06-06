var vToken;
var vUsuarioActual;
var proxyurl;
var baseHostURL;


$(document).ready(function () {
    loadDefaultComponents();
    fnConsultarToken();
})

function fnConsultarToken() {
    $.ajax({
        type: "POST",
        url: "../Mensajeria/MensajesNomina.aspx/fObtenerToken",
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
                    vRolUsuarioActual = registro.rol_usuario;
                    baseHostURL = registro.baseURL;                  
                    proxyurl = registro.proxyURL;
                    baseSitio = registro.baseSitio;
                });

                fnCargarAnios();
            }
        },
        failure: function (response) {
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}


function limpiarSelect(idSelect) {
    var select = document.getElementById(idSelect);
    while (select.length > 0) {
        select.remove(0);
    }
}

function fnCargarAnios() {
    const url = baseHostURL + "api/MensajesNomina/ListarAniosNominas";
    //alert(url);
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
                        fnCargarAnios();
                        clearInterval(interval)
                    }

                }, 1000);
            }
            else if (estadoRespuesta == 404) {
                $.LoadingOverlay("hide");
            }
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            var datos = data;
            limpiarSelect('cmbAnio');
            $("#cmbAnio").select2({ theme: "bootstrap" })
            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbAnio").append('<option value=' +
                        registro.AnioID + '>' +
                        registro.AnioID +
                        '</option>');
                })
                document.getElementById('cmbAnio').onchange = function () { fnCargarNominas(); };
                document.getElementById('cmbAnio').selectedIndex = 0;
                $('#cmbAnio').trigger('change');
            }

        })
        .catch(function (error) {
            Swal.fire("", error.message + " ", "success");
        });
}


function fnCargarNominas() {
    const url = baseHostURL + "api/MensajesNomina/ListarNominasXAnio/" + $("#cmbAnio").val();

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
                        fnCargarNominas();
                        clearInterval(interval)
                    }

                }, 1000);
            }
            else if (estadoRespuesta == 404) {
                $.LoadingOverlay("hide");
            }
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            var datos = data;
            limpiarSelect('cmbNomina');
            $("#cmbNomina").select2({ theme: "bootstrap" })
            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbNomina").append('<option value=' +
                        registro.NominaCorrel + '>' +
                        registro.Nomina +
                        '</option>');
                })
               
                document.getElementById('cmbNomina').onchange = function () { fnObtenerEstadoNomina(); fnCargarTablaPagos(); fnCargaTexto();};
                document.getElementById('cmbNomina').selectedIndex = 0;
                $('#cmbNomina').trigger('change');
            }

        })
        .catch(function (error) {
            Swal.fire("", error.message + " ", "success");
        });
}



function fnObtenerEstadoNomina() {
    let vNomina = $('#cmbNomina').val();
    if (vNomina.length > 0) {
        const url = baseHostURL + "api/MensajesNomina/ObtenerEstadoNomina/" + $("#cmbAnio").val() + "/" + $("#cmbNomina").val();

        //alert(url);

        $.LoadingOverlay("show");

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
                            fnObtenerEstadoNomina();
                            clearInterval(interval)
                        }
                    }, 1000);
                }
                else if (estadoRespuesta == 404) {
                    $.LoadingOverlay("hide");
                }
                else {
                    Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
                }
            })
            .then(data => {
                var estado = data;                
                if (estado) {
                    document.getElementById("btnEnviarCorreos").disabled = false;
                    document.getElementById("chkAprobarNomina").checked = estado;
                } else {
                    document.getElementById("btnEnviarCorreos").disabled = true;
                    document.getElementById("chkAprobarNomina").checked = estado;
                    Swal.fire("", "Nómina no aprobada. No se puede mandar aviso a contratistas.", "warning");                            
                }                    

                $.LoadingOverlay("hide");
            })
            .catch(function (error) {
                $.LoadingOverlay("hide");
                Swal.fire("", "Error en consulta de estado de nómina. " + error.message + "  ", "error");
            });
    } else {
        Swal.fire("", "Debe seleccionar una nómina ", "warning");
    }
}


function fnInicializaTablePagos() {
    $('#tablePagos').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin pagos para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ pagos",
            "infoEmpty": "Mostrando 0 de 0 de 0 pagos",
            "infoFiltered": "(Filtrado de _MAX_ total pagos)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ pagos",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontraron pagos",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnCargarTablaPagos() {
    let vNomina = $('#cmbNomina').val();
    if (vNomina.length > 0) {
        const url = baseHostURL + "api/MensajesNomina/ListarPagosXNomina/" + $("#cmbAnio").val() + "/" + $("#cmbNomina").val();
        //alert(url);

        $.LoadingOverlay("show");

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
                            fnCargarTablaPagos();
                            clearInterval(interval)
                        }
                    }, 1000);
                }
                else if (estadoRespuesta == 404) {
                    $.LoadingOverlay("hide");
                }
                else {
                    Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
                }
            })
            .then(data => {
                $('#tablePagos').dataTable().fnClearTable();
                $('#tablePagos').dataTable().fnDestroy();

                var datos = data;

                $("tbody").children().remove();

                if (datos) {
                    if (datos.length > 0) {
                        datos.forEach(function (registro) {
                            var tbody = '<tr class="tr_data" >' +
                                '<td class="spacer"></td>';
                            tbody += '<td>' + registro.AnioID + '</td>' +
                                '<td>' + registro.ProyectoCodigo + '</td>' +
                                '<td>' + registro.EstimacionCorr + '</td>' +                                
                                '<td class="frcurrency-mask min">' + registro.MontoFac + '</td>' +
                                '<td class="frcurrency-mask min">' + registro.Isr + '</td>' +
                                '<td class="frcurrency-mask min">' + registro.TotalRecibe + '</td>' +
                                '<td>' + registro.UsuarioID + '</td>' +
                                '<td class="spacer"></td>' +
                                '</tr>';

                            $('#tablePagos').append(tbody);
                        })
                        initMasks();                        
                    }
                }

                fnInicializaTablePagos();

                $.LoadingOverlay("hide");
            })
            .catch(function (error) {
                $.LoadingOverlay("hide");
                Swal.fire("", "Error en consulta de pagos. " + error.message + "  ", "error");
            });
    } else {
        Swal.fire("", "Debe especificar una nómina", "warning");
    }
}

function fnCargaTexto() {
    var mensaje = "NOTIFICACION: Señor Contratista, usted ha sido incluído en la Nómina No. " + $("#cmbNomina").val() + ", " +
            "recientemente aprobada por Comité, por favor sírvase presentar su factura, a la brevedad " +
            "posible, de la estimación incluída en nómina. El horario de recepción de facturas es de 9:00  a " +
            "15:00 hrs. (únicamente), a mas tardar el día ";
    $('#txtMensaje').val(mensaje);
}


function fnActualizarEstadoNomina() {
    var url = baseHostURL + "api/MensajesNomina/ActualizarEstadoNomina/";
    
    $.LoadingOverlay("show");

    var registro = {
        AnioID: $("#cmbAnio").val(),
        NominaCorrel: $("#cmbNomina").val(),
        Estado: $("#chkAprobarNomina").prop('checked'),
    };

    var dataJSONt = JSON.stringify(registro);

    fetch(proxyurl + url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: dataJSONt,
    })
        .then(response => {
            var estadoRespuesta = response.status;
            if (estadoRespuesta == 200) return response.json();
            else if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {
                    if (vToken !== '') {
                        fnActualizarEstadoNomina();
                        clearInterval(interval)
                    }
                }, 1000);
            }
            else if (estadoRespuesta == 404) {
                $.LoadingOverlay("hide");
            }
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            $.LoadingOverlay("hide");
            fnObtenerEstadoNomina();
            Swal.fire("", data, "success");
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
        });
}



function fnEnviarCorreos() {
    let vNomina = $('#cmbNomina').val();
    if (vNomina.length > 0) {
        const url = baseHostURL + "api/MensajesNomina/ListarPagosXNomina/" + $("#cmbAnio").val() + "/" + $("#cmbNomina").val();
        //alert(url);

        $.LoadingOverlay("show");

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
                            fnAgregarMensajeDe();
                            clearInterval(interval)
                        }
                    }, 1000);
                }
                else if (estadoRespuesta == 404) {
                    $.LoadingOverlay("hide");
                }
                else {
                    Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
                }
            })
            .then(data => {
                var datos = data;

                if (datos) {

                    var CuerpoMensaje = $('#txtMensaje').val() + " <a id='HyperLink1' href='http://www.covial.gob.gt:1090/sicop/Paginas/Procesos/Formularios/Reportes/VisorInformes.aspx?ReporteID=59&AnioIDNomina=" + $('#cmbAnio').val() + "&NominaCorrel=" + $('#cmbNomina').val() + "'>Click Para Ver Nomina " + $('#cmbNomina').val() + " </a>";

                    if (datos.length > 0) {
                        datos.forEach(function (registro) {
                            fnAgregarMensajeDe(registro.AnioID, registro.ProyectoCodigo, CuerpoMensaje);
                        })                        
                    }
                }

                $.LoadingOverlay("hide");
            })
            .catch(function (error) {
                $.LoadingOverlay("hide");
                Swal.fire("", "Error en consulta de pagos. " + error.message + "  ", "error");
            });
    } else {
        Swal.fire("", "Debe especificar una nómina", "warning");
    }
}



function fnAgregarMensajeDe(AnioID, ProyectoCodigo, CuerpoMensaje) {
    var url = baseHostURL + "api/MensajesNomina/AgregarMensajeDe/";

    var registro = {
        UsuarioID_From: "COVIAL",
        CuerpoMensaje: CuerpoMensaje,
        Estimacion: true,
        Otros: false,
        Titulo: "Estimacion en Nomina",
        MensajeDeID: 0,
    };

    var dataJSONt = JSON.stringify(registro);

    fetch(proxyurl + url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: dataJSONt,
    })
        .then(response => {
            var estadoRespuesta = response.status;
            if (estadoRespuesta == 200) return response.json();
            else if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {
                    if (vToken !== '') {
                        fnAgregarMensajeDe();
                        clearInterval(interval)
                    }
                }, 1000);
            }
            else if (estadoRespuesta == 404) {
                //$.LoadingOverlay("hide");
            }
            else {
                //Swal.fire("", "error: fnAgregarMensajeDe " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            var MensajeDeID = data;
            fnAgregarMensajePara(AnioID, ProyectoCodigo, MensajeDeID)
        })
        .catch(function (error) {
            //$.LoadingOverlay("hide");
        });
}


function fnAgregarMensajePara(AnioID, ProyectoCodigo, MensajeDeID) {
    var url = baseHostURL + "api/MensajesNomina/AgregarMensajePara/";

    var registro = {
        UsuarioID_To: AnioID + ProyectoCodigo,
        UserName: vUsuarioActual,
        MensajeDeID: MensajeDeID,
    };

    var dataJSONt = JSON.stringify(registro);

    fetch(proxyurl + url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: dataJSONt,
    })
        .then(response => {
            var estadoRespuesta = response.status;
            if (estadoRespuesta == 200) return response.json();
            else if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {
                    if (vToken !== '') {
                        fnAgregarMensajePara();
                        clearInterval(interval)
                    }
                }, 1000);
            }
            else if (estadoRespuesta == 404) {
             
            }
            else {
                //Swal.fire("", "error: fnAgregarMensajePara " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {

        })
        .catch(function (error) {
     
        });
}