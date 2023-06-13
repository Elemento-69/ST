var vToken;
var vRol;
var baseURL = '';
var proxyurl;
var vUsuarioActual;


$.LoadingOverlaySetup({
    image: "",
    fontawesome: "fas fa-spinner fa-spin"
})

$(document).ready(function () {
    $("select").select2({ theme: "bootstrap" })
    fnConsultarToken();

    $("#btnFiltrar").click(function () {
        fnObtenerNominasFiltradas();
    })
})

function fnConsultarToken() {
    $.LoadingOverlay("show");
    const createPromise = () =>
        $.ajax({
            type: "POST",
            url: "../Nominas/frmNominas.aspx/fObtenerToken",
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

            fnInicializaTableNominas();
            fnObtenerNominasPago();
            fnObtenerPlanesAnuales();
            $.LoadingOverlay("hide");
        });
}

const formatToCurrency = amount => {
    return "Q." + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

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
        url: "../Nominas/frmNominas.aspx/fActualizarToken",
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


function fnInicializaTableNominas() {
    // $('#tableEjecucionTramos').dataTable().fnClearTable();
    $('#tableNominas').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin nóminas para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ nóminas",
            "infoEmpty": "Mostrando 0 de 0 de 0 nóminas",
            "infoFiltered": "(Filtrado de _MAX_ total nóminas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ nóminas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay nóminas encontradas",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnObtenerNominasPago() {
    const url = baseURL + "Api/NominasPago/GetNominasPago";
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
            $('#tableNominas').dataTable().fnClearTable();
            $('#tableNominas').dataTable().fnDestroy();
            vNominas = data;
            if (vNominas !== undefined) {
                if (vNominas.length > 0) {
                    vNominas.forEach(function (registro) {
                        if (registro.FechaAprobacion != '') vFecha = moment(registro.FechaAprobacion).format('DD/MM/YYYY');
                        else vFecha = ''; 

                        vBtnEliminarNomina = '<a href="#fn" class="action-icon hover-red" data-toggle="popover" data-trigger="hover"' +
                            '  data-content="Eliminar" data-placement="top" title = "Eliminar nómina" onclick="fnEliminarNomina(' + registro.AnioID + ',' + registro.NominaCorrel + ')" >' +
                            '  <i class="fas fa-trash fa-lg fa-fw"></i></a>';
                        vBtnReporte1 = '<a href="#fn" class="action-icon btn hover-red print-btn" data-toggle="popover" data-trigger="hover"' +
                            '  data-content="Reporte1" data-placement="top" title = "Imprimir Nómina" onclick="fnReporteNomina(' + registro.AnioID + ',' + registro.NominaCorrel + ',16)" >' + 
                            '  <i class="fas fa-print fa-lg fa-fw"></i></a>';
                        vBtnReporte2 = '<a href="#fn" class="action-icon btn hover-red print-btn" data-toggle="popover" data-trigger="hover"' +
                            '  data-content="Reporte2" data-placement="top" title = "Imprimir Nómina Financiero" onclick="fnReporteNomina(' + registro.AnioID + ',' + registro.NominaCorrel + ',17)" >' +
                            '  <i class="fas fa-print fa-lg fa-fw"></i></a>';
                        vBtnReporte3 = '<a href="#fn" class="action-icon btn hover-red print-btn" data-toggle="popover" data-trigger="hover"' +
                            '  data-content="Reporte3" data-placement="top" title = "Imprimir Nómina Envío de Banco" onclick="fnReporteNomina(' + registro.AnioID + ',' + registro.NominaCorrel + ',114)" >' +
                            '  <i class="fas fa-print fa-lg fa-fw"></i></a>';
                        vBtnReporte4 = '<a href="#fn" class="action-icon btn hover-red print-btn" data-toggle="popover" data-trigger="hover"' +
                            '  data-content="Reporte4" data-placement="top" title = "Imprimir Nómina Ministerio" onclick="fnReporteNomina(' + registro.AnioID + ',' + registro.NominaCorrel + ',40)" >' +
                            '  <i class="fas fa-print fa-lg fa-fw"></i></a>';
                        vBtnReporte5 = '<a href="#fn" class="action-icon btn hover-red print-btn" data-toggle="popover" data-trigger="hover"' +
                            '  data-content="Reporte5" data-placement="top" title = "Imprimir Proyectos por Pagar" onclick="fnReporteNomina(' + registro.AnioID + ',' + registro.NominaCorrel + ',56)" >' +
                            '  <i class="fas fa-print fa-lg fa-fw"></i></a>'; 
                        vBtnReporte6 = '<a href="#fn" class="action-icon btn hover-red" data-toggle="popover" data-trigger="hover"' +
                            '  data-content="Reporte6" data-placement="top" title = "Imprimir Informe Nómina" onclick="fnReporteNomina(' + registro.AnioID + ',' + registro.NominaCorrel + ',71)" >' +
                            '  <i class="fas fa-print fa-lg fa-fw"></i></a>';
                        var thead = '', tbody = '';
                        tbody += '<tr>' +
                            '<td class="spacer"></td>' +
                            '<td style="width:400px">' + vBtnEliminarNomina + vBtnReporte1 + vBtnReporte2 + vBtnReporte3 + vBtnReporte4+ vBtnReporte5 + vBtnReporte6 + '</td>' +
                            '<td style="width:70px">' + registro.AnioID + '</td>' +
                            '<td style="text-align: center">' + registro.NominaCorrel  + '</td>' +
                            '<td style="text-align: left">' + formatToCurrency(registro.MontoTecho)  + '</td>' +
                            '<td style="text-align: right">' + formatToCurrency(registro.Total) + '</td>' +
                            '<td style="text-align: center">' + registro.CantidadEstimaciones + '</td>' +
                            '<td style="text-align: center">' +
                            '    <div class="custom-control custom-checkbox" >' +
                            '        <input type="checkbox"' + (registro.Aprobado === true ? "checked" : "") + ' id="checkAprobado" class="custom-control-input" disabled>' +
                            '       <label class="custom-control-label" for="checkAprobado"></label>' +
                            '    </div>' +
                            '</td >' +
                            '<td hidden style="text-align: right">' + registro.Acta + '</td>' +
                            '<td style="text-align: center">' + moment(registro.FechaAprobacion).format("DD/MM/YYYY") + '</td>' +
                            '<td class="spacer"></td>' +
                            '</tr>';
                        $('#tableNominas').append(tbody);
                    });
                    fnInicializaTableNominas();



                    $.LoadingOverlay("hide");
                }
                else {
                    Swal.fire("", "No existen nóminas de pago", "warning");
                    $.LoadingOverlay("hide");
                    fnInicializaTableNominas();
                }
            }
            else {
                $.LoadingOverlay("hide");
                fnInicializaTableNominas();
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");
        });
}

function fnEliminarNomina(vAnio, vNominaCorrel) {
    Swal.fire({
        title: "",
        text: "¿Desea eliminar esta nómina?",
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    })
        .then((result) => {
            if (result.isConfirmed) {
                $.LoadingOverlay("show");
                var dataJSON = JSON.stringify({
                    pAnioId: vAnio,
                    pNominaCorrel: vNominaCorrel,
                });
                $.ajax({
                    url: `${baseURL}Api/NominasPago/EliminaNominadePago/${vAnio}/${vNominaCorrel}`,
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    data: dataJSON,
                    success: (val) => {
                        let message = "Nómina eliminada satisfactoriamente"
                        swal.fire(message, "", "success")                      
                    },
                    error: function (response) {
                        swal.fire("Error", response.responseJSON.Message, "error");
                        $.LoadingOverlay("hide");
                        return false
                    }
                })




                //const url = baseURL + "Api/NominasPago/EliminaNominadePago/" + vAnio + "/" + vNominaCorrel;

                //var dataJSON = JSON.stringify({
                //    pAnioId: vAnio,
                //    pNominaCorrel: vNominaCorrel,
                //});

                //fetch(proxyurl + url, {
                //    method: 'POST',
                //    headers: {
                //        'Authorization': 'Bearer ' + vToken,
                //        'Accept': 'application/json',
                //        'Content-Type': 'application/json',
                //    },
                //    body: dataJSON
                //})
                //    .then(response => {
                //        var estadoRespuesta = response.status;

                //        if (estadoRespuesta == 200) {
                //            return response.json();
                //        }
                //        //else if (estadoRespuesta == 401) {
                //        //    fnRefrescarToken(vToken);
                //        //    var interval = setInterval(function () {
                //        //        if (vToken !== '') {
                //        //            clearInterval(interval)
                //        //        }
                //        //    }, 1000);
                //        //}
                //        //else if (estadoRespuesta == 409) {
                //        //    Swal.fire("", "Solo se puede borrar la última Nómina Correlativo de cada año ", "error");
                //        //    $.LoadingOverlay("hide");
                //        //}
                //        else
                //        {
                //            Swal.fire("", "error: " + estadoRespuesta + ", " +response.responseJSON.Message, "error");
                //            $.LoadingOverlay("hide");
                //        }
                //    })
                //    .then(data => {
                //        var datos = data;
                //        if ((datos !== -1) && (datos != undefined)) {
                //            $.LoadingOverlay("hide");
                //            Swal.fire("", "Nómina eliminada correctamente", "success");
                //            fnObtenerNominasPago();
                //        }
                //    })
                //    .catch(function (error) {
                //        $.LoadingOverlay("hide");
                //        Swal.fire("", error.message + " ", "error");
                //    });
            }

        });
}

function fnObtenerNominasFiltradas() {
    var vAnioID = $('#cmbPlanes').val();
    var vNominaCorrel = $('#txtCorrelativo').val();
    const url = baseURL + "Api/NominasPago/GetNominasPagoFiltro/" + vAnioID + "/" + vNominaCorrel;

    if (vNominaCorrel === '') {
        Swal.fire("", "Debe de escribir un No. Correlativo", "warning");
        return;
    }


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
            $('#tableNominas').dataTable().fnClearTable();
            $('#tableNominas').dataTable().fnDestroy();
            vNominas = data;
            if (vNominas !== undefined) {
                if (vNominas.length > 0) {
                    vNominas.forEach(function (registro) {
                        vBtnEliminarNomina = '<a href="#fn" class="action-icon hover-red" data-toggle="popover" data-trigger="hover"' +
                            '  data-content="Eliminar" data-placement="top" title = "Eliminar nómina" onclick="fnEliminarNomina(' + registro.AnioID + ',' + registro.NominaCorrel + ')" >' +
                            '  <i class="fas fa-trash fa-lg fa-fw"></i></a>';
                        vBtnReporte1 = '<a href="#fn" class="action-icon btn hover-red print-btn" data-toggle="popover" data-trigger="hover"' +
                            '  data-content="Reporte1" data-placement="top" title = "Imprimir Nómina" onclick="fnReporteNomina(' + registro.AnioID + ',' + registro.NominaCorrel + ',16)" >' +
                            '  <i class="fas fa-print fa-lg fa-fw"></i></a>';
                        vBtnReporte2 = '<a href="#fn" class="action-icon btn hover-red print-btn" data-toggle="popover" data-trigger="hover"' +
                            '  data-content="Reporte2" data-placement="top" title = "Imprimir Nómina Financiero" onclick="fnReporteNomina(' + registro.AnioID + ',' + registro.NominaCorrel + ',17)" >' +
                            '  <i class="fas fa-print fa-lg fa-fw"></i></a>';
                        vBtnReporte3 = '<a href="#fn" class="action-icon btn hover-red print-btn" data-toggle="popover" data-trigger="hover"' +
                            '  data-content="Reporte3" data-placement="top" title = "Imprimir Nómina Envío de Banco" onclick="fnReporteNomina(' + registro.AnioID + ',' + registro.NominaCorrel + ',18)" >' +
                            '  <i class="fas fa-print fa-lg fa-fw"></i></a>';
                        vBtnReporte4 = '<a href="#fn" class="action-icon btn hover-red print-btn" data-toggle="popover" data-trigger="hover"' +
                            '  data-content="Reporte4" data-placement="top" title = "Imprimir Nómina Ministerio" onclick="fnReporteNomina(' + registro.AnioID + ',' + registro.NominaCorrel + ',40)" >' +
                            '  <i class="fas fa-print fa-lg fa-fw"></i></a>';
                        vBtnReporte5 = '<a href="#fn" class="action-icon btn hover-red print-btn" data-toggle="popover" data-trigger="hover"' +
                            '  data-content="Reporte5" data-placement="top" title = "Imprimir Proyectos por Pagar" onclick="fnReporteNomina(' + registro.AnioID + ',' + registro.NominaCorrel + ',56)" >' +
                            '  <i class="fas fa-print fa-lg fa-fw"></i></a>';
                        vBtnReporte6 = '<a href="#fn" class="action-icon btn hover-red" data-toggle="popover" data-trigger="hover"' +
                            '  data-content="Reporte6" data-placement="top" title = "Imprimir Informe Nómina" onclick="fnReporteNomina(' + registro.AnioID + ',' + registro.NominaCorrel + ',71)" >' +
                            '  <i class="fas fa-print fa-lg fa-fw"></i></a>';
                        var thead = '', tbody = '';
                        tbody += '<tr>' +
                            '<td class="spacer"></td>' +
                            '<td style="width:400px">' + vBtnEliminarNomina + vBtnReporte1 + vBtnReporte2 + vBtnReporte3 + vBtnReporte4 + vBtnReporte5 + vBtnReporte6 + '</td>' +
                            '<td style="width:70px">' + registro.AnioID + '</td>' +
                            '<td>' + registro.NominaCorrel + '</td>' +
                            '<td style="text-align: left">' + formatToCurrency(registro.MontoTecho) + '</td>' +
                            '<td style="text-align: right">' + formatToCurrency(registro.Total) + '</td>' +
                            '<td style="text-align: right">' + registro.CantidadEstimaciones + '</td>' +
                            '<td style="text-align: center">' +
                            '    <div class="custom-control custom-checkbox" >' +
                            '        <input type="checkbox"' + (registro.Aprobado === true ? "checked" : "") + ' id="checkAprobado" class="custom-control-input" disabled>' +
                            '       <label class="custom-control-label" for="checkAprobado"></label>' +
                            '    </div>' +
                            '</td >' +
                            '<td style="text-align: right">' + registro.Acta + '</td>' +
                            '<td style="text-align: right">' + vFecha + '</td>' +
                            '<td class="spacer"></td>' +
                            '</tr>';
                        $('#tableNominas').append(tbody);
                    });
                    fnInicializaTableNominas();



                    $.LoadingOverlay("hide");
                }
                else {
                    Swal.fire("", "No existen nóminas de pago", "warning");
                    $.LoadingOverlay("hide");
                    fnInicializaTableNominas();
                }
            }
            else {
                $.LoadingOverlay("hide");
                fnInicializaTableNominas();
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");
        });
}

function limpiarSelect(idSelect) {
    document.getElementById(idSelect).options.length = 0;
};

function fnObtenerPlanesAnuales() {
    const url = baseURL + "api/NominasPago/GetPlanesAnuales";
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
 
function fnReporteNomina(vAnioID, vNominaCorrel, vIdReporte) { 
    //var QueryString = '?IdReporte=' + vIdReporte + '&Parameters=' + vAnioID + ',' + vNominaCorrel;
    opendialog("/VisorInformes.aspx?IdReporte=" + vIdReporte  +  "&Parameters=" + vAnioID + ',' + vNominaCorrel, 'Informe de Nómina');
    //var url = "../VisorInformes.aspx" + QueryString;
    //window.open(url, '_blank', 'location=no,height=560,width=887,status=yes,titlebar=yes,scrollbars=yes'); 
}

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