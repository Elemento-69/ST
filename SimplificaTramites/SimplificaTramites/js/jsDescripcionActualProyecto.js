$("select").select2({ theme: "bootstrap" })
$(".date").datetimepicker({
    format: "DD/MM/YYYY"
})

$("body").keydown("input", function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        $(event.currentTarget.dataset.submitbutton).click()
        return false;
    }
});

saveInputEditTableButtons = (row, items) => {
    let item = $(row).closest("tr").data("meta")
    $.ajax({
        method: "post",
        data: JSON.stringify({
            "AnioID": item.AnioID,
            "ProyectoCodigo": item.ProyectoCodigo,
            "Correlativo": item.Corr_Comentario,
            "Comentario": items.comentario
        }),
        url: `${urlbase}api/DescripcionActualDelProyecto/ActualizarComentario`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            swal.fire("Exito", "Comentario editado correctamente", "success")
            cargainicial();
        }
    })
}

$.ajax({
    url: `${urlbase}api/DescripcionActualDelProyecto/ObtenerPlanesAnuales`,
    success: (val) => {
        let options = val.map((val) => new Option(val.AnioID, val.AnioID))
        $('.plan-select').append(options).trigger("change")
    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})
let User = user;
function cargainicial() {
    let $table = $("#comentarios-table tbody")
    $table.html(null)
    if (EsSupervisor == 1) {
        $.ajax({
            url: `${urlbase}api/DescripcionActualDelProyecto/ObtenerComentariosxProyectoSup/${User}`,
            success: (val) => {
                setTableRows(val);
            },
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            }
        })
    }
    else {
        $.ajax({
            url: `${urlbase}api/DescripcionActualDelProyecto/ObtenerComentariosxProyecto`,
            success: (val) => {
                setTableRows(val);
            },
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            }
        })
    }
}
cargainicial()

$(".plan-select").on("change.select2", ({ currentTarget }) => {
    let plan = currentTarget.value
    let programSelect = $(currentTarget).closest(".row").find(".program-select")
    programSelect.find("option").remove()
    $.ajax({
        url: `${urlbase}api/DescripcionActualDelProyecto/ObtenerListaProgComentario/${plan}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            programSelect.append(val.map((val) => new Option(val.ProgramaNombre, val.ID)))
            if (programSelect.data("id")) programSelect.val(programSelect.data("id"))
            programSelect.trigger("change")
            programSelect.data("id", null)
        }
    })
})

$(".program-select").on("change.select2", ({ currentTarget }) => {
    let program = currentTarget.value
    let plan = $(currentTarget).closest(".row").find(".plan-select").val()
    let proyectoSelect = $(currentTarget).closest(".row").find(".proyecto-select")
    proyectoSelect.find("option").remove()
    $.ajax({
        url: `${urlbase}api/DescripcionActualDelProyecto/ObtenerListProyecto/${plan}/${program}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            proyectoSelect.append(val.map((val) => new Option(val.ProyectoDescripcion, val.ProyectoCodigo)))
            if (proyectoSelect.data("id")) proyectoSelect.val(proyectoSelect.data("id"))
            proyectoSelect.trigger("change")
            proyectoSelect.data("id", null)

        }
    })
})


