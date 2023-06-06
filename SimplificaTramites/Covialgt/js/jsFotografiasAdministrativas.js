var vNombreArchivo;
$(document).ready(function () {
    $("#btnRegresarRegistroDatos").click(function () {
        let QueryString = "?Plan=" + plan + "&Programa=" + proyecto.split('-')[0].toString() + "&Proyecto=" + proyecto
        window.location.href = "RegistroDatos.aspx" + QueryString;
    })
    $("#btnImprimir").click(function () {
       
        opendialog("/VisorInformes.aspx?IdReporte=49&Parameters=" + plan + "," + proyecto+",True,True,True,True,True,True,True,True,119131_119129");
       
    })
    //updateTable()
    fnCargaInicial();
})
//function updateTable() {
//    $.ajax({
//        url: `${urlbase}api/FotografiasAdministrativas/ObtenerFotografiasAdministrativasProyecto/${plan}/${proyecto}`,
//        headers: {
//            "Authorization": "Bearer " + token,
//            "Content-Type": "application/json",
//        },
//        success: (val) => {
//            $("#fotografiasadmin-table tbody").html(null)
//            val.forEach((item) => {
//                let row = $(`
//                    <tr>
//                        <td class="spacer"></td>
//                        <td>
//                            ${createButtonWrapperEditfotoadmin(["edit", "delete"])}
//                        </td>
//                        <td>${item.TramoDesc}</td>
//                        <td>
//                            ${createFormWrapperEditfotoadmin(item.Descripcion, "descripcion")}
//                        </td>
//                        <td>
//                            ${item.Estacion}
//                        </td>
//                        <td>
//                            ${item.Fecha}
//                        </td>
//                        <td>
//                            ${item.FotoNombre}
//                        </td>
//                        <td>
//                             ${createFormWrapperEditfotoadminchbox(item.ImprimeTecnico, "imprimetecnico")}
//
//                        </td>
//                        <td>
//                            <img width="35" class="img-fluid" src="${thumbnail}Tipo=5&MaxPixels=200&Fotografia=${item.FotoNombre}" />
//                            <button type="button" data-name="${item.FotoNombre}" class="btn btn-link img_modal-btn" data-toggle="modal" data-target="#verModal">Ver</button>
//                        </td>
//                        <td class="spacer"></td>
//                    </tr>`)
//                row.data("item", item)
//                $("#fotografiasadmin-table tbody").append(row)
//            })
//        }
//    })
//}

function fnCargaInicial() {
    let num = 0;
    let columns = [
        {
            searchable: false,
            orderable: false,
            className: 'spacer',
            defaultContent: ""
        },
        {
            title: '',
            searchable: false,
            orderable: false,
            className: 'text-center',
            data: 'AnioID',
            render: (val, _, row) => {
                let act_btns = ""
                return ` ${act_btns}
                    <button type="button" class="action-icon hover-blue btn btn-light del" data-toggle="popover" data-trigger="hover"
                        data-content="Eliminar" data-placement="top" style="cursor:pointer" onclick="fnEliminarFoto('${row.AnioID}', '${row.ProyectoCodigo}', '${row.FotografiaID}',)" title="Eliminar Tramo">
                        <i class="fas fa-trash fa-lg fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Actualizar"data-placement="top" onclick="fnModal('${row.AnioID}', '${row.ProyectoCodigo}', '${row.FotografiaID}', '${row.Descripcion}', '${row.ImprimeTecnico}');" style="cursor:pointer" data-dismiss="modal"  title="Editar Fotografía Administrativa">
                        <i class="fas fa-edit fa-lg fa-fw"></i>
                    </button>
                    `
            }
        },
        {
            className: 'text-center',
            title: "Tramo",
            data: 'TramoDesc'
        },

        {
            className: 'text-center',
            title: "Descripción",
            data: 'Descripcion'
        },
        {
            className: 'text-center',
            title: "Estacion",
            data: 'Estacion'
        },
        {
            className: 'text-center',
            title: "Fecha",
            data: 'Fecha'
        },
        {
            className: 'text-center',
            title: "FotoNombre",
            data: 'FotoNombre'
        },

        {

            render: (val, _, row) => {
                data: 'ImprimeTecnico'
                let act_btns = ""
                num  += 1;
                if (row.ImprimeTecnico == true) {
                    return ` ${act_btns}
                         <td class="text-center">
                            <input type='checkbox' name='chk${num}'  id='chk${num}' checked disabled="disabled">
                         `
                } else {
                    return ` ${act_btns}
                         <td class="text-center">
                            <input type='checkbox' name='chk${num}'  id='chk${num}' disabled="disabled">
                         `
                }
            }
        },
        {
            render: (val, _, row) => {
                data: 'FotoNombre'
                let act_btns = ""
                return ` ${act_btns}
                         <td>
                           <img width="35" class="img-fluid" src="${thumbnail}Tipo=4&MaxPixels=200&Fotografia=${row.FotoNombre}" />
                            <button type="button" data-name="${row.FotoNombre}" class="btn btn-link img_modal-btn" data-toggle="modal" data-target="#verModal">Ver</button>
                       </td>
                         `
            }
        },
        {
            searchable: true,
            orderable: true,
            className: 'spacer',
            defaultContent: ""
        }
    ]
    let extra = {
        serverSide: false,
        order: [[1, "desc"]],
        createdRow: function (row, data, dataIndex) {
            $(row).data("item", data)
        },
        drawCallback: () => {
            initMasks('table')
        },

    }
    $("#fotografiasadmin-table").dataTable(generateDataTable(columns, extra, `${urlbase}api/FotografiasAdministrativas/ObtenerFotografiasAdministrativasProyecto/${plan}/${proyecto}`))
}

