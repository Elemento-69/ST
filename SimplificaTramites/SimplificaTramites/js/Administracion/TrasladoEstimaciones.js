/*******************************************
 * * Carga de la tabla de traslados
*******************************************/
var traslados = null;
function LoadTableTrasladosEstimaciones(values = undefined) {
    var columns = [
        { data: 'null', className: 'spacer', title: '', render: () => '' },
        {
            data: 'TrasladoID',
            title: '',
            className: "text-center",
            render: (data) => {
                var btn_delete = `
                        <a href="javascript:void(0)" style="cursor:pointer" class="action-icon hover-red btn-delete-traslado"
                            data-traslado="${data}"><i class="fas fa-trash fa-lg fa-fw"></i>
                        </a>`;
                return btn_delete;
            }
        },
        {
            data: 'TrasladoID',
            title: 'Seleccionar',
            className: "text-center",
            render: (data, type, row, indexes) => {
                var input_seleccionar = `
                        <div class="form-group custom-control custom-checkbox">
                            <input type="checkbox" data-traslado="${data}" class="custom-control-input ck-traslado"
                                id="checkSeleccionar-${data}" data-row="${indexes.row}">
                            <label class="custom-control-label" for="checkSeleccionar-${data}"></label>
                        </div>`;
                return input_seleccionar;
            }
        },
        {
            data: 'TrasladoID',
            title: 'Detalle',
            className: "text-center",
            render: (data, type, row, indexes) => {
                var modal = `
                        <a href="#" data-toggle="modal" data-target="#estimacionDetalle" data-traslado="${data}"
                            class="btn-detalle-traslado"><i class="fas fa-border-all fa-lg fa-fw text-blue fa-2x"></i>
                        </a>`;
                return modal;
            }
        },
        { data: 'TrasladoID', title: 'ID', className: "text-center" },
        { data: 'FechaTraslado', title: 'Fecha de Traslado', className: "text-center", render: format_date },
        { data: 'null', className: 'spacer', title: '', render: () => '' },
    ];
    if (values) {
        $("#table-traslado").DataTable(WithoutPagination(url_proyecto, columns, values));
        return;
    }
    $.ajax({
        url: `${urlbase}api/TrasladoEstimacion/GetTrasladosEstimaciones/${entidad}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            traslados = val;
            $("#table-traslado").DataTable(PaginationData(url_proyecto, columns, val))
        },
        error: () => {
            $("#table-traslado").DataTable(PaginationData(url_proyecto, columns, []))
        }
    });
}

$(".table-responsive").on("click", "#table-traslado_wrapper .add-update-datatable", () => {
    LoadTableTrasladosEstimaciones();
});

LoadTableTrasladosEstimaciones();
var IDtraslado = 0
$("table#table-traslado").on("change", "input[type=checkbox]", (e) => {
    var checked = e.currentTarget.checked;
    $(".ck-traslado").parent().parent().parent().removeClass("seleccionado");
    if (checked) {
        e.target.parentElement.parentElement.parentElement.classList.add("seleccionado");
        IDtraslado = e.currentTarget.dataset.traslado;
    }
    else {
        e.target.parentElement.parentElement.parentElement.classList.remove("seleccionado");
        IDtraslado = 0;
    }
    var row = e.currentTarget.dataset.row;
    $(".ck-traslado").prop('checked', false);
    $(`#${e.currentTarget.id}`).prop('checked', checked);
    
});

/****************************Impresion****************
 */
$("#btnImprimir").on("click", () => {
    opendialog("/visorinformes.aspx?IDReporte=27&parameters="+IDtraslado);
})

function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Reporte de Traslado de Estimaciones",
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



/*******************************************************
 * * Filtros para traslados en la pantalla principal
********************************************************/
$("#btn-search-traslado").on("click", () => {
    var search = $("#search-traslado").val();
    if (search && search.trim().length > 0) {
        var data = traslados.filter(x => x.TrasladoID.toString().includes(search)) || [];
        LoadTableTrasladosEstimaciones(data);
    } else {
        LoadTableTrasladosEstimaciones(traslados);
    }
});

/******************************************************
 * * Eliminacion del registro de la tabla de traslados
******************************************************/
$("table#table-traslado").on("click", ".btn-delete-traslado", (e) => {
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
            var id = e.currentTarget.dataset.traslado;
            $.ajax({
                url: `${urlbase}api/TrasladoEstimacion/EliminaTrasladoEstimacion?pTrasladoID=${id}`,
                type: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: () => {
                    Swal.fire({ icon: 'success', title: 'Se elimino correctamente.', showConfirmButton: true }).then(function () {
                        $("#trasladoEstimacionesModal").modal('hide');
                        location.reload();
                    });
                },
                error: (e) => {
                    var message = e.responseJSON.Message || "Error al eliminar el registro.";
                    Swal.fire({ icon: 'error', title: "Error al eliminar", text: "No se puede eliminar el traslado ya que posee estimaciones agregadas" });
                }
            });
        }
    });
})

