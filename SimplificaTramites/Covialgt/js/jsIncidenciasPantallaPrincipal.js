var vToken;
var vUsuarioActual;
var baseHostURL;
var baseSitio;
var vRolesUsuario;
var vVerificarSupervisor;
var vPlanAnualS;
var vProgramaS;
//MAPA INCIDENCIAS
var map;
var gmarkers = [];


$(document).ready(function () {
    fnConsultarToken();
    fnObtenerRoles();

    fnInicializaTableIncidencias();
 
})
function fnObtenerRoles() {
    $.ajax({
        type: "POST",
        url: "frmIncidenciasPantallaPrincipal.aspx/fObtenerRoles",
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
                vRolesUsuario = vRespuestaJSON.datoDevueltoString.split(',')
                vVerificarSupervisor = vRolesUsuario.includes('SUPERVISOR') || vRolesUsuario.includes('SUPERVISOR CONSULTA')

                if (vVerificarSupervisor) {
                    vPlanAnualS = vUsuarioActual.substring(0, 4)
                    vProgramaS = vUsuarioActual.split('-')[0].substring(4, 10).toUpperCase();
                    $("#divPlanAnual").toggle(false);
                    $("#divPrograma").toggle(false);
                    fnCargarProyectos();
                }
            }
        },
        failure: function (response) {
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}

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

function agregarMarcador(incidenciaID, estadoID, latitud, longitud, tramo, rutaFotografia) {
    const posicion = { lat: latitud, lng: longitud };

    var urlImagenMarcador = document.location.origin + baseSitio + '/Images/Icons/icono_mapa_' + estadoID + '.png';

    var abrirPagina = "window.open('frmIncidenciasEdicion.aspx?incidenciaID=" + incidenciaID + "', '_blank');";

    const contentString = '<div id="content" >' +
        '<div class="img-wrapper d-inline-block">' +
        '<img width="140" height="140" src="' + rutaFotografia + '" alt="Image" onerror="ocultarIMG(this);" >' +
        ' </div>' +
        '<div class="row" style="width: 290px; margin-top: 5px;" > ' +
        '<div class="col-9" >' + tramo + '</div>' +
        '<div class="col-2 text-right mx-n1 my-2"  >' +
        '<button type="button" id="btnVerIncidencia" class="btn btn-primary btn-xs" onclick="' + abrirPagina + '" style="align: right; padding-top:1px; padding-bottom:1px; padding-left:8px; padding-right:10px; font-size: 14px;" >Ver</button>' +
        '</div>' +
        '</div>' +
        '</div>';


    const infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 300
    });

    const marker = new google.maps.Marker({
        id: 'marker_' + incidenciaID,
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

function enfocarMarcador(incidenciaID) {
    var m = gmarkers.find(x => x.id === 'marker_' + incidenciaID);
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
//MAPA INCIDENCIAS


function fnConsultarToken() {

    $.ajax({
        type: "POST",
        url: "../Incidencias/frmIncidenciasPantallaPrincipal.aspx/fObtenerToken",
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

                    fnCargarPlanesAnuales();                    
                    fnCargarTiposIncidencia();
                    fnCargarSeveridad();
                    fnCargarEstados();
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


function fnCargarPlanesAnuales() {
    var url = baseHostURL + "api/Incidencia/PlanesAnuales/listar/" + vUsuarioActual;
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
                        if (!vVerificarSupervisor) {
                            fnCargarPlanesAnuales();
                        }
                      
                       
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
            limpiarSelect('cmbPlanAnual1');            

            $("#cmbPlanAnual1").select2({ theme: "bootstrap" });
            
            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbPlanAnual1").append('<option value=' +
                        registro.AnioID + '>' +
                        registro.PlanAnualNombre +
                        '</option>');
                })

                document.getElementById('cmbPlanAnual1').onchange = function () { fnCargarProgramas(); };

                document.getElementById('cmbPlanAnual1').selectedIndex = 0;

                $('#cmbPlanAnual1').trigger('change');

                $.LoadingOverlay("hide");

            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " CargarPlanesAnuales", "success");
        });
}

