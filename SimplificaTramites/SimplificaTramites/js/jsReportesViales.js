var map;
var proxyurl;
var gmarkers = [];
var markerCluster;
var misMarkers = [];
var htmlFotos = '';
var vIdProyectoSupervisor, vIdAnio;
var fechaRepor;
var estadoRepor;
var NEstado;
var DiasNotificacion;

$(document).ready(function () {
    fnObtenerDiasNotificacion();
    fnNumReportes();
    fnConsultarToken();
    $("#hasta-dp").datetimepicker({
        format: "DD/MM/YYYY"
    })
    $("#desde-dp").datetimepicker({
        format: "DD/MM/YYYY"
    })

    $("select").select2({ theme: "bootstrap" })


    var now = new Date();


    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = (day) + "/" + (month) + "/" + now.getFullYear();

    var now8 = new Date();
    now8 = fnSumarDias(now, -30);

    var day0 = ("0" + now8.getDate()).slice(-2);
    var month0 = ("0" + (now8.getMonth() + 1)).slice(-2);
    var today0 = (day0) + "/" + (month0) + "/" + now8.getFullYear();

    $('#hasta').val(today);
    $('#desde').val(today0);


    fnInitMap();
   

    ///Carga Tramos
    $.ajax({
        url: `${urlbase}api/ReportesViales/GetTramos/`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            if (val.length > 0) {
                //console.info(val);
                $("#cmbTramo").append(new Option("[Todos]", "all"));
                let cols = val.map((item) => `<option value="${item.DescripcionTramo}">${item.DescripcionTramo}</option>`)
                $("#cmbTramo").append(cols.join(""))
                $("#cmbTramo").trigger("change")
            }
        },
        error: (error) => {
            Swal.fire("", error.message, "error");
        }
    })


    /*
    $("#cmbPlanAnual").on("change", ({ currentTarget }) => {
        plan = currentTarget.value;
        $('#cmbProyecto').find("option").remove();
        $('#cmbTramo').find("option").remove();

        if ((rolConsultas == "ADMINISTRADORES") || (rolConsultas == "ADMINISTRADOR") || (rolConsultas == "DIRECTOR") || (rolConsultas == "REGIONALES")) {
            $("#cmbProyecto").append(new Option("[Sin proyectos asignados]", "-1"));
            //$("#cmbProyecto").append(new Option("[Todos]", "0"));
        }

        $.ajax({
            url: `${urlbase}api/ReportesViales/GetListadoProyectos/${plan}/${vIdProyectoSupervisor}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },

            success: (val) => {
                if (val.length > 0) {



                    let cols = val.map((item) => `<option value="${item.ProyectoCodigo}">${item.ProyectoDescripcion}</option>`)
                    $("#cmbProyecto").append(cols.join(""))
                    $("#cmbProyecto").trigger("change")
                }

            }
        })

    }) */


    /*
    $("#cmbProyecto").on("change", ({ currentTarget }) => {
        //var layer_tramos = new google.maps.Data();
        //plan = $("#cmbPlanAnual").val();
        $('#cmbTramo').find("option").remove();
        ProyectoCodigo = currentTarget.value;
        if (ProyectoCodigo != '') {
            ///Carga Tramos
            $.ajax({
                url: `${urlbase}api/ReportesViales/GetTramos/${plan}/${ProyectoCodigo}`,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: (val) => {
                    if (val.length > 0) {
                        //console.info(val);
                        $("#cmbTramo").append(new Option("[Todos]", "0"));
                        let cols = val.map((item) => `<option value="${item.TramoID}">${item.TramoDesc}</option>`)
                        $("#cmbTramo").append(cols.join(""))
                        $("#cmbTramo").trigger("change")
                    }
                },
                error: (error) => {
                    Swal.fire("", error.message, "error");
                }
            })


        }

    })*/

    $("#btnVer").click(function () {
        fnVerReporte();
    })


});

function fObtenerDatosUsuarioSupervisor(vUsuario) {

    if ((rolConsultas == "ADMINISTRADORES") || (rolConsultas == "ADMINISTRADOR") || (rolConsultas == "DIRECTOR") || (rolConsultas == "REGIONALES")) {
        vIdProyectoSupervisor = "0";
    }
    else {
        vIdProyectoSupervisor = vUsuario.substr(4, vUsuario.length);
    }

    $.ajax({
        url: `${urlbase}api/ReportesViales/GetPlanesAnuales`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {

            let cols = val.map((item) => `<option value="${item.AnioID}">${item.AnioID}</option>`)

            $("#cmbPlanAnual").append(cols.join(""))
            $("#cmbPlanAnual").trigger("change")
        }
    })


}


function fnConsultarToken() {
    $.ajax({
        type: "POST",
        url: "../ReportesViales/frmReportesViales.aspx/fObtenerToken",
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


                });
            }

            fObtenerDatosUsuarioSupervisor(vUsuarioActual);
        },
        failure: function (response) {
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}

function fnSumarDias(fecha, dias) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
}

function fnInitMap() {
    //let vLat = 0, vLong = 0;
    //if ((vLatitud === 0) || (vLongitud === 0)) {
    //    vLat = 14.628434;
    //    vLong = -90.522713;
    //}
    //else {
    //    vLat = vLatitud;
    //    vLong = vLongitud;
    //};

    //const vUbicacion = { lat: vLat, lng: vLong };

    posicionInicial = { lat: 14.628434, lng: -90.522713 };
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                posicionInicial = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setCenter(posicionInicial);
            }
        );
    }

    map = new google.maps.Map(document.getElementById("map"),
        {
            zoom: 8,
            center: posicionInicial,
        });

    const marker = new google.maps.Marker({
        zoom: 8,
        position: posicionInicial,
        map: map,
    });

    //if (markerCluster) { borrarClustererMarkers(); }



}

var borrarClustererMarkers = function () {


    if (!markers) { return };
    var i = 0, l = markers.length;
    for (i; i < l; i++) {
        markers[i].setMap(null);
    }

    markers = [];

    markerCluster.clearMarkers();

};
// funcion de redireccion hacia edicion Reportes Viales
function redirect(url, TramoID) {
    if (TramoID == 0) {
        Swal.fire({
            title: 'Está a punto de editar un tramo municipal',
            text: "Algunas opciones no estarán disponibles",
            icon: 'info',
            //showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = url;
            }
        })
    } else {
        window.location.href = url;
    }
    
}


function getSubstrings(vTexto, vInicio, vFin) {
    return vTexto.substring(vInicio, vFin);
}

