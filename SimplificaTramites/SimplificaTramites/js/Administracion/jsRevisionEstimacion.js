var data_row = null;

EventSelectionRow("table-detalles");
EventSelectionRow("table-sanciones");
EventSelectionRow("table-reparos-observaciones");
EventSelectionRow("table-reparos-observaciones-edicion");

// Cargar datos a la tabla de estimaciones
function LoadCantidadAsociada(opcion) {
    $("#estados").val(0);
    $("#estados").prop("disabled", true);
    LoadTableDataDetalles(null, null, null, null, true);
    LoadTableSanciones(null, null, true);
    LoadTableReparos(null, null, null, true);
    LoadTableReparosDetalleUltimo(null, null, null, true);
    $('#guiaVisado').html(null);
    $("#text-title-revision").html(null);
    data_row = null;
    var columns = [
        { data: 'null', className: 'spacer', title: '', render: () => '' },
        { data: 'AnioID', title: 'Año' },
        { data: 'ProyectoCodigo', title: 'Proy' },
        { data: 'EstimacionCorr', title: 'Corr.' },
        { data: 'Periodo', title: 'Período' },
        { data: 'MontoEjecutado', title: 'Monto Ejecutado', render: (data) => format_currency(data, 'Q') },
        { data: 'RevisorUserName', title: 'Revisor' },
        { data: 'FechaRecepcion', title: 'Fecha Recepción', render: format_date },
        { data: 'DiasDesdeRecepcion', title: 'Días desde Recepción' },
        { data: 'EstadoDesc', title: 'Estado' },
        { data: 'null', className: 'spacer', title: '', render: () => '' },
    ];
    $.ajax({
        url: `${urlbase}api/RevisionEstimacion/GetEstimacionesRevisionesUsuarios/${usuario}/${opcion}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $("#table-cantidadAsociacion").DataTable(WithoutPaginationSelect(url_proyecto, columns, val))
        },
        error: () => $("#table-cantidadAsociacion").DataTable(WithoutPaginationSelect(url_proyecto, columns, []))
    });
}

// Cargar la tabla de estimacion dependiendo del tipo de seleccion
$(`input[type="radio"][name="tipo"]`).on("change", (e) => {
    LoadCantidadAsociada(e.currentTarget.value);
});
LoadCantidadAsociada(2);

// Cargar datos al seleccionar un registro en la tabla de estimaciones
$('#table-cantidadAsociacion').on('click', 'tbody tr', function (e) {
    $("#table-cantidadAsociacion tbody > tr").removeClass("seleccionado");
    e.currentTarget.classList.add("seleccionado");
    $("#estados").prop("disabled", false);
    data_row = $("#table-cantidadAsociacion").DataTable().row(this).data();
    $("#text-title-revision").html(`
        <h4 class="m-0 p-0">Proyecto: ${data_row.ProyectoCodigo}, 
        Año: ${data_row.AnioID}, Correlativo de la Estimación ${data_row.EstimacionCorr}</h4>
    `);
    var inicio = data_row.FechaDesde.substr(0, data_row.FechaDesde.indexOf("T"));
    var fin = data_row.FechaHasta.substr(0, data_row.FechaHasta.indexOf("T"));
    $("#estimacionDesvanecida").prop('checked', false);
    LoadTableDataDetalles(data_row.AnioID, data_row.ProyectoCodigo, inicio, fin);
    LoadTableSanciones(data_row.AnioID, data_row.ProyectoCodigo);
    LoadTableReparos(data_row.AnioID, data_row.ProyectoCodigo, data_row.EstimacionCorr);
    LoadTableReparosDetalleUltimo(data_row.AnioID, data_row.ProyectoCodigo, data_row.EstimacionCorr);
    LoadSelectGuiaVisado(data_row.AnioID, data_row.ProyectoCodigo);
});

// Tabla de los detalles de la estimacion
function LoadTableDataDetalles(AnioID, ProyectoCodigo, inicio, fin, data=false) {
    var columns = [
        { data: 'null', className: 'spacer', title: '', render: () => '' },
        { data: 'Renglon', title: 'Renglón' },
        { data: 'Descripcion', title: 'Descripción' },
        { data: 'Unidad', title: 'Unidad' },
        { data: 'PrecioUnitario', title: 'Precio Unitario', render: (data) => format_currency(data, 'Q') },
        { data: 'Cantidad', title: 'Cantidad', render: (data) => format_currency(data, '') },
        { data: 'TotalAcumulado', title: 'Total Acumulado', render: (data) => format_currency(data, 'Q') },
        { data: 'null', className: 'spacer', title: '', render: () => '' },
    ];
    if (data) {
        $("#table-detalles").DataTable(WithoutPagination(url_proyecto, columns, []))
        return;
    }
    $.ajax({
        url: `${urlbase}api/RevisionEstimacion/GetMontoEjecutadoDetalle/${AnioID}/${ProyectoCodigo}/${inicio}/${fin}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => $("#table-detalles").DataTable(WithoutPagination(url_proyecto, columns, val)),
        error: () => $("#table-detalles").DataTable(WithoutPagination(url_proyecto, columns, []))
    });
}

