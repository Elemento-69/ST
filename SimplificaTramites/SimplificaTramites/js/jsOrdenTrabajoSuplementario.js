$("body").keydown("input", function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        $(event.currentTarget.dataset.submitbutton).click()
        return false;
    }
});
$("select").select2({ theme: "bootstrap" })
$("#FechaPresentacion-dp").datetimepicker({
    format: 'DD/MM/YYYY'
})
$("#plazo-check").on("change", ({ currentTarget }) => {
    $("#DiasAfectados").attr("disabled", !currentTarget.checked)
    if (!currentTarget.checked) $("#DiasAfectados").val(null)
})

const setRenglonTotal = () => {
    let total = 0
    $("#cantidadAsociacion-table tbody .subtotal").each((_, val) => {
        total += parseFloat(val.value)
    })
    $("#cantidadAsociacion-table tfoot .total").val(total)
}

const setAsociacionRenglonTotal = () => {
    let total = 0
    $("#renglones-table tbody .subtotal").each((_, val) => {
        total += parseFloat(val.value)
    })
    $("#renglones-table tfoot .total").val(total)
}

let DocCambio = null
if (docCambioId) {
    docCambioId = parseFloat(docCambioId)
    $.ajax({
        url: `${urlbase}api/DocumentosCambio/GetUnDocumentoCambioaEditar/${docCambioId}/${plan}/${proyecto}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            DocCambio = val[0]
            $("#Correlativo").val(DocCambio.DocCambioCorrel)
            $("#Plan").val(DocCambio.AnioId)
            $("#Programa").val(DocCambio.PlanAnualNombre)
            $("#Proyecto").val(DocCambio.ProyectoDescripcion)
            $("#Estado").val(DocCambio.Estado)
            $("#Aprobado").prop("checked", DocCambio.DocCambioAprobado)
            $("#monto_desc").val(DocCambio.MontoDocCambio)
            $("#FechaPresentacion-dp").datetimepicker('date', moment(DocCambio.FechaPresentacion))
            $("#Clausula").val(DocCambio.Clausula)
            $("#Justificacion").val(DocCambio.DocCambioJustifica)
            $("#anexo-check").prop("checked", DocCambio.ModificaAnexo)
            $("#plazo-check").prop("checked", DocCambio.ModificaPlazo).trigger("change")
            $("#DiasAfectados").val(DocCambio.DiasDocCambio)
            $("#ComentarioEstado").val(DocCambio.ComentarioEstado)
            if (DocCambio.CodigoCert && DocCambio.CodigoCert !== "ne") {
                $("#TieneCertificacion").attr("checked", DocCambio.CodigoCert).trigger("change")
                if ($(`#Certificacion option[value='${DocCambio.CodigoCert}']`).length > 0)
                    $("#Certificacion").val(DocCambio.CodigoCert)
                else {
                    $("#otraCertificacionCheck").prop("checked", true).trigger("change")
                    $("#CertificacionNueva").val(DocCambio.CodigoCert)
                }
            }
        }
    })
    $.ajax({
        async: false,
        url: `${urlbase}api/DocumentosCambio/GetDetalleRenglonesTramos_EditarATE/${plan}/${proyecto}/${docCambioId}/editar`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let renglones = {}
            let tramos = {}
            val.forEach((item) => {
                if (!renglones[item.RenglonID]) {
                    renglones[item.RenglonID] = {
                        nombre: item.ProyectoRenglonNombre,
                        cantidad: item.CantidadTramo,
                        precio: item.TramoPrecioUnitario,
                        componente: item.ComponenteDesc,
                        item: {
                            AnioID: item.AnioId,
                            ComponenteCorrel: item.ComponenteCorrel,
                            DocCambioCorrel: item.DocCambioCorrel,
                            ProyectoCodigo: item.ProyectoCodigo,
                            ProyectoRenglonNombre: item.ProyectoRenglonNombre,
                            RenglonCodCOVIAL: item.RenglonCodCOVIAL,
                            RenglonDesc: item.ProyectoRenglonNombre,
                            RenglonID: item.RenglonID,
                            UserName: null,
                        }
                    }
                } else {
                    renglones[item.RenglonID].cantidad += item.CantidadTramo
                }

                if (!tramos[item.TramoID]) {
                    tramos[item.TramoID] = {
                        "TramoID": item.TramoID,
                        "TramoCodigo": item.TramoCodigo,
                        "TramoDesc": item.TramoDesc,
                        "cantidad": item.CantidadTramo
                    }
                } else {
                    tramos[item.TramoID].cantidad += item.CantidadTramo
                }
                let row = setTramoAsociationRow(item.ComponenteDesc, item.ProyectoRenglonNombre, item.TramoDesc, item.TramoPrecioUnitario, item.CantidadTramo)
                row.data("renglonId", item.RenglonID)
                row.data("tramoId", item.TramoID)
                let tramo = {
                    AnioID: item.AnioId,
                    DocCambioCorrel: item.DocCambioCorrel,
                    ProyectoCodigo: item.ProyectoCodigo,
                    TramoCodigo: "",
                    TramoDesc: item.TramoDesc,
                    TramoID: item.TramoID,
                    UserName: ""
                }
                row.data("item", item)
                row.data("tramo", tramo)
                $("#cantidadAsociacion-table tbody").append(row)
                let col = $(`<option value="${tramo.TramoID}">${tramo.TramoDesc}</option>`)
                col.data("item", tramo)
                col.data("used", item.CantidadTramo)
            })
            for (renglonId in renglones) {
                let renglon = renglones[renglonId]
                let rowAsign = setRenglonRow(renglon.componente, renglon.nombre, renglon.precio, renglon.cantidad)
                rowAsign.data("renglonId", renglonId)
                rowAsign.data("renglon", renglon.item)
                $("#renglones-table tbody").append(rowAsign)
                // create option on last table
                let option = $(`<option value="${renglon.item.RenglonCodCOVIAL}">${renglon.nombre}</option>`)
                option.data("vals", { precio: renglon.precio, cantidad: renglon.cantidad, item: renglon })
                option.data("renglon", renglon.item)
                option.data("componente", $("#Componente option:selected").data("componente"))
                option.data("used", renglon.cantidad)
                $("#Renglon-tramo").append(option).trigger("change")
            }
            setTimeout(setRenglonTotal, 0)
            setTimeout(setAsociacionRenglonTotal, 0)
            initMasks()
        }
    })
}

