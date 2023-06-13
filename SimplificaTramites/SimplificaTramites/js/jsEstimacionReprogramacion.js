var vToken;
var vRol;
var baseURL = '';
var proxyurl;
var vUsuarioActual;
var vCDPNegativo = false;
var vCDPColor = '#434343';
var vTotalCDP = 0.00, vTotalAspiracionPago = 0.00, vTotalMontoContraactual = 0.00;
//var vIdAnio = 2020;
//var vIdProyectoSupervisor = 'S-008';
var vIdAnio;
var vIdProyectoSupervisor;
var divReprogramacion, divDisponibilidad;
var vValidacionCDP = false;
var vImgLoading = '../Images/Icons/Comp-1.gif';
var vSaldoActual = 0;
let rolC = rolConsultas;
var vEstadoDocCambioAprobado = false;

$.LoadingOverlaySetup({
    image: "",
    fontawesome: "fas fa-spinner fa-spin"
})

$(document).ready(function () {

    // Variable para verificar si la tabla está llena
    var tablaLlena = false;

    // Función para vaciar la tabla
    function vaciarTabla() {
        if ($("#tableEjecucionTramos").is(":visible")) {
            //fnInicializaTableEjecucionTramos();
           // fnObtieneUltimaFechaEstimacion();
            $('#div_fechas').hide();
            $('#lblMontoContraactual').val('');
            $('#lblCDPDisponible').val('');
            $('#lblAspiracionPago').val('');
            $("#alerIcon").hide();
            $('#btnReprogramar').hide();
            $('#btnGuardar').hide();
            $('#lbCDPDisponible').hide();
            $('#lbCDPNoDisponible').hide();
            $('#tableEjecucionTramos').dataTable().fnClearTable();
            $('#tableEstimaciones').dataTable().fnClearTable();
        }
    }


    // Controlador de eventos para el evento draw.dt de la tabla
    $('#tableEjecucionTramos').on('draw.dt', function () {
        console.log('La tabla se ha dibujado completamente.');

        // Controlador de eventos para el evento input del elemento desdeinput
        $('#desde, #hasta').on("blur", function () {
            console.log("El valor del input ha cambiado");
            if ($('#tableEjecucionTramos').DataTable().rows().count() > 0) {
                tablaLlena = true;
                console.log('La tabla está llena');
            } else {
                tablaLlena = false;
                console.log('La tabla está vacía');
            }
            // Si la tabla está llena, vaciarla
            if (tablaLlena) {
                vaciarTabla();
            }
        });

        // Controlador de eventos para el evento change de los selects
        $('#cmbAnio, #cmbProyecto').on("change", function () {
            console.log("El valor del select ha cambiado");
            if ($('#tableEjecucionTramos').DataTable().rows().count() > 0) {
                tablaLlena = true;
                console.log('La tabla está llena');
            } else {
                tablaLlena = false;
                console.log('La tabla está vacía');
            }
            // Si la tabla está llena, vaciarla
            if (tablaLlena) {
                vaciarTabla();
            }
        });
    });
    

    $('#desde_hide').hide();
    $('#div_fechas').hide();
    $("select").select2({ theme: "bootstrap" })
    fnConsultarToken();

    //divReprogramacion = document.getElementById("divCDPReprogramado");
    //divDisponibilidad = document.getElementById("divCDPDisponible");
    //divReprogramacion.style.display = "none";
    //divDisponibilidad.style.display = "none";
    $("#btnGenerarEstimacion").click(function () {
        fnObtenerAspiracionPago();
    })

    $("#btnLimpiar").click(function () {
        fnLimpiar();
    })

    $("#btnGuardar").click(function () {
        fnInsertaEstimacion();
    })

    $("#btnInicializaSaldos").click(function () {
        vIdProyectoS = $('#cmbProyecto').val();
        vIdAnioS = $('#cmbAnio').val();
        if ((vIdProyectoS == null) || (vIdAnioS == null)) {
            Swal.fire("", "Debe seleccionar plan anual y proyecto", "warning");
        } else {
            fnInicializaSaldos();
        }

    })

    $('#alerIcon').hide();
    $('#btnReprogramar').hide();
    $('#btnGuardar').hide();
    $('#lbCDPDisponible').hide();
    $('#lbCDPNoDisponible').hide();

    $('#cmbAnio').change(function () {
        var AnioID = this.value;
        //alert(AnioID);
        fnObtenerProyectosSupervisionAnio(AnioID);

    })

    $('#cmbProyecto').change(function () {
        $('#lbltitulo').text("Crear una Nueva Estimación - Proyecto: " + this.value);
    })

    $("#desde-dp").datetimepicker({
        format: "DD/MM/YYYY"
    })

    $('#hasta-dp').datetimepicker({
        format: "DD/MM/YYYY",
        useCurrent: false
    });

})



//$("#hasta").on("change.datetimepicker", function (e) {
//    if (e.date) {
//        $("#hastaEjecutado-label").html(e.date.format("DD/MM/YYYY"))
//    }
//});

