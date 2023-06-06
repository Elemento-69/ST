$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    vPlans = urlParams.get("AnioID");    
})


$('#anioSelect').find("option").remove()
$.ajax({
    url: `${urlbase}api/PlanesAnuales/ObtenerPlanesAnuales`,
    success: (val) => {
        let options = val.map((val) => new Option(val.PlanAnualNombre, val.AnioID))
        $('#anioSelect').append(options).trigger("change")

    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})

$("#anioSelect").on("change.select2", ({ currentTarget }) => {
    //let programa = currentTarget.value.trim();
    let Plan = $("#anioSelect").val();
    $('#programaSelect').find("option").remove()
    $.ajax({
        url: `${urlbase}api/TramosViales/ObtenerProgramas/${Plan}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#programaSelect').append(val.map((val) => new Option(val.ProgramaNombre, val.ID))).trigger("change")
        }
    })
})

$("#programaSelect").on("change.select2", ({ currentTarget }) => {
    //let programa = currentTarget.value.trim();
    //let Plan = $("#anioSelect").val();
    let [anio, programaCodigo] = currentTarget.value.split(',')
    let Programa = $("#programaSelect").val();
    $('#proyectoSelect').find("option").remove()
    $.ajax({
        url: `${urlbase}api/TramosViales/ObtenerProyectosProgramas/${anio}/${programaCodigo}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#proyectoSelect').append(val.map((val) => new Option(val.ProyectoDescripcion, val.AnioCodigoProyecto))).trigger("change")
        }
    })
})

$('#estadoSelect').find("option").remove()
$.ajax({
    url: `${urlbase}api/TramosViales/ObtenerListaEstatusProyectos`,
    success: (val) => {
        let options = val.map((val) => new Option(val.ProyectoEstatusDesc, val.ProyectoEstatusID))
        $('#estadoSelect').append(options).trigger("change")

    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})

$("#proyectoSelect").on("change.select2", ({ currentTarget }) => {
    let ID = $("#proyectoSelect").val();
    $('#estadoActualSelect').find("option").remove()
    $.ajax({
        url: `${urlbase}api/TramosViales/ObtenerEstadoProyectoActual/${ID}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#estadoActualSelect').append(val.map((val) => new Option(val.ProyectoEstatusDesc, val.ProyectoEstatusID))).trigger("change")
        }
    })
})


//Actualizar un Proyecto
$("#btnActualizar").on("click", () => {
    let proy = $("#proyectoSelect").val();
    let [anio, proyecto] = proy.split(',')
       let data = {
        "AnioID":            $("#anioSelect").val(),
        "ProyectoCodigo":    proyecto,
        "ProyectoEstatusID": $("#estadoSelect").val(),
        "UserName":          usuario
    };
    $.ajax({
        url: `${urlbase}/api/TramosViales/ActualizarProyectoEstado`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            let message = "Proyecto actualizado con exito"
            swal.fire(message, "", "success")
            $.LoadingOverlay("hide");
            Swal.fire("Éxito", "Proyecto actualizado correctamente", "success");
            let ID = $("#proyectoSelect").val();
            $('#estadoActualSelect').find("option").remove()
            $.ajax({
                url: `${urlbase}api/TramosViales/ObtenerEstadoProyectoActual/${ID}`,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: (val) => {
                    $('#estadoActualSelect').append(val.map((val) => new Option(val.ProyectoEstatusDesc, val.ProyectoEstatusID))).trigger("change")
                }
            })
            //fnCargaInicial()
        },
        error: function (response) {
            Swal.fire("Error", "No se actualizo el proyecto, debe de revisar los datos.", "error")
            return false
        }
    });
});