/**********************************************************
 * * Evento para la carga de datos en el modal de detalles
***********************************************************/
$("table#table-traslado").on("click", ".btn-detalle-traslado", (e) => {
    var id = e.currentTarget.dataset.traslado;
    $("#traslado-detalle-input").val(id);
    LoadTableTrasladoDetalle(id);
});


/**************************************************
 * * Carga de la tabla del detalle del traslado
***************************************************/
var detalles = null;
function LoadTableTrasladoDetalle(id, detalle = undefined) {
    var columns = [
        { data: 'null', className: 'spacer', title: '', render: () => '' },
        {
            data: 'TrasladoID',
            title: '',
            className: "text-center",
            render: (data, type, row) => {
                var btn_delete = `
                        <a href="javascript:void(0)" class="action-icon hover-red btn-delete-detalle" data-toggle="popover"
                            data-trigger="hover" data-content="Detalle de estimaciones" data-placement="top"
                            style="cursor:pointer" data-traslado="${data}" data-estimacion="${row['EstimacionCorr']}"
                            data-proyecto="${row['ProyectoCodigo']}" data-anio="${row['AnioID']}">
                            <i class="fas fa-trash fa-lg fa-fw"></i>
                        </a>`;
                return btn_delete;
            }
        },
        { data: 'TrasladoID', title: 'Traslado ID', className: "text-center" },
        { data: 'EstimacionCorr', title: 'Estimación', className: "text-center" },
        { data: 'ProyectoCodigo', title: 'Proyecto', className: "text-center"},
        { data: 'AnioID', title: 'Año', className: "text-center" },
        { data: 'MontoEjecutado', title: 'Ejecutado', className: "text-center" },
        { data: 'ProyectoDescripcion', title: 'Código del Proyecto', className: "text-center" },
        { data: 'Periodo', className: 'spacer', title: '', render: () => '' },
    ];
    if (detalle) {
        $("#table-traslado-detalle").DataTable(WithoutPagination(url_proyecto, columns, detalle));
        return;
    }
    $.ajax({
        url: `${urlbase}api/TrasladoEstimacion/GetTrasladosDetalle/${id}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            detalles = val.filter(x => x.TrasladoID == id) || [];
            $("#table-traslado-detalle").DataTable(WithoutPagination(url_proyecto, columns, detalles));
        },
        error: (e) => {
            $("#table-traslado-detalle").DataTable(WithoutPagination(url_proyecto, columns, []))
        }
    });
}


/**************************************************
 * * Carga de la tabla del detalle del traslado para editar
***************************************************/
var detallesEditar = null;
function LoadTableTrasladoDetalleEdit(id, detalle = undefined) {
    var columns = [
        { data: 'null', className: 'spacer', title: '', render: () => '' },
        {
            data: 'TrasladoID',
            title: '',
            className: "text-center",
            render: (data, type, row) => {
                var btn_delete = `
                        <a href="javascript:void(0)" class="action-icon hover-red btn-delete-detalle" data-toggle="popover"
                            data-trigger="hover" data-content="Detalle de estimaciones" data-placement="top"
                            style="cursor:pointer" data-traslado="${data}" data-estimacion="${row['EstimacionCorr']}"
                            data-proyecto="${row['ProyectoCodigo']}" data-anio="${row['AnioID']}">
                            <i class="fas fa-trash fa-lg fa-fw"></i>
                        </a>`;
                return btn_delete;
            }
        },
        { data: 'TrasladoID', title: 'Traslado ID', className: "text-center" },
        { data: 'EstimacionCorr', title: 'Estimación', className: "text-center" },
        { data: 'ProyectoCodigo', title: 'Proyecto', className: "text-center" },
        { data: 'AnioID', title: 'Año', className: "text-center" },
        { data: 'MontoEjecutado', title: 'Ejecutado', className: "text-center" },
        { data: 'ProyectoDescripcion', title: 'Código del Proyecto', className: "text-center" },
        { data: 'Periodo', className: 'spacer', title: '', render: () => '' },
    ];
    if (detalle) {
        $("#table-traslado-detalle").DataTable(WithoutPagination(url_proyecto, columns, detalle));
        return;
    }
    $.ajax({
        url: `${urlbase}api/TrasladoEstimacion/GetTrasladosDetalle/${id}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            detallesEditar = val.filter(x => x.TrasladoID == id) || [];
            $("#table-traslado-detalleEdit").DataTable(WithoutPagination(url_proyecto, columns, detallesEditar));
        },
        error: (e) => {
            $("#table-traslado-detalleEdit").DataTable(WithoutPagination(url_proyecto, columns, []))
        }
    });
}

