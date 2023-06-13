let href = window.location.href;
var url = new URL(href);
var parameter = url.searchParams.get('usuario');
if (parameter) {
    $.ajax({
        url: `${urlbase}api/Usuarios/ObtenerPersonaEdicion/${parameter}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            Datos = val[0]
            Codigo = Datos.UsuarioID;
            PrimerNombre = Datos.PrimerNombre;
            SegundoNombre = Datos.SegundoNombre;

            Nombres = PrimerNombre + SegundoNombre;
            PrimerApellido = Datos.PrimerApellido;
            SegundoApellido = Datos.SegundoApellido;
            Apellidos = PrimerApellido + SegundoApellido;
            Telefonos = Datos.Telefonos;
            Dependencia = Datos.DependenciaID;
            Cargo = Datos.CargoID;

            $("#NombreUsuario").html(Codigo);
            $("#txtCodigoEmpleado").val(Codigo);
            $("#txtNombres").val(Nombres);
            $("#txtApellidos").val(Apellidos);
            $("#txtTelefonos").val(Telefonos);
            $("#txtDependencia").val(Dependencia);
            $("#txtCargo").val(Cargo);
            ConsultarUserIsApproved(Codigo);
            ConsultarUserIsLockedOut(Codigo);
            UpdateRole(Codigo);
        }
    })
}
$("#btnEliminarUser").click(() => {
    usuario = $("#txtCodigoEmpleado").val();
    Swal.fire({
        title: "Favor confirmar",
        text: "¿Desea eliminar el usuario?",
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    })
        .then((result) => {
            if (result.isConfirmed) {
                $.LoadingOverlay("show")
                $.ajax({
                    url: `${urlbase}api/MantenimientoUsuarios/EliminarUsuario`,
                    method: "post",
                    data: JSON.stringify({
                        "Usuario": usuario,
                    }),
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"
                    },
                    success: (val) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("Éxito", "Usuario elimado correctamente", "success").then(function () { });
                    },
                    error: (error) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("", error.message + "No se puede eliminar el usuario", "error");
                    }
                })
            }
        });
});

$("#btnAgregarEmpleado").click(function () {
    irNuevoEmpleado()
})

$("#btnCancelar").click(function () {
    irMnttoUsuario()
})

function irNuevoEmpleado() {
    window.location = "../Usuarios/AgregarEmpleado.aspx";
}
function irMnttoUsuario() {
    window.location = "../Usuarios/frmMnttoUsuarios.aspx";
}
function irEditarEmpleado(UsuarioID) {
    let QueryString = "?name=" + UsuarioID
    window.location = "../Usuarios/AgregarEmpleado.aspx" + QueryString;
}

function ConsultarUserIsApproved(usuario) {
    if (Page_ClientValidate('valusuario')) {
        $.ajax({
            url: `frmMnttoAsignacionPermisos.aspx/ConsultUseriS`,
            type: "POST",
            data: JSON.stringify({
                username: usuario

            }),
            headers: { "Content-Type": "application/json" },
            success: (message) => {
                console.log("Estado IsApproved:", message.d);
                estado = message.d;
                if (estado == true) {
                    $("#chkAprob").prop("checked", true);
                } else {
                    $("chkAprob").prop("checked", false);
                }
                if (estado == false) {
                    $("#chkAprob").prop("checked", false);
                } else {
                    $("chkAprob").prop("checked", true);
                }
            },
            error: (e) => {
                var message = e.responseJSON.Message || "Error Información inorrecta.";
                Swal.fire({ icon: 'error', title: "Error", text: message });
            }
        });
    }
}
function ConsultarUserIsLockedOut(usuario) {
    Proyecto = $("#txtProy").val();
    Anioid = $("#txtAnio").val();
    User = Anioid + Proyecto;
    if (Page_ClientValidate('valusuario')) {
        $.ajax({
            url: `frmMnttoAsignacionPermisos.aspx/ConsultUseriSLocked`,
            type: "POST",
            data: JSON.stringify({
                username: usuario

            }),
            headers: { "Content-Type": "application/json" },
            success: (message) => {
                console.log("Estado IsLockedOut:", message.d);
                estado = message.d;
                if (estado == true) {
                    $("#chkBlock").prop("checked", true);
                    document.getElementById("chkBlock").disabled = false;

                } else {
                    $("chkBlock").prop("checked", false);
                    document.getElementById("chkBlock").disabled = true;
                }
                if (estado == false) {
                    $("#chkBlock").prop("checked", false);
                    document.getElementById("chkBlock").disabled = true;
                } else {
                    $("chkBlock").prop("checked", true);
                    document.getElementById("chkBlock").disabled = false;
                }
            },
            error: (e) => {
                var message = e.responseJSON.Message || "Error Información inorrecta.";
                Swal.fire({ icon: 'error', title: "Error", text: message });
            }
        });
    }
}
$("#linregresarMnttoUsuario").click(function () {
    irMnttoUsuario()
})

function irNuevoEmpleado() {
    window.location = "../Usuarios/frmMnttoUsuarios.aspx";
}
$("#chkAprob").click(() => {
    user = $("#txtCodigoEmpleado").val();
    UsuarioIsApproved(user);
});
$("#chkBlock").click(() => {
    user = $("#txtCodigoEmpleado").val();
    UsuarioIsLockedOut(user);
});

function ReloadTable() {
    $("#roles_user").html(null);
    $("#add-rol").prop("disabled", true);
}

function UsuarioIsLockedOut(usuario) {
    let check = document.getElementById("chkBlock").checked;
    $.ajax({
        url: `frmMnttoAsignacionPermisos.aspx/IsLockedOut`,
        headers: { "Content-Type": "application/json" },
        type: "POST",
        data: JSON.stringify({ username: usuario, check: check }),
        success: (val) => {
            if (val.d) {
                Swal.fire({ icon: 'success', title: 'Exito', text: 'Se actualizo el estado.', showConfirmButton: false, timer: 1500 });
                document.getElementById("chkBlock").disabled = true;
            } else {
                Swal.fire({ icon: 'error', title: "Error", text: "No se actualizo el estado." });
            }
        },
        error: (e) => {
            var message = e.responseJSON.Message || "No se actualizo el estado.";
            Swal.fire({ icon: 'error', title: "Error", text: message });
        }
    })
}

function UsuarioIsApproved(usuario) {
    let check = document.getElementById("chkAprob").checked;
    $.ajax({
        url: `frmMnttoAsignacionPermisos.aspx/IsApproved`,
        headers: { "Content-Type": "application/json" },
        type: "POST",
        data: JSON.stringify({ username: usuario, check: check }),
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
}


function UpdateRole(username) {
    $.ajax({
        url: `frmMnttoAsignacionPermisos.aspx/GetRolesUser`,
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
        //var username = $("#table-usuarios tbody > tr.seleccionado")[0].children[1].children[0].dataset.username;
        username = $("#txtCodigoEmpleado").val();
        $.ajax({
            url: `frmMnttoAsignacionPermisos.aspx/AddRoleUser`,
            headers: { "Content-Type": "application/json" },
            type: "POST",
            data: JSON.stringify({ username: username, role: $("#SelectRoles").val() }),
            success: (val) => {
                console.log(val);
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
        username = $("#txtCodigoEmpleado").val();
        $.ajax({
            url: `frmMnttoAsignacionPermisos.aspx/DeleteRoleUser`,
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