// Cargar tabla de sanciones
function LoadTableSanciones(AnioID, ProyectoCodigo, data=false) {
    var columns = [
        { data: 'null', className: 'spacer', title: '', render: () => '' },
        { data: 'RecurrenciaCorrel', title: 'Correlativo' },
        { data: 'SancionCodigo', title: 'Código Sanción' },
        { data: 'ResponsabilidadDesc', title: 'Descripción de Responsabilidad' },
        { data: 'RecurrenciaDesc', title: 'Recurrencia' },
        { data: 'Justificacion', title: 'Justificación' },
        { data: 'SancionMonto', title: 'Monto', render: (data) => format_currency(data, 'Q') },
        { data: 'FechaSancion', title: 'Fecha de la Sanción', render: format_date },
        { data: 'null', className: 'spacer', title: '', render: () => '' },
    ];
    if (data) {
        $("#table-sanciones").DataTable(WithoutPagination(url_proyecto, columns, []))
        return;
    }
    $.ajax({
        url: `${urlbase}api/RevisionEstimacion/GetSanciones/${AnioID}/${ProyectoCodigo}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => $("#table-sanciones").DataTable(WithoutPagination(url_proyecto, columns, val)),
        error: () => $("#table-sanciones").DataTable(WithoutPagination(url_proyecto, columns, []))
    });
}

// Cargar los datos de la guia visado
function LoadSelectGuiaVisado(AnioID, ProyectoCodigo) {
    let myprogram = ProyectoCodigo.split("-");
    let program = myprogram[0];
    $.ajax({
        url: `${urlbase}api/RevisionEstimacion/GetGuiasDeVisado/${AnioID}/${program}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let options = val.map((val) => new Option(val.GuiaVisadoDef, val.pkGuiasVisado));
            $('#guiaVisado').html(options).trigger("change");
        },
        error: () => {
            $('#guiaVisado').html(null).trigger("change");
        }
    });
}

