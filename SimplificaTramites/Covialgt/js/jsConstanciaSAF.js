var vPlan = null;
var vPrograma = null;
var vProyecto = null;
var vRoles;
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    vPlan = urlParams.get('plan');
    vProyecto = urlParams.get('proyecto');
    vPrograma = urlParams.get('proyecto') == null ? null : vProyecto.substring(0, vProyecto.indexOf("-"))
    $("#btnRegresarRegistroDatos").css('display', 'none');
   
   
   
})

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
$("#ProyectoList").on("change.select2", ({ currentTarget }) => {})



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
$("#btnReporteDetalle").on("click", () => {
    let plan = $("#PlanAnualList").val()
    let proyecto = $("#ProyectoList").val()
    let Constancia = $("#Constancia").val()
    $.ajax({
        url: `${urlbase}api/ConstanciaSAF/GeneracionHistorialSAF/${plan}/${proyecto}/0/${user}/${Constancia}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            if (val.length == 0) {

                $.ajax({
                    url: `${urlbase}api/ConstanciaSAF/GeneracionHistorialSAF/${plan}/${proyecto}/1/${user}/${Constancia}`,
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                    success: (val) => {
                        let message = "Constancia Agregada"
                        swal.fire(message, "", "success")
                        opendialog("/visorinformesSti.aspx?reporteID=9901&AnioID=" + plan + "&ProyectoCodigo=" + proyecto + "&NoSAF="+Constancia);

                    }
                    }
                    )
            }
            else {
                if (val[0].NumeroConstancia) {
                    Swal.fire("", "Ya existe la contancia " + val[0].NumeroConstancia + " para este proyecto" + " ", "error");
                    opendialog("/visorinformesSti.aspx?reporteID=9901&AnioID=" + plan + "&ProyectoCodigo=" + proyecto + "&NoSAF=" + Constancia);

                }
                else { Swal.fire("", val + " ", "error");}
                
                
            }
        }
    })
   })
$("#btnReporteResumen").on("click", () => {
    let plan = $("#PlanAnualList").val()
    let proyecto = $("#ProyectoList").val()
    let Constancia = $("#Constancia").val()
    $.ajax({
        url: `${urlbase}api/ConstanciaSAF/GeneracionHistorialSAF/${plan}/${proyecto}/0/${user}/${Constancia}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            if (val.length == 0) {
                $.ajax({
                    url: `${urlbase}api/ConstanciaSAF/GeneracionHistorialSAF/${plan}/${proyecto}/1/${user}/${Constancia}`,
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                    success: (val) => {
                        opendialog("/visorinformesSti.aspx?reporteID=9910&AnioID=" + plan + "&ProyectoCodigo=" + proyecto + "&NoSAF=" + Constancia);

                    }
                }
                )
            }
            else {
                if (val[0].NumeroConstancia) {
                    Swal.fire("", "Ya existe la contancia " + val[0].NumeroConstancia + " para este proyecto" + " ", "error");
                    opendialog("/visorinformesSti.aspx?reporteID=9910&AnioID=" + plan + "&ProyectoCodigo=" + proyecto + "&NoSAF=" + Constancia);

                }
                else { Swal.fire("", val + " ", "error"); }
            }
        }
    })
})
function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Reporte de cantidades asignadas por tramo",
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
