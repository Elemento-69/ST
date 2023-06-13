var vToken;
var vUsuarioActual;
var proxyurl;
var baseHostURL;

var proySuperSeleccionar = '';
var promEjecSeleccionar = '';
var proyEjecSeleccionar = '';



var vModoPantalla = "N";
var vIdEmergencia = -1;
var vTramoEmergencia = 0;
var vTieneDocCambio = false;
var vTieneProyecto = false;

$(document).ready(function () {
    loadDefaultComponents();

    //Verificar si el modo es NUEVO o EDICIÓN
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    if (urlParams.has('emergenciaID')) {
        vModoPantalla = "E";
        vIdEmergencia = urlParams.get('emergenciaID');
        if (vIdEmergencia <= 0) {
            vModoPantalla = "N";
            vIdEmergencia = -1;
        }
    } else {
        vModoPantalla = "N";
        vIdEmergencia = -1;
    }
       
    fnInicializaTableArchivosAdjuntos();
    fnInicializaTableRenglonesPropuestaSolucion();

    fnConsultarToken();

    $('#btnGenerarProyecto').click(function () {
        if (vTieneProyecto) {
            Swal.fire("",  "Ya se creó un proyecto para esta emergencia, no puede generarse otro proyecto. ", "warning");
        }
        else if (vTieneDocCambio) {
            Swal.fire("", "Ya se creó un documento de cambio, por lo tanto no puede crearse un proyecto", "warning");
        }
        else {
            $('#modalGeneracionProyecto').show();
        }
       

    })
    $('#btnGenerarDocumentoCambio').click(function () {
        if (vTieneProyecto) {
            Swal.fire("", "Ya se creó un proyecto para esta emergencia, no puede generarse el documento de cambio ", "warning");
        }
        else if (vTieneDocCambio) {
            Swal.fire("", "Ya se creó un documento de cambio para la emergencia", "warning");
        }
        else {
            $('#modalGeneracionDocumentoCambio').show();
        }


    })
})

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
        fnCargarTramos(-1);
        fnCargarTiposEmergencia(-1);
        fnCargarCausasEmergencia(-1);
        fnCargarSeveridad(-1);
        fnCargarEstados(-1);
        fnCargarPasoHabilitado(-1);
        fnCargarPlanesAnuales(-1, -1);
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
                map.setCenter(posicionInicial);
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
        content: "Seleccione en el mapa la ubicaci&oacuten de la emergencia",
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

function fnCargarTramos(pTramoEmergencia, pCodigoTramo) {
    const url = baseHostURL + "/api/EmergenciasApp/Tramos/listar";    
    
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
                        fnCargarTramos(pTramoEmergencia);
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
                    $("#cmbTramo").append('<option value=' +
                        registro.TramoID.toString() + '>' +
                        registro.Codigo +
                        '</option>');                    
                })
                
                if (vModoPantalla == "N") {                    
                    document.getElementById('cmbTramo').selectedIndex = 0;
                } else {                    
                    var indiceSeleccionar = 0;
                    var encontrado = false;
                    var objSelect = document.getElementById("cmbTramo");
                    for (var i = 0; i < objSelect.options.length; i++) {
                        if (objSelect.options[i].value == pTramoEmergencia) {                            
                            indiceSeleccionar = i;
                            encontrado = true;
                            break;
                        }
                    }
                    if (encontrado) {
                        document.getElementById('cmbTramo').selectedIndex = indiceSeleccionar;
                    } else {
                        $("#cmbTramo").append('<option value=' +
                            pTramoEmergencia + '>' +
                            pCodigoTramo +
                            '</option>');
                        $("#cmbTramo").val(pTramoEmergencia);
                    }
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

function fnCargarTiposEmergencia(pTipoEmergencia) { 
    const url = baseHostURL + "/api/EmergenciasApp/Tipo/listar";

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
                        fnCargarTiposEmergencia(pTipoEmergencia);
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
            $("#cmbTipoEmergencia").select2({ theme: "bootstrap" });
            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbTipoEmergencia").append('<option value=' +
                        registro.IdTipo + '>' +
                        registro.NombreTipo +
                        '</option>');
                })

                if (vModoPantalla == "N") {
                    document.getElementById('cmbTipoEmergencia').selectedIndex = 0;
                } else {

                    var indiceSeleccionar = 0;
                    var objSelect = document.getElementById("cmbTipoEmergencia");
                    for (var i = 0; i < objSelect.options.length; i++) {
                        if (objSelect.options[i].value == pTipoEmergencia) {
                            indiceSeleccionar = i;
                            break;
                        }
                    }
                    document.getElementById('cmbTipoEmergencia').selectedIndex = indiceSeleccionar;
                }

                $('#cmbTipoEmergencia').trigger('change');
                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });
}