function limpiarSelect(idSelect) {
    document.getElementById(idSelect).options.length = 0;
};


const formatToCurrency = amount => {
    return "Q." + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

function fnInicializaTableEstimaciones() {
    $('#tableEstimaciones').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        //scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin Estimaciones para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Estimaciones",
            "infoEmpty": "Mostrando 0 de 0 de 0 Estimaciones",
            "infoFiltered": "(Filtrado de _MAX_ total Estimaciones)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Estimaciones",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay Estimaciones encontradas",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnInicializaTableTramosReprogramados() {
    $('#tableTramosReprogramados').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        //scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin tramos para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Tramos",
            "infoEmpty": "Mostrando 0 de 0 de 0 Tramos",
            "infoFiltered": "(Filtrado de _MAX_ total Tramos)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Tramos",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay tramos encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnInicializaTableEjecucionTramos() {
    // $('#tableEjecucionTramos').dataTable().fnClearTable();
    $('#tableEjecucionTramos').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        //scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin Tramos para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Tramos",
            "infoEmpty": "Mostrando 0 de 0 de 0 Tramos",
            "infoFiltered": "(Filtrado de _MAX_ total Tramos)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Tramos",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay Tramos encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnLimpiar() {

    fnInicializaTableEjecucionTramos();
    //fnObtieneUltimaFechaEstimacion();
    $('#tableEjecucionTramos').dataTable().fnClearTable();
    $('#tableEstimaciones').dataTable().fnClearTable();
    $('#cmbProyecto').val('');
    $('#cmbAnio').val('');
    $('#desde_hide').val('');
    $('#div_fechas').hide();
    $('#desde').val('');
    $('#hasta').val('');
    $('#txtObservaciones').val('');
    $('#lblMontoContraactual').val('');
    $('#lblCDPDisponible').val('');
    $('#lblAspiracionPago').val('');
    $("#alerIcon").hide();
    $('#btnReprogramar').hide();
    $('#btnGuardar').hide();
    $('#lbCDPDisponible').hide();
    $('#lbCDPNoDisponible').hide();
    //divReprogramacion = document.getElementById("divCDPReprogramado");
    //divDisponibilidad = document.getElementById("divCDPDisponible");
    //divReprogramacion.style.display = "none";
    //divDisponibilidad.style.display = "none";
}

function getSubstrings(vTexto, vInicio, vFin) {
    return vTexto.substring(vInicio, vFin);
}

function fnConsultarToken() {
    $.LoadingOverlay("show");
    const createPromise = () =>
        $.ajax({
            type: "POST",
            url: "../Estimaciones/frmEstimacionReprogramaciones.aspx/fObtenerToken",
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
                        fObtenerDatosUsuarioSupervisor(vUsuarioActual, vRol);


                        //alert(vIdProyectoSupervisor + '---' + vIdAnio);
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

            fnObtenerPlanAnual();
            if ((rolC == "ADMINISTRADOR") || (rolC == "ADMINSTRADORES")) {
                $('#filaAdministrador').show();
            }
            else {
                $('#filaAdministrador').hide();
            }

            if ((rolC == "ADMINISTRADOR") || (rolC == "ENCARGADOPRESUPUESTO")) {
                $('#btnInicializaSaldos').show();
            }
            else {
                $('#btnInicializaSaldos').hide();
                fnObtenerSaldoActual();
                fnObtieneUltimaFechaEstimacion();
                fnObtenerEstimaciones();
                fnObtieneValidacionCDP();
                fnInicializaTableEjecucionTramos();

                fnObtenerEstadoDocsCambio();
                fnConsultarSaldos();
            }




            $.LoadingOverlay("hide");
        });
}

function fnObtenerEstadoDocsCambio() {

    const url = baseURL + "Api/EstimacionSupervisor/ObtenerEstadosDocsCambioAprobados/" + vIdAnio + '/' + vIdProyectoSupervisor;
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
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            vConsulta = data;
            if (vConsulta !== undefined) {
                if (vConsulta.length > 0) {
                    vConsulta.forEach(function (registro) {
                        vEstadoDocCambioAprobado = registro.DocAprobado;
                    });
                }
            }
        })
        .catch(function (error) {
            Swal.fire("", error.message + " ", "error");
        });
}



function fObtenerDatosUsuarioSupervisor(vUsuario) {

    vIdProyectoSupervisor = vUsuario.substr(4, vUsuario.length);
    vIdAnio = vUsuario.substr(0, 4);



    $('#lbltitulo').text("Crear una Nueva Estimación - Proyecto: " + vIdProyectoSupervisor);
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
        url: "../Estimaciones/frmEstimacionReprogramaciones.aspx/fActualizarToken",
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

function fnValidarFormatoFecha(campo) {
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((campo.match(RegExPattern)) && (campo != '')) {
        return true;
    } else {
        return false;
    }
}

function fnObtenerAspiracionPago() {
    vCDPSaldo = 0;
    vTotalCDP = 0;
    vTotalAspiracionPago = 0;
    vTotalMontoContraactual = 0;
    fnObtenerSaldoActual();

    vFechaDesde = $('#desde').val();
    vFechaHasta = $('#hasta').val();
    if ((fnValidarFormatoFecha(vFechaDesde)) && (fnValidarFormatoFecha(vFechaHasta))) {
        if ((vFechaDesde != '') && (vFechaHasta != '')) {
            $.LoadingOverlay("show");
            var thead = '', tbody = '', tfoot = '';
            var vFechaDesde = getSubstrings(vFechaDesde, 6, 10) + "-" + getSubstrings(vFechaDesde, 3, 5) + "-" + getSubstrings(vFechaDesde, 0, 2);
            var vFechaHasta = getSubstrings(vFechaHasta, 6, 10) + "-" + getSubstrings(vFechaHasta, 3, 5) + "-" + getSubstrings(vFechaHasta, 0, 2);


            if ((rolC == "ADMINISTRADORES") || (rolC == "ADMINISTRADOR")) {
                vIdProyectoSupervisor = $('#cmbProyecto').val();
                vIdAnio = $('#cmbAnio').val();
            };




            const url = baseURL + "Api/EstimacionSupervisor/GetAspiracionPago/" + vIdAnio + '/' + vIdProyectoSupervisor + '/' + vFechaDesde + '/' + vFechaHasta;

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
                        Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
                    }
                })
                .then(data => {
                    $('#tableEjecucionTramos').dataTable().fnClearTable();
                    $('#tableEjecucionTramos').dataTable().fnDestroy();
                    vRenglones = data;
                    if (vRenglones !== undefined) {
                        if (vRenglones.length > 0) {
                            vRenglones.forEach(function (registro) {
                                var vCDPSaldo = registro.MontoCDPTramo - registro.AspiracionPago;
                                vTotalCDP += registro.MontoCDPTramo;
                                vTotalAspiracionPago += registro.AspiracionPago;
                                vTotalMontoContraactual += vCDPSaldo;
                                if (vCDPSaldo < 0) {
                                    vCDPNegativo = true;
                                    vCDPColor = '#EB5757';
                                }
                                else {
                                    vCDPColor = '#333333';
                                }

                                var thead = '', tbody = '';
                                tbody += '<tr>' +
                                    '<td class="spacer" ></td > ' +
                                    '<td style="width:70px">' + registro.ProyectoCodigo + '</td>' +
                                    '<td style="width:450px">' + registro.TramoDesc + '</td>' +
                                    '<td style="width: 160px; text-align: left">' + registro.RutaCode + '</td>' +
                                    '<td style="text-align: right">' + formatToCurrency(registro.AspiracionPago) + '</td>' +
                                    '<td style="text-align: right">' + formatToCurrency(registro.MontoCDPTramo) + '</td>' +
                                    '<td style="text-align: right; color:' + vCDPColor + '">' + formatToCurrency(vCDPSaldo) + '</td>' +
                                    '<td class="spacer"></td>' +
                                    '</tr>';
                                $('#tableEjecucionTramos').append(tbody);
                            });
                            fnInicializaTableEjecucionTramos();
                            $('#btnGuardar').show();
                            //







                            //console.info(vValidacionCDP);

                            $.LoadingOverlay("hide");
                        }
                        else {
                            Swal.fire("", "No existe ejecución en el período", "warning");
                            $('#lblMontoContraactual').val(formatToCurrency(0));
                            $('#lblCDPDisponible').val(formatToCurrency(0));
                            $('#lblAspiracionPago').val(formatToCurrency(0));
                            $.LoadingOverlay("hide");
                            fnInicializaTableEjecucionTramos();
                        }
                    }
                    else {
                        $.LoadingOverlay("hide");
                        fnInicializaTableEjecucionTramos();
                        //swal("Aviso", " No existen tramos", "info");
                    }
                    //Obtiene el Saldo Actual Disponible

                    //vSaldoActual = -100;
                    //Si existe saldo disponible se oculta el boton de Reprogramar, caso contrario se muestra
                    if (vSaldoActual != 0) {
                        //$('#btnReprogramar').show();
                        $('#alerIcon').show();
                        $('#lbCDPNoDisponible').show();
                        $('#btnGuardar').hide();
                        //Si tiene todos los documentos de cambio aprobados muestra el botón de reprogramar, de lo contrario no
                        if (!vEstadoDocCambioAprobado) {
                            Swal.fire("", "Para crear una reprogramación debe de tener todos los documentos de cambio aprobados", "warning");
                            $('#btnReprogramar').hide();
                        }

                    }
                    else {
                        $('#btnReprogramar').hide();
                        $('#alerIcon').hide();
                        $('#lbCDPNoDisponible').hide();
                    }
                    //////////////////////////////////////////


                    $('#lblMontoContraactual').val(formatToCurrency(vTotalMontoContraactual));
                    $('#lblCDPDisponible').val(formatToCurrency(vTotalCDP));
                    $('#lblAspiracionPago').val(formatToCurrency(vTotalAspiracionPago));
                    //divReprogramacion.style.display = "block";
                    //divDisponibilidad.style.display = "none";
                    if ((vValidacionCDP) && (!vCDPNegativo)) {  // 1 0       

                        $('#btnReprogramar').prop('disabled', false);
                        $('#btnGuardar').prop('disabled', false);
                    }
                    else if ((vValidacionCDP) && (vCDPNegativo)) { // 1 1
                        $('#btnReprogramar').prop('disabled', false);
                        $('#btnGuardar').prop('disabled', true);
                    }
                    else if ((!vValidacionCDP) && (vCDPNegativo)) {  //0 1
                        $('#btnReprogramar').prop('disabled', false);
                        $('#btnGuardar').prop('disabled', false);
                    }
                    else if ((!vValidacionCDP) && (!vCDPNegativo)) {   //0 0              
                        $('#btnReprogramar').prop('disabled', false);
                        $('#btnGuardar').prop('disabled', false);
                    }


                })
                .catch(function (error) {
                    $.LoadingOverlay("hide");
                    Swal.fire("", error.message + " ", "error");
                });

            $('#btnReprogramar').show();

        }
        else Swal.fire("", "Debe seleccionar una fecha", "warning");
    }
    else {
        Swal.fire("", "Debe ingresar una fecha válida", "warning");
    }
}