/*
function fnVerReporte() {
    fnInitMap(0, 0);
    var vAnio = $('#cmbPlanAnual').val();
    var vProyecto = $('#cmbProyecto').val();
    var vTramo = $('#cmbTramo').val();
    var vTipoDanio = $('#cmbTipoDanio').val();
    var vEstado = $('#cmbEstado').val();

    var vDesde = $('#desde').val();
    var vHasta = $('#hasta').val();

    if (vProyecto === '-1') vTramo = -1;

    if ((vAnio === null) || (vProyecto === null) || (vTramo === null) || (vTipoDanio === null) || (vDesde === '') || (vHasta === '') || (vEstado === null)) {
        Swal.fire("", "Debe seleccionar todos los filtros", "warning");
    }
    else {
        $.LoadingOverlay("show", {
            image: "",
            fontawesome: "fas fa-spinner fa-spin"
        });

        var vFechaDesde = getSubstrings(vDesde, 6, 10) + "-" + getSubstrings(vDesde, 3, 5) + "-" + getSubstrings(vDesde, 0, 2);
        var vFechaHasta = getSubstrings(vHasta, 6, 10) + "-" + getSubstrings(vHasta, 3, 5) + "-" + getSubstrings(vHasta, 0, 2);

        const url = urlbase + "api/ReportesViales/GetReportes/" + vAnio + "/" + vProyecto + "/0/" + vTramo + '/' + vTipoDanio + '/' + vEstado + '/' + vFechaDesde + '/' + vFechaHasta;

        fetch(proxyurl + url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                var estadoRespuesta = response.status;
                if (estadoRespuesta == 200) return response.json();
                else if (estadoRespuesta == 401) {
                    fnActualizarToken(_token);
                    var interval = setInterval(function () {
                        if (_token !== '') {
                            clearInterval(interval);
                        }
                    }, 1000);
                }
                else {
                    Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
                }
            })
            .then(data => {

                if (data !== undefined) {
                    fnRemoverMarcadores();
                    $('#tableReportes').dataTable().fnClearTable();
                    $('#tableReportes').dataTable().fnDestroy();
                    let cols = data.map((item) => `                    
                    ${pC1 = item.ReporteID + '|' + vAnio + '|' + vProyecto}
                    ${fnAgregarMarcador(item, vAnio, vProyecto)}
                    <tr>
                        <td class="spacer" ></td >
                        <td  style="width:175px">
                              <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                               data-content="Seleccionar" data-placement="top" onclick="fnEnfocarMarcador(${item.ReporteID},${item.TramoID});" style="cursor:pointer" data-dismiss="modal"  title="Ver en mapa">
                                <i class="fas fa-search fa-sm fa-fw"></i>
                              </button>
                              <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                               data-content="Seleccionar" data-placement="top" onclick="redirect('frmEdicionReportesViales.aspx?params=${btoa(pC1)}')" style="cursor:pointer" data-dismiss="modal"  title="Editar Reporte Vial">
                                <i class="fas fa-edit fa-sm fa-fw"></i>
                              </button>
                              <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                               data-content="Seleccionar" data-placement="top" onclick="fnImprimirReporte('${item.ReporteID}');" style="cursor:pointer" data-dismiss="modal"  title="Imprimir Reporte">
                                <i class="fas fa-print fa-sm fa-fw"></i>
                              </button>
                        </td>
                        <td>
                            ${item.FechaReporte}
                        </td>
                        <td>
                            ${item.TramoDesc}
                        </td>
                        <td>
                            ${item.Descripcion}
                        </td>
                        <td>
                            ${item.NombreDanio}
                        </td>
                        <td>
                            ${item.Prioridad}
                        </td>
                        <td>
                            ${item.UserName}
                        </td>
                        <td>
                            ${item.NombreEstado}
                        </td>
                        <td class="spacer" ></td>
                    </tr>`);
                    ///Dibuja Tramo en Mapa
                    var layer_tramos = new google.maps.Data();
                    var infoWindow = new google.maps.InfoWindow({
                        content: ""
                    });
                    let cols2 = data.map((item) =>
                        $.ajax({
                            url: `${urlbase}api/ReportesViales/GetTramos/` + item.TramoID,
                            headers: {
                                "Authorization": "Bearer " + token,
                                "Content-Type": "application/json",
                            },
                            success: (val) => {
                                bounds = new google.maps.LatLngBounds();

                                layer_tramos.addGeoJson(val);
                                features = map.data.addGeoJson(val);
                                map.data.setStyle({
                                    strokeColor: "red",
                                    strokeWeight: 4,
                                    fillOpacity: 0.9
                                })

                                map.setZoom(12);


                                map.data.addListener('click', function (event) {
                                    infoWindow.setContent('<div style="line-height:1.35;overflow:hidden;white-space:nowrap;"> Tramo: ' +
                                        event.feature.getProperty("name") + "<br/>" + event.feature.getProperty("descripcion") + "</div>");
                                    var anchor = new google.maps.MVCObject();
                                    anchor.set("position", event.latLng);
                                    infoWindow.open(map, anchor);
                                });
                            }
                        })
                    );

                    $("#tableReportes tbody").html(cols.join(""))
                    fnInicializaTableLeyesReportes();

                    //markerCluster = new MarkerClusterer(map, misMarkers,
                    //    {
                    //        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
                    //    });

                    $.LoadingOverlay("hide");
                }
                else {
                    $.LoadingOverlay("hide");
                    fnRemoverMarcadores();
                    $('#tableReportes').dataTable().fnClearTable();
                    $('#tableReportes').dataTable().fnDestroy();
                    Swal.fire("", "No existen reportes", "warning");
                }
            })
            .catch(function (error) {
                $.LoadingOverlay("hide");
                Swal.fire("", error.message + " ", "error");
            });
    }

}
*/

