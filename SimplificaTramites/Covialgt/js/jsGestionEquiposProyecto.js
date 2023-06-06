$(document).ready(function () {
    $("#btnRegresarRegistroDatos").click(function () {
        let QueryString = "?Plan=" + plan + "&Programa=" + programa + "&Proyecto=" + proyecto
        window.location.href = "RegistroDatos.aspx" + QueryString;
    })


})

let updateEquipment = () => {
    $.ajax({
        url: `${urlbase}api/Equipos/ObtenerEquiposGestion?pAnioID=${plan}&pProyectoCodigo=${proyecto}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let body = $("#equipos-table tbody")
            body.find("tr").remove()
            val.forEach((item) => {
                let row = $(`<tr>
                <td class="spacer"></td>
                <td class="text-center">
                    <div class="no-editing-icons">
                        <button type="button" class="action-icon hover-blue btn btn-light" data-toggle="popover" data-trigger="hover" 
                            data-content="Editar" data-placement="top" style="cursor:pointer">
                            <i class="fas fa-pencil-alt fa-lg fa-fw"></i>
                        </button>
                        <button type="button" class="action-icon hover-red btn btn-light  del-btn" data-toggle="popover" data-trigger="hover" data-id="${item.EquipoID}"
                            data-content="Eliminar" data-placement="top">
                            <i class="fas fa-trash fa-lg fa-fw"></i>
                        </button>
                    </div>
                    <div class="editing-icons d-none">
                        <button type="button" class="action-icon hover-blue btn btn-light" data-toggle="popover" data-trigger="hover"
                            data-content="Guardar Editado" data-placement="top" style = "cursor:pointer" >
                        <i class="fas fa-save fa-lg fa-fw"></i></button>
                        <button type="button" class="action-icon hover-red btn btn-light" data-toggle="popover" data-trigger="hover"
                            data-content="Cancelar Editado" data-placement="top">
                            <i class="fas fa-times-circle fa-lg fa-fw"></i>
                        </button>
                    </div>
                </td>
                <td class="text-center">${item.EquipoID}</td>
                <td class="text-center">
                    <div class="no-editing-icons">
                        ${item.Descripcion}
                    </div>
                    <div class="editing-icons d-none">
                        <input type="text" name="descripcion" class="table-input" style="min-width:90%" >
                    </div>
                </td>
                <td class="text-center">
                    <div class="no-editing-icons">
                        ${item.Potencia}
                    </div>
                    <div class="editing-icons d-none">
                        <input type="text" class="table-input frinteger-mask" name="potencia" style="min-width:90%" >
                    </div>
                </td>
                <td class="spacer"></td>
                </tr>`)
                row.data("obj", item)
                body.append(row)
            })
            initMasks()
        }
    })
}
updateEquipment()
$("#btn-add").on("click", () => {
    let des = $("#Descripcion").val()
    let pot = $("#Potencia").val().replace(",", "")
    if (!des) $("#Descripcion").addClass("is-invalid"); else $("#Descripcion").removeClass("is-invalid")
    if (!pot) $("#Potencia").addClass("is-invalid"); else $("#Potencia").removeClass("is-invalid") 
    if (!des || !pot) return
    $.ajax({
        url: `${urlbase}api/Equipos/AgregarEquipo`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify({
            "Descripcion": des,
            "Potencia": pot,
            "AnioID": plan,
            "ProyectoCodigo": proyecto,
            "UserName": user,
            "DateModify": new Date()
        }), 
        success: () => {
            swal.fire("Estado del Equipo actualizado", "", "success")
            updateEquipment()
            $("#Descripcion").val("")
            $("#Potencia").val("")
        },
        error: ({ responseJSON }) => Swal.fire("Error al agregar equipo", responseJSON.Errors.reduce((ant, actual) => {
            return ant + actual.message
        }, ""), "error")
    })
})
$("#btn-cancel").on("click", () => {
    $("#Descripcion").val("")
    $("#Potencia").val("")
})
$("#equipos-table tbody").on("click", ".del-btn", ({ currentTarget }) => {
    Swal.fire({
        title: 'Estas Seguro?',
        text: "Esta operación no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `${urlbase}api/Equipos/EliminarEquipo`,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                method: "POST",
                data: JSON.stringify({
                    "AnioID": plan,
                    "ProyectoCodigo": proyecto,
                    "EquipoID": $(currentTarget).data("id")
                }),
                success: () => {
                    swal.fire("Equipo eliminado", "", "success")
                    updateEquipment()
                }
            })
        }
    })
    
})

saveInputEditTableButtons = (tr, vals) => {
    data = tr.data("obj")
    data.DateModify = new Date()
    data.Descripcion = vals.descripcion
    data.Potencia = parseInt(vals.potencia.replace(",", ""))
    $.ajax({
        url: `${urlbase}api/Equipos/ActualizarEquipo`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: () => {
            swal.fire("Equipo editado correctamente", "", "success")
            updateEquipment()
        },
        error: ({ responseJSON }) => {
            Swal.fire("Error al editar equipo", responseJSON.Errors.reduce((ant, actual) => {
                return ant + actual.message
            }, ""), "error")
            updateEquipment()
        }
    })
}