NoUsuario = false;
Usuario = true;
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    fnCargaInicial();
    // llamar a ventana modal para configurar el tiempo de cambio de contraseña para usuarios
    $("#btnConfigurarCambioPass").click(function () {
        fnCargarTiempoActual();
        $('#modalConfigurarTiempoPass').modal('show');
    })
    $("#btnGuardarTiempo").click(function () {
        fnCambiarPeriodoValidez();
    
})
})

function fnCargarTiempoActual() {
    
    const url = urlbase + "api/MantenimientoUsuarios/ObtenerValidezPassword"

    fetch( url, {

        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },

    })
        .then(response => {
            return response.json();

            
        })
        .then(data => {
            $('#periodo_dias').val(data[0].Descripcion)
            
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");

        });
}
function fnCambiarPeriodoValidez() {
    const url = urlbase + "api/MantenimientoUsuarios/ObtenerValidezPassword"
    var dataJSONt = JSON.stringify({
        Descripcion: $('#periodo_dias').val()
    });
        $.ajax({
            type: "POST",
            url: urlbase + "api/MantenimientoUsuarios/CambiarValidezPassword",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            data: dataJSONt,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                if (data) {
                   
                    Swal.fire("", "Período de validez actualizado correctamente", "success").then(function () {
                        $('#modalConfigurarTiempoPass').modal('hide');
                    });

                }

            },
            failure: function (response) {
                
                Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
            }
        });
    
}

