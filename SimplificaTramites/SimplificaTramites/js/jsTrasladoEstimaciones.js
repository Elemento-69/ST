var vToken;
var vUsuarioActual;
var proxyurl;
var baseHostURL;
var vEntidad;
var ixFilaTablaDocs = 0;


$(document).ready(function () {
    loadDefaultComponents();
    fnConsultarToken();
})

function fnConsultarToken() {
    $.ajax({
        type: "POST",
        url: "../Estimaciones/TrasladoEstimaciones.aspx/fObtenerToken",
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
                    vEntidad = registro.entidad;
                });

                fnCargarAnios();
                fnMostrarFechaDefault();
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
    const url = baseHostURL + "api/TrasladoEstimacion/GetPlanesAnuales";
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
                //document.getElementById('cmbAnio').onchange = function () {  };
                document.getElementById('cmbAnio').selectedIndex = 0;
                $('#cmbAnio').trigger('change');
            }

        })
        .catch(function (error) {
            Swal.fire("", error.message + " ", "success");
        });
}

function fnFormatoDosDigitos(dato) {
    if (dato < 10) {
        return "0" + dato.toString();
    } else {
        return dato.toString();
    }
}

function fnMostrarFechaDefault() {
    let fecha = new Date();
    let day = fecha.getDate();
    let month = fecha.getMonth() + 1;
    let year = fecha.getFullYear();
    var fechaFormateada = fnFormatoDosDigitos(day) + '/' + fnFormatoDosDigitos(month) + '/' + year;
    $('#fechaInput').val(fechaFormateada);
}

function fnInicializaTableDocsCobro() {
    $('#tableDocumentos').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin documentos para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ documentos",
            "infoEmpty": "Mostrando 0 de 0 de 0 documentos",
            "infoFiltered": "(Filtrado de _MAX_ total documentos)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ documentos",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontraron documentos",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnCargarTablaDocsCobro() {
    let vAnio = $('#cmbAnio').val();
    if (vAnio.length > 0) {
        var terminoBusqueda = "#";
        if ($("#txtTerminoBusqueda").val().length > 0) {
            terminoBusqueda = $("#txtTerminoBusqueda").val();
        }
        const url = baseHostURL + "api/TrasladoEstimacion/GetEstimacionesTraslado/" + $("#cmbAnio").val() + "/" + terminoBusqueda + "/" + vEntidad;
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
                            fnCargarTablaDocsCobro();
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
                $('#tableDocumentos').dataTable().fnClearTable();
                $('#tableDocumentos').dataTable().fnDestroy();

                var datos = data;

                $("#documentos-tbody").children().remove();

                if (datos) {
                    if (datos.length > 0) {
                        datos.forEach(function (registro) {                            
                            var funcionLlamarAgregarTraslado = "fnAgregarParaTraslado(" + registro.Anio + ",'" + registro.Proyecto + "'," + registro.PeriodoCorr + ",'" + registro.Periodo + "'," + registro.Monto + ",'" + registro.EstadoDesc + "'," + registro.CantFolio + ", this)";

                            ixFilaTablaDocs = ixFilaTablaDocs + 1;

                            var tbody = '<tr class="tr_data" id="tr_' + ixFilaTablaDocs +'" >' +
                                '<td class="spacer"></td>';
                            tbody += '<td style="width: 50px">' +
                                '          <a href="#fn" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"' +
                                '           data-content="AgregarParaTraslado" data-placement="top" title="Incluir en el traslado" id="tr_' + ixFilaTablaDocs +'_linkAgregar" onclick="' + funcionLlamarAgregarTraslado + '">' +
                                '           <i class="fas fa-plus fa-lg fa-fw"></i></a> ' +
                                '</td>';
                            tbody += '<td>' + registro.Anio + '</td>' +
                                '<td>' + registro.Proyecto + '</td>' +
                                '<td>' + registro.PeriodoCorr + '</td>' +
                                '<td>' + registro.Periodo + '</td>' +
                                '<td class="frcurrency-mask min">' + registro.Monto + '</td>' +
                                '<td>' + registro.EstadoDesc + '</td>' +
                                '<td class="spacer"></td>' +
                                '</tr>';

                            $('#tableDocumentos').append(tbody);
                        })
                        initMasks();
                    }
                }

                fnInicializaTableDocsCobro();

                $.LoadingOverlay("hide");
            })
            .catch(function (error) {
                $.LoadingOverlay("hide");
                Swal.fire("", "Error en consulta de documentos de cobro. " + error.message + "  ", "error");
            });
    } else {
        Swal.fire("", "Debe especificar el año", "warning");
    }
}


function fnAgregarParaTraslado(Anio, Proyecto, PeriodoCorr, Periodo, Monto, EstadoDesc, CantFolio, fila) {   
    var funcionQuitarDelListadoDeTraslado = "fnQuitarDelListadoDeTraslado(" + Anio + ",'" + Proyecto + "'," + PeriodoCorr + ",'" + Periodo + "'," + Monto + ",'" + EstadoDesc + "'," + CantFolio + ',this)';

    var strId = Anio + "|" + Proyecto + "|" + PeriodoCorr + "|" + CantFolio;

    var tbody = '<tr class="tr_data" id="' + strId + '" >' +
        '<td class="spacer"></td>';
    tbody += '<td style="width: 70px">' +
        '          <a href="#fn" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"' +
        '           data-content="AgregarParaTraslado" data-placement="top" title="No incluir" onclick="' + funcionQuitarDelListadoDeTraslado + '">' +
        '           <i class="fas fa-minus fa-lg fa-fw"></i></a> ' +
        '</td>';
    tbody += '<td>' + Anio + '</td>' +
        '<td>' + Proyecto + '</td>' +
        '<td>' + PeriodoCorr + '</td>' +
        '<td class="spacer"></td>' +
        '</tr>';
    
    $('#tableDocsIncluir').append(tbody);

    var i = fila.parentNode.parentNode.rowIndex;
    document.getElementById("tableDocumentos").deleteRow(i);
}


