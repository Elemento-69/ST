$("select").select2({ theme: "bootstrap" })
$(document).ready(function () {
    $("#fechainiciocontractual").val('');
    $("#fechafincontractual").val('');
    $("#fechainicio").val('');
    $("#fechafin").val('');

})

$('#SelectPlanAnual').find("option").remove()
$.ajax({
    url: `${urlbase}api/PlanesAnuales/ObtenerPlanesAnuales`,
    success: (val) => {
        let options = val.map((val) => new Option(val.PlanAnualNombre, val.AnioID))
        $('#SelectPlanAnual').append(options).trigger("change")
    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})

$("#SelectPlanAnual").on("change.select2", ({ currentTarget }) => {
    let Plan = $("#SelectPlanAnual").val();
    $('#SelectPrograma').find("option").remove()
    $.ajax({
        url: `${urlbase}api/InformesTecnicos/ObtenerListaProgramasXPlan/${Plan}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#SelectPrograma').append(val.map((val) => new Option(val.ProgramaNombre, val.ProgramaCodigo))).trigger("change")
        }
    })
})

$("#SelectPrograma").on("change.select2", ({ currentTarget }) => {
    $('#SelectProyecto').find("option").remove()
    $.ajax({
        url: `${urlbase}api/InformesTecnicos/CargarProyectosPorPrograma/${$("#SelectPlanAnual").val()}/${$("#SelectPrograma").val()}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#SelectProyecto').append(val.map((val) => new Option(val.ProyectoDescripcion, val.AnioCodigoProyecto))).trigger("change")
        }
    })
})

$("#SelectProyecto").on("change.select2", ({ currentTarget }) => {
    let [anio, proyecto] = currentTarget.value.split(',')
    console.log(anio);
    console.log(proyecto);
    $.ajax({
        url: `${urlbase}api/CuadrosDescriptivos/ObtenerProyectoFechas/${anio}/${proyecto}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            Datos = val[0]

            FechaIn = Datos.FechaInicio;
            var date = new Date(FechaIn);
            var stringDate = moment(date).format(moment.HTML5_FMT.DATE);

            FechaFin = Datos.FechaFinal;
            var date2 = new Date(FechaFin);
            var stringDate2 = moment(date2).format(moment.HTML5_FMT.DATE);

            $("#fechainiciocontractual").val(stringDate);
            $("#fechafincontractual").val(stringDate2);
            $("#fechainicio").val(stringDate);
            $("#fechafin").val(stringDate2);
        }
    })
})


$('#customRadio1').on("click", () => {
    document.getElementById("fechainicio").disabled = false;
    document.getElementById("fechafin").disabled = false;
})
$('#customRadio2').on("click", () => {
    document.getElementById("fechainicio").disabled = true;
    document.getElementById("fechafin").disabled = true;
})

$('#customRadio3').on("click", () => {
    document.getElementById("fechainicio").disabled = true;
    document.getElementById("fechafin").disabled = true;
})

$('#customRadio4').on("click", () => {
    document.getElementById("fechainicio").disabled = true;
    document.getElementById("fechafin").disabled = true;
})

$('#customRadio5').on("click", () => {
    document.getElementById("fechainicio").disabled = false;
    document.getElementById("fechafin").disabled = false;
})

function ChangeFormateDate(oldDate) {
    return oldDate.toString().split("-").reverse().join("/");
}

$("#btnGenerarCuadro").on("click", () => {
    let AnioID = $("#SelectPlanAnual").val();
    let ProyectoCodigo = $("#SelectProyecto").val();
    let FechaInicio = $("#fechainicio").val();
    let FechaFinal = $("#fechafin").val();

    let Fecha1 = ChangeFormateDate(FechaInicio);
    let Fecha2 = ChangeFormateDate(FechaFinal);

    let [anio, proyecto] = ProyectoCodigo.split(',')

    if ($('#customRadio1').is(':checked')) { opendialog("/visorinformesSti.aspx?ReporteID=130331&ANIOID=" + AnioID + "&PROYECTO=" + proyecto + "&fechaini=" + Fecha1 + "&fechafin=" + Fecha2); }
    if ($('#customRadio2').is(':checked')) { opendialog("/visorinformesSti.aspx?ReporteID=14&ANIOID=" + AnioID + "&PROYECTO=" + proyecto); }
    if ($('#customRadio3').is(':checked')) { opendialog("/visorinformesSti.aspx?ReporteID=15&ANIOID=" + AnioID + "&PROYECTO=" + proyecto); }
    if ($('#customRadio4').is(':checked')) { opendialog("/visorinformesSti.aspx?ReporteID=16&ANIOID=" + AnioID + "&PROYECTO=" + proyecto); }
    if ($('#customRadio5').is(':checked')) { opendialog("/visorinformesSti.aspx?ReporteID=170331&ANIOID=" + AnioID + "&PROYECTO=" + proyecto + "&fechaini=" + Fecha1 + "&fechafin=" + Fecha2); }
})


function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Resumen de Pagos y Financiamientos",
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