/*******************************************************
 * * Eliminacion del registro del detalle del traslado
********************************************************/
$("table#table-traslado-detalle").on("click", ".btn-delete-detalle", ({ currentTarget }) => {
    let e = currentTarget
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
            var send = {
                TrasladoID: parseFloat(e.dataset.traslado),
                EstimacionCorr: parseFloat(e.dataset.estimacion),
                ProyectoCodigo: e.dataset.proyecto,
                AnioID: parseFloat(e.dataset.anio),
                Entidad: entidad,
                Usuario: usuario
            };
            $.ajax({
                url: `${urlbase}api/TrasladoEstimacion/EliminaTrasladoDetalle`,
                type: "POST",
                data: JSON.stringify(send),
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: () => {
                    Swal.fire({ icon: 'success', title: 'Se elimino correctamente.', showConfirmButton: false, timer: 1000 })
                    LoadTableTrasladoDetalle(e.dataset.traslado);
                },
                error: (e) => {
                    var message = e.responseJSON.Message || "Error al eliminar el registro.";
                    Swal.fire({ icon: 'error', title: "Error al eliminar", text: message });
                }
            });
        }
    });
})

/*******************************************************
 * * Eliminacion del registro del detalle del traslado al editar
********************************************************/
$("table#table-traslado-detalleEdit").on("click", ".btn-delete-detalle", ({ currentTarget }) => {
    let e = currentTarget
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
            var send = {
                TrasladoID: parseFloat(e.dataset.traslado),
                EstimacionCorr: parseFloat(e.dataset.estimacion),
                ProyectoCodigo: e.dataset.proyecto,
                AnioID: parseFloat(e.dataset.anio),
                Entidad: entidad,
                Usuario: usuario
            };
            $.ajax({
                url: `${urlbase}api/TrasladoEstimacion/EliminaTrasladoDetalle`,
                type: "POST",
                data: JSON.stringify(send),
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: () => {
                    Swal.fire({ icon: 'success', title: 'Se elimino correctamente.', showConfirmButton: false, timer: 1000 })
                    LoadTableTrasladoDetalleEdit(e.dataset.traslado);
                    LoadTableTrasladoAddEdit();
                },
                error: (e) => {
                    var message = e.responseJSON.Message || "Error al eliminar el registro.";
                    Swal.fire({ icon: 'error', title: "Error al eliminar", text: message });
                }
            });
        }
    });
})

/*******************************************************
 * * Filtros para el detalle del traslado
********************************************************/
let time;
$('#anio-traslado-detalle, #estimacion-traslado-detalle,#proyecto-traslado-detalle').on('keyup search input past cut', () => {
    clearTimeout(time);
    time = setTimeout(() => {
        var anio = $("#anio-traslado-detalle").val();
        var estimacion = $("#estimacion-traslado-detalle").val();
        var proyecto = $("#proyecto-traslado-detalle").val();
        if (detalles && detalles.length > 0) {
            var data = anio && anio.trim().length > 0 ? detalles.filter(x => x.AnioID.toString().includes(anio)) : detalles;
            data = estimacion && estimacion.trim().length > 0 ? data.filter(x => x.EstimacionCorr.toString().includes(estimacion)) : data;
            data = proyecto && proyecto.trim().length > 0 ? data.filter(x => x.ProyectoCodigo.toString().includes(proyecto)) : data;
            LoadTableTrasladoDetalle(0, data);
        }
    }, 600);
});

