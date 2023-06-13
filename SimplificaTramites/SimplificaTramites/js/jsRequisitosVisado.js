var vToken;
var vUsuarioActual;
var baseHostURL;
var proxyurl;
var baseSitio;

var modoNuevoRegistro = false;

var anioSeleccionar = 0;
var programaSeleccionar = 'xx';
var guiaSeleccionar = -1;

$(document).ready(function () {
    fnConsultarToken();
})

function fnConsultarToken() {
    $.ajax({
        type: "POST",
        url: "../Visado/frmRequisitosVisado.aspx/fObtenerToken",
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var vRespuestaJSON = JSON.parse(data.d);
            if (vRespuestaJSON.dioError == true) {
              //  $.LoadingOverlay("hide");
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
                    fnCargarPlanesAnuales_Modal();
                    
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

function limpiarSelect_Modal(idSelect) {
    var select = document.getElementById(idSelect);
    while (select.length > 0) {
        select.remove(0);
    }
}


function fnCargarPlanesAnuales() {
    $.LoadingOverlay("show");

    var url = baseHostURL + "/api/RequisitosVisado/ListarPlanesAnualesConRequisitosVisado";

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
            limpiarSelect_Modal('cmbAnio1');
            
            $("#cmbAnio1").select2({ theme: "bootstrap" });
            
            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbAnio1").append('<option value=' +
                        registro.AnioID + '>' +
                        registro.AnioID +
                        '</option>');
                })

                document.getElementById('cmbAnio1').onchange = function () { fnCargarProgramas(); };
                document.getElementById('cmbAnio1').selectedIndex = 0;
                $('#cmbAnio1').trigger('change');

                //$.LoadingOverlay("hide");
            }

            fnCargarTablaConsulta();
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " fnCargarPlanesAnuales", "success");
        });
}

function fnCargarProgramas() {
    const url = baseHostURL + "api/RequisitosVisado/ListarProgramasConRequisitosVisado/" + $("#cmbAnio1").val();

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

                document.getElementById('cmbPrograma1').selectedIndex = 0;

                $('#cmbPrograma1').trigger('change');

               // $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " fnCargarProgramas", "success");
        });
}

function fnInicializaTable() {
    $('#tableRequisitos').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin registros para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
            "infoEmpty": "Mostrando 0 de 0 de 0 registros",
            "infoFiltered": "(Filtrado de _MAX_ total registros)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ registros",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontraron registros",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnCargarTablaConsulta() {
    $.LoadingOverlay("show");

    var url = baseHostURL + "api/RequisitosVisado/ObtenerVisadoRequisitosPorFiltros/";

    //Año
    if (document.getElementById('cmbAnio1').value.length > 0) {
        url = url + document.getElementById('cmbAnio1').value + '/';
    } else {
        url = url + '0/';
    }

    //Programa
    if (document.getElementById('cmbPrograma1').value.length > 0) {
        url = url + document.getElementById('cmbPrograma1').value + '/';
    } else {
        url = url + 'xx/';
    }


    //Guia de visado
    if (document.getElementById('txtGuiaVisado').value.length > 0) {
        url = url + document.getElementById('txtGuiaVisado').value + '/';
    } else {
        url = url + '0/';
    }


    //Correlativo de requisito
    if (document.getElementById('txtCorrRequisito').value.length > 0) {
        url = url + document.getElementById('txtCorrRequisito').value + '/';
    } else {
        url = url + '0/';
    }

    //Descripción
    if (document.getElementById('txtDescripcion').value.length > 0) {
        url = url + document.getElementById('txtDescripcion').value + '/';
    } else {
        url = url + 'xx/';
    }

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
                        fnCargarTablaConsulta();
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
            $('#tableRequisitos').dataTable().fnClearTable();
            $('#tableRequisitos').dataTable().fnDestroy();

            var datos = data;
            var contador = 1;

            $("tbody").children().remove();

            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    var fnEditarRegistro = "mostrarModalEditarRegistro(" + registro.AnioID + ", '" + registro.ProgramaCodigo + "', " + registro.GuiaVisadoCorr + ", " + registro.RequisitoCorrel + ", '" + registro.RequisistoDesc + "' ); ";
                    var fnEliminarRegistro = "fnConfimarEliminarRegistro(" + registro.AnioID + ", '" + registro.ProgramaCodigo + "', " + registro.GuiaVisadoCorr + ", " + registro.RequisitoCorrel + ");";

                    //alert(fnEditarRegistro);
                    var tbody = '<tr>' +
                        '<td class="spacer"></td>';
                    tbody += '<td style="width: 100px">' +
                        '          <a href="#fn" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"' +
                        '           data-content="Editar" data-placement="top" title="Editar registro" onclick="' + fnEditarRegistro + '">' +
                        '           <i class="fas fa-edit fa-lg fa-fw"></i></a> ' +
                        '           &nbsp; ' +
                        '          <a href="#fn" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"' +
                        '           data-content="Eliminar" data-placement="top" title="Eliminar registro" onclick="' + fnEliminarRegistro + '">' +
                        '           <i class="fas fa-trash fa-lg fa-fw"></i></a> ' +
                        '</td>';
                    tbody += '<td>' + registro.AnioID + '</td>' +
                        '<td >' + registro.ProgramaCodigo + '</td>' +
                        '<td >' + registro.GuiaVisadoCorr + '</td>' +
                        '<td >' + registro.RequisitoCorrel + '</td>' +
                        '<td >' + registro.RequisistoDesc + '</td>' +
                        '<td class="spacer"></td>' +
                        '</tr>';

                    $('#tableRequisitos').append(tbody);

                    contador = contador + 1;
                })            

                fnInicializaTable();
                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });
}

