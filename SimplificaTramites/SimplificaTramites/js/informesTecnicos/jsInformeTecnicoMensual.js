$("select").select2({ theme: "bootstrap" })
$(document).ready(function () {
    $('#selectPrograVersion').last().addClass('d-none')
    $('#selectDocCambioV').last().addClass('d-none')
    reloadVersionPage();
    $("#btnReportesGenerar").click(function () {

        var url = "FrmVisorReporte.aspx" + QueryString;
        window.open(url, '_blank', 'location=no,height=560,width=887,status=yes,titlebar=yes,scrollbars=yes');

    })
    document.getElementById('textNumero').disabled = true;

})






$.ajax({
    url: `${urlbase}api/PlanAnual/Get`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        val = val.map((item) => `<option value="${item.AnioID}">${item.PlanAnualNombre}</option>`)
        $("#PlanAnualList").append(val).trigger("change")
    }
})

$("#PlanAnualList").on("change.select2", function () {
    $("#ProgramaList").html(null)
    $.ajax({
        url: `${urlbase}api/InformesTecnicos/ObtenerListaProgramasXPlan/${this.value}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            val = val.map((item) => `<option value="${item.ProgramaCodigo}">${item.ProgramaNombre}</option>`)
            $("#ProgramaList").append(val).trigger("change")
        }
    })
   

})

$("#ProgramaList").on("change.select2", function () {

    var anio = $("#PlanAnualList").val();
    $("#ProyectoList").html(null);
    $.ajax({
        url: `${urlbase}api/InformesTecnicos/CargarProyectosPorPrograma/${$("#PlanAnualList").val()}/${this.value}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            val = val.map((item) => `<option value="${item.AnioCodigoProyecto}">${item.ProyectoDescripcion}</option>`)
            $("#ProyectoList").append(val).trigger("change")
            if ($('#customRadio7').is(':checked') && $("#ProyectoList").val() == null) {
                $("#customRadio7").prop("checked", false); 
                $('#selectPrograVersion').last().addClass('d-none')

            }
        }
    })

})

$("#ProyectoList").on("change.select2", function () {

    var anio = $("#PlanAnualList").val();
    var anioproyecto = $("#ProyectoList").val();
    if (anioproyecto != null) {
    var proyectoCodigo= anioproyecto.split(',')[1]
    AnioID = anio;
    Proyectocodigo = proyectoCodigo;
    $("#periodo").html(null);
    $.ajax({
        url: `${urlbase}api/InformesTecnicos/ObtenerListaXProyectosPeriodos/${$("#PlanAnualList").val()}/${proyectoCodigo}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            val = val.map((item) => `<option value="${item.PeriodoCorrel}">${item.Periodo}</option>`)
            $("#periodo").append(val).trigger("change")
        }
    })
        selectVersionProgra();   
    }
    
})

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

$("#ProyectoListSup").on("change.select2", function ({ currentTarget }) {

    var anio = $("#PlanAnualList").val();
    var anioproyecto = currentTarget.value.substring(0, 4)
    var proyectoCodigo = currentTarget.value.substring(4, 20)
 
    $("#periodo").html(null);
    $.ajax({
        url: `${urlbase}api/InformesTecnicos/ObtenerListaXProyectosPeriodos/${anioproyecto}/${proyectoCodigo}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            AnioID = anioproyecto
            Proyectocodigo = proyectoCodigo
            val = val.map((item) => `<option value="${item.PeriodoCorrel}">${item.Periodo}</option>`)
            $("#periodo").append(val).trigger("change")
        }
    })
})

$("#periodo").on("change.select2", function () {

    PeriodoCorrel = $("#periodo").val();
    selectDocumentoCambio();
})


var AnioID = 0;
var Proyectocodigo = '';
var PeriodoCorrel = 0;

