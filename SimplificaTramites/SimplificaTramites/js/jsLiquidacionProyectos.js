let estadoProyecto
let rolC = rolConsultas
if (rolC === "ADMINISTRADORES") {rolC='TODOS'}
if (rolC === "SUPERVISORES") {
    $("#updateState-btn").prop("disabled", true);
    $("#estados").prop("disabled", true);
    $("#comentario").prop("disabled", true);
}
$("#equipos-table ").on("change", ".setFile-table", function () {
    const $label = $(this).closest("td").find(".file-name");
    const $noLabel = $(this).closest("td").find(".no-file-label");
    if (this.files.length > 0) {
        var extension = "." + this.files[0].name.split('.').pop();
        var name = this.dataset.req + '-' + this.files[0].name.substr(0, 5) + extension;
        $label.html(name);
        $noLabel.addClass("d-none");
    } else {
        $label.html(null);
        $noLabel.removeClass("d-none");
    }
})


$("select").select2({ theme: "bootstrap" });
$.ajax({
    url: `${urlbase}api/LiquidacionProyecto/ObtenerPlanesAnuales`,
    success: (res) => {
        let options = res.map((val) => new Option(val.PlanAnualNombre, val.AnioID))
        $('#PlanAnualList').append(options).trigger("change")
        if (rolC === "SUPERVISORES") {
            plan = user.substr(0, 4);
            $('#PlanAnualList').val(plan);
            $('#PlanAnualList').append(plan).trigger("change")
            $("#PlanAnualList").prop("disabled", true);
            $("#ProgramaList").prop("disabled", true);
            $("#divPrograma").hide();
        }
    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})
$.ajax({
    url: `${urlbase}api/LiquidacionProyecto/CargarEstado`,
    success: (res) => {
        let options = res.map((val) => new Option(val.Estado, val.EstadoID));
        estadoProyecto = res.EstadoID;
        $('#estados').append(options).trigger("change");
    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})

$("#PlanAnualList").on("change.select2", ({ currentTarget }) => {
    let plan = currentTarget.value;
    $('#ProgramaList').find("option").remove();
    $("#ProyectoList").html(null)
    $.ajax({
        url: `${urlbase}api/LiquidacionProyecto/ObtenerProgramas/${plan}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (res) => {
            $('#ProgramaList').append(res.map((val) => new Option(val.ProgramaNombre, val.ID.split(",")[1]))).trigger("change");
        }
    })
})

$("#ProgramaList").on("change.select2", ({ currentTarget }) => {
    let program = currentTarget.value;
    let plan = $("#PlanAnualList").val();
    if (rolC === "SUPERVISORES")
    {
        plan = user.substr(0, 4);
        
    }
    $('#ProyectoList').find("option").remove();
    $.ajax({
        url: `${urlbase}api/LiquidacionProyecto/ObtenerListaProyectosSEG/${plan},${program}/${plan}/${user.substr(4, 10)}/${rolC}/`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (res) => {
            if (res.length > 0) {

                $("#ProyectoList").html(null)
                $('#ProyectoList').append(res.map((val) => new Option(val.ProyectoDescipcion, val.ID.split(",")[1]))).trigger("change");
            }
        }
    })
})

$("#ProyectoList").on("change.select2", ({ currentTarget }) => {
    setComments(currentTarget);
    let proyect = $(currentTarget).val();
    let myprogram = proyect.split("-");
    let plan = $("#PlanAnualList").val();
    let program = myprogram[0];//$("#ProgramaList").val();  
    rolC = rolConsultas
    if (rolC === "ADMINISTRADORES") { rolC = 'TODOS' }
    $.ajax({
        url: `${urlbase}api/LiquidacionProyecto/ObtienUnoOdos${plan}/${program}/${proyect}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {

            $("#update-btn").attr("disabled", val[0].RETORNAR === 1)
            let tbody = $("#equipos-table tbody")
            tbody.html(null)
            if (val[0].RETORNAR === 1) {
                setTable()
            }
        }
    })
})

function setTable() {
    let plan = $("#PlanAnualList").val()
    let program = $("#ProgramaList").val();
    let proyect = $("#ProyectoList").val()
    let myprogram = proyect.split("-");
    program = myprogram[0];
    const REPARADO = 4
    $.ajax({
        url: `${urlbase}api/LiquidacionProyecto/ObtereCantArchivos${plan}/${program}/${proyect}/${rol}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let tbody = $("#equipos-table tbody")
            tbody.html(null)
            let rows = val.map((item) => `
                 <tr>
                    <td class="spacer"></td>
                    <td class="text-center">
                        <button type="button" class="btn btn-light btn-save" title="Guardar" data-req="${item.RequerimientoID}" data-desc="${item.DescripcionRequerimiento}">
                            <i class="fas fa-save fa-lg"></i>
                        </button>
                    </td>
                    <td class="text-center">${item.RequerimientoID}</td>
                    <td class="text-center col-md-3" id="Descripcion-${item.RequerimientoID}">${item.DescripcionRequerimiento}</td>
                    <td class="text-center">
                        <span class="text-primary mb-2 font-weight-bold file-name mb-2"></span>
                        <div class="custom-file">
                            <label for="filte-${item.RequerimientoID}" class="btn btn-primary hide-browse-btn">
                                SELECCIONAR ARCHIVO
                                <input  type="file" name="photo" ${item.Presentado === true ? "disabled" : ""}
                                    id="filte-${item.RequerimientoID}" class="custom-file-input setFile-table"
                                    data-req="${item.RequerimientoID}"
                                    style="width: 0px;height: 0px;overflow: hidden;padding: 0;border: 0;">
                            </label>
                          </div>
                        <div class="w-100 my-2"></div>
                        <a href="../LiquidacionPdf/${plan}/${proyect}/${item.NombreArchivo}" target="_blank"><span class="text-center  no-file-label" >${item.NombreArchivo != null ? item.NombreArchivo : ""}</span></a>
                    </td>
                    <td class="text-center"><textarea  class="form-control" rows="3" id="obser-${item.RequerimientoID}">${item.Observacion != null ? item.Observacion : ""}</textarea></td>
                    <td class="text-center">
                    <div class='custom-control custom-checkbox'>
                        <input type ='checkbox' class='custom-control-input chkPresentado' data-req="${item.RequerimientoID}"  ${rolC === "SUPERVISORES" ? "disabled" : ""}
                            data-anio="${item.AnioID}" data-proyecto="${item.ProyectoCodigo}"
                            id='chkPresentado-${item.RequerimientoID}' ${item.Presentado ? "checked" : ""}>
                        <label class='custom-control-label' for='chkPresentado-${item.RequerimientoID}'></label>
                    </div>
                    </td> <td class="text-center">
                    <div class='custom-control custom-checkbox'>
                        <input type ='checkbox' class='custom-control-input chkReparado' data-req="${item.RequerimientoID}"  ${rolC === "SUPERVISORES" ? "disabled" : ""}
                            data-anio="${item.AnioID}" data-proyecto="${item.ProyectoCodigo}"
                            id='chkReparado-${item.RequerimientoID}' ${item.Erronea ? "checked" : ""}>
                            <label class='custom-control-label' for='chkReparado-${item.RequerimientoID}'></label>
                        </div>
                    </td>
                    <td class="spacer"></td>
                </tr>
            `)
            tbody.append(rows);            
        }
    })
}


function setComments(currentTarget) {
    if (!currentTarget.selectedOptions[0]) {
        $(".proy-depend").addClass("d-none")
        return
    }

    let plan = $("#PlanAnualList").val()
    let program = $("#ProgramaList").val()
    let proyect = currentTarget.value
    let myprogram = proyect.split("-");
    program = myprogram[0];

    $.ajax({
        url: `${urlbase}api/LiquidacionProyecto/ObtenerEstadoComentario${plan}/${program}/${proyect}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            estadoProyecto = val[0]?.EstadoID || null
            $('#estados').val(estadoProyecto).trigger("change")
            $("#comentario").val(val[0]?.Observaciones || null)
        }
    })
    $(".proy-depend").removeClass("d-none")
}

$("#update-btn").on("click", () => {
    let plan = $("#PlanAnualList").val()
    let program = $("#ProgramaList").val()
    let project = $("#ProyectoList").val()
    let myprogram = project.split("-");
    program = myprogram[0];
    $.ajax({
        url: `${urlbase}api/LiquidacionProyecto/AgregarRequerimientoLiquidacion`,
        method: "post",
        data: JSON.stringify({
            "AnioID": plan,
            "ProgramaCodigo": program,
            "ProyectoCodigo": project,
            "UserName": user
        }),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: () => {
            let message = "Requerimiento Agregado"
            swal.fire(message, "", "success")
            $("#ProyectoList").trigger("change")
        }
    })
    $.ajax({
        url: `${urlbase}api/LiquidacionProyecto/InsertEstadoProyecto`,
        method: "post",
        data: JSON.stringify({
            "AnioID": plan,
            "ProgramaCodigo": program,
            "ProyectoCodigo": project,
            "EstadoID": 2,
            "Observaciones": "",
            "UserName": user
        }),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: () => {
            //let message = "Estado Asignado"
            //swal.fire(message, "", "success")
        }
    })
})


$("#updateState-btn").on("click", () => {
    let plan = $("#PlanAnualList").val()
    let program = $("#ProgramaList").val()
    let proyect = $("#ProyectoList").val()
    let myprogram = proyect.split("-");
    program = myprogram[0];
    let state = $("#estados").val()
    let observations = $("#comentario").val()
    $.ajax({
        url: `${urlbase}api/LiquidacionProyecto/ActualizarEstadoLiquidacion`,
        method: "post",
        data: JSON.stringify({
            "AnioID": plan,
            "ProgramaCodigo": program,
            "ProyectoCodigo": proyect,
            "EstadoID": state,
            "Observaciones": observations,
            "UserName": user
        }),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: () => {
            let message = "Mensaje modificado correctamente"
            swal.fire(message, "", "success")
            setTable();
            //$("#update-btn").click()
        }
    })
});

$("#equipos-table tbody").on("click", ".btn-save", (e) => {
    let observations = $(`#obser-${e.currentTarget.dataset.req}`).val();
    let nombre = e.currentTarget.dataset.desc;
    var requirements = e.currentTarget.dataset.req;
    var files = $(`#filte-${e.currentTarget.dataset.req}`).prop('files');
    const plan = $("#PlanAnualList").val();
    const project = $("#ProyectoList").val();
    let data = new FormData();
    let name = "";
    if (files && files.length > 0) {
        var file = files[0];

        var extension = "." + file.name.split('.').pop();
        name = e.currentTarget.dataset.req + '-' + nombre.substr(0, 5) + extension;
        data.append('file', file);
        data.append("NombreArchivo", name);
        data.append("AnioID", plan);
        data.append("ProyectoCodigo", project);
        $.ajax({
            url: `../Helpers/FileUploadLiquidacion.ashx`,
            method: "POST",
            data: data,
            processData: false,
            contentType: false,
            success: (val) => {
                UpdateData(requirements, observations, name, 'api/LiquidacionProyecto/ActualizarLiquidacion');
            },
            error: (e) => {
                var message = e.responseText || "Error al actualizar los datos.";
                Swal.fire({ icon: 'error', title: "Error al actualizar", text: message });
            }
        });
    } else {
        UpdateData(requirements, observations, name, 'api/LiquidacionProyecto/ActualizarEstadoColPresentado');
    }
});

function UpdateData(requirements, observations, name, url) {
    const plan = $("#PlanAnualList").val();
    let program = $("#ProgramaList").val();
    let project = $("#ProyectoList").val()
    let myprogram = project.split("-");
    program = myprogram[0];
    var datas = JSON.stringify({
        "AnioID": parseFloat(plan),
        "ProgramaCodigo": program,
        "ProyectoCodigo": project,
        "RequerimientoID": parseFloat(requirements),
        "NombreArchivo": name,
        "Observacion": observations,
        "UserName": user,
        "Rol": "TODOS"
    });
    $.ajax({
        url: `${urlbase}${url}`,
        method: "POST",
        data: datas,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            setTable();
            const message = "Se actualizaron los datos correctamente";
            Swal.fire({ icon: 'success', title: message});
        },
        error: (e) => {
            var message = e.responseText || "Error al actulizar los datos.";
            Swal.fire({ icon: 'error', title: "Error al actualizar", text: message });
        }
    })
}


