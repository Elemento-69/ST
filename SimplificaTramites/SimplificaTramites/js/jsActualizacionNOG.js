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
            // limpiar programaSelect, proyectoSelect, NOGActualInput, NOGInput
            $("#programaSelect option").remove()
            $("#proyectoSelect option").remove()
            $("#NOGActualInput").val('')
            $("#NOGInput").val('')
            $('#btnActualizar').prop('disabled', true)
            $("#anioSelect").append(cols.join("")).trigger("change")
        }
    })
    $("#anioSelect").on("change", ({ currentTarget }) => {
        console.log('anioSelect change')
        let anio = currentTarget.value
        $.ajax({
            url: `${urlbase}api/ActualizacionNOG/ObtenerProgramas/${anio}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                // limpiar proyectoSelect, NOGActualInput, NOGInput
                $("#proyectoSelect option").remove()
                $("#NOGActualInput").val('')
                $("#NOGInput").val('')
                $('#btnActualizar').prop('disabled', true)
                let cols = val.map((item) => `<option value="${item.ID}">${item.ProgramaNombre}</option>`)
                $("#programaSelect").empty().append(cols.join("")).trigger("change")
            }
        })
    })
    $("#programaSelect").on("change", ({ currentTarget }) => {
        console.log('programaSelect change')
        let [anio, programaCodigo] = currentTarget.value.split(',')
        $.ajax({
            url: `${urlbase}api/ActualizacionNOG/ObtenerProyectosPorPrograma/${anio}/${programaCodigo}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                // limpiar NOGActualInput, NOGInput
                $("#NOGInput").val('')
                $('#btnActualizar').prop('disabled', true)
                let cols = val.map((item) => `<option value="${item.AnioCodigoProyecto}">${item.ProyectoDescripcion}</option>`)
                $("#proyectoSelect").empty().append(cols.join("")).trigger("change")
            }
        })
    })
    $("#proyectoSelect").on("change", ({ currentTarget }) => {
        let ID = currentTarget.value
        $.ajax({
            url: `${urlbase}api/ActualizacionNOG/ObtenerNOGProyecto/${ID}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                // limpiar NOGActualInput, NOGInput
                $("#NOGInput").val('')
                $('#btnActualizar').prop('disabled', true)
                if (val.length > 0) {
                    $("#NOGActualInput").val(val[0].ProyectoNOG)
                    $('#btnActualizar').prop('disabled', $('#NOGInput').val().length < 8)
                }
            }
        })
    })
    $('#NOGInput').keyup(({ currentTarget, }) => {
        $('#btnActualizar').prop('disabled', currentTarget.value.length < 4 || $('#NOGActualInput').val().length == 0)
    });
    $("#btnActualizar").click(function () {
        let [AnioID, ProyectoCodigo] = $('#proyectoSelect').val().split(',')
        let ProyectoNOG = $('#NOGInput').val()
        $.ajax({
            url: `${urlbase}api/ActualizacionNOG/ActualizarNOGProyecto`,
            method: "POST",
            data: JSON.stringify({
                AnioID,
                ProyectoCodigo,
                ProyectoNOG,
                UserName: usuario
            }),
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                // Exito al guardar el cambio de NOG
                $('#NOGActualInput').val(ProyectoNOG)
                swal.fire("Nuevo NOG " + ProyectoNOG, "", "success")
            },
            error: (response) => {
                Swal.fire("Error", response.responseJSON.Message, "error")
            }
        })
    })
})
