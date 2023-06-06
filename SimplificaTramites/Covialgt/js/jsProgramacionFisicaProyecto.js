
var vArrayProgra = [];
var vRenglonSeleccionado = 0;
$(document).ready(function () {
    // fnInicializaTableperiodos();
    fnInicializaTableRenglones();
    $("#btnRegresarRegistroDatos").click(function () {
        let QueryString = "?Plan=" + plan + "&Programa=" + programa + "&Proyecto=" + proyecto
        window.location.href = "RegistroDatos.aspx" + QueryString;
    })

    $("#btnGuardarProgramacion").click(function () {
        //console.log(vArrayProgra);
        ////console.log(JSON.stringify(vArrayProgra));

        var objListaProgramaciones = {
            "objListaPrograFisica": vArrayProgra
        }
        console.log(JSON.stringify(objListaProgramaciones));

        $.ajax({
            url: `${urlbase}api/PrograFisica/ActualizarFisicoVigente`,
            method: "POST",
            data: JSON.stringify(objListaProgramaciones),
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: function (response) {
                Swal.fire("", "Se han realizado los cambios ¡Nueva programación Guardada!", "success").then(function () {
                    window.location.href = 'ProgramacionFisicaProyecto?plan='+plan+'&proyecto='+ proyecto + '&programa='+programa
                });
            },
            error: function (response) {
                Swal.fire("", jQuery.parseJSON(response.responseText).Message, "error");
            }
        })
    })

    /* ACTUALIZAR PROGRAMACIÓN ACTUAL SIN CREAR VERSIONES*/

    $("#btnActualizarProgramacion").click(function () {
        //console.log(vArrayProgra);
        ////console.log(JSON.stringify(vArrayProgra));

        var objListaProgramaciones = {
            "objListaPrograFisica": vArrayProgra
        }
        console.log(JSON.stringify(objListaProgramaciones));

        $.ajax({
            url: `${urlbase}api/PrograFisica/ActualizarFisicoVigenteNoVersiones`,
            method: "POST",
            data: JSON.stringify(objListaProgramaciones),
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: function (response) {
                Swal.fire("", "Se han realizado los cambios ¡Programación actual Modificada!", "success").then(function () {
                    window.location.href = 'ProgramacionFisicaProyecto?plan=' + plan + '&proyecto=' + proyecto + '&programa=' + programa
                });
            },
            error: function (response) {
                Swal.fire("", jQuery.parseJSON(response.responseText).Message, "error");
            }
        })
    })

})

//función para redondeo si aproximación número, decimales a mostrar
const myRound = (num, dec) => {
    let exp = Math.pow(10, dec);
    return parseInt(num * exp) / exp;
}

function fnInicializaTableperiodos() {
    $('#detalle_renglones-table').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin periodos para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ periodos",
            "infoEmpty": "Mostrando 0 de 0 de 0 periodos",
            "infoFiltered": "(Filtrado de _MAX_ total periodos)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ periodos",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay periodos encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}
function fnInicializaTableRenglones() {
    $('#renglones-table').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin renlgones para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Renglones",
            "infoEmpty": "Mostrando 0 de 0 de 0 Renglones",
            "infoFiltered": "(Filtrado de _MAX_ total Renglones)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Renglones",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay renglones encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}