function fnVerReporte() {
    fnInitMap(0, 0);
   
    var vTramo = $('#cmbTramo').val();
    var vTipoDanio = $('#cmbTipoDanio').val();
    var vEstado = $('#cmbEstado').val();

    var vDesde = $('#desde').val();
    var vHasta = $('#hasta').val();
    
    

    if ( (vTramo === null) || (vTipoDanio === null) || (vDesde === '') || (vHasta === '') || (vEstado === null)) {
        Swal.fire("", "Debe seleccionar todos los filtros", "warning");
    }
    else {
        $.LoadingOverlay("show", {
            image: "",
            fontawesome: "fas fa-spinner fa-spin"
        });

        console.log(vTramo)
        if (vTramo != 'all' && vTramo != '[TramoMunicipal]') {
            console.log("ingresando if")
            let cadenaOriginal = vTramo;
            let cadena1 = cadenaOriginal.split("[");
            let cadena2 = cadena1[1].split("]");
            vTramo = cadena2[0];
             
        }

        var vFechaDesde = getSubstrings(vDesde, 6, 10) + "-" + getSubstrings(vDesde, 3, 5) + "-" + getSubstrings(vDesde, 0, 2);
        var vFechaHasta = getSubstrings(vHasta, 6, 10) + "-" + getSubstrings(vHasta, 3, 5) + "-" + getSubstrings(vHasta, 0, 2);

        console.log(urlbase + "api/ReportesViales/GetReportes/" + "0/" + vTramo + '/' + vTipoDanio + '/' + vEstado + '/' + vFechaDesde + '/' + vFechaHasta)

        const url = urlbase + "api/ReportesViales/GetReportes/" +  "0/" + vTramo + '/' + vTipoDanio + '/' + vEstado + '/' + vFechaDesde + '/' + vFechaHasta;

        fetch(proxyurl + url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                var estadoRespuesta = response.status;
                if (estadoRespuesta == 200) return response.json();
                else if (estadoRespuesta == 401) {
                    fnActualizarToken(_token);
                    var interval = setInterval(function () {
                        if (_token !== '') {
                            clearInterval(interval);
                        }
                    }, 1000);
                }
                else {
                    Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
                }
            })
            .then(data => {
                if (data !== undefined) {
                    fnRemoverMarcadores();
                    $('#tableReportes').dataTable().fnClearTable();
                    $('#tableReportes').dataTable().fnDestroy();               
                    let cols = data.map((item) =>                         
                    `${pC1 = item.ReporteID}
                    ${fnAgregarMarcador(item)}
                    <tr >
                        <td class="spacer"></td >
                        <td "style="width:175px;">
                              <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                               data-content="Seleccionar" data-placement="top" onclick="fnEnfocarMarcador(${item.ReporteID},${item.TramoID});" style="cursor:pointer" data-dismiss="modal"  title="Ver en mapa">
                                <i class="fas fa-search fa-sm fa-fw"></i>
                              </button>
                              <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                               data-content="Seleccionar" data-placement="top" onclick="redirect('frmEdicionReportesViales.aspx?params=${btoa(pC1)}','${item.TramoID}')" style="cursor:pointer" data-dismiss="modal"  title="Editar Reporte Vial">
                                <i class="fas fa-edit fa-sm fa-fw"></i>
                              </button>
                              <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                               data-content="Seleccionar" data-placement="top" onclick="fnImprimirReporte('${item.ReporteID}');" style="cursor:pointer" data-dismiss="modal"  title="Imprimir Reporte">
                                <i class="fas fa-print fa-sm fa-fw"></i>
                              </button>
                        </td>
                        <td>
                             ${moment(item.FechaReporte).format('YYYY/MM/DD')}
                        </td>
                        <td>
                            ${item.TramoDesc}
                        </td>
                        <td>
                            ${item.Descripcion}
                        </td>
                        <td>
                            ${item.NombreDanio}
                        </td>
                        <td>
                            ${item.Prioridad}
                        </td>
                        <td "style="width:143px;">
                            ${item.UserName}
                        </td>
                        <td>
                            ${item.NombreEstado}
                        </td>
                        <td class="spacer" ></td>
                    </tr>`);                       
                    //---- fin tabla
                    
                    ///Dibuja Tramo en Mapa
                    var layer_tramos = new google.maps.Data();
                    var infoWindow = new google.maps.InfoWindow({
                        content: ""
                    });
                    let cols2 = data.map((item) =>
                        $.ajax({
                            url: `${urlbase}api/ReportesViales/GetTramos/` + item.TramoID,
                            headers: {
                                "Authorization": "Bearer " + token,
                                "Content-Type": "application/json",
                            },
                            success: (val) => {
                                bounds = new google.maps.LatLngBounds();

                                layer_tramos.addGeoJson(val);
                                features = map.data.addGeoJson(val);
                                map.data.setStyle({
                                    strokeColor: "red",
                                    strokeWeight: 4,
                                    fillOpacity: 0.9
                                })

                                map.setZoom(12);


                                map.data.addListener('click', function (event) {
                                    infoWindow.setContent('<div style="line-height:1.35;overflow:hidden;white-space:nowrap;"> Tramo: ' +
                                        event.feature.getProperty("name") + "<br/>" + event.feature.getProperty("descripcion") + "</div>");
                                    var anchor = new google.maps.MVCObject();
                                    anchor.set("position", event.latLng);
                                    infoWindow.open(map, anchor);
                                });
                            }
                        })
                    );

                    $("#tableReportes tbody").html(cols.join(""))
                    fnInicializaTableLeyesReportes();
                    
                    
                    //markerCluster = new MarkerClusterer(map, misMarkers,
                    //    {
                    //        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
                    //    });

                    $.LoadingOverlay("hide");
                    
                }
                else {
                    $.LoadingOverlay("hide");
                    fnRemoverMarcadores();
                    $('#tableReportes').dataTable().fnClearTable();
                    $('#tableReportes').dataTable().fnDestroy();
                    Swal.fire("", "No existen reportes", "warning");
                }
            })
            .catch(function (error) {
                $.LoadingOverlay("hide");
                Swal.fire("", error.message + " ", "error");
            });
    }

}

function fnOcultarIMG(imagen) {
    imagen.style.display = 'none';
}

function fnAgregarMarcador(item) {
    //console.info(item);


    const posicion = { lat: item.Latitud, lng: item.Longitud };
    map.setCenter(posicion);

    var urlImagenMarcador = '../Images/Icons/marker_RPViales/marker_' + item.DanioID + '.png';

    //var abrirPagina = "window.open('frmMantoReporteVial.aspx?params=" + pC1 + "', '_blank');";

    //const contentString = '<div id="content" >' +
    //    '<div class="img-wrapper d-inline-block">' +
    //    '<img width="140" height="140" src="' + item.ReporteID + '" alt="Image" onerror="fnOcultarIMG(this);" >' +
    //    ' </div>' +
    //    '<div class="row" style="width: 290px; margin-top: 5px;" > ' +
    //    '<div class="col-9" >' + item.TramoDesc + '</div>' +
    //    '<div class="col-2 text-right mx-n1 my-2"  >' +
    //    '<button type="button" id="btnVer" class="btn btn-primary btn-xs" onclick="' + abrirPagina + '" style="align: right; padding-top:1px; padding-bottom:1px; padding-left:8px; padding-right:10px; font-size: 14px;" >Ver</button>' +
    //    '</div>' +
    //    '</div>' +
    //    '</div>';

    const contentString = contenidoVentanaProyecto(item);

    const infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 600
    });

    const marker = new google.maps.Marker({
        id: 'marker_' + item.ReporteID,
        position: posicion,
        map: map,
        icon: urlImagenMarcador,
    });

    marker.addListener("click", () => {
        infowindow.open(map, marker);
        map.panTo(marker.getPosition());
    });


    //misMarkers.push(marker);

    gmarkers.push(marker);
}

