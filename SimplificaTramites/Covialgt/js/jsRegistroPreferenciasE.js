//const { sweetAlert } = require("../Scripts/sweetalert2/dist/sweetalert2.all");

var vPlan = 0;
var vPrecalificado = 0;
var vEspecialidades = 0;
var Empresanit = "";
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    Empresanit = urlParams.get('EmpresaNIT');
    fnObtenerDatos(Empresanit);

    if (Empresanit != "") {
        $("#btnGuardar").prop('disabled', false);
    } else {
        $("#btnGuardar").prop('disabled', true);
    }
})

function fnObtenerDatos(Empresanit) {
    $.ajax({
        url: `${urlbase}api/MaestroEmpresas/ObtenerUnaEmpresa/${Empresanit}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            Datos = val[0]
            $('#NomEmpre').html(Datos.Nombre)
            $('#NitEmpre').html(Datos.EmpresaNIT)
        }
    })
}

$("#PlanAnualList").on("change.select2", ({ currentTarget }) => {
    $('#cmbOpcion').find("option").remove()
    $.ajax({
        url: `${urlbase}api/MaestroEmpresas/ObtenerCatProyectosOpciones`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#cmbOpcion').append(val.map((val) => new Option(val.OpcionDesc, val.ProyectoOpcionID))).trigger("change")
            $('#cmbPrioridad').append(val.map((val) => new Option())).trigger("change")
        }
    })
})

$.ajax({
    url: `${urlbase}api/plananual/get`,
    success: (val) => {
        let options = val.map((val) => new Option(val.PlanAnualNombre, val.AnioID))
        $('#PlanAnualList').append(options).trigger("change")
        if (vPlan !== null) {
            $('#PlanAnualList').trigger("change")
        }
    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})

$("select").select2({ theme: "bootstrap" })
$.ajax({
    url: `${urlbase}api/MaestroEmpresas/ObtenerCatProyectosOpciones`,
    success: (val) => {
        let options = val.map((val) => new Option(val.OpcionDesc, val.ProyectoOpcionID))
        $('#cmbOpcion').append(options).trigger("change")
    },

    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})


// Insertar datos con el boton GUARDAR
$("#btnGuardar").on("click", () => {
    let data = {
        "EmpresaNIT": Empresanit,
        "AnioID": $("#PlanAnualList").val(),
        "ProyectoOpcionID": $("#cmbOpcion").val(),
        "Prioridad": $("#cmbPrioridad").val(),
        "UserName": usuario
    };

    $.ajax({
        url: `${urlbase}/api/MaestroEmpresas/InsertarEmpresasOpciones`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "Prioridad insertada con exito"
            swal.fire(message, "", "success")
            //window.location.href = window.location.origin + baseSitio + "/Ejecucion/frmRegesp" +"?"+ "EmpresaNIT="+ Empresanit 
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "Prioridad creada correctamente", "success");
            fnCargarPrioridades($('#PlanAnualList')[0])
        },
        error: function (response) {
            //swal.fire(response.responseJSON.message, response.responseJSON.detail, "error");
            Swal.fire("Error", "No se puede Agregar la Preferencia, ya que hay una Opción con esa Prioridad para ese año, o bien la Opción ya Existe con otra Prioridad.", "error")
            return false
        }
    });
});


$("#PlanAnualList").on("change.select2", ({ currentTarget }) => fnCargarPrioridades(currentTarget))
function fnCargarPrioridades(currentTarget) {
    // $('#btnGestionDeSanciones').prop('disabled', false)
    if (!currentTarget.selectedOptions[0]) return
    let plan = $("#PlanAnualList").val();
    var Nit = Empresanit;
    $("#componentes-tbody").html(null)
    $.ajax({
        url: `${urlbase}api/MaestroEmpresas/ObtenerEmpresaOpciones/${Nit}/${plan}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let cols = val.map((item) => `<tr>
                        <td class="spacer"></td>
                        <td><button type="button" class="action-icon hover-red btn btn-light del" data-toggle="popover" data-trigger="hover"
                            data-content="Eliminar" data-placement="top" style="cursor:pointer" onclick="fnEliminarPrioridades('${item.EmpresaNIT}', '${item.AnioID}', '${item.ProyectoOpcionID}', '${item.Prioridad}')">
                        <i class="fas fa-trash fa-lg fa-fw"></i></td>
                        <td>${item.Prioridad}</td>
                        <td>${item.Opcion}</td>
                        <td class="spacer"></td>
                    </tr>`)
            $("#componentes-tbody").html(cols.join(""))
        }
    })
}
function fnEliminarPrioridades( EmpresaNIT, AnioID, ProyectoOpcionID, Prioridad) {
    Swal.fire({
        title: "Favor confirmar",
        text: "¿Desea eliminar la prioridad?",
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    })
        .then((result) => {
            if (result.isConfirmed) {
                $.LoadingOverlay("show")
                $.ajax({
                    url: `${urlbase}api/MaestroEmpresas/EliminarEmpresasOpciones`,
                    method: "post",
                    data: JSON.stringify({
                        "EmpresaNIT": EmpresaNIT,
                        "AnioID": AnioID,
                        "ProyectoOpcionID": ProyectoOpcionID,
                        "Prioridad": Prioridad,
                    }),
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"
                    },
                    success: (val) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("Éxito", "Prioridad elimada correctamente", "success");
                        fnCargarPrioridades($('#PlanAnualList')[0])
                    },
                    error: (error) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("", error.message + " ", "error");
                    }
                })
            }
        });
}
$("#btnRegresarMaestroEmpresa").click(function () {
    btnRegresarMaestroEmpresa()
})

function btnRegresarMaestroEmpresa() {
    //let QueryString = "?AnioID=" + vPlans
    //if (proyecto2.length > 0) {
    //    QueryString = QueryString + "&proyecto=" + proyecto2
    //}
    window.location.href = "../Empresas/frmMaestroDeEmpresas";
}