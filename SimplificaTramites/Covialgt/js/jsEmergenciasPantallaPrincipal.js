var vToken;
var vUsuarioActual;
var baseHostURL;
var baseSitio;

$(document).ready(function () {
    fnInicializaTableEmergencias();
    fnConsultarToken();

})

//MAPA EMERGENCIAS
var map;
var gmarkers = [];

function initMap() {

    const guate = { lat: 14.628434, lng: -90.522713 };

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: guate,
    });
}

function ocultarIMG(imagen) {
    imagen.style.display = 'none';
}

function agregarMarcador(emergenciaID, estadoID, latitud, longitud, tramo, urlFotografia) {
    const posicion = { lat: latitud, lng: longitud };

    var urlImagenMarcador = document.location.origin + baseSitio + '/Images/Icons/icono_mapa_' + estadoID + '.png';

    var abrirPagina = "window.open('frmEmergenciasNueva.aspx?emergenciaID=" + emergenciaID + "', '_blank');";

    const contentString = '<div id="content" >' +
        '<div class="img-wrapper d-inline-block">' +
        '<img width="140" height="140" src="' + urlFotografia + '" alt="Image" onerror="ocultarIMG(this);" >' +
        ' </div>' +
        '<div class="row" style="width: 290px; margin-top: 5px;" > ' +
        '<div class="col-9" >' + tramo + '</div>' +
        '<div class="col-2 text-right mx-n1 my-2"  >' +
        '<button type="button" id="btnVerEmergencia" class="btn btn-primary btn-xs" onclick="' + abrirPagina + '" style="align: right; padding-top:1px; padding-bottom:1px; padding-left:8px; padding-right:10px; font-size: 14px;" >Ver</button>' +
        '</div>' +
        '</div>' +
        '</div>';


    const infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 300
    });

    const marker = new google.maps.Marker({
        id: 'marker_' + emergenciaID,
        position: posicion,
        map: map,
        icon: urlImagenMarcador
    });

    marker.addListener("click", () => {
        infowindow.open(map, marker);
        map.panTo(marker.getPosition());
    });

    gmarkers.push(marker);
}

function removerMarcadores() {
    for (i = 0; i < gmarkers.length; i++) {
        gmarkers[i].setMap(null);
    }
    gmarkers.length = 0;
}

function enfocarMarcador(emergenciaID) {
    var m = gmarkers.find(x => x.id === 'marker_' + emergenciaID);
    google.maps.event.trigger(m, 'click');
    map.setZoom(12);
}

function cambiarVisibilidadRangoFechas(mostrar) {
    var x = document.getElementById("divRangoFechas");
    if (mostrar) {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
//MAPA EMERGENCIAS


function fnConsultarToken() {

    $.ajax({
        type: "POST",
        url: "../Emergencias/frmEmergenciasPantallaPrincipal.aspx/fObtenerToken",
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
                    baseHostURL = registro.baseURL;
                    proxyurl = registro.proxyURL;
                    baseSitio = registro.baseSitio;

                    fnCargarTramos();
                    fnCargarTiposEmergencia();
                    fnCargarCausasEmergencia();
                    fnCargarPasoHabilitado();
                    fnCargarSeveridad();
                    fnCargarEstados();
                    fnCargarDepartamentos();
                });
            }
        },
        failure: function (response) {
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });



}

function limpiarSelect(idSelect) {
    var select = document.getElementById(idSelect);
    while (select.length > 1) {
        select.remove(1);
    }
}

function fnCargarTramos() {
    const url = baseHostURL + "api/EmergenciasApp/Tramos/listarConEmergenciaAsignada";

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
                        fnCargarTramos();
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
            limpiarSelect('cmbTramo');
            $("#cmbTramo").select2({ theme: "bootstrap" })
            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbTramo").append('<option value=' +
                        registro.TramoID + '>' +
                        registro.Codigo +
                        '</option>');
                })
                document.getElementById('cmbTramo').selectedIndex = 0;
                $('#cmbTramo').trigger('change');
                $.LoadingOverlay("hide");

            }

        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");

        });
}

