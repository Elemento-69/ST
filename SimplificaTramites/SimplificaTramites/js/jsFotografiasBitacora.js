$(document).ready(function () {
    $("#btnRegresarRegistroDatos").click(function () {
        let QueryString = "?Plan=" + plan + "&Programa=" + proyecto.split('-')[0].toString() + "&Proyecto=" + proyecto
        window.location.href = "RegistroDatos.aspx" + QueryString;
    })
})
function updateTable() {
    $.ajax({
        url: `${urlbase}api/FotosBitacora/ObtDatosBitacora/${plan}/${proyecto}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $("#fotografias-table tbody").html(null)
            val.forEach((item) => {
                let row = $(`
                    <tr>
                        <td class="spacer"></td>
                        <td>
                            ${createButtonWrapperEdit(["edit", "delete"])}
                        </td>
                        <td>${item.BitacoraCorr}</td>
                        <td>
                            ${createFormWrapperEdit(item.Titulo, "titulo")}
                        </td>
                        <td>
                            ${createFormWrapperEdit(item.Descripcion, "descripcion")}
                        </td>
                        <td>
                            <img width="35" class="img-fluid" src="${thumbnail}Tipo=5&MaxPixels=200&Fotografia=${item.FotoNombre}" />
                            <button type="button" data-name="${item.FotoNombre}" class="btn btn-link img_modal-btn" data-toggle="modal" data-target="#verModal">Ver</button>
                        </td>
                        <td class="spacer"></td>
                    </tr>`)
                row.data("item", item)
                $("#fotografias-table tbody").append(row)
            })
        }
    })
}

updateTable()

$("#fotografias-table tbody").on("click", ".img_modal-btn", function () {
    $("#modal-img").attr("src", `${thumbnail}Tipo=5&MaxPixels=0&Fotografia=${this.dataset.name}`)
})

saveInputEditTableButtons = (row, items) => {
    const item = row.data("item")
    const obj = {
        "AnioID": item.AnioID,
        "ProyectoCodigo": item.ProyectoCodigo,
        "BitacoraCorr": item.BitacoraCorr,
        "Descripcion": items.descripcion,
        "Titulo": items.titulo
    }
    $.ajax({
        url: `${urlbase}api/FotosBitacora/ActuProyectoBitacora`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(obj),
        success: () => {
            let message = "Bitacora actualizada"
            swal.fire(message, "", "success")
        },
        error: function (response) {
            swal.fire(response.responseJSON.message, response.responseJSON.detail, "error").then(() => location.reload());
            return false
        }
    })
}

$("#fotografias-table tbody").on("click", ".table_edit_delete-btn", function () {
    let item = $(this).closest("tr").data("item")
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
                url: `${urlbase}api/FotosBitacora/ElimFotoBitacora`,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                method: "POST",
                data: JSON.stringify({
                    "AnioID": item.AnioID,
                    "ProyectoCodigo": item.ProyectoCodigo,
                    "BitacoraCorr": item.BitacoraCorr
                }),
                success: () => {
                    swal.fire("Fotografía eliminada", "", "success")
                    updateTable()
                }
            })
        }
    })
})
$("#btnImprimir").on("click", () => {
    opendialog("/visorinformesSti.aspx?reporteID=1000&AnioID=" + plan + "&ProyectoCodigo=" + proyecto );
})

function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Reporte de Bitácora",
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