function fnObtenerEstimaciones() {

    $.LoadingOverlay("show");
    var thead = '', tbody = '', tfoot = '';

    const url = baseURL + "Api/EstimacionSupervisor/GetEstimaciones/" + vIdAnio + '/' + vIdProyectoSupervisor;

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
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            $('#tableEstimaciones').dataTable().fnClearTable();
            $('#tableEstimaciones').dataTable().fnDestroy();
            vEstimaciones = data;
            if (vEstimaciones !== undefined) {
                if (vEstimaciones.length > 0) {
                    vEstimaciones.forEach(function (registro) {
                        var thead = '', tbody = '';
                        var vEstadoEstimacion = registro.IdEstadoEstimacion;
                        var vTieneReprogramacion = registro.TieneReprogramaciones;
                        var vBtnEliminarEstimacion = '';
                        var vBtnVerReprogramaciones = '';
                        if (vEstadoEstimacion === 1) { //Estado no Presentado
                            vBtnEliminarEstimacion = '<a href="#fn" class="action-icon hover-red" data - toggle="popover" data - trigger="hover"' +
                                '  data-content="Eliminar" data-placement="top" title = "Eliminar estimación" onclick="fnEliminarEstimacion(' + registro.EstimacionCorr + ',' + registro.IdEstadoEstimacion + ')" >' +
                                '  <i class="fas fa-trash fa-lg fa-fw"></i></a>';
                        };
                        if (vTieneReprogramacion) {
                            vBtnVerReprogramaciones = '<a href="#fn" class="action-icon hover-purple" data-toggle="popover" data-trigger="hover"' +
                                '  data-content="VerReprogramación" data-placement="top" title="Ver reprogramación de renglones" onclick="fnVerReprogramacion(' + registro.id + ',' + registro.EstimacionCorr + ')">' +
                                '  <i class="fas fa-retweet fa-lg fa-fw"></i></a>';
                        };
                        tbody += '<tr>' +
                            '<td class="spacer" ></td > ' +
                            '<td style="width: 150px">' +
                            '  <a href="#fn" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"' +
                            '    data-content="Imprimir" data-placement="top" title="Imprimir estimación" onclick="fnImprimirEstimacion(' + registro.EstimacionCorr + ')">' +
                            '    <i class="fas fa-print fa-lg fa-fw"></i></a> ' +
                            vBtnEliminarEstimacion +
                            '<td style="width: 150px">' + registro.Periodo + '</td>' +
                            '<td style="width: 120px;text-align: right">' + formatToCurrency(registro.MontoaRecibir) + '</td>' +
                            '<td style="width: 120px;text-align: right">' + formatToCurrency(registro.MontoPagado) + '</td>' +
                            '<td style="width: 120px;text-align: right">' + formatToCurrency(registro.MontoPendientePago) + '</td>' +
                            '<td style="width: 200px;text-align: left">' + registro.Observaciones + '</td>' +
                            '<td style="display:none;">' +
                            '    <div class="custom-control custom-checkbox" >' +
                            '        <input type="checkbox"' + (registro.Certificada === true ? "checked" : "") + ' id="checkCertificada" class="custom-control-input" disabled>' +
                            '       <label class="custom-control-label" for="checkCertificada"></label>' +
                            '    </div>' +
                            '</td >' +
                            '<td style="width:200px;text-align: left";>' + registro.Estado + '</td>' +
                            '<td class="spacer"></td>' +
                            '</tr>';
                        $('#tableEstimaciones').append(tbody);

                    });
                    fnInicializaTableEstimaciones();
                    $.LoadingOverlay("hide");
                }
                else {
                    $.LoadingOverlay("hide");
                    fnInicializaTableEstimaciones();
                    //$('#tableEstimaciones').dataTable().fnClearTable();
                    //$('#tableEstimaciones').dataTable().fnDestroy();
                }
            }
            else {
                fnInicializaTableEstimaciones();
                //$('#tableEstimaciones').dataTable().fnClearTable();
                //$('#tableEstimaciones').dataTable().fnDestroy();
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");
        });




}

