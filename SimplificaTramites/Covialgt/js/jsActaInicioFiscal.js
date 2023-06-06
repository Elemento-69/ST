$(document).ready(function () {
    $("#btnRegresarRegistroDatos").click(function () {
        let QueryString = "?Plan=" + plan + "&Programa=" + proyecto.split('-')[0].toString() + "&Proyecto=" + proyecto
        window.location.href = "RegistroDatos.aspx" + QueryString;
    })
})

$(".date").datetimepicker({
    format: 'DD/MM/YYYY'
})
$("select").select2({ theme: "bootstrap" })

$.ajax({
    url: `${urlbase}api/ActaInicio/ObtenerEspecialidadProyecto`,
    success: (val) => {
        let $categoria = $('#Categoria')
        let options = val.map((val) => new Option(val.Descripcionprograma, val.ProgramaCodigo))
        $categoria.append(options)
        $categoria.val(proyecto.split("-")[0])
        $categoria.trigger("change")
    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})
setTable();
function setTable() {
$.ajax({
    url: `${urlbase}/api/ActaInicio/ObtenerActaInicioContratista/${plan}/${proyecto}`,
    success: (val) => {
        let $categoria = $('#acta-table tbody')
        $categoria.html(null)
        let options = val.map((val) => `
            <tr class="text-center td-custom">
                <td class="spacer bg-light"></td>
                <td>
                    <a href="#" class="action-icon hover-red del-btn" data-toggle="popover" data-trigger="hover" data-id="${val.CertificacionFideicomisonumero}" data-cert="${val.CertificacionFideicomisoNumero}"
                        data-content="Detalle de estimaciones" data-placement="top">
                        <i class="fas fa-trash fa-lg fa-fw"></i>
                    </a>
                    <a href="#" class="action-icon hover-blue print-btn" data-toggle="popover" data-trigger="hover" data-id="${val.CertificacionFideicomisonumero}" data-cert="${val.CertificacionFideicomisoNumero}"
                        data-content="Detalle de estimaciones" data-placement="top">
                        <i class="fas fa-print fa-lg fa-fw"></i>
                    </a>    
                </td>
                <td>${moment(val.FechaActa).format("DD/MM/YYYY HH:mm:SS a")}</td>
                <td>${val.AnioID}</td>
                <td>${val.ProyectoCodigo}</td>
                <td>${val.CertificacionFideicomisonumero}</td>
                <td class="spacer bg-light"></td>
            </tr>
        `)
        $categoria.append(options)
    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})
}
$("#acta-table tbody").on("click", ".del-btn", ({ currentTarget }) => {
    let id = $(currentTarget).data("id")
    let cert = $(currentTarget).data("cert")
    let item = {
        "AnioID": plan,
        "ProyectoCodigo": proyecto,
        "CertificacionFideicomisoNumero":id
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
                url: `${urlbase}api/ActaInicio/EliminarActaContratista`,
                method: "POST",
                data: JSON.stringify(item),
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: () => {
                    Swal.fire("Eliminado Exitosamente", "", "success")
                    setTable()
                },
                error: (response) => {
                    Swal.fire("Error", response.responseJSON.Message, "error")
                }
            })
        }
    })
})
$("#acta-table tbody").on("click", ".print-btn", ({ currentTarget }) => {
    let id = $(currentTarget).data("id")
    let cert = $(currentTarget).data("cert")
    opendialog("/visorinformesSti.aspx?reporteID=8400&AnioID=" + plan + "&ProyectoCodigo=" + proyecto + "&CertificacionFideicomisoNumero=" + id); 

})
function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Impresión de documentos de cambio",
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

