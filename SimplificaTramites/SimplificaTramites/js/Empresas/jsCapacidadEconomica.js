var vToken;
var vUsuarioActual;
var baseHostURL;
var proxyurl;
var baseSitio;

var vEmpresaNIT = "";
var modoNuevoRegistro = false;

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    vEmpresaNIT = urlParams.get('EmpresaNIT');    
    $("#txtNIT").val(vEmpresaNIT);
    $("#txtNIT").prop("disabled", true);


    fnConsultarToken();

    $("#btnRegresar").click(function () {
        //var planAnual = ($("#PlanAnualList").val() == undefined) ? user.substring(0, 4) : $("#PlanAnualList").val()
        //var Programa = ($('#ProgramaList').val() == undefined) ? $('#ProyectoListSup').val().split("-")[0].toString() : $('#ProgramaList').val();
        //var Proyecto = ($('#ProyectoList').val() == undefined) ? $('#ProyectoListSup').val() : $('#ProyectoList').val()
        //let QueryString = "?Plan=" + planAnual + "&Programa=" + Programa + "&Proyecto=" + Proyecto
        let QueryString = "";
        window.location.href = "frmMaestroDeEmpresas.aspx" + QueryString;
    })    
})

function fnConsultarToken() {
    $.ajax({
        type: "POST",
        url: "../Empresas/frmCapacidadEconomica.aspx/fObtenerToken",
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

                    fnCargarTablaConsulta();                   
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
        select.remove(0);
    }
}

function fnCargarComboAnios() {
    const url = baseHostURL + "api/CapacidadEconomica/ListarAniosSinRegistro/" + vEmpresaNIT;
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
                        fnCargarComboAnios();
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
            limpiarSelect('cmbAnio');
            $("#cmbAnio").select2({ theme: "bootstrap" })
            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbAnio").append('<option value=' +
                        registro.AnioID + '>' +
                        registro.PlanAnualNombre +
                        '</option>');
                })
                document.getElementById('cmbAnio').selectedIndex = 0;
                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " años ", "success");
        });
}

function fnCargarComboAnios_UnSoloRegistro(AnioID) {
    limpiarSelect('cmbAnio');
    $("#cmbAnio").select2({ theme: "bootstrap" })
    $("#cmbAnio").append('<option value=' +
        AnioID + '>' +
        AnioID +
        '</option>');
    document.getElementById('cmbAnio').selectedIndex = 0;
}

function mostrarModalAgregarRegistro() {
    fnCargarComboAnios();
    modoNuevoRegistro = true;
    
    document.getElementById('letreroModalEdicion').innerHTML = "Agregar nuevo registro";
    document.getElementById('letreroEmpresa').innerHTML = "NIT:  " + vEmpresaNIT;
    $('#txtMonto').val("");
    $('#modalEdicion').show();
}


function fnInicializaTable() {
    $('#tableCapacidadEconomica').dataTable({
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
    var url = baseHostURL + "api/CapacidadEconomica/Consultar/";

    //ID Empresa
    url = url + document.getElementById('txtNIT').value + '/';

    //Año
    if (document.getElementById('txtAnio').value.length > 0) {
        url = url + document.getElementById('txtAnio').value + '/';
    } else {
        url = url + '0/';
    }

    //Grupo capacidad económica
    if (document.getElementById('txtCapacidadLiteral').value.length > 0) {
        url = url + document.getElementById('txtCapacidadLiteral').value + '/';
    } else {
        url = url + 'xx/';
    }

    //Filtro de grupo de capacidad económica
    if (document.getElementById('radioIgualA').checked) {
        url = url + 'igual';
    } else {
        if (document.getElementById('radioMenorQue').checked) {
            url = url + 'menor';
        } else {
            if (document.getElementById('radioMayorQue').checked) {
                url = url + 'mayor';
            } else {
                url = url + 'xx';
            }
        }
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
            $('#tableCapacidadEconomica').dataTable().fnClearTable();
            $('#tableCapacidadEconomica').dataTable().fnDestroy();

            var datos = data;
            var contador = 1;

            $("tbody").children().remove();

            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    var fnEditarRegistro = "mostrarModalEditarRegistro('" + registro.EmpresaNIT + "', " + registro.AnioID + ", '" + registro.EmpresaNombre + "', " + registro.CapaEconMonto + ");";
                    var fnEliminarRegistro = "fnConfimarEliminarRegistro('" + registro.EmpresaNIT + "', " + registro.AnioID + ");";
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
                    tbody += '<td >' + registro.AnioID + '</td>' +
                        '<td >' + registro.EmpresaNIT + '</td>' +
                        '<td>' + registro.EmpresaNombre + '</td>' +
                        '<td >' + registro.CapaEconGrupo + '</td>' +
                        '<td class="frcurrency-mask" >' + registro.CapaEconMonto + '</td>' +
                        '<td class="spacer"></td>' +
                        '</tr>';

                    $('#tableCapacidadEconomica').append(tbody);

                    contador = contador + 1;
                })
                initMasks();
                fnInicializaTable();
                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });
}

