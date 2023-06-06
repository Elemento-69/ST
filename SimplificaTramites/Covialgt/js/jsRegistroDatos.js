var vPlan=null;
var vPrograma=null;
var vProyecto=null;

var vRolesUsuario;
var vVerificarSupervisor;
var EstadoInhabilitado;

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    vPlan = urlParams.get('Plan');
    vPrograma = urlParams.get('Programa');
    vProyecto = urlParams.get('Proyecto');

    fnObtenerRoles()
    $("#PlanAnualList").on("change.select2", ({ currentTarget }) => {
        $("#Bloqueo").hide()
        let plan = currentTarget.value
        $('#ProgramaList').find("option").remove()
        $.ajax({
            url: `${urlbase}api/Programa/Get/${plan}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                $('#ProgramaList').append(val.map((val) => new Option(val.ProgramaNombre, val.ProgramaCodigo))).trigger("change")

                if (vPrograma !== null) {
                    $('#ProgramaList').val(vPrograma);
                    $('#ProgramaList').trigger("change")
                }
            }
        })
    })

    $("#ProgramaList").on("change.select2", ({ currentTarget }) => {
        let program = currentTarget.value
        let plan = $("#PlanAnualList").val()
      
      // $('#ProyectoList').find("option").remove()
        $.ajax({
            url: `${urlbase}api/Proyecto/GetListadoXPrograma/${plan}/${program}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                $('#ProyectoList').html('')
                $('#ProyectoList').append(val.map((val) => new Option(val.ProyectoDescripcion, val.ProyectoCodigo))).trigger("change")
                if (vProyecto !== null) {
                    $('#ProyectoList').val(vProyecto);
                    $('#ProyectoList').trigger("change")
                }
                else {
                    $("#Bloqueo").hide()
                }
            }
        })
    })


    $("#ProyectoList").on("change.select2", ({ currentTarget }) => {
        //let description = currentTarget.selectedOptions[0].textContent
        //$("#TituloProyecto").html(description)
        let plan = $("#PlanAnualList").val()
        let program = $("#ProgramaList").val()
        let proyect = currentTarget.value
        AnioID = plan
        Proyectocodigo = proyect
        const createPromise = () =>
        $.ajax({
            url: `${urlbase}api/RegistrosMensuales/GetDocumentosRetenidos/${AnioID}/${Proyectocodigo}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                if (val > 0) {
                    $("#btnImprimirAnexo").hide()
                    $("#btnHistorialAnexos").hide()
                    $("#btngEquipos").hide()
                    $("#btnProgra").hide()
                    $("#btnTrabajos").hide()
                    $("#btngEstimaciones").hide()
                    $("#btncEstimaciones").hide()
                    $("#btnSanciones").hide()
                    $("#btnIngresarCT").hide()
                    $("#btnImprimirCT").hide()
                    $("#btnActaNotarial").hide()
                    $("#btnActaInicio").hide()
                    $("#btnFotoB").hide()
                    $("#btnFotoAdmin").hide()
                    $("#vEtiquetaProyectoInhablitado").html("Proyecto bloqueado, documentos de cambio no presentados y/o con reparo tecnico.");
                    $("#Bloqueo").show()

                }
                else {
                   

                    $.ajax({
                        url: `${urlbase}api/Dashboard/ObtenerEstadoCT/${plan}/${proyect}`,
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Content-Type": "application/json",
                        },
                        success: (val) => {
                            let cols = val[0].CTIngresado
                             EstadoInhabilitado = val[0].Inhabilitado
                            if (cols) {
                                $("#btnIngresarCT").hide()
                            }
                            else {
                                $("#btnIngresarCT").show()
                            }

                            if (EstadoInhabilitado) {
                                $("#btnImprimirAnexo").hide()
                                $("#btnHistorialAnexos").hide()
                                $("#btngEquipos").hide()
                                $("#btnProgra").hide()
                                $("#btnTrabajos").hide()
                                $("#btngEstimaciones").hide()
                                $("#btncEstimaciones").hide()
                                $("#btnSanciones").hide()
                                $("#btnIngresarCT").hide()
                                $("#btnImprimirCT").hide()
                                $("#btnActaNotarial").hide()
                                $("#btnActaInicio").hide()
                                $("#btnFotoB").hide()
                                $("#btnDocumentosCambio").hide()
                                $("#btnFotoAdmin").hide()
                                $("#vEtiquetaProyectoInhablitado").html("Proyecto bloqueado, favor de comunicarse con Subdirección Técnica");
                                $("#Bloqueo").show()
                            }
                            else {
                                $("#btnImprimirAnexo").show()
                                $("#btnHistorialAnexos").show()
                                $("#btngEquipos").show()
                                $("#btnProgra").show()
                                $("#btnTrabajos").show()
                                $("#btngEstimaciones").show()
                                $("#btncEstimaciones").show()
                                $("#btnSanciones").show()
                                $("#btnIngresarCT").show()
                                $("#btnImprimirCT").show()
                                $("#btnActaNotarial").show()
                                $("#btnActaInicio").show()
                                $("#btnFotoB").show()
                                $("#btnDocumentosCambio").show()
                                $("#btnFotoAdmin").show()
                                $("#Bloqueo").hide()
                            }
                          
                        }
                    })
                }
            },

        })

        var promises = [createPromise()];

        Promise.all(promises)
            .then(responses => {
                $.ajax({
                    url: `${urlbase}api/RegistroDatos/GetPeriodosProyecto/${plan}/${proyect}`,
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                    success: (val2) => {
                        let claseBtns1 = EstadoInhabilitado ? 'action-icon hover-green not-active' : 'action-icon hover-green'
                        let claseBtns2 = EstadoInhabilitado ? 'action-icon hover-blue not-active' : 'action-icon hover-blue'
                        let claseBtns3 = EstadoInhabilitado ? 'action-icon hover-black not-active' : 'action-icon hover-black'
                        let claseBtns4 = EstadoInhabilitado ? 'action-icon hover-yellow not-active' : 'action-icon hover-yellow'
                        let claseBtns5 = EstadoInhabilitado ? 'action-icon hover-purple not-active' : 'action-icon hover-purple'
                        let cols = val2.map((item) => `<tr>
                                                        <td class="spacer" style="width: 90px;"></td>
                                                        <td>
                                                            <a href='Multimedia.aspx?plan=${plan}&proyecto=${proyect}&periodo=${item.PeriodoCorrel}&programa=${program}' class='${claseBtns1}' data-toggle='popover' data-trigger='hover'
                                                                data-content='Multimedia' data-placement='top'>
                                                                <i class='fas fa-photo-video fa-lg fa-fw'></i>
                                                            </a>
                                                            <a href = 'RegistroClimatico.aspx?plan=${plan}&proyecto=${proyect}&periodo=${item.PeriodoCorrel}&programa=${program}' class='${claseBtns2}' data-toggle='popover' data-trigger='hover'
                                                                data-content='Clima durante el periodo' data-placement='top'>
                                                                <i class='fas fa-cloud fa-lg fa-fw'></i>
                                                            </a>
                                                            <a href = 'EquipoDurantePeriodo.aspx?plan=${plan}&proyecto=${proyect}&periodo=${item.PeriodoCorrel}&programa=${program}' class='${claseBtns3}' data-toggle='popover' data-trigger='hover'
                                                                data-content='Uso de equipo en el periodo' data-placement='top'>
                                                                <i class='fas fa-wrench fa-lg fa-fw'></i>
                                                            </a>
                                                            <a href = 'RegistrosMensuales.aspx?plan=${plan}&proyecto=${proyect}&periodo=${item.PeriodoCorrel}&programa=${program}' class='${claseBtns4}' data-toggle='popover' data-trigger='hover'
                                                                data-content='Cantidades ejecutadas en el periodo' data-placement='top'>
                                                                <i class='fas fa-file-alt fa-lg fa-fw'></i>
                                                            </a>
                                                            <a href = 'RegistroActividadesProyecto.aspx?plan=${plan}&proyecto=${proyect}&periodo=${item.PeriodoCorrel}&programa=${program}' class='${claseBtns5}' data-toggle='popover' data-trigger='hover'
                                                                data-content='Actividades en el proyecto' data-placement='top'>
                                                                <i class='far fa-calendar-check fa-lg fa-fw'></i>
                                                            </a>
                                                        </td>
                                                        <td class="text-center">${item.PeriodoDesde}</td>
                                                        <td class="text-center">${item.PeriodoHasta}</td>
                                                        <td class="text-center">
                                                            <div class='custom-control custom-checkbox'>
                                                                <input type = 'checkbox' class='custom-control-input' id='chk-${item.PeriodoCorrel}' value='${item.PeriodoHabilitado}'>
                                                                <label class='custom-control-label' for='chk-${item.PeriodoCorrel}'></label>
                                                            </div>
                                                        </td>   
                                                        <td class="spacer"></td></tr>`)
                        $("#PeriodosTable tbody").html(cols.join(""))
                        $('[data-toggle="popover"]').popover();
                    }
                })
            })
        let proyOpt = $(".option-proyect")
        proyOpt.each((_, el) => {
            el = $(el)
            el.attr("href", `${el.data("urlbase")}?plan=${plan}&proyecto=${proyect}&programa=${program}`)
        })
    })
    var AnioID = 0;
    var Proyectocodigo = '';
    $("#ProyectoListSup").on("change.select2", ({ currentTarget }) => {
        //let description = currentTarget.selectedOptions[0].textContent
        //$("#TituloProyecto").html(description)
        let plan = currentTarget.value.substring(0, 4)
        let proyect = currentTarget.value.substring(4, 20)
        AnioID = plan
        Proyectocodigo = proyect
        //let plan = $("#PlanAnualList").val()
        let codigo = proyect
        let program = proyect.substring(0, codigo.indexOf("-"))
        //let proyect = currentTarget.value
        $.ajax({
            url: `${urlbase}api/RegistroDatos/GetPeriodosProyecto/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                let cols = val.map((item) => `<tr>
                <td class="spacer"></td>
                <td>
                    <a href='Multimedia.aspx?plan=${plan}&proyecto=${proyect}&periodo=${item.PeriodoCorrel}&programa=${program}' class='action-icon hover-green' data-toggle='popover' data-trigger='hover' 
                        data-content='Multimedia' data-placement='top'>
                        <i class='fas fa-photo-video fa-lg fa-fw'></i>
                    </a>
                    <a href = 'RegistroClimatico.aspx?plan=${plan}&proyecto=${proyect}&periodo=${item.PeriodoCorrel}' class='action-icon hover-blue' data-toggle='popover' data-trigger='hover' 
                        data-content='Clima durante el periodo' data-placement='top'>
                        <i class='fas fa-cloud fa-lg fa-fw'></i>
                    </a>
                    <a href = 'EquipoDurantePeriodo.aspx?plan=${plan}&proyecto=${proyect}&periodo=${item.PeriodoCorrel}' class='action-icon hover-black' data-toggle='popover' data-trigger='hover' 
                        data-content='Uso de equipo en el periodo' data-placement='top'>
                        <i class='fas fa-wrench fa-lg fa-fw'></i>
                    </a>
                    <a href = 'RegistrosMensuales.aspx?plan=${plan}&proyecto=${proyect}&periodo=${item.PeriodoCorrel}' class='action-icon hover-yellow' data-toggle='popover' data-trigger='hover' 
                        data-content='Cantidades ejecutadas en el periodo' data-placement='top'>
                        <i class='fas fa-file-alt fa-lg fa-fw'></i>
                    </a>
                    <a href = 'RegistroActividadesProyecto.aspx?plan=${plan}&proyecto=${proyect}&periodo=${item.PeriodoCorrel}' class='action-icon hover-purple' data-toggle='popover' data-trigger='hover' 
                        data-content='Actividades en el proyecto' data-placement='top'>
                        <i class='far fa-calendar-check fa-lg fa-fw'></i>
                    </a>
                </td>
                <td class="text-center">${item.PeriodoDesde}</td>
                <td class="text-center">${item.PeriodoHasta}</td>
                <td class="text-center">
                    <div class='custom-control custom-checkbox'>
                        <input type = 'checkbox' class='custom-control-input' id='chk-${item.PeriodoCorrel}' value='${item.PeriodoHabilitado}'>
                        <label class='custom-control-label' for='chk-${item.PeriodoCorrel}'></label>
                    </div>
                </td>   
                <td></td>
                <td class="spacer"></td></tr>`)
                $("#PeriodosTable tbody").html(cols.join(""))
                $('[data-toggle="popover"]').popover();
            }
        })
        $.ajax({
            url: `${urlbase}api/RegistrosMensuales/GetDocumentosRetenidos/${AnioID}/${Proyectocodigo}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                if (val > 0) {
                    $("#btnImprimirAnexo").hide()
                    $("#btnHistorialAnexos").hide()
                    $("#btngEquipos").hide()
                    $("#btnProgra").hide()
                    $("#btnTrabajos").hide()
                    $("#btngEstimaciones").hide()
                    $("#btncEstimaciones").hide()
                    $("#btnSanciones").hide()
                    $("#btnIngresarCT").hide()
                    $("#btnImprimirCT").hide()
                    $("#btnActaNotarial").hide()
                    $("#btnActaInicio").hide()
                    $("#btnFotoB").hide()
                    $("#btnFotoAdmin").hide()
                    $("#vEtiquetaProyectoInhablitado").html("Proyecto bloqueado, documentos de cambio no presentados y/o con reparo tecnico.");
                    $("#Bloqueo").show()

                }
                else {
                   
                    $.ajax({
                        url: `${urlbase}api/Dashboard/ObtenerEstadoCT/${plan}/${proyect}`,
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Content-Type": "application/json",
                        },
                        success: (val) => {
                            let cols = val[0].CTIngresado
                            let EstadoInhabilitado=val[0].Inhabilitado
                            if (cols) {
                                $("#btnIngresarCT").hide()
                            }
                            else {
                                $("#btnIngresarCT").show()
                            }
                            if (EstadoInhabilitado) {
                                $("#btnImprimirAnexo").hide()
                                $("#btnHistorialAnexos").hide()
                                $("#btngEquipos").hide()
                                $("#btnProgra").hide()
                                $("#btnTrabajos").hide()
                                $("#btngEstimaciones").hide()
                                $("#btncEstimaciones").hide()
                                $("#btnSanciones").hide()
                                $("#btnIngresarCT").hide()
                                $("#btnImprimirCT").hide()
                                $("#btnActaNotarial").hide()
                                $("#btnActaInicio").hide()
                                $("#btnFotoB").hide()
                                $("#btnFotoAdmin").hide()
                                $("#vEtiquetaProyectoInhablitado").html("Proyecto bloqueado, favor de comunicarse con Subdirección Técnica");
                                $("#Bloqueo").show()
                            }
                            else {
                                $("#btnImprimirAnexo").show()
                                $("#btnHistorialAnexos").show()
                                $("#btngEquipos").show()
                                $("#btnProgra").show()
                                $("#btnTrabajos").show()
                                $("#btngEstimaciones").show()
                                $("#btncEstimaciones").show()
                                $("#btnSanciones").show()
                                $("#btnIngresarCT").show()
                                $("#btnImprimirCT").show()
                                $("#btnActaNotarial").show()
                                $("#btnActaInicio").show()
                                $("#btnFotoB").show()
                                $("#btnFotoAdmin").show()
                                $("#Bloqueo").hide()
                            }
                        }
                    })
                }                
            },

        })
        let proyOpt = $(".option-proyect")
        proyOpt.each((_, el) => {
            el = $(el)
            el.attr("href", `${el.data("urlbase")}?plan=${plan}&proyecto=${proyect}&programa=${program}`)
        })
    })

    $("#btnImprimirAnexo").on("click", () => {
        opendialog("/visorinformes.aspx?Idreporte=77&Parameters=" + AnioID + "," + Proyectocodigo);
    })
    $("#btnHistorialAnexos").on("click", () => {
        window.location.replace(window.location.origin + baseSitio + "/Ejecucion/HistorialAnexos?plan=" + AnioID + "&proyecto=" + Proyectocodigo);
    })
    $("#btnTrabajos").on("click", () => {
        window.location.replace(window.location.origin + baseSitio + "/Ejecucion/GestionTrabajoEstimacionList?plan=" + AnioID + "&proyecto=" + Proyectocodigo);
    })
    $("#btnActaInicio").on("click", () => {
        window.location.replace(window.location.origin + baseSitio + "/Ejecucion/ActaInicioFiscal?plan=" + AnioID + "&proyecto=" + Proyectocodigo);
    })
    $("#btnActaNotarial").on("click", () => {
        window.location.replace(window.location.origin + baseSitio + "/Ejecucion/ActaNotarialRecepcion?plan=" + AnioID + "&proyecto=" + Proyectocodigo);
    })
    $("#btnSanciones").on("click", () => {
        window.location.replace(window.location.origin + baseSitio + "/Ejecucion/ConsultaDeSanciones?plan=" + AnioID + "&proyecto=" + Proyectocodigo + "&VieneRegistro=1");
    })
    $("#btnImprimirCT").on("click", () => {
        opendialog("/visorinformesSti.aspx?reporteID=900&AnioID=" + AnioID + "&ProyectoCodigo=" + Proyectocodigo + "&DocCambioCorrel=0");
    })
})

function fnObtenerRoles() {
    $.ajax({
        type: "POST",
        url: "RegistroDatos.aspx/fObtenerRoles",
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var vRespuestaJSON = JSON.parse(data.d);
            if (vRespuestaJSON.dioError == true) {
                $.LoadingOverlay("hide");
                Swal.fire("", vRespuestaJSON.descripcionMensaje, "error");
            }
            else {
                vRolesUsuario = vRespuestaJSON.datoDevueltoString.split(',')
                vVerificarSupervisor = vRolesUsuario.includes('SUPERVISOR') || vRolesUsuario.includes('SUPERVISOR CONSULTA')
                if (!vVerificarSupervisor) fnCargarplanesAnuales()
                else fnCargarProyectosSupervisor();
            }
        },
        failure: function (response) {
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}
$("select").select2({ theme: "bootstrap" })
function fnCargarplanesAnuales() {
    $.ajax({
        url: `${urlbase}api/plananual/get`,
        success: (val) => {
            let options = val.map((val) => new Option(val.PlanAnualNombre, val.AnioID))
            $('#PlanAnualList').append(options).trigger("change")
            if (vPlan !== null) {
                $('#PlanAnualList').val(vPlan);
                $('#PlanAnualList').trigger("change")
            }
        },

        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        }
    })

}



function fnCargarProyectosSupervisor() {
let User = usuario;
$.ajax({
    url: `${base_url}api/Proyecto/GetListadoXSupervisor/${User.substring(0, 4)}/${User.substring(4, 20)}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        $('#ProyectoListSup').html('')
        $('#ProyectoListSup').append(val.map((item) => new Option(item.ProyectoDescripcion, item.AnioID + item.ProyectoCodigo))).trigger("change")
        if (vProyecto !== null) {
            $('#ProyectoListSup').val(vPlan+vProyecto);
            $('#ProyectoListSup').trigger("change")
        }
    }
})

}


function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Anexo",
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