// Cargar tabla de reparos
function LoadTableReparos(AnioID, ProyectoCodigo, EstimacionCorr, data=false) {
    data_reparos = null;
    LoadTableReparosObservaciones(null, null, null, null, true);
    $('#requisito').html(null).trigger("change");
    var columns = [
        { data: 'null', className: 'spacer', title: '', render: () => '' },
        {
            data: 'ReparoCorr',
            title: '',
            render: (data, type, row, indexes) => {
                var input_seleccionar = `
                        <div class="form-group custom-control custom-checkbox">
                            <input type="checkbox" data-reparo="${data}" class="custom-control-input ck-revision"
                                id="checkSeleccionar-${data}" data-row="${indexes.row}">
                            <label class="custom-control-label" for="checkSeleccionar-${data}"></label>
                        </div>`;
                return `${input_seleccionar}`;
            }
        },
        {
            data: 'ReparoCorr',
            title: '',
            render: (data, type, row, indexes) => {
                var btn_delete = `
                        <a style="cursor:pointer" class="action-icon hover-red btn-delete-reparos" data-toggle="popover"
                            href="javascript:void(0)" data-estimacion="${row['EstimacionCorr']}" data-guia="${row['GuiaVisadoCorr']}"
                            data-reparo="${data}" data-proyecto="${row['ProyectoCodigo']}" data-anio="${row['AnioID']}"
                            data-trigger="hover" data-content="Eliminar" data-placement="top" title="">
                            <i class="fas fa-trash fa-lg fa-fw" data-estimacion="${data}" data-guia="${row['GuiaVisadoCorr']}"
                            data-reparo="${data}" data-proyecto="${row['ProyectoCodigo']}" data-anio="${row['AnioID']}"></i>
                        </a>
                    `;
                var btn_impresora = `
                        <a style="cursor:pointer" class="action-icon hover-dark btn-impresora-reparos" data-toggle="popover"
                            href="javascript:void(0)"data-estimacion="${row['EstimacionCorr']}" data-guia="${row['GuiaVisadoCorr']}"
                            data-reparo="${data}" data-proyecto="${row['ProyectoCodigo']}" data-anio="${row['AnioID']}"
                            data-trigger="hover" data-content="Imprimir" data-placement="top" title="">
                            <i class="fas fa-print fa-lg fa-fw"></i>
                        </a>
                    `;
                return `<div class="text-nowrap">${btn_delete} ${btn_impresora}</div>`;
            }
        },
        { data: 'FechaReparo', title: 'Fecha Reparo', render: format_date },
        { data: 'FEntregadoAContratista', title: 'Entregado contratista', render: format_date },
        { data: 'FRecibidoDeContratista', title: 'Recibido contratista', render: format_date },
        { data: 'FechaDesvanecido', title: 'Fecha desvanecido', render: format_date },
        { data: 'Desvanecido', title: 'Desvanecido', render: (data) => data ? 'Si' : 'No' },
        { data: 'null', className: 'spacer', title: '', render: () => '' },
    ];
    if (data) {
        $("#table-reparos").DataTable(WithoutPagination(url_proyecto, columns, []));
        return;
    }
    let codigo = ProyectoCodigo.substr(0, ProyectoCodigo.indexOf("-"));
    $.ajax({
        url: `${urlbase}api/RevisionEstimacion/GetReparosUntbl/${ProyectoCodigo}/${EstimacionCorr}/${AnioID}/${codigo}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => $("#table-reparos").DataTable(WithoutPagination(url_proyecto, columns, val)),
        error: () => $("#table-reparos").DataTable(WithoutPagination(url_proyecto, columns, []))
    });
}

var data_reparos = null;
$("table#table-reparos").on("change", "input[type=checkbox]", (e) => {
    EventSelectionCheckbox(e.currentTarget, 'ck-revision');
    var checked = e.currentTarget.checked;
    var row = e.currentTarget.dataset.row;
    $(".ck-revision").prop('checked', false);
    $(`#${e.currentTarget.id}`).prop('checked', checked);
    data_reparos = $("#table-reparos").DataTable().row(row).data();
    if (data_reparos) {
        LoadTableReparosObservaciones(data_reparos.AnioID, data_reparos.ProyectoCodigo, data_reparos.EstimacionCorr, data_reparos.ReparoCorr);
        LoadSelectRequisitosGuiaVisado(data_reparos.AnioID, data_reparos.ProyectoCodigo, data_reparos.GuiaVisadoCorr);
    }
});

// Cargar tabla de observacion de reparo
function LoadTableReparosObservaciones(AnioID, ProyectoCodigo, EstimacionCorr, ReparoCorr, empty=false) {
    var columns = [
        { data: 'null', className: 'spacer', title: '', render: () => '' },
        { data: 'RequisitoCorrel', title: 'Requisito de visado aplicado' },
        { data: 'ReparoComentario', title: 'Comentario' },
        { data: 'null', className: 'spacer', title: '', render: () => '' },
    ];
    if (empty) {
        $("#table-reparos-observaciones").DataTable(WithoutPagination(url_proyecto, columns, []));
        return;
    }
    $.ajax({
        url: `${urlbase}api/RevisionEstimacion/GetReparosDetalle/${AnioID}/${ProyectoCodigo}/${EstimacionCorr}/${ReparoCorr}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            $("#table-reparos-observaciones").DataTable(WithoutPagination(url_proyecto, columns, val))
        },
        error: () => {
            $("#table-reparos-observaciones").DataTable(WithoutPagination(url_proyecto, columns, []))
        }
    });
}

// Cargar tabla de las observaciones del ultimo reparo para el tercer paso
function LoadTableReparosDetalleUltimo(AnioID, ProyectoCodigo, EstimacionCorr, data=false) {
    var columns_edicion = [
        { data: 'null', className: 'spacer', title: '', render: () => '' },
        {
            data: 'ReparoCorr',
            title: '',
            render: (data, type, row, indexes) => {
                var btn_delete = `
                        <a style="cursor:pointer" class="action-icon hover-red btn-delete-detalle-reparos" data-toggle="popover"
                            href="javascript:void(0)" data-row="${indexes.row}" data-trigger="hover" data-content="Eliminar"
                            data-placement="top" title="">
                            <i class="fas fa-trash fa-lg fa-fw"></i>
                        </a>
                    `;
                var btn_edicion = `
                        <a style="cursor:pointer" class="action-icon hover-dark btn-edicion-detalle-reparos" data-toggle="popover"
                            href="javascript:void(0)" data-row="${indexes.row}" data-trigger="hover" data-content="Imprimir"
                            data-placement="top" title="">
                            <i class="fas fa-pencil-alt fa-lg fa-fw"></i>
                        </a>
                    `;
                return `<div class="text-nowrap">${btn_edicion} ${btn_delete}</div>`;
            }
        },
        { data: 'RequisitoCorrel', title: 'Requisito de visado aplicado' },
        { data: 'ReparoComentario', title: 'Comentario' },
        { data: 'null', className: 'spacer', title: '', render: () => '' },
    ];
    if (data) {
        $("#table-reparos-observaciones-edicion").DataTable(WithoutPagination(url_proyecto, columns_edicion, []))
        return;
    }
    let codigo = ProyectoCodigo.substr(0, ProyectoCodigo.indexOf("-"));
    $.ajax({
        url: `${urlbase}api/RevisionEstimacion/GetReparosDetalleUltimo/${AnioID}/${codigo}/${ProyectoCodigo}/${EstimacionCorr}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            $("#table-reparos-observaciones-edicion").DataTable(WithoutPagination(url_proyecto, columns_edicion, val))
        },
        error: () => {
            $("#table-reparos-observaciones-edicion").DataTable(WithoutPagination(url_proyecto, columns_edicion, []))
        }
    });
}