$.ajax({
    url: `${urlbase}api/PrograFisica/GetComponentes/${plan}/${proyecto}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        let cols = val.map((item) => `<option value="${item.ID}">${item.Descripcion}</option>`)
        $("#componente").append(cols.join(""))
        $("#componente").trigger("change")
    }
})
$.ajax({
    url: `${urlbase}api/PrograFisica/GetRenglones/${plan}/${proyecto}/1`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        $('#renglones-table').dataTable().fnClearTable();
        $('#renglones-table').dataTable().fnDestroy();
        let cols = val.map((item) => `<tr>
                <td class="spacer"></td>
                <td class="text-center detalle-btn" data-toggle="modal" data-target="#exampleModalCenter" data-id="${item.RenglonID}"
                data-max="${item.RenglonCantidadTotal}" >
                    <button type="button" class="btn btn-light action-icon hover-blue" data-toggle="popover" data-trigger="hover"
                        data-content="Detalle de estimaciones" data-placement="top" data-renglon="${item.RenglonID}">
                        <i class="fas fa-pencil-alt fa-lg fa-fw"></i>
                    </button>
                </td>
                <td class="text-center" data-toggle="modal"  data-id="${item.RenglonID}"
                data-max="${item.RenglonCantidadTotal}" >
                    <button type="button" class="btn btn-light action-icon hover-blue" data-toggle="popover" data-trigger="hover"
                        data-content="Detalle de estimaciones" data-placement="top" onclick="fnMostrarModalDetalleProgramado(${item.RenglonID})">
                        <i class="fa fa-eye fa-lg fa-fw"></i>
                    </button>
                </td>
                <td class="text-center">
                    ${item.RenglonID}
                </td>
                <td class="text-center">
                    ${item.ProyectoRenglonNombre}
                </td>
                <td class="text-center">
                    ${item.RenglonUni}
                </td>
                <td class="text-center">
                    ${item.CantidadOriginal}
                </td>
                <td class="text-center">
                    ${item.RenglonCantidadTotal}
                </td>
                <td id="Programada-${item.RenglonID}"  class="text-center">
                    ${item.Total}
                </td>
                <td class="text-center">
                    ${myRound((item.RenglonCantidadTotal - item.Total), 8) }
                </td>
                <td class="spacer"></td>
            </tr>`)
        $("#renglones-table tbody").html(cols.join(""))
        fnInicializaTableRenglones();
    }

})

$("#renglones-table tbody").on("click", ".detalle-btn", ({ currentTarget }) => {
    vRenglonSeleccionado = $(currentTarget).data("id")
    $.ajax({
        url: `${urlbase}api/PrograFisica/CantidadesXPeriodoXRenglon/${plan}/${proyecto}/${$("#componente").val()}/${currentTarget.dataset.id}/1`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {

            let cols = val.map((item) => `<tr>
                <td class="spacer"></td>
                
                <td class="text-center">
                    ${item.PeriodoCorrel}
                </td>
                <td class="text-center">
                    ${item.PeriodoDesde.replace(/T.*/,'')}
                </td>
                <td class="text-center">
                    ${item.PeriodoHasta.replace(/T.*/, '') }
                </td>
                <td class="text-center">
                    <input type="text" data-corr="${item.PeriodoCorrel}" data-renglon="${currentTarget.dataset.id}" class="table-input frdecimal-mask" style="min-width:90%"  value=" ${item.Cantidad}">
                   
                </td>
                <td class="spacer"></td>
            </tr>`)
            $("#detalle_renglones-table tbody").html(cols.join(""))

            initMasks()
            $("#update_modal-btn").data("max", currentTarget.dataset.max)
        }
    })
})

$("#update_modal-btn").on("click", ({ currentTarget }) => {

    var ArrayFiltrado = vArrayProgra.filter(function (item) {
        return item.Renglonid != vRenglonSeleccionado;
    });
    vArrayProgra = ArrayFiltrado;

    let su = 0
    let values = []
    let vTotalRenglon = 0;
    let vIdrenglon=0
    $("#detalle_renglones-table tbody input").each((_, el) => {
        su += parseFloat(el.value.replace(",",""))
        values.push({ id: el.dataset.corr, value: el.value, renglon: el.dataset.renglon })
    })
    let max = parseFloat($(currentTarget).data("max").replace(",", ""))
    if (max < su) {
        swal.fire("Total Superado", `el total editado es de ${su} y el disponible es de ${max}`, "error")
    } else {

        values.forEach((el, _) => {
            vIdrenglon = el.renglon;
            data = {
                "Anioid": plan,
                "ProyectoCodigo": proyecto,
                "Componentecorrel": parseInt($("#componente").val()),
                "Renglonid": parseInt(el.renglon),
                "PeriodoCorrel": parseInt(el.id),
                "Valor": parseFloat(el.value.replace(",", "")),
                "Programa": 1,
                "UserName": user,
                "ExistenDC": 0,
            }
            vArrayProgra.push(data)
            $("#Programada-" + vIdrenglon).html(su);
            $("#Programada-" + vIdrenglon).css("color", "#ff0000");
        })
        //console.log(vArrayProgra);
        ////console.log(JSON.stringify(vArrayProgra));

        //var objListaProgramaciones = {
        //    "objListaPrograFisica": vArrayProgra
        //}
        //console.log(JSON.stringify(objListaProgramaciones));

        //$.ajax({
        //    url: `${urlbase}api/PrograFisica/ActualizarFisicoVigente`,
        //    method: "POST",
        //    data: JSON.stringify(objListaProgramaciones),
        //    headers: {
        //        "Authorization": "Bearer " + token,
        //        "Content-Type": "application/json",
        //    },
        //    error: function (response) {
        //        Swal.fire("", jQuery.parseJSON(response.responseText).Message, "error");
        //    }
        //})


        $("#exampleModalCenter").modal('hide')
    }
})

function fnMostrarModalDetalleProgramado(IdRenglon) {
    var ArrayFiltrado = vArrayProgra.filter(function (item) {
        return item.Renglonid == IdRenglon;
    });

    $("#exampleModalCenterPreview").modal('show')
    let cols = ArrayFiltrado.map((item) => `<tr>
                <td class="spacer"></td>
                
                <td class="text-center">
                    ${item.PeriodoCorrel}
                </td>
               
                <td class="text-center">
                    ${item.Valor}
                </td>
                <td class="spacer"></td>
            </tr>':''`)
    $("#detalle_renglones-tablePreview tbody").html(cols.join(""))

   
}

var filter = function (array, callback) {

    var filtered_array = [];

    array.forEach(function (element, index, array) {
        if (callback(element, index, array)) {
            filtered_array.push(element);
        }
    });

    return filtered_array;

};