function mostrarModalEditarRegistro(pEmpresaNIT, pAnioID, pEmpresaNombre, pCapaEconMonto) {
    fnCargarComboAnios_UnSoloRegistro(pAnioID);
    modoNuevoRegistro = false;

    document.getElementById('letreroModalEdicion').innerHTML = "Editar registro";
    document.getElementById('letreroEmpresa').innerHTML = pEmpresaNombre;
    $('#txtMonto').val(pCapaEconMonto);

    $('#modalEdicion').show();
}

function fnConfimarEliminarRegistro(pEmpresaNIT, pAnio) {
    var pregunta = "\u00BFDesea eliminar el registro del año " + pAnio + " ? ";

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
                    url: `${baseHostURL}api/CapacidadEconomica/EliminarRegistro`,
                    method: "post",
                    data: JSON.stringify({
                        "EmpresaNIT": pEmpresaNIT,
                        "AnioID": pAnio,
                    }),
                    headers: {
                        "Authorization": "Bearer " + vToken,
                        "Content-Type": "application/json"
                    },
                    success: (val) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("Éxito", "Registro eliminado", "success");
                        fnCargarTablaConsulta();
                    },
                    error: (error) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("", error.message + "No se puede eliminar el registro", "error");
                    }
                })
            }
        });
}


function fnGrabarRegistro() {
    if ($('#cmbAnio').val() != '') {
        if ($('#txtMonto').val() != '') {
            var urlMetodo = baseHostURL;
            if (modoNuevoRegistro) {
                urlMetodo = urlMetodo + "api/CapacidadEconomica/AgregarRegistro";
            } else {
                urlMetodo = urlMetodo + "api/CapacidadEconomica/ActualizarRegistro";
            }

            var registro = {
                AnioID: $("#cmbAnio").val(),
                EmpresaNIT: vEmpresaNIT,
                CapaEconMonto: $("#txtMonto").val(),
                UserName: vUsuarioActual,
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
                    if (data) {
                        Swal.fire("", "Registro grabado exitosamente", "success");
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
            Swal.fire("", "Debe ingresar el monto de la capacidad econ&oacutemica", "warning");
        }
    }
    else {
        Swal.fire("", "Debe seleccionar un año", "warning");
    }
}


function fnGenerarReporte() {   
    //Año
    var anio = 0;
    if (document.getElementById('txtAnio').value.length > 0) {
        anio = document.getElementById('txtAnio').value;
    }

    //Grupo capacidad económica
    var grupo = 'xx';
    if (document.getElementById('txtCapacidadLiteral').value.length > 0) {
        grupo = document.getElementById('txtCapacidadLiteral').value;
    }

    //Filtro de grupo de capacidad económica
    var filtro = 'xx';
    if (document.getElementById('radioIgualA').checked) {
        filtro = 'igual';
    } else {
        if (document.getElementById('radioMenorQue').checked) {
            filtro = 'menor';
        } else {
            if (document.getElementById('radioMayorQue').checked) {
                filtro = 'mayor';
            }
        }
    }

    opendialog(`/VisorInformes.aspx?IdReporte=1148&Parameters=${vEmpresaNIT},${anio},${grupo},${filtro}`);
}

function opendialog(page) {
    var $dialog = $('#divDialogo')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Reporte de Capacidad Económica",
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
                   



                    



