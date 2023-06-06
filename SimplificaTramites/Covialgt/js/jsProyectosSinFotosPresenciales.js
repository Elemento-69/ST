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
            data: 'ProyectoCodigo',
            render: (val, _ , row) => {
                let act_btns = ""
                return ` ${act_btns}
                   `
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
            searchable: true,
            orderable: true,
            className: 'spacer',
            defaultContent: ""
        }
    ]
    let extra = {
        serverSide: false,
        order: [[0, "asc"]],
        createdRow: function (row, data, dataIndex) {
            $(row).data("item", data)
        },
        drawCallback: () => {
            initMasks('table')
        },
    }
    $("#proyectos-table").dataTable(generateDataTable(columns, extra, `${urlbase}api/ProyectosSinFotos/ObtenerProyectosSinFotosPresencia`))
}
setTable()

