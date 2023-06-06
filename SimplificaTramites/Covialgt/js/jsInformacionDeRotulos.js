$("select").select2({ theme: "bootstrap" })

$("#FechaFotografia-dp").datetimepicker({
    format: 'MM/DD/YYYY HH:mm:ss a'
});

$.ajax({
    url: `${urlbase}api/plananual/get`,
    success: (val) => {
        let options = val.map((val) => new Option(val.PlanAnualNombre, val.AnioID))
        $('#PlanAnualList').append(options).trigger("change")
    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})

$("#PlanAnualList").on("change.select2", ({ currentTarget }) => {
    let plan = currentTarget.value
    $('#ProgramaList').find("option").remove()
    $('#ProyectoList').find("option").remove()
    $.ajax({
        url: `${urlbase}api/Programa/Get/${plan}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#ProgramaList').append(val.map((val) => new Option(val.ProgramaNombre, val.ProgramaCodigo))).trigger("change")
        }
    })
})

$("#ProgramaList").on("change.select2", ({ currentTarget }) => {
    let program = currentTarget.value
    let plan = $("#PlanAnualList").val()
    $('#ProyectoList').find("option").remove()
    $.ajax({
        url: `${urlbase}api/Proyecto/GetListadoXPrograma/${plan}/${program}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#ProyectoList').append(val.map((val) => new Option(val.ProyectoDescripcion, val.ProyectoCodigo))).trigger("change")
        }
    })
})

$("#ProyectoList, #PlanAnualList").on("change.select2", ({ currentTarget }) => {
    let plan = $("#PlanAnualList").val()
    let proyect = $("#ProyectoList").val()
    $("#contratista").html(null)
    $("#tramo").html(null)
    if(!plan || ! proyect) return
    $.ajax({
        url: `${urlbase}api/Rotulos/ListaTramos${plan}/${proyect}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let cols = val.map((item) => `<option value="${item.TramoID}">${item.TramoDesc}</option>`)
            $("#tramo").html(cols.join("")).trigger("change")
        }
    })
    $.ajax({
        url: `${urlbase}api/Rotulos/ObtenerProySuperTodos${plan}/${proyect}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let cols = val.map((item) => `<option value="${item.Id}">${item.ProyectoDescripcion}</option>`)
            $("#contratista").html(cols.join("")).trigger("change")
        }
    })
    setPhotoTable()
})
initMasks()

function setPhotoTable() {
    let plan = $("#PlanAnualList").val()
    let proyect = $("#ProyectoList").val()
    $("#fotos-table tbody").html(null)
    $.ajax({
        url: `${urlbase}api/Rotulos/ConsultarFotos${plan}/${proyect}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let cols = val.map((item) => {
                url = `${thumbnail}Tipo=2&MaxPixels=200&Fotografia=${item.Foto}`.replace(" ", "")
               // url = `https://elephant-project.com/SICOP/GetThumbnail.aspx?Tipo=3&MaxPixels=0&Fotografia= ${item.Foto}&EMID=ID_1`.replace(" ", "")
                let row = ` <tr>
                                <td class="spacer"></td>
                                <td>
                                    <button type="button" data-id="${item.Correlativo}" class="btn btn-light action-icon hover-red del-btn" data-toggle="popover" data-trigger="hover" 
                                        data-content="Eliminar" data-placement="top">
                                        <i class="fas fa-trash fa-lg fa-fw"></i>
                                    </button>
                                </td>
                                <td>${item.TramoDesc}</td>
                                <td>${item.Descripcion}</td>
                                <td>${item.Estacion}</td>
                                <td>${moment(item.Fecha).format("MM/DD/YYYY HH:mm:ss a")}</td>
                                <td class="text-center">
                                    <img class="img-fluid" src="${url}"></img>
                                </td>
                                <td class="spacer"></td>
                            </tr>`
                return row
            })
            $("#fotos-table tbody").html(cols.join(""))
        }
    })
}

$("#insert-btn").on("click", () => {
    let date = $("#FechaFotografia-dp").datetimepicker("date")
    data = {
        "AnioID": $("#PlanAnualList").val(),
        "ProyectoCodigo": $("#ProyectoList").val(),
        "TramoID": $("#tramo").val(),
        "Estacion": $("#estacion").val(),
        "Latitud": parseFloat($("#latitud").val()),
        "Longitud": parseFloat($("#longitud").val()),
        "Fecha": date.toDate(),
        "Descripcion": $("#comentario").val(),
        "Foto": $("#foto-input").prop('files')[0].name,
        "UserName": user
    }
    formData = new FormData();
    for (key in data) {
        formData.append(key, data[key])
    }
    let image = 
        formData.append("file", $("#foto-input").prop('files')[0], $("#foto-input").prop('files')[0].name)
    $.ajax({
        url: `${urlbase}api/Rotulos/InsertFoto`,
        method: "POST",
        contentType: false,
        processData: false,
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: () => {
            CalluploaderHandler();
           
        },
        error: ({ responseJSON }) => Swal.fire("Error al agregar fotografía", responseJSON.Errors.reduce((ant, actual) => {
            return ant + actual.message
        }, ""), "error")
    })
})

$("body").on("click", ".del-btn", function () {
    let data = {
        "Correlativo": $(this).data("id")
    }
    Swal.fire({
        title: 'Eliminar Registro',
        text: "Esta seguro de eliminar este registro, es irreversible!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `${urlbase}api/Rotulos/Elimfoto`,
                method: "POST",
                data: JSON.stringify(data),
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: () => {
                    Swal.fire("Eliminado Exitosamente", "", "success")
                    setPhotoTable()  
                },
                error: (response) => {
                    Swal.fire("Error", response.responseJSON.Message, "error")
                }
            })
        }
    })
})



function CalluploaderHandler() {
    var fileUpload = $("#foto-input").get(0);
    var files = fileUpload.files;
    var test = new FormData();
    for (var i = 0; i < files.length; i++) {
        test.append(files[i].name, files[i]);
    }
    $.ajax({
        type: "POST",
        url: "../FileUploadHandler.ashx?vModuloViene=4",
        contentType: false,
        processData: false,
        data: test,
        success: () => {
            Swal.fire("Fotografía ingresada correctamente", "", "success")
            setPhotoTable()
        },
        error: (response) => {
            Swal.fire("Error", response.responseJSON.Message, "error")
        }
    });
    return false;
}