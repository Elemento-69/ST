vPlan = 0;
vPrograma = 0;
vPlans = 0;
vProgramas = 0;
vSancion =0;
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    vPlans = urlParams.get("AnioID");
    vProgramas = urlParams.get("Programa");
    vSancion = urlParams.get("SancionCodigo");
    console.log(vPlans);
    console.log(vProgramas);
    console.log(vSancion);
    if (vPlans != 0 && vProgramas != 0 && vSancion != 0) {
        fnCargaInicial();
    } else {
        fnCargaInicialTodos();
    }
})

function fnCargaInicial() {

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
            data: 'AnioID',
            render: (val, _, row) => {
                let act_btns = ""
                return ` ${act_btns}
                    <button type="button" class="action-icon hover-blue btn btn-light del" data-toggle="popover" data-trigger="hover"
                        data-content="Eliminar" data-placement="top" style="cursor:pointer" onclick="fnEliminarRecurrencia('${row.RecurrenciaCorrel}', '${row.ProgramaCodigo}', '${row.AnioID}', '${row.SancionCodigo}')" title="Eliminar Programas Sanciones Recurrencias">
                        <i class="fas fa-trash fa-lg fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Actualizar"data-placement="top"  onclick="fnModal('${row.RecurrenciaCorrel}', '${row.AnioID}', '${row.ProgramaCodigo}', '${row.SancionCodigo}', '${row.RecurrenciaDesc}', '${row.PenalidadDesc}');" style="cursor:pointer" data-dismiss="modal"  title="Editar Programa Sanciones Recurrencia">
                        <i class="fas fa-edit fa-lg fa-fw"></i>
                    </button>`
            }
        },

        {
            className: 'text-center',
            title: "Correlativo",
            data: 'RecurrenciaCorrel'
        },
        {
            className: 'text-center',
            title: "Año",
            data: 'AnioID'
        },
        {
            className: 'text-center',
            title: "Codigo",
            data: 'ProgramaCodigo'
        },
        {
            className: 'text-center',
            title: "Codigo Sancion",
            data: 'SancionCodigo'
        },
        {
            className: 'text-center',
            title: "Descripcion",
            data: 'RecurrenciaDesc'
        },
        {
            className: 'text-center',
            title: "Penalidad",
            data: 'PenalidadDesc'
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
    $("#programasancionesrecurrencia-table").dataTable(generateDataTableFilterTres(columns, extra, `${urlbase}api/ProgramasSancionesRecurrencias/ObtenerSancionesRecurrencias`, vPlans, vProgramas, vSancion))
}