function validateEditTable(row, inputs) {
    let table = row.closest("table").attr('id')
    let inputCant = null
    switch (table) {
        case "renglones-table":
            item = $(row).data("renglon")
            inputCant = inputs.filter('[name="cantidad"]')
            inputCant.parent().find(".invalid-feedback").remove()
            inputCant.removeClass("is-invalid")
            let option = $($("#Renglon-tramo").find(`option[value="${item.RenglonCodCOVIAL}"]`))
            if (option.data("used") > parseFloat(inputCant.inputmask('unmaskedvalue'))) {
                inputCant.after(`<div  class="invalid-feedback">La cantidad no puede ser menor a la que se está usando (${option.data("used")})</div>`)
                inputCant.addClass("is-invalid")
                return false
            }
            return true
        case "cantidadAsociacion-table":
            item = $(row).data("tramo")
            let renglon = $(row).data("item")
            inputCant = inputs.filter('[name="cantidad"]')
            inputCant.parent().find(".invalid-feedback").remove()
            inputCant.removeClass("is-invalid")
            let $renglon = $(`#Renglon-tramo option[value="${renglon.RenglonCodCOVIAL}"]`)
            let vals = $renglon.data("vals")
            let used = $renglon.data("used")
            let existing = parseFloat(vals.cantidad)
            let oldValue = parseFloat(row.find(".table_edit_cantidad-name").inputmask('unmaskedvalue'))
            let newUsed = used - oldValue + parseFloat(inputCant.inputmask('unmaskedvalue'))
            if (newUsed > existing) {
                inputCant.after(`<div class="invalid-feedback">La cantidad no puede ser mayor a la asignada (${existing})</div>`)
                inputCant.addClass("is-invalid")
                return false
            }
            $renglon.data("used", newUsed)
            return true
        default:
            return true
    }
}