function fnCargarProgramas() {
    if ($("#cmbPlanAnual1").val() != null) {
        var url = baseHostURL + "api/Incidencia/Programas/listar/" + $("#cmbPlanAnual1").val() + "/" + vUsuarioActual;
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
                            fnCargarProgramas();
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
                limpiarSelect('cmbPrograma1');
                $("#cmbPrograma1").select2({ theme: "bootstrap" });                

                if (datos.length > 0) {
                    datos.forEach(function (registro) {
                        $("#cmbPrograma1").append('<option value=' +
                            registro.ProgramaCodigo + '>' +
                            registro.ProgramaCodigo +
                            '</option>');
                    })

                    document.getElementById('cmbPrograma1').onchange = function () {
                        var vVerificanull = $("#cmbPrograma1").val();
                        if (vVerificanull != null) {
                            fnCargarProyectos();
                        }
                        
                    };

                    document.getElementById('cmbPrograma1').selectedIndex = 0;

                    $('#cmbPrograma1').trigger('change');

                    $.LoadingOverlay("hide");
                }
            })
            .catch(function (error) {
                $.LoadingOverlay("hide");
                Swal.fire("", error.message + " xyz", "success");
            });
    }
}

function fnCargarProyectos() {
  

    if (($("#cmbPrograma1").val() != null) && (!vVerificarSupervisor)) {
        vPlanAnualS = $("#cmbPlanAnual1").val();
        vProgramaS = $("#cmbPrograma1").val();
        var url = baseHostURL + "api/Incidencia/Proyectos/listar/" + $("#cmbPlanAnual1").val() + "/" + $("#cmbPrograma1").val() + "/" + vUsuarioActual;
    }
    else {
     //   var url = baseHostURL + "api/Incidencia/Proyectos/listar/" + vPlanAnualS + "/" + vProgramaS + "/" + vUsuarioActual;
        var url = baseHostURL + "api/Proyecto/GetListadoXSupervisor/" + vPlanAnualS + "/" + vUsuarioActual.substring(4, 20)
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
                            fnCargarProyectos();
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
                limpiarSelect('cmbProyecto1');
                $("#cmbProyecto1").select2({ theme: "bootstrap" });                

                if (datos) {
                    if (datos.length > 0) {
                        datos.forEach(function (registro) {
                            $("#cmbProyecto1").append('<option value=' +
                                registro.ProyectoCodigo + '>' +
                                registro.ProyectoCodigo +
                                '</option>');
                        })

                        document.getElementById('cmbProyecto1').onchange = function () { fnCargarTramos(); };

                        document.getElementById('cmbProyecto1').selectedIndex = 0;

                        $('#cmbProyecto1').trigger('change');

                        $.LoadingOverlay("hide");
                    }
                }
            })
            .catch(function (error) {
                $.LoadingOverlay("hide");
                Swal.fire("", error.message + " proy", "success");
            });
    
}


function fnCargarTramos() {
    if ($("#cmbProyecto1").val() != null) {
        const url = baseHostURL + "api/Incidencia/Tramos/listar/" + vPlanAnualS + "/" + $("#cmbProyecto1").val();
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
                            registro.TramoCodigo +
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
    } else {
        limpiarSelect('cmbTramo');
    }
}

function fnCargarTiposIncidencia() {
    const url = baseHostURL + "api/Incidencia/TiposIncidencia/listar";

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
                        fnCargarTiposIncidencia();
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
            limpiarSelect('cmbTipoIncidencia');
            $("#cmbTipoIncidencia").select2({ theme: "bootstrap" })
            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbTipoIncidencia").append('<option value=' +
                        registro.IdTipo + '>' +
                        registro.NombreTipo +
                        '</option>');
                })
                document.getElementById('cmbTipoIncidencia').selectedIndex = 0;
                $('#cmbTipoIncidencia').trigger('change');
                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });
}


