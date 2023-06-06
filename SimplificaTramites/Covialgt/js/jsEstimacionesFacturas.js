let table
let monto
let proyectoVacio = ['', '']
let confirmarAgregarFacturaTexto = ""
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
	// Cargar año
    $.ajax({
        url: `${urlbase}api/PlanAnual/Get`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            let cols = val.map((item) => `<option value="${item.AnioID}">${item.PlanAnualNombre}</option>`)
                .join("")
            $("#planSelect").append(cols).trigger("change")
            $("#anioSelect").append(cols)//.trigger("change")
        }
    })
    // Llenar catTipoFacturaSelect
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ConsultaCatTipoFacturaEstimacion`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            let cols = val.map((item) => `<option value="${item.IDCatTipoFactura}">${item.Descripcion}</option>`)
                .join("")
            $("#catTipoFacturaSelect").append(cols)
        }
    })
    // Llenar tipoFacturaSelect
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ConsultaTipoFacturaEstimacion`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            let cols = val.map((item) => `<option value="${item.IDTipoFacura}">${item.TipoFactura}</option>`)
                .join("")
            $("#tipoFacturaSelect").append(cols)
        }
    })
    $("#planSelect").on("change.select2", ({ currentTarget }) => {
        // Llenar lista de programas
        let plan = currentTarget.value
        $.ajax({
            url: `${urlbase}api/ActualizacionNOG/ObtenerProgramas/${plan}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                if (val.length == 0){
                    $("#programaSelect").empty()
                    return
                }
                let cols = val.map((item) => `<option value="${item.ID}">${item.ProgramaNombre}</option>`)
                    .join("")
                $("#programaSelect").empty().append(cols).trigger("change")
            }
        })
    })
    $("#programaSelect").on("change.select2", ({ currentTarget }) => {
        // Llenar lista de programas
        let anio = $("#planSelect").val()
        let programa = currentTarget.value
        let proyectoCodigo = "0"
        let rol = "TODOS"
        $.ajax({
            url: `${urlbase}api/AsignacionEncargadoProyecto/ObtnerListaFiltradaProyectoSEG/${programa}/${anio}/${proyectoCodigo}/${rol}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                if (val.length == 0){
                    $("#proyectoSelect").empty()
                    return
                }
                let cols = val.map((item) => `<option value="${item.ID}">${item.ProyectoDescripcion}</option>`)
                    .join("")
                $("#proyectoSelect").empty().append(cols).trigger("change")
            }
        })
    })
    $("#proyectoSelect").on("change.select2", ({ currentTarget }) => {
        // Llenar lista de estimaciones
        let anio = $("#planSelect").val()
        let [_538, Proyectocodigo] = currentTarget.value.split(",")
        $.ajax({
            url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtieneEstimacionesParaFactura/${anio}/${Proyectocodigo}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                if (val.length == 0){
                    $("#estimacionSelect").empty()
                    return
                }
                let cols = val.map((item) => `<option value="${item.Estimacioncorr}">${item.Est}</option>`)
                    .join("")
                $("#estimacionSelect").empty().append(cols).trigger("change")
            }
        })
    })
    $("#estimacionSelect").on("change.select2", ({ currentTarget }) => {
        // Llenar lista de facturas
        let EstimacionCorr = currentTarget.value
        // ObtieneTotalFacturasEstimacion
        consultarMonto(monto => {
            // console.log(monto)
            setTable()
        })
    })
    $("input.custom-control-input").click(function({ target }) {
    	switch(target.id) {
            case "customCheck1":
                $("#anioSelect").prop("disabled", false)
                $("#desdeInput").prop("disabled", true)
                $("#hastaInput").prop("disabled", true)
                break;
            case "customCheck2":
                $("#anioSelect").prop("disabled", true)
                $("#desdeInput").prop("disabled", false)
                $("#hastaInput").prop("disabled", false)
                break;
            default:
                break;
    	}
    })
    $("#btnAgregarFactura").click(function () {
        let montoInputTxt = $("#montoInput").val() || ''
        if (montoInputTxt.length == 0){
            swal.fire("", "FAVOR INGRESAR MONTO", "error")
            return
        }
        consultarMonto(monto => {
            if (monto < 0){
                swal.fire("", "FAVOR ELEGIR PLAN, PROYECTO Y ESTIMACIÓN", "error")
                return
            }
            let [_987, montoEstimacionStr, _] = $('#estimacionSelect>option:selected').text().split("Q.")
            let montoEstimacion = parseFloat(montoEstimacionStr)
            let montoInput = parseFloat(montoInputTxt)
            let suma = monto + montoInput
            if (suma > montoEstimacion) {
                swal.fire("", "El valor de la factura sobrepasa el monto de la Estimacion", "error")
                return
            } else {
                let Anioid = $("#planSelect").val() || ''
                let [_2, Proyectocodigo] = $("#proyectoSelect").val()?.split(",") || proyectoVacio
                let estimacion = $('#estimacionSelect').val() || ''
                let SerieFactura = $("#serieInput").val() || ''
                let NoFactura = $("#facturaInput").val() || 0
                if (isNaN(parseInt(NoFactura))){
                    swal.fire("", "FAVOR INGRESAR NO. FACTURA UNICAMENTE CON DIGITOS", "error")
                    return
                }
                let observaciones = $("#observacionesInput").val() || ''
                let tipoFactura = $("#tipoFacturaSelect").val() || ''
                let catTipoFactura = $("#catTipoFacturaSelect").val() || ''
                if (Anioid.length == 0 || Proyectocodigo.length == 0 || estimacion.length == 0 || SerieFactura.length == 0 || NoFactura.length == 0){
                    swal.fire("", "FAVOR INGRESAR ESTIMACION, NO NUMERO Y SERIE", "error")
                    return
                }
                if (observaciones.length == 0 || tipoFactura.length == 0 || catTipoFactura.length == 0){
                    swal.fire("", "FAVOR INGRESAR OBSERVACIONES, TIPO Y REGIMEN DE FACTURA", "error")
                    return
                }
                Swal.fire({
                    title: "Favor confirmar",
                    text: confirmarAgregarFacturaTexto,
                    icon: "warning",
                    showDenyButton: true, showCancelButton: false,
                    confirmButtonText: `Si`,
                    denyButtonText: `No`,
                }).then((result) => {
                    if (!result.isConfirmed) {
                        return
                    }
                    revisarEstimacionFacturaExistente(Anioid, Proyectocodigo, SerieFactura, NoFactura, conteo => {
                        if (conteo == 0){
                            let data = {
                                Anio: Anioid,
                                ProyectoCodigo: Proyectocodigo,
                                EstimacionCorrel: estimacion,
                                Serie: SerieFactura,
                                NoFactura: NoFactura,
                                Monto: montoInput,
                                Observacion: observaciones,
                                IdTipoFactura: tipoFactura,
                                IdCatTipoFactura: catTipoFactura,
                                UsuarioID: user,
                                FechaFactura: todayDate(),
                            }
                            agregatblEstimacionesFacturas(data, () => {
                                setTable()
                                borrarTextos()
                                swal.fire("", "FACTURA ALMACENADA EXITOSAMENTE", "success")
                                $("#lblSaldo").val("")
                            })
                        } else {
                            swal.fire("", "REGISTRO DE FACTURA REPETIDO, DEBE INGRESAR OTRO NUMERO Y SERIE", "error")
                            return
                        }
                    })
                });
            }
        })
    })
    $("#btnGenerarInforme").click(function() {
        let reporteID = parseInt($('input:radio[name=informe]:checked').val())
        switch(reporteID){
            case 1:
                let anio = $("#anioSelect").val() || ''
                if (anio.length == 0) {
                    Swal.fire("Atención", "Deben completarse los datos requeridos para la generación de reporte", "error")
                    return
                }
                opendialog(`/visorinformes.aspx?IdReporte=112&Parameters=${anio},1900-01-01,1900-01-01,1`)
                // console.log(`/visorinformes.aspx?IdReporte=112&Parameters=${anio},1900-01-01,1900-01-01,1`)
                break;
            case 2:
                let desde = moment($('#desdeInput').val(), "DD-MM-YYYY").isValid() ? $("#desde-dp").datetimepicker("date").format("YYYY-MM-DD") : ''
                let hasta = moment($('#hastaInput').val(), "DD-MM-YYYY").isValid() ? $("#hasta-dp").datetimepicker("date").format("YYYY-MM-DD") : ''
                if (desde.length == 0 || hasta.length == 0) {
                    Swal.fire("Atención", "Deben completarse los datos requeridos para la generación de reporte", "error")
                    return
                }
                opendialog(`/visorinformes.aspx?IdReporte=112&Parameters=2000,${desde},${hasta},2`)
                // console.log(`/visorinformes.aspx?IdReporte=112&Parameters=${desde},${hasta},2`)
                break;
            default:
                break;
        }
    })
    $("#trabajosAdmon-table").on("click", ".table_edit_anular-btn", ({ currentTarget }) => {
        let tr = $(currentTarget).closest("tr")
        let factura = tr.data("item")
        if (!rolpermitido) {
            swal.fire("", "NO TIENE PERMISO PARA ANULAR FACTURAS", "error")
        }
        // Confirmar anular
        fnAnularFactura({
            Anio: factura.AnioID,
            ProyectoCodigo: factura.ProyectoCodigo,
            EstimacionCorrel: factura.EstimacionCorr,
            FacturaCorrel: factura.FacturaCorr
        }, {
            Serie: factura.Serie,
            NoFactura: factura.NoFactura
        }, () => {
            // tr.remove()
            let nuevoEstado = "Factura Anulada"
            tr.data("item", {
                ...factura,
                Estado: nuevoEstado
            })
            tr.children(":nth-child(11)").text(nuevoEstado)
            tr.children(":nth-child(2)").html(createButtonWrapperEdit(["edit", "activar", "delete"]))
        })
    })
    $("#trabajosAdmon-table").on("click", ".table_edit_activar-btn", ({ currentTarget }) => {
        let tr = $(currentTarget).closest("tr")
        let factura = tr.data("item")
        if (!rolpermitido) {
            swal.fire("", "NO TIENE PERMISO PARA ACTIVAR FACTURAS", "error")
        }
        fnActivarFactura({
            Anio: factura.AnioID,
            ProyectoCodigo: factura.ProyectoCodigo,
            EstimacionCorrel: factura.EstimacionCorr,
            FacturaCorrel: factura.FacturaCorr
        }, () => {
            let nuevoEstado = "Factura Activa"
            tr.data("item", {
                ...factura,
                Estado: nuevoEstado
            })
            tr.children(":nth-child(11)").text(nuevoEstado)
            tr.children(":nth-child(2)").html(createButtonWrapperEdit(["edit", "anular", "delete"]))
        })
    })
    $("#trabajosAdmon-table").on("click", ".table_edit_delete-btn", ({ currentTarget }) => {
        let tr = $(currentTarget).closest("tr")
        let factura = tr.data("item")
        if (!rolpermitido) {
            swal.fire("", "NO TIENE PERMISO PARA BORRAR FACTURAS", "error")
        }
        // Confirmar borrar
        fnBorrarFactura({
            Anio: factura.AnioID,
            ProyectoCodigo: factura.ProyectoCodigo,
            EstimacionCorrel: factura.EstimacionCorr,
            FacturaCorrel: factura.FacturaCorr
        }, {
            Serie: factura.Serie,
            NoFactura: factura.NoFactura
        }, () => {
            tr.remove()
        })
    })
    $("#montoInput").on("change", ({ currentTarget }) => {
        let montoInputTxt = $(currentTarget).val() || ''
        consultarMonto(monto => {
            if (monto < 0){
                swal.fire("", "FAVOR ELEGIR PLAN, PROYECTO Y ESTIMACIÓN", "error")
                return
            }
            let [_789, montoEstimacionStr, _] = $('#estimacionSelect>option:selected').text().split("Q.")
            let montoEstimacion = parseFloat(montoEstimacionStr)
            let montoInput = parseFloat(montoInputTxt)
            let suma = monto + montoInput
            if (suma > montoEstimacion) {
                let texto = `Saldo de la Estimacion por Facturar : ${currency(montoEstimacion - suma, 'Q.')}`
                $("#lblSaldo").text(texto)
                confirmarAgregarFacturaTexto = `${texto}, esta seguro que desea guardar la Factura?`
            } else {
                let texto = `Saldo de la Estimacion por Facturar : ${currency(montoEstimacion - suma, 'Q.')}`
                $("#lblSaldo").text(texto)
                confirmarAgregarFacturaTexto = `${texto}, esta seguro que desea guardar la Factura?`
            }
        })
    })
})
function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Ingreso de Facturas",
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
function setTable() {
    let Anioid = $("#planSelect").val() || ''
    let [_212, Proyectocodigo] = $("#proyectoSelect").val()?.split(",") || proyectoVacio
    let EstimacionCorr = $("#estimacionSelect").val() || ''
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtenerFacturasXProyectoEstimacion/${Anioid}/${Proyectocodigo}/${EstimacionCorr}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            if (table){
                table.destroy()
                table.clear()
            }
            let tbody = $("#trabajosAdmon-table tbody")
            tbody.html(null)
            let rows = val.map((item) => {
                let tr = $(`
                     <tr>
                        <td class="spacer"></td>
                        <td>
                            ${createButtonWrapperEdit(["edit", item.Estado.includes("Activa") ? "anular" : "activar", "delete"])}
                        </td>
                        <td class="text-center">${item.EstimacionCorr}</td>
                        <td class="text-center">${item.FacturaCorr}</td>
                        <td>${createFormWrapperEdit(item.SerieD, "SerieD", "frdecimal-mask")}</td>
                        <td class="text-center">${createFormWrapperEdit(item.NoFacturaD, "NoFacturaD")}</td>
                        <td class="text-center">${createFormWrapperEdit(currency(item.MontoD, 'Q.'), "MontoD")}</td>
                        <td class="text-center">${item.Observacion}</td>
                        <td class="text-center">${item.Regimen}</td>
                        <td class="text-center">${item.Descripcion}</td>
                        <td class="text-center">${item.Estado}</td>
                        <td class="spacer"></td>
                    </tr>
                `)
                tr.data("item", item)
                return tr
            })
            tbody.append(rows)
            table = fnInicializaTableEstimaciones()
        }
    })
}
function fnInicializaTableEstimaciones() {
    return $('#estimaciones-table').DataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin estimaciones para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Estimaciones",
            "infoEmpty": "Mostrando 0 de 0 de 0 Estimaciones",
            "infoFiltered": "(Filtrado de _MAX_ total Estimaciones)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Estimaciones",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay estimaciones encontradas",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}
function currency(numero, prefix='', sufix='') {
    let n = parseFloat(numero)
    let negativo = n < 0 ? '-' : ''
    let cantidad = Math.abs(n)
    return `${negativo}${prefix}${cantidad.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}${sufix}`;
}
function formatDateNew(fecha) {
    if (!fecha)
        return '';
    var today = new Date(fecha);
    var dd = PadLeft(today.getDate());
    var mm = PadLeft(today.getMonth()+1);
    var yyyy = today.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
}
function todayDate() {
    let today = new Date();
    let dd = PadLeft(today.getDate());
    let mm = PadLeft(today.getMonth()+1);
    let yyyy = today.getFullYear();
    return yyyy + '/' + mm + '/' + dd;
}
function PadLeft(value, length=2) {
    return (value.toString().length < length) ? PadLeft("0" + value, length) : value;
}
function fnAnularFactura(data, anexos, callback) {
    Swal.fire({
        title: "Favor confirmar",
        text: `¿Desea anular la factura serie "${anexos.Serie}" No. ${anexos.NoFactura}?`,
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    })
    .then((result) => {
        if (result.isConfirmed) {
            $.LoadingOverlay("show")
            $.ajax({
                url: `${urlbase}api/ConsultaEstimacionesDetallada/EliminaEstimacionFactura`,
                method: "post",
                data: JSON.stringify(data),
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                success: (val) => {
                    $.LoadingOverlay("hide");
                    Swal.fire("Éxito", "Factura anulado correctamente", "success");
                    callback()
                },
                error: (error) => {
                    $.LoadingOverlay("hide");
                    Swal.fire("", error.message + " ", "error");
                }
            })
        }
    });
}
function fnActivarFactura(data, callback) {
    $.LoadingOverlay("show")
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ActivaEstimacionFactura`,
        method: "post",
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "Factura activada correctamente", "success");
            callback()
        },
        error: (error) => {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "error");
        }
    })
}
function fnBorrarFactura(data, anexos, callback) {
    Swal.fire({
        title: "Favor confirmar",
        text: `¿Desea borrar la factura serie "${anexos.Serie}" No. ${anexos.NoFactura}?`,
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    })
    .then((result) => {
        if (result.isConfirmed) {
            $.LoadingOverlay("show")
            $.ajax({
                url: `${urlbase}api/ConsultaEstimacionesDetallada/BorrarEstimacionFactura`,
                method: "post",
                data: JSON.stringify(data),
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                success: (val) => {
                    $.LoadingOverlay("hide");
                    Swal.fire("Éxito", "Factura eliminada correctamente", "success");
                    callback()
                },
                error: (error) => {
                    $.LoadingOverlay("hide");
                    Swal.fire("", error.message + " ", "error");
                }
            })
        }
    });
}
function consultarMonto(callback){
    let plan = $("#planSelect").val() || ''
    let [_798, proyectoCodigo] = $("#proyectoSelect").val()?.split(",") || proyectoVacio
    let estimacion = $("#estimacionSelect").val() || ''
    if (plan.length == 0 || proyectoCodigo.length == 0 || estimacion.length == 0){
        return callback(-1)
    }
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtieneTotalFacturasEstimacion/${plan}/${proyectoCodigo}/${estimacion}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            if (val.length == 0){
                return callback(0)
            }
            let monto = val[0].Monto
            return callback(monto)
        },
        error: () => {
            return callback(-1)
        }
    })
}
function revisarEstimacionFacturaExistente(Anioid, Proyectocodigo, SerieFactura, NoFactura, callback){
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/RevisarEstimacionFacturaExistente/${Anioid}/${Proyectocodigo}/${SerieFactura}/${NoFactura}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            if (val.length == 0){
                return callback(0)
            }
            let conteo = val[0].Conteo
            return callback(conteo)
        },
        error: () => {
            return callback(-1)
        }
    })
}
function borrarTextos() {
    $("#serieInput").val("")
    $("#facturaInput").val("")
    $("#montoInput").val("")
    $("#observacionesInput").val("")
}
saveInputEditTableButtons = (row, items, olds) => {
    let table = row.closest("table").attr('id')
    item = $(row).data("item")
    let opt = null
    switch (table) {
        case "trabajosAdmon-table":
            let {
                SerieD,
                NoFacturaD,
                MontoD
            } = items
            let {
                AnioID,
                ProyectoCodigo,
                EstimacionCorr,
                FacturaCorr
            } = item
            let monto = MontoD.replace(/^Q\.?/i, "").replace(/[,\s]/gi, "").replace(/\.(?=\d+\.\d+$)/g, "")
            let nuevoMonto = parseFloat(monto)
            if (isNaN(nuevoMonto) || monto.match(/[a-z]/i)){
                Swal.fire("", "Monto incorrecto.", "error")
                return
            }
            revisarEstimacionFacturaExistente(AnioID, ProyectoCodigo, SerieD, NoFacturaD, conteo => {
                let data
                if (conteo == 0){
                    data = {
                        Anioid: AnioID,
                        Proyectocodigo: ProyectoCodigo,
                        EstimacionCorr: EstimacionCorr,
                        FacturaCorr: FacturaCorr,
                        NoFactura: NoFacturaD,
                        Serie: SerieD,
                        Monto: nuevoMonto,
                    }
                } else {
                    swal.fire("", "REGISTRO DE FACTURA REPETIDO, DEBE INGRESAR OTRO NUMERO Y SERIE", "error")
                    data = {
                        Anioid: AnioID,
                        Proyectocodigo: ProyectoCodigo,
                        EstimacionCorr: EstimacionCorr,
                        FacturaCorr: FacturaCorr,
                        NoFactura: "",
                        Serie: "",
                        Monto: 0
                    }
                }
                actualizaDatoFacturaPagoEstimaciones(data, () => {
                    setTable()
                })
            })
            break;
        default:
            alert(`${table} no implementado`)
    }
}
function actualizaDatoFacturaPagoEstimaciones(data, callback){
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ActualizaDatoFacturaPagoEstimaciones`,
        method: 'POST',
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: () => callback()
    })
}
function agregatblEstimacionesFacturas(data, callback){
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/AgregatblEstimacionesFacturas`,
        method: 'POST',
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: () => callback()
    })
}