$("#btnGenerar").on("click", () => {

    let version = $(".prograV").val();
    let numeroDocCambio = $(".prograC").val();
    let EstadoDoc = $("#selectLisDocCambioE").val();

    var texto = $("#textNumero").val();

    let fechaPeriodo = $(".sPeriodo :selected").text();
    let pFechaFiltroN = fechaPeriodo.split('- ')[1]

    
    let pFechaFiltro = pFechaFiltroN //'2020/10/31'

    //console.log("/visorinformesSti.aspx?reporteID=6900&AnioID=" + AnioID + "&ProyectoCodigo=" + Proyectocodigo + "&PeriodoCorr=" + PeriodoCorrel + "&PeriodoCorrImpresion=" + texto + "&pFechaFiltro=" + pFechaFiltro + "&pProgramaVersionID=" + version)



    if (PeriodoCorrel == null)
    {
        Swal.fire("error", "No ha seleccionado un período para imprimir ", "error");
    } else if (Proyectocodigo == null)
    {
        Swal.fire("error", "No ha seleccionado un proyecto para imprimir ", "error");
    }  

     else
    {

        if ($('#customRadio').is(':checked')) {
            opendialog(`/VisorInformessti?ReporteID=${3331}&AnioID=${AnioID}&ProyectoCodigo=${Proyectocodigo}&PeriodoCorrel=${PeriodoCorrel}`);
            //opendialog("/visorinformes.aspx?Idreporte=1&Parameters=" + AnioID + "," + Proyectocodigo + "," + PeriodoCorrel);
            console.log("/visorinformes.aspx?Idreporte=1&Parameters=" + AnioID + "," + Proyectocodigo + "," + PeriodoCorrel);
        }
        if ($('#customRadio3').is(':checked')) {
            //opendialog("/visorinformes.aspx?Idreporte=2&Parameters=" + AnioID + "," + Proyectocodigo + "," + PeriodoCorrel);
            opendialog(`/VisorInformessti?ReporteID=${3332}&AnioID=${AnioID}&ProyectoCodigo=${Proyectocodigo}&PeriodoCorrel=${PeriodoCorrel}`);
        }
        if ($('#customRadio5').is(':checked')) {
            //opendialog("/visorinformes.aspx?Idreporte=3&Parameters=" + AnioID + "," + Proyectocodigo + "," + PeriodoCorrel);
            //opendialog(`/VisorInformessti?ReporteID=${3333}&AnioID=${AnioID}&ProyectoCodigo=${Proyectocodigo}&PeriodoCorrel=${PeriodoCorrel}`);
            opendialog(`/VisorInformessti?ReporteID=${3333}&AnioID=${AnioID}&ProyectoCodigo=${Proyectocodigo}&PeriodoCorrel=${PeriodoCorrel}&NIndividual=${numeroDocCambio}&EstadoDoc=${EstadoDoc}`);
        }
        if ($('#customRadio6').is(':checked')) {
           //opendialogGrafico("GraficaAvance.aspx?AnioID=" + AnioID + "&ProyectoCodigo=" + Proyectocodigo + "&PeriodoCorrel=" + PeriodoCorrel);
            opendialog(`/VisorInformessti?ReporteID=${3338}&AnioID=${AnioID}&ProyectoCodigo=${Proyectocodigo}&PeriodoCorrel=${PeriodoCorrel}`);
        }
        if ($('#customRadio7').is(':checked')) {
            if ($("#textNumero").val() == '') {
                console.log($("#textNumero").val())
                Swal.fire("error", "No ha ingresado un número correlativo", "error");
            } else {
                opendialog("/visorinformesSti.aspx?reporteID=6900&AnioID=" + AnioID + "&ProyectoCodigo=" + Proyectocodigo + "&PeriodoCorr=" + PeriodoCorrel + "&PeriodoCorrImpresion=" + texto + "&pFechaFiltro=" + pFechaFiltro + "&pProgramaVersionID=" + version);
            }

        }
        if ($('#customRadio8').is(':checked')) {
            //opendialogGrafico("ReporteFotografias.aspx?AnioID=" + AnioID + "&ProyectoCodigo=" + Proyectocodigo + "&PeriodoCorrel=" + PeriodoCorrel);
            opendialog(`/VisorInformessti?ReporteID=${3339}&PeriodoCorrel=${PeriodoCorrel}&AnioID=${AnioID}&ProyectoCodigo=${Proyectocodigo}`);
        }
        if ($('#customRadio9').is(':checked')) {
           //opendialog("/visorinformes.aspx?Idreporte=4&Parameters=" + AnioID + "," + Proyectocodigo + "," + PeriodoCorrel);
            opendialog(`/VisorInformessti?ReporteID=${3334}&AnioID=${AnioID}&ProyectoCodigo=${Proyectocodigo}&PeriodoCorrel=${PeriodoCorrel}`);
            console.log(`/VisorInformessti?ReporteID=${3334}&AnioID=${AnioID}&ProyectoCodigo=${Proyectocodigo}&PeriodoCorrel=${PeriodoCorrel}`);
        }
        if ($('#customRadio10').is(':checked')) {
            //opendialog("/visorinformes.aspx?Idreporte=74&Parameters=" + AnioID + "," + Proyectocodigo + "," + PeriodoCorrel);
            opendialog(`/VisorInformessti?ReporteID=${3340}&AnioID=${AnioID}&ProyectoCodigo=${Proyectocodigo}&PeriodoCorrel=${PeriodoCorrel}`);
        }
        if ($('#customRadio11').is(':checked')) {
            //opendialog("/visorinformes.aspx?Idreporte=5&Parameters=" + AnioID + "," + Proyectocodigo + "," + PeriodoCorrel);
            opendialog(`/VisorInformessti?ReporteID=${3335}&AnioID=${AnioID}&ProyectoCodigo=${Proyectocodigo}&PeriodoCorrel=${PeriodoCorrel}`);
        }
        if ($('#customRadio2').is(':checked')) {
            //opendialog("/visorinformes.aspx?Idreporte=6&Parameters=" + AnioID + "," + Proyectocodigo + "," + PeriodoCorrel);
            opendialog(`/VisorInformessti?ReporteID=${3336}&AnioID=${AnioID}&ProyectoCodigo=${Proyectocodigo}&PeriodoCorrel=${PeriodoCorrel}`);
        }
        if ($('#customRadio4').is(':checked')) {
            //opendialog("/visorinformes.aspx?Idreporte=7&Parameters=" + AnioID + "," + Proyectocodigo + "," + PeriodoCorrel);
            opendialog(`/VisorInformessti?ReporteID=${3337}&AnioID=${AnioID}&ProyectoCodigo=${Proyectocodigo}&PeriodoCorrel=${PeriodoCorrel}`);
        }

    }


   
})