saveInputEditTableButtons = (row, items, olds) => {
    let table = row.closest("table").attr('id')
    item = $(row).data("item")
    let opt = null
    let subtotal = null
    switch (table) {
        case "renglones-table":
            item = $(row).data("renglon")
            let precio = parseFloat(row.find(".precio-table").inputmask('unmaskedvalue'))
            subtotal = precio * items.cantidad
            row.find(".subtotal").val(subtotal)
            row.find(".table_edit_cantidad-name").val(items.cantidad)
            opt = $("#Renglon-tramo").find(`option[value="${item.RenglonCodCOVIAL}"]`)
            opt.data("vals", { precio: precio, cantidad: items.cantidad, item: item })
            $("#Renglon-tramo").trigger("change")
            let tramoAsociation_rows = $("#cantidadAsociacion-table tbody tr").filter((_, row) => $(row).data("renglonId") === item.RenglonID)
            tramoAsociation_rows.each((_, tramoRow) => {
                tramoRow = $(tramoRow)
                subtotal = parseFloat(precio) * tramoRow.find(".table_edit_cantidad-name").inputmask('unmaskedvalue')
                tramoRow.find(".subtotal").val(subtotal)
            })
            setTimeout(setAsociacionRenglonTotal, 0)
            initMasks()
            break;
        case "cantidadAsociacion-table":
            subtotal = parseFloat(row.find(".precio-table").inputmask('unmaskedvalue')) * items.cantidad
            row.find(".subtotal").val(subtotal)
            row.find(".table_edit_cantidad-name").val(items.cantidad)
            opt = $("#Renglon-tramo").find(`option[value=${item.RenglonID}]`)
            used = opt.data("used")
            let oldValue = parseFloat(olds.cantidad)
            opt.data("used", used - oldValue + parseFloat(items.cantidad))
            $("#Renglon-tramo").trigger("change")
            setTimeout(setRenglonTotal, 0)
            break;
        default:
            alert(`${table} no implementado`)
    }
}

function updateLastTotal() {
    let subtotals = $("#cantidadAsociacion-table tbody .subtotal")
    total = 0
    subtotals.each((_, val) => {
        total += parseFloat(val.value)
    })
    $("#cantidadAsociacion-table").val(total)
}

$("#TieneCertificacion").on("change", ({ currentTarget }) => {
    $("#otraCertificacionCheck")[0].checked = false
    $("#otraCertificacionCheck").trigger("change")
    $(".cert-form").attr("disabled", !currentTarget.checked)
})

$("#otraCertificacionCheck").on("change", ({ currentTarget }) => {
    $("#CertificacionNueva").attr("disabled", !currentTarget.checked)
    $("#Certificacion").attr("disabled", currentTarget.checked)
})

$.ajax({
    url: `${urlbase}api/DocumentosCambio/GetCertificaSinDocumento/${plan}/${proyecto}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        val.forEach((item) => {
            let col = $(`<option value="${item.CodigoCert}">${item.CodigoCert}</option>`)
            col.data("item", item)
            $("#Certificacion").append(col).trigger("change")
        })
    }
})

$.ajax({
    url: `${urlbase}api/DocumentosCambio/GetProyectosTramos/${plan}/${proyecto}/254`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        val.forEach((item) => {
            let row = setTramoRow(item.TramoID, item.TramoDesc)
            row.data("item", item)

            $("#tramos-table tbody").append(row)
            let option = $(`<option value="${item.TramoID}">${item.TramoDesc}</option>`)
            option.data("tramo", item)
            option.data("componente", $("#Componente option:selected").data("componente"))

            option.data("used", $(`#tramos option[value=${item.TramoID}]`).data("used") | 0)
            $("#tramo-cantidad").append(option)
        })
        $("#tramo-cantidad").trigger("change")
    }
})

