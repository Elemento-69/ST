$("select").select2({ theme: "bootstrap" })
$(".date").datetimepicker({
    format: 'DD/MM/YYYY'
})

saveInputEditTableButtons = (row, values, olds) => {
    row.find(".subtotal").val(values.cantidad * values.precio)
    row.find(".table_edit_cantidad-name").val(values.cantidad)
    row.find(".table_edit_precio-name").val(values.precio)
    setTotals()
}

$.ajax({
    url: `${urlbase}api/TrabajosXAdministracion/GetComponenentesRenglonesXAnioProyecto/${plan}/${proyecto}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        let body = $("#Renglon")
        val.forEach((item) => {
            let row = $(`<option value="${item.CorrelativoRegionID}">${item.Descripcion}</option>`)
            body.append(row)
        })
    }
})

initMasks()

$("#addDetail-btn").on("click", () => {
    let cantidad = parseFloat($("#Cantidad").inputmask('unmaskedvalue'))
    let precio = parseFloat($("#Precio").inputmask('unmaskedvalue'))
    let row = setDetailRow(cantidad, precio)
    $("#detail-table tbody").append(row)
    $("#detail-form").find("input, textarea").val(null)
    setTotals()
    initMasks("#detail-table tbody")
})

function setDetailRow(cantidad, precio, descripcion = $("#Descripcion").val(), unidad = $("#Unidad").val()) {
    return $(`<tr>
                <td class="spacer"></td>
                <td> ${createButtonWrapperEdit(["edit", "delete"])} </td>
                <td>${descripcion}</td>
                <td>${unidad}</td>
                <td> ${createFormWrapperEdit(cantidad, "cantidad", "frdecimal-mask")} </td>
                <td> ${createFormWrapperEdit(precio, "precio", "frcurrency-mask")} </td>
                <td class="frcurrency-mask subtotal">${cantidad * precio}</td>
                <td class="spacer"></td>
        </tr>`)
}

function setTotals() {
    let total = 0
    $("#detail-table tbody .subtotal").each(function () {
        total += parseFloat(this.value || this.innerHTML)
    })
    $("#totalDetail-table").val(total)
}

$("#detail-table tbody").on("click", ".table_edit_delete-btn", function () {
    $(this).closest("tr").remove()
    setTotals();
})

$("#finalizar-btn").on("click", () => {
    let details = []
    $("#detail-table tbody tr").each((_, el) => {
        details.push({
            "Usuario": usuario,
            "TrabajoDetalleID": $(el).data("id") | 0,
            "TrabajoCorr": gestionId | 0,
            "AnioID": plan,
            "ProyectoCodigo": proyecto,
            "TrabaDesc": el.children[2].innerHTML,
            "TrabaUnidad": el.children[3].innerHTML,
            "TrabaPrecio": $(el.children[5]).find(".no-editing-icons").inputmask('unmaskedvalue'),
            "TrabaCantidad": $(el.children[4]).find(".no-editing-icons").inputmask('unmaskedvalue')
        })
    })
    let renglon = $("#Renglon").val().split(",")
    data = {
        "TrabajosXAdmonMaestro": [
            {
                "pUsuario": usuario,
                "AnioID": plan,
                "pProyectoCodigo": proyecto,
                "TrabajoJustificacion": $("#JustificacionGeneral").val(),
                "ComponenteCorrel": renglon[0],
                "RenglonID": renglon[1],
                "FechaTrabajo": $("#FechaTrabajo-dp").datetimepicker("date").toDate(),
                "TrabajoMonto": $("#totalDetail-table").val()
            }
        ],
        "TrabajosXAdmonDetalles": details
    }
    if (gestionId) {
        data.TrabajosXAdmonMaestro[0]["pTrabajoCorrel"] = gestionId
        data = {
            "TrabajosXAdmonMaestroEditar": data.TrabajosXAdmonMaestro,
            "TrabajosXAdmonDetalles": details
        }
        $.ajax({
            url: `${urlbase}api/TrabajosXAdministracion/ActualizarTrabajosXAdmon`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            method: "POST",
            data: JSON.stringify(data),
            success: (val) => {
                let message = "Trabajo editado correctamente"
                swal.fire(message, "", "success").then(() => {
                    window.location.href = "GestionTrabajoEstimacionList"
                })
            },
            error: function (response) {
                swal.fire(response.responseJSON.message, response.responseJSON.detail, "error");
                return false
            }
        })
    } else {
        $.ajax({
            url: `${urlbase}api/TrabajosXAdministracion/InsertaTrabajosXAdmon`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            method: "POST",
            data: JSON.stringify(data),
            success: (val) => {
                let message = "Trabajo creado correctamente"
                swal.fire(message, "", "success").then(() => {
                    window.location.href = "GestionTrabajoEstimacionList"
                })
            },
            error: function (response) {
                swal.fire(response.responseJSON.message, response.responseJSON.detail, "error");
                return false
            }
        })
    }
})

if (gestionId) {
    $("#finalizar-btn").html("Actualizar")
    $.ajax({
        url: `${urlbase}api/TrabajosXAdministracion/GetDetalleTrabajosxAdmon/${plan}/${proyecto}/${gestionId}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let body = $("#detail-table tbody")
            val.forEach((item) => {
                let row = setDetailRow(item.TrabaCantidad, item.TrabaPrecio, item.TrabaDesc, item.TrabaUnidad)
                row.data("id", item.TrabajoDetalleID)
                body.append(row)
            })
            initMasks("#detail-table tbody")
            setTotals()
        }
    })

    $.ajax({
        url: `${urlbase}api/TrabajosXAdministracionAreaTecnica/GetTrabajosEncabezado/${plan}/${proyecto}/${gestionId}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            val = val[0]
            $("#Renglon").find(`option[value="1,${val.RenglonID}"]`)
            $("#Renglon").val(`1,${val.RenglonID}`)
            $("#JustificacionGeneral").val(val.TrabajoJustificacion)
            $("#FechaTrabajo-dp").datetimepicker("date", moment(val.FechaTrabajo))
        }
    })
}