function fnInsertaEstimacion() {
    //swal({
    //    title: "",
    //    text: "¿Desea guardar la estimación?",
    //    icon: "warning",
    //    buttons: {
    //        cancel: "No",
    //        catch: {
    //            text: "Si",
    //            value: "Si",
    //        },
    //    },
    //    dangerMode: true,
    //})
    Swal.fire({
        title: "",
        text: "¿Desea guardar la estimación?",
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    })
        .then((result) => {
            if (result.isConfirmed) {
                //switch (value) {
                //    case "Si":
                var vFechaDesde = $('#desde').val();
                var vFechaHasta = $('#hasta').val();
                if ((fnValidarFormatoFecha(vFechaDesde)) && (fnValidarFormatoFecha(vFechaHasta))) {
                    if ((vFechaDesde != '') && (vFechaHasta != '')) {
                        $.LoadingOverlay("show");
                        var vObservaciones = $("#txtObservaciones").val();
                        var vFechaDesde = getSubstrings(vFechaDesde, 6, 10) + "-" + getSubstrings(vFechaDesde, 3, 5) + "-" + getSubstrings(vFechaDesde, 0, 2);
                        var vFechaHasta = getSubstrings(vFechaHasta, 6, 10) + "-" + getSubstrings(vFechaHasta, 3, 5) + "-" + getSubstrings(vFechaHasta, 0, 2);
                        const url = baseURL + "Api/EstimacionSupervisor/InsertaEstimacion";

                        var dataJSON = JSON.stringify({
                            AnioId: vIdAnio,
                            ProyectoCodigoSupervisor: vIdProyectoSupervisor,
                            PeriodoDesde: vFechaDesde,
                            PeriodoHasta: vFechaHasta,
                            Observaciones: vObservaciones,
                            Usuario: vUsuarioActual
                        });

                        fetch(proxyurl + url, {
                            method: 'POST',
                            headers: {
                                'Authorization': 'Bearer ' + vToken,
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: dataJSON
                        })
                            .then(response => {
                                var estadoRespuesta = response.status;

                                if (estadoRespuesta == 200) {
                                    return response.json();
                                }
                                else if (estadoRespuesta == 401) {
                                    fnRefrescarToken(vToken);
                                    var interval = setInterval(function () {
                                        if (vToken !== '') {
                                            clearInterval(interval)
                                        }
                                    }, 1000);
                                }

                                else {
                                    Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
                                }
                            })
                            .then(data => {
                                var datos = data;
                                if (datos !== -1) {
                                    $.LoadingOverlay("hide");
                                    Swal.fire("", "Estimación guardada correctamente", "success");
                                    //fnLimpiar();
                                    fnObtenerEstimaciones();
                                    fnObtieneUltimaFechaEstimacion();
                                }
                                else {
                                    $.LoadingOverlay("hide");
                                    Swal.fire("", "No existe ejecución en el período", "warning");

                                }
                            })
                            .catch(function (error) {
                                $.LoadingOverlay("hide");
                                Swal.fire("", error.message + " ", "error");
                            });
                    }
                    else Swal.fire("", "Debe seleccionar una fecha", "warning");
                } else Swal.fire("", "Debe ingresar una fecha válida", "warning");
            }
        });
}

function fnEliminarEstimacion(vIdEstimacionCorr, vIdEstadoEstimacion) {
    //swal({
    //    title: "",
    //    text: "¿Desea eliminar la estimación?",
    //    icon: "warning",
    //    buttons: {
    //        cancel: "No",
    //        catch: {
    //            text: "Si",
    //            value: "Si",
    //        },
    //    },
    //    dangerMode: true,
    //})
    if (vIdEstadoEstimacion == 1) {


        Swal.fire({
            title: "",
            text: "¿Desea eliminar la estimación?",
            icon: "warning",
            showDenyButton: true, showCancelButton: false,
            confirmButtonText: `Si`,
            denyButtonText: `No`,
        })
            .then((result) => {
                if (result.isConfirmed) {
                    $.LoadingOverlay("show");
                    const url = baseURL + "Api/EstimacionSupervisor/EliminaEstimacion";
                    var dataJSON = JSON.stringify({
                        AnioId: vIdAnio,
                        ProyectoCodigoSupervisor: vIdProyectoSupervisor,
                        EstimacionCorr: vIdEstimacionCorr
                    });
                    fetch(proxyurl + url, {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + vToken,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: dataJSON
                    })
                        .then(response => {
                            var estadoRespuesta = response.status;

                            if (estadoRespuesta == 200) {
                                return response.json();
                            }
                            else if (estadoRespuesta == 401) {
                                fnRefrescarToken(vToken);
                                var interval = setInterval(function () {
                                    if (vToken !== '') {
                                        clearInterval(interval)
                                    }
                                }, 1000);
                            }

                            else {
                                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
                            }
                        })
                        .then(data => {
                            var datos = data;
                            if (datos !== -1) {
                                $.LoadingOverlay("hide");
                                Swal.fire("", "Estimación elimada correctamente", "success");
                                fnObtenerEstimaciones();
                                fnObtieneUltimaFechaEstimacion();
                            }
                        })
                        .catch(function (error) {
                            $.LoadingOverlay("hide");
                            Swal.fire("", error.message + " ", "error");
                        });
                }
            });
    }
    else {
        Swal.fire("", "No es posible eliminar la estimación, ya que se encuentra en estado Aprobada", "error");
    }
}

function fnObtieneUltimaFechaEstimacion() {
    const url = baseURL + "Api/EstimacionSupervisor/GetUltimaFechaEstimacion/" + vIdAnio + '/' + vIdProyectoSupervisor;
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
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            vConsulta = data;
            if (vConsulta !== undefined) {
                if (vConsulta.length > 0) {
                    vConsulta.forEach(function (registro) {
                        var vFechaUltimaEstimacionProyecto = registro.FechaUltima;
                        if (vFechaUltimaEstimacionProyecto === '01/01/1900') {
                            $('#desde').val('');
                            $("#desde").prop('disabled', false);
                        }
                        else {
                            //$('#desde').val(vFechaUltimaEstimacionProyecto);
                            $('#desde_hide').val(vFechaUltimaEstimacionProyecto);
                            $('#desde_hide').show();
                            $('#div_fechas').show();
                            $("#desde_hide").prop('disabled', true);
                        }
                    });
                }
            }
        })
        .catch(function (error) {
            Swal.fire("", error.message + " ", "error");
        });
}

