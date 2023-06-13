$(document).ready(function () {
    $("#btnRegresarRegistroDatos").click(function () {
        let QueryString = "?Plan=" + plan + "&Programa=" + proyecto.split('-')[0].toString() + "&Proyecto=" + proyecto
        window.location.href = "RegistroDatos.aspx" + QueryString;
    })
})

function updateTable() {
    let $categoria = $('#trabajos-table tbody')
    $categoria.html(null)
    $.ajax({
        url: `${urlbase}api/TrabajosXAdministracion/GetTrabajosxAdmon/${plan}/${proyecto}`,
        success: (val) => {
            let options = val.map((item) => `
                <tr>
                    <td class="spacer"></td>
                    <td>
                        <a type="button" class="action-icon hover-blue edit-btn" data-toggle="popover" data-trigger="hover"
                            data-id="${item.TrabajoCorr}"
                            data-content="Editar Trabajo" data-placement="top">
                            <i class="fas fa-edit fa-lg fa-fw"></i>
                        </a>
                        <a type="button" data-id="${item.TrabajoCorr}" class="action-icon hover-red del-btn" data-toggle="popover" data-trigger="hover"
                            data-content="Eliminar Trabajo" data-placement="top">
                            <i class="fas fa-trash fa-lg fa-fw"></i>
                        </a>
                        <a type="button" data-id="${item.TrabajoCorr}" class="action-icon hover-purple print-btn" data-toggle="popover" data-trigger="hover" 
                            data-content="Imprimir" data-placement="top">
                            <i class="fas fa-print fa-lg fa-fw"></i>
                        </a>
                    </td>
                    <td class="text-center">${item.AnioID}</td>
                    <td class="text-center">${item.ProyectoCodigo}</td>
                    <td class="text-center">${item.TrabajoCorr}</td>
                    <td class="text-center">${item.TrabajoJustificacion}</td>
                    <td class="text-center">${item.TrabajoComentario}</td>
                    <td class="text-center frcurrency-mask">${item.TrabajoMonto}</td>
                    <td class="text-center">${item.FechaPresentado ? moment(item.FechaPresentado).format("DD/MM/YYYY") : ""}</td>
                    <td class="text-center">${item.Aprobado ? "Si" : "No"}</td>
                    <td class="text-center">${item.FechaAprobado ? moment(item.FechaAprobado).format("DD/MM/YYYY") : ""}</td>
                    <td class="text-center">${item.EstadoDesc}</td>
                    <td class="spacer"></td>
                </tr>
        `)
            $categoria.append(options)
            initMasks("#trabajos-table tbody")
        },
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        }
    })
}


updateTable();

$("#trabajos-table tbody").on("click", ".del-btn", function () {
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
                url: `${urlbase}api/TrabajosXAdministracion/EliminarTrabajoXAdmon`,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                method: "POST",
                data: JSON.stringify({
                    "TrabajoCorr": this.dataset.id,
                    "AnioID": plan,
                    "ProyectoCodigo": proyecto
                }),
                success: () => {
                    swal.fire("Trabajo eliminado", "", "success")
                    updateTable()
                },
                error: (response) => {
                    Swal.fire("Error", response.responseJSON.Message, "error")
                }
            })
        }
    })
})

$("#trabajos-table tbody").on("click", ".print-btn", function () {
    opendialog("/visorinformesSti.aspx?reporteID=7100&AnioID=" + plan + "&ProyectoCodigo=" + proyecto + "&TrabajoCorr=" + this.dataset.id);
})

$("#trabajos-table tbody").on("click", ".edit-btn", function () {
    $.ajax({
        url: `${urlbase}api/TrabajosXAdministracionAreaTecnica/GetStatusTrabajos/${plan}/${proyecto}/${this.dataset.id}`,
        success: (val) => {
            if (val.length === 0)
                swal.fire("No Editable", "Este trabajo no se puede editar", "error")
               // window.location = `/Ejecucion/GestionTrabajosAdministracion?id=${this.dataset.id}`
            else {
               // swal.fire("No Editable", "Este trabajo no se puede editar", "error")
                window.location = `GestionTrabajosAdministracion?id=${this.dataset.id}`
            }
        },
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        }
    })
})

function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Trabajos por administración",
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