$("#fotografiasadmin-table tbody").on("click", ".img_modal-btn", function () {
    $("#modal-img").attr("src", `${thumbnail}Tipo=4&MaxPixels=0&Fotografia=${this.dataset.name}`)
    vNombreArchivo = this.dataset.name;
})

//saveInputEditTableButtonsfotoadmin = (row, items) => {
//    const item = row.data("item")
//    const obj = {
//        "AnioID": item.AnioID,
//        "ProyectoCodigo": item.ProyectoCodigo,
//        "FotografiaId": item.FotografiaID,
//        "Descripcion": items.descripcion,
//        "ImprimeTecnico": items.imprimetecnico
//    }
//    $.ajax({
//        url: `${urlbase}api/FotografiasAdministrativas/ActualizarFotografiaAdministrativa`,
//        headers: {
//            "Authorization": "Bearer " + token,
//            "Content-Type": "application/json",
//        },
//        method: "POST",
//        data: JSON.stringify(obj),
//        success: () => {

//            let message = "Foto Administrativa actualizada"
//            swal.fire(message, "", "success")
//        },
//        error: function (response) {
//            //swal.fire(response.responseJSON.message, response.responseJSON.detail, "error").then(() => location.reload());
//            return false
//        }
//    })
//}

function fnModal(AnioID, ProyectoCodigo, FotografiaID, Descripcion, ImprimeTecnico) {
    console.log(ImprimeTecnico, Descripcion);
        if (ImprimeTecnico == 'true') {
            $("#chks").prop("checked", true);
        } else {
            $("#chks").prop("checked", false);
        }
    $("#txtfoto").val(FotografiaID);
    $("#txtDescripcion").val(Descripcion);
    $("#verModal-Act").modal('show');
}
//Actualizar Foto
$("#btnGuardarAct").on("click", () => {
    let check = 0;
    if ($("#chks").is(":checked")) {
        check = 'true'
    } else {
        check = 'false'
    }
    let data = {
        "AnioID": plan,
        "ProyectoCodigo": proyecto,
        "FotografiaId": $("#txtfoto").val(),
        "Descripcion": $("#txtDescripcion").val(),
        "ImprimeTecnico": check,
    };
    $.ajax({
        url: `${urlbase}/api/FotografiasAdministrativas/ActualizarFotografiaAdministrativa`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "Fotografía actualizada con exito"
            swal.fire(message, "", "success")
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "Fotografia administrativa actualizada correctamente", "success");
            fnCargaInicial()
        },
        error: function (response) {
            Swal.fire("Error", "No se actualizo la fotografía, debe de revisar los datos.", "error")
            return false
        }
    });
});