$.ajax({
    url: `${urlbase}api/Proyecto/GetListadoXSupervisor/${User.substring(0, 4)}/${User.substring(4, 20)}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        $('#ProyectoListSup').append(val.map((val) => new Option(val.ProyectoDescripcion, val.AnioID + val.ProyectoCodigo))).trigger("change")
        $('#ProyectoListSupBusqueda').append(val.map((val) => new Option(val.ProyectoDescripcion, val.AnioID + val.ProyectoCodigo))).trigger("change")

    }
})

var AnioID = 0;
var Proyectocodigo = ''
var AnioIDB = 0;
var ProyectocodigoB = ''
$("#ProyectoListSup").on("change.select2", ({ currentTarget }) => {
    let description = currentTarget.selectedOptions[0].textContent
    $("#TituloProyecto").html(description)
    let plan = currentTarget.value.substring(0, 4)
    let proyect = currentTarget.value.substring(4, 20)
    AnioID = plan
    Proyectocodigo = proyect
})
$("#ProyectoListSupBusqueda").on("change.select2", ({ currentTarget }) => {
    let description = currentTarget.selectedOptions[0].textContent
    $("#TituloProyecto").html(description)
    let plan = currentTarget.value.substring(0, 4)
    let proyect = currentTarget.value.substring(4, 20)
    AnioIDB = plan
    ProyectocodigoB = proyect
})
let Rolpagina
$("#AddComent-btn").on("click", function () {
    let item = $(this).data("item")
    if (item) {
        $(this).data("item", null)
        let comment = $("#textareaComentario").val()
        $.ajax({
            method: "post",
            data: JSON.stringify({
                "AnioID": item.AnioID,
                "ProyectoCodigo": item.ProyectoCodigo,
                "Correlativo": item.Corr_Comentario,
                "Comentario": comment
            }),
            url: `${urlbase}api/DescripcionActualDelProyecto/ActualizarComentario`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                swal.fire("Exito", "Comentario editado correctamente", "success")
                $("#textareaComentario").val(null)
                $(this).html("AGREGAR")
            }
        })
        return
    }
    let tipoComentario  
    switch (rol.toLowerCase()) {
        case "supervisor":
            tipoComentario = 3
            break
        case "director":
            tipoComentario = 1
            break
        case "administradores":
            tipoComentario = 4
            break
        case "coordinador de seguimiento":
            tipoComentario = 2
            break
        default:
            tipoComentario = 4
    }
    let obj = {
        "AnioID": $("#PlanAnualList").val(),
        "ProyectoCodigo": $("#ProyectoList").val(),
        "Comentario": $("#textareaComentario").val(),
        "Idtipocomentario": tipoComentario,
        "Id_usuario": user,
        "Fecha": new Date()
    }
    if (EsSupervisor == 1) {
        obj = {
            "AnioID": AnioID,
            "ProyectoCodigo": Proyectocodigo,
            "Comentario": $("#textareaComentario").val(),
            "Idtipocomentario": tipoComentario,
            "Id_usuario": user,
            "Fecha": new Date()
        }
    }
    $.ajax({
        url: `${urlbase}api/DescripcionActualDelProyecto/InsertarComentarioXProyecto`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(obj),
        success: (val) => {
            let message = "Comentario creado correctamente"
            swal.fire(message, "", "success")
            $("#textareaComentario").val(null)
            $("#customRadio2").attr("checked", true)             
            cargainicial();
        },
        error: function (response) {
            swal.fire(response.responseJSON.message, response.responseJSON.detail, "error");
            return false
        }
    })
})

function setTableRows(val) {
    let $table = $("#comentarios-table tbody");

    let rows = val.map((item) => {
        let row = `
                    <tr class="text-center td-custom">
                        <td class="spacer bg-light"></td>
                        <td>
                           ${createButtonWrapperEdit(["edit", "delete"])}
                        </td>
                        <td>${item.AnioID}</td>
                        <td>${item.ProyectoCodigo}</td>
                        <td>${moment(item.Fecha_Creacion).format("DD/MM/YYYY")}</td>
                        <td>
                            ${createFormWrapperEdit(item.Comentario, "comentario")}
                        </td>
                        <td>${item.IdUsuario || item.id_usuario}</td>
                        <td>${item.Descripcion_Tipo_Comentario}</td>
                        <td class="spacer bg-light"></td>
                    </tr>`;
        let $row = $(row);
        $row.data("meta", item);
        return $row;
    });
    $table.append(rows);
}

function updateTable() {
    let searchType = $("input[name='tipoFiltro']:checked").val()
    let proy = $("#ProyectoList-busqueda").val()
    let plan = $("#PlanAnualList-busqueda").val()
    if (EsSupervisor == 1) {
        proy = ProyectocodigoB
        plan = AnioIDB
        Rolpagina = 'supervisor'
    }
    else {
        Rolpagina = ''
    }
    let start, end
    switch (searchType) {
        case "proyXfecha":
            start = $("#desdeBusqueda-dp").datetimepicker("date").format("YYYY-MM-DD")
            end = $("#hastaBusqueda-dp").datetimepicker("date").format("YYYY-MM-DD")
            url = `${urlbase}api/DescripcionActualDelProyecto/BusquedaComentarioXFechasYProy/${user}/${proy}/${start}/${end}/${Rolpagina}`
            break
        case "proyecto":
            url = `${urlbase}api/DescripcionActualDelProyecto/BusqComentarioXProyectotodos/${user}/${plan}/${proy}/${Rolpagina}`
            break
        case "todosXfecha":
            start = $("#desdeBusqueda-dp").datetimepicker("date").format("YYYY-MM-DD")
            end = $("#hastaBusqueda-dp").datetimepicker("date").format("YYYY-MM-DD")
            url = `${urlbase}api/DescripcionActualDelProyecto/BusqXFecha/${user}/${start}/${end}/${Rolpagina}`
            break
        default:
            alert(`tipo de busqueda ${searchType} no controlada`);
            return
    }
    let $table = $("#comentarios-table tbody")
    $table.html(null)
    $.ajax({
        url: url,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            setTableRows(val)
        },
        error: function (response) {

        }
    })
}

$("#searchProys-btn").on("click", updateTable)

$("#comentarios-table tbody").on("click", ".table_edit_delete-btn", function () {
    let item = $(this).closest("tr").data("meta")
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
                url: `${urlbase}api/DescripcionActualDelProyecto/ElimComentario`,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                method: "POST",
                data: JSON.stringify({
                    "AnioID": item.AnioID,
                    "ProyectoCodigo": item.ProyectoCodigo,
                    "Correlativo": item.Corr_Comentario
                }),
                success: () => {
                    swal.fire("Comentario eliminado", "", "success")
                    cargainicial();
                }
            })
        }
    })
})

$("#getLast-btn").on("click", () => {
    $.ajax({
        url: `${urlbase}api/DescripcionActualDelProyecto/ObteUltimoComentario/${user}/2`,
        success: (val) => {
            if (val[0] != null) {
                $("#textareaComentario").val(val[0].Comentario)
                $("#AddComent-btn").data("item", val[0])
                $("#ProgramaList").data("id", val[0].ProyectoCodigo.split("-")[0])
                $("#ProyectoList").data("id", val[0].ProyectoCodigo)
                $("#PlanAnualList").data("id", val[0].AnioID)
                $("#PlanAnualList").val(val[0].AnioID).trigger("change")
                $("#AddComent-btn").html("Editar &Uacute;ltimo")
            }
            else {
                swal.fire("No existen comentarios previos del usuario", "", "error")

            }
        },
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        }
    })
})

$("#add-form select").on("change", function () {
    if (!$(this).data("id") && $("#AddComent-btn").data("item")) {
        $("#AddComent-btn").data("item", null)
        $("#AddComent-btn").html("AGREGAR")
        $("#textareaComentario").val(null)
    }
})