function fnAgregarTodosParaTraslado() {
    var tabla = document.getElementById("tableDocumentos");
    var cantidadFilas = tabla.rows.length;
    let ids = [];
    for (let i = 1; i < cantidadFilas; ++i) {
        var fila = tabla.rows[i];        
        ids.push('#' + fila.id + '_linkAgregar');
    }
    for (let j = 0; j < ids.length; j++) {
        $(ids[j]).trigger('click');
    }
}


function fnQuitarDelListadoDeTraslado(Anio, Proyecto, PeriodoCorr, Periodo, Monto, EstadoDesc, CantFolio, fila) {
    var funcionLlamarAgregarTraslado = "fnAgregarParaTraslado(" + Anio + ",'" + Proyecto + "'," + PeriodoCorr + ",'" + Periodo + "'," + Monto + ",'" + EstadoDesc + "'," + CantFolio + ", this)";

    ixFilaTablaDocs = ixFilaTablaDocs + 1;

    var tbody = '<tr class="tr_data" id="tr_' + ixFilaTablaDocs +'" >' +
        '<td class="spacer"></td>';
    tbody += '<td style="width: 50px">' +
        '          <a href="#fn" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"' +
        '           data-content="AgregarParaTraslado" data-placement="top" title="Incluir en el traslado"  id="tr_' + ixFilaTablaDocs +'_linkAgregar"  onclick="' + funcionLlamarAgregarTraslado + '">' +
        '           <i class="fas fa-plus fa-lg fa-fw"></i></a> ' +
        '</td>';
    tbody += '<td>' + Anio + '</td>' +
        '<td>' + Proyecto + '</td>' +
        '<td>' + PeriodoCorr + '</td>' +
        '<td>' + Periodo + '</td>' +
        '<td class="frcurrency-mask min">' + Monto + '</td>' +
        '<td>' + EstadoDesc + '</td>' +
        '<td class="spacer"></td>' +
        '</tr>';

    $('#tableDocumentos').append(tbody);
    initMasks();

    var i = fila.parentNode.parentNode.rowIndex;
    document.getElementById("tableDocsIncluir").deleteRow(i);
}

function fnValidarFormatoFecha(campo) {
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((campo.match(RegExPattern)) && (campo != '')) {
        return true;
    } else {
        return false;
    }
}

function fnTrasladar() {    
    let vCantidadDocumentos = document.getElementById("tableDocsIncluir").rows.length - 1;
    if (vCantidadDocumentos > 0) {
        var vFechaTraslado = $('#fechaInput').val();
        if (fnValidarFormatoFecha(vFechaTraslado)) {
            if (vFechaTraslado != '') {

                    const url = baseHostURL + "api/TrasladoEstimacion/AgregaTrasladoEstimacion/";
                    //alert(url);

                    $.LoadingOverlay("show");

                    var arrayFecha = vFechaTraslado.split("/");
                    if (arrayFecha[0].length < 2) {
                        arrayFecha[0] = "0" + arrayFecha[0];
                    }
                    if (arrayFecha[1].length < 2) {
                        arrayFecha[1] = "0" + arrayFecha[1];
                    }
                    var fechaTrasladoNuevoFormato = arrayFecha[2] + '-' + arrayFecha[1] + '-' + arrayFecha[0] + 'T00:00Z';
                    
                    var registroEncabezado = {
                        TrasladoTipo: vEntidad,
                        FechaTraslado: fechaTrasladoNuevoFormato,
                        UserName: vUsuarioActual,
                    };
                
                    var tabla = document.getElementById("tableDocsIncluir");
                    var cantidadFilas = tabla.rows.length;
                    let detalle = [];
                    for (let i = 1; i < cantidadFilas; ++i) {
                        var ids = tabla.rows[i].id.split("|");
                        var registroDetalle = {
                            EstimacionCorr: ids[2],
                            ProyectoCodigo: ids[1],
                            AnioID: ids[0],
                            UserName: vUsuarioActual,
                            CantFolio: ids[3],
                        };
                        detalle.push(registroDetalle);
                }

                var dataJSONt = JSON.stringify({
                    AgregaEncabezadoEstimacionTraslado: [registroEncabezado],
                    AgregaDetalleEstimacionTraslado: detalle,
                });
                //alert(dataJSONt);
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
                                        fnTrasladar();
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

                            Swal.fire("", "Se han trasladado los documentos. ", "success");
                            $("#registros-incluir-tbody").children().remove();                                

                            $.LoadingOverlay("hide");
                        })
                        .catch(function (error) {
                            $.LoadingOverlay("hide");
                            Swal.fire("", "Error al trasladar documentos. " + error.message + "  ", "error");
                        });
            }
            else {
                Swal.fire("", "Debe ingresar una fecha de traslado v&aacutelida", "warning");
            }
        }
        else {
            Swal.fire("", "Debe ingresar una fecha v&aacutelida", "warning");
        }
    } else {
        Swal.fire("", "No se han seleccionado documentos para el traslado", "warning");
    }
}
