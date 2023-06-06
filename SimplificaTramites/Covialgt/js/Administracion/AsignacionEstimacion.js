/*********************************************************************
 * * Eventos para las opciones de la tabla de asignacion de estimacion
***********************************************************************/
var op = "2";
$(`input[type="radio"][name="tipoFiltro"]`).on("change", (e) => {
    op = e.currentTarget.value;
    $("#save-asignacion").prop("disabled", true);
    if (op == "2")
        $("#save-asignacion").removeClass("d-none");
    else
        $("#save-asignacion").addClass("d-none");
    TableAsignacionEstimaciones(e.currentTarget.value);
});

var data_row = 0;
$("table#table-asignacion").on("change", "input[type=checkbox]", (e) => {
    var checked = e.currentTarget.checked;
    $(".inp-asig-est").parent().parent().parent().removeClass("seleccionado");
    var row = e.currentTarget.dataset.row;
    data_row = e.currentTarget.dataset.row;
    if (checked)
        e.target.parentElement.parentElement.parentElement.classList.add("seleccionado");
    else
        e.target.parentElement.parentElement.parentElement.classList.remove("seleccionado");
    $(".inp-asig-est").prop('checked', false);
    $(`#${e.currentTarget.id}`).prop('checked', checked);
    $("#save-asignacion").prop("disabled", !(op == "2" && checked));
    var table = $("#table-asignacion").DataTable().row(row).data()
    TableHistorial(table.AnioID, table.ProyectoCodigo, table.EstimacionCorr, !checked)
});

/*****************************************************
 * * Carga de la tabla de Asignacion de estimaciones
******************************************************/
function TableAsignacionEstimaciones(opcion = 2) {
    var columns = [
        { data: 'null', className: 'spacer', title: '', render: () => '' },
        {
            data: 'null',
            title: 'Seleccionar',
            className: "",
            render: (data, type, row, indexes) => {
                var input_seleccionar = `
                    <div class="form-group custom-control custom-checkbox">
                        <input type="checkbox" class="chk-select form-check-input custom-control-input inp-asig-est"
                            id="checkSeleccionar-${indexes.row}" data-row="${indexes.row}">
                        <label class="custom-control-label" for="checkSeleccionar-${indexes.row}"></label>
                    </div>`;
                return input_seleccionar;
            }
        },
        { data: 'AnioID', title: 'Año', className: "text-center" },
        { data: 'ProyectoCodigo', title: 'Proy', className: "text-center" },
        { data: 'EstimacionCorr', title: 'Corr.', className: "text-center" },
        { data: 'Periodo', title: 'Período', className: "text-center" },
        { data: 'MontoEjecutado', title: 'Monto Ejecutado', className: "text-center", render: (data) => format_currency(data, 'Q') },
        { data: 'RevisorUserName', title: 'Revisor', className: "text-center" },
        { data: 'FechaRecepcion', title: 'Fecha Recepción', className: "text-center", render: format_date },
        { data: 'null', className: 'spacer', title: '', render: () => '' },
    ];
    $.ajax({
        url: `${urlbase}api/AsignacionEstimacion/GetEstimaciones/${opcion}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            $("#table-asignacion").DataTable(WithoutPagination(url_proyecto, columns, val))
        },
        error: () => {
            $("#table-asignacion").DataTable(WithoutPagination(url_proyecto, columns, []))
        }
    });
}

TableAsignacionEstimaciones();

/***********************************************************
 * * Se rellena el select de visores y se agrega el evento
************************************************************/
function cargarVisores() {
    $.ajax({
        url: `${urlbase}api/AsignacionEstimacion/GetVisores`,
        type: "POST",
        data: JSON.stringify({
            Empleado: userInRole,
        }),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let options = val.map((val) => new Option(val.Nombre, val.UsuarioID));
            $('#visores').html(options).trigger("change");
        },
        error: (e) => {
            console.log("jsReAsignacionEstimaciones.js:544", e)
        }
    });
}

function SelectVisores() {
    $.ajax({
        url: `${urlbase}api/AsignacionEstimacion/GetPersonalRol/'${usuario}'`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let options = val.map((val) => new Option(val.Nombre, val.UsuarioID));
            $('#visores').html(options).trigger("change");
        },
        error: () => { }
    });
}

//SelectVisores();
cargarVisores();

$("#visores").on("change", (e) => {
    TableEstimaciones(e.currentTarget.value);
});

/*******************************************************
 * * Se rellena la tabla de estimacion
********************************************************/
function TableEstimaciones(pUsuario) {
    var columns = [
        { data: 'null', className: 'spacer', title: '', render: () => '' },
        { data: 'AnioID', title: 'Año', className: "text-center" },
        { data: 'ProyectoCodigo', title: 'Proy', className: "text-center" },
        { data: 'EstimacionCorr', title: 'Corr.', className: "text-center" },
        { data: 'Periodo', title: 'Período', className: "text-center" },
        { data: 'MontoEjecutado', title: 'Monto Ejecutado', className: "text-center", render: (data) => format_currency(data, 'Q') },
        { data: 'RevisorUserName', title: 'Revisor', className: "text-center" },
        { data: 'FechaRecepcion', title: 'Fecha Recepción', className: "text-center", render: format_date },
        { data: 'DiasDesdeRecepcion', title: 'Dias desde Recepción', className: "text-center" },
        { data: 'null', className: 'spacer', title: '', render: () => '' },
    ];
    $.ajax({
        url: `${urlbase}api/AsignacionEstimacion/GetEstimacionesporUsuario/${pUsuario}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            $("#table-estimaciones-visores").DataTable(WithoutPagination(url_proyecto, columns, val))
        },
        error: () => {
            $("#table-estimaciones-visores").DataTable(WithoutPagination(url_proyecto, columns, []))
        }
    });
}