function fnImprimirEstimacion(vIdEstimacionCorr) {
    //var vReporte = 'RptEstimacionSupervisor.mrt';
    
    var vReporte = '5702'
    var esunica = `No%20${vIdEstimacionCorr}`;
    QueryString = (`?ReporteID=${vReporte}&AnioID=${vIdAnio}&ProyectoCodigo=${vIdProyectoSupervisor}&EstimacionCorr=${vIdEstimacionCorr}&EstimacionU=${esunica}`);
    var url = "../VisorInformesSti.aspx" + QueryString;

    //var QueryString = '?Parameters=' + vIdAnio + ',"' + vIdProyectoSupervisor + '",' + vIdEstimacionCorr + '&IdReporte=2' + '&Reporte=' + vReporte;
    
    //var url = "../FrmVisorReporte.aspx" + QueryString;
    
    window.open(url, '_blank', 'location=no,height=560,width=887,status=yes,titlebar=yes,scrollbars=yes');
    //window.location.href = "../FrmVisorReporte.aspx" + QueryString;
}

function fnVerReprogramacion(vIdEstimacion, vIdEstimacionCorr) {
    alert(vIdEstimacion + '-' + vIdEstimacionCorr);
}


function fnObtieneValidacionCDP() {
    const url = baseURL + "Api/EstimacionSupervisor/GetValidacionCDP/" + vIdAnio + '/' + vIdProyectoSupervisor;
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
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            vConsulta = data;
            if (vConsulta !== undefined) {
                if (vConsulta.length > 0) {
                    vConsulta.forEach(function (registro) {
                        vValidacionCDP = registro.ValidacionCDP;
                    });
                }
            }
        })
        .catch(function (error) {
            Swal.fire("", error.message + " ", "error");
        });
}


