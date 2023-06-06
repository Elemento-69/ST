$("select").select2({ theme: "bootstrap" })
$("body").keydown("input", function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        $(event.currentTarget.dataset.submitbutton).click()
        return false;
    }
});
$("#FechaPresentacion-dp").datetimepicker({
    format: 'DD/MM/YYYY'
})

$("#TieneCertificacion").on("change", ({ currentTarget }) => {
    $("#otraCertificacionCheck")[0].checked = false
    $("#otraCertificacionCheck").trigger("change")
    $(".cert-form").attr("disabled", !currentTarget.checked)
})

$("#otraCertificacionCheck").on("change", ({ currentTarget }) => {
    $("#CertificacionNueva").attr("disabled", !currentTarget.checked)
    $("#Certificacion").attr("disabled", currentTarget.checked)
})

setRenglonTotal = () => {
    total = 0
    $("#asociacion_renglon-table tbody .subtotal").each((_, val) => {
        total += parseFloat(val.value)
    })
    $("#asociacion_renglon-table tfoot .total").val(total)
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
            $("#FechaPresentacion-dp").datetimepicker('date', moment(DocCambio.FechaPresentacion))
            $("#Clausula").val(DocCambio.Clausula)
            $("#Justificacion").val(DocCambio.DocCambioJustifica)
            if (DocCambio.CodigoCert && DocCambio.CodigoCert !=="ne") $("#TieneCertificacion").attr("checked", DocCambio.CodigoCert).trigger("change")
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
                            RenglonID: item.RenglonID,
                            UserName: null,
                        }
                    }
                    let row = setRenglonRow(item.RenglonID, item.ProyectoRenglonNombre)
                    row.data("item", item)
                    $("#renglon_selected-table tbody").append(row)
                } else {
                    renglones[item.RenglonID].cantidad += item.CantidadTramo
                }
                let row = setAsociacionTramoRow(item.ComponenteDesc, item.ProyectoRenglonNombre, item.TramoDesc, item.TramoPrecioUnitario, item.CantidadTramo)
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
                $("#tramos_asociation-table tbody").append(row)
                let col = $(`<option value="${tramo.TramoID}">${tramo.TramoDesc}</option>`)
                existentCol = $("#Tramos").find(`option[value=${tramo.TramoID}]`)
                if (existentCol.length > 0) {
                    col = existentCol
                }
                col.data("item", tramo)
                col.data("used", item.CantidadTramo)
                $("#Tramos").append(col).trigger("change")
            })
            for (renglonId in renglones) {
                let renglon = renglones[renglonId]
                let rowAsign = setAsociacionRenglonRow(renglon.componente, renglon.nombre, renglon.precio, renglon.cantidad)
                rowAsign.data("renglonId", renglonId)
                rowAsign.data("renglon", renglon.item)
                $("#asociacion_renglon-table tbody").append(rowAsign)
                // create option on last table
                let option = $(`<option value="${renglon.item.RenglonCodCOVIAL}">${renglon.nombre}</option>`)
                option.data("vals", { precio: renglon.precio, cantidad: renglon.cantidad, item: renglon.item })
                option.data("renglon", renglon.item)
                option.data("componente", $("#Componente-set option:selected").data("componente"))
                option.data("used", renglon.cantidad)
                $("#Renglon-tramo").append(option).trigger("change")
            }
            initMasks()
            updateLastTotal()
            setRenglonTotal()
        }
    })
}

function setAsociacionTramoRow(componente, renglon, tramo, precio, cantidad) {
    return $(`
                <tr>
                    <td class="spacer"></td>
                    <td>
                        ${createButtonWrapperEdit(["edit", "delete"])}
                    </td>
                    <td>${componente}</td>
                    <td>${renglon}</td>
                    <td>${tramo}</td>
                    <td class="frcurrency-mask precio-table">${precio}</td>
                    <td>${createFormWrapperEdit(cantidad, "cantidad", "frdecimal-mask")}</td>
                    <td class="frcurrency-mask subtotal">${cantidad * precio}</td>
                    <td class="spacer"></td>
                </tr>
            `);
}