function fnEnfocarMarcador(ReporteID, TramoID) {
    //var layer_tramos = new google.maps.Data();
    var m = gmarkers.find(x => x.id === 'marker_' + ReporteID);
    google.maps.event.trigger(m, 'click');
    map.setZoom(12);

    //////Test TramoID
    //$.ajax({
    //    url: `${urlbase}api/ReportesViales/GetTramos/` + TramoID,
    //    headers: {
    //        "Authorization": "Bearer " + token,
    //        "Content-Type": "application/json",
    //    },
    //    success: (val) => {

    //        console.info(val);

    //        bounds = new google.maps.LatLngBounds();
    //        //var geo = JSON.parse(val);
    //        //console.info(geo);

    //        layer_tramos.addGeoJson(val);
    //        features = map.data.addGeoJson(val);

    //    }
    //})
}

function fnRemoverMarcadores() {
    for (i = 0; i < gmarkers.length; i++) {
        gmarkers[i].setMap(null);
    }
    gmarkers.length = 0;
}


function fnInicializaTableLeyesReportes() {
    $('#tableReportes').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        //scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin reportes para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ reportes",
            "infoEmpty": "Mostrando 0 de 0 de 0 reportes",
            "infoFiltered": "(Filtrado de _MAX_ total reportes)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ reportes",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay reportes encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {        
            let diasRestantes = calFechaLimite(aData[2], DiasNotificacion);
            //alert(diasRestantes + aData[2] + fechaRepor);
            if (aData[8] == "Ingresado" && diasRestantes <= 0) {
                $('td', nRow).css('background-color', '#f5c6cb');
                $('.spacer', nRow).css('background-color', '#fafafa');
            } /*else {
                let trid = $(nRow).attr("id");
                myTable.rows($(fila)).remove().draw();
                console.log(trid + "este es el id del ROW" )
                $('td',nRow).remove();
                //$('td',nRow).closest('tr').remove();
               //$(`#${idtr}`, nRow).remove();
                //$('td', nRow).remove();
               // 
               //$('td', nRow).remove();
            }*/
            
                /*switch (aData[8]) {
                    case 'Aprobado':
                      $('td', nRow).css('background-color', '#c3e6cb');
                      $('.spacer', nRow).css('background-color', '#fafafa');
                        break;
                    case 'Revision':
                        $('td', nRow).css('background-color', '#ffeeba');
                        $('.spacer', nRow).css('background-color', '#fafafa');
                        break;
                    case 'Rechazado':
                        $('td', nRow).css('background-color', '#c6c8ca');
                        $('.spacer', nRow).css('background-color', '#fafafa');
                        break;

                    default:
                }
            }*/
               
        }    
    });
}



$.ajax({
    url: `${urlbase}api/ReportesViales/GetDanios`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        if (val.length > 0) {
            $("#cmbTipoDanio").append(new Option("[Todos]", 0));

            let cols = val.map((item) => `<option value="${item.DanioId}">${item.NombreDanio}</option>`)

            $("#cmbTipoDanio").append(cols.join(""))
            $("#cmbTipoDanio").trigger("change")
        }
    }
})

$.ajax({
    url: `${urlbase}api/ReportesViales/GetEstados`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        if (val.length > 0) {
            $("#cmbEstado").append(new Option("[Todos]", 0));

            let cols = val.map((item) => `<option value="${item.IDReporteEstado}">${item.NombreEstado}</option>`)

            $("#cmbEstado").append(cols.join(""))
            $("#cmbEstado").trigger("change")
        }
    }
})


function contenidoVentanaProyecto(item) {

    var RutaAudio = '';

    var NotaVoz = item.NotaVoz;
    if (NotaVoz != 'N/A') {
        var RutaAudio = ReportesVialesPath + '/NotasVoz/ID_' + item.ReporteID + '/' + NotaVoz;
    }

    var pC1 = item.ReporteID ;
    return `<table style="width: 570px; border-collapse: collapse; border-color: #d4d4d4;" border="1px">
        <tbody>
            <tr>
                <td style="width: 100%;">
                    <table style="height: 235px; width: 100%; border-collapse: collapse; border-style: solid; border-color: #d4d4d4;" border="2">
                        <tbody>
                            <tr style="height: 0px;">
                                <td style="width: 100%; height: 0; background-color: #006699; text-align: center;" colspan="3">
                                    <p><span style="color: #ffffff;">${item.NombreDanio}</span></p>
                                    <p><span style="color: #ffffff;">${item.TramoDesc}</span></p>                                  
                                </td>
                            </tr>
                            <tr style="height: 0px;">
                                <td height="0px" style="background-color: #d2e9ff; color: #ffffff; font-family: Verdana, Geneva, sans-serif; text-align: right; font-size: 11px; width: 24%; border-color: #ffffff;">
                                    <p><strong><span style="color: #000000; font-weight:bold">Fecha</span></strong></p>
                                </td>
                                <td height="0px" style="background-color: #d2e9ff; color: #ffffff; font-size: 11px; font-family: Verdana, Geneva, sans-serif; width: 34.1664%; border-color: #ffffff;">
                                    <p><span style="color: #000000; ">${item.FechaReporte}</span></p>
                                </td>
                                <td height="0px" rowspan="5" style="border-style: solid; border-color: #d2e8fe; text-align:center; vertical-align: middle;">
                                     <iframe id="ifGrid" src="../ReportesViales/frmGridFotosReporte.aspx?vFotografias=${item.Fotografias.slice(1)}&vReporteID=${item.ReporteID}" scrolling="yes" name="cP1" runat="server"  frameborder="0"   style="overflow:hidden;height:92%;width:100%;position:relative">
                                     </iframe>
                                </td>
                            </tr>
                            <tr style="height: 0px;">
                                <td height="0px" style="background-color: #d2e9ff; color: #ffffff; font-family: Verdana, Geneva, sans-serif; height: 52px; text-align: right; font-size: 11px; width: 24%; border-color: #ffffff;">
                                    <p><strong><span style="color: #000000; font-weight:bold">Usuario reporta</span></strong></p>
                                </td>
                                <td height="0px" style="background-color: #d2e9ff; color: #ffffff; font-size: 11px; font-family: Verdana, Geneva, sans-serif; width: 34.1664%; border-color: #ffffff;">
                                    <p><span style="color: #000000;">${item.UserName}</span></p>
                                </td>
                            </tr>
                            <tr style="height: 0px;">
                                <td height="0px" style="background-color: #d2e9ff; color: #ffffff; font-family: Verdana, Geneva, sans-serif; height: 52px; text-align: right; font-size: 11px; width: 24%; border-color: #ffffff;">
                                    <p><strong><span style="color: #000000;font-weight:bold">Descripción</span></strong></p>
                                </td>
                                <td height="0px" style="background-color: #d2e9ff; color: #ffffff; font-size: 11px; font-family: Verdana, Geneva, sans-serif; width: 34.1664%; border-color: #ffffff;">
                                    <p><span style="color: #000000;">${item.Descripcion}</span></p>
                                </td>
                            </tr>
                            <tr style="height: 0px;">
                                <td height="0px" style="background-color: #d2e9ff; color: #ffffff; font-family: Verdana, Geneva, sans-serif; height: 52px; text-align: right; font-size: 11px; width: 24%; border-color: #ffffff;">
                                    <p><strong><span style="color: #000000;font-weight:bold">Estado</span></strong></p>
                                </td>
                                <td height="0px" style="background-color: #d2e9ff; color: #ffffff; font-size: 11px; font-family: Verdana, Geneva, sans-serif; width: 34.1664%; border-color: #ffffff;">
                                    <p><span style="color: #000000;">${item.NombreEstado}</span></p>
                                </td>
                            </tr>
                            <tr style="height: 18px;">
                              <td style="width: 107.097%; text-align: center;" colspan="3">
                                ${RutaAudio != '' ? `<p><div style="width:15rem; margin:2px; width:55%; padding:10px" id="divAudio">
                                            <label for='audioNota' id='lblNotadeVoz'>Escuchar nota de voz</label>
                                            <audio id="audioNota" class="form-control" style="background-image: url('../img/object.gif'); color: #ffffff; font-family: Verdana, Geneva, sans-serif; font-size: 11px; text-align: start;" title="Escuchar nota de voz" controls="controls">
                                                <source src="${RutaAudio}" type="audio/mpeg" />
                                                Your browser does not support the audio element.
                                            </audio></div></p>`: ''}
                                <p><a title="Ver m&aacute;s..." href="frmEdicionReportesViales?params=${btoa(pC1)}">Ver m&aacute;s</a></p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>`;
}