function fnEliminarFoto(AnioID, ProyectoCodigo, FotografiaID) {
    Swal.fire({
        title: "Favor confirmar",
        text: "¿Desea eliminar la fotografía?",
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    })
        .then((result) => {
            if (result.isConfirmed) {
                $.LoadingOverlay("show")
                $.ajax({
                    url: `${urlbase}api/FotografiasAdministrativas/EliminarFotografiaAdministrativa`,
                    method: "post",
                    data: JSON.stringify({
                        "AnioID": AnioID,
                        "ProyectoCodigo": ProyectoCodigo,
                        "FotografiaId": FotografiaID,
                    }),
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"
                    },
                    success: (val) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("Éxito", "Fotografía elimada correctamente", "success");
                        fnCargaInicial()
                    },
                    error: (error) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("", error.message + " ", "error");
                    }
                })
            }
        });
}

//$("#fotografiasadmin-table tbody").on("click", ".table_edit_delete-btn", function () {
//    let item = $(this).closest("tr").data("item")
//    Swal.fire({
//        title: 'Estas Seguro?',
//        text: "Esta operación no se puede revertir!",
//        icon: 'warning',
//        showCancelButton: true,
//        confirmButtonColor: '#3085d6',
//        cancelButtonColor: '#d33',
//        confirmButtonText: 'Si'
//    }).then((result) => {
//        if (result.isConfirmed) {
//            $.ajax({
//                url: `${urlbase}api/FotosBitacora/ElimFotoBitacora`,
//                headers: {
//                    "Authorization": "Bearer " + token,
//                    "Content-Type": "application/json",
//                },
//                method: "POST",
//                data: JSON.stringify({
//                    "AnioID": item.AnioID,
//                    "ProyectoCodigo": item.ProyectoCodigo,
//                    "BitacoraCorr": item.BitacoraCorr
//                }),
//                success: () => {
//                    swal.fire("Fotografía eliminada", "", "success")
//                    updateTable()
//                }
//            })
//        }
//    })
//})

function fnRotarFoto(rotarIzquierda) {


    var dataJSONt = JSON.stringify({
        nombreArchivo: vNombreArchivo,
        rotarIzquierda: rotarIzquierda
    });
    $.ajax({
        type: "POST",
        url: "frmFotografiasAdministrativas.aspx/fRotarFoto",
        data: dataJSONt,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var nombreArchivoNuevo = data.d;
            var rutaFoto = thumbnail + "Tipo=4&MaxPixels=0&Fotografia=" + vNombreArchivo+"&random=" + new Date().getTime();
            //localhost:44390/GetThumbnail.aspx?Tipo=3&MaxPixels=0&Fotografia=000053582W.jpeg&EMID=ID_1
            document.getElementById("modal-img").src = rutaFoto;
            //   var rutaFotoEmergencia = vRutaEmergencias + 'Fotos\\ID_' + idEmergencia + '\\'
            //var dataJSONRotar = JSON.stringify({
            //    idEmergencia: vIdEmergencia,
            //    archivoOriginal:vNombreArchivo,
            //    archivoTemporal: nombreArchivoNuevo
            //})
            //$.ajax({
            //    type: "POST",
            //    url: "frmEmergenciasEdicionFoto.aspx/fReemplazarArchivoFoto",
            //    data: dataJSONRotar,
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    success: function (data) {
            //        var resultado = data.d;

            //        if (resultado) {

            //        }
            //        //var rutaFoto = thumbnail + "Tipo=3&MaxPixels=0&Fotografia=" + nombreArchivoNuevo + ".jpeg&EMID=ID_" + vIdEmergencia + "&random=" + new Date().getTime();
            //        ////localhost:44390/GetThumbnail.aspx?Tipo=3&MaxPixels=0&Fotografia=000053582W.jpeg&EMID=ID_1
            //        //document.getElementById("image-foto").src = rutaFoto;


            //    },
            //    failure: function (response) {
            //        Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
            //    }
            //});
        },
        failure: function (response) {
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}

function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Fotografías Administrativas",
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