function validateEditTable(row, inputs) {
    let table = row.closest("table").attr('id')
    let inputCant = null
    switch (table) {
        case "asociacion_renglon-table":
            item = $(row).data("renglon")
            inputCant = inputs.filter('[name="cantidad"]')
            inputCant.parent().find(".invalid-feedback").remove()
            inputCant.removeClass("is-invalid")
            let option = $($("#Renglon-tramo").find(`option[value="${item.RenglonCodCOVIAL}"]`))
            if (option.data("used") > parseFloat(inputCant.val())) {
                inputCant.after(`<div  class="invalid-feedback">La cantidad no puede ser menor a la que se está usando (${option.data("used")})</div>`)
                inputCant.addClass("is-invalid")
                return false
            }
            return true
        case "tramos_asociation-table":
            item = $(row).data("item")
            inputCant = inputs.filter('[name="cantidad"]')
            inputCant.parent().find(".invalid-feedback").remove()
            inputCant.removeClass("is-invalid")
            let opt = $("#Renglon-tramo").find(`option[value="${item.RenglonCodCOVIAL}"]`)
            let used = opt.data("used")
            let existing = parseFloat(opt.data("vals").cantidad)
            let oldValue = parseFloat(row.find(".table_edit_cantidad-name").inputmask('unmaskedvalue'))
            if (used - oldValue + parseFloat(inputCant.inputmask('unmaskedvalue')) > existing) {
                inputCant.after(`<div class="invalid-feedback">La cantidad no puede ser mayor a la asignada (${existing})</div>`)
                inputCant.addClass("is-invalid")
                return false
            }
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
        case "renglon_selected-table":
            item.ProyectoRenglonNombre = items.descripcion
            item.RenglonCodCOVIAL = items.id
            opt = $("#Renglon-set").find(`option[value="${item.RenglonCodCOVIAL}"]`)
            opt.html(item.ProyectoRenglonNombre)
            opt.data("item", item)
            $("#Renglon-set").select2({ theme: "bootstrap" }).trigger('change');
            break
        case "asociacion_renglon-table":
            item = $(row).data("renglon")
            const cantidad = row.find("input[name=cantidad]").inputmask('unmaskedvalue')
            const precio = row.find("input[name=precio]").inputmask('unmaskedvalue')
            subtotal = precio * cantidad
            row.find(".subtotal").val(subtotal)
            row.find(".table_edit_cantidad-name").val(cantidad)
            row.find(".table_edit_precio-name").val(precio)
            setRenglonTotal()
            opt = $("#Renglon-tramo").find(`option[value="${item.RenglonCodCOVIAL}"]`)
            opt.data("vals", { precio: items.precio, cantidad: items.cantidad, item: item })
            $("#Renglon-tramo").trigger("change")
            let tramoAsociation_rows = $("#tramos_asociation-table tbody tr").filter((_, row) => $(row).data("renglonId") === item.RenglonID)
            tramoAsociation_rows.each((_, tramoRow) => {
                tramoRow = $(tramoRow)
                tramoRow.find(".precio-table").val(items.precio)
                subtotal = parseFloat(items.precio) * tramoRow.find(".table_edit_cantidad-name").val()                
                tramoRow.find(".subtotal").val(subtotal)
            })
            initMasks()
            updateLastTotal()
            break;
        case "tramos_asociation-table":
            const cantidadTramos = row.find("input[name=cantidad]").inputmask('unmaskedvalue')
            subtotal = parseFloat(row.find(".precio-table").inputmask('unmaskedvalue')) * cantidadTramos
            row.find(".subtotal").val(subtotal)
            row.find(".table_edit_cantidad-name").val(cantidadTramos)
            opt = $("#Renglon-tramo").find(`option[value="${item.RenglonCodCOVIAL}"]`)
            used = opt.data("used")
            let oldValue = parseFloat(olds.cantidad)
            opt.data("used", used - oldValue + parseFloat(items.cantidad))
            updateLastTotal()
            break;
        default:
            alert(`${table} no implementado`)
    }
}