function fnCargaInicial() {
    document.getElementById("usuarios-todos").checked=true;
    let columns = [
        {
            searchable: false,
            orderable: false,
            className: 'spacer',
            defaultContent: ""
        },
        {
            title: '',
            searchable: false,
            orderable: false,
            className: 'text-center',
            data: 'AnioID',
            render: (val, _, row) => {
                let act_btns = ""
                return ` ${act_btns}
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Seleccionar" data-placement="top" onclick="irEditarEmpleado('${row.UsuarioID}');" style="cursor:pointer" data-dismiss="modal"  title="Editar Usuario">
                        <i class="fas fa-edit fa-sm fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Seleccionar" data-placement="top" onclick="irEliminarEmpleado('${row.UsuarioID}');" style="cursor:pointer" data-dismiss="modal"  title="Borrar Empleado/Usuario">
                        <i class="fas fa-trash fa-sm fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Seleccionar" data-placement="top" onclick="irAsignacionPermisos('${row.UsuarioID}');" style="cursor:pointer" data-dismiss="modal"  title="Asignar/Quitar Roles">
                        <i class="fas fa-wrench fa-sm fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Seleccionar" data-placement="top" onclick="fnModalResetClave('${row.UsuarioID}');" style="cursor:pointer" data-dismiss="modal"  title="Reestablecer Password">
                        <i class="fas fa-unlock fa-sm fa-fw"></i>
                    </button>
                     `
            }
        },

        {
            className: 'text-center',
            title: "Identificador",
            data: 'UsuarioID'
        },
        {
            className: 'text-center',
            title: "Nombre",
            data: 'nombres'
        },
        {
            className: 'text-center',
            title: "Apellido",
            data: 'apellidos'
        },
        {
            className: 'text-center',
            title: "Email",
            data: 'Email'
        },
        {
            className: 'text-center',
            title: "Cargo",
            data: 'CargoDesc'
        },
        {
            className: 'text-center',
            title: "Telefonos",
            data: 'Telefonos'
        },
        {
            searchable: true,
            orderable: true,
            className: 'spacer',
            defaultContent: ""
        }
    ]
    let extra = {
        serverSide: false,
        order: [[1, "desc"]],
        createdRow: function (row, data, dataIndex) {
            $(row).data("item", data)
        },
        drawCallback: () => {
            initMasks('table')
        },
    }
    $("#usuarios-table").dataTable(generateDataTable(columns, extra, `${urlbase}api/MantenimientoUsuarios/ObtenerPersonalUsuariosFull`))
}
function fnCargaInicialTodosUsuarios() {

    let columns = [
        {
            searchable: false,
            orderable: false,
            className: 'spacer',
            defaultContent: ""
        },
        {
            title: '',
            searchable: false,
            orderable: false,
            className: 'text-center',
            data: 'AnioID',
            render: (val, _, row) => {
                let act_btns = ""
                return ` ${act_btns}
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Seleccionar" data-placement="top" onclick="irEditarEmpleado('${row.UsuarioID}');" style="cursor:pointer" data-dismiss="modal"  title="Editar Usuario">
                        <i class="fas fa-edit fa-sm fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Seleccionar" data-placement="top" onclick="irEliminarEmpleado('${row.UsuarioID}');" style="cursor:pointer" data-dismiss="modal"  title="Borrar Empleado/Usuario">
                        <i class="fas fa-trash fa-sm fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Seleccionar" data-placement="top" onclick="irAsignacionPermisos('${row.UsuarioID}');" style="cursor:pointer" data-dismiss="modal"  title="Asignar/Quitar Roles">
                        <i class="fas fa-wrench fa-sm fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Seleccionar" data-placement="top" onclick="fnModalResetClave('${row.UsuarioID}');" style="cursor:pointer" data-dismiss="modal"  title="Reestablecer Password">
                        <i class="fas fa-unlock fa-sm fa-fw"></i>
                    </button>
                     `
            }
        },

        {
            className: 'text-center',
            title: "Identificador",
            data: 'UsuarioID'
        },
        {
            className: 'text-center',
            title: "Nombre",
            data: 'nombres'
        },
        {
            className: 'text-center',
            title: "Apellido",
            data: 'apellidos'
        },
        {
            className: 'text-center',
            title: "Email",
            data: 'Email'
        },
        {
            className: 'text-center',
            title: "Cargo",
            data: 'CargoDesc'
        },
        {
            className: 'text-center',
            title: "Telefonos",
            data: 'Telefonos'
        },
        {
            searchable: true,
            orderable: true,
            className: 'spacer',
            defaultContent: ""
        }
    ]
    let extra = {
        serverSide: false,
        order: [[1, "desc"]],
        createdRow: function (row, data, dataIndex) {
            $(row).data("item", data)
        },
        drawCallback: () => {
            initMasks('table')
        },
    }
    $("#usuarios-table").dataTable(generateDataTable(columns, extra, `${urlbase}api/MantenimientoUsuarios/ObtenerPersonalUsuariosFull`))
}
function fnCargaInicialUsuarios() {

    let columns = [
        {
            searchable: false,
            orderable: false,
            className: 'spacer',
            defaultContent: ""
        },
        {
            title: '',
            searchable: false,
            orderable: false,
            className: 'text-center',
            data: 'AnioID',
            render: (val, _, row) => {
                let act_btns = ""
                return ` ${act_btns}
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Seleccionar" data-placement="top" onclick="irEditarEmpleado('${row.UsuarioID}');" style="cursor:pointer" data-dismiss="modal"  title="Editar Usuario">
                        <i class="fas fa-edit fa-sm fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Seleccionar" data-placement="top" onclick="irEliminarEmpleado('${row.UsuarioID}');" style="cursor:pointer" data-dismiss="modal"  title="Borrar Empleado/Usuario">
                        <i class="fas fa-trash fa-sm fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Seleccionar" data-placement="top" onclick="irAsignacionPermisos('${row.UsuarioID}');" style="cursor:pointer" data-dismiss="modal"  title="Asignar/Quitar Roles">
                        <i class="fas fa-wrench fa-sm fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Seleccionar" data-placement="top" onclick="fnModalResetClave('${row.UsuarioID}');" style="cursor:pointer" data-dismiss="modal"  title="Reestablecer Password">
                        <i class="fas fa-unlock fa-sm fa-fw"></i>
                    </button>
                     `
            }
        },

        {
            className: 'text-center',
            title: "Identificador",
            data: 'UsuarioID'
        },
        {
            className: 'text-center',
            title: "Nombre",
            data: 'nombres'
        },
        {
            className: 'text-center',
            title: "Apellido",
            data: 'apellidos'
        },
        {
            className: 'text-center',
            title: "Email",
            data: 'Email'
        },
        {
            className: 'text-center',
            title: "Cargo",
            data: 'CargoDesc'
        },
        {
            className: 'text-center',
            title: "Telefonos",
            data: 'Telefonos'
        },
        {
            searchable: true,
            orderable: true,
            className: 'spacer',
            defaultContent: ""
        }
    ]
    let extra = {
        serverSide: false,
        order: [[1, "desc"]],
        createdRow: function (row, data, dataIndex) {
            $(row).data("item", data)
        },
        drawCallback: () => {
            initMasks('table')
        },
    }
    $("#usuarios-table").dataTable(generateDataTableFilterNoUser(columns, extra, `${urlbase}api/MantenimientoUsuarios/ObtenerPersonalUsuariosFull`, Usuario))
}
function fnCargaInicialNoUsuarios() {

    let columns = [
        {
            searchable: false,
            orderable: false,
            className: 'spacer',
            defaultContent: ""
        },
        {
            title: '',
            searchable: false,
            orderable: false,
            className: 'text-center',
            data: 'AnioID',
            render: (val, _, row) => {
                let act_btns = ""
                return ` ${act_btns}
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Seleccionar" data-placement="top" onclick="irEditarEmpleado('${row.UsuarioID}');" style="cursor:pointer" data-dismiss="modal"  title="Editar Usuario">
                        <i class="fas fa-edit fa-sm fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Seleccionar" data-placement="top" onclick="irEliminarEmpleado('${row.UsuarioID}');" style="cursor:pointer" data-dismiss="modal"  title="Borrar Empleado/Usuario">
                        <i class="fas fa-trash fa-sm fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Seleccionar" data-placement="top" onclick="irCrearUsuario('${row.UsuarioID}');" style="cursor:pointer" data-dismiss="modal"  title="Crear Cuenta">
                        <i class="fas fa-plus fa-sm fa-fw"></i>
                    </button>
                     `
            }
        },

        {
            className: 'text-center',
            title: "Identificador",
            data: 'UsuarioID'
        },
        {
            className: 'text-center',
            title: "Nombre",
            data: 'nombres'
        },
        {
            className: 'text-center',
            title: "Apellido",
            data: 'apellidos'
        },
        {
            className: 'text-center',
            title: "Email",
            data: 'Email'
        },
        {
            className: 'text-center',
            title: "Cargo",
            data: 'CargoDesc'
        },
        {
            className: 'text-center',
            title: "Telefonos",
            data: 'Telefonos'
        },
        {
            searchable: true,
            orderable: true,
            className: 'spacer',
            defaultContent: ""
        }
    ]
    let extra = {
        serverSide: false,
        order: [[1, "desc"]],
        createdRow: function (row, data, dataIndex) {
            $(row).data("item", data)
        },
        drawCallback: () => {
            initMasks('table')
        },
    }
    $("#usuarios-table").dataTable(generateDataTableFilterNoUser(columns, extra, `${urlbase}api/MantenimientoUsuarios/ObtenerPersonalUsuariosFull`, NoUsuario))
}