// Carga los datos de los Requisitos de la guia visado
function LoadSelectRequisitosGuiaVisado(AnioID, ProyectoCodigo, GuiaVisadoCorr) {
    var codigo = `${AnioID},${ProyectoCodigo.substr(0, ProyectoCodigo.indexOf("-"))},${GuiaVisadoCorr}`;
    $.ajax({
        url: `${urlbase}api/RevisionEstimacion/GetRequisitosGuiasVisadoRevision/${codigo}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let options = val.map((val) => new Option(val.RequisitoDesc, val.pkRequisitos));
            $('#requisito, #requisito2').html(options).trigger("change");
        },
        error: () => {
            $('#requisito, #requisito2').html(null).trigger("change");
        }
    });
}

// Crear Reparo
$("#crear-reparo").click(() => {
    if (data_row) {
        var data = {
            "ProyectoCodigo": data_row.ProyectoCodigo,
            "EstimacionCorr": data_row.EstimacionCorr,
            "AnioID": data_row.AnioID,
            "UserName": usuario
        };
        $.ajax({
            url: `${urlbase}api/RevisionEstimacion/AgregaReparo`,
            type: "POST",
            data: JSON.stringify(data),
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: () => {
                $("#estimacionDesvanecida").prop('checked', false);
                LoadTableReparos(data_row.AnioID, data_row.ProyectoCodigo, data_row.EstimacionCorr);
                LoadTableReparosDetalleUltimo(data_row.AnioID, data_row.ProyectoCodigo, data_row.EstimacionCorr);
            },
            error: (e) => {
                var message = e.responseJSON.Message || "Error al agregar el reparo.";
                Swal.fire({ icon: 'error', title: "Error", text: message });
            }
        });
    }
});

// Eliminar Reparo
$("table#table-reparos").on("click", ".btn-delete-reparos", (e) => {
    var dataset = e.currentTarget.dataset;
    Swal.fire({
        title: '¿Esta seguro?',
        text: `Esta operacion no puede ser revertida, se eliminara el registro.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#CC3232',
        cancelButtonColor: '#E2E2E2',
        confirmButtonText: 'Si, Eliminar',
        cancelButtonText: 'Cancelar'
    }).then(result => {
        if (result.value) {
            var info = JSON.stringify({
                "ReparoCorr": dataset.reparo,
                "ProyectoCodigo": dataset.proyecto,
                "EstimacionCorr": dataset.estimacion,
                "AnioID": dataset.anio,
                "GuiaVisadoCorr": dataset.guia
            });
            $.ajax({
                url: `${urlbase}api/RevisionEstimacion/EliminarReparo`,
                type: "POST",
                data: info,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: (val) => {
                    LoadTableReparos(data_row.AnioID, data_row.ProyectoCodigo, data_row.EstimacionCorr);
                    LoadTableReparosDetalleUltimo(data_row.AnioID, data_row.ProyectoCodigo, data_row.EstimacionCorr);
                    Swal.fire({ icon: 'success', title: 'Se elimino correctamente.', showConfirmButton: false, timer: 1000 })
                },
                error: (e) => {
                    var message = e.responseJSON.Message || "Error al eliminar el registro.";
                    Swal.fire({ icon: 'error', title: "Error al eliminar", text: message });
                }
            });
        }
    });
})

