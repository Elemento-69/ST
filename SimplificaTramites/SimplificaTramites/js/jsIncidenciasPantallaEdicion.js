var vToken;
var vUsuarioActual;
var proxyurl;
var baseHostURL;

var vModoPantalla = "N";
var vIdIncidencia = -1;

var planAnualSeleccionar = 0;
var progSeleccionar = '';
var proySeleccionar = '';
var tramoSeleccionar = '';
var vRolesUsuario;
var vVerificarSupervisor;
var vPlanAnualS;
var vProgramaS;

$(document).ready(function () {
    //Verificar si el modo es NUEVO o EDICIÓN
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.has('incidenciaID')) {
        vModoPantalla = "E";
        vIdIncidencia = urlParams.get('incidenciaID');
        if (vIdIncidencia <= 0) {
            vModoPantalla = "N";
            vIdIncidencia = -1;
        }
    } else {
        vModoPantalla = "N";
        vIdIncidencia = -1;
    }

    fnInicializaTableArchivosAdjuntos();
    
    fnConsultarToken();
    fnObtenerRoles();
})
function fnObtenerRoles() {
    $.ajax({
        type: "POST",
        url: "frmIncidenciasEdicion.aspx/fObtenerRoles",
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
                    $("#divPlanPrograma").toggle(false);
                    fnCargarProyectos();
                }
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

function configPantalla() {
    var esEdicion = (vModoPantalla == "E");
    var divmostrarEnModoEdicion = document.getElementById("mostrarEnModoEdicion");
    if (esEdicion) {
        divmostrarEnModoEdicion.style.display = 'block';          // Show
        fnMostrarRegistro();
        fnCargarFotografias();
        fnCargarVideos();
        fnCargarArchivosAdjuntos();        
    } else {
        divmostrarEnModoEdicion.style.display = 'none';           // Hide
    }
}

// Initialize and add the map
var map;
var gmarkers = [];

function initMap() {
    posicionInicial = { lat: 14.628434, lng: -90.522713 };
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                posicionInicial = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
            },
            () => {
                //error
            }
        );
    } else {
        // Browser doesn't support Geolocation                
    }

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: posicionInicial,
    });

    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
        content: "Seleccione en el mapa la ubicaci&oacuten de la incidencia",
        position: posicionInicial,
    });
    map.setMapTypeId('satellite');
    infoWindow.open(map);
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.
        infoWindow.close();
        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
        });
        infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );
        infoWindow.open(map);

        document.getElementById('txtLatitud').value = mapsMouseEvent.latLng.toJSON().lat;
        document.getElementById('txtLongitud').value = mapsMouseEvent.latLng.toJSON().lng;

        agregarMarcadorUbicacion(mapsMouseEvent.latLng.toJSON().lat, mapsMouseEvent.latLng.toJSON().lng);
    });
}

function fnCargarPlanesAnuales() {
 
    var url = baseHostURL + "/api/PlanesAnuales/ObtenerPlanesAnuales/" 

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
                        fnCargarPlanesAnuales();
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
                        registro.AnioID +
                        '</option>');
                })

                document.getElementById('cmbPlanAnual1').onchange = function () { fnCargarProgramas(); };

                if (planAnualSeleccionar != 0) {
                    $('#cmbPlanAnual1').val(planAnualSeleccionar);                    
                } else {
                    document.getElementById('cmbPlanAnual1').selectedIndex = 0;
                }                
 
                $('#cmbPlanAnual1').trigger('change');

                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " abc", "success");
        });
}

