var vRolesUsuario;
var vVerificarSupervisor;
var vVerificarAdministrador;
var tiempochart
var plan;
var proyect;
var vVieneDeOtra = false;
var vParametros;
var linkGuatecompras;
var vNombreArchivo;
var vFotoIDActual;
var miCurrentActual;
var vTypeTag;
var vPeriodoIDTag;
var vCurrentTagVal;
var vCT;

$(document).ready(function () {
    fnObtenerRoles();

    //ELIMINAR IMÁGENES EN GALERIA
    $("#btnEliminarFoto").click(function () {
        // alert(vFotoIDActual);
        Swal.fire({
            title: "Favor confirmar",
            text: "¿Desea eliminar la fotografia?",
            icon: "warning",
            showDenyButton: true, showCancelButton: false,
            confirmButtonText: `Si`,
            denyButtonText: `No`,
        })
            .then((result) => {
                if (result.isConfirmed) {
                    $.LoadingOverlay("show")
                    $.ajax({
                        url: `${base_url}api/Multimedia/EliminarFotografia`,
                        method: "post",
                        data: JSON.stringify({
                            "FotografiaId": vFotoIDActual,
                            "Descripcion": '',
                        }),
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Content-Type": "application/json"
                        },
                        success: (val) => {
                            $.LoadingOverlay("hide");
                            Swal.fire("Éxito", "Fotografía elimada correctamente", "success").then(function () {
                            
                            window.location.href = "Default.aspx"
                            //fnRecargarGaleria();


                            });

                        },
                        error: (error) => {
                            $.LoadingOverlay("hide");
                            Swal.fire("", error.message + " ", "error");
                        }
                    })
                }
            });

    })


   




    //Cargar los Tramos para filtrar
    $("#ProyectoList").on("change.select2", ({ currentTarget }) => {
        let codProyecto = currentTarget.value;
        let Plan = $('#PlanAnualList').val();
        $.ajax({
            url: `${base_url}api/Dashboard/TramosExistenFotos/${Plan}/${codProyecto}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {

                
                let llenado = `<option value="0">TODOS</option>`
                $.each(val, (i, item) => {
                    llenado += `<option value="${item.TramoID}">${item.RutaCode} - ${item.TramoDesc} ${item.TramoCodigo}</option>`
                })
     
                $("#tramoGaleria").html(llenado);
     
             

            }
        })

    })

    



    const urlParams = new URLSearchParams(window.location.search);
    vParametros = urlParams.get('AnioProyecto');
    if (vParametros !== null) {
        vVieneDeOtra = true;
        plan = vParametros.split(',')[0]
        proyect = vParametros.split(',')[1]
        fnCargarPlanesAnuales()
    }
    else {
        fnCargarPlanesAnuales()
    }
   
    

    $('#btnBuscarEjecucion').click(function () {
        let fechas = []
        $(".ejecucion-date").each((index, item) => {
            if (item.value) {
                fechas.push(item.value)
            }
        })
        if (!vVieneDeOtra) {
            if (vVerificarSupervisor) {
                plan = $("#ProyectoListSup").val().split(',')[0]
                proyect = $("#ProyectoListSup").val().split(',')[1]
            } else {
                plan = $("#PlanAnualList").val()
                proyect = $("#ProyectoList").val()
            }
        }
       


        if (fechas.length == 2 && plan && proyect) {
            $.ajax({
                url: `${base_url}api/Dashboard/EjecucionPorFechas/${plan}/${proyect}/${moment(fechas[0], 'DD/MM/YYYY').format('YYYY-MM-DD')}/${moment(fechas[1], 'DD/MM/YYYY').format('YYYY-MM-DD')}`,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: (val) => {
                    let total = val.reduce((corr, item) => {
                        return corr + item.MontoAcumulado
                    }, 0)
                    let cols = val.map((item) => `<tr><td class="spacer"></td>
                    <td>${item.Renglon}</td>
                    <td>${item.Descripcion}</td>
                    <td>${item.RenglonUni}</td>
                    <td class="frcurrency-mask">${item.RenglonPrecioUnitario}</td>
                    <td class="frdecimal6-mask">${item.CantidadTotal || 0}</td>
                    <td class="frdecimal6-mask">${item.RenglonCantidadTotal}</td>
                    <td class="frcurrency-mask">${item.MontoVigente}</td>
                    <td class="frcurrency-mask">${item.MontoAcumulado}</td>
                    <td class="f_percent-mask">${item.PorcentajeEjecutado*100}</td>
                    <td class="spacer"></td></tr>`)

                    $("#EjecucionesTable tbody").html(cols.join(""))
                    $("#TableTotalAcumuladoEjecucion").val(total)
                    initMasks("#EjecucionesTable tbody")
                }
            })
        }

    })
    $('#afinanciera-tab').click(function (currentTarget) {
        let apiConsumir = 'api/Dashboard/ProyectoFotografiaAdmin/'
        if (!vVieneDeOtra) {
            if (vVerificarSupervisor) {
                plan = $("#ProyectoListSup").val().split(',')[0]
                proyect = $("#ProyectoListSup").val().split(',')[1]
            } else {
                plan = $("#PlanAnualList").val()
                proyect = $("#ProyectoList").val()
            }
        }

        $("#GaleryViewAdmin").html("")
        $.ajax({
            url: `${base_url}${apiConsumir}${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                set_galery_imageAdmon(val);
            }
        })
    })
   
    $('#checkCantidadesTramo').change(function () {
       
        let vestado;
        if (!vVieneDeOtra) {
            if (vVerificarSupervisor) {
                plan = $("#ProyectoListSup").val().split(',')[0]
                proyect = $("#ProyectoListSup").val().split(',')[1]
            } else {
                plan = $("#PlanAnualList").val()
                proyect = $("#ProyectoList").val()
            }
        }
        if (this.checked) {

            vestado = true;
        }
        else {
            vestado = false;
        }
        var data = JSON.stringify({
            AnioID: plan,
            ProyectoCodigo: proyect,
            CTIngresado: vestado
        })
        $.ajax({
            url: `${base_url}api/Dashboard/ActualizaEstadoCT`,
            method: "post",
            data: data,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
              
            },
            error: (error) => {
              
                Swal.fire("", error.message + " ", "error");
            }
        })
        })
       
    
})