// Imprimir Reparo
$("table#table-reparos").on("click", ".btn-impresora-reparos", (e) => {
    var dataset = e.currentTarget.dataset;
    opendialog("/visorinformes.aspx?IDReporte=22&Parameters=" + dataset.reparo + "," + dataset.proyecto + "," + dataset.estimacion + "," + dataset.anio + "," + dataset.guia);
            
})
function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Reporte de Reparo",
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
// Cambiar de estado la estimacion a desvanecida
$("#estimacionDesvanecida").on("change", () => {
    if (data_row) {
        var send = {
            "ProyectoCodigo": data_row.ProyectoCodigo,
            "EstimacionCorr": data_row.EstimacionCorr,
            "AnioID": data_row.AnioID,
            "Desvanecido": true,
            "UserName": usuario
        }
        $.ajax({
            url: `${urlbase}api/RevisionEstimacion/DesvanecerEstimacion`,
            type: "POST",
            data: JSON.stringify(send),
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                LoadTableReparos(data_row.AnioID, data_row.ProyectoCodigo, data_row.EstimacionCorr);
                Swal.fire({ icon: 'success', title: 'Se actualizo correctamente', showConfirmButton: false, timer: 1250 })
            },
            error: (e) => {
                var message = e.responseJSON.Message || "Error al marcar la ultima estimacion como desvanecida";
                Swal.fire({ icon: 'error', title: "Error al actualizar", text: message });
            }
        });
    }
});

