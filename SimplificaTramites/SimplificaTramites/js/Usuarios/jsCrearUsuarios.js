LoadGridUsuarios();

function LoadGridUsuarios() {
    var estado = $("input[name='tipo']:checked").val();
    var buscar = $("#buscar").val();
    var columns = [
        { data: 'null', className: 'spacer', title: '', render: () => '' },
        {
            data: 'null',
            title: 'Seleccionar',
            className: "text-center",
            render: (data, type, row, indexes) => {
                var input_seleccionar = `
                    <div class="form-group custom-control custom-checkbox ">
                        <input type="checkbox" class="custom-control-input check"
                            id="check${indexes.row}" data-row="${indexes.row}">
                        <label class="custom-control-label" for="check${indexes.row}"></label>
                    </div>`;
                return input_seleccionar;
            }
        },
        { data: 'UsuarioID', title: 'Codigo Empleado', className: "text-center" },
        {
            data: 'Nombres',
            title: 'Nombres y Apellidos',
            className: "text-center",
            render: (data, type, row) => `${data} ${row['Apellidos']}`
        },
        { data: 'Telefonos', title: 'Telefonos', className: "text-center" },
        { data: 'DependenciaNombre', title: 'Revisor', className: "text-center" },
        { data: 'CargoDesc', title: 'Cargo', className: "text-center" },
        { data: 'null', className: 'spacer', title: '', render: () => '' },
    ];
    $.ajax({
        url: `${urlbase}api/AgregarUsuario/ObtenerPersonalUsuario/${buscar}/${estado}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $("#table-usuarios").DataTable(WithoutPagination(url_proyecto, columns, val))
        },
        error: () => {
            $("#table-usuarios").DataTable(WithoutPagination(url_proyecto, columns, []))
        }
    })
}

var row = null;
$("table#table-usuarios").on("change", "input[type=checkbox]", (e) => {
    var checked = e.currentTarget.checked;
    row = $("table#table-usuarios").DataTable().row(e.currentTarget.dataset.row).data();
    $(".check").parent().parent().parent().removeClass("seleccionado");
    $(".check").prop('checked', false);
    if (checked)
        e.target.parentElement.parentElement.parentElement.classList.add("seleccionado");
    else
        e.target.parentElement.parentElement.parentElement.classList.remove("seleccionado");

    $(`#${e.currentTarget.id}`).prop('checked', checked);
    $("#message-error").html(null);
    $("#guardar-usuario").prop("disabled", !checked);
    $("#nombreUsuario").val(checked ? row.UsuarioID : "");
    if (!checked)
        row = null;
});

let time;
$("#buscar").on('keyup search input past cut', () => {
    clearTimeout(time);
    time = setTimeout(() => {
        LoadGridUsuarios();
    }, 800);
});

$('input[name="tipo"]').change(() => {
    LoadGridUsuarios();
});

$("#btn-buscar").click(() => {
    LoadGridUsuarios();
});

$("#guardar-usuario").click(() => {
    if (Page_ClientValidate('valusuario')) {
        $.ajax({
            url: `CrearUsuario.aspx/Save`,
            type: "POST",
            data: JSON.stringify({
                username: row.UsuarioID,
                email: $("#correoElectronico").val(),
                password: $("#usuarioPasswod").val()
            }),
            headers: { "Content-Type": "application/json" },
            success: (message) => {
                if (message.d == "ok") {
                    UpdateEmpleado(row.UsuarioID);
                } else {
                    $("#message-error").html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Error: </strong>${message.d}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`);
                }
            },
            error: (e) => {
                var message = e.responseJSON.Message || "Error al guardar el usuario.";
                Swal.fire({ icon: 'error', title: "Error", text: message });
            }
        });
    }
});

function UpdateEmpleado(username) {
    $.ajax({
        url: `${urlbase}api/AgregarUsuario/ActualizarPersonalUsuario`,
        type: "POST",
        data: JSON.stringify({
            "UsuarioID": username,
            "Userstatus": true,
            "UserName": username
        }),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: () => {
            var search = $("#buscar").val();
            $("form").trigger("reset");
            $("#buscar").val(search);
            LoadGridUsuarios();
            $("#message-error").html(null);
            $("#guardar-usuario").prop("disabled", true);
            row = null;
            Swal.fire({icon: 'success', title: 'Se creo el usuario correctamente.', showConfirmButton: false, timer: 1000});
        },
        error: (e) => {
            var message = e.responseJSON.Message || "Error al guardar el usuario.";
            Swal.fire({ icon: 'error', title: "Error", text: message });
        }
    });
}