$.ajax({
    url: `${urlbase}api/DocumentosCambio/GetProyectosTramosOTS/${plan}/${proyecto}/${proyecto.split("-")[0]}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        val.forEach((item) => {
            let aso_tramo = $("#tramos-table tbody tr").filter((_, row) => parseInt($(row).data("item").TramoID) === item.TramoID)
            if (aso_tramo.length === 0) {
                let col = $(`<option value="${item.TramoID}">${item.TramoDesc}</option>`)
                col.data("item", item)
                $("#Tramo").append(col)
            }
        })
        $("#Tramo").trigger("change")
    }
})

$("#tramos-add_btn").on("click", () => {
    let item = $("#Tramo option:selected").data("item")
    let row = setTramoRow(item.TramoID, item.TramoDesc)
    row.data("item", item)
    $("#Tramo option:selected").remove()
    $("#tramos-table tbody").append(row)
    let option = $(`<option value="${item.TramoID}">${item.TramoDesc}</option>`)
    option.data("tramo", item)
    option.data("componente", $("#Componente option:selected").data("componente"))
    option.data("used", 0)
    $("#tramo-cantidad").append(option).trigger("change")
})

$("#tramos-table tbody").on("click", ".del", ({ currentTarget }) => {
    let row = $(currentTarget).closest("tr")
    let item = row.data("item")
    let option = $("#tramo-cantidad option").filter((_, el) =>
        $(el).data("tramo").TramoID === item.TramoID)
    if (option.data("used") > 0) {
        swal.fire("Error", "Elimine este renglon del ultimo paso para poder proseguir con la eliminación", "error")
        return
    }
    let col = $(`<option value="${item.TramoID}">${item.TramoDesc}</option>`)
    col.data("item", item)
    $("#Tramo").append(col)
    option.remove()
    row.remove()
})

$.ajax({
    url: `${urlbase}api/DocumentosCambio/GetComponentesRenglonesOTS/${plan}/${proyecto}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        val.forEach((item) => {
            let col = $(`<option value="${item.ComponenteCorrel}">${item.ComponenteDesc}</option>`)
            col.data("componente", item)
            $("#Componente").append(col.clone()).trigger("change")
            $("#Componente-cantidad").append(col).trigger("change")
        })
    }
})

$.ajax({
    url: `${urlbase}api/DocumentosCambio/GetProyectosRenglonesOTS/${plan}/${proyecto}/0`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        val.forEach((item) => {
            let existentRow = $("#renglones-table tbody tr").filter(function () {
                return parseInt($(this).data("renglonId")) === item.RenglonID
            })
            if (existentRow.length > 0) return
            let col = $(`<option value="${item.RenglonID}">${item.ProyectoRenglonNombre}</option>`)
            col.data("item", item)
            $("#Renglon").append(col).trigger("change")
        })
    }
})

$.ajax({
    url: `${urlbase}api/DocumentosCambio/GetProyectosRenglonesOTS/${plan}/${proyecto}/0`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        val.forEach((item) => {
            let existentRow = $("#renglones-table tbody tr").filter(function () {
                return parseInt($(this).data("renglonId")) === item.RenglonID
            })
            if (existentRow.length > 0) return
            let col = $(`<option value="${item.RenglonID}">${item.ProyectoRenglonNombre}</option>`)
            col.data("item", item)
            $("#Renglon").append(col).trigger("change")
        })
    }
})

$("#renglon-add_btn").on("click", () => {
    $(".asociarRenglonRow").removeClass("is-invalid")
    let $precio = $("#Precio")
    let $cantidad = $("#CantidadRenglon")
    let invalid = false
    if (!$precio.val()) {
        invalid = true
        $precio.addClass("is-invalid")
    }
    if (!$cantidad.val()) {
        invalid = true
        $cantidad.addClass("is-invalid")
    }
    if (invalid) return
    let componente = $("#Componente option:selected").html()
    let $renglon = $("#Renglon option:selected")
    let row = setRenglonRow(componente, $renglon.html(), $precio.inputmask('unmaskedvalue'), $cantidad.inputmask('unmaskedvalue'))
    let item = $renglon.data("item")
    row.data("renglon", item)
    $("#renglones-table tbody").append(row)
    let option = $(`<option value="${item.RenglonCodCOVIAL}">${item.ProyectoRenglonNombre}</option>`)
    option.data("vals", { precio: $precio.inputmask('unmaskedvalue'), cantidad: $cantidad.inputmask('unmaskedvalue'), item: item })
    option.data("renglon", item)
    option.data("componente", $("#Componente-set option:selected").data("componente"))
    option.data("used", 0)
    $cantidad.val(null)
    $renglon.remove()
    $("#Renglon").trigger("change")
    $("#Renglon-tramo").append(option)
    $("#Renglon-tramo").trigger("change")
    setTimeout(setAsociacionRenglonTotal, 0)
    initMasks("#renglones-table")
})

