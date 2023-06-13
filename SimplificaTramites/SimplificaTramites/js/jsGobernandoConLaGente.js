let hoy = new Date()
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
    $("input#programaCheck").click(function({ target }) {
        $("#programasDiv input").prop("disabled", !target.checked)
    })
    $("#anioSelect").on("change.cargar", ({ currentTarget }) => {
        fnCargarProgramas().then()
    })
    $("#btnGenerarInforme").click(function () {
        let tipo = $("#tipoSelect").val() || ''
        let anio = $("#anioSelect").val() || ''
        let departamento = $("#departamentoSelect").val() || ''
        let programa = $("#programaCheck").prop("checked")
        if (tipo.length == 0 || anio.length == 0 || departamento.length == 0) {
            Swal.fire("Atención", "Deben completarse los datos requeridos (Tipo, Plan anual y Departamento) para la generación de reporte", "error")
            return
        }
        let programas = programa && $.map($("#programasDiv input:checked"), a => `'${a.value}'`).join(",")
        let QUERY_STRING = ""
        if (tipo == "1"){
            if (programa){
                QUERY_STRING = `IdReporte=32&Parameters=${anio},${departamento},${programas}`
            } else {
                QUERY_STRING = `IdReporte=34&Parameters=${anio},${departamento}`
            }
        } else {
            if (programa){
                QUERY_STRING = `IdReporte=33&Parameters=${anio},${departamento},${programas}`
            } else {
                QUERY_STRING = `IdReporte=35&Parameters=${anio},${departamento}`
            }
        }
        opendialog(`/visorinformes.aspx?${QUERY_STRING}`)
        // console.log(QUERY_STRING)
    })
    fnInicializaFormulario()
})
async function fnInicializaFormulario(){
    fnCargarDepartamentos().then()
    fnCargarPlanes().then()
}
/**
 * Llena el catalogo de años
 * @returns '2019' string de año
 * */
function fnCargarPlanes(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${urlbase}api/PlanesAnuales/ObtenerAniosReporteGobernando`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                let anioActual = String(hoy.getFullYear())
                let cols = val.map((item) => `<option value="${item.AnioID}" ${item.AnioID == anioActual ? "selected" : ""}>${item.AnioID}</option>`)
                $("#anioSelect").empty()
                    .append('<option value="1">Todos</option>')
                    .append(cols.join(""))
                    .trigger("change.cargar")
                resolve(anioActual)
            },
            error: (response) => {
                Swal.fire("", e.responseJSON.Message || "Error al descargar catálogo planes anuales.", "error")
                reject(response)
            }
        })
    })
}
/**
 * Llena el catalogo de departamentos
 */
function fnCargarDepartamentos(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${urlbase}api/TramosViales/ObtenerListaDepartamentos`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                let cols = val.map((item) => `<option value="${item.DepartamentoID}">${item.DepartamentoNombre}</option>`)
                $("#departamentoSelect").empty().append(cols.join(""))//.trigger("change")
            },
            error: (response) => {
                Swal.fire("", e.responseJSON.Message || "Error al descargar catálogo departamentos.", "error")
                reject(response)
            }
        })
    })
}
/**
 * Llena el <input type="checkbox"> de catalogo de programas.
 * El anio lo obtiene de <select> anioSelect.
 * */
function fnCargarProgramas(){
    return new Promise((resolve, reject) => {
        let anio = $("#anioSelect").val()
        let anioText = $('#anioSelect>option:selected').text()
        $.ajax({
            url: `${urlbase}api/Programas/ObtenerProgramasGobernando/${anio}/${anioText}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                let deshabilitar = !$("#programaCheck").prop("checked")
                let cols = val.map((item, index) => `
                    <div class="form-group col-md-5 col-lg-5 custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="programaCheck${index}" ${deshabilitar ? "disabled" : ""} value="${item.ProgramaCodigo}">
                        <label class="custom-control-label" for="programaCheck${index}">${item.ProgramaNombre}</label>
                    </div>
                `)
                $("#programasDiv").empty().append(cols.join(""))
                resolve()
            },
            error: (response) => {
                Swal.fire("", response.responseJSON.Message || "Error al descargar catálogo supervisoras.", "error")
                reject(response)
            }
        })
    })
}
function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Informe",
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