/*******************************************************
 * * Planes Anuales para el modal de agregar traslado
********************************************************/
function GetPlanesAnuales() {
    $.ajax({
        url: `${urlbase}api/TrasladoEstimacion/GetPlanesAnuales`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let options = val.map((val) => new Option(val.PlanAnualNombre, val.AnioID));
            $('#estimacion-tras-add-select').html(options).trigger("change"); 
        },
        error: () => { }
    });
}
function GetPlanesAnualesEdicion() {
    $.ajax({
        url: `${urlbase}api/TrasladoEstimacion/GetPlanesAnuales`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let options = val.map((val) => new Option(val.PlanAnualNombre, val.AnioID));
            $('#estimacionEdicion-tras-add-select').html(options).trigger("change");
        },
        error: () => { }
    });
}

GetPlanesAnuales();
GetPlanesAnualesEdicion();

/************************************************************
 * * Evento para cargar datos del modal para agregar traslado
*************************************************************/
var NuevoTraslado = 0;
var NuevoTrasladoEdicion = 0;
$("#btn-add-traslado").on("click", () => {
    $("#desdeBusqueda").datetimepicker({
        date: new Date()
    });
    NuevoTraslado = 1;
    LoadTableTrasladoAdd();
    LoadTableSeleccionados([]);
});

$("#btn-edit-traslado").on("click", (event) => {
    if (IDtraslado > 0) {
        $("#desdeBusquedaEdicion").datetimepicker({
            date: new Date()
        });
        NuevoTrasladoEdicion = 1;
        LoadTableTrasladoDetalleEdit(IDtraslado);
        LoadTableTrasladoAddEdit();
        LoadTableSeleccionadosEdicion([]);
        $("#trasladoEdicionEstimacionesModal").modal('show');
    }
    else {
        event.preventDefault();
        Swal.fire({ icon: 'error', title: "Error", text: "Debe seleccionar un traslado para editar" });
      
       
    }
});

$("#search-btn-traslado-add").on("click", () => {
    LoadTableTrasladoAdd();
});

$("#estimacion-tras-add-select").on("change", () => {
    LoadTableTrasladoAdd();
})

$("#estimacionEdicion-tras-add-select").on("change", () => {
    LoadTableTrasladoAddEdit();
})

let time2;
$("#search-add-traslado").on('keyup search input past cut', () => {
    clearTimeout(time2);
    time2 = setTimeout(() => {
        LoadTableTrasladoAdd();
    }, 800);

})

$("#search-add-traslado").on('keyup search input past cut', () => {
    clearTimeout(time2);
    time2 = setTimeout(() => {
        LoadTableTrasladoAddEdit();
    }, 800);

})

