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
    $(".date").change(({ currentTarget }) => {
        // conseguir la fecha del txt
        let fechaIngresada = moment($(currentTarget).children("input").val(), "DD-MM-YYYY")
        if (fechaIngresada.isValid()){
            $(`#${currentTarget.id}`).datetimepicker("date", fechaIngresada)
        } else {
            Swal.fire("Atención", "La fecha no es válida. Formato es DD-MM-YYYY", "error")
        }
    })
    $("#avanceSelect").parent().hide()
    $("input.custom-control-input").click(function({ target }) {
    	switch(target.id) {
            case "customCheck1":
                // Tramos Viales
                // anio departamento
                $("#filtrarSelect").prop("disabled", true)
                $("#departamentoSelect").prop("disabled", false)
                $("#rutaSelect").prop("disabled", true)
                $("#supervisoraSelect").prop("disabled", true)
                $("#programaSelect").prop("disabled", true)
                $("#proyectoSelect").prop("disabled", true)
                $("#desdeInput").prop("disabled", true)
                $("#hastaInput").prop("disabled", true)
                $("#tipoSelect").prop("disabled", true)
                $("#avanceSelect").parent().hide()
                break;
            case "customCheck2":
                // Rutas Viales
                // anio ruta
                $("#filtrarSelect").prop("disabled", true)
                $("#departamentoSelect").prop("disabled", true)
                $("#rutaSelect").prop("disabled", false)
                $("#supervisoraSelect").prop("disabled", true)
                $("#programaSelect").prop("disabled", true)
                $("#proyectoSelect").prop("disabled", true)
                $("#desdeInput").prop("disabled", true)
                $("#hastaInput").prop("disabled", true)
                $("#tipoSelect").prop("disabled", true)
                $("#avanceSelect").parent().hide()
                break;
            case "customCheck3":
                // Tramos por Proyecto
                // anio supervisora
                $("#filtrarSelect").prop("disabled", false)
                $("#departamentoSelect").prop("disabled", false)
                $("#rutaSelect").prop("disabled", true)
                let filtro3o4 = $("#filtrarSelect").val()
                $("#supervisoraSelect").prop("disabled", filtro3o4 != "3" && filtro3o4 != "4")
                $("#programaSelect").prop("disabled", true)
                $("#proyectoSelect").prop("disabled", true)
                $("#desdeInput").prop("disabled", true)
                $("#hastaInput").prop("disabled", true)
                $("#tipoSelect").prop("disabled", true)
                $("#avanceSelect").parent().hide()
                // Consultar supervisoras aunque se va deshabilitar
                // Supervisora incluye registro "Todas"
                fnCargarSupervisoras().then()
                break;
            case "customCheck4":
                // Anexos Originales
                // anio proyecto
                $("#filtrarSelect").prop("disabled", true)
                $("#departamentoSelect").prop("disabled", true)
                $("#rutaSelect").prop("disabled", true)
                $("#supervisoraSelect").prop("disabled", false)
                $("#programaSelect").prop("disabled", false)
                $("#proyectoSelect").prop("disabled", false)
                $("#desdeInput").prop("disabled", true)
                $("#hastaInput").prop("disabled", true)
                $("#tipoSelect").prop("disabled", true)
                $("#avanceSelect").parent().hide()
                fnCargarSupervisoras().then()
                break;
            case "customCheck5":
                // Directorio
                // anio proyecto desde hasta tipo
                // anio programa desde hasta tipo
                // anio programa
                $("#filtrarSelect").prop("disabled", true)
                $("#departamentoSelect").prop("disabled", true)
                $("#rutaSelect").prop("disabled", true)
                $("#supervisoraSelect").prop("disabled", true)
                $("#programaSelect").prop("disabled", false)
                $("#proyectoSelect").prop("disabled", true)
                $("#desdeInput").prop("disabled", true)
                $("#hastaInput").prop("disabled", true)
                $("#tipoSelect").prop("disabled", true)
                $("#avanceSelect").parent().show()
                fnCargarProgramas().then()
                break;
            default:
                break;
    	}
    })
    $("#avanceSelect").on("change.cargar", ({ currentTarget }) => {
        let avance = currentTarget.value
        switch(avance){
            // case "0":
                // ******* AVANCES FISICOS *******
                // break;
            case "1":
                // Directorio de Contratistas
                $("#filtrarSelect").prop("disabled", true)
                $("#departamentoSelect").prop("disabled", true)
                $("#rutaSelect").prop("disabled", true)
                $("#supervisoraSelect").prop("disabled", true)
                $("#programaSelect").prop("disabled", false)
                $("#proyectoSelect").prop("disabled", true)
                $("#desdeInput").prop("disabled", true)
                $("#hastaInput").prop("disabled", true)
                $("#tipoSelect").prop("disabled", true)
                $("#avanceSelect").parent().show()
                fnCargarProgramas().then()
                break;
            // case "2":
                // Tramos y Cantidades Actualizadas
                // break;
            case "3":
                // Avance Fisico por Proyecto
                $("#filtrarSelect").prop("disabled", true)
                $("#departamentoSelect").prop("disabled", true)
                $("#rutaSelect").prop("disabled", true)
                $("#supervisoraSelect").prop("disabled", false)
                $("#programaSelect").prop("disabled", false)
                $("#proyectoSelect").prop("disabled", false)
                $("#desdeInput").prop("disabled", false)
                $("#hastaInput").prop("disabled", false)
                $("#tipoSelect").prop("disabled", false)
                $("#avanceSelect").parent().show()
                // Carga programas y proyectos
                fnCargarSupervisoras().then()
                break;
            case "4":
                // Avance Fisico por Tramo
                $("#filtrarSelect").prop("disabled", true)
                $("#departamentoSelect").prop("disabled", true)
                $("#rutaSelect").prop("disabled", true)
                $("#supervisoraSelect").prop("disabled", false)
                $("#programaSelect").prop("disabled", false)
                $("#proyectoSelect").prop("disabled", false)
                $("#desdeInput").prop("disabled", false)
                $("#hastaInput").prop("disabled", false)
                $("#tipoSelect").prop("disabled", false)
                $("#avanceSelect").parent().show()
                // Cargarga Programas y Proyectos también
                fnCargarSupervisoras().then()
                break;
            case "5":
                // Avance Fisico por Tramo y Estacion
                $("#filtrarSelect").prop("disabled", true)
                $("#departamentoSelect").prop("disabled", true)
                $("#rutaSelect").prop("disabled", true)
                $("#supervisoraSelect").prop("disabled", false)
                $("#programaSelect").prop("disabled", false)
                $("#proyectoSelect").prop("disabled", false)
                $("#desdeInput").prop("disabled", false)
                $("#hastaInput").prop("disabled", false)
                $("#tipoSelect").prop("disabled", false)
                $("#avanceSelect").parent().show()
                // Carga Programas y Proyectos también
                fnCargarSupervisoras().then()
                break;
            case "6":
                // Avance Fisico
                $("#filtrarSelect").prop("disabled", true)
                $("#departamentoSelect").prop("disabled", true)
                $("#rutaSelect").prop("disabled", true)
                $("#supervisoraSelect").prop("disabled", false)
                $("#programaSelect").prop("disabled", false)
                $("#proyectoSelect").prop("disabled", false)
                $("#desdeInput").prop("disabled", false)
                $("#hastaInput").prop("disabled", false)
                $("#tipoSelect").prop("disabled", false)
                $("#avanceSelect").parent().show()
                // Carga Programas y Proyectos también
                fnCargarSupervisoras().then()
                break;
            // case "20":
                // ******* AVANCES FINANCIEROS ******
                // break;
            case "7":
                // Avance Financiero de Proyectos
                $("#filtrarSelect").prop("disabled", true)
                $("#departamentoSelect").prop("disabled", true)
                $("#rutaSelect").prop("disabled", true)
                $("#supervisoraSelect").prop("disabled", false)
                $("#programaSelect").prop("disabled", false)
                $("#proyectoSelect").prop("disabled", false)
                $("#desdeInput").prop("disabled", false)
                $("#hastaInput").prop("disabled", false)
                $("#tipoSelect").prop("disabled", false)
                $("#avanceSelect").parent().show()
                // Carga Programas y Proyectos también
                fnCargarSupervisoras().then()
                break;
            case "8":
                // Avance Financiero por Tramo
                $("#filtrarSelect").prop("disabled", true)
                $("#departamentoSelect").prop("disabled", true)
                $("#rutaSelect").prop("disabled", true)
                $("#supervisoraSelect").prop("disabled", false)
                $("#programaSelect").prop("disabled", false)
                $("#proyectoSelect").prop("disabled", false)
                $("#desdeInput").prop("disabled", false)
                $("#hastaInput").prop("disabled", false)
                $("#tipoSelect").prop("disabled", false)
                $("#avanceSelect").parent().show()
                // Carga Programas y Proyectos también
                fnCargarSupervisoras().then()
                break;
            case "9":
                // Avance Financiero General de Proyectos
                $("#filtrarSelect").prop("disabled", true)
                $("#departamentoSelect").prop("disabled", true)
                $("#rutaSelect").prop("disabled", true)
                $("#supervisoraSelect").prop("disabled", true)
                $("#programaSelect").prop("disabled", false)
                $("#proyectoSelect").prop("disabled", true)
                $("#desdeInput").prop("disabled", false)
                $("#hastaInput").prop("disabled", false)
                $("#tipoSelect").prop("disabled", false)
                $("#avanceSelect").parent().show()
                // Carga Proyectos también
                fnCargarProgramas().then()
                break;
            case "10":
                // Avance Financiero General por Departamento
                $("#filtrarSelect").prop("disabled", true)
                $("#departamentoSelect").prop("disabled", true)
                $("#rutaSelect").prop("disabled", true)
                $("#supervisoraSelect").prop("disabled", true)
                $("#programaSelect").prop("disabled", false)
                $("#proyectoSelect").prop("disabled", true)
                $("#desdeInput").prop("disabled", false)
                $("#hastaInput").prop("disabled", false)
                $("#tipoSelect").prop("disabled", false)
                $("#avanceSelect").parent().show()
                // Carga Proyectos también
                fnCargarProgramas().then()
                break;
        }
    })
    $("#filtrarSelect").on("change.cargar", ({ currentTarget }) => {
        let filtrar = currentTarget.value
        switch(filtrar){
            case "1":
                // Departamentos
                $("#departamentoSelect").prop("disabled", false)
                $("#rutaSelect").prop("disabled", true)
                $("#supervisoraSelect").prop("disabled", true)
                break;
            case "2":
                // Rutas
                $("#departamentoSelect").prop("disabled", true)
                $("#rutaSelect").prop("disabled", false)
                $("#supervisoraSelect").prop("disabled", true)
                break;
            case "3":
                // Supervisora
                $("#departamentoSelect").prop("disabled", true)
                $("#rutaSelect").prop("disabled", true)
                $("#supervisoraSelect").prop("disabled", false)
                break;
            case "4":
                // Departamento y Supervisora
                $("#departamentoSelect").prop("disabled", false)
                $("#rutaSelect").prop("disabled", true)
                $("#supervisoraSelect").prop("disabled", false)
                break;
        }
    })
    $("#anioSelect").on("change.cargar", ({ currentTarget }) => {
        // console.log("change.cargar anio:", currentTarget.value)
        if ($("#customCheck5").prop("checked")){
            switch($("#avanceSelect").val()){
                case "1": case "9": case "10":
                    fnCargarProgramas().then()
                    break;
                case "3": case "4": case "5": case "6": case "7": case "8":
                    fnCargarSupervisoras().then()
                    break;
            }
        } else if ($("#customCheck3").prop("checked") || $("#customCheck4").prop("checked")){
            fnCargarSupervisoras().then()
        }
    })
    $("#supervisoraSelect").on("change.cargar", ({ currentTarget }) => {
        // console.log("change.cargar supervisora:", currentTarget.value)
        if ($("#customCheck4").prop("checked") || $("#customCheck5").prop("checked")){
            fnCargarProgramas().then()
        }/* else {
            $("#programaSelect").empty()
        }*/
    })
    $("#programaSelect").on("change.cargar", ({ currentTarget }) => {
        // console.log("change.cargar programa:", currentTarget.value)
        if ($("#customCheck4").prop("checked")){
            fnCargarProyectos().then()
        } else if ($("#customCheck5").prop("checked")){
            switch($("#avanceSelect").val()){
                case "3": case "4": case "5": case "6": case "7": case "8":
                    fnCargarProyectos().then()
                    break;
            }
        }
    })
    $("#btnGenerarReporte").click(function () {
        let Filtro = ""
    	let reporteID = parseInt($('input:radio[name=tipo]:checked').val())
        let anio = $("#anioSelect").val() || ''
        let filtrar = $("#filtrarSelect").val() || '1'
        let proyecto = $("#proyectoSelect").val() || ''
        let programa = $("#programaSelect").val() || ''
        let departamento = $("#departamentoSelect").val() || ''
        let ruta = $("#rutaSelect").val() || ''
        let supervisora = $("#supervisoraSelect").val() || ''
        let avance = $("#avanceSelect").val() || '1'
        let tipo = $("#tipoSelect").val() || '2'
        let desde = moment($('#desdeInput').val(), "DD-MM-YYYY").isValid() ? $("#desde-dp").datetimepicker("date").format("DD-MM-YYYY") : ''
        let hasta = moment($('#hastaInput').val(), "DD-MM-YYYY").isValid() ? $("#hasta-dp").datetimepicker("date").format("DD-MM-YYYY") : ''
        firstSwitch:
        switch(reporteID){
            case 1:
                if (anio.length == 0 || departamento.length == 0) {
                    Swal.fire("Atención", "Deben completarse los datos requeridos (Plan anual y Departamento) para la generación de reporte", "error")
                    return
                }
                Filtro = `${anio},${departamento}`
                opendialog(`/visorinformes.aspx?IdReporte=51&Parameters=${Filtro}`)
                break;
            case 2:
                if (anio.length == 0 || ruta.length == 0) {
                    Swal.fire("Atención", "Deben completarse los datos requeridos (Plan anual y Ruta) para la generación de reporte", "error")
                    return
                }
                Filtro = `${anio},${ruta}`
                opendialog(`/visorinformes.aspx?IdReporte=52&Parameters=${Filtro}`)
                break;
            case 3:
                if (filtrar == '3'){
                    // Hoja de Mediciones
                    if (anio.length == 0 || supervisora.length == 0) {
                        Swal.fire("Atención", "Deben completarse los datos requeridos (Plan anual y Supervisora) para la generación de reporte", "error")
                        return
                    }
                    Filtro = `${anio},${supervisora}`
                    opendialog(`/visorinformes.aspx?IdReporte=53&Parameters=${Filtro}`)
                } else if (filtrar == '1' || filtrar == '4'){
                    if (anio.length == 0 || supervisora.length == 0 || departamento.length == 0) {
                        if (filtrar == '1'){
                            // No se elige supervisora, sino esta es Todas
                            Swal.fire("Atención", "Deben completarse los datos requeridos (Plan anual y Departamento) para la generación de reporte", "error")
                            return
                        }
                        Swal.fire("Atención", "Deben completarse los datos requeridos (Plan anual, Supervisora y Departamento) para la generación de reporte", "error")
                        return
                    }
                    Filtro = `${anio},${supervisora},${departamento}`
                    opendialog(`/visorinformes.aspx?IdReporte=59&Parameters=${Filtro}`)
                }
                break;
            case 4:
                if (anio.length == 0 || proyecto.length == 0) {
                    Swal.fire("Atención", "Deben completarse los datos requeridos (Plan anual y Proyecto) para la generación de reporte", "error")
                    return
                }
                Filtro = `${anio},${proyecto}`
                opendialog(`/visorinformes.aspx?IdReporte=1000&Parameters=${Filtro}`)
                break;
            case 5:
                validacion5Label:
                switch(avance){
                    case '3': case '4': case '5': case '6': case '7': case '8':
                        if (anio.length == 0 || proyecto.length == 0 || desde.length == 0 || hasta.length == 0 || tipo.length == 0) {
                            Swal.fire("Atención", "Deben completarse los datos requeridos (Plan anual, Proyecto, Rango de fechas y Tipo) para la generación de reporte", "error")
                            return
                        }
                        break validacion5Label;
                    case '9': case '10':
                        if (anio.length == 0 || programa.length == 0 || desde.length == 0 || hasta.length == 0 || tipo.length == 0) {
                            Swal.fire("Atención", "Deben completarse los datos requeridos (Plan anual, Programa, Rango de fechas y tipo) para la generación de reporte", "error")
                            return
                        }
                        break validacion5Label;
                }
                secondSwitchLabel:
                switch(avance){
                    case '1':
                        if (anio.length == 0 || programa.length == 0) {
                            Swal.fire("Atención", "Deben completarse los datos requeridos (Plan anual y Programa) para la generación de reporte", "error")
                            return
                        }
                        Filtro = `${anio},${programa}`
                        opendialog(`/visorinformes.aspx?IdReporte=54&Parameters=${Filtro}`)
                        break secondSwitchLabel;
                    case '3':
                        Filtro = `${anio},${proyecto},${desde},${hasta},${tipo}`
                        opendialog(`/visorinformes.aspx?IdReporte=48&Parameters=${Filtro}`)
                        break secondSwitchLabel;
                    case '4':
                        Filtro = `${anio},${proyecto},${desde},${hasta},${tipo}`
                        opendialog(`/visorinformes.aspx?IdReporte=55&Parameters=${Filtro}`)
                        break secondSwitchLabel;
                    case '5':
                        Filtro = `${anio},${proyecto},${desde},${hasta},${tipo}`
                        opendialog(`/visorinformes.aspx?IdReporte=566&Parameters=${Filtro}`)
                        break secondSwitchLabel;
                    case '6':
                        Filtro = `${anio},${proyecto},${desde},${hasta},${tipo}`
                        opendialog(`/visorinformes.aspx?IdReporte=577&Parameters=${Filtro}`)
                        break secondSwitchLabel;
                    case '7':
                        Filtro = `${anio},${proyecto},${desde},${hasta},${tipo}`
                        opendialog(`/visorinformes.aspx?IdReporte=588&Parameters=${Filtro}`)
                        break secondSwitchLabel;
                    case '8':
                        Filtro = `${anio},${proyecto},${desde},${hasta},${tipo}`
                        opendialog(`/visorinformes.aspx?IdReporte=60&Parameters=${Filtro}`)
                        break secondSwitchLabel;
                    case '9':
                        Filtro = `${anio},${programa},${desde},${hasta},${tipo}`
                        opendialog(`/visorinformes.aspx?IdReporte=611&Parameters=${Filtro}`)
                        break secondSwitchLabel;
                    case '10':
                        Filtro = `${anio},${programa},${desde},${hasta},${tipo}`
                        opendialog(`/visorinformes.aspx?IdReporte=622&Parameters=${Filtro}`)
                        break secondSwitchLabel;
                    default:
                        console.log("avance no valido")
                        return
                }
                break firstSwitch;
            default:
                console.log("reporteID no valido")
                return
        }
        console.log("Filtro", Filtro)
    })
    fnInicializaFormulario()
    // fnCargarPlanes().then(anio => console.log("año es", anio))
})
async function fnInicializaFormulario(){
    // Cargar año
    let supervisora
    if (rolpermitido == 1){
        await fnCargarPlanes(true)
        supervisora = await fnCargarSupervisoras(true)
        $("#anioSelect").prop("disabled", true)
        $("#supervisoraSelect").prop("disabled", true)
    } else {
        await fnCargarPlanes()
        supervisora = await fnCargarSupervisoras()
    }
    if (supervisora.length > 0){
        fnCargarProgramas().then()
        fnCargarProyectos().then()
    }
    fnCargarDepartamentos().then()
    /*fnCargarRutas().then()*/
}
/**
 * Llena el catalogo de años y devuelve el primer año del catalogo
 * @params elegirUsuario true para utilizar el año de nombre usuario
 * @returns '2019' string de año
 * */
