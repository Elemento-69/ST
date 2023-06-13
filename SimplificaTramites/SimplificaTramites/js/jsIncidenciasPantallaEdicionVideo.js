var vToken;
var vUsuarioActual;
var proxyurl;
var baseHostURL;

var vIdIncidencia = -1;
var vIdArchivoMultimedia = -1;
var vLatitud = 14.628434;
var vLongitud = -90.522713;

$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.has('incidenciaID')) {
        vIdIncidencia = urlParams.get('incidenciaID');
    }

    if (urlParams.has('archivoMultimediaID')) {
        vIdArchivoMultimedia = urlParams.get('archivoMultimediaID');
    }

    fnConsultarToken();
})

// Initialize and add the map
var map;
var gmarkers = [];
var infoWindow;

function initMap() {
    posicionInicial = { lat: vLatitud, lng: vLongitud };

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: posicionInicial,
    });
    map.setMapTypeId('satellite');


    // Create the initial InfoWindow.
    infoWindow = new google.maps.InfoWindow({
        content: "Seleccione en el mapa la ubicaci&oacuten donde se film&oacute el video",
        position: posicionInicial,
    });

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

        vLatitud = mapsMouseEvent.latLng.toJSON().lat;
        vLongitud = mapsMouseEvent.latLng.toJSON().lng;

        agregarMarcadorUbicacion(mapsMouseEvent.latLng.toJSON().lat, mapsMouseEvent.latLng.toJSON().lng);
    });
}


var _VIDEO,
    _CANVAS,
    _CANVAS_CTX;

// Video metadata is loaded
function fnLoadedMetadata() {
    // Set canvas dimensions same as video dimensions
    _CANVAS.width = _VIDEO.videoWidth;
    _CANVAS.height = _VIDEO.videoHeight;
};

function fnObtenerImagenThumbnail() {
    _CANVAS_CTX.drawImage(_VIDEO, 0, 0, _VIDEO.videoWidth, _VIDEO.videoHeight);
    return _CANVAS.toDataURL();
}

function removerMarcadores() {
    for (i = 0; i < gmarkers.length; i++) {
        gmarkers[i].setMap(null);
    }
    gmarkers.length = 0;
}

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

        // Close the current InfoWindow.
        infoWindow.close();
        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
            position: posicion,
        });
        infoWindow.setContent(
            JSON.stringify(posicion, null, 2)
        );
        infoWindow.open(map);

    }
}


function fnMostrarRegistro() {
    const url = baseHostURL + "api/IncidenciasApp/obtenerDatosDeVideo/" + vIdIncidencia + "/" + vIdArchivoMultimedia;

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
                    $("#lblTramo").text(registro.Tramo);

                    $("#lblNombreArchivo").text(registro.NombreArchivo);

                    var fecha = registro.Fecha;
                    var fechaFormateada = fecha.substring(8, 10) + '/' + fecha.substring(5, 7) + '/' + fecha.substring(0, 4);
                    $("#lblFecha").text(fechaFormateada);

                    $("#lblFormato").text(registro.MIME);

                    $("#txtLatitud").val(registro.Latitud);

                    $("#txtLongitud").val(registro.Longitud);

                    vLatitud = registro.Latitud;
                    vLongitud = registro.Longitud;

                    agregarMarcadorUbicacion(registro.Latitud, registro.Longitud);

                    $("#txtComentario").val(registro.Comentario);

                    _VIDEO = document.getElementById('video-element');
                    _VIDEO.setAttribute('src', registro.urlArchivoMultimedia);
                    _VIDEO.load();

                    _CANVAS = document.getElementById('canvas-element'),
                        _CANVAS_CTX = _CANVAS.getContext("2d");

                    _VIDEO.addEventListener('loadedmetadata', fnLoadedMetadata);

                    document.getElementById("imageThumbnail").src = registro.urlArchivoThumbnail;
                    $.LoadingOverlay("hide");
                })
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");

        });
}

function fnGrabarRegistro() {
    if ($('#txtLatitud').val() != '' & $('#txtLongitud').val() != '') {
        var urlMetodo = baseHostURL + "api/IncidenciasApp/editarDatosArchivoMultimedia";

        var registro = {
            Usuario: vUsuarioActual,
            Latitud: parseFloat($("#txtLatitud").val()),
            Longitud: parseFloat($("#txtLongitud").val()),
            Comentario: $("#txtComentario").val(),
            ArchivoID: vIdArchivoMultimedia,
            IncidenciaID: vIdIncidencia
        };


        var arreglo = [registro];

        var dataJSONt = JSON.stringify({
            objetoArchivos: arreglo,
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
                    Swal.fire("", "Datos actualizados exitosamente", "success");
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

function fnGrabarThumbnail() {
    var urlMetodo = baseHostURL + "api/IncidenciasApp/actualizarThumbnailDeVideo";
    var thumbNailBase64 = fnObtenerImagenThumbnail();

    var registro = {
        IncidenciaID: vIdIncidencia,
        VideoID: vIdArchivoMultimedia,
        ArchivoBase64ThumbNail: thumbNailBase64,
        Usuario: vUsuarioActual,
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
                        fnGrabarThumbnail();
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
            var urlArchivoThumbnail = data;

            if (urlArchivoThumbnail.length > 0) {
                Swal.fire("", "Thumbnail actualizado exitosamente", "success");
                //alert(urlArchivoThumbnail);
                document.getElementById("imageThumbnail").src = thumbnail + "Tipo=9 & MaxPixels=0 & Fotografia=" + urlArchivoThumbnail;
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });
}