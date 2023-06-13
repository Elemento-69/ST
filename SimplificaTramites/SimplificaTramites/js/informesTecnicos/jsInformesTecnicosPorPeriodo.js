let rolC = rolConsultas
$("select").select2({ theme: "bootstrap" })
$("#desde-dp").datetimepicker({
    format: "DD/MM/YYYY",
    locale: 'es',
})

$('#hasta-dp').datetimepicker({
    format: "DD/MM/YYYY",
    locale: 'es',
});

$("#desde-dp").on("change.datetimepicker", function (e) {
    if (e.date) {
        $('#hasta-dp').datetimepicker('minDate', e.date);
    }
    e.currentTarget.classList.remove("is-invalid");
});

$("#hasta-dp").on("change.datetimepicker", function (e) {
    if (e.date) {
        $('#desde-dp').datetimepicker('maxDate', e.date);
    }
    e.currentTarget.classList.remove("is-invalid");
});
$("#desde-dp, #hasta-dp").trigger("change.datetimepicker");
if (rolC === "SUPERVISORES") {
    $("#year").prop("disabled", true);
    $("#supervisora").prop("disabled", true);
}

$.ajax({
    url: `${urlbase}api/PlanAnual/Get`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        val = val.map((item) => `<option value="${item.AnioID}">${item.PlanAnualNombre}</option>`)
        $("#year").append(val).trigger("change")
        if (rolC === "SUPERVISORES") {
            plan = usuario.substr(0, 4);
            $('#year').val(plan);
            $('#year').append(plan).trigger("change")
        }
    }
})


$("#year").on("change.select2", function () {
    let parametro = this.value 
    $("#supervisora").html(null)   
    $.ajax({
        url: `${urlbase}api/InformesTecnicos/ObtenerListaProyectosSupervision/${parametro}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            val = val.map((item) => `<option value="${item.ProyectoCodigo}">${item.ProyectoDescripcion}</option>`)
            
            if (rolC === "SUPERVISORES") {
                $("#supervisora").append(val)
                let proyectosuper = usuario.substr(4, 10);
                proyectosuper = proyectosuper.toUpperCase();
                $('#supervisora').val(proyectosuper);
                $("#proyecto").html(null)
                $('#supervisora').append(proyectosuper).trigger("change")
            }
            else {
                $("#supervisora").append(val).trigger("change")
            }
        }
    })
})
var AnioID = 0;
var Proyectocodigo = '';
$("#supervisora").on("change.select2", function () {
    $("#proyecto").html(null)
    $.ajax({
        url: `${urlbase}api/InformesTecnicos/ObtenerListaProyectosSupervisor/${$("#year").val()}/${$("#supervisora").val()}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
           
            val = val.map((item) => `<option value="${item.AnioCodigoproyecto}">${item.ProyectoDescripcion}</option>`)
            $("#proyecto").append(val).trigger("change")
        }
    })
})
$("#proyecto").on("change.select2", function () {

    var anioproyecto = $("#proyecto").val();
    if (anioproyecto != null) {
    Proyectocodigo = anioproyecto.split(',')[1];
    }

})


$("#btnGenerar").on("click", () => {
    AnioID = $("#year").val()
    var fi = $("#desde-dp").datetimepicker("date").format("DD-MM-YYYY");
    var ff = $("#hasta-dp").datetimepicker("date").format("DD-MM-YYYY");
    if ($('#customCheck').is(':checked')) { opendialog("/visorinformes.aspx?Idreporte=8&Parameters=" + AnioID + "," + Proyectocodigo + "," + fi + "," +ff); }
    if ($('#customCheck2').is(':checked')) { opendialog("/visorinformes.aspx?Idreporte=10&Parameters=" + AnioID + "," + Proyectocodigo + "," + fi + "," + ff); }
    if ($('#customCheck3').is(':checked')) { opendialog("/visorinformes.aspx?Idreporte=9&Parameters=" + AnioID + "," + Proyectocodigo + "," + fi + "," + ff); }
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
            minWidth: $(window).width() * .70,
            minHeight: $(window).height() * .55,
            draggable: true
        });
    $dialog.dialog('open');
}
function invalid(element) {
    var data = element.val();
    if (data == "" || data == null) {
        element.addClass("is-invalid");
        return true;
    } else {
        element.removeClass("is-invalid");
        return false;
    }
}