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
    // Cargar año
    $.ajax({
        url: `${urlbase}api/PlanAnual/Get`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            let cols = val.map((item) => `<option value="${item.AnioID}">${item.PlanAnualNombre}</option>`)
            // limpiar programaSelect, proyectoSelect
            $("#programaSelect option").remove()
            $("#proyectoSelect option").remove()
            $("#anioSelect").append(cols.join("")).trigger("change")
        }
    })
    $("#anioSelect").on("change", ({ currentTarget }) => {
        let pAnioID = currentTarget.value
        $.ajax({
            url: `${urlbase}api/Programa/Get/${pAnioID}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                // limpiar proyectoSelect
                $("#proyectoSelect option").remove()
                let cols = val.map((item) => `<option value="${item.ProgramaCodigo}">${item.ProgramaNombre}</option>`)
                $("#programaSelect").empty().append(cols.join("")).trigger("change")
            }
        })
    })
    $("#programaSelect").on("change", ({ currentTarget }) => {
        let pAnioID = $('#anioSelect').val()
        let pProgramaCodigo = currentTarget.value
        $.ajax({
            url: `${urlbase}api/Proyecto/GetListadoXPrograma/${pAnioID}/${pProgramaCodigo}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                let cols = val.map((item) => `<option value="${item.ProyectoCodigo}">${item.ProyectoDescripcion}</option>`)
                $("#proyectoSelect").empty().append(cols.join(""))
            }
        })
    })
    $("#btnGenerarReporte").click(function () {
        let anio = $("#anioSelect").val() || ''
        let proyecto = $("#proyectoSelect").val() || ''
        if (anio.length == 0 || proyecto.length == 0){
            Swal.fire("", "Deben completarse los datos requeridos para la generación de informe", "error")
            return
        }
        opendialog(`/VisorInformes.aspx?IDReporte=118&Parameters=${anio},${proyecto}`)
    })
})
function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Informe Congreso de la República",
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