function fnCargarCausasEmergencia(pCausaEmergencia) {    
    const url = baseHostURL + "/api/EmergenciasApp/Causa/listar";

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
                        fnCargarCausasEmergencia(pCausaEmergencia);
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
            $("#cmbCausaEmergencia").select2({ theme: "bootstrap" });
            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbCausaEmergencia").append('<option value=' +
                        registro.IdCausa + '>' +
                        registro.NombreCausa +
                        '</option>');
                })

                if (vModoPantalla == "N") {
                    document.getElementById('cmbCausaEmergencia').selectedIndex = 0;
                } else {

                    var indiceSeleccionar = 0;
                    var objSelect = document.getElementById("cmbCausaEmergencia");
                    for (var i = 0; i < objSelect.options.length; i++) {
                        if (objSelect.options[i].value == pCausaEmergencia) {
                            indiceSeleccionar = i;
                            break;
                        }
                    }
                    document.getElementById('cmbCausaEmergencia').selectedIndex = indiceSeleccionar;
                }

                $('#cmbCausaEmergencia').trigger('change');
                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });
}

function fnCargarPasoHabilitado(pPasoHabilitado) {
    const url = baseHostURL + "/api/EmergenciasApp/Paso/listar";

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
            $("#cmbPasoHabilitado").select2({ theme: "bootstrap" });
            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbPasoHabilitado").append('<option value=' +
                        registro.IdPaso + '>' +
                        registro.NombrePaso +
                        '</option>');
                })

                if (vModoPantalla == "N") {
                    document.getElementById('cmbPasoHabilitado').selectedIndex = 0;
                } else {

                    var indiceSeleccionar = 0;
                    var objSelect = document.getElementById("cmbPasoHabilitado");
                    for (var i = 0; i < objSelect.options.length; i++) {
                        if (objSelect.options[i].value == pPasoHabilitado) {
                            indiceSeleccionar = i;
                            break;
                        }
                    }
                    document.getElementById('cmbPasoHabilitado').selectedIndex = indiceSeleccionar;
                }

                $('#cmbPasoHabilitado').trigger('change');
                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });
}

function fnCargarSeveridad(pSeveridad) {    
    const url = baseHostURL + "/api/EmergenciasApp/Severidad/listar";

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

                if (vModoPantalla == "N") {
                    document.getElementById('cmbSeveridad').selectedIndex = 0;
                } else {

                    var indiceSeleccionar = 0;
                    var objSelect = document.getElementById("cmbSeveridad");
                    for (var i = 0; i < objSelect.options.length; i++) {
                        if (objSelect.options[i].value == pSeveridad) {
                            indiceSeleccionar = i;
                            break;
                        }
                    }
                    document.getElementById('cmbSeveridad').selectedIndex = indiceSeleccionar;
                }
                
                $('#cmbSeveridad').trigger('change');
                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });
}

function fnCargarEstados(pEstado) {
    const url = baseHostURL + "/api/EmergenciasApp/Estados/listar";

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

                if (vModoPantalla == "N") {
                    document.getElementById('cmbEstado').selectedIndex = 0;
                } else {

                    var indiceSeleccionar = 0;
                    var objSelect = document.getElementById("cmbEstado");
                    for (var i = 0; i < objSelect.options.length; i++) {
                        if (objSelect.options[i].value == pEstado) {
                            indiceSeleccionar = i;
                            break;
                        }
                    }
                    document.getElementById('cmbEstado').selectedIndex = indiceSeleccionar;
                }

                $('#cmbEstado').trigger('change');
                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });
}

function fnCargarPlanesAnuales(pPlanAnualProyAtiende, pPlanAnualProySupervisa) {
    var url = baseHostURL + "/api/EmergenciasApp/PlanAnual/listar";    
    
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
                        fnCargarPlanesAnuales(pPlanAnualProyAtiende, pPlanAnualProySupervisa);
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
            limpiarSelect('cmbPlanAnualProyAtiende');
            limpiarSelect('cmbPlanAnualProySupervisa');
            limpiarSelect('cmbPlanAnualGeneracion');

            $("#cmbPlanAnualProyAtiende").select2({ theme: "bootstrap" });
            $("#cmbPlanAnualProySupervisa").select2({ theme: "bootstrap" });
            $("#cmbPlanAnualGeneracion").select2({ theme: "bootstrap" });

            $("#cmbPlanAnualProyAtiende").append('<option value=0>[No asignado]</option>');
            $("#cmbPlanAnualProySupervisa").append('<option value=0>[No asignado]</option>');

            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbPlanAnualProyAtiende").append('<option value=' +
                        registro.AnioID + '>' +
                        registro.PlanAnualNombre +
                        '</option>');
                    $("#cmbPlanAnualProySupervisa").append('<option value=' +
                        registro.AnioID + '>' +
                        registro.PlanAnualNombre +
                        '</option>');
                    $("#cmbPlanAnualGeneracion").append('<option value=' +
                        registro.AnioID + '>' +
                        registro.PlanAnualNombre +
                        '</option>');
                })

                document.getElementById('cmbPlanAnualProyAtiende').onchange = function () { fnCargarProgramas(); };
                document.getElementById('cmbPlanAnualProySupervisa').onchange = function () { fnCargarProyectosSupervision(); };
                document.getElementById('cmbPlanAnualGeneracion').onchange = function () {
                    fnCargarRenglonesDeTrabajo();
                    fnCargarRenglonesDeTrabajoSinAsignar();
                    fnCargarProgramasParaGenerarProyecto();
                    fnCargarProgramasParaGenerarDocCambio();
                };
                
                if (vModoPantalla == "N") {
                    document.getElementById('cmbPlanAnualProyAtiende').selectedIndex = 0;
                    document.getElementById('cmbPlanAnualProySupervisa').selectedIndex = 0;
                } else {

                    var indiceSeleccionar = 0;
                    var objSelect = document.getElementById("cmbPlanAnualProyAtiende");
                    for (var i = 0; i < objSelect.options.length; i++) {
                        if (objSelect.options[i].value == pPlanAnualProyAtiende) {
                            indiceSeleccionar = i;
                            break;
                        }
                    }
                    document.getElementById('cmbPlanAnualProyAtiende').selectedIndex = indiceSeleccionar;

                    indiceSeleccionar = 0;
                    objSelect = document.getElementById("cmbPlanAnualProySupervisa");
                    for (var i = 0; i < objSelect.options.length; i++) {
                        if (objSelect.options[i].value == pPlanAnualProySupervisa) {
                            indiceSeleccionar = i;
                            break;
                        }
                    }
                    document.getElementById('cmbPlanAnualProySupervisa').selectedIndex = indiceSeleccionar;
                }

                document.getElementById('cmbPlanAnualGeneracion').selectedIndex = 0;

                $('#cmbPlanAnualProyAtiende').trigger('change');
                $('#cmbPlanAnualProySupervisa').trigger('change');
                $('#cmbPlanAnualGeneracion').trigger('change');

                $.LoadingOverlay("hide");
                
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " abc", "success");
        });
}