$.ajax({
    url: `${urlbase}api/ActaInicio/ObtenerCargoIngenieroActa`,
    success: (val) => {
        let $categoria = $('#CargoPersonaActa')
        let options = val.map((val) => new Option(val.Descripcion_Cargo, val.Id_Cargo))
        $categoria.append(options)
        $categoria.trigger("change")
    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})

$("#Categoria").on("change.select2", function () {
    if (this.value == "O") $("#OtraCategoria").closest("div").removeClass("d-none")
    else $("#OtraCategoria").closest("div").addClass("d-none")
})

$("#EsEmpresa").on("change", function () {
    if (this.checked) {
        $(".empresa-input").closest("div").removeClass("d-none")
    } else {
        $(".empresa-input").closest("div").addClass("d-none")
        $(".empresa-input").val(null)
    }
})

$("#saveActa-btn").on("click", () => {
    let obj = {
        "AnioID": plan,
        "ProyectoCodigo": proyecto,
        "ProyectoCodigoLetras": "string",
        "Departamento": $("#Departamento").val(),
        "Municipio": $("#Municipio").val(),
        "HoraActa": $("#hora").val(),
        "FechaActa": $("#fecha-dp").datetimepicker("date").toDate(),
        "FechaActaLetras": "string",
        "NotarioActa": $("#NombreNotarioActa").val(),
        "DireccionNotario": $("#DirNotario").val(),
        "NombreIngenieroRequerimiento": $("#NombrePersonaRequiera").val(),
        "CargoIngenieroRequerimiento": $("#CargoPersonaActa:selected").text(),
        "NombreDelegadoResidente": $("#delegadoResidente").val(),
        "EmpresaNombre": $("#nombreEmpresa").val(),
        "NombreIngenieroSupervisor": $("#IngenieroSupervisorProyecto").val(),
        "CertificacionFideicomisoNumero": $("#NumeroCertificacionFideicomiso").val(),
        "CertificacionFideicomisoLetras": $("#NumeroCertificacionFideicomiso").val(),
        "FechaCertifiFideicomiso": $("#FechaCertificacionFideicomiso-dp").datetimepicker("date").toDate(),
        "FechaCertifiFideicomisoLetras": "string",
        "FechaInicioEjecucion": $("#FechaInicioEjecucion-dp").datetimepicker("date").toDate(),
        "FechaInicioEjecucionLetras": "string",
        "NumContratoEscrituraPublicaNum": $("#NumeroEscrituraPublica").val(),
        "NumContratoEscrituraPublicaLetras": "string",
        "FechaContratoEscrituraPNum": $("#FechaInicioEjecucion-dp").datetimepicker("date").toDate(),
        "FechaContratoEscrituraPLetras": "string",
        "NotarioEscrituraPublica": $("#NotarioEscrituraPublica").val(),
        "NombreMandatarioEspecial": $("#MandatarioEspecial").val(),
        "NumeroClausulaLetras": $("#NumeroClausula").val(),
        "LiteralLetras": $("#LiteralClausula").val(),
        "FechaInicioContratoNum": $("#InicioContrato-dp").datetimepicker("date").toDate(),
        "FechaInicioContratoLetras": "string",
        "FechaFinalContratoNum": $("#FinContrato-dp").datetimepicker("date").toDate(),
        "FechaFinalContratoLetras": "string",
        "NumeroDiasContractualesNum": parseInt($("#DiasContractuales").val()),
        "NumeroDiasContractualesLetras": "string",
        "ClausulaCertificacionFideicomiso": $("#NumeroCertificacionFideicomiso").val(),
        "LiteralCertificacionFideicomiso": "string",
        "FinalizacionMinutosLetras": $("#TiempoLectura").val(),
        "EsEmpresa": $("#TiempoLectura").prop("checked"),
        "NumeroEscrituraLetras": $("#NumeroEscrituraPublica").val(),
        "CargoIngenieroEsEmpresa": "string",
        "CategoriaProyecto": $("#Categoria").val(),
        "CargoEncargadoBanco": $("#CargoRepresentanteBanco").val(),
        "TituloPersonaRequiereActa": $("#CargoPersonaActa").val(),
        "UsuarioCreo": user
    }

    $.ajax({
        url: `${urlbase}/api/ActaInicio/InsertDatosActaInicioContratista`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(obj),
        success: (val) => {
            let message = "Acta creada correctamente"
            swal.fire(message, "", "success")
            setTable();
        },
        error: function (response) {
            swal.fire(response.responseJSON.message, response.responseJSON.detail, "error");
            return false
        }
    })
})

