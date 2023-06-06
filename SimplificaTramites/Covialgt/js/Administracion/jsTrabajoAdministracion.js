$.ajax({
    url: `${urlbase}api/TrabajosXAdministracionAreaTecnica/GetTrabajosEstado`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        let options = val.map((val) => new Option(val.EstadoDesc, val.TrabajoEstadoID));
        $('#trabajosAdministracion').append(options).trigger("change");
    },
    error: () => { }
});

$("#trabajosAdministracion").change(() => {
    var estado_actual = $("#trabajosAdministracion").val();
    if (estado_actual) {
        $("#block-message").html(null);
        $("#block-message").addClass("d-none");
        LoadNuevoEstadoTrabajoAdministracion(estado_actual);
    }
    LoadGridGestionAdministracion();
});

$("#buscar-documento").click(() => {
    var estado_actual = $("#trabajosAdministracion").val();
    if (estado_actual) {
        $("#block-message").html(null);
        $("#block-message").addClass("d-none");
        LoadNuevoEstadoTrabajoAdministracion(estado_actual);
    }
    LoadGridGestionAdministracion();
})

function LoadNuevoEstadoTrabajoAdministracion(estado) {
    let options = [];
    switch (estado) {
        case "0":
            options.push(new Option("Documento Recibido en COVIAL", 1));
            break;
        case "1":
            options.push(new Option("Documento no Presentado", 0));
            options.push(new Option("Documento con Observación Técnica", 2));
            options.push(new Option("Documento Rechazado por COVIAL", 4));
            options.push(new Option("Documento necesita Aprobación Comité Técnico", 5));
            options.push(new Option("Documento Aprobado", 8));
            break;
        case "2":
            options.push(new Option("Documento Observado Retirado", 3));
            break;
        case "3":
            options.push(new Option("Documento Recibido en COVIAL", 1));
            options.push(new Option("Documento con Observación Técnica", 2));
            break;
        case "4":
            options.push(new Option("Documento no Presentado", 0));
            options.push(new Option("Documento Observado Retirado", 3));
            break;
        case "5":
            options.push(new Option("Documento Recibido en COVIAL", 1));
            break;
        case "6":
            options.push(new Option("Documento Rechazado por Comité Técnico", 7));
            options.push(new Option("Documento Aprobado", 8));
            break;
        case "7":
            options.push(new Option("Documento para Aprobación Comité Técnico.", 7));
            break;
        case "8":
            options.push(new Option("Documento Recibido en COVIAL", 1));
            options.push(new Option("Documento para Aprobación Comité Técnico.", 6));
            break;
    }
    $('#nuevoEstadoAdministracion').html(options).trigger("change");
}

function LoadGridGestionAdministracion() {
    var estado = $("#trabajosAdministracion").val();
    var search = $("#terminoBusqueda").val();
    var columns = [
        { data: 'null', className: 'spacer', title: '', render: () => '' },
        {
            data: 'null',
            title: 'Seleccionar',
            className: "text-center",
            render: (data, type, row, indexes) => {
                var input_seleccionar = `
                    <div class="form-group custom-control custom-checkbox ">
                        <input type="checkbox" class="custom-control-input check" id="check${indexes.row}" data-row="${indexes.row}">
                        <label class="custom-control-label" for="check${indexes.row}"></label>
                    </div>`;
                return input_seleccionar;
            }
        },
        { data: 'Anio', title: 'Año', className: "text-center" },
        { data: 'ProyectoCodigo', title: 'Proy', className: "text-center" },
        { data: 'TrabajoCorr', title: 'Corr.', className: "text-center" },
        { data: 'TrabajoJustificacion', title: 'Justificación', className: "text-center width-custom" },
        { data: 'TrabajoComentario', title: 'Comentario', className: "text-center" },
        { data: 'TrabajoMonto', title: 'Monto', className: "text-center", render: (data) => format_currency(parseFloat(data), 'Q') },
        { data: 'FechaPresentado', title: 'Presentado', className: "text-center", render: format_date },
        { data: 'EstadoDesc', title: 'Estado', className: "text-center" },
        { data: 'null', className: 'spacer', title: '', render: () => '' },
    ];
    $.ajax({
        url: `${urlbase}api/TrabajosXAdministracionAreaTecnica/GetTrabajosXAdmonGrid/${estado}/${search}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $("#acta-table").DataTable(WithoutPagination(url_proyecto, columns, val))
        },
        error: () => {
            $("#acta-table").DataTable(WithoutPagination(url_proyecto, columns, []))
        }
    })
}

$("table#acta-table").on("change", "input[type=checkbox]", (e) => {
    var checked = e.currentTarget.checked;
    $(".check").parent().parent().parent().removeClass("seleccionado");
    $(".check").prop('checked', false);
    if (checked)
        e.target.parentElement.parentElement.parentElement.classList.add("seleccionado");
    else
        e.target.parentElement.parentElement.parentElement.classList.remove("seleccionado");
    
    $(`#${e.currentTarget.id}`).prop('checked', checked);
});

let time;
$("#terminoBusqueda").on('keyup search input past cut', () => {
    clearTimeout(time);
    time = setTimeout(() => {
        $("#block-message").addClass("d-none");
        $("#block-message").html(null);
        LoadGridGestionAdministracion()
    }, 800);
})

$("#btn-asignar-estado").click(() => {
    var check = $("table#acta-table input[type=checkbox]:checked");
    if (check && check.length) {
        var row = $("table#acta-table").DataTable().row(check[0].dataset.row).data();
        var nuevo_estado = $("#nuevoEstadoAdministracion option:selected").text();
        var nuevo_estado_id = $("#nuevoEstadoAdministracion").val();
        var date = new Date();
        if (row.TrabajoEstadoID == 0) {
            date = new Date();
        }
        else {
            date = row.FechaPresentado;
        }
        data = {
            "AnioId": row.Anio,
            "ProyectoCodigo": row.ProyectoCodigo,
            "TrabajoCorr": row.TrabajoCorr,
            "TrabajoComentario": row.TrabajoComentario,
            "FechaPresentado": date,
            "TrabajoEstadoID": nuevo_estado_id,
            "UserName": usuario,
            "DateModify": new Date()
        };
        $.ajax({
            url: `${urlbase}api/TrabajosXAdministracionAreaTecnica/ActualizaTrabajo`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            type: "POST",
            data: JSON.stringify(data),
            success: (result) => {
                LoadGridGestionAdministracion();
                $("#block-message").html(`
                    <h5 class="mb-3"><b>Estado de la Operación</b></h5>
                    <p>El Trabajo por Administración No: ${row.TrabajoCorr} para el Proyecto: ${row.ProyectoCodigo}, ha sido modificado
                    satisfactoriamente desde el estado: '${row.EstadoDesc}'<br />
                    el estado: '${nuevo_estado}'</p>
                `);
                $("#block-message").removeClass("d-none");
            },
            error: (e) => {
                $("#block-message").html(null);
                $("#block-message").addClass("d-none");
                var message = e.responseJSON.message || "Error al actualizar los datos.";
                Swal.fire({ icon: 'error', title: "Error", text: message });
            }
        });
    } else {
        $("#block-message").html(null);
        $("#block-message").addClass("d-none");
    }
})