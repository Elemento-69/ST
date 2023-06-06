var vToken;
var vUsuarioActual;
var proxyurl;
var baseHostURL;
var listaDeFaltas = [];
var contadorDeFaltas = 0;

$(document).ready(function () {
    loadDefaultComponents();
    fnInicializaTableEstimaciones();    
    fnConsultarToken();    
})

function fnConsultarToken() {
    $.ajax({
        type: "POST",
        url: "../Estimaciones/frmReparosTecnicosCrear.aspx/fObtenerToken",
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

                fnCargarTiposFalta();
                fnCargarTablaEstimaciones()
            }
        },
        failure: function (response) {
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}

function fnInicializaTableEstimaciones() {
    $('#tableEstimaciones').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin estimaciones para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ estimaciones",
            "infoEmpty": "Mostrando 0 de 0 de 0 estimaciones",
            "infoFiltered": "(Filtrado de _MAX_ total estimaciones)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ estimaciones",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontraron estimaciones",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnCargarTablaEstimaciones() {
    let vTerminoBusqueda = $('#txtTerminoBusqueda').val();
    if (vTerminoBusqueda.length == 0) { vTerminoBusqueda="-"}
    if (vTerminoBusqueda.length > 0) {

        var url = baseHostURL + "api/ReparoTecnico/ObtenerEstimacionesProyecto/22/" + vTerminoBusqueda;
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
                            fnCargarTablaEstimaciones();
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
                $('#tableEstimaciones').dataTable().fnClearTable();
                $('#tableEstimaciones').dataTable().fnDestroy();

                var datos = data;

                $("tbody").children().remove();

                if (datos.length > 0) {
                    datos.forEach(function (registro) {
                        var funcionLlamarVer = "mostrarModalCrearReparo('" + registro.ProyectoCorr + "'," +
                            "" + registro.AnioID + ", " + registro.PeriodoCorr +  ")";

                        var tbody = '<tr class="tr_data" >' +
                            '<td class="spacer"></td>';
                        tbody += '<td style="width: 80px">' +                            
                            '          <a href="#fn" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"' +
                            '           data-content="VerVentanaEdicion" data-placement="top" title="Agregar reparo" onclick="' + funcionLlamarVer + '">' +
                            '           <i class="fas fa-plus fa-lg fa-fw"></i></a> ' +
                            '</td>';
                        tbody += '<td>' + registro.AnioID + '</td>' +                            
                            '<td>' + registro.ProyectoCorr + '</td>' +
                            '<td>' + registro.PeriodoCorr + '</td>' +
                            '<td class="frcurrency-mask min">' + registro.Monto + '</td>' +
                            '<td>' + registro.Periodo + '</td>' +
                            '<td>' + registro.EstadoDesc + '</td>' +
                            '<td class="spacer"></td>' +
                            '</tr>';

                        $('#tableEstimaciones').append(tbody);
                    })
                    initMasks();
                    fnInicializaTableEstimaciones();
                    $.LoadingOverlay("hide");
                }
            })
            .catch(function (error) {
                $.LoadingOverlay("hide");
                Swal.fire("", "Error en consulta de estimaciones. " + error.message + "  ", "error");
            });
    } else {
        Swal.fire("", "Debe especificar un término de búsqueda", "warning");
    }
}

function mostrarModalCrearReparo(proyecto, anio, estimacion) {
    document.getElementById('lblAnio').innerHTML = anio;
    document.getElementById('lblProyecto').innerHTML = proyecto;
    document.getElementById('lblEstimacion').innerHTML = estimacion;
    $('#modalCrearReparo').show();
}

function limpiarSelect(idSelect) {
    var select = document.getElementById(idSelect);
    while (select.length > 1) {
        select.remove(1);
    }
}


function fnCargarTiposFalta() {
    const url = baseHostURL + "api/ReparoTecnico/ObtenerTipoFalta";

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
                        fnCargarTiposFalta();
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
            limpiarSelect('cmbTipoFalta');            
            $("#cmbTipoFalta").select2({ theme: "bootstrap" })
            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbTipoFalta").append('<option value=' +
                        registro.idTipoFalta + '>' +
                        registro.Descripcion +
                        '</option>');
                })
                document.getElementById('cmbTipoFalta').selectedIndex = 0;                
            }

        })
        .catch(function (error) {            
            Swal.fire("", error.message + " ", "success");
        });
}