function fnCargarTiposEmergencia() {
    const url = baseHostURL + "api/EmergenciasApp/Tipo/listar";

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
                        fnCargarTiposEmergencia();
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
            limpiarSelect('cmbTipoEmergencia');
            $("#cmbTipoEmergencia").select2({ theme: "bootstrap" })
            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbTipoEmergencia").append('<option value=' +
                        registro.IdTipo + '>' +
                        registro.NombreTipo +
                        '</option>');
                })
                document.getElementById('cmbTipoEmergencia').selectedIndex = 0;
                $('#cmbTipoEmergencia').trigger('change');
                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });
}


function fnCargarCausasEmergencia() {
    const url = baseHostURL + "api/EmergenciasApp/Causa/listar";

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
                        fnCargarCausasEmergencia();
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
            limpiarSelect('cmbCausaEmergencia');
            $("#cmbCausaEmergencia").select2({ theme: "bootstrap" })
            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbCausaEmergencia").append('<option value=' +
                        registro.IdCausa + '>' +
                        registro.NombreCausa +
                        '</option>');
                })
                document.getElementById('cmbCausaEmergencia').selectedIndex = 0;
                $('#cmbCausaEmergencia').trigger('change');
                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });
}

function fnCargarPasoHabilitado() {
    const url = baseHostURL + "api/EmergenciasApp/Paso/listar";

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
                        fnCargarPasoHabilitado();
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
            limpiarSelect('cmbPasoHabilitado');
            $("#cmbPasoHabilitado").select2({ theme: "bootstrap" })
            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbPasoHabilitado").append('<option value=' +
                        registro.IdPaso + '>' +
                        registro.NombrePaso +
                        '</option>');
                })
                document.getElementById('cmbPasoHabilitado').selectedIndex = 0;
                $('#cmbPasoHabilitado').trigger('change');
                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });
}

function fnCargarSeveridad() {
    const url = baseHostURL + "api/EmergenciasApp/Severidad/listar";

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
                        fnCargarSeveridad();
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
            limpiarSelect('cmbSeveridad');
            $("#cmbSeveridad").select2({ theme: "bootstrap" })
            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbSeveridad").append('<option value=' +
                        registro.IdSeveridad + '>' +
                        registro.NombreSeveridad +
                        '</option>');
                })
                document.getElementById('cmbSeveridad').selectedIndex = 0;
                $('#cmbSeveridad').trigger('change');
                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });
}

function fnCargarEstados() {
    const url = baseHostURL + "api/EmergenciasApp/Estados/listar";

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
                        fnCargarEstados();
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
            limpiarSelect('cmbEstado');
            $("#cmbEstado").select2({ theme: "bootstrap" })
            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbEstado").append('<option value=' +
                        registro.IdEstado + '>' +
                        registro.NombreEstado +
                        '</option>');
                })
                document.getElementById('cmbEstado').selectedIndex = 0;
                $('#cmbEstado').trigger('change');
                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });
}

function fnCargarDepartamentos() {
    const url = baseHostURL + "api/EmergenciasApp/Departamentos/listar";

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
                        fnCargarDepartamentos();
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
            limpiarSelect('cmbDepartamento');
            $("#cmbDepartamento").select2({ theme: "bootstrap" })
            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbDepartamento").append('<option value=' +
                        registro.DepartamentoID + '>' +
                        registro.DepartamentoNombre +
                        '</option>');
                })
                document.getElementById('cmbDepartamento').selectedIndex = 0;
                $('#cmbDepartamento').trigger('change');
                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
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