function replaceCommaLine(data) {
    //convert string to array and remove whitespace
    let dataToArray = data.split(',').map(item => item.trim());
    //convert array to string replacing comma with new line
    return dataToArray.join("<br>");
}

function fnCreaGaleria(Fotografias, reporteID) {
    var Fotos = Fotografias.slice(1);
    arrFotografias = Fotos.split(',');
    $.each(arrFotografias, function (i, obj) {
        htmlFotos += `<img width="140" height="140" src="${thumbnail}Tipo=12&MaxPixels=200&ReporteID=${reporteID}&Fotografia=${arrFotografias[i]}" alt="imagen galeria" />`;
    })
    return htmlFotos;
};


function fnImprimirReporte(idReporte) {
    /*var vReporte = 'rptReporteVial.mrt';
    var QueryString = '?Parameters=' + idReporte + ',"' + usuario + '"' + '&IdReporte=3' + '&Reporte=' + vReporte;
    var url = "../FrmVisorReporte.aspx" + QueryString;
    var params = [
        'height=' + screen.height,
        'width=' + screen.width,
        'fullscreen=yes' // only works in IE, but here for completeness
    ].join(',');
    window.open(url, '_blank', params);*/
    let asociado = 0;
    opendialog(`/VisorInformesSti?ReporteID=${512}&pReporteID=${idReporte}&pUsuarioCreo=${usuario}&idPadre=${idReporte}&asociado=${asociado}`);
}
/*
$("#btnGenerarReporteGeneral").click(function () {
    var vReporte = 'rptReporteVialListado.mrt';
    let pTramo = $("#cmbTramo").val();
    let Danio = $("#cmbTipoDanio").val();
    let Estado = $("#cmbEstado").val();
    let fechainicio = $("#desde").val();
    let fechafin = $("#hasta").val();

    if (pTramo != 'all' && pTramo != '[TramoMunicipal]') {
        console.log("ingresando if")
        let cadenaOriginal = pTramo;
        let cadena1 = cadenaOriginal.split("[");
        let cadena2 = cadena1[1].split("]");
        pTramo = cadena2[0];

    }

    var QueryString = '?Parameters=' + pTramo + ',' + Danio + ',' + Estado + ',"' + fechainicio + '","' + fechafin + '"' + '&IdReporte=4' + '&Reporte=' + vReporte;
    var url = "../FrmVisorReporte.aspx" + QueryString;
    var params = [
        'height=' + screen.height,
        'width=' + screen.width,
        'fullscreen=yes' // only works in IE, but here for completeness
    ].join(',');
    window.open(url, '_blank', params);
})
*/

function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Reporte General",
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
let reporteValidacionSinAtencion = 0; //variabel global

$("#btnGenerarReporteGeneral").click(function () {
    
    let pTramo = $("#cmbTramo").val();
    let pDanioID = $("#cmbTipoDanio").val();
    let pIDReporteEstado = $("#cmbEstado").val();
    let pFechaDesde = $("#desde").val();
    let pFechaHasta = $("#hasta").val();

    let fechaDes = moment(pFechaDesde, "DD/MM/YYYY");
    let fechaFormateadaDes = moment(fechaDes).format('YYYY/MM/DD' );

    let fechaHas = moment(pFechaHasta, "DD/MM/YYYY");
    let fechaFormateadaHas = moment(fechaHas).format('YYYY/MM/DD');

   
   

    //alert(pFechaDesde + " " + pFechaHasta + "-------" + fechaFormateadaDes + " " + fechaFormateadaHas);

    if (pTramo != 'all' && pTramo != '[TramoMunicipal]') {
        console.log("ingresando if")
        let cadenaOriginal = pTramo;
        let cadena1 = cadenaOriginal.split("[");
        let cadena2 = cadena1[1].split("]");
        pTramo = cadena2[0];

    }

    if (reporteValidacionSinAtencion == 1) {
        //alert("entro al if del reporte sin atencion")
        let pTramoSin = 'all';
        let pDanioIDSin = 0;
        let pIDReporteEstadoSin = 0;
        let pFechaDesdeSin = '01/01/2000';
        opendialog(`/VisorInformessti?ReporteID=${5555}&pTramo=${pTramoSin}&pDanioID=${pDanioIDSin}&pIDReporteEstado=${pIDReporteEstadoSin}&pFechaDesde=${pFechaDesdeSin}&pFechaHasta=${fechaFormateadaHas}`);
        reporteValidacionSinAtencion = 0;
        $("#btnGenerarReporteGeneral").text('GENERAR REPORTE');
    } else {   
        opendialog(`/VisorInformessti?ReporteID=${5555}&pTramo=${pTramo}&pDanioID=${pDanioID}&pIDReporteEstado=${pIDReporteEstado}&pFechaDesde=${fechaFormateadaDes}&pFechaHasta=${fechaFormateadaHas}`);
    }

   
})