function fnCargarProgramas() {
    const url = baseHostURL + "api/Programa/Get/" + $("#cmbPlanAnual1").val() ;
    
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
                //  Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            if (data != undefined) {
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
                if (progSeleccionar != '') {
                    $('#cmbPrograma1').val(progSeleccionar);
                } else {
                    document.getElementById('cmbPrograma1').selectedIndex = 0;
                }

                $('#cmbPrograma1').trigger('change');

                $.LoadingOverlay("hide");
            }
        }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " xyz", "success");
        });
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

                        var proyectoSeleccionarEnCombo = false;

                        datos.forEach(function (registro) {
                            $("#cmbProyecto1").append('<option value=' +
                                registro.ProyectoCodigo + '>' +
                                registro.ProyectoCodigo +
                                '</option>');

                            if (proySeleccionar != '' && !proyectoSeleccionarEnCombo) {
                                if (proySeleccionar == registro.ProyectoCodigo) {
                                    proyectoSeleccionarEnCombo = true;
                                }
                            }                            
                        })

                        if (proySeleccionar != '' && !proyectoSeleccionarEnCombo) {
                            $("#cmbProyecto1").append('<option value=' +
                                proySeleccionar + '>' +
                                proySeleccionar +
                                '</option>');                            
                        }                        
                        
                        if (proySeleccionar != '') {
                            $('#cmbProyecto1').val(proySeleccionar);                            
                        } else {
                            document.getElementById('cmbProyecto1').selectedIndex = 0;                            
                        }
                        
                        document.getElementById('cmbProyecto1').onchange = function () { fnCargarTramos(); };
                        $('#cmbProyecto1').trigger('change');

                        $.LoadingOverlay("hide");
                    }
                }
            })
            .catch(function (error) {
                $.LoadingOverlay("hide");
                //Swal.fire("", error.message + " proy", "success");
            });
   
}

function fnCargarTramos() {    
    if ($("#cmbPlanAnual1").val() != null && $("#cmbProyecto1").val() != null) {
        const url = baseHostURL + "/api/Tramo/Get/" + vPlanAnualS + "/" + $("#cmbProyecto1").val();

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
                $("#cmbTramo").select2({ theme: "bootstrap" });
                if (datos.length > 0) {
                    datos.forEach(function (registro) {
                        if (registro.TramoID.toString() != '0') {
                            $("#cmbTramo").append('<option value=' +
                                registro.TramoID.toString() + '>' +
                                '[' + registro.TramoID.toString() + '] ' + registro.TramoDesc +
                                '</option>');
                        }
                    })

                    if (vModoPantalla == "N") {
                        document.getElementById('cmbTramo').selectedIndex = 0;
                    } else {

                        var indiceSeleccionar = 0;
                        var objSelect = document.getElementById("cmbTramo");
                        for (var i = 0; i < objSelect.options.length; i++) {
                            if (objSelect.options[i].value == tramoSeleccionar) {
                                indiceSeleccionar = i;
                                break;
                            }
                        }
                        document.getElementById('cmbTramo').selectedIndex = indiceSeleccionar;
                    }

                    $('#cmbTramo').trigger('change');
                    $.LoadingOverlay("hide");

                }

            })
            .catch(function (error) {
                $.LoadingOverlay("hide");
                Swal.fire("", error.message + " ", "success");

            });
    }
}

function fnCargarTiposIncidencia() {
    const url = baseHostURL + "/api/Incidencia/TiposIncidencia/listar";

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
            $("#cmbTipoIncidencia").select2({ theme: "bootstrap" });
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
    const url = baseHostURL + "/api/Incidencia/Severidad/listar";

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
            $("#cmbSeveridad").select2({ theme: "bootstrap" });
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
    const url = baseHostURL + "/api/Incidencia/Estados/listar";

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
            $("#cmbEstado").select2({ theme: "bootstrap" });
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

function fnMostrarRegistro() {
    const url = baseHostURL + "api/Incidencia/obtener/" + vIdIncidencia;

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
                        fnMostrarRegistro();
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

            if (datos.length > 0) {
                datos.forEach(function (registro) {                    
                    planAnualSeleccionar = registro.AnioID;
                    $('#cmbPlanAnual1').val(planAnualSeleccionar);
                    progSeleccionar = registro.ProgramaCodigo;
                    proySeleccionar = registro.ProyectoCodigo;
                    tramoSeleccionar = registro.TramoID;
                    $('#cmbPlanAnual1').trigger('change');

                    if (registro.FechaIncidencia) {
                        var fechaIncidencia = registro.FechaIncidencia;
                        var fechaIncidenciaFormateada = fechaIncidencia.substring(8, 10) + '/' + fechaIncidencia.substring(5, 7) + '/' + fechaIncidencia.substring(0, 4);
                        $("#dtFechaincidencia").val(fechaIncidenciaFormateada);
                    } else {
                        $("#dtFechaincidencia").val('');
                    }

                    $("#txtPlazoResolucion").val(registro.PlazoResolucion);

                    $("#cmbTipoIncidencia").val(registro.IdTipo);

                    $("#cmbSeveridad").val(registro.IdSeveridad);

                    $("#txtEstacionInicial").val(registro.EstacionInicial);

                    if (registro.EstacionFinal) {
                        $("#txtEstacionFinal").val(registro.EstacionFinal);
                    }

                    $("#txtLatitud").val(registro.Latitud);

                    $("#txtLongitud").val(registro.Longitud);

                    agregarMarcadorUbicacion(registro.Latitud, registro.Longitud);

                    $("#cmbEstado").val(registro.IdEstado);

                    $("#chkSenalizacionPreventiva").prop("checked", registro.senalizacionpreventiva);

                    $("#txtDescripcion").val(registro.Descripcion);

                    $("#txtAccionInicial").val(registro.AccionInicial);

                    $("#txtAccionesCorrectivas").val(registro.AccionesCorrectivas);

                    $("#txtObservaciones").val(registro.Observaciones);

                    var today = new Date();
                    var dd = String(today.getDate()).padStart(2, '0');
                    var mm = String(today.getMonth() + 1).padStart(2, '0');
                    var yyyy = today.getFullYear();

                    $("#txtLatitudFoto").val(registro.Latitud);
                    $("#txtLongitudFoto").val(registro.Longitud);
                    $("#dtFechaFoto").val(dd + '/' + mm + '/' + yyyy);

                    $("#txtLatitudVideo").val(registro.Latitud);
                    $("#txtLongitudVideo").val(registro.Longitud);
                    $("#dtFechaVideo").val(dd + '/' + mm + '/' + yyyy);                    
                })
            }

        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");

        });
}