function fnVerDetalle(Periodo) {
    let fechas = []
        fechas= Periodo.split('-')
   
    let fechaDesde = convertStringDate(fechas[0], '/');
    let fechaHasta = convertStringDate(fechas[1], '/');
    fechaDesde = moment(fechaDesde, 'DD/MM/YYYY').format('YYYY-MM-DD')
    fechaHasta = moment(fechaHasta, 'DD/MM/YYYY').format('YYYY-MM-DD')
    if (!vVieneDeOtra) {
        if (vVerificarSupervisor) {
            plan = $("#ProyectoListSup").val().split(',')[0]
            proyect = $("#ProyectoListSup").val().split(',')[1]
        } else {
            plan = $("#PlanAnualList").val()
            proyect = $("#ProyectoList").val()
        }
    }
    $.ajax({
        url: `${base_url}api/RevisionEstimacion/GetMontoEjecutadoDetalle/${plan}/${proyect}/${fechaDesde}/${fechaHasta}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let total = val.reduce((acc, item) => {
                return acc += item.TotalAcumulado
            }, 0)
            //let table = $("#estimacion_detail-table tbody")
           $("#estimacion_detail-table tbody").find("tr").remove()
            let cols = val.map((item) => `<tr><td class="spacer"></td>
                    <td>${item.Renglon}</td>
                    <td>${item.Descripcion}</td>
                    <td>${item.Unidad}</td>
                    <td class="text-right">${item.Cantidad || 0}</td>
                    <td class="text-right">${currency(item.PrecioUnitario, 'Q.')}</td>
                    <td class="text-right">${currency(item.TotalAcumulado,'Q.')}</td>
                    <td class="spacer"></td></tr>`)
            $("#estimacion_detail-table tbody").html(cols.join(""))
            $("#total-estimaciones-detail").val(total)
        }
    })
}
function currency(numero, prefix = '', sufix = '') {
    numero = (numero == null) ? 0 : numero;
    return `${prefix}${numero.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}${sufix}`;
}
function convertStringDate(fecha, separador) {
    let arrayFecha = fecha.split(separador);
    let fechareturn= new Date(arrayFecha[2], arrayFecha[1]-1, arrayFecha[0]);
    return fechareturn
}
function fnObtenerRoles() {
    $.ajax({
        type: "POST",
        url: "Default.aspx/fObtenerRoles",
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
                vVerificarAdministrador = vRolesUsuario.includes('ADMINISTRADORES');
                
                if (vRolesUsuario.includes('ADMINISTRADORES')) {
                    $("#checkCantidadesTramo").prop('disabled', false);
                }

            }
        },
        failure: function (response) {
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}
function formatDateNew(fecha) {
    if (!fecha)
        return '';
    var today = new Date(fecha);
    var dd = PadLeft(today.getDate());
    var mm = PadLeft(today.getMonth() + 1);
    var yyyy = today.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
}
function fnCargarPlanesAnuales() {
    $("select").select2({ theme: "bootstrap" })
    $.ajax({
        url: `${base_url}api/plananual/get`,
        success: (val) => {
           
            if (vVieneDeOtra) {
                let options = val.map((val) => new Option(val.PlanAnualNombre, val.AnioID))
                $('#PlanAnualList').append(options)
                $("#PlanAnualList option[value='" + plan + "']").attr("selected", true);
                $('#PlanAnualList').trigger("change")
            }
            else {
                let options = val.map((val) => new Option(val.PlanAnualNombre, val.AnioID))
                $('#PlanAnualList').append(options).trigger("change")

            }
        },

        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        }
    })

}
(function ($) {
    "use strict"; // Start of use strict

    moment.updateLocale(moment.locale(), { invalidDate: "Sin Fecha" })

 
 
    $("#PlanAnualList").on("change.select2", ({ currentTarget }) => {
        plan = currentTarget.value
        $('#ProgramaList').find("option").remove()
        $.ajax({
            url: `${base_url}api/Programa/Get/${plan}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                   if (vVieneDeOtra) {
                    $('#ProgramaList').append(val.map((val) => new Option(val.ProgramaNombre, val.ProgramaCodigo)))
                    $("#ProgramaList option[value='" + proyect.split('-')[0] + "']").attr("selected", true);
                    $('#ProgramaList').trigger("change")
                }
                else {
                    $('#ProgramaList').append(val.map((val) => new Option(val.ProgramaNombre, val.ProgramaCodigo))).trigger("change")

                }
            }
        })
        


    })





    $("#ProgramaList").on("change.select2", ({ currentTarget }) => {
        let program = currentTarget.value
        plan = $("#PlanAnualList").val()
        $('#ProyectoList').find("option").remove()

       
        $.ajax({
            url: `${base_url}api/Proyecto/GetListadoXPrograma/${plan}/${program}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
               
                if (vVieneDeOtra) {
                    $('#ProyectoList').append(val.map((val) => new Option(val.ProyectoDescripcion, val.ProyectoCodigo)))
                    $("#ProyectoList option[value='" + proyect+ "']").attr("selected", true);
                    $('#ProyectoList').trigger("change")

                }
                else {
                    $('#ProyectoList').append(val.map((val) => new Option(val.ProyectoDescripcion, val.ProyectoCodigo))).trigger("change")
                }
            }
        })

        

    })

    let User = usuario;

    $.ajax({
        url: `${base_url}api/Dashboard/ProyectosPorSupervisor/${User.substring(0, 4)}/${User.substring(4, 20)}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#ProyectoListSup').append(val.map((item) => new Option(item.ProyectoDescripcion, item.AnioCodigoProyecto.trim()))).trigger("change")
            if (vVieneDeOtra) {
                $('#ProyectoListSup').val(vParametros);
;
                $('#ProyectoListSup').trigger("change")

            }
        }
    })

    $("#ProyectoList").on("change.select2", ({ currentTarget }) => {
        let description = currentTarget.selectedOptions[0].textContent
        $("#TituloProyecto").html(description)
        plan = $("#PlanAnualList").val()
        proyect = currentTarget.value
        let fechaHoy = new Date();
        let pFecha = moment(fechaHoy, 'DD/MM/YYYY').format('YYYY-MM-DD')

        $.ajax({
            url: `${base_url}api/Dashboard/GetSupProgDia/${plan}/${proyect}/${pFecha}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
               var datos = val[0];

                if (datos.estadoSupervision == "NP") {
                    $("#ProyEnActividades").html("El proyecto esta en actividades")
                }
                if (datos.estadoSupervision == "D") {
                    $("#ProyEnActividades").html("El proyecto esta en desacanso")
                }
                if (datos.estadoSupervision == "A") {
                    $("#ProyEnActividades").html("El proyecto esta en actividades")
                }
                if (datos.estadoSupervision == "S") {
                    $("#ProyEnActividades").html("El proyecto esta en suspendido")
                }
                return true
            }
        })

        $.ajax({
            url: `${base_url}api/Dashboard/ObtenerValidacionOTS/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                var datos = val[0];

                if (datos.cantidad >0) {
                    $("#ProyTieneAutorizacion").html("El proyecto tiene autorizado una ampliación de tiempo contractual. ")
                }
                if (datos.dias < 0) {
                    $("#ProyTieneAutorizacion").html("Tiempo contractual vencido. ")
                }
                if ((datos.dias <= 30) && (datos.dias > 0) ) {
                    $("#ProyTieneAutorizacion").html("El proyecto esta por finalizar.")
                }
               
                return true
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/ObtenerEstadoCT/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                let vRespuesta = val[0];
                if (vRespuesta.CTIngresado) {
                    $('#checkCantidadesTramo').prop('checked', true);
                }
                else {
                    $('#checkCantidadesTramo').prop('checked', false);
                }
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/AvanceFisicoFinanciero/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                let vAvanceFisico = parseFloat((val[0].AvanceFisico * 100)).toFixed(2)
                let vAvanceFinanciero = parseFloat((val[0].AvanceFinanciero * 100)).toFixed(2)
                $('#fisicoChartText').html(vAvanceFisico)
                $('#financieroChartText').html(vAvanceFinanciero)
                setChart( val[0].AvanceFisico, val[0].AvanceFinanciero )
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/FechaUltimoIngreso/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                $('#UltimoPeriodoEjecutado').html(moment(val[0].FechaIngresoEjecucion).format( 'DD/MM/YYYY' ))
                $('#UltimoIngreso').html(moment(val[0].FechaRealizado).format( 'DD/MM/YYYY' ))
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/DocumentosCambioGerencial/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                let total = val.reduce((acc, item) => {
                    return acc + item.MontoDocCambio
                }, 0)
                let cols = val.map((item) => `<tr>
                <td class="spacer"></td>
                <td>${item.DocCambioCorrel}</td>
                <td>${item.TipoDocumento}</td>
                <td>${item.DocCamioJustifica}</td>
                <td>${item.DiasDocCambio}</td>
                <td class="frcurrencyneg-mask">${item.MontoDocCambio}</td>
                <td>${item.Estado}</td>
                <td>${moment(item.FechaEstado).format( 'DD/MM/YYYY' )}</td>
                <td class="spacer"></td></tr>`)
                $("#DocCambioTable tbody").html(cols.join(""))
                $("#documentos-total").val(total)
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/GetTramosXProyecto/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                let cols = val.map((item) => `<tr>
                <td>${item.TramoCodigo}</td>
                <td>${item.TramoDesc}</td>
                <td>${item.SNIP}</td>`)
                $("#TramosTable tbody").html(cols.join(""))
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/ObtenerGraficoTiempo/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (graftiempo) => {
                graftiempo = graftiempo[0]

                const data = {

                    labels: ["ejecutado " + (graftiempo.AvanceTiempo * 100).toFixed(2).toString() + "%", "no ejecutado:" + (graftiempo.PendienteTiempo * 100).toFixed(2).toString() + "%"],
                    datasets: [
                        {
                            label: 'Dataset 1',
                            data: [graftiempo?.AvanceTiempo || 0, graftiempo?.PendienteTiempo || 0], // data: [1, 2, 2, 2, 2, 2, 1, 2],
                            backgroundColor: ['#27AE60', '#FF0000'],
                        }
                    ]
                };

                const config = {
                    type: 'pie',
                    data: data,
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                labels: {
                                    usePointStyle: true,
                                },
                                position: 'right',
                            },
                        }
                    },
                };

                const ctx = $('#chart-tiempo');

                if (tiempochart) {
                    tiempochart.destroy();
                }
                tiempochart = new Chart(ctx,
                    config
                );

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus); alert("Error: " + errorThrown);
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/GetGraficoLineal/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {

                var fisicoLabels = [];
                var originalData = [];
                var vigenteData = [];
                var ejecutadoData = [];
                var vProgramado = '';
                var vEjecutadoReal = '';
                var vFechaMaxEjecutado = '';
                val.forEach((el) => {
                    if (el.Periodo > 0) {
                        vEjecutadoReal = (el.Ejecutado).toFixed(2).toString() + "%";
                        vProgramado = (el.Vigente).toFixed(2).toString() + "%";
                        vFechaMaxEjecutado = moment(el.FechaMaxEjecutado).format('DD/MM/YYYY')
                    }
                    fisicoLabels.push(moment(el.FechaMaxEjecutado).format('DD/MM/YYYY'));
                    originalData.push(parseFloat(el.Original));
                    vigenteData.push(parseFloat(el.Vigente));
                    ejecutadoData.push(parseFloat(el.Ejecutado));
                });
                $("#thAvanceProgramado").html(vProgramado)
                $("#thAvanceReal").html(vEjecutadoReal)
                $("#thUltimoRegistro").html(vFechaMaxEjecutado)

                let finChart = $("#chart-financiero")
                if (finChart.data("chart")) finChart.data("chart").destroy()
                let chart = new Chart(finChart, {
                    type: 'line',
                    data: {
                        labels: fisicoLabels,
                        datasets: [{
                            label: "Original",
                            borderColor: "#ff1a1a",
                            fill: false,
                            data: originalData
                        },
                        {
                            label: "Vigente",
                            borderColor: "#1a1aff",
                            fill: false,
                            data: vigenteData
                        },
                        {
                            label: "Ejecutado",
                            borderColor: "#00b300",
                            fill: false,
                            data: ejecutadoData
                        }]
                    },
                    options: {
                        legend: {
                            position: "right",
                            align: "middle"
                        }
                    }
                }); 
                finChart.data("chart", chart)
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/GetEstimacionesGerencial/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
           
                
                let total = val.reduce((acc, item) => {
                    return acc += item.MontoaRecibir
                }, 0)
                let cols = val.map((item) => `<tr><td class="spacer"></td>
                <td>
                    <button type="button" data-id="${item.EstimacionCorr}" class="btn btn-light action-icon hover-blue estimacion_detail-btn" data-toggle="modal" data-target="#estimacionModal" onclick="fnVerDetalle('${item.Periodo}')">
                        <i class="fas fa-eye fa-lg fa-fw"></i>
                    </a>
                </td>
                <td>${item.EstimacionCorr}</td>
                <td>${item.Periodo}</td>
                <td class="frcurrency-mask">${item.MontoRetencion}</td>
                <td class="frcurrency-mask">${item.MontoEjecutado}</td>
                <td class="frcurrency-mask">${item.MontoaRecibir}</td>
                <td class="frcurrency-mask">${item.MontoEmbargado}</td>
                <td>${item.CertificadoSup}</td>
                <td>${item.EstadoDesc}</td>
                <td>${moment(item.DateModify).format('DD/MM/YYYY')}</td>
                ${vVerificarAdministrador ? ((item.EstadoID == 14) ? `<td><a href="/Ejecucion/frmCur.aspx?EstimacionCorr=${item.EstimacionCorr}&AnioID=${plan}&ProyectoCodigo=${proyect}" target="_blank">IVA-ISR</a></td>` : `<td></td>`): `<td></td>`}
                <td class="spacer"></td></tr>`)
                $("#EstimacionesTable tbody").html(cols.join(""))
                $("#total-estimaciones").val(total)

               
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/ComponentesRenglonGerencial/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                let total = val.reduce((corr, item) => {
                    return corr + item.Costo
                }, 0)
                let cols = val.map((item) => `<tr><td class="spacer"></td>
                <td>${item.ComponenteDesc}</td>
                <td>${item.RenglonCodCOVIAL}</td>
                <td>${item.ProyectoRenglonNombre}</td>
                <td>${item.Unidad}</td>
                <td>${item.Cantidad || 0}</td>
                <td>${currency(item.RenglonPrecioUnitario,'Q.')}</td>
                <td>${currency(item.Costo,'Q.')}</td>
                <td class="spacer"></td></tr>`)
                $("#RenglonesTable tbody").html(cols.join(""))
                $("#renglon-total").val(total)
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/SupervisorProyecto/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                if (val.length > 0) {
                    $("#divSupervision").show();
                    $("#divSinSupervision").hide();
                    $('#SupAnio').html(val[0].AnioId)
                    $('#SupCodigo').html(val[0].ProyectoCodigo)
                    $('#SupNombre').html(val[0].Nombre)
                    $('#SupNit').html(val[0].EmpresaNIT)
                    $('#SupRepresentante').html(val[0].Representante)
                    $('#SupTelefonos').html(val[0].TelefonosPrincipales)
                    $('#SupEmail').html(val[0].CorreoE)
                }
                else {
                    if (proyect.split('-')[0].toString().toUpperCase() == 'S') {
                        $('#SupAnio').html("")
                        $('#SupCodigo').html("")
                        $('#SupNombre').html("")
                        $('#SupNit').html("")
                        $('#SupRepresentante').html("")
                        $('#SupTelefonos').html("")
                        $('#SupEmail').html("")
                        $("#divSupervision").hide();
                        $("#divSinSupervision").show();
                        $.ajax({
                            url: `${base_url}api/Dashboard/ProyectosSupervisados/${plan}/${proyect}`,
                            headers: {
                                "Authorization": "Bearer " + token,
                                "Content-Type": "application/json",
                            },
                            success: (val) => {
                                $("#ulProyectosSupervisados").find("li").remove()
                                let cols = val.map((item) => `<li><a href="Default.aspx?AnioProyecto="${item.AnioID +","+item.ProyectoCodigo}><h5><span class="badge badge-primary">${item.proyectocodigofinanciero}</span></h5></a></li>`)
                                $("#ulProyectosSupervisados").html(cols.join(""))
                                        }
                        })
                    } else {
                        $('#SupAnio').html("")
                        $('#SupCodigo').html("")
                        $('#SupNombre').html("")
                        $('#SupNit').html("")
                        $('#SupRepresentante').html("")
                        $('#SupTelefonos').html("")
                        $('#SupEmail').html("")
                    }
                   
                }
            },
            error: (val) => {

            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/GetProyGerencialAmpliado/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                $('#GeneralCodigo').html(val[0].ProyectoCodigo)
                $('#GeneralDescripcion').html(val[0].ProyectoDescripcion)
                $('#GeneralEstado').html(val[0].ProyectoEstatusDesc)
              //  $('#GeneralCDP').html(val[0].CDPctoOriginal)

                $('#GeneralNOG').html("NOG: " + val[0].ProyectoNOG)
                linkGuatecompras = "https://www.guatecompras.gob.gt/concursos/consultaDetalleCon.aspx?nog=" + val[0].ProyectoNOG+"&o=5"
                $('#LinkGuateCompras').attr('href', linkGuatecompras);
                $('#LinkGuateCompras').attr('target', "_blank");
                $('#ContratoContrato').html(val[0].ContratoCodigo)
                $('#ContratoInicio').html(moment(val[0].FechaContrato).format( 'DD/MM/YYYY' ))
                $('#ContratoPlazo').html(val[0].Plazo)
                $('#ContratoInicioFisico').html(moment(val[0].FechaInicioFisico).format( 'DD/MM/YYYY' ))
                $('#ContratoMontoOriginal').html(currency(val[0].MontoOriginal, 'Q.').toString())
                $('#ContratoMontoActual').html(currency(val[0].MontoModificado, 'Q.').toString())
                $('#ContratoFechaFinal').html(moment(val[0].ContratoFechaFinal).format( 'DD/MM/YYYY' ))
                $('#ContratoFinalActual').html(moment(val[0].FechaFinaModificado).format('DD/MM/YYYY'))
                $('#ContratoCertificacion').html((val[0].AnioID >= 2016 ? " " : val[0].CodigoCert))
                $('#ContratoFechaCert').html((val[0].AnioID >= 2016 ? " " : moment(val[0].FechaContrato).format('DD/MM/YYYY'))) 
                $('#ContratistaNombre').html(val[0].Nombre)
                $('#ContratistaNit').html(val[0].EmpresaNIT)
                $('#ContratistaRepresentante').html(val[0].Representante)
                $('#ContratistaTelefonos').html(val[0].TelefonosPrincipales)
                $('#ContratistaEmail').html(val[0].CorreoE)
                $('#AcuerdoMinisterial').html(`${val[0].AcuerdoMinisterial2 || val[0].AcuerdoMinisterial1} de Fecha:  ${moment(val[0].FechaAcuerdoM1).format('DD/MM/YYYY') || moment(val[0].FechaAcuerdoM2).format('DD/MM/YYYY') || ""}`)
                $('#GeneralRegional').html(val[0].Regional)
                initMasks()
                console.log(val[0]);
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/ProyectosSanciones/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                let cols = val.map((item) => {
                    return `<tr><td class="spacer"></td>
                    <td class="text-center">${item.ProyectoSancionCorrel}</td>
                    <td class="text-center">${moment(item.FechaSancion).format("DD/MM/YYYY")}</td>
                    <td class="text-center">${item.SancionCodigo}</td>
                    <td class="text-center">${item.Justificacion}</td>
                    <td class="text-center frcurrency-mask">${item.SancionMonto}</td>
                    <td class="spacer"></td></tr>`
                })
                $("#SancionesTable tbody").html(cols.join(""))
                initMasks()
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/PagosXProyecto/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                let sum = 0
                let cols = val.map((item) => {
                    sum += item.MontoFac
                    return `<tr><td class="spacer"></td>
                    <td class="text-center">${item.AnioIDNomina}</td>
                    <td class="text-center">${item.PagoCorre}</td>
                    <td class="text-center">${item.EstimacionCorr}</td>
                    <td class="text-center frcurrency-mask">${item.MontoFac}</td>
                    <td class="spacer"></td></tr>`
                })
                $("#PagosTable tbody").html(cols.join(""))
                $("#total-pagos").val(sum)
                initMasks()
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/GetGraficoBarra/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                var dataFinanciero=[]
                    dataFinanciero=Object.values(val[0]);
                $("#liContratado").html('');
                $("#liEjecutdo").html('');
                $("#liPagado").html('');
                $("#liParaPago").html('');
                $("#liEnRevision").html('');
                $("#liObservado").html('');
                $("#liNoPresentado").html('');
                $("#liNoEjecutado").html('');
                let $vGrafico = $("#chart-fisico")
                if ($vGrafico.data("chart")) $vGrafico.data("chart").destroy()
                let chartFin = new Chart($vGrafico, {
                    type: 'bar',
                    data: {
                        labels: ["Contratado", "Ejecutado", "Pagado", "ParaPago", "EnRevision", "Observado", "NoPresentado", "NoEjecutado"],
                        datasets: [{
                            label: 'Ejecución Financiera',
                            backgroundColor: ["#66a3ff", "#ff80ff", "#ff8080", "#ffff80", "#80ff80", "#1affff", "#ff0000", "#ff4000"],
                            fill: true,
                            data: dataFinanciero,
                            axis: 'y',
                        }]
                    },
                    options: {
                        indexAxis: 'y',
                    }
                });
                $vGrafico.data("chart", chartFin)
                $("#liContratado").html('Contratado:' + currency(dataFinanciero[0], 'Q.').toString() + ' --- 100%');
                $("#liEjecutdo").html('Ejecutado:' + currency(dataFinanciero[1], 'Q.').toString() + ' --- ' + ((dataFinanciero[1] / dataFinanciero[0]) * 100).toFixed(2).toString() + '%');
                $("#liPagado").html('Pagado:' + currency(dataFinanciero[2], 'Q.').toString() + ' --- ' + ((dataFinanciero[2] / dataFinanciero[0]) * 100).toFixed(2).toString() + '%'); //6
                $("#liParaPago").html('Para pago:' + currency(dataFinanciero[3], 'Q.').toString() + ' --- ' + ((dataFinanciero[3] / dataFinanciero[0]) * 100).toFixed(2).toString() + '%');
                $("#liEnRevision").html('En revisión:' + currency(dataFinanciero[4], 'Q.').toString() + ' --- ' + ((dataFinanciero[4] / dataFinanciero[0]) * 100).toFixed(2).toString() + '%');
                $("#liObservado").html('Observado' + currency(dataFinanciero[5], 'Q.').toString() + ' --- ' + ((dataFinanciero[5] / dataFinanciero[0]) * 100).toFixed(2).toString() + '%');
                $("#liNoPresentado").html('No presentado:' + currency(dataFinanciero[6], 'Q.').toString() + ' --- ' + ((dataFinanciero[6] / dataFinanciero[0]) * 100).toFixed(2).toString() + '%');
                $("#liNoEjecutado").html('No ejecutado:' + currency(dataFinanciero[7], 'Q.').toString() + ' --- ' + ((dataFinanciero[7] / dataFinanciero[0]) * 100).toFixed(2).toString() + '%');
            }
        })
        $("#galery-tabs li.active").trigger("click")
    })

    var proyectoespecifico;
    var AnioEspecifico

    $("#ProyectoListSup").on("change.select2", ({ currentTarget }) => {
        let description = currentTarget.selectedOptions[0].textContent
        $("#TituloProyecto").html(description)
         plan = currentTarget.value.split(',')[0]
        proyect = currentTarget.value.split(',')[1]
        AnioEspecifico = plan;
        proyectoespecifico = proyect;
        let fechaHoy = new Date();
        let pFecha = moment(fechaHoy, 'DD/MM/YYYY').format('YYYY-MM-DD')
        $.ajax({
            url: `${base_url}api/Dashboard/SupervisorProyecto/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                if (val.length > 0) {
                    $("#divSupervision").show();
                    $("#divSinSupervision").hide();
                    $('#SupAnio').html(val[0].AnioId)
                    $('#SupCodigo').html(val[0].ProyectoCodigo)
                    $('#SupNombre').html(val[0].Nombre)
                    $('#SupNit').html(val[0].EmpresaNIT)
                    $('#SupRepresentante').html(val[0].Representante)
                    $('#SupTelefonos').html(val[0].TelefonosPrincipales)
                    $('#SupEmail').html(val[0].CorreoE)
                }
                else {
                    if (proyect.split('-')[0].toString().toUpperCase() == 'S') {
                        $('#SupAnio').html("")
                        $('#SupCodigo').html("")
                        $('#SupNombre').html("")
                        $('#SupNit').html("")
                        $('#SupRepresentante').html("")
                        $('#SupTelefonos').html("")
                        $('#SupEmail').html("")
                        $("#divSupervision").hide();
                        $("#divSinSupervision").show();
                        $.ajax({
                            url: `${base_url}api/Dashboard/ProyectosSupervisados/${plan}/${proyect}`,
                            headers: {
                                "Authorization": "Bearer " + token,
                                "Content-Type": "application/json",
                            },
                            success: (val) => {
                                $("#ulProyectosSupervisados").find("li").remove()
                                let cols = val.map((item) => `<li><a href=Default.aspx?AnioProyecto=${item.Datos}> <h5><span class="badge badge-primary">${item.proyectocodigofinanciero}</span></h5></a></li>`)
                                $("#ulProyectosSupervisados").html(cols.join(""))
                            }
                        })
                    } else {
                        $('#SupAnio').html("")
                        $('#SupCodigo').html("")
                        $('#SupNombre').html("")
                        $('#SupNit').html("")
                        $('#SupRepresentante').html("")
                        $('#SupTelefonos').html("")
                        $('#SupEmail').html("")
                    }

                }
            },
            error: (val) => {

            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/GetSupProgDia/${AnioEspecifico}/${proyectoespecifico}/${pFecha}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
               var datos = val[0];

                if (datos.estadoSupervision == "NP") {
                    $("#ProyEnActividades").html("El proyecto esta en actividades")
                }
                if (datos.estadoSupervision == "D") {
                    $("#ProyEnActividades").html("El proyecto esta en desacanso")
                }
                if (datos.estadoSupervision == "A") {
                    $("#ProyEnActividades").html("El proyecto esta en actividades")
                }
                if (datos.estadoSupervision == "S") {
                    $("#ProyEnActividades").html("El proyecto esta en suspendido")
                }
                return true
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/ObtenerEstadoCT/${AnioEspecifico}/${proyectoespecifico}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                let vRespuesta = val[0];
                if (vRespuesta.CTIngresado) {
                    $('#checkCantidadesTramo').prop('checked', true);
                }
                else {
                    $('#checkCantidadesTramo').prop('checked', false);
                }
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/AvanceFisicoFinanciero/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                let vAvanceFisico = (val[0].AvanceFisico * 100).toFixed(2)
                let vAvanceFinanciero = (val[0].AvanceFinanciero * 100).toFixed(2)
                $('#fisicoChartText').html(vAvanceFisico)
                $('#financieroChartText').html(vAvanceFinanciero)
              
                setChart(val[0].AvanceFisico, val[0].AvanceFinanciero)
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/FechaUltimoIngreso/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                $('#UltimoPeriodoEjecutado').html(moment(val[0].FechaIngresoEjecucion).format('DD/MM/YYYY'))
                $('#UltimoIngreso').html(moment(val[0].FechaRealizado).format('DD/MM/YYYY'))
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/DocumentosCambioGerencial/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                let total = val.reduce((acc, item) => {
                    return acc + item.MontoDocCambio
                }, 0)
                let cols = val.map((item) => `<tr>
                <td class="spacer"></td>
                <td>${item.DocCambioCorrel}</td>
                <td>${item.TipoDocumento}</td>
                <td>${item.DocCamioJustifica}</td>
                <td>${item.DiasDocCambio}</td>
                <td class="frcurrencyneg-mask">${item.MontoDocCambio}</td>
                <td>${item.Estado}</td>
                <td>${moment(item.FechaEstado).format('DD/MM/YYYY')}</td>
                <td class="spacer"></td></tr>`)
                $("#DocCambioTable tbody").html(cols.join(""))
                $("#documentos-total").val(total)
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/GetTramosXProyecto/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                let cols = val.map((item) => `<tr>
                <td>${item.TramoCodigo}</td>
                <td>${item.TramoDesc}</td>
                <td>${item.SNIP}</td>`)
                $("#TramosTable tbody").html(cols.join(""))
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/ObtenerGraficoTiempo/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (graftiempo) => {
                graftiempo = graftiempo[0]

                const data = {

                    labels: ["ejecutado " + (graftiempo.AvanceTiempo * 100).toFixed(2).toString() + "%", "no ejecutado:" + (graftiempo.PendienteTiempo * 100).toFixed(2).toString() + "%"],
                    datasets: [
                        {
                            label: 'Dataset 1',
                            data: [graftiempo?.AvanceTiempo || 0, graftiempo?.PendienteTiempo || 0], // data: [1, 2, 2, 2, 2, 2, 1, 2],
                            backgroundColor: ['#27AE60', '#FF0000'],
                        }
                    ]
                };

                const config = {
                    type: 'pie',
                    data: data,
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                labels: {
                                    usePointStyle: true,
                                },
                                position: 'right',
                            },
                        }
                    },
                };

                const ctx = $('#chart-tiempo');

                if (tiempochart) {
                    tiempochart.destroy();
                }
                tiempochart = new Chart(ctx,
                    config
                );

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus); alert("Error: " + errorThrown);
            }
        })

        //$.ajax({
            
        //    url: `${base_url}api/Dashboard/ObtenerGraficoTiempo/${plan}/${proyect}`,
        //    headers: {
        //        "Authorization": "Bearer " + token,
        //        "Content-Type": "application/json",
        //    },
        //    success: (grafTiempo) => {
        //        let vGraficoTiempo = $('#chart-tiempo');
        //        let GraficoTiempo;
        //        if (GraficoTiempo) {
        //            GraficoTiempo.destroy();
        //        }
        //        GraficoTiempo = new Chart(vGraficoTiempo, {
        //            type: 'pie',
        //            data: {
        //                labels: ["Ejecutado", "No ejecutado"],
        //                datasets: [{
        //                    fill: true,
        //                    backgroundColor: ['#27AE60', '#FFFFFF'],
        //                    data: [grafTiempo?.AvanceTiempo || 0, grafTiempo?.PendienteTiempo || 0]
        //                }]
        //            },
        //            options: options
        //        });
        //    }
        //})
        $.ajax({
            url: `${base_url}api/Dashboard/GetGraficoLineal/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {

                var fisicoLabels = [];
                var originalData = [];
                var vigenteData = [];
                var ejecutadoData = [];
                var vEjecutadoReal = '';
                var vProgramado = '';
                var vFechaMaxEjecutado = '';
                val.forEach((el) => {
                    if (el.Periodo > 0) {
                         vEjecutadoReal = (el.Ejecutado).toFixed(2).toString() + "%";
                         vProgramado = (el.Vigente).toFixed(2).toString() + "%";
                        vFechaMaxEjecutado = moment(el.FechaMaxEjecutado).format('DD/MM/YYYY')
                    }
                    fisicoLabels.push(moment(el.FechaMaxEjecutado).format('DD/MM/YYYY'));
                    originalData.push(parseFloat(el.Original));
                    vigenteData.push(parseFloat(el.Vigente));
                    ejecutadoData.push(parseFloat(el.Ejecutado));
                });
                $("#thAvanceProgramado").html(vProgramado)
                $("#thAvanceReal").html(vEjecutadoReal)
                $("#thUltimoRegistro").html(vFechaMaxEjecutado)
                new Chart('chart-financiero', {
                    type: 'line',
                    data: {
                        labels: fisicoLabels,
                        datasets: [{
                            label: "Original",
                            borderColor: "#ff1a1a",
                            fill: false,
                            data: originalData
                        },
                        {
                            label: "Vigente",
                            borderColor: "#1a1aff",
                            fill: false,
                            data: vigenteData
                        },
                        {
                            label: "Ejecutado",
                            borderColor: "#00b300",
                            fill: false,
                            data: ejecutadoData
                        }]
                    },
                    options: {
                        legend: {
                            position: "right",
                            align: "middle"
                        }
                    }
                });
            }
        })
        $.ajax({
           
            url: `${base_url}api/Dashboard/GetEstimacionesGerencial/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
               
              

                let total = val.reduce((acc, item) => {
                    return acc += item.MontoaRecibir
                }, 0)
                let cols = val.map((item) => `<tr><td class="spacer"></td>
                <td>
                    <button type="button" data-id="${item.EstimacionCorr}" class="btn btn-light action-icon hover-blue estimacion_detail-btn" data-toggle="modal" data-target="#estimacionModal" onclick="fnVerDetalle('${item.Periodo}')" >
                        <i class="fas fa-eye fa-lg fa-fw"></i>
                    </a>
                </td>
                <td>${item.EstimacionCorr}</td>
                <td>${item.Periodo}</td>
                <td class="frcurrency-mask">${item.MontoRetencion}</td>
                <td class="frcurrency-mask">${item.MontoEjecutado}</td>
                <td class="frcurrency-mask">${item.MontoaRecibir}</td>
                <td class="frcurrency-mask">${item.MontoEmbargado}</td>
                <td>${item.CertificadoSup}</td>
                <td>${item.EstadoDesc}</td>
                <td>${moment(item.DateModify).format('DD/MM/YYYY')}</td>
                ${(item.EstadoID == 14) ? `<td><a href="/Ejecucion/frmCur.aspx?EstimacionCorr=${item.EstimacionCorr}&AnioID=${plan}&ProyectoCodigo=${proyect}" target="_blank">IVA-ISR</a></td>` : `<td></td>`}
                <td class="spacer"></td></tr>`)
                $("#EstimacionesTable tbody").html(cols.join(""))
                $("#total-estimaciones").val(total)

                //$(".estimacion_detail-btn").on("click", ({ currentTarget }) => {
                   
                //})
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/ComponentesRenglonGerencial/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                let total = val.reduce((corr, item) => {
                    return corr + item.Costo
                }, 0)
                let cols = val.map((item) => `<tr><td class="spacer"></td>
                <td>${item.ComponenteDesc}</td>
                <td>${item.RenglonCodCOVIAL}</td>
                <td>${item.ProyectoRenglonNombre}</td>
                <td>${item.Unidad}</td>
                <td>${item.Cantidad || 0}</td>
                <td>${currency(item.RenglonPrecioUnitario,'Q.')}</td>
                <td>${currency(item.Costo,'Q.')}</td>
                <td class="spacer"></td></tr>`)
                $("#RenglonesTable tbody").html(cols.join(""))
                $("#renglon-total").val(total)
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/SupervisorProyecto/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                if (val.length > 0) {
                    $('#SupAnio').html(val[0].AnioId)
                    $('#SupCodigo').html(val[0].ProyectoCodigo)
                    $('#SupNombre').html(val[0].Nombre)
                    $('#SupNit').html(val[0].EmpresaNIT)
                    $('#SupRepresentante').html(val[0].Representante)
                    $('#SupTelefonos').html(val[0].TelefonosPrincipales)
                    $('#SupEmail').html(val[0].CorreoE)
                }
                else {
                    $('#SupAnio').html("")
                    $('#SupCodigo').html("")
                    $('#SupNombre').html("")
                    $('#SupNit').html("")
                    $('#SupRepresentante').html("")
                    $('#SupTelefonos').html("")
                    $('#SupEmail').html("")
                }
              
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/GetProyGerencialAmpliado/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                $('#GeneralCodigo').html(val[0].ProyectoCodigo)
                $('#GeneralDescripcion').html(val[0].ProyectoDescripcion)
                $('#GeneralEstado').html(val[0].ProyectoEstatusDesc)
               // $('#GeneralCDP').html(val[0].CDPctoOriginal)
                $('#GeneralNOG').html("NOG: " + val[0].ProyectoNOG)
                linkGuatecompras = "https://www.guatecompras.gob.gt/concursos/consultaDetalleCon.aspx?nog=" + val[0].ProyectoNOG + "&o=5"
                $('#LinkGuateCompras').attr('href', linkGuatecompras);
                $('#LinkGuateCompras').attr('target', "_blank");
                $('#ContratoContrato').html(val[0].ContratoCodigo)
                $('#ContratoInicio').html(moment(val[0].FechaContrato).format('DD/MM/YYYY'))
                $('#ContratoPlazo').html(val[0].Plazo)
                $('#ContratoInicioFisico').html(moment(val[0].FechaInicioFisico).format('DD/MM/YYYY'))
                $('#ContratoMontoOriginal').html(currency(val[0].MontoOriginal, 'Q.').toString())
                $('#ContratoMontoActual').html(currency(val[0].MontoModificado, 'Q.').toString())
                $('#ContratoFechaFinal').html(moment(val[0].ContratoFechaFinal).format('DD/MM/YYYY'))
                $('#ContratoFinalActual').html(moment(val[0].FechaFinaModificado).format('DD/MM/YYYY'))
                $('#ContratoCertificacion').html(val[0].AnioID >= 2016 ? " " : val[0].CodigoCert)
                $('#ContratoFechaCert').html((val[0].AnioID >= 2016 ? " " : moment(val[0].FechaContrato).format('DD/MM/YYYY'))) 
                $('#ContratistaNombre').html(val[0].Nombre)
                $('#ContratistaNit').html(val[0].EmpresaNIT)
                $('#ContratistaRepresentante').html(val[0].Representante)
                $('#ContratistaTelefonos').html(val[0].TelefonosPrincipales)
                $('#ContratistaEmail').html(val[0].CorreoE)
                $('#AcuerdoMinisterial').html(`${val[0].AcuerdoMinisterial2 || val[0].AcuerdoMinisterial1} de Fecha: ${moment(val[0].FechaAcuerdoM1).format('DD/MM/YYYY') || moment(val[0].FechaAcuerdoM2).format('DD/MM/YYYY') || ""}`)
                initMasks()
                console.log(val[0])
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/ProyectosSanciones/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                let cols = val.map((item) => {
                    return `<tr><td class="spacer"></td>
                    <td class="text-center">${item.ProyectoSancionCorrel}</td>
                    <td class="text-center">${moment(item.FechaSancion).format("DD/MM/YYYY")}</td>
                    <td class="text-center">${item.SancionCodigo}</td>
                    <td class="text-center">${item.Justificacion}</td>
                    <td class="text-center frcurrency-mask">${item.SancionMonto}</td>
                    <td class="spacer"></td></tr>`
                })
                $("#SancionesTable tbody").html(cols.join(""))
                initMasks()
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/PagosXProyecto/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                let sum = 0
                let cols = val.map((item) => {
                    sum += item.MontoFac
                    return `<tr><td class="spacer"></td>
                    <td class="text-center">${item.AnioIDNomina}</td>
                    <td class="text-center">${item.PagoCorre}</td>
                    <td class="text-center">${item.EstimacionCorr}</td>
                    <td class="text-center frcurrency-mask">${item.MontoFac}</td>
                    <td class="spacer"></td></tr>`
                })
                $("#PagosTable tbody").html(cols.join(""))
                $("#total-pagos").val(sum)
                initMasks()
            }
        })
        $.ajax({
            url: `${base_url}api/Dashboard/GetGraficoBarra/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                var dataFinanciero=[]
                var dataFinanciero = Object.values(val[0]);
                $("#liContratado").html('');
                $("#liEjecutdo").html('');
                $("#liPagado").html('');
                $("#liParaPago").html('');
                $("#liEnRevision").html('');
                $("#liObservado").html('');
                $("#liNoPresentado").html('');
                $("#liNoEjecutado").html('');
             
                let $vGrafico = $("#chart-fisico")
                if ($vGrafico.data("chart")) $vGrafico.data("chart").destroy()
                let chartFin = new Chart($vGrafico, {
                    type: 'bar',
                    data: {
                        labels: ["Contratado" , "Ejecutado" , "Pagado" , "ParaPago"  , "EnRevision" , "Observado" , "NoPresentado" , "NoEjecutado" ],
                        datasets: [{
                            label:'Ejecución Financiera',
                            backgroundColor: ["#66a3ff", "#ff80ff", "#ff8080", "#ffff80", "#80ff80", "#1affff", "#ff0000", "#ff4000"],
                            fill: true,
                            data: dataFinanciero,
                            axis: 'y',
                        }]
                    },
                    options: {
                        
                        indexAxis: 'y',
                    }
                });
                $vGrafico.data("chart", chartFin)
                $("#liContratado").html('Contratado:'+ currency(dataFinanciero[0], 'Q.').toString() + ' --- 100%');
                $("#liEjecutdo").html('Ejecutado:' + currency(dataFinanciero[1], 'Q.').toString() + ' --- ' + ((dataFinanciero[1] / dataFinanciero[0])*100).toFixed(2).toString() + '%');
                $("#liPagado").html('Pagado:' + currency(dataFinanciero[6], 'Q.').toString() + ' --- ' + ((dataFinanciero[6] / dataFinanciero[0]) * 100).toFixed(2).toString() + '%');
                $("#liParaPago").html('Para pago:' + currency(dataFinanciero[7], 'Q.').toString() + ' --- ' + ((dataFinanciero[7] / dataFinanciero[0]) * 100).toFixed(2).toString() + '%');
                $("#liEnRevision").html('En revisión:' + currency(dataFinanciero[2], 'Q.').toString() + ' --- ' + ((dataFinanciero[2] / dataFinanciero[0]) * 100).toFixed(2).toString() + '%');
                $("#liObservado").html('Observado' + currency(dataFinanciero[5], 'Q.').toString() + ' --- ' + ((dataFinanciero[5] / dataFinanciero[0]) * 100).toFixed(2).toString() + '%');
                $("#liNoPresentado").html('No presentado:' + currency(dataFinanciero[4], 'Q.').toString() + ' --- ' + ((dataFinanciero[4] / dataFinanciero[0]) * 100).toFixed(2).toString() + '%');
                $("#liNoEjecutado").html('No ejecutado:' + currency(dataFinanciero[3], 'Q.').toString() + ' --- ' + ((dataFinanciero[3] / dataFinanciero[0]) * 100).toFixed(2).toString() + '%');
            }
        })
        $("#galery-tabs li.active").trigger("click")
    })

    var options = {
        legend: {
            display: false
        }
    };

    function setChart(fisicoPercent, financieroPercent) {
        let $financiero = $("#chart-1")
        if ($financiero.data("chart")) $financiero.data("chart").destroy()
        let chartFin = new Chart($financiero, {
            type: 'pie',
            data: {
                labels: ["Ejecutado", "No ejecutado"],
                datasets: [{
                    fill: true,
                    backgroundColor: ['#285DCE', '#FFFFFF'],
                    data: [financieroPercent, 1 - financieroPercent]
                }]
            },
            options: options
        });
        $financiero.data("chart", chartFin)

        let $fisico = $("#chart-0")
        if ($fisico.data("chart")) $fisico.data("chart").destroy()
        let chartFisico = new Chart($fisico, {
            type: 'pie',
            data: {
                labels: ["Ejecutado", "No ejecutado"],
                datasets: [{
                    fill: true,
                    backgroundColor: ['#27AE60', '#FFFFFF'],
                    data: [fisicoPercent, 1 - fisicoPercent]
                }]
            },
            options: options
        });
        $fisico.data("chart", chartFisico)
    }

    setChart(0, 0)
    $("#DesdeEjecucion").datetimepicker({ format: 'DD/MM/YYYY' });
    $("#HastaEjecucion").datetimepicker({
        useCurrent: false,
        format: 'DD/MM/YYYY'
    });

    $("#DesdeEjecucion").on("change.datetimepicker", function (e) {
        $('#HastaEjecucion').datetimepicker('minDate', e.date);
    });
    $("#HastaEjecucion").on("change.datetimepicker", function (e) {
        $('#DesdeEjecucion').datetimepicker('maxDate', e.date);
    });
    //$(".ejecucion-date").on('change.datetimepicker', (ev) => {

    //})


   








    $("#galery-tabs li").on("click", ({ currentTarget }) => {
        $("#galery-tabs li").removeClass("active")
        $(currentTarget).addClass("active")
        $("#periodoGaleria").find("option").remove()
        let url = currentTarget.dataset.url
        let type = currentTarget.dataset.type || 1
        let plan = $("#PlanAnualList").val()
        let proyect = $("#ProyectoList").val()
        if (plan == null) {
            // your code here.
            plan = AnioEspecifico;
            proyect = proyectoespecifico;
        }
        

        let select = $("#periodoGaleria")
        select.html("")
        if (url) {

            $.ajax({
                url: `${base_url}${url}${plan}/${proyect}`,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: (val) => {
                    let cols = val.map((item) => `<option value="${item.periodoCorrel}">${item.Periodo}</option>`)
                    select.html(cols.join(""))
                    select.data("url", `${currentTarget.dataset.url_galery}periodoID/${plan}/${proyect}`)
                    select.data("type", type)
                    select.trigger("change")
                }
            })
        } else {
            $("#GaleryView").html("")
            $.ajax({
                url: `${base_url}${currentTarget.dataset.url_galery}${plan}/${proyect}`,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: (val) => {
                    set_galery_image(val);
                }
            })
        }
    })

    //cargar galeria tramos
    $("#tramoGaleria").on("change.select2", ({ currentTarget }) => {


        $("#GaleryView").html("")

        if (currentTarget.value == 0) {

            $("#GaleryView").html("")


         
            $.ajax({
                url: `${base_url}${$(vCT).data("url").replace(vPeriodoIDTag, vCurrentTagVal)}`,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: (val) => {

                    set_galery_image(val, vTypeTag);

                }
            })

        }

        let tramoID = currentTarget.value;
        let codProyecto = $('#ProyectoList').val();
        let PlanA = $('#PlanAnualList').val();
        let type = 1;
      
        $.ajax({
            url: `${base_url}api/Dashboard/FotografiasXtramo/${PlanA}/${codProyecto}/${tramoID}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                
                set_galery_image(val, type);

            },
            error: (xhr, status, error) => {
                console.log(xhr)
                console.log(status)
                console.log(error)
            }
        })

    })

    $("#periodoGaleria").on("change", ({ currentTarget }) => {
        $("#GaleryView").html("")
         
     
        const type = $(currentTarget).data("type")

        vTypeTag = type;
        vPeriodoIDTag = 'periodoID';
        vCurrentTagVal = currentTarget.value;
        vCT = currentTarget;
     
        
        
        $.ajax({
            url: `${base_url}${$(currentTarget).data("url").replace("periodoID", currentTarget.value)}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                
                set_galery_image(val, type);
                
            }
        })
    })

    function fnRecargarGaleria() {

        $.ajax({
            url: `${base_url}api/Dashboard/FotografiasXperiodo/${miCurrentActual}/${plan}/${proyect}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {

                set_galery_image(val, type);

            }
        })
    }



    function set_galery_image(val, type = 1) {
        val.forEach((item) => {
        // <img width="140" height="140" src="https://elephant-project.com/SICOP/GetThumbnail.aspx?Tipo=3&MaxPixels=0&Fotografia=${item.FotoNombre}&EMID=ID_1" alt="imagen galeria" />
            //<img width="140" height="140" src="${thumbnail}Tipo=${type}&MaxPixels=200&Fotografia=${item.FotoNombre}&EMID=ID_1" alt="imagen galeria" />
            let image = $(`
                            <div class="img-wrapper d-inline-block galery-img">
                                <a type="button" class="img-link" data-toggle="modal" data-id="${item.FotoNombre}"
                                    data-target="#fotografiaModal">
                                    <img width="140" height="140" src="${thumbnail}Tipo=${type}&MaxPixels=200&Fotografia=${item.FotoNombre}&EMID=ID_1" alt="imagen galeria" />
                                    <ul class="list-unstyled img-text">
                                        <li>Estación: ${item.Estacion}</li>
                                    </ul>
                                </a>
                            </div>`);
            image.data("obj", item);
            $("#GaleryView").append(image);
        });
        $(".galery-img").on("click", ({ currentTarget }) => {
            let vals = $(currentTarget).data("obj")
            $("#galery-periodo").html($("#periodoGaleria option:selected").html())
            $("#galery-tramo").html(vals.TramoDesc)
            $("#galery-estacion").html(vals.Estacion)
            $("#galery-fecha").html(vals.Fecha)
            $("#galery-descripcion").html(vals.Descripcion)
            vNombreArchivo = vals.FotoNombre
            vFotoIDActual = vals.FotografiaID

             miCurrentActual = vals.PeriodoCorrel
          

            if (type === "10") {
                $("#galery-img").addClass("d-none")
                $("#galery-video").removeClass("d-none")
                $("#galery-video").attr("src", `/Videos/${vals.FotoNombre}`)
            } else {
                $("#galery-video").addClass("d-none")
                $("#galery-img").removeClass("d-none")
                $("#galery-img").attr("src", `${thumbnail}Tipo=1&MaxPixels=200&Fotografia=${vals.FotoNombre}&EMID=ID_1" alt="imagen galeria`)
            }
            initMap( vals.Latitud, vals.Longitud )
        })
    }
})(jQuery); // End of use strict



function initMap(lat = null, lon = null) {
    if (!lat) {
        document.getElementById("map").classList.add("d-none")
        return
    }
    document.getElementById("map").classList.remove("d-none")
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: { lat: lat, lng: lon }
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: { lat: lat, lng: lon },
        map: map,
    });
}

function set_galery_imageAdmon(val, type = 4) {
    val.forEach((item) => {
        // <img width="140" height="140" src="https://elephant-project.com/SICOP/GetThumbnail.aspx?Tipo=3&MaxPixels=0&Fotografia=${item.FotoNombre}&EMID=ID_1" alt="imagen galeria" />
        let image = $(`
                            <div class="img-wrapper d-inline-block galery-img" name="ImgAdmon">
                                <a type="button" class="img-link" data-toggle="modal" data-id="${item.FotoNombre}"
                                    data-target="#fotografiaModal">
                                    <img width="140" height="140" src="${thumbnail}Tipo=${type}&MaxPixels=200&Fotografia=${item.FotoNombre}&EMID=ID_1" alt="imagen galeria" />
                                    <ul class="list-unstyled img-text">
                                    </ul>
                                </a>
                            </div>`);
        image.data("obj", item);
        $("#GaleryViewAdmin").append(image);
    });
    $("[name='ImgAdmon']").on("click", ({ currentTarget }) => {
        let vals = $(currentTarget).data("obj")
        $("#galery-periodo").html('N/A')
        $("#galery-tramo").html(vals.TramoDesc)
        $("#galery-estacion").html(vals.Estacion)
        $("#galery-fecha").html(vals.Fecha)
        $("#galery-descripcion").html(vals.Descripcion)
        if (type === "10") {
            $("#galery-img").addClass("d-none")
            $("#galery-video").removeClass("d-none")
            $("#galery-video").attr("src", `/Videos/${vals.FotoNombre}`)
        } else {
            $("#galery-video").addClass("d-none")
            $("#galery-img").removeClass("d-none")
            $("#galery-img").attr("src", `${thumbnail}Tipo=4&MaxPixels=200&Fotografia=${vals.FotoNombre}" alt="imagen galeria`)
        }
        initMap(vals.Latitud, vals.Longitud)
    })
}

//ROTAR LAS FOTOGRAFÍAS
function fnRotarFoto(rotarIzquierda) {


    var dataJSONt = JSON.stringify({
        nombreArchivo: vNombreArchivo,
        rotarIzquierda: rotarIzquierda
    });
    $.ajax({
        type: "POST",
        url: "Default.aspx/fRotarFoto",
        data: dataJSONt,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var nombreArchivoNuevo = data.d;
            var rutaFoto = thumbnail + "Tipo=11&MaxPixels=0&Fotografia=" + vNombreArchivo + "&random=" + new Date().getTime();
            //localhost:44390/GetThumbnail.aspx?Tipo=3&MaxPixels=0&Fotografia=000053582W.jpeg&EMID=ID_1
            document.getElementById("galery-img").src = rutaFoto;

        },
        failure: function (response) {
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}