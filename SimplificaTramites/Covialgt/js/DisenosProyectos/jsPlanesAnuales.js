$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    fnCargaInicial();
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
                        data-content="Eliminar" data-placement="top" data-Anio="${row.AnioID}" style="cursor:pointer" onclick="fnEliminarPlan('${row.AnioID}')" title="Eliminar Plan Anual">
                        <i class="fas fa-trash fa-lg fa-fw"></i>
                    </button>
                    <button type="button" class="action-icon btn hover-blue btn-actualizar" data-toggle="popover" data-trigger="hover"
                       data-content="Actualizar"data-placement="top" data-Anio="${row.AnioID}" data-nombreplan="${row.PlanAnualNombre}" onclick="fnModal('${row.AnioID}', '${row.PlanAnualNombre}');" style="cursor:pointer" data-dismiss="modal"  title="Editar Planes Anuales">
                        <i class="fas fa-edit fa-lg fa-fw"></i>
                    </button>
                    <a href="frmProgramas?AnioID=${row.AnioID}" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover" title="Ver Planes Asociados"
                    data-content="Detalle de estimaciones" data-placement="top" runat="server">
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
            title: "Plan Anual",
            data: 'PlanAnualNombre'
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
    $("#planesanuales-table").dataTable(generateDataTable(columns, extra, `${urlbase}api/PlanesAnuales/ObtenerPlanesAnuales`))
}

function fnModal(AnioID, PlanAnualNombre) {
    console.log(AnioID, PlanAnualNombre);
    $("#plan-anioAct").val(AnioID);
    $("#plan-nombreAct").val(PlanAnualNombre);
    $('#exampleModalActualizar').modal('show');
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
//Insertar un nuevo Plan
$("#btnGuardar").on("click", () => {
    var today = new Date();
    let data = {
        "AnioID": $("#plan-anio").val(),
        "PlanAnualNombre": $("#plan-nombre").val(),
        "UserName": usuario,
        "DateModify": today
    };
    $.ajax({
        url: `${urlbase}/api/PlanesAnuales/AgregarPlansAnuales`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "Pla anual insertado con exito"
            swal.fire(message, "", "success")
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "Plan anual creado correctamente", "success");
            fnCargaInicial()
        },
        error: function (response) {
            Swal.fire("Error", "Ya existe un plan con ese año.", "error")
            return false
        }
    });
});
//Actualizar un Plan
$("#btnGuardarAct").on("click", () => {
    var today = new Date();
    let data = {
        "AnioID": $("#plan-anioAct").val(),
        "PlanAnualNombre": $("#plan-nombreAct").val(),
        "UserName": usuario,
        "DateModify": today
    };
    $.ajax({
        url: `${urlbase}/api/PlanesAnuales/ActualizarPlansAnuales`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "Pla anual actualizado con exito"
            swal.fire(message, "", "success")
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "Plan anual actualizado correctamente", "success");
            fnCargaInicial()
        },
        error: function (response) {
            Swal.fire("Error", "No se actualizo plan con este año.", "error")
            return false
        }
    });
});
//Eliminar un Plan
function fnEliminarPlan( AnioID) {
    Swal.fire({
        title: "Favor confirmar",
        text: "¿Desea eliminar el plan anual?",
        icon: "warning",
        showDenyButton: true, showCancelButton: false,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
    })
        .then((result) => {
            if (result.isConfirmed) {
                $.LoadingOverlay("show")
                $.ajax({
                    url: `${urlbase}api/PlanesAnuales/EliminarPlanAnual`,
                    method: "post",
                    data: JSON.stringify({
                        "AnioID": AnioID,
                    }),
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"
                    },
                    success: (val) => {
                        $.LoadingOverlay("hide");
                        Swal.fire("Éxito", "Plan anual elimado correctamente", "success");
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