//----- cambios tabla alerta por en un lapso de tiempo cambios desde 30/11/2022 variable = fechaRepor color danger #f5c6cb----------------------------------------------------------------------
/*$("#btnPrueba").click(function () {
    // envio de fecha a funcion sumarDias
    //var d = new Date('2022-12-07');
    //console.log("fecha date: " + d);

    var fechaInicio = new Date(moment(fechaRepor).format('YYYY/MM/DD')); //new Date('2022-12-07');
    console.log("fecha del reporte: " + fechaInicio);
    let fechaSumarDias = sumarDias(fechaInicio, 30)
    console.log(fechaSumarDias);

    //envio de fecheas a fucnion calDiasRestantes
    let fechaActual = new Date();
    let fechaFin = new Date(fechaSumarDias);

    calDiasRestantes(fechaActual, fechaFin);

$('td').css('background-color', '#FFFF');

     
});*/



/*function colorear() {
   //validacion tiempo limite estado ingresado
   //let estadoReporte = item.FechaReporte;//data.map(function (item1) { return item1.NombreEstado });
   //let fechaReporte = item.NombreEstado;//data.map(function (item1) { return item1.FechaReporte });
   let diasRestantes = calFechaLimite(fechaRepor);

   if (estadoRepor == 'Ingresado' && diasRestantes <= 0) {
      alert("entro al if validar estado");
       //$('td').css('background-color', '#f5c6cb');
       $('td').css('background-color', '#f5c6cb');
      $('.spacer').css('background-color', '#fafafa')
   }
                    //fin validacion tiempo limite estado ingresado
}*/



//----- calcular fecha liminte

function fnObtenerDiasNotificacion() {
    $.ajax({
        url: `${urlbase}api/ProyectosPorTramo/ObtDiasNotificacion`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            val.map((item) => {
                DiasNotificacion = item.DiasNotificacion; 
            });
        }
    })
}

function calFechaLimite(fecha, DiasNotificacion) {
    var fechaInicio = new Date(moment(fecha).format('YYYY/MM/DD')); //new Date('2022-12-07');
    // console.log("fecha del reporte: " + fechaInicio);
    let fechaSumarDias = sumarDias(fechaInicio, DiasNotificacion)
    //console.log(fechaSumarDias);

    let fechaActual = new Date();
    let fechaFin = new Date(fechaSumarDias);
    let diasRestantes = calDiasRestantes(fechaActual, fechaFin);
    return diasRestantes; 

}

function calDiasRestantes(date1, date2) {  /// calcula dias faltantes
    let diferenciaTiempo = date2.getTime() - date1.getTime();
    let diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 3600 * 24));
    return diferenciaDias;
    console.log(diferenciaDias);
}
// funcion sumarDias toma la fecha de la creacion del reporte y le suma 30 Dias. 
function sumarDias(fecha, dias) { // agrega dias a la fecha establecida 
    fecha.setDate(fecha.getDate() + dias);
    let fechaFormateada = fecha.toLocaleDateString('en-US');
    return moment(fechaFormateada).format('YYYY/MM/DD');  
}
//----- fin  calcular fecha liminte

//----- calcular restar dias para consulta de reportes los ultimos 30 dias
function resDias(fecha, dias) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
}

//console.log(resDias(d, -30));

//----- fin calcular restar dias para consulta de reportes los ultimos 30 dias

function fnAlertaDeReportes(numReportes) {
    let conta = numReportes;
    let fecha = new Date();
    let d = new Date();
    let fechaFormateada = moment(fecha).format('DD/MM/YYYY');
    let fechaTreintaDias = resDias(d, -30);
    let fechaTreintaDiasF = moment(fechaTreintaDias).format('DD/MM/YYYY');

    Swal.fire({
        title: 'Cuenta con ' + ' ' + conta + ' ' + 'reportes ingresados sin atención',
        text: "Presione ver reportes si desea atenderlos",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ver Reportes',
        cancelButtonText: 'Cancelar'
    })
    .then((result) => {
        if (result.isConfirmed) {
            reporteValidacionSinAtencion = 1;
            $("#btnGenerarReporteGeneral").text('GENERAR REPORTE SIN ATENCION');
            fnVerReporteP('01/01/2000', fechaFormateada); 
        } else {
            //alert(fechaTreintaDiasF + " " + fechaFormateada)
            fnVerReporteC(fechaTreintaDiasF, fechaFormateada);
        }
    })

}
  
//--------fin cambios 30/11/2022

// ---  carga tabla reportes para mensaje de notificacion 

function fnNumReportes() {
    let contadorF = 0;
    let con = 0;

    //nuevo url
    let fechafin = new Date();
    let fechaFormateada = moment(fechafin).format('DD/MM/YYYY');
    var vTramo = 'all';
    var vTipoDanio = 0;
    var vEstado = 0;

    var vDesde = '01/01/2000';
    var vHasta = fechaFormateada;



    var vFechaDesde = getSubstrings(vDesde, 6, 10) + "-" + getSubstrings(vDesde, 3, 5) + "-" + getSubstrings(vDesde, 0, 2);
    var vFechaHasta = getSubstrings(vHasta, 6, 10) + "-" + getSubstrings(vHasta, 3, 5) + "-" + getSubstrings(vHasta, 0, 2);

    //console.log(urlbase + "api/ReportesViales/GetReportes/" + "0/" + vTramo + '/' + vTipoDanio + '/' + vEstado + '/' + vFechaDesde + '/' + vFechaHasta)

    const url = urlbase + "api/ReportesViales/GetReportes/" + "0/" + vTramo + '/' + vTipoDanio + '/' + vEstado + '/' + vFechaDesde + '/' + vFechaHasta;

    $.ajax({
        url:url,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            val.map((item) => {
                let diasRestantes = calFechaLimite(item.FechaReporte, DiasNotificacion);
                con = con + 1;
                //console.log(diasRestantes , con );
                if (diasRestantes <= 0 && item.NombreEstado == 'Ingresado') {
                    contadorF = contadorF + 1;
                }
            });

            fnAlertaDeReportes(contadorF);
        }
    })
}

