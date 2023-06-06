var vToken;
var vUsuarioActual;
var proxyurl;
var baseHostURL;
var vIdReparoSiendoVisualizado = -1;

$(document).ready(function () {
    loadDefaultComponents();
    fnInicializaTableReparos();
    fnInicializaTableDetalleFaltas();
    fnConsultarToken();
   
})

function fnConsultarToken() {
    $.ajax({
        type: "POST",
        url: "../Estimaciones/frmReparosTecnicosVer.aspx/fObtenerToken",
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
                fnCargarTablaReparos()
            }
        },
        failure: function (response) {
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}


function fnInicializaTableReparos() {
    $('#tableReparos').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin reparos para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ reparos",
            "infoEmpty": "Mostrando 0 de 0 de 0 reparos",
            "infoFiltered": "(Filtrado de _MAX_ total reparos)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ reparos",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontraron reparos",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnCargarTablaReparos() {
    let vTerminoBusqueda = $('#txtTerminoBusqueda').val();
    if (vTerminoBusqueda.length == 0) { vTerminoBusqueda="-" }
    if (vTerminoBusqueda.length > 0) {

        var url = baseHostURL + "api/ReparoTecnico/BuscarReparosTecnicosLista/" + vTerminoBusqueda + "/" + vUsuarioActual;
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
                            fnCargarTablaReparos();
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
                $('#tableReparos').dataTable().fnClearTable();
                $('#tableReparos').dataTable().fnDestroy();

                var datos = data;

                $("tbody").children().remove();

                if (datos) {
                    if (datos.length > 0) {
                        datos.forEach(function (registro) {
                            var funcionLlamarVer = "mostrarModalDetalleReparo(" + registro.idEncabezadoReparo + "," +
                                "'" + registro.FechaReparo + "', '" + registro.ProyectoCodigoEstimacion + "'," + registro.AnioIdEstimacion + "," +
                                "" + registro.EstimacionCorrEstimacion + ")";

                            var fechaFormateada = "";
                            var fecha = registro.FechaReparo;
                            if (fecha) {
                                if (fecha.length >= 10) {
                                    fechaFormateada = fecha.substring(8, 10) + '/' + fecha.substring(5, 7) + '/' + fecha.substring(0, 4);
                                }
                            }

                            var tbody = '<tr class="tr_data" >' +
                                '<td class="spacer"></td>';
                            tbody += '<td style="width: 80px">' +
                                '          <a href="#fn" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"' +
                                '           data-content="Imprimir" data-placement="top" title="Generar reporte" onclick="generarReporte(' + registro.idEncabezadoReparo + ')">' +
                                '           <i class="fas fa-print fa-lg fa-fw"></i></a> ' +
                                '          <a href="#fn" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"' +
                                '           data-content="VerVentanaEdicion" data-placement="top" title="Ver detalle" onclick="' + funcionLlamarVer + '">' +
                                '           <i class="fas fa-search fa-lg fa-fw"></i></a> ' +
                                '</td>';
                            tbody += '<td>' + registro.idEncabezadoReparo + '</td>' +
                                '<td>' + fechaFormateada + '</td>' +
                                '<td>' + registro.ProyectoCodigoEstimacion + '</td>' +
                                '<td>' + registro.AnioIdEstimacion + '</td>' +
                                '<td>' + registro.EstimacionCorrEstimacion + '</td>' +
                                '<td class="spacer"></td>' +
                                '</tr>';

                            $('#tableReparos').append(tbody);
                        })
                    }
                }

                fnInicializaTableReparos();
                $.LoadingOverlay("hide");
            })
            .catch(function (error) {
                $.LoadingOverlay("hide");
                Swal.fire("", "Error en consulta de reparos técnicos. " + error.message + "  ", "error");
            });
    } else {
        Swal.fire("", "Debe especificar un término de búsqueda", "warning");
    }
}


function mostrarModalDetalleReparo(IdReparo, fecha, proyecto, anio, estimacion) {
    var fechaFormateada = "";
    if (fecha) {
        if (fecha.length >= 10) {
            fechaFormateada = fecha.substring(8, 10) + '/' + fecha.substring(5, 7) + '/' + fecha.substring(0, 4);
        }
    }
    vIdReparoSiendoVisualizado = IdReparo;
    document.getElementById('tituloModal').innerHTML = "Datos del reparo No.: " + IdReparo;
    document.getElementById('lblFecha').innerHTML = fechaFormateada;
    document.getElementById('lblAnio').innerHTML = anio;
    document.getElementById('lblProyecto').innerHTML = proyecto;
    document.getElementById('lblEstimacion').innerHTML = estimacion;
    fnCargarTablaDetalleFaltas(IdReparo);
    $('#modalVerReparo').show();
}

function fnInicializaTableDetalleFaltas() {
    $('#tableDetalleFaltas').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin faltas para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ faltas",
            "infoEmpty": "Mostrando 0 de 0 de 0 faltas",
            "infoFiltered": "(Filtrado de _MAX_ total faltas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ faltas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontraron faltas",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnCargarTablaDetalleFaltas(IdReparo) {
    var url = baseHostURL + "api/ReparoTecnico/ObtenerDetallesFalta/" + IdReparo;

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
                            fnCargarTablaDetalleFaltas();
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
                $('#tableDetalleFaltas').dataTable().fnClearTable();
                $('#tableDetalleFaltas').dataTable().fnDestroy();

                var datos = data;

                $("#bodyTableDetalleFaltas").children().remove();

                if (datos.length > 0) {
                    datos.forEach(function (registro) {
                        var tbody = '<tr class="tr_data" >' +
                            '<td class="spacer"></td>';
                        tbody += '<td>' + registro.ID + '</td>' +
                            '<td>' + registro.Falta + '</td>' +
                            '<td>' + registro.Observaciones + '</td>' +
                            '<td class="spacer"></td>' +
                            '</tr>';

                        $('#tableDetalleFaltas').append(tbody);
                    })
                    fnInicializaTableDetalleFaltas();
                    $.LoadingOverlay("hide");
                }
            })
            .catch(function (error) {
                $.LoadingOverlay("hide");
                Swal.fire("", "Error en consulta de detalle del reparo técnico. " + error.message + "  ", "success");
            });
}

function generarReporte(idEncabezado) {
    opendialog("/visorinformesSti.aspx?reporteID=97&Emcabezado=" + idEncabezado);
}

function opendialog(page) {
    var $dialog = $('#reportDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Reparo Técnico",
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

function generarReporteNuevaPestana() {
    var url = "../visorinformesSti.aspx?reporteID=97&Emcabezado=" + vIdReparoSiendoVisualizado;
    window.open(url, '_blank').focus();    
}