function fnCargarPlanes(elegirUsuario = false){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${urlbase}api/PlanesAnuales/ObtenerPlanesAnuales`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                let anioActual = String(hoy.getFullYear())
                let anioUsuario = user.substring(0, 4)
                let cols = val.map((item) => `<option value="${item.AnioID}" ${(elegirUsuario && item.AnioID == anioUsuario) || (!elegirUsuario && item.AnioID == anioActual) ? "selected" : ""}>${item.PlanAnualNombre}</option>`)
                let anioSelect = $("#anioSelect").empty().append(cols.join(""))
                if (!$("#customCheck5").prop("checked")){
                    // Cargar supervisoras
                    anioSelect.trigger("change.cargar")
                }
                let anioSeleccionado = val[0]?.AnioID || anioActual
                resolve(anioSeleccionado)
            },
            error: (response) => {
                Swal.fire("", e.responseJSON.Message || "Error al descargar catálogo planes anuales.", "error")
                reject(response)
            }
        })
    })
}
function fnCargarDepartamentos(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${urlbase}api/Departamentos/ObtenerDepartamentos`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                let cols = val.map((item) => `<option value="${item.DepartamentoID}">${item.DepartamentoNombre}</option>`)
                cols.push('<option value="0" selected>Todas</option>')
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
 * Llena el <select> de catalogo de supervisoras.
 * @params pAnioID el plan anual. Es opcional
 * @params elegirUsuario Elegir al usuario logeado
 * */
function fnCargarSupervisoras(elegirUsuario = false){
    let anio = $("#anioSelect").val()
    let supervisora = user.substring(4).toUpperCase()
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${urlbase}api/ReportesSupervisora/ObtenerSupervisoras/${anio}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                let habilitarTodas = $("#customCheck3").prop("checked")
                let cols = val.map((item) => `<option value="${item.ProyectoCodigo}" ${!habilitarTodas && elegirUsuario && item.ProyectoCodigo == supervisora ? "selected" : ""}>${item.ProyectoDescripcion}</option>`)
                if (habilitarTodas){
                    cols.push('<option value="Todas" selected>Todas</option>')
                }
                $("#supervisoraSelect").empty().append(cols.join("")).trigger("change.cargar")
                resolve(habilitarTodas ? "Todas" : (elegirUsuario ? supervisora : (val[0]?.ProyectoCodigo || "")))
            },
            error: (response) => {
                Swal.fire("", e.responseJSON.Message || "Error al descargar catálogo supervisoras.", "error")
                reject(response)
            }
        })
    })
}
/**
 * Llena el <select> de catalogo de programas.
 * El anio lo obtiene de <select> anioSelect.
 * */