// Crear Observacion del ultimo reparo
$("#crear-observacion").click(() => {
    if (data_reparos && data_row) {
        var requisito = ($("#requisito").val()).split(",")[0];
        var data = {
            "ReparoComentario": $("#txtcomentario").val(),
            "RequisitoCorrel": requisito,
            "AnioID": data_row.AnioID,
            "ProgramaCodigo": data_row.ProgramaCodigo,
            "UserName": usuario,
            "ProyectoCodigo": data_row.ProyectoCodigo,
            "EstimacionCorr": data_row.EstimacionCorr
        }
        $.ajax({
            url: `${urlbase}api/RevisionEstimacion/AgregaReparoDetalle`,
            type: "POST",
            data: JSON.stringify(data),
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: () => {
                $("#txtcomentario").val(null);
                LoadTableReparosDetalleUltimo(data_reparos.AnioID, data_reparos.ProyectoCodigo, data_reparos.EstimacionCorr);
                LoadSelectRequisitosGuiaVisado(data_reparos.AnioID, data_reparos.ProyectoCodigo, data_reparos.GuiaVisadoCorr);
            },
            error: (e) => {
                var message = e.responseJSON.Message || "Error al agregar la observacion.";
                Swal.fire({ icon: 'error', title: "Error", text: message });
            }
        });
    }
});

// Pasos para el wizard
$("#step1-next").on("click", () => {
    $("#alcance").addClass("active");
});

$("#step2-back").on("click", () => {
    $("#alcance").removeClass("active");
});

$("#step2-next").on("click", () => {
    $("#componentes").addClass("active");
});

$("#step3-back").on("click", () => {
    $("#componentes").removeClass("active");
});

$("#step3-next").on("click", () => {
    $("#step3-back").trigger("click");
    $("#step2-back").trigger("click");
    $("#estimacionDesvanecida").prop('checked', false);
    $('input[value=2]').prop("checked", true);
    LoadCantidadAsociada($('input[name="tipo"]:checked').val());
});

// Cambio de estado
$("#estados").on("change", () => {
    var value = $("#estados").val();
    if (data_row && value && value != "10") {
        var data = {
            "AnioID": data_row.AnioID,
            "ProyectoCodigo": data_row.ProyectoCodigo,
            "EstimacionCorr": data_row.EstimacionCorr,
            "EstadoID": value,
            "UserName": usuario
        };
        if (value == 0) {
            $.ajax({
                url: `${urlbase}api/RevisionEstimacion/ActualizarEstadoEstimacionTecnico`,
                type: "POST",
                data: JSON.stringify(data),
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: (val) => {
                    if (val > 0) {
                        Swal.fire({ icon: 'success', title: 'Estado cambiado satisfactoriamente: Presentado en Visa', showConfirmButton: false, timer: 1000 })
                        $("#estimacionDesvanecida").prop('checked', false);
                        LoadCantidadAsociada($('input[name="tipo"]:checked').val());
                    }
                    else {
                        Swal.fire({ icon: 'success', title: 'El Registro NO fué modificado porque no se encuentra en estado Asignado a Regional Técnico Visor .', showConfirmButton: false, timer: 2000 })
                        LoadCantidadAsociada($('input[name="tipo"]:checked').val());
                    }
                },
                error: (e) => {
                    var message = e.responseJSON.Message || "Error al agregar el reparo.";
                    Swal.fire({ icon: 'error', title: "Error", text: message });
                }
            });
        }
        else {
            $.ajax({
                url: `${urlbase}api/RevisionEstimacion/ActualizarEstadoEstimacion`,
                type: "POST",
                data: JSON.stringify(data),
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: () => {
                    $("#estimacionDesvanecida").prop('checked', false);
                    LoadCantidadAsociada($('input[name="tipo"]:checked').val());
                },
                error: (e) => {
                    var message = e.responseJSON.Message || "Error al agregar el reparo.";
                    Swal.fire({ icon: 'error', title: "Error", text: message });
                }
            });
        }
    }
})

