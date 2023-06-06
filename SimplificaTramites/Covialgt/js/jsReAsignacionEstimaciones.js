let table
let monto
let proyectoVacio = ['', '']
let confirmarAgregarFacturaTexto = ""
let op = "2"
let data_row = 0
$(document).ready(function () {
	(function () {
        'use strict';
        window.addEventListener('load', function () {
            // Get the forms we want to add validation styles to
            var forms = document.getElementsByClassName('needs-validation')
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function (form) {
                form.addEventListener('submit', function (event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    form.classList.add('was-validated')
                }, false)
            })
        }, false)
    })()
    $("body").keydown("input", function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            $(event.currentTarget.dataset.submitbutton).click()
            return false;
        }
    });
    $("select").select2({ theme: "bootstrap" })
    $(".date").datetimepicker({
        format: 'DD/MM/YYYY'
    })
    cargarVisores()
    cargarEstimaciones()
    $("#visores").on("change.select2", ({ currentTarget }) => {
        let visor = currentTarget.value
        cargarEstimacionesPorUsuario(visor)
    })
    $("input[type=radio][name=tipoFiltro]").on("change", ({ currentTarget }) => {
        op = currentTarget.value;
        $("#save-asignacion").prop("disabled", true);
        if (op == "3") {
            $("#save-asignacion").removeClass("d-none");
        } else {
            $("#save-asignacion").addClass("d-none");
        }
        cargarEstimaciones(currentTarget.value);
    });
    $("table#table-asignacion").on("change", "input[type=checkbox]", ({ currentTarget }) => {
        let checked = currentTarget.checked;
        let row = currentTarget.dataset.row;
        data_row = currentTarget.dataset.row;
        $(".inp-asig-est").prop('checked', false);
        $(`#${currentTarget.id}`).prop('checked', checked);
        $("#save-asignacion").prop("disabled", !(op == "3" && checked));
        // let table = $("#table-asignacion").DataTable().row(row).data()
        // TableHistorial(table.AnioID, table.ProyectoCodigo, table.EstimacionCorr)
    });
    $("#save-asignacion").click(function () {
        reasignacion()
    })
})
function cargarVisores(){
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
function cargarEstimacionesPorUsuario(pUsuario) {
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
function cargarEstimaciones(opcion = 2) {
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
function reasignacion() {
    // GridVisado -> table-asignacion
    // gridEstimacionesUsuario -> table-estimaciones-visores
    // lstAuditores -> visores
    // table-historial-visores
    let revisorUserName = $("#visores").val()
    let usuarioAsignar = $("#table-asignacion").DataTable().row(data_row).data();
    if (revisorUserName.length == 0 || usuarioAsignar.length == 0){
        Swal.fire("", "Debe seleccionar una estimacion y/o visor", "error");
        return
    }
    let data = {
        AnioId: usuarioAsignar.AnioID,
        ProyectoCodigo: usuarioAsignar.ProyectoCodigo,
        PeriodoCorrel: usuarioAsignar.EstimacionCorr,
        RevisorUserName: revisorUserName,
        Username: usuario,
    }
    $.LoadingOverlay("show")
    $.ajax({
        url: `${urlbase}api/ReAsignacionEstimacion/ReAsignaRevisorEstimacion`,
        method: "post",
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            $.LoadingOverlay("hide");
            cargarVisores()
            cargarEstimaciones(op)
        },
        error: (error) => {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");
        }
    })
}