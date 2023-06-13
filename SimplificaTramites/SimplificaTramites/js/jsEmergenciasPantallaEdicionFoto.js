var vToken;
var vUsuarioActual;
var proxyurl;
var baseHostURL;

var vIdEmergencia = -1;
var vIdArchivoMultimedia = -1;
var vLatitud = 14.628434;
var vLongitud = -90.522713;
var vNombreArchivo = "";
var vUrlArchivoMultimedia = "";

$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.has('emergenciaID')) {
        vIdEmergencia = urlParams.get('emergenciaID');    
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
        content: "Seleccione en el mapa la ubicaci&oacuten de la emergencia",
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
    const url = baseHostURL + "api/EmergenciasApp/obtenerDatosDeFoto/" + vIdEmergencia + "/" + vIdArchivoMultimedia;

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
                    vNombreArchivo = registro.NombreArchivo;
                    vUrlArchivoMultimedia = registro.urlArchivoMultimedia;

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

                    document.getElementById("image-foto").src = thumbnail + "Tipo=3&MaxPixels=0&Fotografia=" + vNombreArchivo + "&EMID=ID_" + vIdEmergencia + "&random=" + new Date().getTime();
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
        var urlMetodo = baseHostURL + "api/EmergenciasApp/editarDatosArchivoMultimedia";

        var registro = {
            Usuario: vUsuarioActual,
            Latitud: parseFloat($("#txtLatitud").val()),
            Longitud: parseFloat($("#txtLongitud").val()),
            Comentario: $("#txtComentario").val(),
            ArchivoID: vIdArchivoMultimedia,
            EmergenciaID: vIdEmergencia
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


function fnRotarFoto(rotarIzquierda) {

  
    var dataJSONt = JSON.stringify({
        idEmergencia: vIdEmergencia,
        nombreArchivo: vNombreArchivo,
        rotarIzquierda: rotarIzquierda        
    });
    $.ajax({
        type: "POST",
        url: "frmEmergenciasEdicionFoto.aspx/fRotarFoto",
        data: dataJSONt,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var nombreArchivoNuevo = data.d;
            var rutaFoto = thumbnail + "Tipo=3&MaxPixels=0&Fotografia=" + vNombreArchivo + "&EMID=ID_" + vIdEmergencia+ "&random=" + new Date().getTime();
            //localhost:44390/GetThumbnail.aspx?Tipo=3&MaxPixels=0&Fotografia=000053582W.jpeg&EMID=ID_1
            document.getElementById("image-foto").src = rutaFoto;
         //   var rutaFotoEmergencia = vRutaEmergencias + 'Fotos\\ID_' + idEmergencia + '\\'
            //var dataJSONRotar = JSON.stringify({
            //    idEmergencia: vIdEmergencia,
            //    archivoOriginal:vNombreArchivo,
            //    archivoTemporal: nombreArchivoNuevo
            //})
            //$.ajax({
            //    type: "POST",
            //    url: "frmEmergenciasEdicionFoto.aspx/fReemplazarArchivoFoto",
            //    data: dataJSONRotar,
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    success: function (data) {
            //        var resultado = data.d;

            //        if (resultado) {

            //        }
            //        //var rutaFoto = thumbnail + "Tipo=3&MaxPixels=0&Fotografia=" + nombreArchivoNuevo + ".jpeg&EMID=ID_" + vIdEmergencia + "&random=" + new Date().getTime();
            //        ////localhost:44390/GetThumbnail.aspx?Tipo=3&MaxPixels=0&Fotografia=000053582W.jpeg&EMID=ID_1
            //        //document.getElementById("image-foto").src = rutaFoto;
                

            //    },
            //    failure: function (response) {
            //        Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
            //    }
            //});
        },
        failure: function (response) {           
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}