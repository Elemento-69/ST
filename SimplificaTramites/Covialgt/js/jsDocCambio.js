$(document).ready(function () {
	(function () {
        'use strict';
        window.addEventListener('load', function () {
            // Get the forms we want to add validation styles to
            var forms = document.getElementsByClassName('needs-validation')
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function (form) {
                form.addEventListener('submit', function (event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    form.classList.add('was-validated')
                }, false)
            })
        }, false)
    })()
    $("body").keydown("input", function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            $(event.currentTarget.dataset.submitbutton).click()
            return false;
        }
    });
    $("select").select2({ theme: "bootstrap" })
    $(".date").change(({ currentTarget }) => {
        // conseguir la fecha del txt
        let fechaIngresada = moment($(currentTarget).children("input").val(), "DD-MM-YYYY")
        if (fechaIngresada.isValid()){
            $(`#${currentTarget.id}`).datetimepicker("date", fechaIngresada)
        } else {
            Swal.fire("Atención", "La fecha no es válida. Formato es DD-MM-YYYY", "error")
        }
    })
	// Cargar año
    $.ajax({
        url: `${urlbase}api/NominasPago/GetPlanesAnualesConsolidadoNomina`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            let cols = val.map((item) => `<option value="${item.AnioID}">${item.PlanAnualNombre}</option>`)
            $("#anioSelect").append(cols.join(""))
        }
    })
    $("#btnGenerar").click(function () {
        let anio = $("#anioSelect").val() || ''
        let desde = moment($('#desdeInput').val(), "DD-MM-YYYY").isValid() ? $("#desde-dp").datetimepicker("date").format("YYYY-MM-DD") : ''
        let hasta = moment($('#hastaInput').val(), "DD-MM-YYYY").isValid() ? $("#hasta-dp").datetimepicker("date").format("YYYY-MM-DD") : ''
        if (anio.length == 0 || desde.length == 0 || hasta.length == 0) {
            Swal.fire("Atención", "Deben completarse los datos requeridos para la generación de reporte", "error")
            return
        }

        var value = $('input[name="mensuales"]:checked').val();
            if (value == "resumen") {
                opendialog(`/VisorInformes.aspx?IdReporte=104&Parameters=${anio},${desde},${hasta}`);
            } else if (value == "detalle") {
                opendialog(`/VisorInformes.aspx?IdReporte=105&Parameters=${anio},${desde},${hasta}`);
            }

    })
})
function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Documentos de cambio",
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
function Pad(value, length = 2) {
    return (value.toString().length < length) ? Pad("0" + value, length) : value;
}

$(document).ready(function () {
    var fecha = new Date();
    let day = fecha.getDate()
    let month = fecha.getMonth() + 1
    let year = fecha.getFullYear();
    let fechaActual = `${Pad(month, 2)}/${Pad(day, 2)}/${year}`;
$("#desde-dp, #hasta-dp").datetimepicker({
    format: 'DD/MM/YYYY',
    locale: 'es',
    defaultDate: fechaActual
})
});