function fnCargarPlanesAnuales_Modal() {
    var url = baseHostURL + "/api/PlanesAnuales/ObtenerPlanesAnuales";

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
                        fnCargarPlanesAnuales_Modal();
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
            var encontroRegistros = false;
            if (datos) {
                if (datos.length > 0) {
                    encontroRegistros = true;
                }
            }

            limpiarSelect_Modal('cmbAnio2');
            $("#cmbAnio2").select2({ theme: "bootstrap" });

            if (encontroRegistros) {
                datos.forEach(function (registro) {
                    $("#cmbAnio2").append('<option value=' +
                        registro.AnioID + '>' +
                        registro.PlanAnualNombre +
                        '</option>');
                })
                              
                if (anioSeleccionar != 0) {
                    $('#cmbAnio2').val(anioSeleccionar);
                    anioSeleccionar = 0;
                } else {
                    document.getElementById('cmbAnio2').selectedIndex = 0;
                }
            } else {
                $("#cmbAnio2").append('<option value=' +
                    0 + '>' +
                    'Sin años' +
                    '</option>');
                document.getElementById('cmbAnio2').selectedIndex = 0;
            }
            document.getElementById('cmbAnio2').onchange = function () { fnCargarProgramas_Modal(); };
            $('#cmbAnio2').trigger('change');          
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " fnCargarPlanesAnuales_Modal", "success");
        });
}

function fnCargarProgramas_Modal() {
    const url = baseHostURL + "api/Programa/Get/" + $("#cmbAnio2").val();
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
                        fnCargarProgramas_Modal();
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
            var encontroRegistros = false;
            if (datos) {
                if (datos.length > 0) {
                    encontroRegistros = true;
                }
            }

            limpiarSelect_Modal('cmbPrograma2');
            $("#cmbPrograma2").select2({ theme: "bootstrap" });

            var indiceSeleccionar = 0;
            var indice = 0;

            if (encontroRegistros) {
                datos.forEach(function (registro) {
                    $("#cmbPrograma2").append('<option value=' +
                        registro.ProgramaCodigo + '>' +
                        registro.ProgramaCodigo +
                        '</option>');

                    if (programaSeleccionar.trim() == registro.ProgramaCodigo.trim()) {
                        indiceSeleccionar = indice;
                    }
                    

                    indice = indice + 1;
                })                
                
                document.getElementById('cmbPrograma2').selectedIndex = indiceSeleccionar;
            } else {
                $("#cmbPrograma2").append('<option value="xx">' +
                    'Sin programas' +
                    '</option>');
                document.getElementById('cmbPrograma2').selectedIndex = 0;
            }
            document.getElementById('cmbPrograma2').onchange = function () { fnCargarGuiasVisado_Modal(); };
            $('#cmbPrograma2').trigger('change');

            $.LoadingOverlay("hide");            
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " fnCargarProgramas_Modal", "success");
        });
}

function fnCargarGuiasVisado_Modal() {
    const url = baseHostURL + "api/RequisitosVisado/ListarGuiasVisado/" + $("#cmbAnio2").val() + "/" + $("#cmbPrograma2").val();
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
                        fnCargarGuiasVisado_Modal();
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
            var encontroRegistros = false;
            if (datos) {
                if (datos.length > 0) {
                    encontroRegistros = true;
                }
            }

            limpiarSelect_Modal('cmbGuiaVisado2');
            $("#cmbGuiaVisado2").select2({ theme: "bootstrap" });

            if (encontroRegistros) {
                datos.forEach(function (registro) {
                    $("#cmbGuiaVisado2").append('<option value=' +
                        registro.GuiaVisadoCorr + '>' +
                        registro.Descripcion +
                        '</option>');
                })

                if (guiaSeleccionar != -1) {
                    $('#cmbGuiaVisado2').val(guiaSeleccionar);
                    guiaSeleccionar = -1;
                } else {
                    document.getElementById('cmbGuiaVisado2').selectedIndex = 0;
                }
            } else {
                $("#cmbGuiaVisado2").append('<option value=' +
                    0 + '>' +
                    'Sin guías' +
                    '</option>');
                document.getElementById('cmbGuiaVisado2').selectedIndex = 0;
            }
            $('#cmbGuiaVisado2').trigger('change');

            $.LoadingOverlay("hide");          
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " fnCargarGuiasVisado_Modal", "success");
        });
}


