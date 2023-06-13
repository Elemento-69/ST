$(document).ready(function () {

    $("#btnRegresarRegistroDatos").click(function () {
        let QueryString = "?Plan=" + plan + "&Programa=" + proyecto.split('-')[0].toString() + "&Proyecto=" + proyecto
        window.location.href = "RegistroDatos.aspx" + QueryString;
    })
})

$("select").select2({ theme: "bootstrap" })
let colsCT =false
$.ajax({
    url: `${urlbase}api/Dashboard/ObtenerEstadoCT/${plan}/${proyecto}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
         colsCT = val[0].CTIngresado
        if (colsCT) {
            $("#addCantidad-btn").hide()
        }
    }
})

$.ajax({
    url: `${urlbase}api/RegistrosMensuales/GetTramos/${plan}/${proyecto}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        let cols = val.map((item) => `<option value="${item.TramoID}">${item.TramosDesc}</option>`)
        $("#Tramo").append(cols.join(""))
        $("#Tramo").trigger("change")
    }
})

$.ajax({
    url: `${urlbase}api/RegistrosMensuales/GetRenglones/${plan}/${proyecto}/1`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        let cols = val.map((item) => `<option value="${item.RenglonID}">${item.RenglonDescripcion}</option>`)
        $("#Renglon").append(cols.join(""))
        $("#Renglon").trigger("change")

    }
})