function fnCargarSeveridad() {
    const url = baseHostURL + "api/Incidencia/Severidad/listar";

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
    const url = baseHostURL + "api/Incidencia/Estados/listar";

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


function fnValidarFormatoFecha(campo) {
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((campo.match(RegExPattern)) && (campo != '')) {
        return true;
    } else {
        return false;
    }
}

function fnCargarIncidenciasFiltradas() {
    if ($("#cmbProyecto1").val() != null) {
        var url = baseHostURL + "api/Incidencia/ConsultarIncidenciasPorFiltros/";

        //Proyecto
        //url = url + document.getElementById('cmbPlanAnual1').value + '/';
        //url = url + document.getElementById('cmbProyecto1').value + '/';
        url = url + vPlanAnualS + '/';
        url =  url + $("#cmbProyecto1").val() + '/'
       // url = url + vProgramaS + '/';
        //Tramo
        url = url + document.getElementById('cmbTramo').value + '/';
        //Rango de fechas
        var fechaIni = null+'/';
        var fechaFin = null+'/';
        if (document.getElementById('chkFiltrarPorFechas').checked) {
            var strFechaIni = document.getElementById('dtDesde').value;
            var strFechaFin = document.getElementById('dtHasta').value;
            if (fnValidarFormatoFecha(strFechaIni)) {
                var fechaNuevoFormato = strFechaIni.substring(6, 10) + '-' + strFechaIni.substring(3, 5) + '-' + strFechaIni.substring(0,2);
                fechaIni = fechaNuevoFormato + '/';
            }
            if (fnValidarFormatoFecha(strFechaFin)) {
                var fechaNuevoFormato = strFechaFin.substring(6, 10) + '-' + strFechaFin.substring(3, 5) + '-' + strFechaFin.substring(0, 2);
                fechaFin = fechaNuevoFormato + '/';
            }
        }
        //Fecha Desde
        url = url + fechaIni;
        //Fecha Hasta
        url = url + fechaFin;
        //Id Tipo
        url = url + document.getElementById('cmbTipoIncidencia').value + '/';
        //Id Severidad
        url = url + document.getElementById('cmbSeveridad').value + '/';
        //Id Estado
        url = url + document.getElementById('cmbEstado').value + '/';
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
                            fnCargarIncidenciasFiltradas();
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
                $('#tableIncidencias').dataTable().fnClearTable();
                $('#tableIncidencias').dataTable().fnDestroy();

                var datos = data;
                var contador = 1;

                $("tbody").children().remove();
                removerMarcadores();

                if (datos.length > 0) {
                    datos.forEach(function (registro) {

                        agregarMarcador(registro.IdIncidencia, registro.IdEstado, registro.Latitud, registro.Longitud, registro.Tramo, registro.RutaFotografia);

                        var fecha = registro.FechaIncidencia;
                        var fechaFormateada = fecha.substring(8, 10) + '/' + fecha.substring(5, 7) + '/' + fecha.substring(0, 4);

                        var tbody = '<tr onclick="enfocarMarcador(' + registro.IdIncidencia + ');">' +
                            '<td class="spacer"></td>';
                        tbody += '<td style="width: 150px">' +
                            '          <a href="#fn" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"' +
                            '           data-content="Imprimir" data-placement="top" title="Informe individual" onclick="fnImprimirInformeIndividual(' + registro.IdIncidencia + ')">' +
                            '           <i class="fas fa-print fa-lg fa-fw"></i></a> ' +
                            '          <a href="#fn" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"' +
                            '           data-content="Imprimir" data-placement="top" title="Ver detalle" onclick="fnAbrirPaginaEdicion(' + registro.IdIncidencia + ')">' +
                            '           <i class="fas fa-search fa-lg fa-fw"></i></a> ' +
                            '</td>';
                        tbody += '<td>' + fechaFormateada + '</td>' +
                            '<td>' + registro.Tramo + '</td>' +
                            '<td style="width:80px">' + registro.Tipo + '</td>' +
                            '<td style="width:70px">' + registro.Severidad + '</td>' +
                            '<td style="width:70px">' + registro.Estado + '</td>' +
                            '<td class="spacer"></td>' +
                            '</tr>';

                        $('#tableIncidencias').append(tbody);

                        contador = contador + 1;
                    })
                    fnInicializaTableIncidencias();
                    $.LoadingOverlay("hide");
                }
            })
            .catch(function (error) {
                $.LoadingOverlay("hide");
                Swal.fire("", error.message + " ", "success");
            });
    } else {
        Swal.fire("", "Debe seleccionar primero el plan anual, programa y proyecto", "warning");
    }
}

