var vPlan = null;
var vPrograma = null;
var vProyecto = null;
var vRolesUsuario;
var vVerificarRol;
var vNitEmpresa = null;

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    vPlan = urlParams.get('plan');
    vProyecto = urlParams.get('proyecto');
    vPrograma = urlParams.get('proyecto') == null ? null : vProyecto.substring(0, vProyecto.indexOf("-"))
    vVieneDeRegistro = urlParams.get('VieneRegistro');
    vNitEmpresa = urlParams.get('EmpresaNIT');

    fnObtenerRoles();

    

    $("#btnRegresarRegistroDatos").click(function () {
        if (vVieneDeRegistro == 3) {
            window.location.href = "../Empresas/frmMaestroDeEmpresas";
        }
        else {
            var planAnual = ($("#PlanAnualList").val() == undefined) ? user.substring(0, 4) : $("#PlanAnualList").val()
            var Programa = ($('#ProgramaList').val() == undefined) ? $('#ProyectoListSup').val().split("-")[0].toString() : $('#ProgramaList').val();
            var Proyecto = ($('#ProyectoList').val() == undefined) ? $('#ProyectoListSup').val().substring(4, 20) : $('#ProyectoList').val()
            let QueryString = "?Plan=" + planAnual + "&Programa=" + Programa + "&Proyecto=" + Proyecto
            window.location.href = "RegistroDatos.aspx" + QueryString;
        }
       
    })
    $("#btnGestionDeSanciones").click(function () {
        var planAnual = ($("#PlanAnualList").val() ==undefined) ? user.substring(0, 4) : $("#PlanAnualList").val()
        var Programa = ($('#ProgramaList').val() == undefined) ? $('#ProyectoListSup').val().substring(4, 20).split("-")[0] : $('#ProgramaList').val();
        var Proyecto = ($('#ProyectoList').val() == undefined) ? $('#ProyectoListSup').val().substring(4, 20) : $('#ProyectoList').val()
        let QueryString = "?Plan=" + planAnual + "&Programa=" + Programa + "&Proyecto=" + Proyecto + "&VieneRegistro=" + vVieneDeRegistro
        if (vVieneDeRegistro > 0){
            QueryString = QueryString + "&proyecto2=" + vProyecto
        }
     
        window.location.href = "GestionDeSanciones.aspx" + QueryString;
    })
})

function fnObtenerRoles() {
    $.ajax({
        type: "POST",
        url: "ConsultaDeSanciones.aspx/fObtenerRoles",
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var vRespuestaJSON = JSON.parse(data.d);
            if (vRespuestaJSON.dioError == true) {
                $.LoadingOverlay("hide");
                Swal.fire("", vRespuestaJSON.descripcionMensaje, "error");
            }
            else {
                vRolesUsuario = vRespuestaJSON.datoDevueltoString.split(',')
                vVerificarRol = vRolesUsuario.includes('SUPERVISOR') || vRolesUsuario.includes('SUPERVISOR CONSULTA') || vRolesUsuario.includes('ADMINISTRADORES') || vRolesUsuario.includes('REGIONALES')

                if ((vVieneDeRegistro !== "1") && (vVieneDeRegistro !== "3")){
                    $("#btnRegresarRegistroDatos").css('display', 'none');
                   
                }

                if (!vVerificarRol) {
                    $("#btnGestionDeSanciones").css('display', 'none');
                }
                if ((vVieneDeRegistro == 3) && (vNitEmpresa !== null)) {
                    $("#divProjectSup").css('display', 'none');
                    $("#divProgram").css('display', 'none');
                    $("#divProject").css('display', 'none');
                    $("#divPlan").css('display', 'none');
                    fnCargarGridSancionesEmpresa()
                }
            }
        },
        failure: function (response) {
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}

function fnCargarGridSancionesEmpresa() {
    $("#componentes-tbody").html(null)
    $.ajax({
        url: `${urlbase}api/Sanciones/ObtenerProyectoSancionesXEmpresa/${vNitEmpresa}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let cols = val.map((item) => `<tr>
                        <td class="spacer"></td>
                        <td><button type="button" class="action-icon hover-red btn btn-light del" data-toggle="popover" data-trigger="hover"
                            data-content="Eliminar" data-placement="top" style="cursor:pointer" onclick="fnEliminarSancion('${item.ProyectoCodigo}', ${item.AnioID}, ${item.ProyectoSancionCorrel})" ${(!vVerificarRol) ? 'disabled' : ''}>
                        <i class="fas fa-trash fa-lg fa-fw"></i></td>
                        
                        <td>${item.ProyectoSancionCorrel}</td>
                        <td>${item.SancionCodigo}</td>
                        <td>${item.ResponsabilidadDesc}</td>
                        <td>${item.RecurrenciaDesc}</td>
                        <td>${item.Justificacion}</td>
                        <td class="frcurrency-mask">${currency(item.SancionMonto, 'Q.')}</td>
                        <td>${formatDateNew(item.FechaSancion)}</td>
                        <td class="spacer"></td>
                    </tr>`)
            $("#componentes-tbody").html(cols.join(""))
        }
    })
}
$("select").select2({ theme: "bootstrap" })
$.ajax({
    url: `${urlbase}api/plananual/get`,
    success: (val) => {
        let options = val.map((val) => new Option(val.PlanAnualNombre, val.AnioID))
        $('#PlanAnualList').append(options).trigger("change")
        if (vPlan !== null) {
            $('#PlanAnualList').val(vPlan);
            $('#PlanAnualList').trigger("change")
        }
    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})

$("#PlanAnualList").on("change.select2", ({ currentTarget }) => {
    let plan = currentTarget.value
    $('#ProgramaList').find("option").remove()
    $.ajax({
        url: `${urlbase}api/Programa/Get/${plan}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#ProgramaList').append(val.map((val) => new Option(val.ProgramaNombre, val.ProgramaCodigo))).trigger("change")
            if (vPrograma !== null)  {
                $('#ProgramaList').val(vPrograma);
                $('#ProgramaList').trigger("change")
            }

        }
    })
})