function fnCargarFotografias() {
    const url = baseHostURL + "api/IncidenciasApp/obtenerConsultaFotosPorIncidencia/" + vIdIncidencia;

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
                        fnCargarFotografias();
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

            document.getElementById("dFotos").innerHTML = "";

            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    var divFoto = document.createElement('div');
                    divFoto.classList.add('img-wrapper');
                    divFoto.classList.add('d-inline-block');

                    var foto = document.createElement("img");
                    foto.src = thumbnail + 'Tipo=8&MaxPixels=200&Fotografia=' + registro.NombreArchivo + '&ID=' + registro.IdIncidencia 
                   // foto.src = registro.urlArchivoMultimedia;
                    foto.height = "140";
                    foto.width = "140";
                    foto.alt = "";
                    //foto.onerror = function () {
                    //    this.src = window.location.origin + "/Images/dummy_143x143.png";
                    //};
                    foto.onclick = function () {
                        var urlEdicionFoto = "frmIncidenciasEdicionFoto.aspx?incidenciaID=" + vIdIncidencia + "&archivoMultimediaID=" + registro.FotografiaID
                        window.open(urlEdicionFoto, '_blank');
                    };

                    var divCheck = document.createElement('div');
                    divCheck.classList.add('custom-control');
                    divCheck.classList.add('custom-checkbox');

                    var checkecito = document.createElement('input');
                    checkecito.type = 'checkbox';
                    checkecito.id = 'chkFoto_' + registro.FotografiaID;
                    checkecito.name = 'chkFoto_' + registro.FotografiaID;
                    checkecito.classList.add('custom-control-input');
                    checkecito.checked = registro.Favorito;
                    checkecito.onclick = function () {
                        fnActualizarEstadoFavorito(registro.FotografiaID, checkecito.checked);
                    };

                    var etiqueta = document.createElement('label');
                    etiqueta.classList.add('custom-control-label');
                    etiqueta.onclick = function () {
                        var chk = document.getElementById("chkFoto_" + registro.FotografiaID);
                        chk.checked = !chk.checked;
                        $('#' + "chkFoto_" + registro.FotografiaID).trigger('onclick');
                    };

                    divCheck.appendChild(checkecito);
                    divCheck.appendChild(etiqueta);

                    divFoto.appendChild(foto);
                    divFoto.appendChild(divCheck);

                    document.getElementById("dFotos").appendChild(divFoto);
                })
                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });
}

