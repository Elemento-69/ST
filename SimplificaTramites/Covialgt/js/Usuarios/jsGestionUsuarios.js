LoadGridEmpleados();

function ReloadTable() {
    $("#roles_user").html(null);
    $("#add-rol").prop("disabled", true);
}

function LoadGridEmpleados() {
    var buscar = $("#buscar").val();
    $("#roles_user").html(null);
    $("#add-rol").prop("disabled", true);
    var columns = [
        { data: 'null', className: 'spacer', title: '', render: () => '' },
        {
            data: 'UserName',
            title: '',
            className: "text-center",
            render: (data, type, row, indexes) => {
                var buttons = `
                    <a style="cursor:pointer" class="action-icon hover-blue btn-detalle" data-toggle="popover"
                        data-trigger="hover" data-content="Detalle" data-username="${data}">
                        <i class="fas fa-eye fa-lg fa-fw"></i>
                    </a>
                    <a style="cursor:pointer" href="AgregarEmpleado?name=${data}"
                        class="action-icon hover-blue btn-editar" data-toggle="popover"
                        data-trigger="hover" data-content="Editar" data-username="${data}">
                        <i class="fas fa-pencil-alt fa-lg fa-fw"></i>
                    </a>
                    <a style="cursor:pointer" class="action-icon hover-red btn-eliminar" data-toggle="popover"
                        data-trigger="hover" data-content="Eliminar" data-username="${data}">
                        <i class="fas fa-trash fa-lg fa-fw"></i>
                    </a>`;
                return `<div class="text-nowrap" data-username="${data}">${buttons}</div>`;
            }
        },
        {
            data: 'IsApproved',
            title: 'Aprobado',
            className: "text-center",
            render: (data, type, row, indexes) => {
                var checked = data ? 'checked' : '';
                var checkbox = `
                    <div class="form-group custom-control custom-checkbox ">
                        <input type="checkbox" class="custom-control-input check"
                            id="check${indexes.row}" data-username="${row['UserName']}" ${checked}>
                        <label class="custom-control-label" for="check${indexes.row}"></label>
                    </div>`;
                return checkbox;
            }
        },
        { data: 'UserName', title: 'Usuario', className: "text-center" },
        { data: 'Email', title: 'Correo Electrónico', className: "text-center" },
        { data: 'null', className: 'spacer', title: '', render: () => '' }
    ];
    $("#table-usuarios").DataTable(requestAjax(`GestionUsuario.aspx/GetUsers`, url_proyecto, columns))
    /*
    $.ajax({
        url: `GestionUsuario.aspx/GetUsers`,
        headers: {"Content-Type": "application/json"},
        type: "POST",
        data: JSON.stringify({search: buscar || ""}),
        success: (val) => {
            $("#table-usuarios").DataTable(PaginationData(url_proyecto, columns, val.d));
        },
        error: () => {
            $("#table-usuarios").DataTable(PaginationData(url_proyecto, columns, []))
        }
    })*/
}

let time;
$("#buscar").on('keyup search input past cut', () => {
    clearTimeout(time);
    time = setTimeout(() => {
        $('#table-usuarios').DataTable().search($('#buscar').val()).draw();
    }, 800);
});

$("#btn-buscar").click(() => {
    $('#table-usuarios').DataTable().search($('#buscar').val()).draw();
});

$(".table-responsive").on("click", "#table-usuarios_wrapper .add-update-datatable", () => {
    $('#table-usuarios').DataTable().search($('#buscar').val()).draw();
});