$("#asociacion-addBtn").on("click", () => {
    let $cant = $("#Cantidad")
    $cant.removeClass("is-invalid")
    $cant.parents().find(".invalid-feedback").remove()
    if (!$cant.val()) {
        $cant.addClass("is-invalid")
        return
    }
    let option = $($("#Renglon-tramo").find("option:selected"))
    let vals = option.data("vals")
    let old_used = option.data("used")
    let used = parseFloat($cant.inputmask('unmaskedvalue'))
    let $tramos = $("#tramo-cantidad").find("option:selected")
    $tramos.data("used", ($tramos.data("used") || 0) + 1)
    const cantidadParsed = parseFloat(vals.cantidad)
    if (used === 0 || cantidadParsed < (old_used + used)) {
        $cant.after(`<div  class="invalid-feedback">La cantidad no puede ser 0 ó mayor al total disponible del renglon (${vals.cantidad - old_used}/${vals.cantidad})</div>`)
        $cant.addClass("is-invalid")
        return
    }
    let row = setTramoAsociationRow($("#Componente-cantidad").find("option:selected").html(), option.html(), $tramos.html(), vals.precio, $cant.inputmask('unmaskedvalue'))
    row.data("item", vals.item)
    row.data("tramo", $tramos.data("tramo"))
    $("#cantidadAsociacion-table tbody").append(row)
    option.data("used", old_used + used)
    initMasks("#cantidadAsociacion-table")
    $("#Renglon-tramo").trigger("change")
    $cant.val(0)
    setTimeout(setRenglonTotal, 0)
})

$("#renglones-table tbody").on("click", ".table_edit_delete-btn", ({ currentTarget }) => {
    item = $(currentTarget).closest("tr").data("renglon")
    let nextPageValue = $("#Renglon-tramo").find(`option[value="${item.RenglonCodCOVIAL}"]`).data("used")
    if (nextPageValue > 0.0000001) {
        swal.fire("Error", "Elimine este renglon del paso 3 para poder proseguir con la eliminación", "error")
        return
    }
    let col = $(`<option value="${item.RenglonID}">${item.ProyectoRenglonNombre}</option>`)
    col.data("item", item)
    $("#Renglon").append(col).trigger("change")
    $(currentTarget).closest("tr").remove()
    $("#Renglon-tramo").find(`option[value="${item.RenglonCodCOVIAL}"]`).remove()
    setTimeout(setAsociacionRenglonTotal, 0)
})

$("#cantidadAsociacion-table").on("click", ".table_edit_delete-btn", ({ currentTarget }) => {
    let $cant = $("#Cantidad")
    $cant.removeClass("is-invalid")
    $cant.parents().find(".invalid-feedback").remove()
    item = $(currentTarget).closest("tr").data("item")
    let opt = $("#Renglon-tramo").find(`option[value="${item.RenglonCodCOVIAL}"]`)
    let rowUsed = $(currentTarget).closest("tr").find(".table_edit_cantidad-name").inputmask('unmaskedvalue')
    let used = opt.data("used")
    opt.data("used", used - parseFloat(rowUsed))
    let $tramos = $("#tramo-cantidad").find("option:selected")
    $tramos.data("used", $tramos.data("used") - 1)
    $(currentTarget).closest("tr").remove()
    $("#Renglon-tramo").trigger("change")
    setTimeout(setRenglonTotal, 0)
})

