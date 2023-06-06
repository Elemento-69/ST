
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById("chkAprob").checked=false;
    document.getElementById("chkBlock").checked = false;
    document.getElementById("usuario-password").value = "";
    document.getElementById("txtUsusuario").value = "";
    })

function fnCargaInicial(Parametro, Seleccionar, Anio) {

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
                       data-content="Seleccionar" data-placement="top" onclick="ConsultarUser('${row.AnioID}', '${row.ProyectoCodigo}');" style="cursor:pointer" data-dismiss="modal"  title="Crear nueva cuenta">
                        <i class="fas fa-eye fa-sm fa-fw"></i>
                    </button>
                     `
            }
        },

        {
            className: 'text-center', 
            title: "Año",
            data: 'AnioID'
        },
        {
            className: 'text-center',
            title: "Codigo Proyecto",
            data: 'ProyectoCodigo'
        },
        {
            className: 'text-center',
            title: "Descripción",
            data: 'ProyectoDescripcion'
        },
        {
            className: 'text-center',
            title: "NIT",
            data: 'EmpresaNIT'
        },
        {
            className: 'text-center',
            title: "Nombre",
            data: 'Nombre'
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
    $("#proyectosUsuario-table").dataTable(generateDataTable(columns, extra, `${urlbase}api/AgregarUsuarioProy/ObtenerProyectosUsuarios/${Parametro}/${Seleccionar}/${Anio}`))
}
function ConsultarUser(AnioID, ProyectoCodigo) {
    $("#txtAnio").val(AnioID);
    $("#txtProy").val(ProyectoCodigo);
    usuario = AnioID + ProyectoCodigo;
    if (Page_ClientValidate('valusuario')) {
        $.ajax({
            url: `frmAgregarUsuario.aspx/ConsultUser`,
            type: "POST",
            data: JSON.stringify({
                username: usuario

            }),
            headers: { "Content-Type": "application/json" },
            success: (message) => {
                console.log(message.d);
                    ConsultarUserIsApproved(usuario);
                    ConsultarUserIsLockedOut(usuario);
                    document.getElementById("imgresetclave").style.display = "block";

                    document.getElementById("chkAprob").disabled = false;
                    document.getElementById("chkBlock").disabled = true;
                  


                //} else {
                        //Swal.fire({ icon: 'error', title: "Error, el campo del proyecto Usuariobd no esta actualizado" }).then(function () {
                        //document.getElementById("txtUsusuario").value = "";
                        //document.getElementById("chkAprob").checked = false;
                        //document.getElementById("chkBlock").checked = false;
                        //document.getElementById("chkAprob").disabled = true;
                        //document.getElementById("chkBlock").disabled = true;
                        //document.getElementById("imgresetclave").disabled = true;
                        //document.getElementById("btnGuardarUsuario").disabled = true;

                    //});

                $("#txtUsusuario").val(usuario);
                
            },
            error: (e) => {
                var message = e.responseJSON.Message || "Error Información inorrecta.";
                Swal.fire({ icon: 'error', title: "Error", text: message });
            }
        });
    }
}
function fnLlenarCampos(AnioID, ProyectoCodigo) {
    $("#txtAnio").val(AnioID);
    $("#txtProy").val(ProyectoCodigo);
    usuario = AnioID + ProyectoCodigo;
    //ConsultarUser(usuario);
    
    $.ajax({
        url: `${urlbase}api/AgregarUsuarioProy/ObtenerProyectosPrograma/${AnioID}/${ProyectoCodigo}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            Datos = val[0]
            Cuenta = Datos.Cuenta;
            if (Cuenta == 0) {
                $("#contrtatista").prop("checked", true);
            } else {
                $("#contrtatista").prop("checked", false);
            }
            if (Cuenta == 1) {
                $("#supervisor").prop("checked", true);
            } else {
                $("#supervisor").prop("checked", false);
            }
            Usuario = AnioID + ProyectoCodigo
            $("#txtUsusuario").val(Usuario);
            //quitarchek();
        }
    })
}
function quitarchek() {
    let usuariolleno = $("#txtUsusuario").val();
    if (usuariolleno=='') {
        document.getElementById("chkAprob").checked = false;
        document.getElementById("chkBlock").checked = false;
    }
}
$('#Selectplan').find("option").remove()
    $.ajax({
        url: `${urlbase}api/PlanesAnuales/ObtenerPlanesAnuales`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#Selectplan').append(val.map((val) => new Option(val.PlanAnualNombre, val.AnioID))).trigger("change")
            document.getElementById("chkAprob").checked = false;
            document.getElementById("chkBlock").checked = false;
        }
    })

$("#btnBuscar").click(function () {
    cargartabla()
})