// Eliminacion del registro del ultimo reparo en observaciones
$("#table-reparos-observaciones-edicion").on("click", ".btn-delete-detalle-reparos", (e) => {
    var row = e.currentTarget.dataset.row;
    Swal.fire({
        title: '¿Esta seguro?',
        text: `Esta operacion no puede ser revertida, se eliminara el registro.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#CC3232',
        cancelButtonColor: '#E2E2E2',
        confirmButtonText: 'Si, Eliminar',
        cancelButtonText: 'Cancelar'
    }).then(result => {
        if (result.value) {
            var last = $("#table-reparos-observaciones-edicion").DataTable().row(row).data();
            var info = JSON.stringify({
                "RequisitoCorrel": last.RequisitoCorrel,
                "AnioID": last.AnioID,
                "ProgramaCodigo": last.ProgramaCodigo,
                "GuiaVisadoCorr": last.GuiaVisadoCorr,
                "ProyectoCodigo": last.ProyectoCodigo,
                "EstimacionCorr": last.EstimacionCorr,
                "ReparoCorr": last.ReparoCorr
            });
            $.ajax({
                url: `${urlbase}api/RevisionEstimacion/EliminarObservacionReparo`,
                type: "POST",
                data: info,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: (val) => {
                    if (val > 0) {
                        LoadTableReparos(last.AnioID, last.ProyectoCodigo, last.EstimacionCorr);
                        LoadTableReparosDetalleUltimo(last.AnioID, last.ProyectoCodigo, last.EstimacionCorr);
                        Swal.fire({ icon: 'success', title: 'Se elimino correctamente.', showConfirmButton: false, timer: 1000 })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: "Error al eliminar",
                            text: "No puede eliminar reparos cuando estos ya han sido recogidos por el contratista"
                        });
                    }
                },
                error: (e) => {
                    var message = e.responseJSON.Message || "Error al eliminar el registro.";
                    Swal.fire({ icon: 'error', title: "Error al eliminar", text: message });
                }
            });
        }
    });
})

//Editar ultimo reparo
var last_reparo;
var value = ""
$("#table-reparos-observaciones-edicion").on("click", ".btn-edicion-detalle-reparos", (e) => {
    var row = e.currentTarget.dataset.row;
    last_reparo = $("#table-reparos-observaciones-edicion").DataTable().row(row).data();
    value = `${last_reparo.RequisitoCorrel},${last_reparo.GuiaVisadoCorr},${last_reparo.ProgramaCodigo.trim()},${last_reparo.AnioID}`;
    $("#requisito2").val(value).trigger("change");
    $("#txtcomentario2").val(last_reparo.ReparoComentario);
    $("#modalUltimoReparo").modal("show");
})

$("#editar-observacion").click(() => {
    var requisito =value.split(",")[0];
    var info = JSON.stringify({
        "ReparoComentario": $("#txtcomentario2").val(),
        "RequisitoCorrel": requisito,
        "AnioID": last_reparo.AnioID,
        "ProgramaCodigo": last_reparo.ProgramaCodigo,
        "GuiaVisadoCorr": last_reparo.GuiaVisadoCorr,
        "UserName": last_reparo.UserName,
        "ProyectoCodigo": last_reparo.ProyectoCodigo,
        "EstimacionCorr": last_reparo.EstimacionCorr,
        "ReparoCorr": last_reparo.ReparoCorr
    });
    $.ajax({
        url: `${urlbase}api/RevisionEstimacion/ActualizarObservacionReparo`,
        type: "POST",
        data: info,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            if (val > 0) {
                LoadTableReparos(last_reparo.AnioID, last_reparo.ProyectoCodigo, last_reparo.EstimacionCorr);
                LoadTableReparosDetalleUltimo(last_reparo.AnioID, last_reparo.ProyectoCodigo, last_reparo.EstimacionCorr);
                Swal.fire({ icon: 'success', title: 'Se ha actualizado el registro correctamente.', showConfirmButton: false, timer: 1000 })
            } else {
                Swal.fire({icon: 'error', title: "Error", text: "No puede actualizar el registro"});
            }
        },
        error: (e) => {
            var message = e.responseJSON.Message || "Error al editar el registro.";
            Swal.fire({ icon: 'error', title: "Error", text: message });
        }
    });
})