/*******************************************************
 * * Se rellena la tabla del historial
********************************************************/
function TableHistorial(pAnio, pProyectoCodigo, pCorr, data = false) {
    var columns = [
        { data: 'null', className: 'spacer', title: '', render: () => '' },
        { data: 'AnioID', title: 'Año', className: "text-center" },
        { data: 'ProyectoCodigo', title: 'Proyecto', className: "text-center" },
        { data: 'EstimacionCorr', title: 'Corr.', className: "text-center" },
        { data: 'Periodo', title: 'Período', className: "text-center" },
        { data: 'MontoEjecutado', title: 'Monto Ejecutado', className: "text-center", render: (data) => format_currency(data, 'Q') },
        { data: 'RevisorUserName', title: 'Revisor', className: "text-center" },
        { data: 'null', className: 'spacer', title: '', render: () => '' },
    ];
    if (data) {
        $("#table-historial-visores").DataTable(WithoutPagination(url_proyecto, columns, []))
        return;
    }
    $.ajax({
        url: `${urlbase}api/AsignacionEstimacion/GetHistorialRevisiones/${pAnio}/${pProyectoCodigo}/${pCorr}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            $("#table-historial-visores").DataTable(WithoutPagination(url_proyecto, columns, val))
        },
        error: () => {
            $("#table-historial-visores").DataTable(WithoutPagination(url_proyecto, columns, []))
        }
    });
}

/*******************************************************
 * * Se guarda la estimacion con el seleccionado
********************************************************/
$("#save-asignacion").on("click", () => {
    var row = $("#table-asignacion").DataTable().row(data_row).data();
    var data = {
        "EstimacionCorr": row.EstimacionCorr,
        "AnioId": row.AnioID,
        "ProyectoCodigo": row.ProyectoCodigo,
        "RevisorUserName": $('#visores').val(),
        "RevisionStatus": 0,
        "Username": usuario
    };
    $.ajax({
        url: `${urlbase}api/AsignacionEstimacion/C`,
        type: "POST",
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: () => {
            Swal.fire({ icon: 'success', title: 'Se agrego correctamente.', showConfirmButton: false, timer: 1000 })
            cargarVisores();
            TableAsignacionEstimaciones();
        },
        error: (e) => {
            var message = e.responseJSON.Message || "Error al agregar la estimacion.";
            Swal.fire({ icon: 'error', title: "Error en la Asignacion", text: message });
        }
    });
});

$("#table-historial-visores").on("click", "tbody > tr", (e) => {
    $("#table-historial-visores tbody > tr").removeClass("seleccionado");
    e.currentTarget.classList.add("seleccionado");
});

$("#table-estimaciones-visores").on("click", "tbody > tr", (e) => {
    $("#table-estimaciones-visores tbody > tr").removeClass("seleccionado");
    e.currentTarget.classList.add("seleccionado");
});