function fnCargaInicialTodos() {

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
            data: 'AnioID',
            render: (val, _, row) => {
                let act_btns = ""
                return ` ${act_btns}
                    <button type="button" class="action-icon hover-blue btn btn-light del" data-toggle="popover" data-trigger="hover"
                        data-content="Eliminar" data-placement="top" style="cursor:pointer" onclick="fnEliminarRecurrencia('${row.RecurrenciaCorrel}', '${row.ProgramaCodigo}', '${row.AnioID}', '${row.SancionCodigo}')" title="Eliminar Programas Sanciones Recurrencias">
                        <i class="fas fa-trash fa-lg fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Actualizar"data-placement="top"  onclick="fnModal('${row.RecurrenciaCorrel}', '${row.AnioID}', '${row.ProgramaCodigo}', '${row.SancionCodigo}', '${row.RecurrenciaDesc}', '${row.PenalidadDesc}');" style="cursor:pointer" data-dismiss="modal"  title="Editar Programa Sanciones Recurrencia">
                        <i class="fas fa-edit fa-lg fa-fw"></i>
                    </button>`
            }
        },

        {
            className: 'text-center',
            title: "Correlativo",
            data: 'RecurrenciaCorrel'
        },
        {
            className: 'text-center',
            title: "Año",
            data: 'AnioID'
        },
        {
            className: 'text-center',
            title: "Codigo",
            data: 'ProgramaCodigo'
        },
        {
            className: 'text-center',
            title: "Codigo Sancion",
            data: 'SancionCodigo'
        },
        {
            className: 'text-center',
            title: "Descripcion",
            data: 'RecurrenciaDesc'
        },
        {
            className: 'text-center',
            title: "Penalidad",
            data: 'PenalidadDesc'
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
    $("#programasancionesrecurrencia-table").dataTable(generateDataTable(columns, extra, `${urlbase}api/ProgramasSancionesRecurrencias/ObtenerSancionesRecurrencias`))
}
function fnModal(RecurrenciaCorrel, AnioID, ProgramaCodigo, SancionCodigo, RecurrenciaDesc, PenalidadDesc) {
    prgrama = ProgramaCodigo.trim();
    console.log(RecurrenciaCorrel, AnioID, ProgramaCodigo, SancionCodigo, RecurrenciaDesc, PenalidadDesc);
    //prgrama = ProgramaCodigo.trim();
    $("#programasanciones-correlativoAct").val(RecurrenciaCorrel);
    $("#programasanciones-anioAct").val(AnioID);
    

    $.ajax({
        url: `${urlbase}api/ProgramasSancionesRecurrencias/ObtenerListaProgramas3/${AnioID}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#programasanciones-programaAct').append(val.map((val) => new Option(val.ProgramaCodigo, val.ProgramaCodigo))).trigger("change")
            $('#programasanciones-programaAct').val(prgrama);
        }

    })

    $("#programasanciones-sancioncodigoAct").val(SancionCodigo);
    $("#programasanciones-descripcionAct").val(RecurrenciaDesc);
    $("#programasanciones-penalidadAct").val(PenalidadDesc);
    

    $("#exampleModalRecurrenciaSancionesAct").modal('show');
    $('#programasanciones-programaAct').val("");
}
$.ajax({
    url: `${urlbase}api/ProgramasSancionesRecurrencias/ObtenerListaProgramas`,
    success: (val) => {
        let options = val.map((val) => new Option(val.AnioID, val.AnioID))
        $('#programasanciones-anioAct').append(options).trigger("change")
        if (vPlan !== null) {
            $('#programasanciones-anioAct').trigger("change")
        }
    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})



$("#programasanciones-programaAct").on("change.select2", ({ currentTarget }) => {
    let programa = currentTarget.value.trim();
    let anio = $("#programasanciones-anioAct").val();
    $('#programasanciones-sancioncodigoAct').find("option").remove()
    $.ajax({
        url: `${urlbase}api/ProgramasSancionesRecurrencias/ObtenerListaSanciones/${programa}/${anio}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#programasanciones-sancioncodigoAct').append(val.map((val) => new Option(val.SancionCodigo, val.SancionCodigo))).trigger("change")
        }
    })
})

$.ajax({
    url: `${urlbase}api/ProgramasSancionesRecurrencias/ObtenerListaProgramas`,
    success: (val) => {
        let options = val.map((val) => new Option(val.AnioID, val.AnioID))
        $('#programasanciones-anio').append(options).trigger("change")
        if (vPlan !== null) {
            $('#programasanciones-anio').trigger("change")
        }
    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})

$("#programasanciones-anio").on("change.select2", ({ currentTarget }) => {
    let plan = currentTarget.value
    $('#programasanciones-programa').find("option").remove()
    $.ajax({
        url: `${urlbase}api/ProgramasSancionesRecurrencias/ObtenerListaProgramas3/${plan}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
        $('#programasanciones-programa').append(val.map((val) => new Option(val.ProgramaCodigo, val.ProgramaCodigo))).trigger("change")
        }
        
    })
    
})
$("#programasanciones-programa").on("change.select2", ({ currentTarget }) => {
    let programa = currentTarget.value.trim();
    let anio = $("#programasanciones-anio").val();
    $('#programasanciones-sancioncodigo').find("option").remove()
        $.ajax({
            url: `${urlbase}api/ProgramasSancionesRecurrencias/ObtenerListaSanciones/${programa}/${anio}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                $('#programasanciones-sancioncodigo').append(val.map((val) => new Option(val.SancionCodigo, val.SancionCodigo))).trigger("change")
            }
        })
})