$("#Renglon").on("change", ({ currentTarget }) => {
    $.ajax({
        url: `${urlbase}api/RegistrosMensuales/ObtenerRemanenteXPrograma/${plan}/${proyecto}/0/1/${currentTarget.value}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            val = val[0]
            const pendiente = val.Contratada -val.Programada | 0
            $("#contratado-total").html(val.Contratada | 0)
            $("#asignado-total").html(val.Programada)
            $("#pendiente-total").html(val.Remanente)
        }
    })
})

$("#btnImprimir").on("click", () => {
    opendialog("/visorinformesSti.aspx?reporteID=900&AnioID=" + plan + "&ProyectoCodigo=" + proyecto + "&DocCambioCorrel=0");
})

function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Reporte de cantidades asignadas por tramo",
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

function CreateTable() {

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
            data: 'Id',
            render: (data) => {
                return `<button type="button" class="btn btn-light action-icon hover-red del-btn" data-toggle="popover" data-trigger="hover" 
                        data-content="Eliminar" data-placement="top">
                        <i class="fas fa-trash fa-lg fa-fw"></i>
                    </button>`
            }
        },
        {
            searchable: false,
            orderable: false,
            className: 'text-center',
            title: "Componente",
            data: 'ComponenteDesc'
        },
        {
            searchable: false,
            orderable: false,
            title: "Código de Renglón",
            className: 'text-center',
            data: 'RenglonCode'
        },
        {
            searchable: false,
            orderable: false,
            title: "Renglón",
            className: 'text-center',
            data: 'RenglonDesc'
        },
        {
            searchable: false,
            orderable: false,
            title: "Unidad",
            className: 'text-center',
            data: 'RenglonUni'
        },
        {
            searchable: false,
            orderable: false,
            title: "Código Tramo",
            className: 'text-center',
            data: 'TramoCodigo'
        },
        {
            searchable: false,
            orderable: false,
            title: "Tramo",
            className: 'text-center',
            data: 'TramoDesc'
        },
        {
            searchable: false,
            orderable: false,
            title: "Cantidad",
            className: 'text-center',
            data: 'CantidadTramo'
        },
        {
            searchable: false,
            orderable: false,
            title: "Ingresado",
            className: 'text-center',
            data: 'DateModify'
        },
        {
            searchable: false,
            orderable: false,
            className: 'spacer',
            defaultContent: ""
        }
    ]

    $("#asociacion_table").dataTable(generateDataTable(columns, {
        ajax: (data, callback, settings) => {
            $.ajaxSetup({
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                }
            });
            const page = data.start / data.length + 1
            $.get(`${urlbase}api/RegistrosMensuales/ObtenerCantidadesTramo/${plan}/${proyecto}/0/${page}/${data.length}`, {},
                function (res) {
                    callback({
                        recordsTotal: res.length < data.length ? data.start : data.start + data.length + 1,
                        recordsFiltered: res.length < data.length ? data.start : data.start + data.length + 1,
                        data: res,
                    });
                });
        },
        "pagingType": "simple",
        "bInfo": false,
        "rowCallback": function (row, data) {
           $(row).data("item", data)
        }
    }, `${urlbase}api/RegistrosMensuales/ObtenerCantidadesTramo/${plan}/${proyecto}/1/`))
}

CreateTable()

$("#addCantidad-btn").on("click", () => {
    inputCant = $("#cantidad").inputmask('unmaskedvalue')
    const cant = parseFloat(inputCant | 0)
    $("#cantidad").parents().find(".invalid-feedback").remove()
    $("#cantidad").removeClass("is-invalid")
    if (!validateCantidad(inputCant)) return
    const data = {
        "AnioID": plan,
        "ProyectoCodigo": proyecto,
        "DocCambioCorrel": 0,
        "ComponenteCorrel": 1,
        "RenglonID": $("#Renglon").val(),
        "TramoID": $("#Tramo").val(),
        "Cantidad": cant,
        "UserName": usuario
    }
    $.ajax({
        url: `${urlbase}/api/RegistrosMensuales/AgregarCantidadesTramos`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "Cantidad Asignada"
            let ren = $("#Renglon").val();
            swal.fire(message, "", "success")
            $("#asociacion_table").DataTable().ajax.reload()
            $.ajax({
                url: `${urlbase}api/RegistrosMensuales/ObtenerRemanenteXPrograma/${plan}/${proyecto}/0/1/${ren}`,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: (val) => {
                    val = val[0]
                    const pendiente = val.Contratada - val.Programada | 0
                    $("#contratado-total").html(val.Contratada | 0)
                    $("#asignado-total").html(val.Programada)
                    $("#pendiente-total").html(val.Remanente)
                }
            })
        },
        error: function (response) {
            swal.fire("Error", response.responseJSON.Message, "error");
            return false
        }
    })
    inputCant.val(null)
})

function validateCantidad(cant) {
    const max = parseFloat($("#pendiente-total").val())
    let valid = true
    if (cant <= 0) {
        $("#cantidad").after(`<div  class="invalid-feedback">La cantidad no puede ser menor o igual a 0 </div>`)
        $("#cantidad").addClass("is-invalid")
        valid = false
    }
    if (max < cant) {
        inputCant.after(`<div  class="invalid-feedback">La cantidad no puede ser mayor a la pendiente por asignar: (${max})</div>`)
        inputCant.addClass("is-invalid")
        valid = false
    }
    return valid
}


$("#asociacion_table tbody").on("click", ".del-btn", ({ currentTarget }) => {
    if (colsCT) {
        Swal.fire("Error", "Acción no permitida", "error")
    } else {
    let data = $(currentTarget).closest("tr").data("item")
    let idArray = data.Id.split(",")
    let item = {
        "AnioID": idArray[0],
        "ProyectoCodigo": idArray[1],
        "DocCambioCorrel": idArray[2],
        "ComponenteCorrel": idArray[3],
        "RenglonID": idArray[4],
        "TramoID": idArray[5],
        "Cantidad": data.CantidadTramo,
        "UserName": usuario
    }
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
                url: `${urlbase}api/RegistrosMensuales/EliminarCantidadTramo`,
                method: "POST",
                data: JSON.stringify(item),
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: () => {
                    Swal.fire("Eliminado Exitosamente", "", "success")
                    $("#asociacion_table").DataTable().ajax.reload()
                    let ren = $("#Renglon").val();
                    $.ajax({
                        url: `${urlbase}api/RegistrosMensuales/ObtenerRemanenteXPrograma/${plan}/${proyecto}/0/1/${ren}`,
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Content-Type": "application/json",
                        },
                        success: (val) => {
                            val = val[0]
                            const pendiente = val.Contratada - val.Programada | 0
                            $("#contratado-total").html(val.Contratada | 0)
                            $("#asignado-total").html(val.Programada)
                            $("#pendiente-total").html(val.Remanente)
                        }
                    })
                },
                error: (response) => {
                    Swal.fire("Error", response.responseJSON.Message, "error")
                }
            })
        }
    })
    }
})