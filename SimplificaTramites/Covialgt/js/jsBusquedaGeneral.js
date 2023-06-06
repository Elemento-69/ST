var vToken;
var vUsuarioActual;
var baseHostURL;
var proxyurl;

$(document).ready(function () {
    fnInicializaTableResultados();
    fnConsultarToken();
})

function fnConsultarToken() {

    $.ajax({
        type: "POST",
        url: "../Busqueda/frmBusquedaGeneral.aspx/fObtenerToken",
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
            }
        },
        failure: function (response) {
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}


function fnRefrescarToken(vTokenVencido) {
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const url = baseURL + "api/login/refreshtoken"
    //const proxyurl = "";

    //const url = "http://localhost:62555/api/login/refreshtoken"

    var dataJSON = JSON.stringify({
        TokenVencido: vTokenVencido
    });
    vToken = '';
    fetch(proxyurl + url, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: dataJSON

    })
        .then(response => {
            var estadoRespuesta = response.status;

            if (estadoRespuesta == 200) return response.json();

            if (estadoRespuesta == 404) {
                $.LoadingOverlay("hide");
            }
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            var datos = data;

            if (datos.length > 0) {
                fnActualizarToken(datos);
                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " " + vUsuario, "success");

        });
}

function fnActualizarToken(token) {
    var dataJSONt = JSON.stringify({
        pToken: token
    });
    $.ajax({
        type: "POST",
        url: "frmBusquedaGeneral.aspx/fActualizarToken",
        data: dataJSONt,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data) {
                vToken = token
                return true
            }
        },
        failure: function (response) {
            return false
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}

function fnInicializaTableResultados() {
    $('#tableResultados').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin proyectos para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ proyectos",
            "infoEmpty": "Mostrando 0 de 0 de 0 proyectos",
            "infoFiltered": "(Filtrado de _MAX_ total de proyectos)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ proyectos",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontraron proyectos",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnCargarResultadosBusqueda() {
    var url = baseHostURL + "api/BusquedaProySuper/ObtenerTodosLosProyectos/";

    //Criterio de búsqueda
    var criterio = document.getElementById('txtCriterioBusqueda').value + '/';

    if (criterio.length > 0) {
        url = url + criterio;
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
                            fnCargarResultadosBusqueda();
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
                $('#tableResultados').dataTable().fnClearTable();
                $('#tableResultados').dataTable().fnDestroy();

                var datos = data;
                var contador = 1;

                $("tbody").children().remove();

                if (datos.length > 0) {
                    datos.forEach(function (registro) {
                        var strProyectoCodigo = "'" + registro.ProyectoCodigo + "'";
                        var tbody = '<tr><td class="spacer"></td>';
                        tbody += '<td style="width: 50px">' +
                            '          <a href="#fn" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"' +
                            '           data-content="VerDashboard" data-placement="top" title="Ver detalle" onclick="fnAbrirDashboard(' + registro.AnioID + ',' + strProyectoCodigo + ')">' +
                            '           <i class="fas fa-search fa-lg fa-fw"></i></a> ' +
                            '</td>';
                        tbody += '<td>' + registro.AnioID + '</td>' +
                            '<td>' + registro.ProyectoCodigo + '</td>' +
                            '<td>' + registro.Nombre + '</td>' +
                            '<td>' + registro.AnioSup + '</td>' +
                            '<td>' + registro.ProyectoSup + '</td>' +
                            '<td>' + registro.Supervisor + '</td>' +
                            '<td class="spacer"></td>' +
                            '</tr>';

                        $('#tableResultados').append(tbody);

                        contador = contador + 1;
                    })
                    fnInicializaTableResultados();
                    $.LoadingOverlay("hide");
                }
            })
            .catch(function (error) {
                $.LoadingOverlay("hide");
                Swal.fire("", error.message + " ", "success");
            });

    } else {
        Swal.fire("", "Debe ingresar el criterio de búsqueda", "warning");
    }
}


function fnAbrirDashboard(AnioID, ProyectoCodigo) {
    var urlString = "../Default?AnioProyecto=" + encodeURIComponent(AnioID) + "," + encodeURIComponent(ProyectoCodigo);
    window.open(urlString, "_blank");
}