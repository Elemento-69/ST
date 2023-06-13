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
            data: 'TrabajoCorr',
            render: (val, _ , row) => {
                let act_btns = ""
                return ` ${act_btns}
                    <button type="button" class="action-icon btn btn-light hover-blue print-btn" data-toggle="popover" data-trigger="hover" data-id="${val}"
                       data-Anio="${row.AnioID}" data-ProyectoCodigo="${row.ProyectoCodigo}" data-content="Detalle de estimaciones" data-placement="top">
                        <i class="fas fa-print fa-2x"></i>
                    </button>`
            }
        },
        {
            className: 'text-center',
            title: "Año",
            data: 'AnioID'
        },
        {
            className: 'text-center',
            title: "Proyecto",
            data: 'ProyectoCodigo'
        },
        {
            className: 'text-center',
            title: "Correlativo",
            data: 'TrabajoCorr'
        },
        {
            title: "Justificación",
            className: 'text-center',
            data: 'TrabajoJustificacion'
        },
        {
            title: "Comentario",
            className: 'text-center',
            data: 'TrabajoComentario'
        },
        {
            title: "Monto",
            className: 'text-center frcurrency-mask',
            data: 'TrabajoMonto'
        },
        {
            title: "Fecha presentado",
            className: 'text-center',
            data: 'FechaPresentado',
            render: (val) => moment(val).format("DD/MM/YYYY")
        },
        {
            title: "Aprobado",
            className: 'text-center',
            data: 'Aprobado',
            render: (val) => val ? 'Sí' : 'No'
        },
        {
            title: "Fecha Aprobado",
            className: 'text-center',
            data: 'FechaAprobado',
            render: (val) => val.length == 0 ? '' : moment(val).format("DD/MM/YYYY")
        },
        {
            title: "Estado",
            className: 'text-center',
            data: 'EstadoDesc'
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
        order: [[2,'asc']],
        createdRow: function (row, data, dataIndex) {
            $(row).data("item", data)
        },
        drawCallback: () => {
            initMasks('table')
        },
    }
    $("#trabajosAdmon-table").dataTable(generateDataTable(columns, extra, `${urlbase}api/trabajosx/GetTrabajosxAdmon`))
}
setTable()
$(document).ready(function () {
    $("#trabajosAdmon-table tbody").on("click", ".print-btn", ({ currentTarget }) => {
        let id = $(currentTarget).data("id")
        let Anio = $(currentTarget).data("anio")
        let Pro = $(currentTarget).data("proyectocodigo")
        opendialog("/visorinformesSti.aspx?reporteID=7100&AnioID=" + Anio + "&ProyectoCodigo=" + Pro + "&TrabajoCorr=" + id);
    })
})
function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "",
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