function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Informes Técnicos",
            autoOpen: false,
            dialogClass: 'dialog_fixed,ui-widget-header',
            modal: true,
            height: 500,
            minWidth: $(window).width()*.70,
            minHeight: $(window).height() *.55,
            draggable: true
        });
    $dialog.dialog('open');
}
function opendialogGrafico(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Informes Técnicos",
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

$('#customRadio7').change(() => {
    selectVersionProgra();
}) 

$('#customRadio5').change(() => {
    selectDocumentoCambio();
})

$('#customRadio,#customRadio3,#customRadio9,#customRadio11,#customRadio6,#customRadio8,#customRadio10 ,#customRadio5, #customRadio4, #customRadio2').change(() => {
    $('#selectPrograVersion').last().addClass('d-none')
})

$('#customRadio,#customRadio3,#customRadio9,#customRadio11,#customRadio6,#customRadio8,#customRadio10 ,#customRadio7, #customRadio4, #customRadio2').change(() => {
    $('#selectDocCambioV').last().addClass('d-none')
    $(".prograC").empty();
})

$('#selectLisDocCambioE').change(() => {
    selectDocumentoCambio();
}) 


const selectDocumentoCambio = () => {
    if ($('#customRadio5').is(':checked')) {
        $("#selectDocCambioV").last().removeClass("d-none")
        $(".prograC").empty();

        let AnioID = $("#PlanAnualList").val();
        let Proyecto = $("#ProyectoList").val();
        let PeriodoCorr = $("#periodo").val();
        let EstadoDoc = $("#selectLisDocCambioE").val();
        let ProyectoCodigo = Proyecto.split(',')[1];
 
        $.ajax({
            url: `${urlbase}api/InformesTecnicos/CorrelDocCambio/${AnioID}/${ProyectoCodigo}/${PeriodoCorr}/${EstadoDoc}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                if (val == "") {
                    $(".prograC").html(`<option value="0">Sin Documentos de Cambio</option>`)
                } else { 
                    let combo = `<option value="0">Todos</option>`;
                    val = val.map((item) => `<option value="${item.DocCambioCorrel}">${item.DocCambioCorrel}</option>`)
                    $(".prograC").append(combo, val).trigger("change")
                }
            }, error: () => {
                $(".prograC").html(`<option value="0">Sin Documentos de Cambio</option>`) 
            }
        })
    }
}

const selectVersionProgra = () => {
    if ($("#PlanAnualList").val() == null) {
        Swal.fire("error", "Cargue un proyecto para  este reporte", "error");
        $("#customRadio7").prop("checked", false); 

    } else {
        

        let AnioID = $("#PlanAnualList").val();
        let anioproyecto = $("#ProyectoList").val();

        if (anioproyecto == null) {
            Swal.fire("error", "Cargue un proyecto para  este reporte", "error");
            $("#customRadio7").prop("checked", false);
        }

        let ProyectoCodigo = anioproyecto.split(',')[1]

        //console.log(`${urlbase}api/PrograFisica/GetVersionesProgra/${AnioID}/${ProyectoCodigo}`)

        if ($('#customRadio7').is(':checked')) {
            $('#selectPrograVersion').last().removeClass('d-none')
            $.ajax({
                url: `${urlbase}api/PrograFisica/GetVersionesProgra/${AnioID}/${ProyectoCodigo}`,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: (val) => {
                    let combo = `<option value="0">Versión Actual</option>`;
                    $.each(val, (index, item) => {
                        combo += `<option value="${item.VersionID}">${item.descripcion}</option>`
                    })

                    $(".prograV").html(combo)

                    let maxActual = Math.max.apply(Math, val.map(function (o) {
                        return o.VersionID
                    }));

                    $("#textNumero").val(maxActual+1);
                }, error: () => {
                    $(".prograV").html(`<option value="0">Sin Versiones</option>`)
                    $("#textNumero").val(1);
                }
            })
        }
    }
}
//evitar bug de actualizar página con la programación física
const reloadVersionPage = () => {
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD && $('#customRadio7').is(':checked')) {
        $('#selectPrograVersion').last().addClass('d-none')
        $("#customRadio7").prop("checked", false);
    }
}


$(".prograV").on("change.select2", function ({ currentTarget }) {

    if (currentTarget.value != 0) {
        $("#textNumero").val(currentTarget.value);
    } else {
        let temp = 0;
        let currentValue, maxValue;
        $('.prograV option').each(function (i, v) {
            currentValue = v.value;
            maxValue = Math.max(temp, currentValue);
            temp = maxValue;
        });
        console.log(temp)
        $("#textNumero").val(temp+1);
    }
    
});