function fnCerrarModalReprogramacion() {
    $('#modalReprogramacion').modal('toggle');
}

function fnReprogramar() {

    Swal.fire({
        title: "",
        text: "¿Desea realizar el proceso de reprogramación?",
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    })
        .then((result) => {
            if (result.isConfirmed) {

                $.LoadingOverlay("show");

                const url = baseURL + "Api/EstimacionSupervisor/ReprogramacionTramoRenglon";

                var dataJSON = JSON.stringify({
                    AnioIdSupervision: vIdAnio,
                    ProyectoCodigoSupervisor: vIdProyectoSupervisor,
                    Usuario: vUsuarioActual
                });

                fetch(proxyurl + url, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + vToken,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: dataJSON
                })
                    .then(response => {
                        var estadoRespuesta = response.status;

                        if (estadoRespuesta == 200) {
                            return response.json();
                        }
                        else if (estadoRespuesta == 409) {
                            Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
                            return;
                        }
                        else if (estadoRespuesta == 401) {
                            fnRefrescarToken(vToken);
                            var interval = setInterval(function () {
                                if (vToken !== '') {
                                    clearInterval(interval)
                                }
                            }, 1000);
                        }

                        else {
                            Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
                        }
                    })
                    .then(data => {
                        var datos = data;
                        if (datos != undefined) {
                            if (datos !== -1) {
                                $.LoadingOverlay("hide");
                                Swal.fire("", "Reprogramación calculada con éxito", "success");
                                $('#btnReprogramar').prop('disabled', false);
                                $('#btnGuardar').show();
                                //fnObtenerTramosReprogramados();
                                //$('#modalReprogramacion').show();
                            }
                        }
                        else {
                            $.LoadingOverlay("hide");
                        }

                    })
                    .catch(function (error) {
                        $.LoadingOverlay("hide");
                        Swal.fire("", error.message + " ", "error");
                    });
            }
        });
}


