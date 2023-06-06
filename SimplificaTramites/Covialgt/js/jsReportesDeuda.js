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
    		case "customCheck34":
	    		$("#proyectoInput").prop('disabled', true)
				$("#NITInput").prop('disabled', true)
				$("#programaInput").prop('disabled', false)
				$("#desdeInput").prop('disabled', true)
				$("#hastaInput").prop('disabled', true)
    			break
    		case "customCheck35":
    			$("#proyectoInput").prop('disabled', true)
				$("#NITInput").prop('disabled', true)
				$("#programaInput").prop('disabled', false)
				$("#desdeInput").prop('disabled', false)
				$("#hastaInput").prop('disabled', false)
    			break
    		default:
    			$("#proyectoInput").prop('disabled', false)
				$("#NITInput").prop('disabled', true)
				$("#programaInput").prop('disabled', true)
				$("#desdeInput").prop('disabled', true)
				$("#hastaInput").prop('disabled', true)
    	}
    })
    $("#btnGenerar").click(function () {
    	let reporteID = parseInt($('input:radio[name=tipo]:checked').val())
        let anio = $("#anioSelect").val()
        let proyecto = $("#proyectoInput").val()
        let NIT = $("#NITInput").val()
        let programa = $("#programaInput").val()
        let desde = moment($('#desdeInput').val(), "DD-MM-YYYY").isValid() ? $("#desde-dp").datetimepicker("date").format("YYYY-MM-DD") : ''
        let hasta = moment($('#hastaInput').val(), "DD-MM-YYYY").isValid() ? $("#hasta-dp").datetimepicker("date").format("YYYY-MM-DD") : ''
		if ((rol == "REGIONALES" || rol == "ENCARGADO PRESUPUESTO" || rol == "ADMINISTRADORES") && reporteID == 32) {
            opendialog("/VisorInformesSti.aspx?Anio=" + anio + "&proyecto=" + proyecto + "&NitEmpresa=" + NIT + "&reporte=" + reporteID + "&ReporteID=" + reporteID)
		} else if ((rol != "REGIONALES" && reporteID != 32) || (rol == "administrador" && reporteID != 32)){
            if (reporteID == 34){
                opendialog("/VisorInformesSti.aspx?Anio=" + anio + "&programa=" + programa + "&NitEmpresa=" + NIT + "&reporte=" + reporteID + "&ReporteID=" + reporteID)
            } else if (reporteID == 35){
                if (desde.length == 0 || hasta.length == 0){
                    swal.fire("", "FAVOR ELEGIR RANGO DE FECHAS", "error")
                    return
                }
                opendialog("/VisorInformesSti.aspx?Anio=" + anio + "&programa=" + programa + "&fechad=" + desde + "&fechah=" + hasta + "&ReporteID=" + reporteID)
            } else if (reporteID == 37) {
                if (proyecto.length == 0){
                    swal.fire("", "FAVOR INGRESAR PROYECTO", "error")
                    return
                }
                opendialog("/VisorInformesSti.aspx?Anio=" + anio + "&Proyecto=" + proyecto + "&ReporteID=" + reporteID)
            } else {
                opendialog("/VisorInformesSti.aspx?Anio=" + anio + "&proyecto=" + proyecto + "&NitEmpresa=" + NIT + "&reporte=" + reporteID + "&ReporteID=" + reporteID)
            }
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
