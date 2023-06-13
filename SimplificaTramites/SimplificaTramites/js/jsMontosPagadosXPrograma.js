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
        url: `${urlbase}api/PlanesAnuales/ObtenerAniosEnPlanes?AnioID=1`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            let cols = val.map((item) => `<option value="${item.AnioID}">${item.AnioID}</option>`)
            $("#anioSelect").append(cols.join(""))
        }
    })
    $("#btnGenerar").click(function () {
        let anio = $("#anioSelect").val() || ''
        let mes = $("#mesSelect").val() || ''
        let lstTipo = parseInt($('#tipoSelect').val())
        if (anio.length == 0 || mes.length == 0) {
            Swal.fire("Atención", "Deben completarse los datos requeridos para la generación de reporte", "error")
            return
        }
        switch(lstTipo){
            case 0:
                opendialog(`/VisorInformesSti.aspx?ReporteID=38&Anio=${anio}&Mes=${mes}`)
                break;
            case 1:
                opendialog(`/VisorInformesSti.aspx?ReporteID=39&Anio=${anio}&Mes=${mes}`)
                break;
            case 2:
                opendialog(`/VisorInformesSti.aspx?ReporteID=40&Anio=${anio}&Mes=${mes}`)
                break;
        }
    })
})
function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Sanciones por Año",
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
