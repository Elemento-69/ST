let EsSupervisor
let NumeroPeriodos = 0;
let total
let codigosuper
let comparacion
let IdSup
let ckeckdelegado
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
    $(".date").datetimepicker({
        format: 'DD/MM/YYYY'
    })
    // Cargar EsSupervisor
    $.ajax({
        url: `${urlbase}api/EstimacionAgregar/GetTipoProyecto/${anioID}/${codigoproyecto}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            EsSupervisor = val.length > 0 ? val[0].EsSupervisor : false
        }
    })
    // Cargar ObtenerFechaRangoEstimaciones
    $.ajax({
        url: `${urlbase}api/EstimacionAgregar/ObtenerFechaRangoEstimaciones/${anioID}/${codigoproyecto}/${correlativo}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            NumeroPeriodos = val.length
            total = val.reduce((acc, a) => acc + a.Dias, 0)
            console.info(NumeroPeriodos);
        }
    })
    $("#planInput").val(anioID)
    $("#codigoProyectoInput").val(codigoproyecto)
    $("#estimacionInput").val(correlativo)
    if (codigoproyecto.startsWith("C-")){
        $("label[for='noPolizaInput']").text("No. Clase:")
        $("label[for='nombreCompletoDelegadoInput']").text("No. IGSS:")
    } else {
        $("label[for='noPolizaInput']").text("No. Poliza:")
        $("label[for='nombreCompletoDelegadoInput']").text("Nombre Completo Delegado:")
    }
    codigosuper = user
    Supervisor = codigosuper.substring(4)
    comparacion = Supervisor.toUpperCase()
    IdSup = codigoproyecto.split("-")
    ckeckdelegado = Boolean.parse(delegado)
    if (ckeckdelegado) {
        $("label[for='nombreCompletoDelegadoInput']").removeClass("invisible")
        $("#nombreCompletoDelegadoInput").removeClass("invisible")
        $("label[for='nombreSupervisorInput']").addClass("invisible")
        $("#nombreSupervisorInput").addClass("invisible")
    } else if (codigoproyecto.startsWith("C-")) {
        $("label[for='nombreCompletoDelegadoInput']").removeClass("invisible")
        $("#nombreCompletoDelegadoInput").removeClass("invisible")
        $("label[for='nombreSupervisorInput']").removeClass("invisible")
        $("#nombreSupervisorInput").removeClass("invisible")
    } else {
        $("label[for='nombreCompletoDelegadoInput']").addClass("invisible")
        $("#nombreCompletoDelegadoInput").addClass("invisible")
        $("label[for='nombreSupervisorInput']").removeClass("invisible")
        $("#nombreSupervisorInput").removeClass("invisible")
    }
    $("#btnGenerarReporte").click(function () {
        let desde = moment($('#desdeInput').val(), "DD-MM-YYYY").isValid() ? $("#desde-dp").datetimepicker("date").format("DD/MM/YYYY") : ''
        let clausulaContrato = $("#clausulaContratoInput").val().trim()
        let numeral = $("#noClausulaInput").val().trim()
        let clase = $("#claseInput").val().trim()
        let afianzadora = $("#aseguradoraSelect").val().replace(/&/g, "%26").trim()
        // let razon = $("#razonSelect").val().trim()
        let razon = "Los Tramos a Cargo no Tienen Problemas de Baches"
        let nombreCompletoDelegado = $("#nombreCompletoDelegadoInput").val().replace(/&/g, "%26").trim()
        if (nombreCompletoDelegado.length == 0){
            nombreCompletoDelegado = "-"
        }
        let nombreSupervisor = $("#nombreSupervisorInput").val().replace(/&/g, "%26").trim()
        if (nombreSupervisor.length == 0){
            nombreSupervisor = "-"
            // $("#nombreSupervisorInput").val("-")
        }
        let poliza = $("#noPolizaInput").val().trim()
        let lblNoPoliza = $("label[for='noPolizaInput']").val() || ''
        let estadoContratista = true
        let justificacion = ""
        let fechaescritura = "01/01/2000"
        if (clausulaContrato.length == 0) {
            Swal.fire("Atención", "Ingrese Clausula", "error")
            return
        }
        if (desde.length == 0) {
            Swal.fire("Atención", "Ingrese Fecha", "error")
            return
        }
        if (numeral.length == 0) {
            Swal.fire("Atención", "Ingrese No. Clausula", "error")
            return
        }
        if (clase.length == 0) {
            Swal.fire("Atención", "Ingrese Clase", "error")
            return
        }
        if (afianzadora.length == 0) {
            Swal.fire("Atención", "Ingrese Afianzadora", "error")
            return
        }
        if (ckeckdelegado && nombreCompletoDelegado.length == 0){
            Swal.fire("Atención", "Ingrese Nombre Delegado", "error")
            return
        }
        if (!ckeckdelegado && codigoproyecto == "C-001" && nombreCompletoDelegado.length == 0){
            Swal.fire("Atención", "Ingrese No. IGSS", "error")
            return
        }
        if (!$("label[for='nombreSupervisorInput']").hasClass("invisible") && nombreSupervisor.length == 0){
            Swal.fire("Atención", "Ingrese Nombre Supervisor", "error")
            return
        }
        if (poliza.length == 0 && lblNoPoliza == "No. Poliza:"){
            Swal.fire("Atención", "Ingrese No. Poliza", "error")
            return
        }
        if (poliza.length == 0 && lblNoPoliza == "No. Clase:"){
            Swal.fire("Atención", "Ingrese No. Clase", "error")
            return
        }
        obtenerporcentajeproyecto2(indiceAvance => {
            obtenerNomEmpresaRpEstimaciones(nombreEmpresa => {
                let empresasupervisora = nombreEmpresa.replace(/&/g, "%26")
                obtenerTblProyectosTipoContrato(Tipo_Contrato => {
                    let estimacionUnica = $("#estimacionUnicaCheck").prop('checked')
                    let anioid = parseInt(anioID)
                    if (!estimacionUnica) {
                        if ((codigoproyecto == "C-001" && anioid < 2018 && total == 28) || (codigoproyecto == "C-001" && anioid < 2018 && total == 29) || (codigoproyecto == "C-001" && total == 30) || (codigoproyecto == "C-001" && total == 31)) {
                            opendialog(`VisorInformesSti.aspx?ReporteID=6300&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&IndiceAvance=${indiceAvance}&Razones=${razon}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=${correlativo}`)
                        } else if ((codigoproyecto == "C-001" && anioid < 2018 && total != 28) || (codigoproyecto == "C-001" && anioid < 2018 && total != 29) || (codigoproyecto == "C-001" && total != 30) || (codigoproyecto == "C-001" && total != 31)){
                            opendialog(`VisorInformesSti.aspx?ReporteID=9900&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&IndiceAvance=${indiceAvance}&Razones=${razon}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=${correlativo}`)
                        } else if ((codigoproyecto == "C-002" && anioid < 2018 && total == 28) || (codigoproyecto == "C-002" && total == 29) || (codigoproyecto == "C-002" && total == 30) || (codigoproyecto == "C-002" && total == 31)){
                            opendialog(`VisorInformesSti.aspx?ReporteID=63001&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&IndiceAvance=${indiceAvance}&Razones=${razon}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=${correlativo}`)
                        } else if ((codigoproyecto == "C-002" && anioid < 2018 && total != 28) || (codigoproyecto == "C-002" && anioid < 2018 && total != 29) || (codigoproyecto == "C-002" && anioid < 2018 && total != 30) || (codigoproyecto == "C-002" && anioid < 2018 && total != 31)){
                            opendialog(`VisorInformesSti.aspx?ReporteID=7900&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&IndiceAvance=${indiceAvance}&Razones=${razon}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=${correlativo}`)
                        } else if ((EsSupervisor && total == 28) || (EsSupervisor && total == 29) || (EsSupervisor && total == 30) || (EsSupervisor && total == 31)){
                            if (Tipo_Contrato == "") {
                                opendialog(`VisorInformesSti.aspx?ReporteID=5200&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=${correlativo}`)
                            } else {
                                opendialog(`VisorInformesSti.aspx?ReporteID=5200&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=${correlativo}&NoPeriodos=${NumeroPeriodos}`)
                            }
                        } else if ((EsSupervisor && total == 28) || (EsSupervisor && total == 29) || (EsSupervisor && total == 30) || EsSupervisor && total == 31){
                            if (Tipo_Contrato == "") {
                                opendialog(`VisorInformesSti.aspx?ReporteID=5200&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=${correlativo}`)
                            } else {
                                opendialog(`VisorInformesSti.aspx?ReporteID=5200&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=${correlativo}&NoPeriodos=${NumeroPeriodos}`)
                            }
                        } else if ((EsSupervisor && total == 28) || (EsSupervisor && total == 29) || (EsSupervisor && total == 30) || (EsSupervisor && total == 31)){
                            if (Tipo_Contrato == "") {
                                opendialog(`VisorInformesSti.aspx?ReporteID=5200&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=${correlativo}&NoPeriodos=${NumeroPeriodos}`)
                            } else {
                                opendialog(`VisorInformesSti.aspx?ReporteID=52001&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=${correlativo}`)
                            }
                        } else if ((codigoproyecto != comparacion && total == 28) || (codigoproyecto != comparacion && total == 29) || (codigoproyecto != comparacion && total == 30) || (codigoproyecto != comparacion && total == 31)){
                            if (codigoproyecto == "T-018") {
                                opendialog(`VisorInformesSti.aspx?ReporteID=5500&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&IndiceAvance=${indiceAvance}&Razones=${razon}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=${correlativo}&NoPeriodos=${NumeroPeriodos}`)
                            } else {
                                opendialog(`VisorInformesSti.aspx?ReporteID=5500&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&IndiceAvance=${indiceAvance}&Razones=${razon}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=${correlativo}&NoPeriodos=${NumeroPeriodos}`)
                            }
                            /*'Comento paolo para que el proyecto t-018 salga bien octubre 2016
                            'opendialog(`VisorInformesSti.aspx?ReporteID=5300&AnioID=${anioid}& "&ProyectoSupervisionCodigo=${codigoproyecto}& "&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}& "&Numeral=${numeral}& "&Clase=${clase}& "&Afianzadora=${afianzadora}& "&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}& "&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}& "&fechaescritura=${fechaescritura}&IndiceAvance=${indiceAvance}&Razones=${razon}&nombresupervisor=${nombreSupervisor}& "&empresasupervisora=${empresasupervisora}& "&poliza=${poliza}& "&EstimacionU=${correlativo}`)
                            'hasta aca
                            '} else if (codigoproyecto == comparacion && total != 28 || codigoproyecto == comparacion && total != 29 || codigoproyecto == comparacion && total != 30 || codigoproyecto == comparacion && total != 31){


                            '} else if (RTrim(IdSup(0).ToUpper()) == "SE" && total != 28 || RTrim(IdSup(0).ToUpper()) == "SE" && total != 29 || RTrim(IdSup(0).ToUpper()) == "SE" && total != 30 || RTrim(IdSup(0).ToUpper()) == "SE" && total != 31){*/
                        } else if ((EsSupervisor && total != 28) || (EsSupervisor && total != 29) || (EsSupervisor && total != 30) || (EsSupervisor && total != 31)){
                            if (Tipo_Contrato == "") {
                                opendialog(`VisorInformesSti.aspx?ReporteID=5400&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=${correlativo}`)
                            } else {
                                opendialog(`VisorInformesSti.aspx?ReporteID=54001&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=${correlativo}`)
                            }
                        } else if ((EsSupervisor && total != 28) || (EsSupervisor && total != 29) || (EsSupervisor && total != 30) || (EsSupervisor && total != 31)){
                            if (Tipo_Contrato == "") {
                                opendialog(`VisorInformesSti.aspx?ReporteID=5400&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=${correlativo}`)
                            } else {
                                opendialog(`VisorInformesSti.aspx?ReporteID=5200&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=${correlativo}&NoPeriodos=${NumeroPeriodos}`)
                            }
                        } else if ((codigoproyecto != comparacion && total != 28) || (codigoproyecto != comparacion && total != 29) || (codigoproyecto != comparacion && total != 30) || (codigoproyecto != comparacion && total != 31)){
                            if (Tipo_Contrato == "") {
                                opendialog(`VisorInformesSti.aspx?ReporteID=5500&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&IndiceAvance=${indiceAvance}&Razones=${razon}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=${correlativo}&NoPeriodos=${NumeroPeriodos}`)
                            } else {
                                //opendialog(`VisorInformesSti.aspx?ReporteID=5500&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&IndiceAvance=${indiceAvance}&Razones=${razon}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=${correlativo}&NoPeriodos=${NumeroPeriodos}`)
                                opendialog(`VisorInformesSti.aspx?NoPeriodos=${NumeroPeriodos}&poliza=${poliza}&EstimacionU=${correlativo}&ReporteID=5500&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&IndiceAvance=${indiceAvance}&Razones=${razon}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}`)
                            }
                        } else if ((EsSupervisor && total != 28) || (EsSupervisor && total != 29) || (EsSupervisor && total != 30) || (EsSupervisor && total != 31) || EsSupervisor){
                            if (Tipo_Contrato = "") {
                                opendialog(`VisorInformesSti.aspx?ReporteID=5400&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=${correlativo}`)
                            } else {
                                opendialog(`VisorInformesSti.aspx?ReporteID=5200&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=${correlativo}&NoPeriodos=${NumeroPeriodos}`)
                            }
                        }
                    } else if (estimacionUnica) {
                        if ((codigoproyecto == "C-001" && total == 28) || (codigoproyecto == "C-001" && total == 29) || (codigoproyecto == "C-001" && total == 30) || (codigoproyecto == "C-001" && total == 31)) {
                            opendialog(`VisorInformesSti.aspx?ReporteID=6300&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&IndiceAvance=${indiceAvance}&Razones=${razon}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=Unica`)
                        } else if ((codigoproyecto == "C-001" && total != 28) || (codigoproyecto == "C-001" && total != 29) || (codigoproyecto == "C-001" && total != 30) || (codigoproyecto == "C-001" && total != 31)) {
                            opendialog(`VisorInformesSti.aspx?ReporteID=9900&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&IndiceAvance=${indiceAvance}&Razones=${razon}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=Unica`)
                        } else if ((codigoproyecto == "C-002" && total == 28) || (codigoproyecto == "C-002" && total == 29) || (codigoproyecto == "C-002" && total == 30) || (codigoproyecto == "C-002" && total == 31)) {
                            opendialog(`VisorInformesSti.aspx?ReporteID=63001&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&IndiceAvance=${indiceAvance}&Razones=${razon}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=Unica`)
                        } else if ((codigoproyecto == "C-002" && total != 28) || (codigoproyecto == "C-002" && total != 29) || (codigoproyecto == "C-002" && total != 30) || (codigoproyecto == "C-002" && total != 31)) {
                            opendialog(`VisorInformesSti.aspx?ReporteID=7900&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&IndiceAvance=${indiceAvance}&Razones=${razon}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=Unica`)
                        } else if ((EsSupervisor && total == 28) || (EsSupervisor && total == 29) || (EsSupervisor && total == 30) || (EsSupervisor && total == 31)) {
                            if (Tipo_Contrato == "") {
                                opendialog(`VisorInformesSti.aspx?ReporteID=5200&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=Unica&NoPeriodos=${NumeroPeriodos}`)
                            } else {
                                opendialog(`VisorInformesSti.aspx?ReporteID=52001&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=Unica`)
                            }
                        } else if ((EsSupervisor && total == 28) || (EsSupervisor && total == 29) || (EsSupervisor && total == 30) || (EsSupervisor && total == 31)) {
                            if (Tipo_Contrato == "") {
                                opendialog(`VisorInformesSti.aspx?ReporteID=5200&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=Unica&NoPeriodos=${NumeroPeriodos}`)
                            } else {
                                opendialog(`VisorInformesSti.aspx?ReporteID=52001&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=Unica`)
                            }
                        } else if ((EsSupervisor && total == 28) || (EsSupervisor && total == 29) || (EsSupervisor && total == 30) || (EsSupervisor && total == 31)) {
                            if (Tipo_Contrato == "") {
                                opendialog(`VisorInformesSti.aspx?ReporteID=5200&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=Unica&NoPeriodos=${NumeroPeriodos}`)
                            } else {
                                opendialog(`VisorInformesSti.aspx?ReporteID=52001&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=Unica`)
                            }
                        } else if ((codigoproyecto != comparacion && total == 28) || (codigoproyecto != comparacion && total == 29) || (codigoproyecto != comparacion && total == 30) || (codigoproyecto != comparacion && total == 31)) {
                            opendialog(`VisorInformesSti.aspx?ReporteID=5300&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&IndiceAvance=${indiceAvance}&Razones=${razon}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=Unica`)
                        } else if ((EsSupervisor && total != 28) || (EsSupervisor && total != 29) || (EsSupervisor && total != 30) || (EsSupervisor && total != 31)) {
                            if (Tipo_Contrato == "") {
                                opendialog(`VisorInformesSti.aspx?ReporteID=5400&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=Unica`)
                            } else {
                                opendialog(`VisorInformesSti.aspx?ReporteID=54001&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=Unica`)
                            }
                        } else if ((EsSupervisor && total != 28) || (EsSupervisor && total != 29) || (EsSupervisor && total != 30) || (EsSupervisor && total != 31)) {
                            if (Tipo_Contrato == "") {
                                opendialog(`VisorInformesSti.aspx?ReporteID=5400&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=Unica`)
                            } else {
                                opendialog(`VisorInformesSti.aspx?ReporteID=54001&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=Unica`)
                            }
                        } else if ((EsSupervisor && total != 28) || (EsSupervisor && total != 29) || (EsSupervisor && total != 30) || (EsSupervisor && total != 31)) {
                            if (Tipo_Contrato == "") {
                                opendialog(`VisorInformesSti.aspx?ReporteID=5400&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=Unica`)
                            } else {
                                opendialog(`VisorInformesSti.aspx?ReporteID=54001&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=Unica`)
                            }
                        } else if ((codigoproyecto != comparacion && total != 28) || (codigoproyecto != comparacion && total != 29) || (codigoproyecto != comparacion && total != 30) || (codigoproyecto != comparacion && total != 31)) {
                            opendialog(`VisorInformesSti.aspx?ReporteID=5500&AnioID=${anioid}&ProyectoSupervisionCodigo=${codigoproyecto}&EstimacionCorr=${correlativo}&Fecha=${desde}&Clausula=${clausulaContrato}&Numeral=${numeral}&Clase=${clase}&Afianzadora=${afianzadora}&ckeckdelegado=${ckeckdelegado}&nombredelegado=${nombreCompletoDelegado}&EstadoContratista=${estadoContratista}&Justificacion=${justificacion}&fechaescritura=${fechaescritura}&IndiceAvance=${indiceAvance}&Razones=${razon}&nombresupervisor=${nombreSupervisor}&empresasupervisora=${empresasupervisora}&poliza=${poliza}&EstimacionU=Unica&NoPeriodos=${NumeroPeriodos}`)
                        }
                    }
                })
            })
        })
    })
})
function currency(numero, prefix='', sufix='') {
    return `${prefix}${parseInt(numero).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}${sufix}`;
}
function obtenerporcentajeproyecto2(callback) {
    // Cargar Obtenerporcentajeproyecto2
    $.ajax({
        url: `${urlbase}api/EstimacionAgregar/Obtenerporcentajeproyecto2/${anioID}/${codigoproyecto}/${correlativo}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            callback(val[0].IndiceAvance)
        },
        error: (val) => {
            console.log(val)
        }
    })
}
function obtenerNomEmpresaRpEstimaciones(callback){
    // Cargar Nombre Empresa
    $.ajax({
        url: `${urlbase}api/EstimacionAgregar/obtenerNomEmpresaRpEstimaciones/${anioID}/${codigoproyecto}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            callback(val[0].Nombre)
        },
        error: (val) => {
            console.log(val)
        }
    })
}
function obtenerTblProyectosTipoContrato(callback){
    // Cargar Tipo Contrato
    $.ajax({
        url: `${urlbase}api/EstimacionAgregar/obtenerTblProyectosTipoContrato/${anioID}/${codigoproyecto}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            if (val.length > 0){
                callback(val[0].Tipo_Contrato)
            } else {
                callback("")
            }
        },
        error: (val) => {
            console.log(val)
            callback("")
        }
    })
}
function opendialog(page){
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Recomendacion Pago Supervisor",
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