//Insertar un nuevo Plan
$("#btnGuardarRecurrencia").on("click", () => {
    var today = new Date();
    let data = {
        "RecurrenciaCorrel":   $("#programasanciones-correlativo").val(),
        "ProgramaCodigo":      $("#programasanciones-programa").val(),
        "AnioID":              $("#programasanciones-anio").val(),
        "SancionCodigo":       $("#programasanciones-sancioncodigo").val(),
        "RecurrenciaDesc":     $("#programasanciones-descripcion").val(),
        "PenalidadDesc":       $("#programasanciones-penalidad").val(),
        "UserName":            usuario,
        "DateModify":          today
    };
    $.ajax({
        url: `${urlbase}/api/ProgramasSancionesRecurrencias/InsertarSancionesRecurrencias`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "Recurrencia insertada con exito"
            swal.fire(message, "", "success")
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "Recurrencia sanción creada correctamente", "success");
            fnCargaInicial()
        },
        error: function (response) {
            Swal.fire("Error", "Ya existe una recurrencia con ese programa.", "error")
            return false
        }
    });
});
//Actualizar un Recurrencia
$("#btnActualizarRecurrencia").on("click", () => {
    var today = new Date();
    let data = {
        "RecurrenciaCorrel": $("#programasanciones-correlativoAct").val(),
        "ProgramaCodigo":    $("#programasanciones-programaAct").val(),
        "AnioID":            $("#programasanciones-anioAct").val(),
        "SancionCodigo":     $("#programasanciones-sancioncodigoAct").val(),
        "RecurrenciaDesc":   $("#programasanciones-descripcionAct").val(),
        "PenalidadDesc":     $("#programasanciones-penalidadAct").val(),
        "UserName":          usuario,
        "DateModify":        today
    };
    $.ajax({
        url: `${urlbase}/api/ProgramasSancionesRecurrencias/ActualizarSancionesRecurrencias`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "Recurrencia actualizada con exito"
            swal.fire(message, "", "success")
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "Recurrencia actualizada correctamente", "success");
            fnCargaInicial()
        },
        error: function (response) {
            Swal.fire("Error", "No se actualizo recurrencia con este año.", "error")
            return false
        }
    });
});
//Eliminar un Programa sanciones recurrencias
function fnEliminarRecurrencia(RecurrenciaCorrel, ProgramaCodigo, AnioID, SancionCodigo) {
    Swal.fire({
        title: "Favor confirmar",
        text: "¿Desea eliminar programa sanciones recurrencia?",
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    })
        .then((result) => {
            if (result.isConfirmed) {
                $.LoadingOverlay("show")
                $.ajax({
                    url: `${urlbase}api/ProgramasSancionesRecurrencias/EliminarSancionesRecurrencias`,
                    method: "post",
                    data: JSON.stringify({
                        "RecurrenciaCorrel": RecurrenciaCorrel,
                        "ProgramaCodigo": ProgramaCodigo,
                        "AnioID": AnioID,
                        "SancionCodigo": SancionCodigo,
                    }),
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"
                    },
                    success: (val) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("Éxito", "Programa sanciones recurrencia elimado correctamente", "success");
                        fnCargaInicial()
                    },
                    error: (error) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("", error.message + " ", "error");
                    }
                })
            }
        });
}

$("#btnRegresarConsultaProgramasSancionesRecurrencia").click(function () {
    regresarConsultaProgramasSancionesRecurrencia()
})

function regresarConsultaProgramasSancionesRecurrencia() {
    let QueryString = "?AnioID=" + vPlans + "&Programa=" + vProgramas
    //if (proyecto2.length > 0) {
    //    QueryString = QueryString + "&proyecto=" + proyecto2
    //}
    window.location.href = "frmProgramasSanciones.aspx" + QueryString;
}



