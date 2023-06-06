var vToken;
var vUsuarioActual;
var baseHostURL;

$(document).ready(function () {
    fnInicializaTableEstimaciones();
    fnConsultarToken();
})


function fnConsultarToken() {
    $.ajax({
        type: "POST",
        url: "../Estimaciones/frmEstimacionesEstructuraRenglones.aspx/fObtenerToken",
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

                    fnCargarPlanesAnuales();
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
    var url = baseHostURL + "api/PlanAnual/Get";
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
        var url = baseHostURL + "api/Programa/Get/" + $("#cmbPlanAnual1").val();
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

                    document.getElementById('cmbPrograma1').onchange = function () { fnCargarProyectos(); };

                    document.getElementById('cmbPrograma1').selectedIndex = 0;

                    $('#cmbPrograma1').trigger('change');

                    $.LoadingOverlay("hide");
                }
            })
            .catch(function (error) {
                $.LoadingOverlay("hide");
                Swal.fire("", error.message + " ", "error");
                Swal.fire("", "No se encontraron programas para este plan anual", "error");
            });
    }
}

function fnCargarProyectos() {
    if ($("#cmbPrograma1").val() != null) {
        var url = baseHostURL + "api/Proyecto/GetListadoXPrograma/" + $("#cmbPlanAnual1").val() + "/" + $("#cmbPrograma1").val() ;
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

                if (datos) {
                    if (datos.length > 0) {
                        datos.forEach(function (registro) {
                            $("#cmbProyecto1").append('<option value=' +
                                registro.ProyectoCodigo + '>' +
                                registro.ProyectoCodigo +
                                '</option>');
                        })

                        document.getElementById('cmbProyecto1').onchange = function () {
                            fnVaciarTableEstimaciones();                            
                        };

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
}


function fnInicializaTableEstimaciones() {
    $('#tableEstimaciones').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin estimaciones para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Estimaciones",
            "infoEmpty": "Mostrando 0 de 0 de 0 Estimaciones",
            "infoFiltered": "(Filtrado de _MAX_ total Estimaciones)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Estimaciones",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay estimaciones encontradas",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function fnInicializaTableDetalle() {
    $('#estimacion_detail-table').dataTable({
        paging: true,
        destroy: false,
        searching: true,
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

function fnVaciarTableEstimaciones() {
    $('#tableEstimaciones').dataTable().fnClearTable();
    $('#tableEstimaciones').dataTable().fnDestroy();
    $("tbody").children().remove();
    $("#total-estimaciones").val(0.00);
}

function fnVaciarTableDetalle() {
    $('#estimacion_detail-table').dataTable().fnClearTable();
    $('#estimacion_detail-table').dataTable().fnDestroy();
}

function fnCargarEstimacionesFiltradas() {
    var url = baseHostURL + "api/Dashboard/GetEstimacionesGerencial/" + $("#cmbPlanAnual1").val() + "/" + $("#cmbProyecto1").val();
        
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
                        fnCargarEstimacionesFiltradas();
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
        .then(val => {
            fnVaciarTableEstimaciones();

            let total = val.reduce((acc, item) => {
                return acc += item.MontoaRecibir
            }, 0)

            let cols = val.map((item) => `<tr><td class="spacer"></td>
            <td>
                <button type="button" data-id="${item.EstimacionCorr}" class="btn btn-light action-icon hover-blue estimacion_detail-btn" data-toggle="modal" data-target="#estimacionModal"  >
                    <i class="fas fa-eye fa-lg fa-fw"></i>
                </a>
            </td>
            <td>${item.EstimacionCorr}</td>
            <td>${item.Periodo}</td>
            <td class="frcurrency-mask">${item.MontoRetencion}</td>
            <td class="frcurrency-mask">${item.MontoEjecutado}</td>
            <td class="frcurrency-mask">${item.MontoaRecibir}</td>
            <td class="frcurrency-mask">${item.MontoEmbargado}</td>
            <td>${item.CertificadoSup}</td>
            <td>${item.EstadoDesc}</td>
            <td>${moment(item.DateModify).format('DD/MM/YYYY')}</td>
            <td class="spacer"></td></tr>`)

            $("#tableEstimaciones tbody").html(cols.join(""))
            $("#total-estimaciones").val(total)

            $(".estimacion_detail-btn").on("click", ({ currentTarget }) => {
                document.getElementById('titulo-pantalla-detalle').innerHTML = "Detalle de la estimación " + currentTarget.dataset.id;
                var urlDetalle = baseHostURL + "api/EstimacionDetalle/ObtenerDetalleRenglonesTramos/" + $("#cmbPlanAnual1").val() + "/" + $("#cmbProyecto1").val() + "/" + currentTarget.dataset.id;
                
                //alert(urlDetalle);
                $.ajax({
                    url: urlDetalle,
                    headers: {
                        "Authorization": "Bearer " + vToken,
                        "Content-Type": "application/json",
                    },
                    success: (val) => {                        
                        fnVaciarTableDetalle();

                        let table = $("#estimacion_detail-table tbody");
                        table.find("tr").remove()
                        let cols = val.map((item) => `<tr><td class="spacer"></td>
                            <td class="min">${item.TramoCodigo}</td>
                            <td>${item.TramoDesc}</td>
                            <td>${item.RenglonCodCOVIAL}</td>
                            <td>${item.ProyectoRenglonNombre}</td>
                            <td class="min" >${item.Cantidad}</td>
                            <td class="frcurrency-mask min">${item.RenglonPrecioUnitario || 0}</td>
                            <td class="frcurrency-mask min">${item.Monto}</td>
                            <td class="spacer"></td></tr>`)                        

                        table.html(cols.join(""))

                        const suma = val.reduce((partial_sum, a) => partial_sum + a.Monto, 0);                        
                        $("#total-detalle-estimaciones").val(suma);

                        initMasks();
                        fnInicializaTableDetalle();                        
                    }
                })                
            })
            initMasks();
            fnInicializaTableEstimaciones();
            $.LoadingOverlay("hide");
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });
}