//funcion ver reportes para carga de los ultimos 30 dias------------------------------------------------------
function fnVerReporteC(fechain, fechafin) {
    fnInitMap(0, 0);

    var vTramo = 'all';
    var vTipoDanio = 0;
    var vEstado = 0;

    var vDesde = fechain;
    var vHasta = fechafin;



        var vFechaDesde = getSubstrings(vDesde, 6, 10) + "-" + getSubstrings(vDesde, 3, 5) + "-" + getSubstrings(vDesde, 0, 2);
        var vFechaHasta = getSubstrings(vHasta, 6, 10) + "-" + getSubstrings(vHasta, 3, 5) + "-" + getSubstrings(vHasta, 0, 2);

        console.log(urlbase + "api/ReportesViales/GetReportes/" + "0/" + vTramo + '/' + vTipoDanio + '/' + vEstado + '/' + vFechaDesde + '/' + vFechaHasta)

        const url = urlbase + "api/ReportesViales/GetReportes/" + "0/" + vTramo + '/' + vTipoDanio + '/' + vEstado + '/' + vFechaDesde + '/' + vFechaHasta;

        fetch(proxyurl + url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                var estadoRespuesta = response.status;
                if (estadoRespuesta == 200) return response.json();
                else if (estadoRespuesta == 401) {
                    fnActualizarToken(_token);
                    var interval = setInterval(function () {
                        if (_token !== '') {
                            clearInterval(interval);
                        }
                    }, 1000);
                }
                else {
                    Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
                }
            })
            .then(data => {

                if (data !== undefined) {
                    fnRemoverMarcadores();
                    $('#tableReportes').dataTable().fnClearTable();
                    $('#tableReportes').dataTable().fnDestroy();
                    let cols = data.map((item) =>
                        `${pC1 = item.ReporteID}
                    ${fnAgregarMarcador(item)}
                    <tr >
                        <td class="spacer"></td >
                        <td  style="width:175px;">
                              <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                               data-content="Seleccionar" data-placement="top" onclick="fnEnfocarMarcador(${item.ReporteID},${item.TramoID});" style="cursor:pointer" data-dismiss="modal"  title="Ver en mapa">
                                <i class="fas fa-search fa-sm fa-fw"></i>
                              </button>
                              <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                               data-content="Seleccionar" data-placement="top" onclick="redirect('frmEdicionReportesViales.aspx?params=${btoa(pC1)}','${item.TramoID}')" style="cursor:pointer" data-dismiss="modal"  title="Editar Reporte Vial">
                                <i class="fas fa-edit fa-sm fa-fw"></i>
                              </button>
                              <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                               data-content="Seleccionar" data-placement="top" onclick="fnImprimirReporte('${item.ReporteID}');" style="cursor:pointer" data-dismiss="modal"  title="Imprimir Reporte">
                                <i class="fas fa-print fa-sm fa-fw"></i>
                              </button>
                        </td>
                        <td>
                             ${moment(item.FechaReporte).format('YYYY/MM/DD')}
                        </td>
                        <td>
                            ${item.TramoDesc}
                        </td>
                        <td>
                            ${item.Descripcion}
                        </td>
                        <td>
                            ${item.NombreDanio}
                        </td>
                        <td>
                            ${item.Prioridad}
                        </td>
                        <td>
                            ${item.UserName}
                        </td>
                        <td>
                            ${item.NombreEstado}
                        </td>
                        <td class="spacer" ></td>
                            ${fechaRepor = item.FechaReporte}
                    </tr>`);
                    //---- fin tabla

                    ///Dibuja Tramo en Mapa
                    var layer_tramos = new google.maps.Data();
                    var infoWindow = new google.maps.InfoWindow({
                        content: ""
                    });
                    let cols2 = data.map((item) =>
                        $.ajax({
                            url: `${urlbase}api/ReportesViales/GetTramos/` + item.TramoID,
                            headers: {
                                "Authorization": "Bearer " + token,
                                "Content-Type": "application/json",
                            },
                            success: (val) => {
                                bounds = new google.maps.LatLngBounds();

                                layer_tramos.addGeoJson(val);
                                features = map.data.addGeoJson(val);
                                map.data.setStyle({
                                    strokeColor: "red",
                                    strokeWeight: 4,
                                    fillOpacity: 0.9
                                })

                                map.setZoom(12);


                                map.data.addListener('click', function (event) {
                                    infoWindow.setContent('<div style="line-height:1.35;overflow:hidden;white-space:nowrap;"> Tramo: ' +
                                        event.feature.getProperty("name") + "<br/>" + event.feature.getProperty("descripcion") + "</div>");
                                    var anchor = new google.maps.MVCObject();
                                    anchor.set("position", event.latLng);
                                    infoWindow.open(map, anchor);
                                });
                            }
                        })
                    );

                    $("#tableReportes tbody").html(cols.join(""))
                    fnInicializaTableLeyesReportes();


                    //markerCluster = new MarkerClusterer(map, misMarkers,
                    //    {
                    //        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
                    //    });

                    $.LoadingOverlay("hide");

                }
                else {
                    $.LoadingOverlay("hide");
                    fnRemoverMarcadores();
                    $('#tableReportes').dataTable().fnClearTable();
                    $('#tableReportes').dataTable().fnDestroy();
                    Swal.fire("", "No existen reportes", "warning");
                }
            })
            .catch(function (error) {
                $.LoadingOverlay("hide");
                Swal.fire("", error.message + " ", "error");
            });
    

}

// fin-------------------------------------------------------------------------------------------------

