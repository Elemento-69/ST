var vToken;
var vRol;
var baseURL = '';
var proxyurl;
var vUsuarioActual;
var QueryString, url;
var vAnioID;

$.LoadingOverlaySetup({
    image: "",
    fontawesome: "fas fa-spinner fa-spin"
})


$(document).ready(function () {
    $("select").select2({ theme: "bootstrap" })
    fnConsultarToken();


    $("#btnFiltrar").click(function () {
        vAnioID = $('#cmbPlanes').val();
        fnObtenerEstimacionesResumen(vAnioID);
        fnCargarUltimaNomina(vAnioID);
        //
        //QueryString = '?IdReporte=70&Parameters=' + vAnioID;
        //url = "../VisorInformes.aspx" + QueryString;
        //window.open(url, '_blank', 'location=no,height=560,width=887,status=yes,titlebar=yes,scrollbars=yes');
    })

    $("#btnReporteResumen").click(function () {
        vAnioID = $('#cmbPlanes').val();
        opendialog("/VisorInformes.aspx?IdReporte=70&Parameters=" + vAnioID, 'Informe de Estado de Estimaciones Resumen');
    });

    $("#btnReporteDetalle").click(function () {
        vAnioID = $('#cmbPlanes').val();
        opendialog("/VisorInformes.aspx?IdReporte=91&Parameters=" + vAnioID, 'Informe de Estado de Estimaciones Detalle');
    }); 

    $("#btnReporteDetalleIndividual").click(function () {
        vAnioID = $('#cmbPlanes').val();
        opendialog("/VisorInformes.aspx?IdReporte=108&Parameters=" + vAnioID, 'Informe de Estado de Estimaciones Detalle');
    }); 

    $("#btnReporteResumenpdte").click(function () {
        vAnioID = $('#cmbPlanes').val();
        opendialog("/VisorInformes.aspx?IdReporte=73&Parameters=" + vAnioID, 'Informe Resumen Pendientes de Nómina');
    });

    $("#btnReporteDetalleresumenpdte").click(function () {
        vAnioID = $('#cmbPlanes').val();
        opendialog("/VisorInformes.aspx?IdReporte=92&Parameters=" + vAnioID, 'Informe Detalle Pendientes de Nómina');
    });

    $("#btnReporteDetalleresumenpdtedetalle").click(function () {
        vAnioID = $('#cmbPlanes').val();
        opendialog("/VisorInformes.aspx?IdReporte=109&Parameters=" + vAnioID, 'Informe Detalle Pendientes de Nómina');
    });

    $("#btnReporteestadosvisa").click(function () {
        vAnioID = $('#cmbPlanes').val();
        opendialog("/VisorInformes.aspx?IdReporte=87&Parameters=" + vAnioID + ',' + 'VISA', 'Informe Resumen Estados VISA');
    });

    $("#btnReporteestadostecnico").click(function () {
        vAnioID = $('#cmbPlanes').val();
        opendialog("/VisorInformes.aspx?IdReporte=88&Parameters=" + vAnioID + ',' + 'TECNICO', 'Informe Resumen Estados TECNICO');
    });

    $("#btnReporteestadosfinanciero").click(function () {
        vAnioID = $('#cmbPlanes').val();
        opendialog("/VisorInformes.aspx?IdReporte=89&Parameters=" + vAnioID + ',' + 'FINANCIERO', 'Informe Resumen Estados FINANCIERO');
    });

    $("#resumenpdte-tab").click(function () {
        vAnioID = $('#cmbPlanes').val();
        if ((vAnioID === null) || (vAnioID === undefined)) {
            Swal.fire("", "Debe seleccionar un año ", "warning");
            return;
        };
        fnObtenerEstimacionesResumenPendiente(vAnioID);
    })

    $("#resumen-tab").click(function () {
        vAnioID = $('#cmbPlanes').val();
        if ((vAnioID === null) || (vAnioID === undefined)) {
            Swal.fire("", "Debe seleccionar un año ", "warning");
            return;
        };
        fnObtenerEstimacionesResumen(vAnioID);
    })

    $("#estadosvisa-tab").click(function () {
        vAnioID = $('#cmbPlanes').val();
        if ((vAnioID === null) || (vAnioID === undefined)) {
            Swal.fire("", "Debe seleccionar un año ", "warning");
            return;
        };
        fnObtenerEstadosVisa(vAnioID);
    })

    $("#estadostecnico-tab").click(function () {
        vAnioID = $('#cmbPlanes').val();
        if ((vAnioID === null) || (vAnioID === undefined)) {
            Swal.fire("", "Debe seleccionar un año ", "warning");
            return;
        };
        fnObtenerEstadosTecnico(vAnioID);
    })

    $("#estadosfinanciero-tab").click(function () {
        vAnioID = $('#cmbPlanes').val();
        if ((vAnioID === null) || (vAnioID === undefined)) {
            Swal.fire("", "Debe seleccionar un año ", "warning");
            return;
        };
        fnObtenerEstadosFinanciero(vAnioID);
    })

    $("#estadospagado-tab").click(function () {
        vAnioID = $('#cmbPlanes').val();
        if ((vAnioID === null) || (vAnioID === undefined)) {
            Swal.fire("", "Debe seleccionar un año ", "warning");
            return;
        };
        fnObtenerEstadosPagado(vAnioID);
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
            url: "../Nominas/frmVistaGralEstimaciones.aspx/fObtenerToken",
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


const formatToCurrency = amount => {
    return "Q." + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

function limpiarSelect(idSelect) {
    document.getElementById(idSelect).options.length = 0;
};

function fnObtenerPlanesAnuales() {
    const url = baseURL + "api/NominasPago/GetPlanesAnualesVistaGralEstimaciones";
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

function fnObtenerEstimacionesResumen(vAnioID) {
    if (vAnioID == null) {
        Swal.fire("", "Debe seleccionar un año ", "warning");
        return;
    };
    const url = baseURL + "Api/NominasPago/GetEstimacionesDepartamento/" + vAnioID;
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
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            $('#tableResumen').dataTable().fnClearTable();
            $('#tableResumen').dataTable().fnDestroy();
            $("tbody").children().remove();
            vNominas = data;
            if (vNominas !== undefined) {
                if (vNominas.length > 0) {
                    vNominas.forEach(function (registro) {
                        let totalCVISA = vNominas.reduce((corr, item) => {
                            return corr + item.CVISA;
                        }, 0)
                        let totalVISA = vNominas.reduce((corr, item) => {
                            return corr + item.VISA;
                        }, 0)
                        let totalCTECNICO = vNominas.reduce((corr, item) => {
                            return corr + item.CTECNICO;
                        }, 0)
                        let totalTECNICO = vNominas.reduce((corr, item) => {
                            return corr + item.TECNICO;
                        }, 0)
                        let totalCFINANCIERO = vNominas.reduce((corr, item) => {
                            return corr + item.CFINANCIERO;
                        }, 0)
                        let totalFINANCIERO = vNominas.reduce((corr, item) => {
                            return corr + item.FINANCIERO;
                        }, 0)
                        let totalCTOTAL = vNominas.reduce((corr, item) => {
                            return corr + item.CTOTAL;
                        }, 0)
                        let totalTOTAL = vNominas.reduce((corr, item) => {
                            return corr + item.TOTAL;
                        }, 0)
                        let totalCPAGADO = vNominas.reduce((corr, item) => {
                            return corr + item.CPAGADO;
                        }, 0)
                        let totalPAGADO = vNominas.reduce((corr, item) => {
                            return corr + item.PAGADO;
                        }, 0)

                        var thead = '', tbody = '';
                        tbody += '<tr>' +
                            '<td class="spacer"></td>' +
                            '<td>' + registro.ProgramaNombre + '</td>' +
                            '<td style="text-align: right">' + registro.CVISA + '</td>' +
                            '<td style="text-align: right">' + formatToCurrency(registro.VISA) + '</td>' +
                            '<td style="text-align: right">' + registro.CTECNICO + '</td>' +
                            '<td style="text-align: right">' + formatToCurrency(registro.TECNICO) + '</td>' +
                            '<td style="text-align: right">' + registro.CFINANCIERO + '</td>' +
                            '<td style="text-align: right">' + formatToCurrency(registro.FINANCIERO) + '</td>' +
                            '<td style="text-align: right">' + registro.CTOTAL + '</td>' +
                            '<td style="text-align: right">' + formatToCurrency(registro.TOTAL) + '</td>' +
                            '<td style="text-align: right">' + registro.CPAGADO + '</td>' +
                            '<td style="text-align: right">' + formatToCurrency(registro.PAGADO) + '</td>' +
                            '<td class="spacer"></td>' +
                            '</tr>';
                        $('#tableResumen').append(tbody);
                        $('#TotalCVISA').html(totalCVISA);
                        $('#TotalVISA').html(formatToCurrency(totalVISA));
                        $('#TotalCTECNICO').html(totalCTECNICO);
                        $('#TotalTECNICO').html(formatToCurrency(totalTECNICO));
                        $('#TotalCFINANCIERO').html(totalCFINANCIERO);
                        $('#TotalFINANCIERO').html(formatToCurrency(totalFINANCIERO));
                        $('#TotalCTOTAL').html(totalCTOTAL);
                        $('#TotalTOTAL').html(formatToCurrency(totalTOTAL));
                        $('#TotalCPAGADO').html(totalCPAGADO);
                        $('#TotalPAGADO').html(formatToCurrency(totalPAGADO));
                    });
                    fnInicializaTableResumen();



                    $.LoadingOverlay("hide");
                }
                else {
                    Swal.fire("", "No existen resumenes", "warning");
                    $.LoadingOverlay("hide");
                    fnInicializaTableResumen();
                }
            }
            else {
                $.LoadingOverlay("hide");
                fnInicializaTableResumen();
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");
        });
}

function fnInicializaTableResumen() {
    $('#tableResumen').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        //scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin resumenes para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ resumenes",
            "infoEmpty": "Mostrando 0 de 0 de 0 resumenes",
            "infoFiltered": "(Filtrado de _MAX_ total resumenes)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ resumenes",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay resumenes encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnObtenerEstimacionesResumenPendiente(vAnioID) {

    const url = baseURL + "Api/NominasPago/GetEstimacionesDepartamentoResumen/" + vAnioID;
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
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            $('#tableResumenPendiente').dataTable().fnClearTable();
            $('#tableResumenPendiente').dataTable().fnDestroy();
            $("tbody").children().remove();
            vNominas = data;
            if (vNominas !== undefined) {
                if (vNominas.length > 0) {
                    vNominas.forEach(function (registro) {
                        let TEstVISA1 = vNominas.reduce((corr, item) => {
                            return corr + item.CVISA;
                        }, 0)
                        let TMontoEstVISA1 = vNominas.reduce((corr, item) => {
                            return corr + item.VISA;
                        }, 0)
                        let TCantEstTECNICO1 = vNominas.reduce((corr, item) => {
                            return corr + item.CTECNICO;
                        }, 0)
                        let TMontoEstTECNICO1 = vNominas.reduce((corr, item) => {
                            return corr + item.TECNICO;
                        }, 0)
                        let TEstFINANCIERO1 = vNominas.reduce((corr, item) => {
                            return corr + item.CFINANCIERO;
                        }, 0)
                        let TMontoFINANCIERO1 = vNominas.reduce((corr, item) => {
                            return corr + item.FINANCIERO;
                        }, 0)
                        let TEstTotal1 = vNominas.reduce((corr, item) => {
                            return corr + item.CTOTAL;
                        }, 0)
                        let TMontoTotal1 = vNominas.reduce((corr, item) => {
                            return corr + item.TOTAL;
                        }, 0)

                        var thead = '', tbody = '';
                        tbody += '<tr>' +
                            '<td class="spacer"></td>' +
                            '<td>' + registro.ProgramaNombre + '</td>' +
                            '<td style="text-align: right">' + registro.CVISA + '</td>' +
                            '<td style="text-align: right">' + formatToCurrency(registro.VISA) + '</td>' +
                            '<td style="text-align: right">' + registro.CTECNICO + '</td>' +
                            '<td style="text-align: right">' + formatToCurrency(registro.TECNICO) + '</td>' +
                            '<td style="text-align: right">' + registro.CFINANCIERO + '</td>' +
                            '<td style="text-align: right">' + formatToCurrency(registro.FINANCIERO) + '</td>' +
                            '<td style="text-align: right">' + registro.CTOTAL + '</td>' +
                            '<td style="text-align: right">' + formatToCurrency(registro.TOTAL) + '</td>' +
                            '<td class="spacer"></td>' +
                            '</tr>';
                        $('#tableResumenPendiente').append(tbody);
                        $('#TEstVISA1').html(TEstVISA1); 
                        $('#TMontoEstVISA1').html(formatToCurrency(TMontoEstVISA1)); 
                        $('#TCantEstTECNICO1').html(TCantEstTECNICO1); 
                        $('#TMontoEstTECNICO1').html(formatToCurrency(TMontoEstTECNICO1)); 
                        $('#TEstFINANCIERO1').html(TEstFINANCIERO1); 
                        $('#TMontoFINANCIERO1').html(formatToCurrency(TMontoFINANCIERO1)); 
                        $('#TEstTotal1').html(TEstTotal1); 
                        $('#TMontoTotal1').html(formatToCurrency(TMontoTotal1)); 
                    });
                    fnInicializaTableResumenPendiente();



                    $.LoadingOverlay("hide");
                }
                else {
                    Swal.fire("", "No existen resumenes", "warning");
                    $.LoadingOverlay("hide");
                    fnInicializaTableResumenPendiente();
                }
            }
            else {
                $.LoadingOverlay("hide");
                fnInicializaTableResumenPendiente();
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");
        });
}

function fnInicializaTableResumenPendiente() {
    $('#tableResumenPendiente').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        //scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin resumenes para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ resumenes",
            "infoEmpty": "Mostrando 0 de 0 de 0 resumenes",
            "infoFiltered": "(Filtrado de _MAX_ total resumenes)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ resumenes",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay resumenes encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnInicializaTableEstadosVisa() {
    $('#tableEstadosvisa').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        //scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin estados para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ estados",
            "infoEmpty": "Mostrando 0 de 0 de 0 estados",
            "infoFiltered": "(Filtrado de _MAX_ total estados)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ estados",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay estados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnObtenerEstadosVisa(vAnioID) {

    const url = baseURL + "Api/NominasPago/GetMontoEstimacionesxEstado/" + vAnioID + "/VISA";
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
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            $('#tableEstadosvisa').dataTable().fnClearTable();
            $('#tableEstadosvisa').dataTable().fnDestroy();
            $("tbody").children().remove();
            vNominas = data;
            if (vNominas !== undefined) {
                if (vNominas.length > 0) {
                    vNominas.forEach(function (registro) {

                        let TEstVISA2 = vNominas.reduce((corr, item) => {
                            return corr + item.Cantidad;
                        }, 0)
                        let TMontoEstVISA2 = vNominas.reduce((corr, item) => {
                            return corr + item.Monto;
                        }, 0)

                        var thead = '', tbody = '';
                        tbody += '<tr>' +
                            '<td class="spacer"></td>' +
                            '<td>' + registro.Estado + '</td>' +
                            '<td style="text-align: right">' + registro.Cantidad + '</td>' +
                            '<td style="text-align: right">' + formatToCurrency(registro.Monto) + '</td>' +
                            '<td class="spacer"></td>' +
                            '</tr>';
                        $('#tableEstadosvisa').append(tbody);
                        $('#TEstVISA2').html(TEstVISA2);
                        $('#TMontoEstVISA2').html(formatToCurrency(TMontoEstVISA2)); 
                    });
                    fnInicializaTableEstadosVisa();
                    $.LoadingOverlay("hide");
                }
                else {
                    Swal.fire("", "No existen estados", "warning");
                    $.LoadingOverlay("hide");
                    fnInicializaTableEstadosVisa();
                }
            }
            else {
                $.LoadingOverlay("hide");
                fnInicializaTableEstadosVisa();
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");
        });
}

function fnInicializaTableEstadosTecnico() {
    $('#tableEstadostecnico').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        //scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin estados para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ estados",
            "infoEmpty": "Mostrando 0 de 0 de 0 estados",
            "infoFiltered": "(Filtrado de _MAX_ total estados)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ estados",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay estados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnObtenerEstadosTecnico(vAnioID) {

    const url = baseURL + "Api/NominasPago/GetMontoEstimacionesxEstado/" + vAnioID + "/TECNICO";
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
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            $('#tableEstadostecnico').dataTable().fnClearTable();
            $('#tableEstadostecnico').dataTable().fnDestroy();
            $("tbody").children().remove();
            vNominas = data;
            if (vNominas !== undefined) {
                if (vNominas.length > 0) {
                    vNominas.forEach(function (registro) {
                        let TEstTecnico = vNominas.reduce((corr, item) => {
                            return corr + item.Cantidad;
                        }, 0)
                        let TMontoTecnico = vNominas.reduce((corr, item) => {
                            return corr + item.Monto;
                        }, 0)

                        var thead = '', tbody = '';
                        tbody += '<tr>' +
                            '<td class="spacer"></td>' +
                            '<td>' + registro.Estado + '</td>' +
                            '<td style="text-align: right">' + registro.Cantidad + '</td>' +
                            '<td style="text-align: right">' + formatToCurrency(registro.Monto) + '</td>' +
                            '<td class="spacer"></td>' +
                            '</tr>';
                        $('#tableEstadostecnico').append(tbody);
                        $('#TEstTecnico').html(TEstTecnico);
                        $('#TMontoTecnico').html(formatToCurrency(TMontoTecnico)); 
                    });
                    fnInicializaTableEstadosTecnico();
                    $.LoadingOverlay("hide");
                }
                else {
                    Swal.fire("", "No existen estados", "warning");
                    $.LoadingOverlay("hide");
                    fnInicializaTableEstadosTecnico();
                }
            }
            else {
                $.LoadingOverlay("hide");
                fnInicializaTableEstadosTecnico();
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");
        });
}

function fnInicializaTableEstadosFinanciero() {
    $('#tableEstadosfinanciero').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        //scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin estados para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ estados",
            "infoEmpty": "Mostrando 0 de 0 de 0 estados",
            "infoFiltered": "(Filtrado de _MAX_ total estados)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ estados",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay estados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnObtenerEstadosFinanciero(vAnioID) {

    const url = baseURL + "Api/NominasPago/GetMontoEstimacionesxEstado/" + vAnioID + "/FINANCIERO";
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
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            $('#tableEstadosfinanciero').dataTable().fnClearTable();
            $('#tableEstadosfinanciero').dataTable().fnDestroy();

         

            //$("thead").children().remove();
            vNominas = data;
            if (vNominas !== undefined) {
                if (vNominas.length > 0) {
                    vNominas.forEach(function (registro) {
                        let TEstFinanciero = vNominas.reduce((corr, item) => {
                            return corr + item.Cantidad;
                        }, 0)
                        let TMontoFinanciero = vNominas.reduce((corr, item) => {
                            return corr + item.Monto;
                        }, 0)
                        var thead = '', tbody = '';
                        tbody += '<tr>' +
                            '<td class="spacer"></td>' +
                            '<td>' + registro.Estado + '</td>' +
                            '<td style="text-align: right">' + registro.Cantidad + '</td>' +
                            '<td style="text-align: right">' + formatToCurrency(registro.Monto) + '</td>' +
                            '<td class="spacer"></td>' +
                            '</tr>';
                        $('#tableEstadosfinanciero').append(tbody);
                        $('#TEstFinanciero').html(TEstFinanciero);
                        $('#TMontoFinanciero').html(formatToCurrency(TMontoFinanciero)); 
                    });
                    fnInicializaTableEstadosFinanciero();
                    $.LoadingOverlay("hide");
                }
                else {
                    Swal.fire("", "No existen estados", "warning");
                    $.LoadingOverlay("hide");
                    fnInicializaTableEstadosFinanciero();
                }
            }
            else {
                $.LoadingOverlay("hide");
                fnInicializaTableEstadosFinanciero();
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");
        });
}

function fnInicializaTableEstadosPagado() {
    $('#tableEstadospagado').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin estados para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ estados",
            "infoEmpty": "Mostrando 0 de 0 de 0 estados",
            "infoFiltered": "(Filtrado de _MAX_ total estados)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ estados",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay estados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnObtenerEstadosPagado(vAnioID) {

    const url = baseURL + "Api/NominasPago/GetMontoEstimacionesxEstado/" + vAnioID + "/PAGADO";
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
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            $('#tableEstadospagado').dataTable().fnClearTable();
            $('#tableEstadospagado').dataTable().fnDestroy();
            $("tbody").children().remove();
            vNominas = data;
            if (vNominas !== undefined) {
                if (vNominas.length > 0) {
                    vNominas.forEach(function (registro) {
                        let TEstPagado = vNominas.reduce((corr, item) => {
                            return corr + item.Cantidad;
                        }, 0)
                        let TMontoPagado = vNominas.reduce((corr, item) => {
                            return corr + item.Monto;
                        }, 0)
                        var thead = '', tbody = '';
                        tbody += '<tr>' +
                            '<td class="spacer"></td>' +
                            '<td>' + registro.Estado + '</td>' +
                            '<td style="text-align: right">' + registro.Cantidad + '</td>' +
                            '<td style="text-align: right">' + formatToCurrency(registro.Monto) + '</td>' +
                            '<td class="spacer"></td>' +
                            '</tr>';
                        $('#tableEstadospagado').append(tbody);
                        $('#TEstPagado').html(TEstPagado);
                        $('#TMontoPagado').html(formatToCurrency(TMontoPagado)); 
                    });
                    fnInicializaTableEstadosPagado();
                    $.LoadingOverlay("hide");
                }
                else {
                    Swal.fire("", "No existen estados", "warning");
                    $.LoadingOverlay("hide");
                    fnInicializaTableEstadosPagado();
                }
            }
            else {
                $.LoadingOverlay("hide");
                fnInicializaTableEstadosPagado
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");
        });
}
let Ultima = 0;
function fnCargarUltimaNomina(vAnioID) {
    $.ajax({
        url: `${baseURL}api/NominasPago/GetUltimaNominaPagada/` + vAnioID,
        success: (val) => {
            Ultima = val[0].Nomina;         
            $('#Monto').html('Monto PAGADO Nómina '+Ultima);
        },

        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        }
    })

}