//const { sweetAlert } = require("../Scripts/sweetalert2/dist/sweetalert2.all");

var vPlan = 0;
var vPrecalificado = 0;
var vEspecialidades = 0;
var Empresanit="";
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
    let plan = currentTarget.value
    $('#cmbPrecalificado').find("option").remove()
    $.ajax({
        url: `${urlbase}api/MaestroEmpresas/ObtenerListadoRegistrosEspecialildades`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#cmbPrecalificado').append(val.map((val) => new Option(val.RegistroNombre, val.RegistroCodigo))).trigger("change")
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
    url: `${urlbase}api/MaestroEmpresas/ObtenerListadoRegistrosEspecialildades`,
    success: (val) => {
        let options = val.map((val) => new Option(val.RegistroNombre, val.RegistroCodigo))
        $('#cmbPrecalificado').append(options).trigger("change")
    },

    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})

$("#cmbPrecalificado").on("change.select2", ({ currentTarget }) => {
    let precalificado = $("#cmbPrecalificado").val()
    $('#cmbEspecialidades').find("option").remove()
    $.ajax({
        url: `${urlbase}api/MaestroEmpresas/ObtenerListadoEspecialildades/${precalificado}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#cmbEspecialidades').append(val.map((val) => new Option(val.EspecialidadNombre, val.EspecialidadID))).trigger("change")
        }
    })
})

// Insertar datos con el boton GUARDAR
$("#btnGuardar").on("click", () => {
    let data = {
        "EspecialidadCodigo": $("#cmbEspecialidades").val(),
        "EmpresaNIT": Empresanit,
        "AnioID": $("#PlanAnualList").val(),
        "RegistroCodigo": $("#cmbPrecalificado").val(),
        "UserName": usuario
    };

    $.ajax({
        url: `${urlbase}/api/MaestroEmpresas/InsertarEspecialidadEmpresa`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "Especialidad insertada con exito"
            swal.fire(message, "", "success")
            //window.location.href = window.location.origin + baseSitio + "/Ejecucion/frmRegesp" +"?"+ "EmpresaNIT="+ Empresanit 
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "Especialidad creada correctamente", "success");
            fnCargarEspecialidadesXEmpresa($('#cmbPrecalificado')[0])
        },
        error: function (response) {
            //swal.fire(response.responseJSON.message, response.responseJSON.detail, "error");
            Swal.fire("Error", "Ya hay una Especialidad para esa Opción en ese Año.", "error")
            return false
        }
    });
});


$("#cmbPrecalificado").on("change.select2", ({ currentTarget }) => fnCargarEspecialidadesXEmpresa(currentTarget))
function fnCargarEspecialidadesXEmpresa(currentTarget) {
   // $('#btnGestionDeSanciones').prop('disabled', false)
    if (!currentTarget.selectedOptions[0]) return
    let plan = $("#PlanAnualList").val();
    var Nit = Empresanit;
    var precalificado = currentTarget.value;
    $("#componentes-tbody").html(null)
    $.ajax({
        url: `${urlbase}api/MaestroEmpresas/ObtenerListadoEspecialildadesEmpresaXEmpresa/${Nit}/${plan}/${precalificado}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let cols = val.map((item) => `<tr>
                        <td class="spacer"></td>
                        <td><button type="button" class="action-icon hover-red btn btn-light del" data-toggle="popover" data-trigger="hover"
                            data-content="Eliminar" data-placement="top" style="cursor:pointer" onclick="fnEliminarEspecialidadesXEmpresa('${item.EspecialidadCodigo}', '${item.EmpresaNIT}', '${item.AnioID}', '${item.RegistroCodigo}')">
                        <i class="fas fa-trash fa-lg fa-fw"></i></td>
                        <td>${item.EspecialidadCodigo}</td>
                        <td>${item.Especialidad}</td>
                        <td class="spacer"></td>
                    </tr>`)
            $("#componentes-tbody").html(cols.join(""))
        }
    })
}
function fnEliminarEspecialidadesXEmpresa(EspecialidadCodigo, EmpresaNIT, AnioID, RegistroCodigo) {
    Swal.fire({
        title: "Favor confirmar",
        text: "¿Desea eliminar la especialidad?",
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    })
        .then((result) => {
            if (result.isConfirmed) {
                $.LoadingOverlay("show")
                $.ajax({
                    url: `${urlbase}api/MaestroEmpresas/EliminarEspecialidadEmpresa`,
                    method: "post",
                    data: JSON.stringify({
                        "EspecialidadCodigo": EspecialidadCodigo,
                        "EmpresaNIT": EmpresaNIT,
                        "AnioID": AnioID,
                        "RegistroCodigo": RegistroCodigo,
                    }),
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"
                    },
                    success: (val) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("Éxito", "Especialidad elimada correctamente", "success");
                        fnCargarEspecialidadesXEmpresa($('#cmbPrecalificado')[0])
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
    window.location.href = "../Empresas/frmMaestroDeEmpresas" ;
}