function fnInicializaTableIncidencias() {
    $('#tableIncidencias').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin incidencias para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Incidencias",
            "infoEmpty": "Mostrando 0 de 0 de 0 Incidencias",
            "infoFiltered": "(Filtrado de _MAX_ total Incidencias)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Incidencias",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay incidencias encontradas",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnImprimirInformeIndividual(idIncidencia) {
    var vReporte = 'RptInformeIndividualIncidencia.mrt';
    var QueryString = '?Parameters=' + idIncidencia.toString() + '&IdReporte=1' + '&Reporte=' + vReporte;
    var url = "../Incidencias/frmIncidenciasVisorReportes.aspx" + QueryString;
    window.open(url, '_blank', 'location=no,height=560,width=887,status=yes,titlebar=yes,scrollbars=yes');
}

function fnAbrirPantallaNuevaIncidencia() {    
        window.open('frmIncidenciasEdicion.aspx?incidenciaID=0', '_blank');            
}

function fnAbrirPaginaEdicion(idIncidencia) {
    window.open('frmIncidenciasEdicion.aspx?incidenciaID=' + idIncidencia.toString(), "_blank");
}

function fnImprimirInformeIndividual_X_Filtros() {
    if ($("#cmbProyecto1").val() != null) {
            //Año
        // var parametros = document.getElementById('cmbPlanAnual1').value + ',';
        var parametros = vPlanAnualS;
        //Proyecto
            parametros = parametros + document.getElementById('cmbProyecto1').value + ',';
            //Tramo
            parametros = parametros + document.getElementById('cmbTramo').value + ',';
            //Rango de fechas
            var fechaIni = 'x';
            var fechaFin = 'x';
            if (document.getElementById('chkFiltrarPorFechas').checked) {
                var strFechaIni = document.getElementById('dtDesde').value;
                var strFechaFin = document.getElementById('dtHasta').value;
                if (fnValidarFormatoFecha(strFechaIni)) {
                    var fechaNuevoFormato = strFechaIni.substring(0, 2) + '-' + strFechaIni.substring(3, 5) + '-' + strFechaIni.substring(6, 10);
                    fechaIni = fechaNuevoFormato;
                }
                if (fnValidarFormatoFecha(strFechaFin)) {
                    var fechaNuevoFormato = strFechaFin.substring(0, 2) + '-' + strFechaFin.substring(3, 5) + '-' + strFechaFin.substring(6, 10);
                    fechaFin = fechaNuevoFormato;
                }
            }
            //Fecha Desde
            parametros = parametros + fechaIni + ',';
            //Fecha Hasta
            parametros = parametros + fechaFin + ',';
            //Id Tipo
            parametros = parametros + document.getElementById('cmbTipoIncidencia').value + ',';
            //Id Severidad
            parametros = parametros + document.getElementById('cmbSeveridad').value + ',';
            //Id Estado
            parametros = parametros + document.getElementById('cmbEstado').value;

            var vReporte = 'RptInformeIndividualIncidencia_X_Filtros.mrt';
            var QueryString = '?Parameters=' + parametros + '&IdReporte=2' + '&Reporte=' + vReporte;
            var url = "../Incidencias/frmIncidenciasVisorReportes.aspx" + QueryString;
        window.open(url, '_blank', 'location=no,height=560,width=887,status=yes,titlebar=yes,scrollbars=yes');
    } else {
        Swal.fire("", "Debe seleccionar primero el plan anual, programa y proyecto", "warning");
    }
}