$("#finalizar-wizzard-btn").on("click", () => {
    let fechaPresentacion = $("#FechaPresentacion-dp").datetimepicker("date")
    if (!fechaPresentacion) {
        Swal.fire("Error", "Es necesaria la fecha de presentación para proseguir", "error")
        return
    }
    let cert = "ne"
    if ($("#TieneCertificacion").is(':checked')) {
        cert = $("#otraCertificacionCheck").is(':checked') ? $("#CertificacionNueva").val() : $("#Certificacion").val()
    }
    let tramos = []
    $("#tramos-table tbody tr").each(function (index) {
        var vTramoId, vTramoDescripcion;
        $(this).children("td").each(function (index2) {
            switch (index2) {
                case 2:
                    vTramoId = $(this).text();
                    break;
                case 3:
                    vTramoDescripcion = $(this).text();
                    tramos.push({
                        "UserName": usuario,
                        "TramoID": vTramoId,
                        "AnioID": plan,
                        "ProyectoCodigo": proyecto,
                        "DocCambioCorrel": docCambioId ?? 0,
                        "TramoCodigo": vTramoId,
                        "TramoDesc": vTramoDescripcion,
                    })
                    break;
            }
        })
    })

    let renglones = []
    let cantidades = []
    let error = 0
    $("#Renglon-tramo option").each((_, item) => {
        if ($(item).data("used")) {
            let renglon = $(item).data("renglon")
            let componente = $("#Componente-cantidad option:selected").data("componente")
            let vals = $(item).data("vals")
            let old_used = $(item).data("used")
            if (vals.cantidad > old_used) {
                error = 1
                Swal.fire("Error", "No se han asignado todas las cantidades disponible en el renglon: " + renglon.ProyectoRenglonNombre, "error")
                return
            }
            renglones.push({
                "UserName": usuario,
                "RenglonID": renglon.RenglonID,
                "AnioID": plan,
                "ProyectoCodigo": proyecto,
                "ProyectoRenglonNombre": renglon.ProyectoRenglonNombre,
                "RenglonCodCOVIAL": renglon.RenglonCodCOVIAL,
                "DocCambioCorrel": docCambioId ?? 0,
            })
            cantidades.push({
                "UserName": usuario,
                "RenglonCantidad": vals.cantidad,
                "RenglonID": renglon.RenglonID,
                "ComponenteCorrel": renglon.ComponenteCorrel,
                "AnioID": plan,
                "ProyectoCodigo": proyecto,
                "DocCambioCorrel": docCambioId ?? 0,
                "CantidadID": 0,
                "ComponenteDesc": componente.ComponenteDesc,
                "ProyectoRenglonNombre": renglon.ProyectoRenglonNombre
            })
        }
    })
    if (error == 1) { return }
    let cantidadesTramo = []
    let monto = 0
    $("#cantidadAsociacion-table tbody tr").each((_, row) => {
        let tramo = $(row).data("tramo")
        let renglon = $(row).data("item")
        let cantidad = parseFloat($(row).find(".table_edit_cantidad-name").inputmask('unmaskedvalue'))
        let precio = parseFloat($(row).find(".precio-table").inputmask('unmaskedvalue'))
        let componente = $("#Componente-cantidad option:selected").data("componente")
        cantidadesTramo.push({
            "UserName": usuario,
            "AnioId": plan,
            "ProyectoCodigo": proyecto,
            "DocCambioCorrel": docCambioId ?? 0,
            "ComponenteCorrel": componente.ComponenteCorrel,
            "ComponenteDesc": componente.ComponenteDesc,
            "RenglonID": renglon.RenglonID,
            "ProyectoRenglonNombre": renglon.ProyectoRenglonNombre,
            "TramoID": tramo.TramoID,
            "TramoDesc": tramo.TramoDesc,
            "CantidadTramo": cantidad,
            "TramoPrecioUnitario": precio,
            "CostoTramo": precio * cantidad,
            "AjusteTramo": 0
        })
        monto += cantidad * precio
    })
    let vFechaDocumentoDeCambioOTS = $("#FechaPresentacion-dp").datetimepicker("date").toDate()
    let obj = {
        "AgregarEditarOTS": [
            {
                "Opcion": docCambioId ? 2 : 1,
                "AnioID": plan,
                "Proyectocodigo": proyecto,
                "DocCambioTipoID": "OTS",
                "DocCambioJustifica": $("#Justificacion").val(),
                "ComentarioEstado": "",
                "ModificaAnexo": $("#anexo-check").is(':checked'),
                "ModificaPlazo": $("#plazo-check").is(':checked'),
                "EsSancion": 0,
                "DiasDocCambio": $("#DiasAfectados").val(),
                "UserName": usuario,
                "Clausula": $("#Clausula").val(),
                "Observaciones": "",
                "FechaPresentacion": vFechaDocumentoDeCambioOTS,
                "CodigoCert": cert,
                "DocCambioCorrel": docCambioId ?? 0
            }
        ],
        "TramosLista": tramos,
        "CantidadesLista": cantidades,
        "CantidadesTramosLista": cantidadesTramo,
        "ProyectoOC": [
            {
                "AnioID": plan,
                "Proyectocodigo": proyecto,
                "DocCambioCorrel": docCambioId ?? 0,
                "MontoDocCambio": monto
            }
        ]
    }
    $.ajax({
        url: `${urlbase}/api/DocumentosCambio/InsertaDocumentoCambioOTS`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(obj),
        success: (val) => {
            let message = "OTS creado correctamente"
            if (val === -1) {
                message = "YA EXISTE UN REGISTRO DE INCREMENTO DE DÍAS PARA ESTE PROYECTO"
                swal.fire(message, "", "warning").then(() => {
                    window.location.href = window.location.origin + baseSitio + "/Ejecucion/DocumentosDeCambio.aspx"
                })
            }
            else {
                if (docCambioId) message = "OTS editado correctamente"
                swal.fire(message, "", "success").then(() => {
                    window.location.href = window.location.origin + baseSitio + "/Ejecucion/DocumentosDeCambio.aspx"
                })
            }
        },
        error: function (response) {
            swal.fire(response.responseJSON.message, response.responseJSON.detail, "error");
            return false
        }
    })
})