function fnCargarProgramas(){
    return new Promise((resolve, reject) => {
        let anio = $("#anioSelect").val()
        let url, avance = $("#avanceSelect").val()
        let obtenerProgramasPorAnio = $("#customCheck5").prop("checked") && (avance == "1" || avance == "9" || avance == "10")
        if (obtenerProgramasPorAnio){
            url = `${urlbase}api/Programas/ObtenerProgramasParaReportesGenerales/${anio}`
        } else {
            let supervisora = $("#supervisoraSelect").val()
            url = `${urlbase}api/InformesTecnicos/ObtenerEjecutoras/${anio}/${supervisora}`
        }
        $.ajax({
            url,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                let cols = val.map((item) => `<option value="${item.ProgramaCodigo}">${item.ProgramaNombre}</option>`)
                if (obtenerProgramasPorAnio){
                    cols.push('<option value="Todas" selected>Todas</option>')
                }
                $("#programaSelect").empty().append(cols.join("")).trigger("change.cargar")
                resolve(obtenerProgramasPorAnio ? "Todas" : (val[0]?.ProgramaCodigo || ""))
            },
            error: (response) => {
                Swal.fire("", e.responseJSON.Message || "Error al descargar catálogo supervisoras.", "error")
                reject(response)
            }
        })
    })
}
/**
 * Llena el <select> de catalogo de proyectos.
 * */
