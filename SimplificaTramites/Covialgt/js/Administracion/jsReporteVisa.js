$.ajax({
    url: `${urlbase}api/PlanesAnuales/ObtenerPlanesAnuales`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        let options = val.map((val) => new Option(val.AnioID, val.AnioID));
        $('#anio1, #anio2, #anio3').html(options).trigger("change");
    },
    error: () => { }
});

function Pad(value, length = 2) {
    return (value.toString().length < length) ? Pad("0" + value, length) : value;
}

$("#generar1").click(() => {
    if (Page_ClientValidate('valreport')) {
        var value = $('input[name="diarios"]:checked').val();
        var desde = $("#fechaInicial-dp").datetimepicker("date").format("DD/MM/YYYY");
        var hasta = $("#fechaFinal-dp").datetimepicker("date").format("DD/MM/YYYY");
        var anio = $("#anio1").val();
        if (value == "todos") {
            opendialog(`/VisorInformes.aspx?IdReporte=41&Parameters=${desde},${hasta},${anio}`);
        } else if (value == "ingresos") {
            opendialog(`/VisorInformes.aspx?IdReporte=42&Parameters=${desde},${hasta}`);
        } else if (value == "egresos") {
            opendialog(`/VisorInformes.aspx?IdReporte=43&Parameters=${desde},${hasta}`);
        }
    }
});

$("#generar2").click(() => {
    var value = $('input[name="mensuales"]:checked').val();
    var anio = $("#anio2").val();
    var mes = $("#meses").val();
    if (value == "mensuales1") {
        opendialog(`/VisorInformes.aspx?IdReporte=44&Parameters=${anio},${mes}`);
    } else if (value == "mensuales2") {
        opendialog(`/VisorInformes.aspx?IdReporte=45&Parameters=${anio},${mes}`);
    }
});

$("#generar3").click(() => {
    var anio = $("#anio3").val();
    opendialog(`/VisorInformes.aspx?IdReporte=46&Parameters=${anio}`);
});

function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Reporte de Visa",
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

$(document).ready(function () {
    var fecha = new Date();
    let day = fecha.getDate()
    let month = fecha.getMonth() + 1
    let year = fecha.getFullYear();
    let fechaActual = `${Pad(month, 2)}/${Pad(day, 2)}/${year}`;

    $("#fechaInicial-dp, #fechaFinal-dp").datetimepicker({
        format: 'DD/MM/YYYY',
        locale: 'es',
        defaultDate: fechaActual
    });

    $("#fechaInicial-dp").on("change.datetimepicker", function (e) {
        $('#fechaFinal-dp').datetimepicker('minDate', e.date);
    });
    $("#fechaFinal-dp").on("change.datetimepicker", function (e) {
        $('#fechaInicial-dp').datetimepicker('maxDate', e.date);
    });

    $("#fechaInicial-dp, #fechaFinal-dp").trigger("change.datetimepicker");
});