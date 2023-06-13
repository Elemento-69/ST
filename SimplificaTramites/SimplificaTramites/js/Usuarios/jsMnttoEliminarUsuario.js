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
            ConsultarUser(Codigo);
        }
    })
}

function ConsultarUser(usuario) {
    if (Page_ClientValidate('valusuario')) {
        $.ajax({
            url: `frmMnttoEliminarUsuario.aspx/ConsultUser`,
            type: "POST",
            data: JSON.stringify({
                username: usuario

            }),
            headers: { "Content-Type": "application/json" },
            success: (message) => {
                let men = message.d;
                if (men == "Referencia a objeto no establecida como instancia de un objeto.") {
                    document.getElementById("LinkDenegarAcceso").style.display = "none";
                } else {
                    document.getElementById("LinkDenegarAcceso").style.display = "block";
                }

            },
            error: (e) => {
                var message = e.responseJSON.Message || "Error Información inorrecta.";
                Swal.fire({ icon: 'error', title: "Error", text: message });
            }
        });
    }
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
$("#LinkDenegarAcceso").click(function () {
    UsuarioID = $("#txtCodigoEmpleado").val();
    irAsiganacionPermisos(UsuarioID);
})
function irAsiganacionPermisos(UsuarioID) {
    let QueryString = "?usuario=" + UsuarioID
    window.location = "../Usuarios/frmMnttoAsignacionPermisos.aspx" + QueryString;
}
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