$("#ProgramaList").on("change.select2", ({ currentTarget }) => {
    let program = currentTarget.value
    let plan = $("#PlanAnualList").val()
    $('#ProyectoList').find("option").remove()
    $.ajax({
        url: `${urlbase}api/Proyecto/GetListadoXPrograma/${plan}/${program}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#ProyectoList').append(val.map((val) => new Option(val.ProyectoDescripcion, val.ProyectoCodigo))).trigger("change")
            if (vProyecto !== null) {
                $('#ProyectoList').val(vProyecto);
                $('#ProyectoList').trigger("change")
            }

        }
    })
})
function fnEliminarSancion(ProyectoCodigo, AnioID, ProyectoSancionCorrel) {
    Swal.fire({
        title: "Favor confirmar",
        text: "¿Desea eliminar la sanción?",
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    })
    .then((result) => {
        if (result.isConfirmed) {
            $.LoadingOverlay("show")
            $.ajax({
                url: `${urlbase}api/Sanciones/EliminarProyectoSancion`,
                method: "post",
                data: JSON.stringify({
                    "ProyectoCodigo": ProyectoCodigo,
                    "AnioID": AnioID,
                    "ProyectoSancionCorrel": ProyectoSancionCorrel,
                }),
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                success: (val) => {
                    $.LoadingOverlay("hide");
                    Swal.fire("Éxito", "Sanción elimada correctamente", "success").then((result) => {
                        fnCargarSanciones($('#ProyectoList')[0])
                    });
                   
                },
                error: (error) => {
                    $.LoadingOverlay("hide");
                    Swal.fire("", error.message + " ", "error");
                }
            })
        }
    });
}

function fnImprimirSancion(ProyectoCodigo, AnioID, ProyectoSancionCorrel) {
    opendialog("/visorinformes.aspx?IDReporte=50&Parameters=" + AnioID + "," + ProyectoCodigo + "," + ProyectoSancionCorrel); 
}

//$("#doc_cambio-table tbody").on("click", ".print-btn", ({ currentTarget }) => {
//    opendialog("/visorinformesSti.aspx?IDReporte=50&Parameters" + AnioID + "," + ProyectoCodigo + "," + ProyectoSancionCorrel); 

//})
function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Impresión de Sanciones",
            autoOpen: false,
            dialogClass: 'dialog_fixed,ui-widget-header',
            modal: true,
            height: 500,
            minWidth: $(window).width() * .70,
            minHeight: $(window).height() * .55,
            draggable: true
        });
    $dialog.dialog('open');
}
$("#ProyectoList").on("change.select2", ({ currentTarget }) => fnCargarSanciones(currentTarget))
function fnCargarSanciones(currentTarget) {
    $('#btnGestionDeSanciones').prop('disabled', false)
    if (!currentTarget.selectedOptions[0]) return
    let plan = $("#PlanAnualList").val()
    let proyect = currentTarget.value
    $("#componentes-tbody").html(null)
    $.ajax({
        url: `${urlbase}api/Sanciones/ObtenerProyectoSanciones/${proyect}/${plan}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let cols = val.map((item) => `<tr>
                        <td class="spacer"></td>
                        <td><button type="button" class="action-icon hover-red btn btn-light del" data-toggle="popover" data-trigger="hover"
                            data-content="Eliminar" data-placement="top" style="cursor:pointer" onclick="fnEliminarSancion('${item.ProyectoCodigo}', ${item.AnioID}, ${item.ProyectoSancionCorrel})" ${(!vVerificarRol) ?'disabled':''}>
                        <i class="fas fa-trash fa-lg fa-fw"></i>
                        <td><button type="button" class="action-icon hover-red btn btn-light print-btn" data-toggle="popover" data-trigger="hover"
                            data-content="Imprimir" data-placement="top" style="cursor:pointer" onclick="fnImprimirSancion('${item.ProyectoCodigo}', ${item.AnioID}, ${item.ProyectoSancionCorrel})" }>
                        <i class="fas fa-print fa-lg fa-fw"></i></td>
                       
                        <td>${item.ProyectoSancionCorrel}</td>
                        <td>${item.SancionCodigo}</td>
                        <td>${item.ResponsabilidadDesc}</td>
                        <td>${item.RecurrenciaDesc}</td>
                        <td>${item.Justificacion}</td>
                        <td class="frcurrency-mask">${currency(item.SancionMonto, 'Q.')}</td>
                        <td>${formatDateNew(item.FechaSancion)}</td>
                        <td class="spacer"></td>
                    </tr>`)
            $("#componentes-tbody").html(cols.join(""))
        }
    })
}
let User = user;
$.ajax({
    url: `${urlbase}api/Proyecto/GetListadoXSupervisor/${User.substring(0, 4)}/${User.substring(4, 20)}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        $('#ProyectoListSup').append(val.map((val) => new Option(val.ProyectoDescripcion, val.AnioID + val.ProyectoCodigo))).trigger("change")
    }
})

$("#ProyectoListSup").on("change.select2", ({ currentTarget }) => {
    
    let plan = currentTarget.value.substring(0, 4)
    let proyect = currentTarget.value.substring(4, 20)
    $("#componentes-tbody").html(null)
    $.ajax({
        url: `${urlbase}api/Sanciones/ObtenerProyectoSanciones/${proyect}/${plan}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let cols = val.map((item) => `<tr>
                        <td class="spacer"></td>
                        <td><button type="button" class="action-icon hover-red btn btn-light del" data-toggle="popover" data-trigger="hover"
                            data-content="Eliminar" data-placement="top" style="cursor:pointer" onclick="fnEliminarSancion('${item.ProyectoCodigo}', ${item.AnioID}, ${item.ProyectoSancionCorrel})"  ${(vVieneDeRegistro == 0) ? 'disabled' : ''}>
                        <i class="fas fa-trash fa-lg fa-fw"></i>
                        <button type="button" class="action-icon hover-red btn btn-light print-btn" data-toggle="popover" data-trigger="hover"
                            data-content="Imprimir" data-placement="top" style="cursor:pointer" onclick="fnImprimirSancion('${item.ProyectoCodigo}', ${item.AnioID}, ${item.ProyectoSancionCorrel})" }>
                        <i class="fas fa-print fa-lg fa-fw"></i></td>
                       
                        <td>${item.ProyectoSancionCorrel}</td>
                        <td>${item.SancionCodigo}</td>
                        <td>${item.ResponsabilidadDesc}</td>
                        <td>${item.RecurrenciaDesc}</td>
                        <td>${item.Justificacion}</td>
                        <td class="frcurrency-mask">${currency(item.SancionMonto, 'Q.')}</td>
                        <td>${formatDateNew(item.FechaSancion)}</td>
                        <td class="spacer"></td>
                    </tr>`)
            $("#componentes-tbody").html(cols.join(""))
        }
    })

})
function currency(numero, prefix='', sufix='') {
    return `${prefix}${numero.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}${sufix}`;
}
function formatDateNew(fecha) {
    if (!fecha)
        return '';
    var today = new Date(fecha);
    var dd = PadLeft(today.getDate());
    var mm = PadLeft(today.getMonth()+1);
    var yyyy = today.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
}
function PadLeft(value, length=2) {
    return (value.toString().length < length) ? PadLeft("0" + value, length) : value;
}