function cargartabla() {
    let Parametro = $("#txtParametro").val();
    if (Parametro === '') {
        Parametro = 0
    } else {
        Parametro
    }
    if ($("#usuarios-todos").is(":checked")) {
        Seleccionar = 1
        document.getElementById("imgresetclave").style.display = "none";
        document.getElementById("LabelchkAprob").style.display = "none";
        document.getElementById("LabelchkBlock").style.display = "none";
        document.getElementById("chkAprob").style.display = "none";
        document.getElementById("chkBlock").style.display = "none";
        document.getElementById("btnGuardarUsuario").disabled = false;
        $("#txtUsusuario").val("");
        document.getElementById("EstadoBloqUsuario").style.display = "none";
    }
    if ($("#usuarios-user").is(":checked")) {
        Seleccionar = 2
        
        document.getElementById("LabelchkAprob").style.display = "block";
        document.getElementById("LabelchkBlock").style.display = "block";
        document.getElementById("chkAprob").style.display = "block";
        document.getElementById("chkBlock").style.display = "block";
        document.getElementById("btnGuardarUsuario").disabled = true;
        $("#txtUsusuario").val("");
        document.getElementById("EstadoBloqUsuario").style.display = "block";
        document.getElementById("chkAprob").checked = false;
        document.getElementById("chkBlock").checked = false;
        $("#EstadoBloqUsuario").html("")
    }
    if ($("#usuarios-nouser").is(":checked")) {
        Seleccionar = 3
        document.getElementById("imgresetclave").style.display = "none";
        document.getElementById("LabelchkAprob").style.display = "none";
        document.getElementById("LabelchkBlock").style.display = "none";
        document.getElementById("chkAprob").style.display = "none";
        document.getElementById("chkBlock").style.display = "none";
        document.getElementById("btnGuardarUsuario").disabled = false;
        $("#txtUsusuario").val("");
        document.getElementById("EstadoBloqUsuario").style.display = "none";
    }
    let Anio = $("#Selectplan").val();
    fnCargaInicial(Parametro, Seleccionar, Anio);
}

$("#btnGuardarUsuario").click(() => {
    if (Page_ClientValidate('valusuario')) {
        $.ajax({
            url: `frmAgregarUsuario.aspx/Save`,
            type: "POST",
            data: JSON.stringify({
                username: $("#txtUsusuario").val(),
                password: $("#txtUsusuario").val()
            }),
            headers: { "Content-Type": "application/json" },
            success: (message) => {
                if (message.d == "ok") {
                    //UpdateEmpleado(row.UsuarioID);
                    Swal.fire("Éxito", "El usuario fue creado", "success").then(function () { $("#txtUsusuario").val(""); cambiarstatus(); cargartabla();});
                } else {
                 
                    Swal.fire("Error", message.d, "error");
                    $("#txtUsusuario").val("");
                }
            },
            error: (e) => {
                var message = e.responseJSON.Message || "Error al guardar el usuario.";
                Swal.fire({ icon: 'error', title: "Error", text: message });
            }
        });
    }
});

function cambiarstatus() {
    let data = {
        "Proyecto": $("#txtProy").val(),
        "AnioID": $("#txtAnio").val(),
        "userstatus": true,
        "UserName": usuario
    };
    $.ajax({
        url: `${urlbase}api/AgregarUsuarioProy/ActualizarProyectoUsuario`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "El estado se cambio con exito"
            console.log(message);
        },
        error: function (response) {
            Swal.fire("Error", "No se cambio el estado.", "error")
            return false
        }
    });
}

function cargarUsuario() {
    Proye = $("#txtProy").val();
    Anioproy = $("#txtAnio").val();
    user = Anioproy + Proye;
    $("#usuario-password").val(user);
}

$("#btnGuardarNuevaClave").click(() => {
    if (Page_ClientValidate('valusuario')) {
        $.ajax({
            url: `frmAgregarUsuario.aspx/NuevaPassword`,
            type: "POST",
            data: JSON.stringify({
                username: $("#usuario-password").val(),
                password: $("#clave-password").val()
            }),
            headers: { "Content-Type": "application/json" },
            success: (message) => {
                if (message.d == "ok") {
                    
                    Swal.fire("Éxito", "Informacion Actualizada", "success").then(function () { $("#clave-password").val(""); $("#usuario-password").val(); $("#exampleModal").modal('hide'); cambiarstatus(); cargartabla(); });
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

function ConsultarUserIsApproved(usuario) {
    if (Page_ClientValidate('valusuario')) {
        $.ajax({
            url: `frmAgregarUsuario.aspx/ConsultUseriS`,
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
            url: `frmAgregarUsuario.aspx/ConsultUseriSLocked`,
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
                    mostrarmensaje(User, Anioid, Proyecto);
                    
                } else {
                    $("chkBlock").prop("checked", false);
                    document.getElementById("chkBlock").disabled = true;
                    mostrarmensaje(User, Anioid, Proyecto);
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
function mostrarmensaje(User, Anioid, Proyecto) {
    $.ajax({
        url: `${urlbase}api/AgregarUsuarioProy/BloquearUsuario/${User}/${Anioid}/${Proyecto}/1`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            console.log(val[0]);
            if (val[0] !== undefined) {
                Datos = val[0]
                Estados = Datos.Estado;
                console.log(Estados);
                $("#EstadoBloqUsuario").html("Proyecto: " + Estados)
            } else {
                $("#EstadoBloqUsuario").html("Proyecto sin estado")
            }
        },
        error: (e) => {
            var message = e.responseJSON.Message || "No se obtuvieron los datos del usuario.";
            Swal.fire({ icon: 'error', title: "El proyecto no tiene estado", text: message });
        }
    });
}

$("#chkAprob").click(() => {
    Proye = $("#txtProy").val();
    Anioproy = $("#txtAnio").val();
    user = Anioproy + Proye;
    UsuarioIsApproved(user);
});
$("#chkBlock").click(() => {
    Proye = $("#txtProy").val();
    Anioproy = $("#txtAnio").val();
    user = Anioproy + Proye;
    UsuarioIsLockedOut(user);
});
function UsuarioIsLockedOut(usuario) {
    let check = document.getElementById("chkBlock").checked;
    $.ajax({
        url: `frmAgregarUsuario.aspx/IsLockedOut`,
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
        url: `frmAgregarUsuario.aspx/IsApproved`,
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
    