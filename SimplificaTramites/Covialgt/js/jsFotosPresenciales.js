var vToken;
var vUsuarioActual;
var proxyurl;
var baseHostURL;

$(document).ready(function () {
    loadDefaultComponents();
    fnInicializaTableFotos();
    fnConsultarToken();
})


function fnConsultarToken() {
    $.ajax({
        type: "POST",
        url: "../Fotografias/frmFotosPresenciales.aspx/fObtenerToken",
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
                });

                fnCargarPlanesAnuales();
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


function fnCargarPlanesAnuales() {
    var url = baseHostURL + "api/FotografiasPresenciales/GetAnios";
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

            $("#cmbPlanAnual1").append('<option value="0">Incluir todos</option>');

            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbPlanAnual1").append('<option value=' +
                        registro.AnioID + '>' +
                        registro.AnioID +
                        '</option>');
                })

                document.getElementById('cmbPlanAnual1').onchange = function () { fnCargarProyectos(); };

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

function fnCargarProyectos() {
    if ($("#cmbPlanAnual1").val() != null) {
        var url = baseHostURL + "api/FotografiasPresenciales/GetProyectos/" + $("#cmbPlanAnual1").val();
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
                $("#cmbProyecto1").append('<option value="[TODOS]">Incluir todos</option>');
                if (datos) {
                    if (datos.length > 0) {
                        datos.forEach(function (registro) {
                            $("#cmbProyecto1").append('<option value=' +
                                registro.ProyectoCodigo + '>' +
                                registro.ProyectoCodigo +
                                '</option>');
                        })

                        document.getElementById('cmbProyecto1').selectedIndex = 0;

                        $.LoadingOverlay("hide");
                    }
                }
            })
            .catch(function (error) {
                $.LoadingOverlay("hide");
                Swal.fire("", error.message + " proy", "success");
            });
    }
}



function fnInicializaTableFotos() {
    $('#tableFotos').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin fotografías para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ fotografías",
            "infoEmpty": "Mostrando 0 de 0 de 0 fotografías",
            "infoFiltered": "(Filtrado de _MAX_ total fotografías)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ fotografías",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontraron fotografías",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
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

function fnCargarTablaFotos() {

    var url = baseHostURL + "api/FotografiasPresenciales/GetFotografiasPresenciales/" ;

    url = url + document.getElementById('cmbPlanAnual1').value + '/';
    url = url + document.getElementById('cmbProyecto1').value + '/';
    //Rango de fechas
    var fechaIni = 'x/';
    var fechaFin = 'x/';

    var strFechaIni = document.getElementById('dtDesde').value;
    var strFechaFin = document.getElementById('dtHasta').value;
    if (fnValidarFormatoFecha(strFechaIni)) {
        var fechaNuevoFormato = strFechaIni.substring(0, 2) + '-' + strFechaIni.substring(3, 5) + '-' + strFechaIni.substring(6, 10);
        fechaIni = fechaNuevoFormato + '/';
    }
    if (fnValidarFormatoFecha(strFechaFin)) {
        var fechaNuevoFormato = strFechaFin.substring(0, 2) + '-' + strFechaFin.substring(3, 5) + '-' + strFechaFin.substring(6, 10);
        fechaFin = fechaNuevoFormato + '/';
    }

    //Fecha Desde
    url = url + fechaIni;
    //Fecha Hasta
    url = url + fechaFin;
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
                            fnCargarTablaFotos();
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
                $('#tableFotos').dataTable().fnClearTable();
                $('#tableFotos').dataTable().fnDestroy();

                var datos = data;

                $("tbody").children().remove();
                
                if (datos) {
                    if (datos.length > 0) {
                        datos.forEach(function (registro) {
                           
                            var fechaFormateada = "";
                            var fecha = registro.Fecha;
                            if (fecha) {
                                if (fecha.length >= 10) {
                                    fechaFormateada = fecha.substring(8, 10) + '/' + fecha.substring(5, 7) + '/' + fecha.substring(0, 4);
                                }
                            }

                            var urlFoto = thumbnail + 'Tipo=1&MaxPixels=200&Fotografia=' + registro.Foto;

                            var imagen = '<img src="' + urlFoto + '" alt="Foto"  width="300">';

                            var tbody = '<tr class="tr_data" >' +
                                '<td class="spacer"></td>';
                            tbody += '<td>' + registro.AnioID + '</td>' +
                                '<td>' + registro.ProyectoCodigo + '</td>' +
                                '<td>' + fechaFormateada + '</td>' +
                                '<td>' + imagen + '</td>' +
                                '<td class="spacer"></td>' +
                                '</tr>';

                            $('#tableFotos').append(tbody);                           
                        })
                    }
                }
                fnInicializaTableFotos();
                $.LoadingOverlay("hide");
            })
            .catch(function (error) {
                $.LoadingOverlay("hide");
                Swal.fire("", "Error en consulta de fotografías. " + error.message + "  ", "error");
            });

}