function fnAgregarFalta() {
    var idTipoFalta = -1;
    var descripcionTipoFalta = '';
    var observaciones = '';
    var funcionEliminarFalta = '';

    if ($("#cmbTipoFalta").val() != null) {
        idTipoFalta = $("#cmbTipoFalta").val();
        descripcionTipoFalta = $("#cmbTipoFalta option:selected").text();
        observaciones = $("#txtObservaciones").val();

        contadorDeFaltas = contadorDeFaltas + 1;
        var objFalta = {};
        objFalta['id_contador'] = contadorDeFaltas;
        objFalta['idTipoFalta'] = idTipoFalta;
        objFalta['descripcionTipoFalta'] = descripcionTipoFalta;
        objFalta['observaciones'] = observaciones;
        listaDeFaltas.push(objFalta);        

        funcionEliminarFalta = "fnQuitarFalta(this," + contadorDeFaltas + ");";

        var tbody = '<tr class="tr_data" > ' +
            '<td class="spacer"></td>';
        tbody += '<td style="width: 80px">' +
            '          <a href="#fn" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"' +
            '           data-content="RemoverFalta" data-placement="top" title="Remover falta" onclick="' + funcionEliminarFalta + '">' +
            '           <i class="fas fa-trash fa-lg fa-fw"></i></a> ' +
            '</td>';
        tbody += '<td>' + descripcionTipoFalta + '</td>' +
            '<td>' + observaciones + '</td>' +
            '<td class="spacer"></td>' +
            '</tr>';

        $('#tableDetalleFaltas').append(tbody);
        $("#txtObservaciones").val('');
    } else {
        Swal.fire("", "Debe seleccionar el tipo de falta ", "warning");
    }
}

function fnQuitarFalta(fila, idListaFaltas) {    
    var row = fila.parentNode.parentNode;
    document.getElementById("tableDetalleFaltas").deleteRow(row.rowIndex);

    var contador = 0;
    listaDeFaltas.forEach((falta) => {
        if (falta['id_contador'] == idListaFaltas) {
            listaDeFaltas.splice(contador, 1);
        }
        contador = contador + 1;
    });
}

function fnGrabarRegistro() {
    var d = new Date();
    var strFechaReparo = ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear();    
    var arrayFecha = strFechaReparo.split("/");
    arrayFecha[0] = (parseInt(arrayFecha[0])).toString();
    if (arrayFecha[0].length < 2) {
        arrayFecha[0] = "0" + arrayFecha[0];
    }
    if (arrayFecha[1].length < 2) {
        arrayFecha[1] = "0" + arrayFecha[1];
    }
    strFechaReparo = arrayFecha[2] + '-' + arrayFecha[1] + '-' + arrayFecha[0] + 'T00:00Z';

    var urlMetodo = baseHostURL + "api/ReparoTecnico/InsertarReparoTecnico";

    var arregloFaltas = [];
    listaDeFaltas.forEach((falta) => {        
        arregloFaltas.push({
            idFalta: parseInt(falta['idTipoFalta']),
            idEncabezado: -1,
            observaciones: falta['observaciones'],
        });
    });

    var registro = {
        AnioID: parseInt(document.getElementById('lblAnio').innerHTML),
        ProyectoCodigo: document.getElementById('lblProyecto').innerHTML,
        Corr: parseInt(document.getElementById('lblEstimacion').innerHTML),
        Fecha: strFechaReparo,
        Usuario: vUsuarioActual,
        DetalleFaltas: arregloFaltas,
    };

    var dataJSONt = JSON.stringify(registro);
    //alert(dataJSONt);      

    fetch(urlMetodo, {
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
                        fnGrabarRegistro();
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
            var idEncabezado = data;
            generarReporteNuevaPestana(idEncabezado);
            Swal.fire("", "Reparo técnico creado exitosamente", "success");
            cerrarDespuesDeGrabar();
            fnCargarTablaEstimaciones()
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });
}

function cerrarDespuesDeGrabar() {    
    $("#txtObservaciones").val('');
    $("#bodyTableDetalleFaltas").children().remove();
    $('#modalCrearReparo').hide();
}

function generarReporteNuevaPestana(idEncabezado) {
    var url = "../visorinformesSti.aspx?reporteID=97&Emcabezado=" + idEncabezado;
    window.open(url, '_blank').focus();
}