function fnCargarProgramas() {
    const url = baseHostURL + "api/EmergenciasApp/Programa/listar/" + $("#cmbPlanAnualProyAtiende").val();    
    
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
            $("#cmbPrograma1").append('<option value="">[No asignado]</option>');

            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbPrograma1").append('<option value=' +
                        registro.ProgramaCodigo + '>' +
                        registro.ProgramaCodigo +
                        '</option>');
                })

                document.getElementById('cmbPrograma1').onchange = function () { fnCargarProyectosAtiende(); };
                
                if (promEjecSeleccionar != '') {
                    $('#cmbPrograma1').val(promEjecSeleccionar);
                    promEjecSeleccionar = '';
                } else {
                    document.getElementById('cmbPrograma1').selectedIndex = 0;
                }

                $('#cmbPrograma1').trigger('change');

                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " fnCargarProgramas", "success");
        });
}

function fnCargarProyectosAtiende() {
    var url = baseHostURL + "api/EmergenciasApp/Proyecto/listar/" + $("#cmbPlanAnualProyAtiende").val() + "/" + $("#cmbPrograma1").val();
   
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
                        fnCargarProyectosAtiende();
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
            $("#cmbProyecto1").append('<option value="">[No asignado]</option>');

            if (datos) {
                    if (datos.length > 0) {
                        datos.forEach(function (registro) {
                            $("#cmbProyecto1").append('<option value=' +
                                registro.ProyectoCodigo + '>' +
                                registro.ProyectoCodigo +
                                '</option>');
                        })
                        
                        if (proyEjecSeleccionar != '') {
                            $('#cmbProyecto1').val(proyEjecSeleccionar);
                            proyEjecSeleccionar = '';
                        } else {
                            document.getElementById('cmbProyecto1').selectedIndex = 0;
                        }

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

function fnCargarProyectosSupervision() {
    const url = baseHostURL + "api/EmergenciasApp/ProyectoSupervision/listar/" + $("#cmbPlanAnualProySupervisa").val();
    
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
                        fnCargarProyectosSupervision();
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
            limpiarSelect('cmbProyecto2');
            $("#cmbProyecto2").select2({ theme: "bootstrap" });
            $("#cmbProyecto2").append('<option value="">[No asignado]</option>');

            if (datos) {
                if (datos.length > 0) {
                    datos.forEach(function (registro) {
                        $("#cmbProyecto2").append('<option value=' +
                            registro.ProyectoCodigo + '>' +
                            registro.ProyectoCodigo +
                            '</option>');
                    })
                    
                    if (proySuperSeleccionar != '') {
                        $('#cmbProyecto2').val(proySuperSeleccionar);
                        proySuperSeleccionar = '';
                    } else {
                        document.getElementById('cmbProyecto2').selectedIndex = 0;
                    }

                    $('#cmbProyecto2').trigger('change');

                    $.LoadingOverlay("hide");
                }
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            //Swal.fire("", error.message + " proy", "success");
        });
}

function fnMostrarRegistro() {    
    const url = baseHostURL + "api/EmergenciasApp/ObtenerEmergencia/" + vIdEmergencia;
    
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
                    fnCargarTramos(registro.TramoID, registro.TramoCodigo);
                    vTieneDocCambio = registro.SeGeneroDocCambio;
                    vTieneProyecto = registro.SeGeneroProyecto;
                    $("#txtEstacionInicial").val(registro.EstaInicio);

                    if (registro.EstaFinal) {
                        $("#txtEstacionFinal").val(registro.EstaFinal);
                    }

                    
                    var fecha = registro.FechaRealizado;
                    var fechaFormateada = fecha.substring(8, 10) + '/' + fecha.substring(5, 7) + '/' + fecha.substring(0, 4);
                    $("#dtFechaEmergencia").val(fechaFormateada);

                    if (registro.FechaAtencion) {
                        var fechaAtencion = registro.FechaAtencion;
                        var fechaAtencionFormateada = fechaAtencion.substring(8, 10) + '/' + fechaAtencion.substring(5, 7) + '/' + fechaAtencion.substring(0, 4);
                        $("#dtFechaAtencion").val(fechaAtencionFormateada);
                    } else {
                        $("#dtFechaAtencion").val('');
                    }

                    fnCargarEstados(registro.Estado);                    
                    
                    fnCargarTiposEmergencia(registro.TipoEmergencia);                    

                    fnCargarCausasEmergencia(registro.CausaEmergencia);                    

                    fnCargarSeveridad(registro.Severidad);                    

                    fnCargarPasoHabilitado(registro.Paso);                    

                    agregarMarcadorUbicacion(registro.Latitud, registro.Longitud);

                    $("#txtLatitud").val(registro.Latitud);

                    $("#txtLongitud").val(registro.Longitud);

                    $("#txtDescripcion").val(registro.DescripcionEmergencia);

                    $("#txtDanhos").val(registro.DescripcionDanos);

                    $("#txtObservaciones").val(registro.Observaciones);

                    promEjecSeleccionar = registro.ProgramaCodigo_Ejecucion;
                    proyEjecSeleccionar = registro.ProyectoCodigo_Ejecucion;
                    proySuperSeleccionar = registro.ProyectoCodigo_Supervision;

                    fnCargarPlanesAnuales(registro.AnioID_Ejecucion, registro.AnioID_Supervision);

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

                    $("#cmbTramo").value = registro.TramoID;

                    //Datos de Ficha de CONRED
                    $("#txtAntecedentes").val(registro.Antecedentes);
                    $("#txtCausas").val(registro.Causas);                    
                    $("#txtDanhoConred").val(registro.Dano);
                    $("#txtRecomendaciones").val(registro.Recomendaciones);

                    //Mostrar / Ocultar para generación de documento de cambio / proyecto
                    let mostrarParaGeneracion = !registro.SeGeneroProyecto && !registro.SeGeneroDocCambio;
                    var divBotonesGenerar = document.getElementById("divBotonesGenerar");
                    var divAgregarRenglon = document.getElementById("divAgregarRenglon");
                    var divLetreroProyDocCambioGenerado = document.getElementById("divLetreroProyDocCambioGenerado");
                    if (mostrarParaGeneracion) {
                        divBotonesGenerar.style.display = 'visible';          // Show
                        divAgregarRenglon.style.display = 'visible';          // Show
                        divLetreroProyDocCambioGenerado.style.display = 'none';           // Hide
                    } else {
                        divBotonesGenerar.style.display = 'none';           // Hide
                        divAgregarRenglon.style.display = 'none';           // Hide
                        divLetreroProyDocCambioGenerado.style.display = 'visible';          // Show
                        if (registro.SeGeneroProyecto) {
                            document.getElementById("letreroSeGenero").innerHTML = "Se gener&oacute proyecto";
                        }
                        if (registro.SeGeneroDocCambio) {
                            document.getElementById("letreroSeGenero").innerHTML = "Se gener&oacute documento de cambio";
                        }
                    }
                })
            }

        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");

        });
}

