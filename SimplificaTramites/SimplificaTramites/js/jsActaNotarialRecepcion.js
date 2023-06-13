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
$.ajax({
    url: `${urlbase}api/ActaNotarial/ObtenerCargoIngenieroActa`,
    success: (val) => {
        let $categoria = $('#cargoPersona')
        let options = val.map((val) => new Option(val.Descripcion_Cargo, val.Id_Cargo))
        $categoria.append(options)
        $categoria.val("Representante Legal")
        $categoria.trigger("change")
    },
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})
function createTable() {
    $.ajax({
        url: `${urlbase}api/ActaNotarial/ObtenerListaActaNotarialContratista/${plan}/${proyecto}`,
        success: (val) => {
            let $categoria = $('#acta-table tbody')
            $categoria.html(null)
            let options = val.map((item) => {
                let row = $(`
                 <tr class="text-center td-custom">
                    <td class="spacer bg-light"></td>
                    <td>
                        <a type="button" class="action-icon hover-blue del-btn" data-toggle="popover" data-trigger="hover"
                            data-content="Detalle de estimaciones" data-placement="top">
                            <i class="fas fa-trash fa-lg fa-fw"></i>
                        </a>
                        <a href="#" class="action-icon hover-blue print-btn" data-toggle="popover" data-trigger="hover"
                            data-content="Detalle de estimaciones" data-placement="top">
                            <i class="fas fa-print fa-lg fa-fw"></i>
                        </a>
                    </td>
                    <td>${moment(item.FechaActa).format("DD/MM/YYYY")}</td>
                    <td>${item.AnioID}</td>
                    <td>${item.ProyectoCodigo}</td>
                    <td>${item.Acta}</td>
                    <td>${item.DescripcionProyecto}</td>
                    <td class="spacer bg-light"></td>
                </tr>`)
                row.data("item", item)
                return row
            })
            $categoria.append(options)
        },
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        }
    })
}


$('#acta-table tbody').on("click", ".print-btn", function () {
    let data = $(this).closest("tr").data("item")
    let item = {
        "AnioID": data.AnioID,
        "ProyectoCodigo": data.ProyectoCodigo,
        "Acta": data.Acta
    }
    $.ajax({
        url: `${urlbase}api/ActaNotarial/ObtenerActaNotarialContratista/${plan}/${proyecto}`,
        success: (val) => {
           
            let AnioID = val.AnioID
            let ProyectoSupervisionCodigo = val.ProyectoSupervisionCodigo
            let FechaActa = val.FechaActa
            let Contrato = val.Contrato
            let FechaContrato = val.FechaContrato
            let FechaInspeccion = val.FechaInspeccion
            let FechaInicioReporte = val.FechaInicioReporte
            let FechaFinalReporte = val.FechaFinalReporte
            let AnioGeneral = val.AnioGeneral
            let Supervisor = val.Supervisor
            let CodProy = val.CodProy

            opendialog("/visorinformesSti.aspx?reporteID=8100&AnioID=" + data.AnioID + "&ProyectoSupervisionCodigo=" + ProyectoSupervisionCodigo + "&fechaacta=" + FechaActa + "&contrato=" + Contrato + "&fechacontrato=" + FechaContrato + "&fechainspeccion=" + FechaInspeccion + "&fechainicio=" + FechaInicioReporte + "&fechafinalreporte=" + FechaFinalReporte + "&aniogeneral=" + AnioGeneral + "&supervisor=" + Supervisor + "&codproy=" + CodProy);

        },
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        }
    })

   })
    
function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Acta Notarial de Recepción",
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

$('#acta-table tbody').on("click", ".del-btn", function () {
    let data = $(this).closest("tr").data("item")
    let item = {
        "AnioID": data.AnioID,
        "ProyectoCodigo": data.ProyectoCodigo,
        "Acta": data.Acta
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
                url: `${urlbase}api/ActaNotarial/EliminarActaNotarialContratista`,
                method: "POST",
                data: JSON.stringify(item),
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: () => {
                    Swal.fire("Eliminado Exitosamente", "", "success")
                    createTable()
                },
                error: (response) => {
                    Swal.fire("Error", response.responseJSON.Message, "error")
                }
            })
        }
    })

})

createTable()

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
$("#customCheckFianza").on("change", function () {
    if (this.checked) {
        $(".poliza-input").closest("div").removeClass("d-none")
    } else {
        $(".poliza-input").closest("div").addClass("d-none")
        $(".poliza-input").val(null)
    }
})

$("#saveActa-btn").on("click", () => {
    let obj = {
        "AnioID": plan,
        "ProyectoCodigo": proyecto,
        "Acta": "Acta-"+plan+"-"+proyecto,
        "Departamento": $("#departamento").val(),
        "Municipio": $("#municipio").val(),
        "HoraActa": $("#hora").val(),
        "DireccionSupervisor": $("#direccion").val(), 
        "NotarioActa": $("#notario").val(),
        "Superintendente": $("#superintendente").val(),
        "NotarioProyecto": $("#notarioProyecto").val(),
        "SupervisorRegional": $("#supervisorRegional").val(),
        "NumeralRomano": "string",
        "DescripcionProyecto": "",
        "FechaInspeccion": $("#inspeccionFecha-dp").datetimepicker("date").toDate(),
        "FechaInicio": $("#fechaInicio-dp").datetimepicker("date").toDate(),
        "FechaFinal": $("#fechaFinal-dp").datetimepicker("date").toDate(),
        "Clase": $("#clase").val(),
        "Poliza": $("#poliza").val(),
        "Aseguradora": $("aseguradora").find("option:selected").text(),
        "ValorActa": $("#valorPoliza").val(),
        "JustificacionCuarto": "string",
        "JustificacionQuinto": "string",
        "Delegado": $("#delegado").val(),
        "UsuarioCreo": user,
        "AplicaPoliza": true,
        "Clase2": $("#clasep").val(),
        "Poliza2": $("#polizap").val(),
        "Aseguradora2":$("Aseguradorap").find("option:selected").text(),
        "Valorpoliza2": $("#valorp").val(),
        "EmpresaNombre": $("#empresa").val(),
        "FechaActa": $("#fecha-dp").datetimepicker("date").toDate(),
        "RepresentantePropietario": $("#cargoEmpresa").val(),
        "CargoPersonaRepresentaEmpresa": $("cargopersona").find("option:selected").text(),
        "ClausulaReferencia": "string",
        "DescripcionClausula": "string",
        "variableEspecialidadProyecto": "string",
        "CodigoNombramiento": $("#codigoCovial1").val() + $("#codigoCovial2").val(),
        "FechaNombramiento": $("#fechaNombramiento-dp").datetimepicker("date").toDate(),
        "NombramientoLetras": "string",
        "FechaNombramientoLetras": "string",
        "NombreSubdirectorTecnico": $("#directorTecnico").val(),
        "CodigoProyectoLetras": "string",
        "PolizaUnoLetras": "string",
        "PolizaDosLetras": "string",
        "LetrasProyectoCodigo": "string",
        "NoPaginas": "string",
        "AnioNombramiento": $("#fechaNombramiento-dp").datetimepicker("date").year(),
        "AnioNombramientoLetras": "string",
        "MinutosDespuesInicioActa": $("#minutosActa").val()
    }

    $.ajax({
        url: `${urlbase}api/ActaNotarial/AgregarActaNotarialContratista`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(obj),
        success: (val) => {
            let message = "Acta creada correctamente"
            swal.fire(message, "", "success")
            createTable()
        },
        error: function (response) {
            swal.fire(response.responseJSON.message, response.responseJSON.detail, "error");
            return false
        }
    })
})