function fnCargarVideos() {
    const url = baseHostURL + "api/IncidenciasApp/obtenerConsultaVideosPorIncidencia/" + vIdIncidencia;

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
                        fnCargarVideos();
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

            document.getElementById("dVideos").innerHTML = "";

            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    var divVideo = document.createElement('div');
                    divVideo.classList.add('img-wrapper');
                    divVideo.classList.add('d-inline-block');

                    var video = document.createElement("img");
                    video.src = registro.urlArchivoThumbnail;
                    video.height = "140";
                    video.width = "140";
                    video.alt = "";
                    video.onerror = function () {
                        this.src = window.location.origin + "/Images/dummy_143x143.png";
                    };
                    video.onclick = function () {
                        var urlEdicionVideo = "frmIncidenciasEdicionVideo.aspx?incidenciaID=" + vIdIncidencia + "&archivoMultimediaID=" + registro.VideoID
                        window.open(urlEdicionVideo, '_blank');
                    };

                    var divCheck = document.createElement('div');
                    divCheck.classList.add('custom-control');
                    divCheck.classList.add('custom-checkbox');

                    var checkecito = document.createElement('input');
                    checkecito.type = 'checkbox';
                    checkecito.id = 'chkVideo_' + registro.VideoID;
                    checkecito.name = 'chkVideo_' + registro.VideoID;
                    checkecito.classList.add('custom-control-input');
                    checkecito.checked = registro.Favorito;
                    checkecito.onclick = function () {
                        fnActualizarEstadoFavorito(registro.VideoID, checkecito.checked);
                    };

                    var etiqueta = document.createElement('label');
                    etiqueta.classList.add('custom-control-label');
                    etiqueta.onclick = function () {
                        var chk = document.getElementById("chkVideo_" + registro.VideoID);
                        chk.checked = !chk.checked;
                        $('#' + "chkVideo_" + registro.VideoID).trigger('onclick');
                    };

                    divCheck.appendChild(checkecito);
                    divCheck.appendChild(etiqueta);

                    divVideo.appendChild(video);
                    divVideo.appendChild(divCheck);

                    document.getElementById("dVideos").appendChild(divVideo);
                })
                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });
}

function fnCargarArchivosAdjuntos() {
    const url = baseHostURL + "api/Incidencia/ArchivosAdjuntos/listar/" + vIdIncidencia;

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
                        fnCargarArchivosAdjuntos();
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

            $('#tbodyArchivosAdjuntos').children().remove();

            if (datos.length > 0) {

                $('#tableArchivosAdjuntos').dataTable().fnClearTable();
                $('#tableArchivosAdjuntos').dataTable().fnDestroy();

                datos.forEach(function (registro) {
                    //<tr>
                    //    <td class="spacer"></td>
                    //    <td style="width: 150px"></td>
                    //    <td style="width: 100px; text-align: center;">1</td>
                    //    <td style="padding-left: 15px;">Nombre del archivo</td>
                    //    <td style="width: 160px; padding-left: 15px;">06/06/2021</td>
                    //    <td style="width: 160px; text-align: left; padding-left: 15px;">500 Mb</td>
                    //    <td style="padding-left: 15px;">Nombre del usuario</td>
                    //    <td style="width: 150px; text-align: center;"><a href="/Images/Icons/icono_mapa.png" download="w3logo">Descargar</a></td>
                    //    <td class="spacer"></td>
                    //</tr>
                    var fecha = registro.Fecha;
                    var fechaFormateada = fecha.substring(8, 10) + '/' + fecha.substring(5, 7) + '/' + fecha.substring(0, 4);

                    var path = "/Incidencias/ArchivosAdjuntos/ID_" + vIdIncidencia.toString() + "/" + registro.IdDocumento.toString() + "_" + registro.NombreDocumento;

                    var fila = '<tr>' +
                        '<td class="spacer"></td>';
                    fila = fila + '<td style="width: 50px">' +
                        '          <a href="#fn" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"' +
                        '           data-content="Eliminar" data-placement="top" title="Eliminar archivo adjunto" onclick="fnConfimarEliminacionArchivoAdjunto(' + registro.IdDocumento + ')">' +
                        '           <i class="fas fa-trash fa-lg fa-fw"></i></a> ' +
                        '</td>';
                    fila = fila + '<td style="width: 100px; text-align: center;">' + registro.IdDocumento.toString() + '</td>' +
                        '<td style="padding-left: 15px;">' + registro.NombreDocumento + '</td>' +
                        '<td style="width: 160px; padding-left: 15px;">' + fechaFormateada + '</td>' +
                        '<td style="width: 160px; text-align: left; padding-left: 15px;">' + registro.PesoMb.toString() + ' Mb</td>' +
                        '<td style="padding-left: 15px;">' + registro.UsuarioCreo + '</td>' +
                        '<td style="width: 150px; text-align: center;"><a href="' + path + '" download="' + registro.NombreDocumento + '" >Descargar</a></td>' +
                        '<td class="spacer"></td>' +
                        '</tr>';
                    $('#tableArchivosAdjuntos').append(fila);
                })

                fnInicializaTableArchivosAdjuntos();

                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });

    $('#modalAdjuntarArchivo').modal('hide');
}