function fnCargarFotografias() {
    const url = baseHostURL + "api/EmergenciasApp/obtenerConsultaFotosPorEmergencia/" + vIdEmergencia;
    
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
                    foto.src = thumbnail + "Tipo=3&MaxPixels=200&Fotografia=" + registro.NombreArchivo + "&EMID=ID_" + registro.EmergenciaID
                    //foto.src = registro.urlArchivoMultimedia;
                    foto.height = "140";
                    foto.width = "140";
                    foto.alt = "";                    
                    //foto.onerror = function () {
                    //    this.src = window.location.origin + "/Images/dummy_143x143.png";
                    //};
                    foto.onclick = function () {
                        var urlEdicionFoto = "frmEmergenciasEdicionFoto.aspx?emergenciaID=" + vIdEmergencia + "&archivoMultimediaID=" + registro.FotografiaID
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
    const url = baseHostURL + "api/EmergenciasApp/obtenerConsultaVideosPorEmergencia/" + vIdEmergencia;
    
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
                        var urlEdicionVideo = "frmEmergenciasEdicionVideo.aspx?emergenciaID=" + vIdEmergencia + "&archivoMultimediaID=" + registro.VideoID
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
    const url = baseHostURL + "api/EmergenciasApp/obtenerConsultaArchivosAdjuntosPorEmergencia/" + vIdEmergencia;
    
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
            $('#tableArchivosAdjuntos').dataTable().fnClearTable();
            $('#tableArchivosAdjuntos').dataTable().fnDestroy();

            if (datos.length > 0) {
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

                    var path = "/Emergencias/ArchivosAdjuntos/ID_" + vIdEmergencia.toString() + "/" + registro.IdDocumento.toString() + "_" + registro.NombreDocumento;

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
    var urlMetodo = baseHostURL + "api/EmergenciasApp/eliminarArchivoAdjunto";
    
        urlMetodo = urlMetodo + '/' + vIdEmergencia;
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

function fnCargarRenglonesDeTrabajo() {
    if ($("#cmbPlanAnualGeneracion").val() != null) {
        var url = baseHostURL + "api/EmergenciasApp/obtenerConsultaRenglonesPorEmergencia/" + vIdEmergencia + "/" + $("#cmbPlanAnualGeneracion").val();
    
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
                            fnCargarRenglonesDeTrabajo();
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

                $('#tbodyPropuestaSolucion').children().remove();
                $('#tablePropuestaSolucion').dataTable().fnClearTable();
                $('#tablePropuestaSolucion').dataTable().fnDestroy();

                if (datos.length > 0) {
                    datos.forEach(function (registro) {
                        //<tr>
                        //    <td class="spacer"></td>
                        //    <td></td>
                        //    <td style="width: 100px; text-align: center;">1</td>
                        //    <td>Renglón 1</td>
                        //    <td style="width: 160px; text-align: right;">125</td>
                        //    <td style="width: 160px; text-align: right;">Q10.00</td>
                        //    <td style="width: 160px; text-align: right;">Q111,222,250.00</td>
                        //    <td class="spacer"></td>
                        //</tr>
                        var precioTotal = registro.Cantidad * registro.PrecioUnitario;

                        var fila = '<tr>' +
                            '<td class="spacer" ></td >';

                        fila = fila + '<td style="width: 50px">' +
                            '          <a href="#fn" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"' +
                            '           data-content="Eliminar" data-placement="top" title="Eliminar renglón" onclick="fnConfimarEliminacionRenglonDeTrabajo(' + registro.IdRenglon + ')">' +
                            '           <i class="fas fa-trash fa-lg fa-fw"></i></a> ' +
                            '</td>';

                        fila = fila + '<td style = "text-align: center;" >' + registro.RenglonCodCovial + '</td > ' +
                            '<td >' + registro.ProyectoRenglonNombre + '</td > ' +
                            '<td style = "width: 160px; text-align: right;" >' + formatToNumber(registro.Cantidad) + '</td > ' +
                            '<td style = "width: 160px; text-align: right;" >' + formatToCurrency(registro.PrecioUnitario) + '</td > ' +
                            '<td style = "width: 160px; text-align: right;" >' + formatToCurrency(precioTotal) + '</td > ' +
                            '<td class="spacer" ></td > ' +
                            '</tr >';

                        $('#tablePropuestaSolucion').append(fila);
                    })

                    fnInicializaTableRenglonesPropuestaSolucion();

                    $.LoadingOverlay("hide");
                }
            })
            .catch(function (error) {
                $.LoadingOverlay("hide");
                Swal.fire("fnCargarRenglonesDeTrabajo  ", error.message + " ", "success");
            });
    }
}



function fnCargarRenglonesDeTrabajoSinAsignar() {    
    if ($("#cmbPlanAnualGeneracion").val() != null) {
        const url = baseHostURL + "api/EmergenciasApp/obtenerConsultaRenglonesNoAsignados/" + vIdEmergencia.toString() + "/" + $("#cmbPlanAnualGeneracion").val();

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
                            fnCargarRenglonesDeTrabajoSinAsignar();
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
                limpiarSelect('cmbRenglonTrabajo');
                $("#cmbRenglonTrabajo").select2({ theme: "bootstrap" });
                if (datos.length > 0) {
                    datos.forEach(function (registro) {
                        $("#cmbRenglonTrabajo").append('<option value=' +
                            registro.RenglonID + '>' +
                            '[' + registro.Codigo + ']  ' +
                            registro.Descripcion +
                            '</option>');
                    })
                    document.getElementById('cmbRenglonTrabajo').selectedIndex = 0;

                    $('#cmbRenglonTrabajo').trigger('change');
                    $.LoadingOverlay("hide");

                }

            })
            .catch(function (error) {
                $.LoadingOverlay("hide");
                Swal.fire("fnCargarRenglonesDeTrabajoSinAsignar  ", error.message + " ", "success");

            });
    }
}


