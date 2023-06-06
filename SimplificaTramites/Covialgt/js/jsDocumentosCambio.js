$(document).ready(function () {
    $("#btnATE").click(function () {

        window.location.href = window.location.origin + baseSitio + "/Ejecucion/AcuerdoTrabajoExtra";
    })
    $("#btnOTS").click(function () {

        window.location.href = window.location.origin + baseSitio + "/Ejecucion/OrdenTrabajoSuplementario";
    })
    $("#btnOC").click(function () {

        window.location.href = window.location.origin + baseSitio + "/Ejecucion/OrdenDeCambio";
    })

    $("#btnRegresarRegistroDatos").click(function () {
        let QueryString = "?Plan=" + plan + "&Programa=" + proyecto.split('-')[0].toString() + "&Proyecto=" + proyecto
        window.location.href = "RegistroDatos.aspx" + QueryString;
    })
})
let total = 0;
let dias = 0;
function setTable() {
    $("#doc_cambio-table").html(null);
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
            render: (val, _, row) => {
                if (row.DocCambioCorrel == 0) { total = 0; dias = 0;};
                total = total + row.MontoDocCambio;
                dias = dias + row.DiasDocCambio;
                let act_btns = `<button type="button" data-type="${row.DocCambioTipoID}" data-id="${row.DocCambioCorrel}" class="action-icon hover-blue btn btn-light edit-btn" data-toggle="popover" data-trigger="hover" 
                        data-content="Editar" data-placement="top" style="cursor:pointer">
                        <i class="fas fa-pencil-alt fa-lg fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon hover-red btn btn-light del-btn" data-toggle="popover" data-trigger="hover"
                        data-content="Detalle de estimaciones" data-placement="top">
                        <i class="fas fa-trash fa-lg fa-fw"></i>
                    </button>`
                if (row.EstadoID !== 0) act_btns = ""
                return ` ${act_btns}
                    <button type="button" class="action-icon btn hover-blue print-btn" data-toggle="popover" data-trigger="hover" data-id="${val}" 
                        data-content="Detalle de estimaciones" data-placement="top">
                        <i class="fas fa-print fa-lg fa-fw"></i>
                    </button>`
            }
        },
        {
            className: 'text-center',
            title: "Correlativo",
            data: 'DocCambioCorrel'
        },
        {
            title: "Descripción",
            className: 'text-center',
            data: 'DocCambioJustifica'
        },
        {
            title: "Tipo",
            className: 'text-center',
            data: 'TipoDocumento'
        },
        {
            title: "Monto",
            className: 'text-center frcurrency-mask',
            data: 'MontoDocCambio'
        },
        {
            title: "Días Plazo",
            className: 'text-center',
            data: 'DiasDocCambio'
        },
        {
            title: "Estado",
            className: 'text-center',
            data: 'Estado'
        },
        {
            title: "Presentación",
            className: 'text-center',
            data: 'FechaPresentacion',
            render: (val) => moment(val).format("DD/MM/YYYY")
        },
        {
            searchable: false,
            orderable: false,
            className: 'spacer',
            defaultContent: ""
        }
    ]
    let extra = {
        serverSide: false,
        bPaginate: false,
        order: [[2, "asc"]],
        createdRow: function (row, data, dataIndex) {
            $(row).data("item", data)
        },
        drawCallback: () => {
            initMasks('table')
        },
    }
    $("#doc_cambio-table").dataTable(generateDataTable(columns, extra, `${urlbase}api/DocumentosCambio/GetDocumentosCambioGerencial/${plan}/${proyecto}`))
   
    
}
setTable();
function currency(numero, prefix = '', sufix = '') {
    return `${prefix}${numero.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}${sufix}`;
}
$(document).ajaxComplete(function () {
    document.getElementById("doc_cambio-table").deleteTFoot();
    $("#doc_cambio-table").append(
        $('<tfoot/>').append(`<tr>
                     <td class="spacer"></td>
                    <td colspan="1"></td>
                    <td class="text-right font-weight-bolder">TOTAL</td>
                    <td colspan="2"></td>
                    <td class="text-right">${currency(total, 'Q.')}</td>
                    <td class="text-right">${dias}</td>
                    <td colspan="2"></td>
                    <td class="spacer"></td>
                </tr>`)
    );
});

$("#doc_cambio-table tbody").on("click", ".edit-btn", ({ currentTarget }) => {
    let type = $(currentTarget).data("type")
    let id = $(currentTarget).data("id")
    switch (type) {
        case "ATE":
            window.location.href = `AcuerdoTrabajoExtra.aspx?doc=${id}`            
            break
        case "OTS":
            window.location.href = `OrdenTrabajoSuplementario.aspx?doc=${id}`
            break
        case "OC":
            window.location.href = `OrdenDeCambio.aspx?doc=${id}`
            break
        default:
            alert(`${type} not defined`)
    }
})

$("#doc_cambio-table tbody").on("click", ".del-btn", ({ currentTarget }) => {
    let item = $(currentTarget).closest("tr").data("item")
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
                url: `${urlbase}api/DocumentosCambio/EliminarDocumentoCambio`,
                method: "POST",
                data: JSON.stringify(item),
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: () => {
                    Swal.fire("Eliminado Exitosamente", "", "success").then(function () {
                        window.location.href = `DocumentosDeCambio?plan=${plan}&proyecto=${proyecto}&programa=${proyecto.split('-')[0].toString()} `
                    })
                   // setTable()
                },
                error: (response) => {
                    Swal.fire("Error", response.responseJSON.Message, "error")
                }
            })
        }
    })
})
$("#doc_cambio-table tbody").on("click", ".print-btn", ({ currentTarget }) => {
    let id = $(currentTarget).data("id")
    opendialog("/visorinformesSti.aspx?reporteID=7200&AnioID=" + plan + "&ProyectoCodigo=" + proyecto + "&DocCambioCorrel=" + id ); 

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