function fnConfimarEliminacionArchivoAdjunto(pIdDocumento) {
    Swal.fire({
        title: "",
        text: "\u00BFDesea eliminar el archivo adjunto?",
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: 'Si',
        denyButtonText: 'No',
    })
        .then((result) => {
            if (result.isConfirmed) { fnEliminarArchivoAdjunto(pIdDocumento); }
        }
        );
}

function fnEliminarArchivoAdjunto(pIdDocumento) {
    var urlMetodo = baseHostURL + "api/Incidencia/ArchivosAdjuntos/eliminar";

    urlMetodo = urlMetodo + '/' + vIdIncidencia;
    urlMetodo = urlMetodo + '/' + pIdDocumento;
    urlMetodo = urlMetodo + '/' + vUsuarioActual;

    fetch(urlMetodo, {
        method: 'POST',
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
                        fnEliminarArchivoAdjunto();
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
            if (datos.length > 0) {
                Swal.fire("", "Archivo adjunto eliminado exitosamente", "success");
                fnCargarArchivosAdjuntos();
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });
}


function fnGrabarRegistro() {    
    var vFechaIncidencia = $('#dtFechaincidencia').val();
    if (fnValidarFormatoFecha(vFechaIncidencia)) {
        if (vFechaIncidencia != '') {
            if ($('#txtEstacionInicial').val() != '') {
                if ($('#txtLatitud').val() != '' & $('#txtLongitud').val() != '') {
                    var urlMetodo;
                    if (vIdIncidencia > 0) {
                        urlMetodo = baseHostURL + "api/Incidencia/actualizarIncidencia";
                    } else {
                        urlMetodo = baseHostURL + "api/Incidencia/insertarIncidencia";
                    }

                    var arrayFecha = vFechaIncidencia.split("/");
                    arrayFecha[0] = (parseInt(arrayFecha[0]) ).toString();
                    if (arrayFecha[0].length < 2) {
                        arrayFecha[0] = "0" + arrayFecha[0];
                    }
                    if (arrayFecha[1].length < 2) {
                        arrayFecha[1] = "0" + arrayFecha[1];
                    }
                    fechaIncidenciaNuevoFormato = arrayFecha[2] + '-' + arrayFecha[1] + '-' + arrayFecha[0] + 'T00:00Z';

                    var idInc = 0;
                    if (vIdIncidencia > 0) {
                        idInc = vIdIncidencia;
                    }

                    var datoEstacionFinal = 0.0;
                    if ($('#txtEstacionFinal').val() != '') {
                        datoEstacionFinal = parseFloat($("#txtEstacionFinal").val());
                    }

                    var anioProy = 0;
                    var codigoProy = '';                    
                    if ($("#cmbProyecto1").val() != '') {
                        anioProy = (vVerificarSupervisor)? vPlanAnualS: $("#cmbPlanAnual1").val();
                        codigoProy = $("#cmbProyecto1").val();
                    }

                    var registro = {
                        IdIncidencia: parseInt(idInc),
                        AnioID: parseInt(anioProy),
                        ProyectoCodigo: codigoProy,
                        EstacionInicial: parseFloat($("#txtEstacionInicial").val()),
                        EstacionFinal: datoEstacionFinal,
                        FechaIncidencia: fechaIncidenciaNuevoFormato,
                        Descripcion: $("#txtDescripcion").val(),
                        AccionInicial: $("#txtAccionInicial").val(),
                        AccionesCorrectivas: $("#txtAccionesCorrectivas").val(),
                        Observaciones: $("#txtObservaciones").val(),
                        senalizacionpreventiva: ($("#chkSenalizacionPreventiva").is(":checked")),
                        PlazoResolucion: parseInt($("#txtPlazoResolucion").val()),
                        TramoID: parseInt($("#cmbTramo").val()),
                        IdTipo: parseInt($("#cmbTipoIncidencia").val()),
                        IdSeveridad: parseInt($("#cmbSeveridad").val()),
                        IdEstado: parseInt($("#cmbEstado").val()),
                        Latitud: parseFloat($("#txtLatitud").val()),
                        Longitud: parseFloat($("#txtLongitud").val()),
                        Altitud: 0,
                        Usuario: vUsuarioActual
                    };

                    var arreglo = [registro];

                    var dataJSONt = JSON.stringify(arreglo); 

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
                            var datos = data;                            
                            if (vModoPantalla == "N") {
                                vModoPantalla = "E";
                                vIdIncidencia = datos.detalle[0].correlativo_incidencia_servidor;
                                configPantalla();
                                Swal.fire("", "Incidencia creada exitosamente", "success");
                            } else {
                                Swal.fire("", "Incidencia actualizada exitosamente", "success");
                            }
                        })
                        .catch(function (error) {
                            $.LoadingOverlay("hide");
                            Swal.fire("", error.message + " ", "success");
                        });
                }
                else {
                    Swal.fire("", "Debe ingresar la ubicaci&oacuten geogr&aacutefica", "warning");
                }
            }
            else {
                Swal.fire("", "Debe ingresar la estaci&oacuten inicial", "warning");
            }
        }
        else {
            Swal.fire("", "Debe ingresar una fecha de la incidencia v&aacutelida", "warning");
        }
    }
    else {
        Swal.fire("", "Debe ingresar una fecha v&aacutelida", "warning");
    }
}