$("#btnBuscar").click(function () {
    cargartabla()
})

$("#usuarios-nouser").click(function () {
    fnCargaInicialNoUsuarios()
})
$("#usuarios-todos").click(function () {
    fnCargaInicialTodosUsuarios()
})
$("#usuarios-user").click(function () {
    fnCargaInicialUsuarios()
})

$("#btnAgregarEmpleado").click(function () {
    irNuevoEmpleado()
})



function irNuevoEmpleado() {
    //let AnioProyecto = $('#cmbproyectosempresa').val();
    //let QueryString = "?AnioProyecto=" + AnioProyecto

    window.location = "../Usuarios/AgregarEmpleado.aspx";
}
function irEditarEmpleado(UsuarioID) {
    let QueryString = "?name=" + UsuarioID
    window.location = "../Usuarios/AgregarEmpleado.aspx" + QueryString;
}

function irEliminarEmpleado(UsuarioID) {
    let QueryString = "?usuario=" + UsuarioID
    window.location = "../Usuarios/frmMnttoEliminarUsuario.aspx" + QueryString;
}
function irCrearUsuario(UsuarioID) {
    let QueryString = "?usuario=" + UsuarioID
    window.location = "../Usuarios/CrearUsuario.aspx" + QueryString;
}
function irAsignacionPermisos(UsuarioID) {
    let QueryString = "?usuario=" + UsuarioID
    window.location = "../Usuarios/frmMnttoAsignacionPermisos.aspx" + QueryString;
}
function fnModalResetClave(UsuarioID) {
    $("#usuario-password").val(UsuarioID);
    $('#exampleModal').modal('show');
}

$("#btnGuardarNuevaClave").click(() => {
    if (Page_ClientValidate('valusuario')) {
        $.ajax({
            url: `frmMnttoUsuarios.aspx/NuevaPassword`,
            type: "POST",
            data: JSON.stringify({
                username: $("#usuario-password").val(),
                password: $("#clave-password").val()
            }),
            headers: { "Content-Type": "application/json" },
            success: (message) => {
                if (message.d == "ok") {

                    Swal.fire("Éxito", "Informacion Actualizada", "success").then(function () { $("#clave-password").val(""); $("#usuario-password").val(); $("#exampleModal").modal('hide'); fnCargaInicial(); });
                } else {
                    Swal.fire("Error", message.d, "error");
                    $("#clave-password").val("");
                }
            },
            error: (e) => {
                var message = e.responseJSON.Message || "Error Información inorrecta.";
                Swal.fire({ icon: 'error', title: "Error", text: message });
            }
        });
    }
});