function fnCargarEmergenciasFiltradas() {
    var url = baseHostURL + "api/EmergenciasApp/ConsultarEmergencias/";

    //Tramo
    url = url + document.getElementById('cmbTramo').value + '/';
    //Rango de fechas
    var fechaIni = null + '/';
    var fechaFin = null + '/';
    if (document.getElementById('chkFiltrarPorFechas').checked) {
        var strFechaIni = document.getElementById('dtDesde').value;
        var strFechaFin = document.getElementById('dtHasta').value;
        fechaIni = document.getElementById('dtDesde').value;
        fechaFin = document.getElementById('dtHasta').value;

        if (fnValidarFormatoFecha(strFechaIni)) {
            // var fechaNuevoFormato = strFechaIni.substring(0, 2) + '-' + strFechaIni.substring(3, 5) + '-' + strFechaIni.substring(6, 10);
            var fechaNuevoFormato = strFechaIni.substring(6, 10) + "-" + strFechaIni.substring(3, 5) + "-" + strFechaIni.substring(0, 2)
            fechaIni = fechaNuevoFormato + '/';
        }
        if (fnValidarFormatoFecha(strFechaFin)) {
            // var fechaNuevoFormato = strFechaFin.substring(0, 2) + '-' + strFechaFin.substring(3, 5) + '-' + strFechaFin.substring(6, 10);
            var fechaNuevoFormato = strFechaFin.substring(6, 10) + "-" + strFechaFin.substring(3, 5) + "-" + strFechaFin.substring(0, 2)
            fechaFin = fechaNuevoFormato + '/';
        }
    }
    //Fecha Desde
    url = url + fechaIni;
    //Fecha Hasta
    url = url + fechaFin;
    //Id Tipo
    url = url + document.getElementById('cmbTipoEmergencia').value + '/';
    //ID Causa
    url = url + document.getElementById('cmbCausaEmergencia').value + '/';
    //ID Paso
    url = url + document.getElementById('cmbPasoHabilitado').value + '/';
    //Id Severidad
    url = url + document.getElementById('cmbSeveridad').value + '/';
    //Id Estado
    url = url + document.getElementById('cmbEstado').value + '/';
    //Id Departamento
    url = url + document.getElementById('cmbDepartamento').value;
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
                        fnCargarEmergenciasFiltradas();
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
            $('#tableEmergencias').dataTable().fnClearTable();
            $('#tableEmergencias').dataTable().fnDestroy();

            var datos = data;
            var contador = 1;

            $("tbody").children().remove();
            removerMarcadores();

            if (datos.length > 0) {
                datos.forEach(function (registro) {

                    agregarMarcador(registro.EmergenciaID, registro.IdEstado, registro.Latitud, registro.Longitud, registro.Tramo, registro.UrlFotografia);
                    //var tbody = '<tr>' +
                    //    '<td class="spacer" ></td > ' +
                    //    '<td style="width:70px">' + registro.ProyectoCodigo + '</td>' +
                    //    '<td style="width:450px">' + registro.TramoDesc + '</td>' +
                    //    '<td style="width: 160px; text-align: left">' + registro.RutaCode + '</td>' +
                    //    '<td style="text-align: right">' + formatToCurrency(registro.AspiracionPago) + '</td>' +
                    //    '<td style="text-align: right">' + formatToCurrency(registro.MontoCDPTramo) + '</td>' +
                    //    '<td style="text-align: right; ">' + formatToCurrency(vCDPSaldo) + '</td>' +
                    //    '<td class="spacer"></td>' +
                    //    '</tr>';
                    var fecha = registro.FechaEmergencia;
                    // var fechaFormateada = fecha.substring(8, 10) + '/' + fecha.substring(5, 7) + '/' + fecha.substring(0, 4);

                    var tbody = '<tr onclick="enfocarMarcador(' + registro.EmergenciaID + ');">' +
                        '<td class="spacer"></td>';
                    tbody += '<td style="width: 150px">' +
                        '          <a href="#fn" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"' +
                        '           data-content="Imprimir" data-placement="top" title="Informe individual" onclick="fnImprimirInformeIndividual(' + registro.EmergenciaID + ')">' +
                        '           <i class="fas fa-print fa-lg fa-fw"></i></a> ' +
                        '          <a href="#fn" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"' +
                        '           data-content="Imprimir" data-placement="top" title="Ver detalle" onclick="fnAbrirPaginaEdicion(' + registro.EmergenciaID + ')">' +
                        '           <i class="fas fa-search fa-lg fa-fw"></i></a> ' +
                        '</td>';
                    tbody += '<td>' + moment(registro.FechaEmergencia).format("DD/MM/YYYY") + '</td>' +
                        '<td>' + registro.Tramo + '</td>' +
                        '<td>' + registro.Tipo + '</td>' +
                        '<td>' + registro.Causa + '</td>' +
                        '<td>' + registro.NombreEstado + '</td>' +
                        '<td class="spacer"></td>' +
                        '</tr>';

                    $('#tableEmergencias').append(tbody);

                    contador = contador + 1;
                })
                fnInicializaTableEmergencias();
                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });
}
function fnInicializaTableEmergencias() {
    $('#tableEmergencias').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        ordering: true,
        scrollY: '70vh',
        columnDefs: [{ "targets": 2, "type": "date" }],
        language: {
            "decimal": "",
            "emptyTable": "Sin emergencias para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Emergencias",
            "infoEmpty": "Mostrando 0 de 0 de 0 Emergencias",
            "infoFiltered": "(Filtrado de _MAX_ total Emergencias)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Emergencias",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay emergencias encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnImprimirInformeIndividual(idEmergencia) {
    var vReporte = 'RptInformeIndividualEmergencia.mrt';
    var QueryString = '?Parameters=' + idEmergencia.toString() + '&IdReporte=1' + '&Reporte=' + vReporte;
    var url = "../Emergencias/FrmVisorReporteEmergencias.aspx" + QueryString;
    window.open(url, '_blank', 'location=no,height=560,width=887,status=yes,titlebar=yes,scrollbars=yes');
}

function fnAbrirPaginaEdicion(idEmergencia) {
    window.open('frmEmergenciasNueva.aspx?emergenciaID=' + idEmergencia.toString(), "_blank");
}

function fnImprimirInformeIndividual_X_Filtros() {
    //Tramo
    var parametros = document.getElementById('cmbTramo').value + ',';
    //Rango de fechas
    var fechaIni = 'x,';
    var fechaFin = 'x,';
    if (document.getElementById('chkFiltrarPorFechas').checked) {
        var strFechaIni = document.getElementById('dtDesde').value;
        var strFechaFin = document.getElementById('dtHasta').value;
        if (fnValidarFormatoFecha(strFechaIni)) {
            var fechaNuevoFormato = strFechaIni.substring(0, 2) + '-' + strFechaIni.substring(3, 5) + '-' + strFechaIni.substring(6, 10);
            fechaIni = fechaNuevoFormato + ',';
        }
        if (fnValidarFormatoFecha(strFechaFin)) {
            var fechaNuevoFormato = strFechaFin.substring(0, 2) + '-' + strFechaFin.substring(3, 5) + '-' + strFechaFin.substring(6, 10);
            fechaFin = fechaNuevoFormato + ',';
        }
    }
    ////Fecha Desde
    //parametros = parametros + fechaIni;
    ////Fecha Hasta
    //parametros = parametros + fechaFin;

    //Fecha Desde
    parametros = parametros + strFechaIni + ',';
    //Fecha Hasta
    parametros = parametros + strFechaFin + ',';
    //Id Tipo
    parametros = parametros + document.getElementById('cmbTipoEmergencia').value + ',';
    //ID Causa
    parametros = parametros + document.getElementById('cmbCausaEmergencia').value + ',';
    //ID Paso
    parametros = parametros + document.getElementById('cmbPasoHabilitado').value + ',';
    //Id Severidad
    parametros = parametros + document.getElementById('cmbSeveridad').value + ',';
    //Id Estado
    parametros = parametros + document.getElementById('cmbEstado').value + ',';
    //Id Departamento
    parametros = parametros + document.getElementById('cmbDepartamento').value;

    var vReporte = 'RptInformeIndividualEmergencia_X_Filtros.mrt';
    var QueryString = '?Parameters=' + parametros + '&IdReporte=2' + '&Reporte=' + vReporte;
    var url = "../Emergencias/FrmVisorReporteEmergencias.aspx" + QueryString;
    window.open(url, '_blank', 'location=no,height=560,width=887,status=yes,titlebar=yes,scrollbars=yes');
}