// -------------------------------------------------funcion ver reporte para  reportes sin atencion -------------------------------------------------
function fnVerReporteP(fechaD, fechaH) {
    fnInitMap(0, 0);

    var vTramo = 'all';
    var vTipoDanio = 0;
    var vEstado = 0;

    var vDesde = fechaD;
    var vHasta = fechaH;



    var vFechaDesde = getSubstrings(vDesde, 6, 10) + "-" + getSubstrings(vDesde, 3, 5) + "-" + getSubstrings(vDesde, 0, 2);
    var vFechaHasta = getSubstrings(vHasta, 6, 10) + "-" + getSubstrings(vHasta, 3, 5) + "-" + getSubstrings(vHasta, 0, 2);

   // console.log(urlbase + "api/ReportesViales/GetReportes/" + "0/" + vTramo + '/' + vTipoDanio + '/' + vEstado + '/' + vFechaDesde + '/' + vFechaHasta)

    const url = urlbase + "api/ReportesViales/GetReportesSinAtencion/" + "0/" + vTramo + '/' + vTipoDanio + '/' + vEstado + '/' + vFechaDesde + '/' + vFechaHasta;

    fetch(proxyurl + url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            var estadoRespuesta = response.status;
            if (estadoRespuesta == 200) return response.json();
            else if (estadoRespuesta == 401) {
                fnActualizarToken(_token);
                var interval = setInterval(function () {
                    if (_token !== '') {
                        clearInterval(interval);
                    }
                }, 1000);
            }
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {

            if (data !== undefined) {
                fnRemoverMarcadores();
                $('#tableReportes').dataTable().fnClearTable();
                $('#tableReportes').dataTable().fnDestroy();

                let filtroData = data.filter(datos => datos.NombreEstado == 'Ingresado' && datos.DiasRestantes <=0 );
                let cols = filtroData.map((item) =>
                    `${pC1 = item.ReporteID}
                    ${fnAgregarMarcador(item)}
                    <tr>
                        <td class="spacer"></td >
                        <td  style="width:175px;">
                              <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                               data-content="Seleccionar" data-placement="top" onclick="fnEnfocarMarcador(${item.ReporteID},${item.TramoID});" style="cursor:pointer" data-dismiss="modal"  title="Ver en mapa">
                                <i class="fas fa-search fa-sm fa-fw"></i>
                              </button>
                              <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                               data-content="Seleccionar" data-placement="top" onclick="redirect('frmEdicionReportesViales.aspx?params=${btoa(pC1)}','${item.TramoID}')" style="cursor:pointer" data-dismiss="modal"  title="Editar Reporte Vial">
                                <i class="fas fa-edit fa-sm fa-fw"></i>
                              </button>
                              <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                               data-content="Seleccionar" data-placement="top" onclick="fnImprimirReporte('${item.ReporteID}');" style="cursor:pointer" data-dismiss="modal"  title="Imprimir Reporte">
                                <i class="fas fa-print fa-sm fa-fw"></i>
                              </button>
                        </td>
                        <td>
                            ${moment(item.FechaReporte).format('YYYY/MM/DD')}
                        </td>
                        <td>
                            ${item.TramoDesc}
                        </td>
                        <td>
                            ${item.Descripcion}
                        </td>
                        <td>
                            ${item.NombreDanio}
                        </td>
                        <td>
                            ${item.Prioridad}
                        </td>
                        <td>
                            ${item.UserName}
                        </td>
                        <td>
                            ${item.NombreEstado}
                        </td>
                        <td class="spacer" ></td>
                            ${fechaRepor = item.FechaReporte}
                    </tr>`);
                //---- fin tabla

                ///Dibuja Tramo en Mapa
                var layer_tramos = new google.maps.Data();
                var infoWindow = new google.maps.InfoWindow({
                    content: ""
                });
                let cols2 = data.map((item) =>
                    $.ajax({
                        url: `${urlbase}api/ReportesViales/GetTramos/` + item.TramoID,
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Content-Type": "application/json",
                        },
                        success: (val) => {
                            bounds = new google.maps.LatLngBounds();

                            layer_tramos.addGeoJson(val);
                            features = map.data.addGeoJson(val);
                            map.data.setStyle({
                                strokeColor: "red",
                                strokeWeight: 4,
                                fillOpacity: 0.9
                            })

                            map.setZoom(12);


                            map.data.addListener('click', function (event) {
                                infoWindow.setContent('<div style="line-height:1.35;overflow:hidden;white-space:nowrap;"> Tramo: ' +
                                    event.feature.getProperty("name") + "<br/>" + event.feature.getProperty("descripcion") + "</div>");
                                var anchor = new google.maps.MVCObject();
                                anchor.set("position", event.latLng);
                                infoWindow.open(map, anchor);
                            });
                        }
                    })
                );

                $("#tableReportes tbody").html(cols.join(""))
                fnInicializaTableLeyesReportesN();


                //markerCluster = new MarkerClusterer(map, misMarkers,
                //    {
                //        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
                //    });

                $.LoadingOverlay("hide");

            }
            else {
                $.LoadingOverlay("hide");
                fnRemoverMarcadores();
                $('#tableReportes').dataTable().fnClearTable();
                $('#tableReportes').dataTable().fnDestroy();
                Swal.fire("", "No existen reportes", "warning");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");
        });
}
//------------------------------------------------- fin reportes sin atencion -------------------------------------------------

function fnOcultarDatosTbl() {
    var table = $('#tableReportes').DataTable();
    table.row('.selected').remove().draw(false);
}

function fnInicializaTableLeyesReportesN() {
    $('#tableReportes').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        //scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin reportes para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ reportes",
            "infoEmpty": "Mostrando 0 de 0 de 0 reportes",
            "infoFiltered": "(Filtrado de _MAX_ total reportes)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ reportes",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay reportes encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            let diasRestantes = calFechaLimite(aData[2], DiasNotificacion);
            //alert(diasRestantes + aData[2] + fechaRepor);
            if (aData[8] == "Ingresado" && diasRestantes <= 0) {
                $('td', nRow).css('background-color', '#f5c6cb');
                $('.spacer', nRow).css('background-color', '#fafafa');
            } //else {
               // $('td', nRow).remove();
                //$(nRow).addClass('selected');
                //var table = $('#tableReportes').DataTable();
                //table.row('.selected').remove().draw(false);

              
                /*$(nRow).addClass('selected');
                fnOcultarDatosTbl();
                let trid = $(nRow).attr("id");
                console.log(trid + "este es el id del ROW");
                $(nRow).addClass('selected');
                var table = $('#tableReportes').DataTable();
                table.row('.selected').remove().draw(false);*/
                

                //
                //$('td',nRow).closest('tr').remove();
               //$(`#${idtr}`, nRow).remove();
                //$('td', nRow).remove();
               // 
               //$('td', nRow).remove();
           // }
           
            /*switch (aData[8]) {
                case 'Aprobado':
                  $('td', nRow).css('background-color', '#c3e6cb');
                  $('.spacer', nRow).css('background-color', '#fafafa');
                    break;
                case 'Revision':
                    $('td', nRow).css('background-color', '#ffeeba');
                    $('.spacer', nRow).css('background-color', '#fafafa');
                    break;
                case 'Rechazado':
                    $('td', nRow).css('background-color', '#c6c8ca');
                    $('.spacer', nRow).css('background-color', '#fafafa');
                    break;

                default:
            }
        }*/

        }
    });
}
//--- fin pruea carga tabla

//validacionn de boton imprimir 
$('#cmbTramo, #cmbTipoDanio, #cmbEstado').change(function () {
    reporteValidacionSinAtencion = 0;
    $("#btnGenerarReporteGeneral").text('GENERAR REPORTE');
});

$('#desde, #hasta').change(function () {
    reporteValidacionSinAtencion = 0;
    $("#btnGenerarReporteGeneral").text('GENERAR REPORTE');
});

$('#desde-dp').on('change.datetimepicker', function (e) {
    reporteValidacionSinAtencion = 0;
    $("#btnGenerarReporteGeneral").text('GENERAR REPORTE');
});

$('#hasta-dp').on('change.datetimepicker', function (e) {
    reporteValidacionSinAtencion = 0;
    $("#btnGenerarReporteGeneral").text('GENERAR REPORTE');
});