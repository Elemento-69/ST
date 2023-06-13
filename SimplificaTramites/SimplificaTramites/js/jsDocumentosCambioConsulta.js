function setTable() {

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
            data: 'DocCambioCorrel',
            render: (val, _ , row) => {
                let act_btns = ""
                return ` ${act_btns}
                    <button type="button" class="action-icon btn hover-blue print-btn" data-toggle="popover" data-trigger="hover" data-id="${val}" 
                       data-Anio="${row.AnioId}" data-ProyectoCodigo="${row.ProyectoCodigo}" data-content="Detalle de estimaciones" data-placement="top">
                        <i class="fas fa-print fa-lg fa-fw"></i>
                    </button>`
            }
        },
        {
            className: 'text-center',
            title: "Año",
            data: 'AnioId'
        },
        {
            className: 'text-center',
            title: "Proyecto",
            data: 'ProyectoCodigo'
        },
        {
            className: 'text-center',
            title: "Correlativo",
            data: 'DocCambioCorrel'
        },
        {
            title: "Tipo",
            className: 'text-center',
            data: 'DocCambioTipoID'
        },
        {
            title: "Descripción",
            className: 'text-center',
            data: 'DocCambioJustifica'
        },
        {
            title: "Días Plazo",
            className: 'text-center',
            data: 'DiasDocCambio'
        },
        {
            title: "Monto",
            className: 'text-center frcurrency-mask',
            data: 'MontoDocCambio'
        },
        {
            title: "Estado",
            className: 'text-center',
            data: 'Estado'
        },        
        {
            title: "Presentación",
            className: 'text-center',
            data: 'FechaPres',
            render: (val) => moment(val).format("DD/MM/YYYY")
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
    $("#doc_cambio-table").dataTable(generateDataTable(columns, extra, `${urlbase}api/DocumentosCambio/GetDocumentosCambioListado`))
}
setTable()

//$("#doc_cambio-table tbody").on("click", ".edit-btn", ({ currentTarget }) => {
//    let type = $(currentTarget).data("type")
//    let id = $(currentTarget).data("id")
//    switch (type) {
//        case "ATE":
//            window.location.href = `/Ejecucion/AcuerdoTrabajoExtra.aspx?doc=${id}`
//            break
//        case "OTS":
//            window.location.href = `/Ejecucion/OrdenTrabajoSuplementario.aspx?doc=${id}`
//            break
//        case "OC":
//            window.location.href = `/Ejecucion/OrdenDeCambio.aspx?doc=${id}`
//            break
//        default:
//            alert(`${type} not defined`)
//    }
//})

//$("#doc_cambio-table tbody").on("click", ".del-btn", ({ currentTarget }) => {
//    let item = $(currentTarget).closest("tr").data("item")
//    Swal.fire({
//        title: 'Eliminar Registro',
//        text: "Esta seguro de eliminar este registro, es irreversible!",
//        icon: 'warning',
//        showCancelButton: true,
//        confirmButtonColor: '#3085d6',
//        cancelButtonColor: '#d33',
//        confirmButtonText: 'Si'
//    }).then((result) => {
//        if (result.isConfirmed) {
//            $.ajax({
//                url: `${urlbase}api/DocumentosCambio/EliminarDocumentoCambio`,
//                method: "POST",
//                data: JSON.stringify(item),
//                headers: {
//                    "Authorization": "Bearer " + token,
//                    "Content-Type": "application/json",
//                },
//                success: () => {
//                    Swal.fire("Eliminado Exitosamente", "", "success")
//                    setTable()
//                },
//                error: (response) => {
//                    Swal.fire("Error", response.responseJSON.Message, "error")
//                }
//            })
//        }
//    })
//})
$("#doc_cambio-table tbody").on("click", ".print-btn", ({ currentTarget }) => {
    let id = $(currentTarget).data("id")
    let Anio = $(currentTarget).data("anio")
    let Pro = $(currentTarget).data("proyectocodigo")
    opendialog("/visorinformesSti.aspx?reporteID=7200&AnioID=" + Anio + "&ProyectoCodigo=" + Pro + "&DocCambioCorrel=" + id);

})

function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Impresión de documentos de cambio",
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