function fnGrabarRegistro() {
    var vFechaEmergencia = $('#dtFechaEmergencia').val();
    if (fnValidarFormatoFecha(vFechaEmergencia)) {
        if (vFechaEmergencia != '') {
            if ($('#txtEstacionInicial').val() != '') {
                if ($('#txtLatitud').val() != '' & $('#txtLongitud').val() != '') {
                        var urlMetodo = baseHostURL + "api/EmergenciasApp/insertar";

                        var arrayEmergencia = vFechaEmergencia.split("/");
                        arrayEmergencia[0] = (parseInt(arrayEmergencia[0]) + 1).toString();                 
                        if (arrayEmergencia[0].length < 2) {
                            arrayEmergencia[0] = "0" + arrayEmergencia[0];
                        }
                        if (arrayEmergencia[1].length < 2) {
                            arrayEmergencia[1] = "0" + arrayEmergencia[1];
                        }                    
                        fechaEmergenciaNuevoFormato = arrayEmergencia[2] + '-' + arrayEmergencia[1] + '-' + arrayEmergencia[0] + 'T00:00Z';                       

                        var idEmer = 0;
                        if (vIdEmergencia > 0) {
                            idEmer = vIdEmergencia;
                        }

                        var datoEstacionFinal = 0.0;
                        if ($('#txtEstacionFinal').val() != '') {
                            datoEstacionFinal = parseFloat($("#txtEstacionFinal").val());
                        }

                        var anioProyAtencion = 0;
                        var codigoProyAtencion = '';
                        var anioProySuper = 0;
                        var codigoProySuper = '';
                        if ($("#cmbProyecto1").val() != '') {
                            anioProyAtencion = $("#cmbPlanAnualProyAtiende").val();
                            codigoProyAtencion = $("#cmbProyecto1").val();
                        }
                        if ($("#cmbProyecto2").val() != '') {
                            anioProySuper = $("#cmbPlanAnualProySupervisa").val();
                            codigoProySuper = $("#cmbProyecto2").val();
                        }

                        var vFechaAtencion = $('#dtFechaAtencion').val();
                        var fechaAtencionNuevoFormato = null;
                        if (fnValidarFormatoFecha(vFechaAtencion)) {
                            if (vFechaAtencion != '') {
                                var arrayFechaAtencion = vFechaAtencion.split("/");
                                arrayFechaAtencion[0] = (parseInt(arrayFechaAtencion[0]) + 1).toString();
                                if (arrayFechaAtencion[0].length < 2) {
                                    arrayFechaAtencion[0] = "0" + arrayFechaAtencion[0];
                                }
                                if (arrayFechaAtencion[1].length < 2) {
                                    arrayFechaAtencion[1] = "0" + arrayFechaAtencion[1];
                                }
                                fechaAtencionNuevoFormato = arrayFechaAtencion[2] + '-' + arrayFechaAtencion[1] + '-' + arrayFechaAtencion[0] + 'T00:00Z';
                            }
                        }

                        var registro = {
                            UserName: vUsuarioActual,
                            Observaciones: $("#txtObservaciones").val(),
                            ProyectoCodigo_Supervision: codigoProySuper,
                            ProyectoCodigo_Ejecucion: codigoProyAtencion,
                            AnioID_Ejecucion: parseInt(anioProyAtencion),
                            SOdispositivo: "web",
                            Severidad: parseInt($("#cmbSeveridad").val()),
                            TramoID: parseInt($("#cmbTramo").val()),
                            DescripcionEmergencia: $("#txtDescripcion").val(),
                            Estado: parseInt($("#cmbEstado").val()),
                            Altitud: 0,
                            IMEI: "",
                            Latitud: parseFloat($("#txtLatitud").val()),
                            Paso: parseInt($("#cmbPasoHabilitado").val()),
                            CausaEmergencia: parseInt($("#cmbCausaEmergencia").val()),
                            EmergenciaROWID: 0,
                            AnioID_Supervision: parseInt(anioProySuper),
                            DescripcionDanos: $("#txtDanhos").val(),
                            TipoEmergencia: parseInt($("#cmbTipoEmergencia").val()),
                            EstaFinal: datoEstacionFinal,
                            EstaInicio: parseFloat($("#txtEstacionInicial").val()),
                            FechaRealizado: fechaEmergenciaNuevoFormato,
                            Longitud: parseFloat($("#txtLongitud").val()),
                            FechaAtencion: fechaAtencionNuevoFormato,
                            EmergenciaID: idEmer
                        };

    
                        var arreglo = [registro];

                        var dataJSONt = JSON.stringify({
                            objetoEmergencias: arreglo,
                        });

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
                                var datos = data;
                                if (datos.length > 0) {
                                    vModoPantalla = "E";
                                    vIdEmergencia = datos[0].EmergenciaID;
                                    configPantalla();
                                    Swal.fire("", "Emergencia creada exitosamente", "success");
                                } else {
                                    Swal.fire("", "Emergencia actualizada exitosamente", "success");
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
            Swal.fire("", "Debe ingresar una fecha de la emergencia v&aacutelida", "warning");
        }
    }
    else {
        Swal.fire("", "Debe ingresar una fecha v&aacutelida", "warning");
    }
}

function fnActualizarDatosConred() {
    var urlMetodo = baseHostURL + "api/EmergenciasApp/actualizarDatosConred";
    
    var registro = {
        UserName: vUsuarioActual,
        Antecedentes: $("#txtAntecedentes").val(),
        Causas: $("#txtCausas").val(),
        Dano: $("#txtDanhoConred").val(),
        Recomendaciones: $("#txtRecomendaciones").val(),
        EmergenciaID: parseInt(vIdEmergencia)
    };
                   
    var dataJSONt = JSON.stringify(
        registro
    );

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
                        fnActualizarDatosConred();
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
                Swal.fire("", "Los datos fueron actualizados", "success");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });
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
        
        urlMetodo = baseHostURL + "api/EmergenciasApp/InsertarArchivoAdjunto";        
        urlMetodo = urlMetodo + "/" + vIdEmergencia.toString();
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
        var urlLlamar = "../FileUploadHandler.ashx?vModuloViene=2&vTipoArchivo=Adjuntos&vIdEmergencia=" + vIdEmergencia.toString();
        
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
    var urlMetodo = baseHostURL + "api/EmergenciasApp/insertarFotoDesdeWeb";
    var nombreArchivo = "";    
    var comentario = $('#txtComentarioFotoAdjuntar').val();    
    var pesoArchivo = 0;
    var mime = "";
    var latitud =  $('#txtLatitudFoto').val();
    var longitud = $('#txtLongitudFoto').val();

    var fileUpload = $("#fileFotoAdjuntar").get(0);
    var files = fileUpload.files;
    
    var vFechaFoto = $('#dtFechaFoto').val();
    if (fnValidarFormatoFecha(vFechaFoto))
    {
        if (vFechaFoto != '')
        {
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
                        EmergenciaID: vIdEmergencia,
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
                            //alert(estadoRespuesta);
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
        var urlLlamar = "../FileUploadHandler.ashx?vModuloViene=2&vTipoArchivo=Fotos&vIdEmergencia=" + vIdEmergencia.toString();

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
    var urlMetodo = baseHostURL + "api/EmergenciasApp/insertarVideoDesdeWeb";
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
                        EmergenciaID: vIdEmergencia,
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
        var urlLlamar = "../FileUploadHandler.ashx?vModuloViene=2&vTipoArchivo=Videos&vIdEmergencia=" + vIdEmergencia.toString();

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
    var vReporte = 'RptInformeIndividualEmergencia.mrt';
    var QueryString = '?Parameters=' + vIdEmergencia.toString() + '&IdReporte=1' + '&Reporte=' + vReporte;
    var url = "../Emergencias/FrmVisorReporteEmergencias.aspx" + QueryString;
    window.open(url, '_blank', 'location=no,height=560,width=887,status=yes,titlebar=yes,scrollbars=yes');
}

function fnImprimirInformeCausaDanho() {
    var vReporte = 'RptInformeCausaDanhoEmergencia.mrt';
    var QueryString = '?Parameters=' + vIdEmergencia.toString() + '&IdReporte=3' + '&Reporte=' + vReporte;
    var url = "../Emergencias/FrmVisorReporteEmergencias.aspx" + QueryString;
    window.open(url, '_blank', 'location=no,height=560,width=887,status=yes,titlebar=yes,scrollbars=yes');
}

function fnAgregarRenglonTrabajo() {
    var urlMetodo = baseHostURL + "api/EmergenciasApp/insertarRenglonPorEmergencia";
    var idRenglon = $("#cmbRenglonTrabajo").val();    
    var cantidad = $("#txtRenglonTrabajoCantidad").val();
    var precioUnitario = $("#txtRenglonTrabajoPrecioUnitario").val();

    if (idRenglon != 0 & cantidad != '' & precioUnitario != '') {                

        var registro = {
            IdEmergencia: parseInt(vIdEmergencia),
            IdRenglon: parseInt(idRenglon),
            ProyectoRenglonNombre: "",
            RenglonCodCovial: "",
            Cantidad: parseFloat(cantidad),
            PrecioUnitario: parseFloat(precioUnitario),
            Usuario: vUsuarioActual
        };

        var dataJSONt = JSON.stringify(registro);

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
                                        fnAgregarRenglonTrabajo();                                        
                                        clearInterval(interval);
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
                            if (data) {
                                fnCargarRenglonesDeTrabajo();
                                fnCargarRenglonesDeTrabajoSinAsignar();
                                Swal.fire("", "Rengl&oacuten ingresado exitosamente", "success");
                            }
                        })
                        .catch(function (error) {
                            $.LoadingOverlay("hide");
                            Swal.fire("", error.message + " ", "success");
                        });
    }
    else {
        Swal.fire("", "Debe ingresar los datos requeridos.", "warning");
    }
}

function fnConfimarEliminacionRenglonDeTrabajo(pIdRenglon) {
    var texto = "\u00BFDesea eliminar la asignaci\u00F3n de este rengl\u00F3n?";
    Swal.fire({
        title: "",
        text: texto,
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: 'Si',
        denyButtonText: 'No',
    })
        .then((result) => {
            if (result.isConfirmed) { fnEliminarRenglonDeTrabajo(pIdRenglon); }
        }
        );
}

function fnEliminarRenglonDeTrabajo(pIdRenglon) {
    var urlMetodo = baseHostURL + "api/EmergenciasApp/eliminarRenglonPorEmergencia";

    urlMetodo = urlMetodo + '/' + vIdEmergencia;
    urlMetodo = urlMetodo + '/' + pIdRenglon;
    
    fetch(urlMetodo, {
        method: 'DELETE',
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
                        fnEliminarRenglonDeTrabajo();
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
                Swal.fire("", "Asignaci&oacuten de rengl&oacuten eliminada exitosamente", "success");
                fnCargarRenglonesDeTrabajo();
                fnCargarRenglonesDeTrabajoSinAsignar();
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });
}

function fnCargarProgramasParaGenerarProyecto() {
    var url = baseHostURL + "api/EmergenciasApp/Programa/listar/" + $("#cmbPlanAnualGeneracion").val();

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
                        fnCargarProgramasParaGenerarProyecto();
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
            limpiarSelect('cmbProgramaGeneracionProy');
            $("#cmbProgramaGeneracionProy").select2({ theme: "bootstrap" });

            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbProgramaGeneracionProy").append('<option value=' +
                        registro.ProgramaCodigo + '>' +
                        registro.ProgramaCodigo +
                        '</option>');
                })
                              
                document.getElementById('cmbProgramaGeneracionProy').selectedIndex = 0;                

                $('#cmbProgramaGeneracionProy').trigger('change');

                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " fnCargarProgramasParaGenerarProyecto", "success");
        });
}

