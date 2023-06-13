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
    $("#anioSelect").on("change.cargar", ({ currentTarget }) => {
        fnCargarProgramas().then()
    })
    $("#btnGenerarInforme1").click(function () {
        let anio = $("#anioSelect").val() || ''
        let programa = $("#programaSelect").val() || ''
        let departamento = $("#departamentoSelect").val() || ''
        if (anio.length == 0 || programa.length == 0 || departamento.length == 0) {
            Swal.fire("Atención", "Deben completarse los datos requeridos (Plan anual, Programa y Departamento) para la generación de reporte", "error")
            return
        }
        let QUERY_STRING=`IdReporte=39&Parameters=${anio},${departamento},${programa},${user}`
        opendialog(`/visorinformes.aspx?${QUERY_STRING}`)
        // console.log("QUERY_STRING", QUERY_STRING)
    })
    $("#btnGenerarInforme2").click(function () {
        let anio = $("#anioSelect").val() || ''
        let regional = $("#regionalSelect").val() || ''
        if (anio.length == 0 || regional.length == 0) {
            Swal.fire("Atención", "Deben completarse los datos requeridos (Plan anual y Reginal) para la generación de reporte", "error")
            return
        }
        let QUERY_STRING=`IdReporte=37&Parameters=${anio},${regional}`
        opendialog(`/visorinformes.aspx?${QUERY_STRING}`)
        // console.log("QUERY_STRING", QUERY_STRING)
    })
    fnInicializaFormulario()
})
function fnInicializaFormulario(){
    fnCargarPlanes().then()
    fnCargarDepartamentos().then()
    fnCargarRegionales(rolpermitido == 1).then()
}
/**
 * Llena el catalogo de años
 * @returns '2019' string de año
 * */
function fnCargarPlanes(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${urlbase}api/PlanesAnuales/ObtenerPlanesAnuales`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                let anioActual = String(hoy.getFullYear())
                let cols = val.map((item) => `<option value="${item.AnioID}" ${item.AnioID == anioActual ? "selected" : ""}>${item.PlanAnualNombre}</option>`)
                options = cols.join("")
                $("#anioSelect").empty()
                    .append(options)
                    .trigger("change.cargar")
                $("#anioSelect2").empty()
                    .append(options)
                resolve(anioActual)
            },
            error: (response) => {
                Swal.fire("", response.responseJSON.Message || "Error al descargar catálogo planes anuales.", "error")
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
                $("#departamentoSelect").empty().append(cols.join(""))
            },
            error: (response) => {
                Swal.fire("", response.responseJSON.Message || "Error al descargar catálogo departamentos.", "error")
                reject(response)
            }
        })
    })
}
/**
 * Llena el catalogo de programas
 * El año lo obtiene de anioSelect
 * */
function fnCargarProgramas(){
    return new Promise((resolve, reject) => {
        let anio = $("#anioSelect").val()
        $.ajax({
            url: `${urlbase}api/Programas/ObtenerProgramasXAnio/${anio}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                let cols = val.map((item) => `<option value="${item.ProgramaCodigo}">${item.ProgramaNombre}</option>`)
                $("#programaSelect").empty().append(cols.join(""))
                resolve()
            },
            error: (response) => {
                Swal.fire("", response.responseJSON.Message || "Error al descargar catálogo programas.", "error")
                reject(response)
            }
        })
    })
}
/**
 * Llena el catálogo de supervisores
 * */
function fnCargarRegionales(elegirSupervisor){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${urlbase}api/ReportesSupervisora/ObtenerSupervisorasRegionales`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                let cols = val.map((item) => `<option value="${item.UsuarioID}" ${elegirSupervisor && user == item.UsuarioID ? "selected" : ""}>${item.Nombre}</option>`)
                $("#regionalSelect").empty()
                .append('<option value="NADIE">NO ASIGNADOS</option>')
                .append('<option value="TODOS">TODOS</option>')
                .append(cols.join(""))
                resolve()
            },
            error: (response) => {
                Swal.fire("", response.responseJSON.Message || "Error al descargar catálogo regionales.", "error")
                reject(response)
            }
        })
    })
}
function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Informes",
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