function fnAdjuntarArchivo() {
    var urlMetodo = "";
    var comentario = $('#txtComentarioArchivoAdjuntar').val();
    var nombreArchivo = "";
    var pesoArchivo = 0;

    var fileUpload = $("#fileArchivoAdjuntar").get(0);
    var files = fileUpload.files;
    var test = new FormData();
    for (var i = 0; i < files.length; i++) {
        test.append(files[i].name, files[i]);
        nombreArchivo = files[i].name;
        pesoArchivo = files[i].size / 1024 / 1024;

        urlMetodo = baseHostURL + "api/Incidencia/ArchivosAdjuntos/insertar";
        urlMetodo = urlMetodo + "/" + vIdIncidencia.toString();
        urlMetodo = urlMetodo + "/" + nombreArchivo;
        urlMetodo = urlMetodo + "/" + comentario;
        urlMetodo = urlMetodo + "/" + pesoArchivo.toString();
        urlMetodo = urlMetodo + "/" + vUsuarioActual;

        $.ajax({
            url: urlMetodo,
            method: "GET",
            data: test,
            contentType: false,
            processData: false,
            headers: {
                "Authorization": "Bearer " + vToken,
                "Content-Type": "application/json",
            },
            success: () => {
                CalluploaderHandler();
            },
            error: ({ responseJSON }) => Swal.fire("Error al agregar archivo", responseJSON.Errors.reduce((ant, actual) => {
                return ant + actual.message
            }, ""), "error")
        })
    }

    function CalluploaderHandler() {
        var fileUpload = $("#fileArchivoAdjuntar").get(0);
        var files = fileUpload.files;
        var test = new FormData();
        for (var i = 0; i < files.length; i++) {
            test.append(files[i].name, files[i]);
        }
        var urlLlamar = "../FileUploadHandler.ashx?vModuloViene=3&vTipoArchivo=Adjuntos&vIdIncidencia=" + vIdIncidencia.toString();

        $.ajax({
            type: "POST",
            url: urlLlamar,
            contentType: false,
            processData: false,
            data: test,
            success: OnComplete,
            error: OnFail
        });
        return false;
    }

    function OnComplete(result) {
        Swal.fire("Archivo ingresado correctamente", "", "success");
        fnCargarArchivosAdjuntos();
    }

    function OnFail(result) {
        alert('Request failed');
    }
}


