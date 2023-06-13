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
            $("#supervisoraSelect option").remove()
            $("#programaSelect option").remove()
            $("#proyectoSelect option").remove()
            let cols = val.map((item) => `<option value="${item.AnioID}">${item.PlanAnualNombre}</option>`)
            $("#anioSelect").append(cols.join("")).trigger("change")
        }
    })
    $("#anioSelect").on("change", ({ currentTarget }) => {
        let pAnioID = currentTarget.value
        $.ajax({
            url: `${urlbase}api/ReportesSupervisora/ObtenerSupervisoras/${pAnioID}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                $("#supervisoraSelect option").remove()
                $("#programaSelect option").remove()
                $("#proyectoSelect option").remove()
                let cols = val.map((item) => `<option value="${item.ProyectoCodigo}">${item.ProyectoDescripcion}</option>`)
                $("#supervisoraSelect").empty().append(cols.join("")).trigger("change")
            }
        })
    })
    $("#supervisoraSelect").on("change", ({ currentTarget }) => {
        let AnioID = $('#anioSelect').val()
        let SupervisoraCodigo = currentTarget.value
        $.ajax({
            url: `${urlbase}api/InformesTecnicos/ObtenerEjecutoras/${AnioID}/${SupervisoraCodigo}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                $("#programaSelect option").remove()
                $("#proyectoSelect option").remove()
                let cols = val.map((item) => `<option value="${item.ProgramaCodigo}">${item.ProgramaNombre}</option>`)
                $("#programaSelect").empty().append(cols.join("")).trigger("change")
            }
        })
    })
    $("#programaSelect").on("change", ({ currentTarget }) => {
        let AnioID = $('#anioSelect').val()
        let ProyectoCodigo = $('#supervisoraSelect').val()
        let IDPrograma = currentTarget.value
        let rolS = "SUPERVISORES"
        $.ajax({
            url: `${urlbase}api/InformesTecnicos/CargarProyectos/${IDPrograma}/${AnioID}/${ProyectoCodigo}/${rolS}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                $("#proyectoSelect option").remove()
                let cols = val.map((item) => `<option value="${item.ID}">${item.ProyectoDescripcion}</option>`)
                $("#proyectoSelect").empty().append(cols.join(""))
            }
        })
    })
    $("#btnGenerar").click(function () {
        let informeRadio = parseInt($('input:radio[name=Reporte]:checked').val())
        let anio = $("#anioSelect").val() || ''
        let proyecto = $("#proyectoSelect").val() || ''
        let desde = moment($('#desdeInput').val(), "DD-MM-YYYY").isValid() ? $("#desde-dp").datetimepicker("date").format("YYYY-MM-DD") : ''
        let hasta = moment($('#hastaInput').val(), "DD-MM-YYYY").isValid() ? $("#hasta-dp").datetimepicker("date").format("YYYY-MM-DD") : ''
        let lstTipo = $('#tipoSelect').val()
        if (anio.length == 0 || proyecto.length == 0 || desde.length == 0 || hasta.length == 0) {
            Swal.fire("Atención", "Deben completarse los datos requeridos para la generación de reporte", "error")
            return
        }
        let params = `${anio},${proyecto.substring(4,20)},${desde},${hasta},${lstTipo}`
        switch(informeRadio){
            case 25:
                // Avance Financiero por Tramo
                opendialog(`/visorinformes.aspx?IdReporte=451&Parameters=${params}`)
                break;
            case 26:
                // Avance Financiero por Proyecto
                opendialog(`/visorinformes.aspx?IdReporte=461&Parameters=${params}`)
                break;
            case 27:
                // Avance Fisico por Tramo
                opendialog(`/visorinformes.aspx?IdReporte=471&Parameters=${params}`)
                break;
            case 32:
                // Avance Fisico por Proyecto
                opendialog(`/visorinformes.aspx?IdReporte=481&Parameters=${params}`)
                break;
            case 33:
                // Estacionamientos
                opendialog(`/visorinformes.aspx?IdReporte=491&Parameters=${params}`)
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