function fnCargarProgramasParaGenerarDocCambio() {
    var url = baseHostURL + "api/EmergenciasApp/Programa/listar/" + $("#cmbPlanAnualGeneracion").val();    

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
                        fnCargarProgramasParaGenerarDocCambio();
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
            limpiarSelect('cmbProgramaGeneracionDocCambio');
            $("#cmbProgramaGeneracionDocCambio").select2({ theme: "bootstrap" });

            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbProgramaGeneracionDocCambio").append('<option value=' +
                        registro.ProgramaCodigo + '>' +
                        registro.ProgramaCodigo +
                        '</option>');
                })

                document.getElementById('cmbProgramaGeneracionDocCambio').selectedIndex = 0;

                document.getElementById('cmbProgramaGeneracionDocCambio').onchange = function () { fnCargarProyectosParaGenerarDocCambio(); };

                $('#cmbProgramaGeneracionDocCambio').trigger('change');

                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " fnCargarProgramasParaGenerarDocCambio", "success");
        });
}

function fnCargarProyectosParaGenerarDocCambio() {
    var url = baseHostURL + "api/EmergenciasApp/Proyecto/listar/" + $("#cmbPlanAnualGeneracion").val() + "/" + $("#cmbProgramaGeneracionDocCambio").val();    

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
                        fnCargarProyectosParaGenerarDocCambio();
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
            limpiarSelect('cmbProyectoGeneracionDocCambio');
            $("#cmbProyectoGeneracionDocCambio").select2({ theme: "bootstrap" });            

            if (datos) {
                if (datos.length > 0) {
                    datos.forEach(function (registro) {
                        $("#cmbProyectoGeneracionDocCambio").append('<option value=' +
                            registro.ProyectoCodigo + '>' +
                            registro.ProyectoCodigo +
                            '</option>');
                    })

                    if (proyEjecSeleccionar != '') {
                        $('#cmbProyectoGeneracionDocCambio').val(proyEjecSeleccionar);
                        proyEjecSeleccionar = '';
                    } else {
                        document.getElementById('cmbProyectoGeneracionDocCambio').selectedIndex = 0;
                    }

                    $('#cmbProyectoGeneracionDocCambio').trigger('change');

                    $.LoadingOverlay("hide");
                }
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            //Swal.fire("", error.message + " proy", "success");
        });
}