$.ajax({
    url: `${urlbase}api/DocumentosCambio/GetProyectosRenglonesATE/${plan}/${proyecto}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        val.forEach((item) => {
            let editedCols = $("#renglon_selected-table tbody .table_edit_id-name").filter((_, rowRen) => parseInt(rowRen.textContent) === item.RenglonID)
            item.RenglonCodCOVIAL = item.listaDesplegable.split("[")[4].split("]")[0]
            if (editedCols.length > 0) {
                editedCols[0].textContent = item.RenglonCodCOVIAL
                $(editedCols[0]).closest("tr").data("item", item)
                $("#renglon_selected-table tbody .table_edit_id-name").filter((_, rowRen) => parseInt(rowRen.textContent) === item.RenglonID)
                let aso_ren = $("#asociacion_renglon-table tbody").filter((_, row) => $(row).data("renglonId") === item.RenglonID)
                aso_ren.data("renglon", item)
                let aso_tramo = $("#tramos_asociation-table tbody").filter((_, row) => $(row).data("renglonId") === item.RenglonID)
                aso_tramo.data("item", item)
            } else {
                let col = $(`<option value="${item.RenglonCodCOVIAL}">${item.ProyectoRenglonNombre}</option>`)
                col.data("item", item)
                $("#Renglon").append(col)
            }
        })
        $("#Renglon").trigger("change")
    }
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
        if (DocCambio && DocCambio.CodigoCert && DocCambio.CodigoCert !== "ne") {
            if ($(`#Certificacion option[value='${DocCambio.CodigoCert}']`).length > 0)
                $("#Certificacion").val(DocCambio.CodigoCert)
            else {
                $("#otraCertificacionCheck").prop("checked", true).trigger("change")
                $("#CertificacionNueva").val(DocCambio.CodigoCert)
            }
        }
    },
})

$("#add_renglon-btn").on("click", () => {
    let item = $("#Renglon option:selected").data("item")
    let row = setRenglonRow(item.RenglonCodCOVIAL, item.ProyectoRenglonNombre)
    row.data("item", item)
    $("#renglon_selected-table tbody").append(row)
    let option = $(`<option value="${item.RenglonCodCOVIAL}">${item.ProyectoRenglonNombre}</option>`)
    option.data("item", item)
    $("#Renglon-set").append(option)
    $("#Renglon option:selected").remove()
})

$("#renglon_selected-table tbody").on("click", ".table_edit_delete-btn", ({ currentTarget }) => {
    item = $(currentTarget).closest("tr").data("item")
    let nextPageValue = $("#Renglon-set").find(`option[value="${item.RenglonCodCOVIAL}"]`)
    if (nextPageValue.length === 0) {
        swal.fire("Error", "Elimine este renglon del paso 3 para poder proseguir con la eliminación", "error")
        return
    }
    let col = $(`<option value="${item.RenglonCodCOVIAL}">${item.ProyectoRenglonNombre}</option>`)
    col.data("item", item)
    $("#Renglon").append(col).trigger("change")
    $(currentTarget).closest("tr").remove()
    $("#Renglon-set").find(`option[value="${item.RenglonCodCOVIAL}"]`).remove()
})

