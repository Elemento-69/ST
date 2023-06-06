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
        url: `${urlbase}api/PlanAnual/Get`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            let cols = val.map((item) => `<option value="${item.AnioID}">${item.PlanAnualNombre}</option>`)
            $("#anioSelect").append(cols.join(""))//.trigger("change")
        }
    })
    $("input.custom-control-input").click(function({ target }) {
    	switch(target.id) {
            case "customCheck2":
                // Detalle de estimaciones Ingresadas por fecha
                $("#anioSelect").prop("disabled", true)
                $("#desdeInput").prop("disabled", false)
                $("#hastaInput").prop("disabled", false)
                break;
            case "customCheck8":
                // Reporte Estado de Estimaciones
                $("#anioSelect").prop("disabled", true)
                $("#desdeInput").prop("disabled", true)
                $("#hastaInput").prop("disabled", true)
                break;
            default:
                // Resumen de estimaciones (Vigente y Deuda)
                // Cuenta corriente de proyectos
                // Estado de estimaciones por actividad y Ubicacion (Detalle)
                // Estado de estimaciones por actividad y Ubicacion (Resumen)
                // Resumen de Estimaciones por Actividad
                // Reporte de sanciones por proyectos
                $("#anioSelect").prop("disabled", false)
                $("#desdeInput").prop("disabled", true)
                $("#hastaInput").prop("disabled", true)
                break;
    	}
    })
    $("#btnGenerar").click(function () {
    	let reporteID = parseInt($('input:radio[name=tipo]:checked').val())
        let anio = $("#anioSelect").val() || ''
        let desde = moment($('#desdeInput').val(), "DD-MM-YYYY").isValid() ? $("#desde-dp").datetimepicker("date").format("DD-MM-YYYY") : ''
        let hasta = moment($('#hastaInput').val(), "DD-MM-YYYY").isValid() ? $("#hasta-dp").datetimepicker("date").format("DD-MM-YYYY") : ''
        switch(reporteID){
            case 1:
                if (anio.length == 0) {
                    Swal.fire("Atención", "Deben completarse los datos requeridos para la generación de reporte", "error")
                    return
                }
                // Resumen de estimaciones (Vigente y Deuda)
                opendialog(`/visorinformes.aspx?IdReporte=14&Parameters=${anio}`)
                break;
            case 2:
                if (desde.length == 0 || hasta.length == 0) {
                    Swal.fire("Atención", "Deben completarse los datos requeridos para la generación de reporte", "error")
                    return
                }
                // Detalle de estimaciones Ingresadas por fecha
                opendialog(`/visorinformes.aspx?IdReporte=65&Parameters=${desde},${hasta}`)
                break;
            case 3:
                if (anio.length == 0) {
                    Swal.fire("Atención", "Deben completarse los datos requeridos para la generación de reporte", "error")
                    return
                }
                // Cuenta corriente de proyectos
                opendialog(`/visorinformes.aspx?IdReporte=66&Parameters=${anio}`)
                break;
            case 4:
                if (anio.length == 0) {
                    Swal.fire("Atención", "Deben completarse los datos requeridos para la generación de reporte", "error")
                    return
                }
                // Estado de estimaciones por actividad y Ubicacion (Detalle)
                opendialog(`/visorinformes.aspx?IdReporte=69&Parameters=${anio}`)
                break;
            case 5:
                if (anio.length == 0) {
                    Swal.fire("Atención", "Deben completarse los datos requeridos para la generación de reporte", "error")
                    return
                }
                // Estado de estimaciones por actividad y Ubicacion (Resumen)
                opendialog(`/visorinformes.aspx?IdReporte=70&Parameters=${anio}`)
                break;
            case 6:
                if (anio.length == 0) {
                    Swal.fire("Atención", "Deben completarse los datos requeridos para la generación de reporte", "error")
                    return
                }
                // Reporte de sanciones por proyectos
                opendialog(`/visorinformes.aspx?IdReporte=711&Parameters=${anio}`)
                break;
            case 7:
                if (anio.length == 0) {
                    Swal.fire("Atención", "Deben completarse los datos requeridos para la generación de reporte", "error")
                    return
                }
                // Resumen de Estimaciones por Actividad
                opendialog(`/visorinformes.aspx?IdReporte=57&Parameters=${anio}`)
                break;
            case 8:
                // Reporte Estado de Estimaciones
                opendialog("/VisorInformesSti.aspx?ReporteID=1100")
                break;
        }
    })
})
function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Informe de Deuda",
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