function fnGenerarProyectoEjecucion() {
    var vPlanAnualGeneracionProy = $('#cmbPlanAnualGeneracion').val();
    var vProgramaGeneracionProy = $('#cmbProgramaGeneracionProy').val();

    if (vPlanAnualGeneracionProy != null & vProgramaGeneracionProy != null) {
        var urlMetodo = baseHostURL + "api/EmergenciasApp/generarProyectoDeEjecucion";

        urlMetodo = urlMetodo + '/' + vIdEmergencia;
        urlMetodo = urlMetodo + '/' + vPlanAnualGeneracionProy;
        urlMetodo = urlMetodo + '/' + vProgramaGeneracionProy;
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
                                        fnGenerarProyectoEjecucion();
                                        clearInterval(interval);
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
                                Swal.fire("", datos.toString(), "success");
                                fnMostrarRegistro();
                            }
                        })
                        .catch(function (error) {
                            $.LoadingOverlay("hide");
                            Swal.fire("", error.message + " ", "success");
                        });
    }
    else {
        Swal.fire("", "Debe seleccionar el plan anual y el programa", "warning");
    }
}

function fnGenerarDocCambio() {
    var vPlanAnualGeneracionDocCambio = $('#cmbPlanAnualGeneracion').val();
    var vProyectoGeneracionDocCambio = $('#cmbProyectoGeneracionDocCambio').val();

    if (vPlanAnualGeneracionDocCambio != null & vProyectoGeneracionDocCambio != null) {
        var urlMetodo = baseHostURL + "api/EmergenciasApp/generarDocumentoDeCambio";        

        urlMetodo = urlMetodo + '/' + vIdEmergencia;
        urlMetodo = urlMetodo + '/' + vPlanAnualGeneracionDocCambio;
        urlMetodo = urlMetodo + '/' + vProyectoGeneracionDocCambio;
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
                            fnGenerarDocCambio();
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
                    Swal.fire("", datos.toString(), "success");
                    fnMostrarRegistro();
                }
            })
            .catch(function (error) {
                $.LoadingOverlay("hide");
                Swal.fire("", error.message + " ", "success");
            });
    }
    else {
        Swal.fire("", "Debe seleccionar el plan anual, programa y proyecto", "warning");
    }
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

function fnInicializaTableRenglonesPropuestaSolucion() {
    $('#tablePropuestaSolucion').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin renglones para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Renglones",
            "infoEmpty": "Mostrando 0 de 0 de 0 Renglones",
            "infoFiltered": "(Filtrado de _MAX_ total Renglones)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Renglones",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay renglones encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}


function fnActualizarEstadoFavorito(pIdDocumento, pFavorito) {
    var urlMetodo = baseHostURL + "api/EmergenciasApp/actualizarMultimediaFavorito";    
    
    urlMetodo = urlMetodo + '/' + vIdEmergencia;
    urlMetodo = urlMetodo + '/' + pIdDocumento;
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
        var urlImagenMarcador = document.location.origin + '../Images/Icons/icono_mapa_2.png';

        removerMarcadores();

        const marker = new google.maps.Marker({
            id: 'markerID',
            position: posicion,
            map: map,
            icon: urlImagenMarcador
        });

        gmarkers.push(marker);
        
    }
    map.setCenter(posicion);
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