$.ajax({
    url: `${urlbase}api/DocumentosCambio/GetComponentes/${plan}/${proyecto}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        val.forEach((item) => {
            let col = $(`<option value="${item.ComponenteCorrel}">${item.ComponenteDesc}</option>`)
            col.data("componente", item)
            $("#Componente-set").append(col.clone()).trigger("change")
            $("#Componente-tramo").append(col).trigger("change")
        })
    }
})

$("#renglon-add_btn").on("click", () => {
    $("#asociarRenglonRow input").removeClass("is-invalid")
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
    let componente = $("#Componente-set option:selected").html()
    let $renglon = $("#Renglon-set  option:selected")
    let row = setAsociacionRenglonRow(componente, $renglon.html(), $precio.inputmask('unmaskedvalue'), $cantidad.inputmask('unmaskedvalue'))
    let item = $renglon.data("item")
    row.data("renglon", item)
    $("#asociacion_renglon-table tbody").append(row)
    let option = $(`<option value="${item.RenglonCodCOVIAL}">${item.ProyectoRenglonNombre}</option>`)
    option.data("vals", { precio: $precio.inputmask('unmaskedvalue'), cantidad: $cantidad.inputmask('unmaskedvalue'), item: item })
    option.data("renglon", item)
    option.data("componente", $("#Componente-set option:selected").data("componente"))
    option.data("used", 0)
    $("#Renglon-tramo").append(option).trigger("change")
    $renglon.remove()
    $precio.val(null)
    $cantidad.val(null)
    initMasks()
    setTimeout(() => {
        setRenglonTotal()
    }, 0)
})


$("#asociacion_renglon-table tbody").on("click", ".table_edit_delete-btn", ({ currentTarget }) => {
    item = $(currentTarget).closest("tr").data("renglon")

    let $nextOption = $("#Renglon-tramo").find(`option[value='${item.RenglonCodCOVIAL}']`)
    if ($nextOption.data("used") > 0) {
        swal.fire("Error", "Elimine todas las cantidades de la siguiente tabla para poder eliminar el renglon", "error")
        return
    }
    let col = $(`<option value="${item.RenglonCodCOVIAL}">${item.ProyectoRenglonNombre}</option>`)
    col.data("item", item)
    $("#Renglon-set").append(col).trigger("change")
    $nextOption.remove()
    $("#renglon_select-desc").html(null)
    $("#cant_reng-desc").html(null)
    $(currentTarget).closest("tr").remove()
    setRenglonTotal()
})

initMasks()

$.ajax({
    url: `${urlbase}api/DocumentosCambio/GetProyectosTramos/${plan}/${proyecto}/254`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        val.forEach((item) => {
            let aso_tramo = $("#tramos_asociation-table tbody tr").filter((_, row) => parseInt($(row).data("tramoId")) === item.TramoID)
            if (aso_tramo.length === 0) {
                let col = $(`<option value="${item.TramoID}">${item.TramoDesc}</option>`)
                col.data("item", item)
                $("#Tramos").append(col).trigger("change")
            }
        })
    }
})

function setAsociacionRenglonRow(componente, renglon, precio, cantidad) {
    return $(`
        <tr>
            <td class="spacer"></td>
            <td>
                ${createButtonWrapperEdit(["edit", "delete"])}
            </td>
            <td>${componente}</td>
            <td>${renglon}</td>
            <td>${createFormWrapperEdit(precio, "precio", "frcurrency-mask")}</td>
            <td>${createFormWrapperEdit(cantidad, "cantidad", "frdecimal-mask")}</td>
            <td class="frcurrency-mask subtotal">${precio * cantidad}</td>
            <td class="spacer"></td>
        </tr>
    `);
}

function setRenglonRow(id, descripcion) {
    return $(`<tr>
        <td class="spacer"></td>
        <td>
             ${createButtonWrapperEdit(["edit", "delete"])}
        </td>
        <td>
            ${createFormWrapperEdit(id, "id")}
        </td>
        <td>
             ${createFormWrapperEdit(descripcion)}
        </td>
        <td class="spacer"></td>
        </tr>`);
}

function updateLastTotal(){
    let subtotals = $("#tramos_asociation-table tbody .subtotal")
    total = 0
    subtotals.each((_, val) => {
        total += parseFloat(val.value)
    })
    $("#asociacion_tramo-total").val(total)
}

$("#asociarTramo-btn").on("click", () => {
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
    let $tramos = $("#Tramos").find("option:selected")
    $tramos.data("used", ($tramos.data("used") || 0) + 1 )
    if (parseFloat(vals.cantidad) < old_used + used) {
        $cant.after(`<div  class="invalid-feedback">La cantidad no puede ser mayor al total disponible del renglon (${vals.cantidad -old_used}/${vals.cantidad})</div>`)
        $cant.addClass("is-invalid")
        return
    }
    let row = setAsociacionTramoRow($("#Componente-tramo").find("option:selected").html(), option.html(), $tramos.html(), vals.precio, $cant.inputmask('unmaskedvalue'))
    row.data("item", vals.item)
    row.data("tramo", $tramos.data("item"))
    row.data("renglonId", vals.item.RenglonID)
    $("#tramos_asociation-table tbody").append(row)
    option.data("used", old_used + used)
    initMasks("#tramos_asociation-table")
    $cant.val(null)
    $("#Renglon-tramo").trigger("change")
    setTimeout(() => updateLastTotal(), 0)
})

$("#Renglon-tramo").on("change", ({ currentTarget }) => {
    let option = $(currentTarget).find("option:selected")[0]
    let $option = $(option)
    $("#renglon_select-desc").html(option.innerHTML)
    $("#cant_reng-desc").html($option.data("vals").cantidad - $option.data("used"))
    let $cant = $("#Cantidad")
    $cant.val(0)
    $cant.removeClass("is-invalid")
    $cant.parents().find(".invalid-feedback").remove()
})

$("#tramos_asociation-table").on("click", ".table_edit_delete-btn", ({ currentTarget }) => {
    item = $(currentTarget).closest("tr").data("item")
    let opt = $("#Renglon-tramo").find(`option[value="${item.RenglonCodCOVIAL}"]`)
    let rowUsed = $(currentTarget).closest("tr").find(".table_edit_cantidad-name").inputmask('unmaskedvalue')
    let used = opt.data("used")
    opt.data("used", used - parseFloat(rowUsed))
    let $tramos = $("#Tramos").find("option:selected")
    $tramos.data("used", $tramos.data("used") - 1)
    $(currentTarget).closest("tr").remove()
    setTimeout(() => updateLastTotal(), 0)
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
    let componente = $("#Componente-tramo option:selected").data("componente")
    $("#Tramos option").each((_, item) => {
       // if ($(item).data("used") > 0) {
            let tramoItem = $(item).data("item")
            tramos.push({
                "UserName": usuario,
                "TramoID": tramoItem.TramoID,
                "AnioID": plan,
                "ProyectoCodigo": proyecto,
                "DocCambioCorrel": docCambioId ?? 0,
                "TramoCodigo": tramoItem.TramoCodigo,
                "TramoDesc": tramoItem.TramoDesc,
                "SuperficieClaseID": tramoItem.SuperficieClaseID
            })
        //}
    })
  
    let renglones = []
    let cantidades = []
    let error = 0
    $("#Renglon-tramo option").each((_, item) => {
        if ($(item).data("used")) {
            let renglon = $(item).data("renglon")
            let componente = $("#Componente-tramo option:selected").data("componente")
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
                "ProyectoRenglonNombre": renglon.ProyectoRenglonNombre || "",
                "RenglonCodCOVIAL": renglon.RenglonCodCOVIAL,
                "DocCambioCorrel": docCambioId ?? 0,
            })
            cantidades.push({
                "UserName": usuario,
                "RenglonCantidad": parseFloat(vals.cantidad),
                "RenglonID": renglon.RenglonID,
                "ProyectoRenglonNombre": renglon.ProyectoRenglonNombre || "",
                "ComponenteCorrel": componente.ComponenteCorrel,
                "AnioID": plan,
                "ProyectoCodigo": proyecto,
                "DocCambioCorrel": docCambioId ?? 0,
                "CantidadID": 0,
                "ComponenteDesc": componente.ComponenteDesc,
            })
        }
    })
    if (error == 1) { return }
    let ComponentesRenglon = []
    $("#asociacion_renglon-table tbody tr").each((_, row) => {
        let renglon = $(row).data("renglon")
        let cantidad = parseFloat($(row).find(".table_edit_cantidad-name").val())
        let precio = parseFloat($(row).find(".table_edit_precio-name").val())
        let componente = $("#Componente-tramo option:selected").data("componente")
        ComponentesRenglon.push({
            "UserName": usuario,
            "ComponenteDesc": componente.ComponenteDesc,
            "ProyectoRenglonNombre": renglon.ProyectoRenglonNombre || "",
            "RenglonCantidad": cantidad,
            "RenglonPrecioPlan": 0,
            "SubTotal": cantidad * precio,
            "AnioId": plan,
            "ProyectoCodigo": proyecto,
            "ComponenteCorrel": componente.ComponenteCorrel,
            "RenglonID": renglon.RenglonID,
            "RenglonPrecioUnitario": precio,
            "DocCambioCorrel": docCambioId ?? 0
        })

    });
    let cantidadesTramo = []
  
    $("#tramos_asociation-table tbody tr").each((_, row) => {
        let tramo = $(row).data("tramo")
        let renglon = $(row).data("item")
        let cantidad = parseFloat($(row).find(".table_edit_cantidad-name").inputmask('unmaskedvalue'))
        let precio = parseFloat($(row).find(".precio-table").inputmask('unmaskedvalue'))
        let componente = $("#Componente-tramo option:selected").data("componente")
        cantidadesTramo.push({
            "UserName": usuario,
            "AnioId": plan,
            "ProyectoCodigo": proyecto,
            "DocCambioCorrel": docCambioId ?? 0,
            "ComponenteCorrel": componente.ComponenteCorrel,
            "ComponenteDesc": componente.ComponenteDesc,
            "ProyectoRenglonNombre": renglon.ProyectoRenglonNombre || "",
            "RenglonID": renglon.RenglonID,
            "TramoID": tramo.TramoID,
            "TramoDesc": tramo.TramoDesc,
            "CantidadTramo": cantidad,
            "TramoPrecioUnitario": precio,
            "CostoTramo": precio * cantidad,
            "AjusteTramo": 0
        })
     
    })
    let vFechaDocumentoDeCambioOTS = $("#FechaPresentacion-dp").datetimepicker("date").toDate()
    let obj = {
        "AgregarEditarATE": [
            {
                "Opcion": docCambioId ? 2:1 ,
                "AnioID": plan,
                "Proyectocodigo": proyecto,
                "DocCambioTipoID": "ATE",
                "DocCambioJustifica": $("#Justificacion").val(),
                "ComentarioEstado": "",
                "ModificaAnexo": 0,
                "ModificaPlazo": 0,
                "EsSancion": 0,
                "MontoDocCambio": parseFloat($("#asociacion_tramo-total").inputmask('unmaskedvalue')),
                "DiasDocCambio": 0,
                "UserName": usuario,
                "Clausula": $("#Clausula").val(),
                "Observaciones": "",
                "FechaPresentacion": $("#FechaPresentacion-dp").datetimepicker("date").toDate(),
                "CodigoCert": cert,
                "DocCambioCorrel": docCambioId ?? 0,
            }
        ],
        "TramosLista": tramos,
        "ComponentesLista": [
            {
                "UserName": usuario,
                "ComponenteDesc": componente.ComponenteDesc,
                "ComponenteCorrel": componente.ComponenteCorrel,
                "AnioId": plan,
                "ProyectoCodigo": proyecto,
                "DocCambioCorrel": docCambioId ?? 0,
            }
        ],
        "ComponentesRenglonLista": ComponentesRenglon,
        "RenglonesLista": renglones,
        "CantidadesLista": cantidades,
        "CantidadesTramosLista": cantidadesTramo,
    }
    $.ajax({
        url: `${urlbase}/api/DocumentosCambio/InsertaDocumentoCambioATS`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(obj),
        success: (val) => {
            let message = "ATE creada correctamente"
            if (docCambioId) message = "ATE editada correctamente"
            swal.fire(message, "", "success").then(() => {
                window.location.href = window.location.origin + baseSitio + "/Ejecucion/DocumentosDeCambio.aspx"
            })
        },
        error   : function (response) {
            swal.fire(response.responseJSON.message, response.responseJSON.detail, "error");
            return false
        }
    })
})