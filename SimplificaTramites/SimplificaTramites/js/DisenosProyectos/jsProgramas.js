var vPlans = 0;
var vPlan = 0; 
var vContratos = 0;
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    vPlans = urlParams.get("AnioID");
    fnCargarplanesAnuales()

    if (vPlans != 0) {
       
     
        fnCargaInicial();
    }

    $('#btnBuscar').click(function () {
        vPlans = $('#PlanAnualList').val();
   
        fnCargaInicial();
    })

    $("#PlanAnualList").on("change.select2", ({ currentTarget }) => {
        if (vPlans == 0) {
            vPlans = currentTarget.value
            fnCargaInicial();
        }
        //
      
    })
 
})
function fnCargarplanesAnuales() {
    $.ajax({
        url: `${urlbase}api/plananual/get`,
        success: (val) => {
            let options = val.map((val) => new Option(val.PlanAnualNombre, val.AnioID))
            $('#PlanAnualList').append(options).trigger('change')
            if (vPlans != 0) {
                $("#PlanAnualList option[value='" + vPlans + "']").attr("selected", true);
                $('#PlanAnualList').trigger("change")
            }
        },

        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        }
    })

}

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
                        data-content="Eliminar" data-placement="top" data-Anio="${row.AnioID}" data-progcodigo="${row.ProgramaCodigo}" style="cursor:pointer" onclick="fnEliminarPrograma('${row.AnioID}', '${row.ProgramaCodigo}')" title="Eliminar Programa">
                        <i class="fas fa-trash fa-lg fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Actualizar"data-placement="top" data-progcodigo="${row.ProgramaCodigo}" data-prognombre="${row.ProgramaNombre}" data-proganio="${row.AnioID}" data-progcontrato="${row.ContratoTipoID}" data-progpresupuesto="${row.ProgramaPresupuesto}" data-progalcancecantidad="${row.AlcanceCantidad}" data-progalcanceunidad="${row.AlcanceUnidad}" onclick="fnModal('${row.ProgramaCodigo}', '${row.ProgramaNombre}', '${row.AnioID}', '${row.ContratoTipoID}', '${row.ProgramaPresupuesto}', '${row.AlcanceCantidad}', '${row.AlcanceUnidad}');" style="cursor:pointer" data-dismiss="modal"  title="Editar Programa">
                        <i class="fas fa-edit fa-lg fa-fw"></i>
                    </button>
                    <a href="frmProgramasSanciones?AnioID=${row.AnioID}&Programa=${row.ProgramaCodigo}" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover" title="Ver Programa Sanciones"
                    data-content="Programa Sanciones" data-placement="top" runat="server">
                    <i class="fas fa-eye fa-lg fa-fw"></i>
                    </a>`
            }
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
            title: "Programa",
            data: 'ProgramaNombre'
        },
        {
            className: 'text-center',
            title: "Presupuesto",
            data: 'ProgramaPresupuesto'
        },
        {
            className: 'text-center',
            title: "Alcance",
            data: 'AlcanceCantidad'
        },
        {
            className: 'text-center',
            title: "Unidad",
            data: 'AlcanceUnidad'
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
    $("#programas-table").dataTable(generateDataTableFilter(columns, extra, `${urlbase}api/Programas/ObtenerProgramas`,vPlans))
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
                        data-content="Eliminar" data-placement="top" data-Anio="${row.AnioID}" data-progcodigo="${row.ProgramaCodigo}" style="cursor:pointer" onclick="fnEliminarPrograma('${row.AnioID}', '${row.ProgramaCodigo}')" title="Eliminar Programa">
                        <i class="fas fa-trash fa-lg fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Actualizar"data-placement="top" data-progcodigo="${row.ProgramaCodigo}" data-prognombre="${row.ProgramaNombre}" data-proganio="${row.AnioID}" data-progcontrato="${row.ContratoTipoID}" data-progpresupuesto="${row.ProgramaPresupuesto}" data-progalcancecantidad="${row.AlcanceCantidad}" data-progalcanceunidad="${row.AlcanceUnidad}" onclick="fnModal('${row.ProgramaCodigo}', '${row.ProgramaNombre}', '${row.AnioID}', '${row.ContratoTipoID}', '${row.ProgramaPresupuesto}', '${row.AlcanceCantidad}', '${row.AlcanceUnidad}');" style="cursor:pointer" data-dismiss="modal"  title="Editar Programa">
                        <i class="fas fa-edit fa-lg fa-fw"></i>
                    </button>
                    <a href="frmProgramasSanciones?AnioID=${row.AnioID}&Programa=${row.ProgramaCodigo}" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover" title="Ver Planes Asociados"
                    data-content="Programa Sanciones" data-placement="top" runat="server">
                    <i class="fas fa-eye fa-lg fa-fw"></i>
                    </a>`
            }
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
            title: "Programa",
            data: 'ProgramaNombre'
        },
        {
            className: 'text-center',
            title: "Presupuesto",
            data: 'ProgramaPresupuesto'
        },
        {
            className: 'text-center',
            title: "Alcance",
            data: 'AlcanceCantidad'
        },
        {
            className: 'text-center',
            title: "Unidad",
            data: 'AlcanceUnidad'
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
    $("#programas-table").dataTable(generateDataTable(columns, extra, `${urlbase}api/Programas/ObtenerProgramas`))
}
$.ajax({
    url: `${urlbase}api/PlanesAnuales/ObtenerPlanesAnuales`,
    success: (val) => {
        let options = val.map((val) => new Option(val.PlanAnualNombre, val.AnioID))
        $('#programa-anio').append(options).trigger("change")
        if (vPlan !== null) {
            $('#programa-anio').trigger("change")
        }
    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})
$.ajax({
    url: `${urlbase}api/PlanesAnuales/ObtenerPlanesAnuales`,
    success: (val) => {
        let options = val.map((val) => new Option(val.PlanAnualNombre, val.AnioID))
        $('#programa-anioAct').append(options).trigger("change")
        if (vPlan !== null) {
            $('#programa-anio').trigger("change")
        }
    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})
$.ajax({
    url: `${urlbase}api/Programas/ObtenerTiposContratos`,
    success: (val) => {
        let options = val.map((val) => new Option(val.ContratoTipoNombre, val.ContratoTipoID))
        $('#programa-contratos').append(options).trigger("change")
        if (vContratos !== null) {
            $('#programa-anio').trigger("change")
        }
    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})

$.ajax({
    url: `${urlbase}api/Programas/ObtenerTiposContratos`,
    success: (val) => {
        let options = val.map((val) => new Option(val.ContratoTipoNombre, val.ContratoTipoID))
        $('#programa-contratosAct').append(options).trigger("change")
        if (vContratos !== null) {
            $('#programa-anio').trigger("change")
        }
    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})
function fnModal(ProgramaCodigo, ProgramaNombre, AnioID, ContratoTipoID, ProgramaPresupuesto, AlcanceCantidad, AlcanceUnidad) {
    console.log(ProgramaCodigo, ProgramaNombre, AnioID, ContratoTipoID, ProgramaPresupuesto, AlcanceCantidad, AlcanceUnidad);
    $("#programa-codigoAct").val(ProgramaCodigo);
    $("#programa-nombreAct").val(ProgramaNombre);
    $('#programa-anioAct').val(AnioID);
    $("#programa-contratosAct").val(ContratoTipoID);
    $("#programa-presupuestoAct").val(ProgramaPresupuesto);
    $("#programa-unidadesAct").val(AlcanceUnidad);
    $("#programa-cantidadAct").val(AlcanceCantidad);
    $("#exampleModalActualizar").modal('show');
}


function fnObtPlan(AnioID) {
    $.ajax({
        url: `${urlbase}api/PlanesAnuales/ObtenerUnPlaneAnual/${AnioID}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            Datos = val[0]
            $('#plan-anioAct').html(Datos.AnioID)
            $('#plan-nombreAct').html(Datos.PlanAnualNombre)
        }
    })
}
//Insertar un nuevo Programa
$("#btnGuardar").on("click", () => {
    var today = new Date();
    let data = {
        "AnioID": $("#programa-anio").val(),
        "ProgramaCodigo": $("#programa-codigo").val(),
        "ContratoTipoID": $("#programa-contratos").val(),
        "ProgramaNombre": $("#programa-nombre").val(),
        "ProgramaPresupuesto": $("#programa-presupuesto").val(),
        "AlcanceCantidad": $("#programa-cantidad").val(),
        "AlcanceUnidad": $("#programa-unidades").val(),
        "UserName": usuario,
        "DateModify": today
    };
    $.ajax({
        url: `${urlbase}/api/Programas/AgregarPrograma`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "Programa insertado con exito"
            swal.fire(message, "", "success")
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "Programa creado correctamente", "success");
            fnCargaInicial()
        },
        error: function (response) {
            Swal.fire("Error", "Ya existe un programa con ese año.", "error")
            return false
        }
    });
});
//Actualizar un Programa
$("#btnGuardarAct").on("click", () => {
    var today = new Date();
    let data = {
        "AnioID": $("#programa-anioAct").val(),
        "ProgramaCodigo": $("#programa-codigoAct").val(),
        "ContratoTipoID": $("#programa-contratosAct").val(),
        "ProgramaNombre": $("#programa-nombreAct").val(),
        "ProgramaPresupuesto": $("#programa-presupuestoAct").val(),
        "AlcanceCantidad": $("#programa-cantidadAct").val(),
        "AlcanceUnidad": $("#programa-unidadesAct").val(),
        "UserName": usuario,
        "DateModify": today
    };
    $.ajax({
        url: `${urlbase}/api/Programas/ActualizarPrograma`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "Programa actualizado con exito"
            swal.fire(message, "", "success")
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "Programa actualizado correctamente", "success");
            fnCargaInicial()
        },
        error: function (response) {
            Swal.fire("Error", "No se actualizo programa con este año.", "error")
            return false
        }
    });
});
//Eliminar un Programa
function fnEliminarPrograma(AnioID, ProgramaCodigo) {
    Swal.fire({
        title: "Favor confirmar",
        text: "¿Desea eliminar el programa?",
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    })
        .then((result) => {
            if (result.isConfirmed) {
                $.LoadingOverlay("show")
                $.ajax({
                    url: `${urlbase}api/Programas/EliminarPrograma`,
                    method: "post",
                    data: JSON.stringify({
                        "AnioID": AnioID,
                        "ProgramaCodigo": ProgramaCodigo,
                    }),
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"
                    },
                    success: (val) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("Éxito", "Programa elimado correctamente", "success");
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

$("#btnRegresarConsultaPlanes").click(function () {
    regresarConsultaPlanes()
})

function regresarConsultaPlanes() {
    //let QueryString = "?AnioID=" + vPlans 
    //if (proyecto2.length > 0) {
    //    QueryString = QueryString + "&proyecto=" + proyecto2
    //}
    window.location.href = "frmPlanesAnuales.aspx";
}