$("table#equipos-table").on("change", ".chkPresentado", (e) => {
    var requerimientos = e.currentTarget.dataset.req;
    var anio = e.currentTarget.dataset.anio;
    var proyecto = e.currentTarget.dataset.proyecto;
    var presentado = e.currentTarget.checked;
    $.ajax({
        url: `${urlbase}api/LiquidacionProyecto/ActualizarEstadoPres`,
        method: "post",
        data: JSON.stringify({
            "AnioID": anio,
            "ProyectoCodigo": proyecto,
            "RequerimientoID": requerimientos,
            "Presentado": presentado
        }),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (result) => {
            setTable();
            const message = "El estado presentado fue modificado correctamente.";
            Swal.fire({ icon: 'success', title: message, showConfirmButton: false, timer: 1250 });
        },
        error: (e) => {
            var message = e.responseJSON.Message || "Error al cambiar el estado de presentado.";
            Swal.fire({ icon: 'error', title: "Error al actualizar", text: message });
        }
    });
});

$("table#equipos-table").on("change", ".chkReparado", (e) => {
    var requerimientos = e.currentTarget.dataset.req;
    var anio = e.currentTarget.dataset.anio;
    var proyecto = e.currentTarget.dataset.proyecto;
    var reparado = e.currentTarget.checked;
    var data = JSON.stringify({
        "AnioID": parseFloat(anio),
        "ProyectoCodigo": proyecto,
        "RequerimientoID": parseFloat(requerimientos),
        "Erronea": reparado
    });
    $.ajax({
        url: `${urlbase}api/LiquidacionProyecto/ActualizarEstadoErro`,
        method: "post",
        data: data,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (result) => {
            setTable();
            if (result > 0) {
                const message = "El estado de reparado fue modificado correctamente.";
                Swal.fire({ icon: 'success', title: message, showConfirmButton: false, timer: 1250 });
            } else {
                const message = "El estado de reparado no fue modificado";
                Swal.fire({ icon: 'error', title: message, showConfirmButton: false, timer: 1250 });
            }
        },
        error: (e) => {
            var message = e.responseJSON.Message || "Error al cambiar el estado de reparado.";
            Swal.fire({ icon: 'error', title: "Error al actualizar", text: message });
        }
    });
});

$("#listDoc").on("click", () => {
    const plan = $("#PlanAnualList").val();
    let program = $("#ProgramaList").val();
    let project = $("#ProyectoList").val()
    let myprogram = project.split("-");
    program = myprogram[0];
    opendialog("/visorinformesSti.aspx?reporteID=9909&AnioID=" + plan + "&ProyectoCodigo=" + project);
})
$("#bliquidacion").on("click", () => {
    const plan = $("#PlanAnualList").val();
    let program = $("#ProgramaList").val();
    let project = $("#ProyectoList").val()
    let myprogram = project.split("-");
    program = myprogram[0];
    opendialog("/visorinformesSti.aspx?reporteID=99091&AnioID=" + plan + "&ProyectoCodigo=" + project);
})


function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Archivos Liquidacion",
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