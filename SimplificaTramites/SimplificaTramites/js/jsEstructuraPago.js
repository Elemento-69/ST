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
        url: `${urlbase}api/EstructuraPagoFinanciero/GetPlanesAnuales`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            let cols = val.map((item) => `<option value="${item.AnioID}">${item.PlanAnualNombre}</option>`)
            $("#anioSelect").append(cols.join("")).trigger("change")
        }
    })
    $("#anioSelect").on("change", ({ currentTarget }) => {
        let pAnioID = currentTarget.value
        $.ajax({
            url: `${urlbase}api/EstructuraPagoFinanciero/GetItemsCatalogo?pOpcion=8&pIdCatalogo=0&pIdItemCatalogo=0&pDesCatalogo=0&pFiltro=${pAnioID}&pTitulo=0&pIdSubCategoria=0`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                let cols = val.map((item) => `<option value="${item.NominaCorrel}">${item.NominaCorrel}</option>`)
                $("#estimacionCorrSelect").empty().append(cols.join("")).trigger("change")
            }
        })
    })
    $("#btnGenerar").click(function () {
        let anio = $("#anioSelect").val() || ''
        let NominaCorrel = $("#estimacionCorrSelect").val() || ''
        if (anio.length == 0 || NominaCorrel.length == 0) {
            Swal.fire("Atención", "Deben completarse los datos requeridos para la generación de reporte", "error")
            return
        }
        opendialog(`/VisorInformesSti.aspx?ReporteID=100&AnioID=${anio}&EstimacionCorr=${NominaCorrel}`)
    })
})
function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Estructura de pagos",
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