$.ajax({
    url: `${urlbase}/api/DocumentosCambio/GetInfoPlanProgramaProyecto/${plan}/${proyecto}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        val = val[0]
        if (!docCambioId) $("#Correlativo").val(val.Correlativo)
        $("#Plan").val(val.PlanAnualNombre)
        $("#Programa").val(val.ProgramaNombre)
        $("#Proyecto").val(val.ProyectoDescripcion)
        $("#monto_desc").val(val.MontoModificado)
    },
    error: function (response) {
        swal.fire(response.responseJSON.message, response.responseJSON.detail, "error");
        return false
    }
})

$.ajax({
    url: `${urlbase}/api/DocumentosCambio/GetEstadosDocCambio`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        val = val.map(item => `<option value="${item.EstadoID}">${item.EstadoDesc}</option>`)
        $("#Estado").html(val.join(""))
        $("#Estado").val(DocCambio ? DocCambio.Estado ?? 0 : 0)
    },
    error: function (response) {
        swal.fire(response.responseJSON.message, response.responseJSON.detail, "error");
        return false
    }
})

function setTramoRow(id, desc) {
    return $(`<tr>
                    <td class="spacer"></td>
                    <td class="text-center">
                        <button type="button" class="action-icon hover-red btn btn-light del" data-toggle="popover" data-trigger="hover"
                            data-content="Eliminar" data-placement="top">
                            <i class="fas fa-trash fa-lg fa-fw"></i>
                        </button>
                    </td>
                    <td class="text-center">${id}</td>
                    <td class="text-center">${desc}</td>
                    <td class="spacer"></td>
                </tr>`);
}

function setTramoAsociationRow(componente, renglon, tramo, precio, cant) {
    return $(`
        <tr>
            <td class="spacer"></td>
            <td>
                ${createButtonWrapperEdit(["edit", "delete"])}
            </td>
            <td class="text-center">${componente}</td>
            <td class="text-center">${renglon}</td>
            <td class="text-center">${tramo}</td>
            <td class="text-center frcurrency-mask precio-table">${precio}</td>
            <td class="text-center">${createFormWrapperEdit(cant, "cantidad", "frdecimal-mask text-center")}</td>
            <td class="text-center frcurrency-mask subtotal">${cant * precio}</td>
            <td class="spacer"></td>
        </tr>
    `);
}

function setRenglonRow(componente, renglon, precio, cantidad) {
    return $(` <tr>
            <td class="spacer"></td>
            <td>
                ${createButtonWrapperEdit(["edit", "delete"])}
            </td>
            <td class="text-center">${componente}</td>
            <td class="text-center">${renglon}</td>
            <td class="text-center frcurrency-mask precio-table">${precio}</td>
            <td class="text-center">${createFormWrapperEdit(cantidad, "cantidad", "frdecimal-mask text-center")}</td>
            <td class="frcurrency-mask subtotal text-center">${precio * cantidad}</td>
            <td class="spacer"></td>
        </tr>`)
}

$("#Renglon").on("change", function () {
    $.ajax({
        url: `${urlbase}/api/DocumentosCambio/GetComponentesRenglon/${plan}/${proyecto}/1/${this.value}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $("#Precio").val(val[0].RenglonPrecioUnitario)
        },
        error: function (response) {
            swal.fire(response.responseJSON.message, response.responseJSON.detail, "error");
            return false
        }
    })
})
$("#Renglon-tramo").on("change", function () {
    let $cant = $("#Cantidad")
    $cant.removeClass("is-invalid")
    $cant.parents().find(".invalid-feedback").remove()
    $cant.val(null)
    let opt = $(this).find("option:selected")
    $("#porEjecutarVal").val(opt.data("vals").cantidad - opt.data("used"))
})