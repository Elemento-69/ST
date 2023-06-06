$(document).ready(function () {
    // Cargar año
    $.ajax({
        url: `${urlbase}api/ActualizacionNOG/ObtenerPlanesAnuales`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            let cols = val.map((item) => `<option value="${item.AnioID}">${item.PlanAnualNombre}</option>`)
            // limpiar programaSelect, proyectoSelect, encargadoInput
            $("#programaSelect option").remove()
            $("#proyectoSelect option").remove()
            //$("#encargadoInput").val('')
            $('#btnAsignar').prop('disabled', true)
            $("#anioSelect").append(cols.join("")).trigger("change")
        }
    })
    $("#anioSelect").on("change", ({ currentTarget }) => {
        let anio = currentTarget.value
        $.ajax({
            url: `${urlbase}api/AsignacionEncargadoProyecto/ObtenerListaProgramas/${anio}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                // limpiar proyectoSelect, NOGActualInput, encargadoInput
                $("#proyectoSelect option").remove()
                //$("#encargadoInput").val('')
                $('#btnAsignar').prop('disabled', true)
                let cols = val.map((item) => `<option value="${item.ID}">${item.ProgramaNombre}</option>`)
                $("#programaSelect").empty().append(cols.join("")).trigger("change")
            }
        })
    })
    $("#programaSelect").on("change", ({ currentTarget }) => {
        //let IDPrograma = encodeURIComponent(currentTarget.value)
        //let IDPrograma = currentTarget.value
        let [anio, programaCodigo] = currentTarget.value.split(',')
        $.ajax({
            url: `${urlbase}api/AsignacionEncargadoProyecto/ObtnerListaFiltradaProyectoSEG/${currentTarget.value}/${anio}/${programaCodigo}/TODOS`,

            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                // limpiar encargadoInput
                //$("#encargadoInput").val('')
                $('#btnAsignar').prop('disabled', true)
                let cols = val.map((item) => `<option value="${item.ID}">${item.ProyectoDescripcion}</option>`)
                console.log('val', val)
                $("#proyectoSelect").empty().append(cols.join("")).trigger("change")
            }
        })
    })
    $("#proyectoSelect").on("change", ({ currentTarget }) => {
        $('#btnAsignar').prop('disabled', currentTarget.value.length == 0 || $('#encargadoInput').val().length < 8)
        setTable()
    })
    $('#encargadoInput').keyup(({ currentTarget, }) => {
        $('#btnAsignar').prop('disabled', $('#proyectoSelect').val().length == 0)
    });
    $("#btnAsignar").click(function () {
        if ($('#encargadoInput').val().length >= 8) {
            let [AnioID, ProyectoCodigo] = $('#proyectoSelect').val().split(',')
            let ResponsableProyecto = $('#encargadoInput').val()
            $.ajax({
                url: `${urlbase}api/AsignacionEncargadoProyecto/ActualizarResponsableProyecto`,
                method: "POST",
                data: JSON.stringify({
                    AnioID,
                    ProyectoCodigo,
                    ResponsableProyecto,
                }),
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                success: (val) => {
                    // Exito al guardar el cambio
                    let fecha_hoy = fechaHoy()
                    let data = {
                        AnioID: AnioID,
                        ProyectoCodigo: ProyectoCodigo,
                        ResponsableProyecto: ResponsableProyecto,
                        Fecha_Desde: fecha_hoy,
                        Fecha_Hasta: fecha_hoy,//LA FECHA PUEDE IR NULL
                        Usuario: usuario,
                        Fecha_Modifico: fecha_hoy,
                        Relacion_Activa: true
                    }
                    insertarBitacoraEncargadoProyecto(data, () => {
                        swal.fire("", "Datos actualizados exitosamente", "success")
                    })
                },
                error: (response) => {
                    Swal.fire("Error", response.responseJSON.Message, "error")
                }
            })
        }
        else {
            Swal.fire("Error","El Nombre de encargado de proyecto debe tener al menos 8 Carácteres","error")
        }
}
    )
})

$("#btnImprimir").click(function () {
    let [AnioID, ProyectoCodigo] = $('#proyectoSelect').val().split(',')
    opendialog(`/visorinformesSti.aspx?reporteID=1900&AnioID=${AnioID}&ProyectoCodigo=${ProyectoCodigo}`)
})
function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Bitácora asignación encargado",
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
function insertarBitacoraEncargadoProyecto(data, callback){
    $.ajax({
        url: `${urlbase}api/AsignacionEncargadoProyecto/InsertarBitacoraEncargadoProyecto`,
        method: 'POST',
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: () => {
            setTable();
            callback();
        }
    })
}
function fechaHoy() {
    let today = new Date()
    return `${ today.format("MM/dd/yyyy") } ${today.toLocaleTimeString()}`
}
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
            render: (val, _, row) => {
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
            className: 'text-center',
            title: "Responsable Proyecto",
            data: 'ResponsableProyecto'
        },
        {
            className: 'text-center',
            title: "Fecha Desde",
            data: 'Fecha_Desde'
        },
        {
            className: 'text-center',
            title: "Fecha Hasta",
            data: 'Fecha_Hasta'
        },
        {
            className: 'text-center',
            title: "Usuario",
            data: 'Usuario'
        },
        {
            className: 'text-center',
            title: "Fecha Modifico",
            data: 'Fecha_Modifico'
        },
        {
            className: 'text-center',
            title: "Relacion Activa",
            data: 'Relacion_Activa'
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
    var anioproyecto = $("#proyectoSelect").val();
    if (anioproyecto != null) {
        let [AnioID, ProyectoCodigo] = $('#proyectoSelect').val().split(',')
        $("#asignacion-table").dataTable(generateDataTable(columns, extra, `${urlbase}api/AsignacionEncargadoProyecto/ObtenerEncargadoProyecto/${AnioID}/${ProyectoCodigo}`))
    }
    }
