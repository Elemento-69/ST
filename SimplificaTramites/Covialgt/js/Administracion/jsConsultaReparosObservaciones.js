function setTableConsulta() {

    let columns = [
        {
            searchable: false,
            orderable: false,
            className: 'spacer',
            defaultContent: ""
        },
        {
            searchable: false,
            orderable: false,
            className: 'text-center',
            data: 'DocCambioCorrel',
            render: (val, _, row) => {
                return `<a role="button" class="action-icon hover-blue print-btn" title="Imprimir"><i class="fas fa-print fa-lg fa-fw"></i></a>`
            }
        },
        {
            className: 'text-center',
            title: "Número",
            data: 'DocCambioCorrel'
        },
        {
            title: "Fecha de Reparo",
            className: 'text-center',
            data: 'DocCambioJustifica'
        },
        {
            title: "Entregado A Contratista",
            className: 'text-center',
            data: 'TipoDocumento'
        },
        {
            title: "Recibido De Contratista",
            className: 'text-center',
            data: 'MontoDocCambio'
        },
        {
            title: "Fecha desvanecido",
            className: 'text-center',
            data: 'DiasDocCambio'
        },
        {
            title: "Visor",
            className: 'text-center',
            data: 'Estado'
        },
        {
            title: "Desvanecido",
            className: 'text-center',
            data: 'FechaPresentacion',
        },
        {
            searchable: false,
            orderable: false,
            className: 'spacer',
            defaultContent: ""
        }
    ];
    var table = $("#consulta-reparos-table").dataTable({
        responsive: true,
        order: [[2, "desc"]],
        columns: columns,
        processing: true,
        destroy: true,
        language: getLanguage(),
        serverSide: false,
        createdRow: function (row, data, dataIndex) {
            $(row).data("item", data)
        }
    })

    // esto es para la segunda tabla

    $("#consulta-reparos-table tbody").on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.api().row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            $(tr.children()[1]).empty();
            $(tr.children()[1]).append('<i class="fas fa-angle-down"></i>');
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            $(tr.children()[1]).empty();
            $(tr.children()[1]).append('<i class="fas fa-chevron-up"></i>');
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });
}
setTableConsulta()

function format(d) {
    // `d` render de la subtabla
    return '<table class="table table-bordered">' +
        '<thead>' +
        '<tr>' +
        '<th class="spacer"></th>' +
        '<th class="text-center">Requisito</th>' +
        '<th class="text-center">Comentario</th>' +
        '<th class="spacer"></th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '<td class="spacer bg-light"></td>' +
        '<td>Factura</td>' +
        '<td>Adjuntar Fotocopia de RTU en el documento</td>' +
        '<td class="spacer bg-light"></td>' +
        '</tbody>' +
        '</table>';
}