/************************************************************
 * * Carga de la tabla para agregar el traslado en el modal
*************************************************************/
let seleccionados = [];
let seleccionadosEdicion = [];
let all_select = [];
function LoadTableTrasladoAdd() {
    var value = $("#estimacion-tras-add-select").val();
    var proyecto = $("#search-add-traslado").val() || 0;
    var columns = [
        { data: 'null', className: 'spacer', title: '', render: () => '' },
        {
            data: 'PeriodoCorr',
            title: 'Seleccionar',
            className: "text-center select-add",
            render: (data, type, row, indexes) => {
                var input_seleccionar = `
                        <div class="form-group custom-control custom-checkbox">
                            <input type="checkbox" data-traslado="${data}" class="custom-control-input ck-traslado-add"
                                data-select="${row['select']}"
                                id="add-chk-${indexes.row}" data-row="${indexes.row}" ${row['select'] ? 'disabled' : ''}>
                            <label class="custom-control-label" for="add-chk-${indexes.row}"></label>
                        </div>
                       `;
                return input_seleccionar;
            }
        },
        { data: 'Anio', title: 'Año', className: "text-center" },
        { data: 'Proyecto', title: 'Código del Proyecto', className: "text-center" },
        { data: 'PeriodoCorr', title: 'Correlativo', className: "text-center" },
        { data: 'Periodo', title: 'Período', className: "text-center" },
        { data: 'Monto', title: 'Monto', className: "text-center", render: (data) => format_currency(parseFloat(data), "Q.")},
        { data: 'EstadoDesc', title: 'Estado', className: "text-center" },
        {
            data: 'CantFolio',
            title: 'Cantidad de Folios',
            className: "text-center",
            render: (data, type, row, indexes) => {
                var input_seleccionar = `
                        <div class="form-group">
                            <input type="text" data-traslado="${data}" class="form-control add-CantFolio"
                                id="add-CantFolio-${indexes.row}" data-row="${indexes.row}" placeholder="${row['CantFolio']}">
                            
                        </div>
                       `;
                return input_seleccionar;
            }
        },
        {
            data: 'CantSello',
            title: 'Cantidad de Sellos',
            className: "text-center",
            render: (data, type, row, indexes) => {
                var input_seleccionar = `
                        <div class="form-group">
                            <input type="text" data-traslado="${data}" class="form-control add-CantSello"
                                id="add-CantSello-${indexes.row}" data-row="${indexes.row}" placeholder="${row['CantSello']}">
                            
                        </div>
                       `;
                return input_seleccionar;
            }
        },
        { data: 'select', title: '', className: "text-center", render: (data) => data ? "Si" : "No" },
        { data: 'null', className: 'spacer', title: '', render: () => '' },
    ];
    $.ajax({
        url: `${urlbase}api/TrasladoEstimacion/GetEstimacionesTraslado/${value}/${proyecto == "" ? 0 : proyecto}/${entidad == "True" ? 1 : 0}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (value) => {
            if (NuevoTraslado != 1) {
                if (value && value.length) {
                    value.forEach(x => {
                        x.select = false;
                        if (seleccionados.find(y => (y.Anio == x.Anio && y.Proyecto == x.Proyecto && y.PeriodoCorr == x.PeriodoCorr)) != null)
                            x.select = true;
                    });
                }
            }
            else { NuevoTraslado = 0; seleccionados = [];}            
            $("#trasladar-items").DataTable(WithoutPagination(url_proyecto, columns, value));
        },
        error: (e) => {
            $("#trasladar-items").DataTable(WithoutPagination(url_proyecto, columns, []));
        }
    });
}

$("#add-traslado-items-save").on("click", (e) => {
    $(".ck-traslado-add").each((index, event) => {
        if (event.checked) {
            var row = parseFloat(event.dataset.row);
            var table = $("#trasladar-items").DataTable().row(row).data()
            if (table)
                seleccionados.push(table);
        }
    });
    $(".ck-traslado-add").parent().parent().parent().removeClass("seleccionado");
    LoadTableTrasladoAdd();
    LoadTableSeleccionados(seleccionados)
});
$("#add-trasladoEdicion-items-save").on("click", (e) => {
    $(".ck-trasladoEdit-add").each((index, event) => {
        if (event.checked) {
            var row = parseFloat(event.dataset.row);
            var table = $("#trasladarEdicion-items").DataTable().row(row).data()
            if (table)
                seleccionadosEdicion.push(table);
        }
    });
    $(".ck-trasladoEdit-add").parent().parent().parent().removeClass("seleccionado");
    LoadTableTrasladoAddEdit()
    LoadTableSeleccionadosEdicion(seleccionadosEdicion)
});

$("table#trasladar-items").on("change", ".add-CantFolio", (e) => {
    var valor = e.currentTarget.value
    var fila = e.target.dataset.row
    $("#trasladar-items").DataTable().row(fila).data().CantFolio=valor
}
)

$("table#trasladar-items").on("change", ".add-CantSello", (e) => {
    var valor = e.currentTarget.value
    var fila = e.target.dataset.row
    $("#trasladar-items").DataTable().row(fila).data().CantSello = valor
}
)

$("table#trasladarEdicion-items").on("change", ".add-CantFolio", (e) => {
    var valor = e.currentTarget.value
    var fila = e.target.dataset.row
    $("#trasladarEdicion-items").DataTable().row(fila).data().CantFolio = valor
}
)

$("table#trasladarEdicion-items").on("change", ".add-CantSello", (e) => {
    var valor = e.currentTarget.value
    var fila = e.target.dataset.row
    $("#trasladarEdicion-items").DataTable().row(fila).data().CantSello = valor
}
)


function LoadTableSeleccionados(data) {
    $("#select-all").prop("checked", false);
    var columns = [
        { data: 'null', className: 'spacer', title: '', render: () => '' },
        {
            data: 'PeriodoCorr',
            title: '',
            className: "text-center",
            render: (data, _, row) => {
                var btn_delete = `
                        <a href="javascript:void(0)" style="cursor:pointer" class="action-icon hover-red btn-delete-list"
                            data-periodo="${data}" data-Anio="${row.Anio}" data-Proyecto="${row.Proyecto}" ><i class="fas fa-trash fa-lg fa-fw"></i>
                        </a>`;
                return btn_delete;
            }
        },
        { data: 'Anio', title: 'Año', className: "text-center" },
        { data: 'Proyecto', title: 'Código del Proyecto', className: "text-center" },
        { data: 'PeriodoCorr', title: 'Correlativo', className: "text-center" },
        { data: 'Periodo', title: 'Período', className: "text-center" },
        { data: 'Monto', title: 'Monto', className: "text-center", render: (data) => format_currency(parseFloat(data), "Q.") },
        { data: 'EstadoDesc', title: 'Estado', className: "text-center" },
        { data: 'CantFolio', title: 'Folios', className: "text-center", render: (data) => data },
        { data: 'CantSello', title: 'Sellos', className: "text-center", render: (data) => data },
        { data: 'null', className: 'spacer', title: '', render: () => '' },
    ];
    $("#traslado-items-save").DataTable(WithoutPagination(url_proyecto, columns, data));
}
function LoadTableSeleccionadosEdicion(data) {
    $("#select-all").prop("checked", false);
    var columns = [
        { data: 'null', className: 'spacer', title: '', render: () => '' },
        {
            data: 'PeriodoCorr',
            title: '',
            className: "text-center",
            render: (data, _, row) => {
                var btn_delete = `
                        <a href="javascript:void(0)" style="cursor:pointer" class="action-icon hover-red btn-deleteEdit-list"
                            data-periodo="${data}" data-Anio="${row.Anio}" data-Proyecto="${row.Proyecto}" ><i class="fas fa-trash fa-lg fa-fw"></i>
                        </a>`;
                return btn_delete;
            }
        },
        { data: 'Anio', title: 'Año', className: "text-center" },
        { data: 'Proyecto', title: 'Código del Proyecto', className: "text-center" },
        { data: 'PeriodoCorr', title: 'Correlativo', className: "text-center" },
        { data: 'Periodo', title: 'Período', className: "text-center" },
        { data: 'Monto', title: 'Monto', className: "text-center", render: (data) => format_currency(parseFloat(data), "Q.") },
        { data: 'EstadoDesc', title: 'Estado', className: "text-center" },
        { data: 'CantFolio', title: 'Folios', className: "text-center", render: (data) => data },
        { data: 'CantSello', title: 'Sellos', className: "text-center", render: (data) => data },
        { data: 'null', className: 'spacer', title: '', render: () => '' },
    ];
    $("#trasladoEdicion-items-save").DataTable(WithoutPagination(url_proyecto, columns, data));
}

$("table#traslado-items-save").on("click", ".btn-delete-list", (e) => {
    seleccionados = seleccionados.filter(x => x.PeriodoCorr + x.Anio + x.Proyecto != e.currentTarget.dataset.periodo + e.currentTarget.dataset.anio + e.currentTarget.dataset.proyecto );
    LoadTableTrasladoAdd();
    LoadTableSeleccionados(seleccionados)
});

$("table#trasladoEdicion-items-save").on("click", ".btn-deleteEdit-list", (e) => {
    seleccionadosEdicion = seleccionadosEdicion.filter(x => x.PeriodoCorr + x.Anio + x.Proyecto != e.currentTarget.dataset.periodo + e.currentTarget.dataset.anio + e.currentTarget.dataset.proyecto);
    LoadTableTrasladoAddEdit();
    LoadTableSeleccionadosEdicion(seleccionadosEdicion)
});

$("#save-trasladar").on("click", () => {
    var fecha = $("#desdeBusqueda").val();
    if (seleccionados && seleccionados.length && fecha != "") {
        var iso = new Date(fecha).toISOString();
        var data = {
            "AgregaEncabezadoEstimacionTraslado": [],
            "AgregaDetalleEstimacionTraslado": []
        };
        data.AgregaEncabezadoEstimacionTraslado.push({
            "TrasladoTipo": entidad,
            "FechaTraslado": iso,
            "UserName": usuario
        });
        seleccionados.forEach(x => {
          
            data.AgregaDetalleEstimacionTraslado.push({
                "EstimacionCorr": parseFloat(x.PeriodoCorr),
                "ProyectoCodigo": x.Proyecto,
                "AnioID": parseFloat(x.Anio),
                "UserName": usuario,
                "CantFolio": x.CantFolio,
                "CantSello": x.CantSello
            })
        });
        $.ajax({
            url: `${urlbase}api/TrasladoEstimacion/AgregaTrasladoEstimacion`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            type: "POST",
            data: JSON.stringify(data),
            success: (result) => {
                Swal.fire({ icon: 'success', title: 'Se guardaron los datos correctamente.', showConfirmButton: true }).then(function () {
                    $("#trasladoEstimacionesModal").modal('hide');
                    LoadTableTrasladosEstimaciones();
                    opendialog("/visorinformes.aspx?IDReporte=27&parameters=" + result);
                });
                
            },
            error: (e) => {
                var message = e.responseJSON.message || "Error no se guardaron los datos.";
                Swal.fire({ icon: 'error', title: "Error", text: message });
            }
        });
    } else {
        var message = "No hay datos seleccionados";
        if (fecha == "")
            message = "Ingrese la fecha de traslado";
        Swal.fire({ icon: 'warning', title: message, text: "" });
    }
});


$("#save-trasladarEdicion").on("click", () => {
    var fecha = $("#desdeBusquedaEdicion").val();
    if (seleccionadosEdicion && seleccionadosEdicion.length) {
        var iso = new Date(fecha).toISOString();
        var data = {
            "AgregaEncabezadoEstimacionTraslado": [],
            "AgregaDetalleEstimacionTraslado": []
        };
        data.AgregaEncabezadoEstimacionTraslado.push({
            "IDTraslado": IDtraslado,
            "TrasladoTipo": entidad,
            "FechaTraslado": iso,
            "UserName": usuario
        });
        seleccionadosEdicion.forEach(x => {

            data.AgregaDetalleEstimacionTraslado.push({
                "EstimacionCorr": parseFloat(x.PeriodoCorr),
                "ProyectoCodigo": x.Proyecto,
                "AnioID": parseFloat(x.Anio),
                "UserName": usuario,
                "CantFolio": x.CantFolio,
                "CantSello": x.CantSello
            })
        });
        $.ajax({
            url: `${urlbase}api/TrasladoEstimacion/AgregaTrasladoEstimacionEditar`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            type: "POST",
            data: JSON.stringify(data),
            success: (result) => {
                Swal.fire({ icon: 'success', title: 'Se guardaron los datos correctamente.', showConfirmButton: true }).then(function () {
                    
                    $("#trasladoEdicionEstimacionesModal").modal('hide');
                    opendialog("/visorinformes.aspx?IDReporte=27&parameters=" + IDtraslado);
                });

            },
            error: (e) => {
                var message = e.responseJSON.message || "Error no se guardaron los datos.";
                Swal.fire({ icon: 'error', title: "Error", text: message });
            }
        });
    } else {
        var message = "No hay datos seleccionados";
        if (fecha == "")
            message = "Ingrese la fecha de traslado";
        Swal.fire({ icon: 'warning', title: message, text: "" });
    }
});

$("#trasladar-items").on('draw.dt', () => {
    $("th.select-add").html(`<div class="form-group custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="select-all">
            <label class="custom-control-label" for="select-all">Seleccionar Todo</label>
        </div>`);
    $("th.select-add").on('click', 'input[type=checkbox]', (e) => {
        var value = e.currentTarget.checked;
        $(".ck-traslado-add").each((index, input) => {
            if (input.dataset.select == 'false') {
                input.checked = value;
                if (value)
                    input.parentElement.parentElement.parentElement.classList.add("seleccionado");
                else
                    input.parentElement.parentElement.parentElement.classList.remove("seleccionado");
            } else {
                input.checked = false;
                input.parentElement.parentElement.parentElement.classList.remove("seleccionado");
            }   
        })
    });
});

$("#trasladarEdicion-items").on('draw.dt', () => {
    $("th.select-add").html(`<div class="form-group custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="select-all">
            <label class="custom-control-label" for="select-all">Seleccionar Todo</label>
        </div>`);
    $("th.select-add").on('click', 'input[type=checkbox]', (e) => {
        var value = e.currentTarget.checked;
        $(".ck-trasladoEdit-add").each((index, input) => {
            if (input.dataset.select == 'false') {
                input.checked = value;
                if (value)
                    input.parentElement.parentElement.parentElement.classList.add("seleccionado");
                else
                    input.parentElement.parentElement.parentElement.classList.remove("seleccionado");
            } else {
                input.checked = false;
                input.parentElement.parentElement.parentElement.classList.remove("seleccionado");
            }
        })
    });
});

$("#table-traslado-detalle").on("click", "tbody > tr", (e) => {
    $("#table-traslado-detalle tbody > tr").removeClass("seleccionado");
    e.currentTarget.classList.add("seleccionado");
});



$("table#trasladar-items").on("change", "input[type=checkbox]", (e) => {
    var checked = e.currentTarget.checked;
    if (checked)
        e.target.parentElement.parentElement.parentElement.classList.add("seleccionado");
    else
        e.target.parentElement.parentElement.parentElement.classList.remove("seleccionado");
})

$("table#trasladarEdicion-items").on("change", "input[type=checkbox]", (e) => {
    var checked = e.currentTarget.checked;
    if (checked)
        e.target.parentElement.parentElement.parentElement.classList.add("seleccionado");
    else
        e.target.parentElement.parentElement.parentElement.classList.remove("seleccionado");
})

$("#search-btn-trasladoEdicion-add").on("click", () => {
    LoadTableTrasladoAddEdit();
});

function LoadTableTrasladoAddEdit() {
    var value = $("#estimacionEdicion-tras-add-select").val();
    var proyecto = $("#search-add-trasladoEdicion").val() || 0;
    var columns = [
        { data: 'null', className: 'spacer', title: '', render: () => '' },
        {
            data: 'PeriodoCorr',
            title: 'Seleccionar',
            className: "text-center select-add",
            render: (data, type, row, indexes) => {
                var input_seleccionar = `
                        <div class="form-group custom-control custom-checkbox">
                            <input type="checkbox" data-traslado="${data}" class="custom-control-input ck-trasladoEdit-add"
                                data-select="${row['select']}"
                                id="add-chkEdit-${indexes.row}" data-row="${indexes.row}" ${row['select'] ? 'disabled' : ''}>
                            <label class="custom-control-label" for="add-chkEdit-${indexes.row}"></label>
                        </div>
                       `;
                return input_seleccionar;
            }
        },
        { data: 'Anio', title: 'Año', className: "text-center" },
        { data: 'Proyecto', title: 'Código del Proyecto', className: "text-center" },
        { data: 'PeriodoCorr', title: 'Correlativo', className: "text-center" },
        { data: 'Periodo', title: 'Período', className: "text-center" },
        { data: 'Monto', title: 'Monto', className: "text-center", render: (data) => format_currency(parseFloat(data), "Q.") },
        { data: 'EstadoDesc', title: 'Estado', className: "text-center" },
        {
            data: 'CantFolio',
            title: 'Cantidad de Folios',
            className: "text-center",
            render: (data, type, row, indexes) => {
                var input_seleccionar = `
                        <div class="form-group">
                            <input type="text" data-traslado="${data}" class="form-control add-CantFolio"
                                id="add-CantFolio-${indexes.row}" data-row="${indexes.row}" placeholder="${row['CantFolio']}">
                            
                        </div>
                       `;
                return input_seleccionar;
            }
        },
        {
            data: 'CantSello',
            title: 'Cantidad de Sellos',
            className: "text-center",
            render: (data, type, row, indexes) => {
                var input_seleccionar = `
                        <div class="form-group">
                            <input type="text" data-traslado="${data}" class="form-control add-CantSello"
                                id="add-CantSello-${indexes.row}" data-row="${indexes.row}" placeholder="${row['CantSello']}">
                            
                        </div>
                       `;
                return input_seleccionar;
            }
        },
        { data: 'select', title: '', className: "text-center", render: (data) => data ? "Si" : "No" },
        { data: 'null', className: 'spacer', title: '', render: () => '' },
    ];
    $.ajax({
        url: `${urlbase}api/TrasladoEstimacion/GetEstimacionesTraslado/${value}/${proyecto == "" ? 0 : proyecto}/${entidad == "True" ? 1 : 0}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (value) => {
            if (NuevoTrasladoEdicion != 1) {
                if (value && value.length) {
                    value.forEach(x => {
                        x.select = false;
                        if (seleccionadosEdicion.find(y => (y.Anio == x.Anio && y.Proyecto == x.Proyecto && y.PeriodoCorr == x.PeriodoCorr)) != null)
                            x.select = true;
                    });
                }
            }
            else { NuevoTrasladoEdicion = 0; seleccionadosEdicion = []; }
            $("#trasladarEdicion-items").DataTable(WithoutPagination(url_proyecto, columns, value));
        },
        error: (e) => {
            $("#trasladarEdicion-items").DataTable(WithoutPagination(url_proyecto, columns, []));
        }
    });
}
