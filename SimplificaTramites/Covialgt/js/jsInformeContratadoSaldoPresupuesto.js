﻿$(document).ready(function () {
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
            $("#anioSelect").append(cols.join(""))
        }
    })
    $("#btnGenerarReporte").click(function () {
        let anio = $("#anioSelect").val() || ''
        if (anio.length == 0){
            Swal.fire("", "Deben completarse los datos requeridos para la generación de informe", "error")
            return
        }
        opendialog(`/VisorInformes.aspx?Parameters=${anio}&IdReporte=82`)
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