function fnObtenerTramosReprogramados() {

    $.LoadingOverlay("show");
    var thead = '', tbody = '', tfoot = '';

    const url = baseURL + "Api/EstimacionSupervisor/GetTramosReprogramados/" + vIdAnio + '/' + vIdProyectoSupervisor;

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
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            $('#tableTramosReprogramados').dataTable().fnClearTable();
            $('#tableTramosReprogramados').dataTable().fnDestroy();
            vTramosReprogramados = data;
            if (vTramosReprogramados !== undefined) {
                if (vTramosReprogramados.length > 0) {
                    vTramosReprogramados.forEach(function (registro) {
                        var thead = '', tbody = '';

                        tbody += '<tr>' +
                            '<td class="spacer" ></td > ' +
                            '<td style="width: 150px">' + registro.Tramo + '</td>' +
                            '<td style="width: 150px">' + registro.CodRuta + '</td>' +
                            '<td style="width: 120px;text-align: right">' + formatToCurrency(registro.CDPAnterior) + '</td>' +
                            '<td style="width: 120px;text-align: right">' + formatToCurrency(registro.FactorAnterior) + '</td>' +
                            '<td style="width: 120px;text-align: right">' + formatToCurrency(registro.CDPDisponible) + '</td>' +
                            '<td style="width: 120px;text-align: right">' + formatToCurrency(registro.FactorActual) + '</td>' +
                            '<td style="width: 120px;text-align: right">' + formatToCurrency(registro.SaldoaReprogramar) + '</td>' +
                            '<td class="spacer"></td>' +
                            '</tr>';
                        $('#tableTramosReprogramados').append(tbody);

                    });
                    fnInicializaTableTramosReprogramados();
                    $.LoadingOverlay("hide");
                }
                else {
                    $.LoadingOverlay("hide");
                    fnInicializaTableTramosReprogramados();
                    //$('#tableEstimaciones').dataTable().fnClearTable();
                    //$('#tableEstimaciones').dataTable().fnDestroy();
                }
            }
            else {
                fnInicializaTableTramosReprogramados();
                //$('#tableEstimaciones').dataTable().fnClearTable();
                //$('#tableEstimaciones').dataTable().fnDestroy();
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");
        });




}