function fnAdjuntarFoto() {
    var urlMetodo = baseHostURL + "api/IncidenciasApp/insertarFotoDesdeWeb";
    var nombreArchivo = "";
    var comentario = $('#txtComentarioFotoAdjuntar').val();
    var pesoArchivo = 0;
    var mime = "";
    var latitud = $('#txtLatitudFoto').val();
    var longitud = $('#txtLongitudFoto').val();

    var fileUpload = $("#fileFotoAdjuntar").get(0);
    var files = fileUpload.files;

    var vFechaFoto = $('#dtFechaFoto').val();
    if (fnValidarFormatoFecha(vFechaFoto)) {
        if (vFechaFoto != '') {
            if (files.length > 0) {
                var fechaNuevoFormato = vFechaFoto.substring(6, 10) + '-' + vFechaFoto.substring(3, 5) + '-' + vFechaFoto.substring(0, 2) + 'T07:22Z';

                var datos = new FormData();

                for (var i = 0; i < files.length; i++) {
                    datos.append(files[i].name, files[i]);
                    nombreArchivo = files[i].name;
                    pesoArchivo = files[i].size / 1024 / 1024;
                    mime = files[i].type;

                    if (latitud == '') {
                        latitud = '0';
                    }

                    if (longitud == '') {
                        longitud = '0';
                    }

                    var registro1 = {
                        IdIncidencia: vIdIncidencia,
                        NombreArchivo: nombreArchivo,
                        Comentario: comentario,
                        Fecha: fechaNuevoFormato,
                        Latitud: parseFloat(latitud),
                        Longitud: parseFloat(longitud),
                        Altitud: 0.0,
                        DesdeTelefono: 0,
                        IdTipoArchivo: 1,
                        PesoMb: pesoArchivo,
                        DuracionSegundos: 0,
                        NombreArchivoThumbnail: nombreArchivo,
                        MIME: mime,
                        Favorito: 0,
                        SOdispositivo: "Web",
                        IMEI: "Web",
                        Usuario: vUsuarioActual
                    };

                    var dataJSONt = JSON.stringify(registro1);

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
                                        fnAdjuntarFoto();
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

                            if (datos.length > 0) {
                                CalluploaderHandler_Foto();
                                //Swal.fire("", "Fotograf&iacutea agregada exitosamente", "success");
                            }
                        })
                        .catch(function (error) {
                            $.LoadingOverlay("hide");
                            Swal.fire("", error.message + " ", "success");
                        });


                }

            } else {
                Swal.fire("", "Debe elegir un archivo de imagen", "warning");
            }
        }
        else {
            Swal.fire("", "Debe ingresar una fecha v&aacutelida", "warning");
        }
    }
    else {
        Swal.fire("", "Debe ingresar una fecha v&aacutelida", "warning");
    }

    function CalluploaderHandler_Foto() {
        var fileUpload = $("#fileFotoAdjuntar").get(0);
        var files = fileUpload.files;
        var test = new FormData();
        for (var i = 0; i < files.length; i++) {
            test.append(files[i].name, files[i]);
        }
        var urlLlamar = "../FileUploadHandler.ashx?vModuloViene=3&vTipoArchivo=Fotos&vIdIncidencia=" + vIdIncidencia.toString();

        $.ajax({
            type: "POST",
            url: urlLlamar,
            contentType: false,
            processData: false,
            data: test,
            success: OnComplete,
            error: OnFail
        });
        return false;
    }

    function OnComplete(result) {
        fnCargarFotografias();
        Swal.fire("", "Fotograf&iacutea agregada exitosamente", "success");
    }

    function OnFail(result) {
        alert('Request failed');
    }
}