$("#table-usuarios").on("click", ".btn-detalle", (e) => {
    $.ajax({
        url: `${urlbase}api/AsignacionPermisos/ObtenerPersonal/${e.currentTarget.dataset.username}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            if (val && val.length > 0) {
                $("#UsuarioID").text(val[0].UsuarioID);
                $("#DependenciaNombre").text(val[0].DependenciaNombre);
                $("#CargoDesc").text(val[0].CargoDesc);
                $("#NombreCompleto").text(val[0].Nombres + " " + val[0].Apellidos);
                $("#Telefonos").text(val[0].Telefonos);
                $("#detalles").modal("show");
            } else {
                Swal.fire({ icon: 'error', title: "Error", text: "No se encontraron datos del usuario" });
            }
        },
        error: (e) => {
            var message = e.responseJSON.Message || "No se obtuvieron los datos del usuario.";
            Swal.fire({ icon: 'error', title: "Error", text: message });
        }
    });
});

$("#table-usuarios").on("click", ".check", (e) => {
    var check = e.currentTarget.checked;
    $.ajax({
        url: `GestionUsuario.aspx/IsApproved`,
        headers: { "Content-Type": "application/json" },
        type: "POST",
        data: JSON.stringify({ username: e.currentTarget.dataset.username, check: check }),
        success: (val) => {
            if (val.d) {
                Swal.fire({ icon: 'success', title: 'Exito', text: 'Se actualizo el estado.', showConfirmButton: false, timer: 1500 });
            } else {
                Swal.fire({ icon: 'error', title: "Error", text: "No se actualizo el estado." });
            }
        },
        error: (e) => {
            var message = e.responseJSON.Message || "No se actualizo el estado.";
            Swal.fire({ icon: 'error', title: "Error", text: message });
        }
    })
});

$("#table-usuarios").on("click", ".btn-eliminar", (e) => {
    var username = e.currentTarget.dataset.username;
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
            $.ajax({
                url: `GestionUsuario.aspx/Delete`,
                type: "POST",
                data: JSON.stringify({ username: username }),
                headers: {"Content-Type": "application/json"},
                success: (val) => {
                    if (val.d) {
                        $('#table-usuarios').DataTable().search($('#buscar').val()).draw();
                        Swal.fire({ icon: 'success', title: 'Exito', text: 'Se elimino el registro', showConfirmButton: false, timer: 1500 });
                    } else {
                        Swal.fire({ icon: 'error', title: "Error", text: "No se puede eliminar el registro."});
                    }
                },
                error: (e) => {
                    var message = e.responseJSON.Message || "No se puede eliminar el registro.";
                    Swal.fire({ icon: 'error', title: "Error", text: message });
                }
            });
        }
    });
})

$("#table-usuarios").on("click", "tbody > tr", (e) => {
    $("#table-usuarios tbody > tr").removeClass("seleccionado");
    e.currentTarget.classList.add("seleccionado");
    var username = e.currentTarget.children[1].children[0].dataset.username;
    $("#add-rol").prop("disabled", false);
    UpdateRole(username);
});

function UpdateRole(username) {
    $.ajax({
        url: `GestionUsuario.aspx/GetRolesUser`,
        headers: { "Content-Type": "application/json" },
        type: "POST",
        data: JSON.stringify({ username: username }),
        success: (val) => {
            let options = val.d.map((x) => new Option(x, x));
            $("#roles_user").html(options);
        },
        error: (e) => {
            var message = e.responseJSON.Message || "No se puede obtener los roles del usuario";
            Swal.fire({ icon: 'error', title: "Error", text: message });
        }
    })
}

$("#add-rol").click(() => {
    var username = $("#table-usuarios tbody > tr.seleccionado")[0].children[1].children[0].dataset.username;
    $.ajax({
        url: `GestionUsuario.aspx/AddRoleUser`,
        headers: { "Content-Type": "application/json" },
        type: "POST",
        data: JSON.stringify({ username: username, role: $("#SelectRoles").val() }),
        success: (val) => {
            if (typeof val.d == "string") {
                Swal.fire({ icon: 'error', title: "Error", text: val.d });
            } else {
                let options = val.d.map((x) => new Option(x, x));
                $("#roles_user").html(options);
            }
        },
        error: (e) => {
            var message = e.responseJSON.Message || "No se puede agregar el rol.";
            Swal.fire({ icon: 'error', title: "Error", text: message });
        }
    })
});

$("#delete-role").click(() => {
    var roles = $("#roles_user").val();
    if (roles && roles.length > 0) {
        var username = $("#table-usuarios tbody > tr.seleccionado")[0].children[1].children[0].dataset.username;
        $.ajax({
            url: `GestionUsuario.aspx/DeleteRoleUser`,
            headers: { "Content-Type": "application/json" },
            type: "POST",
            data: JSON.stringify({ username: username, roles: roles }),
            success: (val) => {
                if (typeof val.d == "string") {
                    Swal.fire({ icon: 'error', title: "Error", text: val.d });
                } else {
                    let options = val.d.map((x) => new Option(x, x));
                    $("#roles_user").html(options);
                }
            },
            error: (e) => {
                var message = e.responseJSON.Message || "No se puede agregar el rol.";
                Swal.fire({ icon: 'error', title: "Error", text: message });
            }
        })
    }
});