function fnObtenerPlanAnual() {
    const url = baseURL + "api/plananual/get";
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
            limpiarSelect('cmbAnio');
            if (vAnios !== undefined) {
                if (vAnios.length > 0) {

                    vAnios.forEach(function (registro) {
                        $("#cmbAnio").append('<option value=' +
                            registro.AnioID + '>' +
                            registro.PlanAnualNombre + '</option>');
                    });
                    document.getElementById("cmbAnio").selectedIndex = -1;
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

function fnObtenerProyectosSupervisionAnio(vAnioID) {
    const url = baseURL + "Api/EstimacionSupervisor/GetListadoProyectosSupervision/" + vAnioID;
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
                        clearInterval(interval);
                    }
                }, 1000);
            }
            else {
                Swal.fire({

                    confirmButtonText: 'OK',
                    icon: 'warning',
                    text: 'No existe información'
                })
            }
        })

        .then(data => {
            vAnios = data;
            limpiarSelect('cmbProyecto');
            if (vAnios !== undefined) {
                if (vAnios.length > 0) {

                    vAnios.forEach(function (registro) {
                        $("#cmbProyecto").append('<option value=' +
                            registro.ProyectoCodigo + '>' +
                            registro.ProyectoDescripcion + '</option>');
                    });
                    //document.getElementById("cmbProyecto").selectedIndex = -1;
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
    $.LoadingOverlay("hide");
}

function fnObtenerSaldoActual() {


    const url = baseURL + "Api/EstimacionSupervisor/ObtieneSaldoActualProyectoSupervisor";

    var dataJSON = JSON.stringify({
        AnioIdSupervision: vIdAnio,
        ProyectoCodigoSupervisor: vIdProyectoSupervisor
    });

    fetch(proxyurl + url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: dataJSON
    })
        .then(response => {
            var estadoRespuesta = response.status;

            if (estadoRespuesta == 200) {
                return response.json();
            }
            else if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {
                    if (vToken !== '') {
                        clearInterval(interval)
                    }
                }, 1000);
            }

            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            var datos = data;
            if (datos !== -1) {
                $.LoadingOverlay("hide");
                vSaldoActual = datos;
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");
        });

}

function fnInicializaSaldos() {

    Swal.fire({
        title: "",
        text: "¿Desea establecer la distribución de saldos para este proyecto?",
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    })
        .then((result) => {
            if (result.isConfirmed) {

                //var vFechaDesde = $('#desde').val();
                //var vFechaHasta = $('#hasta').val();
                // if ((fnValidarFormatoFecha(vFechaDesde)) && (fnValidarFormatoFecha(vFechaHasta))) {
                //if ((vFechaDesde != '') && (vFechaHasta != '')) {
                $.LoadingOverlay("show");

                //var vFechaDesde = getSubstrings(vFechaDesde, 6, 10) + "-" + getSubstrings(vFechaDesde, 3, 5) + "-" + getSubstrings(vFechaDesde, 0, 2);
                //var vFechaHasta = getSubstrings(vFechaHasta, 6, 10) + "-" + getSubstrings(vFechaHasta, 3, 5) + "-" + getSubstrings(vFechaHasta, 0, 2);
                const url = baseURL + "Api/EstimacionSupervisor/InicializaSaldosSupervisor";
                vIdProyectoSupervisor = $('#cmbProyecto').val();
                vIdAnio = $('#cmbAnio').val();
                var dataJSON = JSON.stringify({
                    AnioIDSuper: vIdAnio,
                    SuperProyectoCodigo: vIdProyectoSupervisor,
                    //PeriodoDesde: vFechaDesde,
                    //PeriodoHasta: vFechaHasta,
                    Usuario: vUsuarioActual
                });

                fetch(proxyurl + url, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + vToken,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: dataJSON
                })
                    .then(response => {
                        var estadoRespuesta = response.status;

                        if (estadoRespuesta == 200) {
                            return response.json();
                        }
                        else if (estadoRespuesta == 401) {
                            fnRefrescarToken(vToken);
                            var interval = setInterval(function () {
                                if (vToken !== '') {
                                    clearInterval(interval)
                                }
                            }, 1000);
                        }

                        else {
                            Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
                        }
                    })
                    .then(data => {
                        var datos = data;
                        if (datos !== -1) {
                            $.LoadingOverlay("hide");
                            Swal.fire("", "Saldos inicializados con éxito", "success");
                        }
                        else {
                            $.LoadingOverlay("hide");
                            Swal.fire("", "Ya se ha establecido la distribución de saldos para este proyecto", "warning");

                        }
                    })
                    .catch(function (error) {
                        $.LoadingOverlay("hide");
                        Swal.fire("", error.message + " ", "error");
                    });
            }
            // else Swal.fire("", "Debe seleccionar una fecha", "warning");
            //} else Swal.fire("", "Debe ingresar una fecha válida", "warning");
            //}
        });
}

function fnConsultarSaldos() {

    //var vFechaDesde = $('#desde').val();
    //var vFechaHasta = $('#hasta').val();
    //if ((fnValidarFormatoFecha(vFechaDesde)) && (fnValidarFormatoFecha(vFechaHasta))) {
    //if ((vFechaDesde != '') && (vFechaHasta != '')) {
    $.LoadingOverlay("show");

    //var vFechaDesde = getSubstrings(vFechaDesde, 6, 10) + "-" + getSubstrings(vFechaDesde, 3, 5) + "-" + getSubstrings(vFechaDesde, 0, 2);
    //var vFechaHasta = getSubstrings(vFechaHasta, 6, 10) + "-" + getSubstrings(vFechaHasta, 3, 5) + "-" + getSubstrings(vFechaHasta, 0, 2);
    const url = baseURL + "Api/EstimacionSupervisor/CompruebaSaldosIniciales";

    var dataJSON = JSON.stringify({
        AnioIDSuper: vIdAnio,
        SuperProyectoCodigo: vIdProyectoSupervisor,
        //PeriodoDesde: vFechaDesde,
        //PeriodoHasta: vFechaHasta,
        Usuario: vUsuarioActual
    });

    fetch(proxyurl + url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: dataJSON
    })
        .then(response => {
            var estadoRespuesta = response.status;

            if (estadoRespuesta == 200) {
                return response.json();
            }
            else if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {
                    if (vToken !== '') {
                        clearInterval(interval)
                    }
                }, 1000);
            }

            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            var datos = data;
            if (datos !== -1) {
                $.LoadingOverlay("hide");
                Swal.fire("", "Saldos consultados con éxito", "success");
            }
            else {
                $.LoadingOverlay("hide");
                Swal.fire("", "Ha ocurrido un error, consulte con el administrador", "warning");

            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");
        });
    //}
    //else Swal.fire("", "Debe seleccionar una fecha", "warning");
    //} else Swal.fire("", "Debe ingresar una fecha válida", "warning");
}