function mostrarModalAgregarRegistro() {
    modoNuevoRegistro = true;

    document.getElementById('letreroModalEdicion').innerHTML = "Nuevo requisito"; 
    anioSeleccionar = 0;
    programaSeleccionar = 'xx';
    guiaSeleccionar = -1;
    $('#txtCorrRequisito2').val("");    
    $('#txtDescripcion2').val("");
    fnCargarPlanesAnuales_Modal();    
    document.getElementById("cmbAnio2").disabled = false;
    document.getElementById("cmbPrograma2").disabled = false;
    document.getElementById("cmbGuiaVisado2").disabled = false;
    document.getElementById("txtCorrRequisito2").disabled = false;
    document.getElementById("txtDescripcion2").disabled = false;
    $('#modalEdicion').show();
}

function mostrarModalEditarRegistro(pAnioID, pProgramaCodigo, pGuiaVisadoCorr, pRequisitoCorrel, pRequisistoDesc) {
    modoNuevoRegistro = false;

    document.getElementById('letreroModalEdicion').innerHTML = "Editar requisito";
    anioSeleccionar = pAnioID;
    programaSeleccionar = pProgramaCodigo;
    guiaSeleccionar = pGuiaVisadoCorr;
    $('#txtCorrRequisito2').val(pRequisitoCorrel);
    $('#txtDescripcion2').val(pRequisistoDesc);
    fnCargarPlanesAnuales_Modal();
    document.getElementById("cmbAnio2").disabled = true;
    document.getElementById("cmbPrograma2").disabled = true;
    document.getElementById("cmbGuiaVisado2").disabled = true;
    document.getElementById("txtCorrRequisito2").disabled = true;
    document.getElementById("txtDescripcion2").disabled = false;
    $('#modalEdicion').show();
}

function fnConfimarEliminarRegistro(pAnioID, pProgramaCodigo, pGuiaVisadoCorr, pRequisitoCorrel) {
    var pregunta = "\u00BFDesea eliminar el requisito " + pRequisitoCorrel + " ? ";

    Swal.fire({
        title: "",
        text: pregunta,
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: 'Si',
        denyButtonText: 'No',
    })
        .then((result) => {
            if (result.isConfirmed) {
                $.LoadingOverlay("show")
                $.ajax({
                    url: `${baseHostURL}api/RequisitosVisado/EliminarVisadoRequisito`,
                    method: "post",
                    data: JSON.stringify({
                        "RequisitoCorrel": pRequisitoCorrel,
                        "GuiaVisadoCorr": pGuiaVisadoCorr,
                        "ProgramaCodigo": pProgramaCodigo,
                        "AnioID": pAnioID,
                    }),
                    headers: {
                        "Authorization": "Bearer " + vToken,
                        "Content-Type": "application/json"
                    },
                    success: (val) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("Éxito", "Requisito eliminado", "success");
                        fnCargarTablaConsulta();
                    },
                    error: (error) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("", error.message + "No se puede eliminar el requisito", "error");
                    }
                })
            }
        });
}


function fnGrabarRegistro() {
    var vTipoAccion = '';
    if ($('#cmbGuiaVisado2').val() != '') {
        if ($('#txtCorrRequisito2').val() != '') {
            var urlMetodo = baseHostURL;
            if (modoNuevoRegistro) {
                urlMetodo = urlMetodo + "api/RequisitosVisado/InsertarVisadoRequisito";
                vTipoAccion = 'I'
            } else {
                urlMetodo = urlMetodo + "api/RequisitosVisado/ActualizarVisadoRequisito";
                vTipoAccion = 'U'
            }

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            var fechaNuevoFormato = yyyy + '-' + mm + '-' + dd + 'T07:22Z';

            var registro = {
                RequisitoCorrel: $("#txtCorrRequisito2").val(),
                GuiaVisadoCorr: $("#cmbGuiaVisado2").val(),
                ProgramaCodigo: $("#cmbPrograma2").val(),
                AnioID: $("#cmbAnio2").val(),
                RequisistoDesc: $("#txtDescripcion2").val(),
                UserName: vUsuarioActual,
                DateModify: fechaNuevoFormato,
            };

            var dataJSONt = JSON.stringify(registro);
           // alert(dataJSONt);

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
                    if (vTipoAccion == 'I') {
                        if (data == -1) {
                            Swal.fire("", "Ya existe un registro con los mismos datos", "warning");
                        }
                        else {
                            Swal.fire("", "Requisito grabado exitosamente", "success");
                            fnCargarTablaConsulta();
                            $('#modalEdicion').hide();
                        }
                    }
                    if (vTipoAccion == 'U') {
                        Swal.fire("", "Requisito grabado exitosamente", "success");
                        fnCargarTablaConsulta();
                        $('#modalEdicion').hide();
                    }

                })
                .catch(function (error) {
                    $.LoadingOverlay("hide");
                    Swal.fire("", error.message + " ", "warning");
                });

        }
    else {
            Swal.fire("", "Debe ingresar el correlativo del requisito", "warning");
        }
    }
    else {
        Swal.fire("", "Debe seleccionar un guía de visado", "warning");
    }
}