function fnAdjuntarVideo() {
    var urlMetodo = baseHostURL + "api/IncidenciasApp/insertarVideoDesdeWeb";
    var nombreArchivo = "";
    var comentario = $('#txtComentarioVideoAdjuntar').val();
    var pesoArchivo = 0;
    var mime = "";
    var duracion = 0;
    var latitud = $('#txtLatitudVideo').val();
    var longitud = $('#txtLongitudVideo').val();

    var fileUpload = $("#fileVideoAdjuntar").get(0);
    var files = fileUpload.files;

    var vFechaVideo = $('#dtFechaVideo').val();

    if (fnValidarFormatoFecha(vFechaVideo)) {
        if (vFechaVideo != '') {
            if (files.length > 0) {
                var fechaNuevoFormato = vFechaVideo.substring(6, 10) + '-' + vFechaVideo.substring(3, 5) + '-' + vFechaVideo.substring(0, 2) + 'T07:22Z';

                var datos = new FormData();

                for (var i = 0; i < files.length; i++) {
                    datos.append(files[i].name, files[i]);
                    nombreArchivo = files[i].name;
                    pesoArchivo = files[i].size / 1024 / 1024;
                    mime = files[i].type;
                    duracion = _VIDEO.duration;

                    if (latitud == '') {
                        latitud = '0';
                    }

                    if (longitud == '') {
                        longitud = '0';
                    }

                    var thumbNailBase64 = fnObtenerImagenThumbnail();

                    var registro1 = {
                        IdIncidencia: vIdIncidencia,
                        NombreArchivo: nombreArchivo,
                        NombreArchivoThumbnail: "",
                        Comentario: comentario,
                        Fecha: fechaNuevoFormato,
                        Latitud: parseFloat(latitud),
                        Longitud: parseFloat(longitud),
                        Altitud: 0.0,
                        PesoMb: pesoArchivo,
                        DuracionSegundos: duracion,
                        MIME: mime,
                        Usuario: vUsuarioActual,
                        SOdispositivo: "Web",
                        IMEI: "Web",
                        ArchivoBase64Video: "",
                        ArchivoBase64ThumbNail: thumbNailBase64
                    };

                    var dataJSONt = JSON.stringify(registro1);

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
                                        fnAdjuntarVideo();
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

                            if (datos.length > 0) {
                                CalluploaderHandler_Video();
                            }
                        })
                        .catch(function (error) {
                            $.LoadingOverlay("hide");
                            Swal.fire("", error.message + " ", "success");
                        });


                }

            } else {
                Swal.fire("", "Debe elegir un archivo de video", "warning");
            }
        }
        else {
            Swal.fire("", "Debe ingresar una fecha v&aacutelida", "warning");
        }
    }
    else {
        Swal.fire("", "Debe ingresar una fecha v&aacutelida", "warning");
    }

    function CalluploaderHandler_Video() {
        var fileUpload = $("#fileVideoAdjuntar").get(0);
        var files = fileUpload.files;
        var test = new FormData();
        for (var i = 0; i < files.length; i++) {
            test.append(files[i].name, files[i]);
        }
        var urlLlamar = "../FileUploadHandler.ashx?vModuloViene=3&vTipoArchivo=Videos&vIdIncidencia=" + vIdIncidencia.toString();

        $.ajax({
            type: "POST",
            url: urlLlamar,
            contentType: false,
            processData: false,
            data: test,
            success: OnComplete,
            error: OnFail
        });
        return false;
    }

    function OnComplete(result) {
        fnCargarVideos();
        Swal.fire("", "Video agregado exitosamente", "success");
    }

    function OnFail(result) {
        alert('Request failed');
    }
}

function fnImprimirInformeIndividual() {
    var vReporte = 'RptInformeIndividualIncidencia.mrt';
    var QueryString = '?Parameters=' + vIdIncidencia.toString() + '&IdReporte=1' + '&Reporte=' + vReporte;
    var url = "../Incidencias/frmIncidenciasVisorReportes.aspx" + QueryString;
    window.open(url, '_blank', 'location=no,height=560,width=887,status=yes,titlebar=yes,scrollbars=yes');
}


function fnInicializaTableArchivosAdjuntos() {
    $('#tableArchivosAdjuntos').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin archivos adjuntos para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Archivos",
            "infoEmpty": "Mostrando 0 de 0 de 0 Archivos",
            "infoFiltered": "(Filtrado de _MAX_ total Archivos)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Archivos",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay archivos encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnActualizarEstadoFavorito(pIdArchivoMultimedia, pFavorito) {
    var urlMetodo = baseHostURL + "api/IncidenciasApp/actualizarMultimediaFavorito";

    urlMetodo = urlMetodo + '/' + vIdIncidencia;
    urlMetodo = urlMetodo + '/' + pIdArchivoMultimedia;
    urlMetodo = urlMetodo + '/' + pFavorito;
    urlMetodo = urlMetodo + '/' + vUsuarioActual;

    fetch(urlMetodo, {
        method: 'POST',
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
                        fnActualizarEstadoFavorito();
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
            //Swal.fire("", Estado actualizado exitosamente", "success");                            
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });
}


const formatToCurrency = amount => {
    return "Q." + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

const formatToNumber = amount => {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

function agregarMarcadorUbicacion(latitud, longitud) {
    var posicion = { lat: latitud, lng: longitud };

    if (latitud > 0) {
        var urlImagenMarcador = document.location.origin + '/Images/Icons/icono_mapa_2.png';

        removerMarcadores();

        const marker = new google.maps.Marker({
            id: 'markerID',
            position: posicion,
            map: map,
            icon: urlImagenMarcador
        });

        gmarkers.push(marker);

        map.setCenter(new google.maps.LatLng(latitud, longitud));
    }    
}

function removerMarcadores() {
    for (i = 0; i < gmarkers.length; i++) {
        gmarkers[i].setMap(null);
    }
    gmarkers.length = 0;
}

function fnValidarFormatoFecha(campo) {
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((campo.match(RegExPattern)) && (campo != '')) {
        return true;
    } else {
        return false;
    }
}