function fnCargarProyectos(){
    return new Promise((resolve, reject) => {
        let anio = $("#anioSelect").val()
        let supervisora = $("#supervisoraSelect").val()
        let programa = $("#programaSelect").val()
        let rol = "SUPERVISORES"
        $.ajax({
            url: `${urlbase}api/InformesTecnicos/CargarProyectosGenerales/${programa}/${anio}/${supervisora}/${rol}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                let cols = val.map((item) => `<option value="${item.ID}">${item.ProyectoDescripcion}</option>`)
                $("#proyectoSelect").empty().append(cols.join(""))
                resolve(val[0]?.ID || "")
            },
            error: (response) => {
                Swal.fire("", e.responseJSON.Message || "Error al descargar catálogo proyectos.", "error")
                reject(response)
            }
        })
    })
}
/**
 * Llena el <select> de catalogo de rutas.
 * */
function fnCargarRutas(){
    //return new Promise((resolve, reject) => {
    //    $.ajax({
    //        url: `${urlbase}api/Tramo/CargarRutas`,
    //        headers: {
    //            "Authorization": "Bearer " + token,
    //            "Content-Type": "application/json"
    //        },
    //        success: (val) => {
    //            let cols = val.map((item) => `<option value="${item.RutaCode}">${item.RutaCode}</option>`)
    //            $("#rutaSelect").empty().append(cols.join(""))
    //            resolve(val[0]?.RutaCode || "")
    //        },
    //        error: (response) => {
    //            Swal.fire("", e.responseJSON.Message || "Error al descargar catálogo rutas.", "error")
    //            reject(response)
    //        }
    //    })
    //})
}
function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Reportes Generales",
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
