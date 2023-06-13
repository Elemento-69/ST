var vMontoEjecutado = 0;
var vMontoaRecibir = 0;
var vSobreCostos = 0;
var vAjustes = 0;
$(document).ready(function () {
    $("#btnRegresarRegistroDatos").click(function () {
        let QueryString = "?Plan=" + plan + "&Programa=" + proyecto.split("-")[0].toString() + "&Proyecto=" + proyecto
        window.location.href = "RegistroDatos.aspx" + QueryString;
    })
    $("#sobreCostos").keypress(function () {
        vSobreCostos = parseFloat($(this).val().replace('Q','').replace(',','').replace(' ',''));

    });
    $("#ajustes").keypress(function () {
        vAjustes = parseFloat($(this).val().replace('Q', '').replace(',', '').replace(' ', ''));

    });

    $("#montoRecibir-btn").on("click", function () {
        var vMontoEjecutadobtn = vMontoEjecutado;
        
      //  var vMontoAnticipado = parseFloat($("#montoAnticipado").val() || 0)

        let total = vMontoEjecutadobtn + vSobreCostos + vAjustes;
        vMontoaRecibir = total;
        $("#montoRecibir").val(total)
    })
})

$.ajax({
    url: `${urlbase}api/EstimacionAgregar/GetTipoProyecto/${plan}/${proyecto}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        if (val[0].EsSupervisor)
            $("#estimacionTipo").html("<option value='1'>Por estimaci&oacute;n</option>")
        else {
            $("#estimacionTipo").html("<option value='1'>Por estimaci&oacute;n</option>")
        }
        $("#estimacionTipo").trigger("change")
    }
})

$("#desdeEstimacion-dt").datetimepicker({
    format: "DD/MM/YYYY"
})

$('#hastaEstimacion-dt').datetimepicker({
    format: "DD/MM/YYYY",
    useCurrent: false
});

$("#desdeEstimacion-dt").on("change.datetimepicker", function (e) {
    if (e.date) {
        $('#hastaEstimacion-dt').datetimepicker('minDate', e.date);
        $("#desdeEjecutado-label").html(e.date.format("DD/MM/YYYY"))
    }
});

$("#hastaEstimacion-dt").on("change.datetimepicker", function (e) {
    if (e.date) {
        $("#hastaEjecutado-label").html(e.date.format("DD/MM/YYYY"))
    }
});
$.ajax({
    url: `${urlbase}api/EstimacionAgregar/FechaEstimacionDesde/${plan}/${proyecto}/1/1/false`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        let desde = moment(val[0].Desde)
        let hasta = moment(val[0].Hasta)
        $("#desdeEstimacion-dt").datetimepicker("minDate", desde)
        $("#desdeEstimacion-dt").datetimepicker("date", desde)
        if (val[0].Hasta && hasta > desde) {
            $("#hastaEstimacion-dt").datetimepicker("maxDate", hasta)
        }
    }
})

$("#estimaciones-range_date .date").on("change.datetimepicker", (e) => {
    if (e.date) {
        let inicio = $("#desdeEstimacion-dt").datetimepicker("date")
        let fin = $('#hastaEstimacion-dt').datetimepicker("date")
        if (e.currentTarget.id === "desdeEstimacion-dt") inicio = e.date
        else fin = e.date
        if (inicio && fin) {
            $.ajax({
                url: `${urlbase}api/EstimacionAgregar/GetMontoEjecutado/${plan}/${proyecto}/${inicio.format("YYYY-MM-DD")}/${fin.format("YYYY-MM-DD")}`,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: (val) => {
                    $("#montoEjecutado").val(val[0].MontoEjecutado)
                    vMontoEjecutado = val[0].MontoEjecutado;
                }
            })
            $.ajax({
                url: `${urlbase}api/EstimacionAgregar/GetDetalleMontoEjecutado/${plan}/${proyecto}/${inicio.format("YYYY-MM-DD")}/${fin.format("YYYY-MM-DD")}`,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: (val) => {
                    if (val.length === 0) {
                        $("#no-data-message").removeClass("d-none")
                        $("#ejecutados-table").addClass("d-none")
                    } else {
                        let total = 0
                        let rows = val.map((item) => {
                            total += item.TotalAcumulado
                            return `<tr class="text-center td-custom">
                            <td class="spacer bg-light"></td>
                            <td>${item.Renglon}</td>
                            <td>${item.Descripcion}</td>
                            <td>${item.Unidad}</td>
                            <td class="frcurrency-mask text-center">${item.PrecioUnitario}</td>
                            <td class="frdecimal-mask text-center">${item.Cantidad}</td>
                            <td class="frcurrency-mask text-center">${item.TotalAcumulado}</td>
                            <td class="spacer"></td>
                        </tr>
                        `
                        })
                        $("#no-data-message").addClass("d-none")
                        $("#ejecutados-table").parent().removeClass("d-none")
                        $("#ejecutados-table tbody").html(rows.join(""))
                        $("#total-estimaciones").val(total)
                        initMasks("#ejecutados-table tbody")
                    }
                }
            })
        }
    }
})


function formatDateNew(fecha) {
    if (!fecha)
        return '';
    var today = new Date(fecha);
    var dd = PadLeft(today.getDate());
    var mm = PadLeft(today.getMonth() + 1);
    var yyyy = today.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
}
function PadLeft(value, length = 2) {
    return (value.toString().length < length) ? PadLeft("0" + value, length) : value;
}
$("#estimacionTipo").on("change", function () {
    $.ajax({
        url: `${urlbase}api/EstimacionAgregar/FechaEstimacionDesde/${plan}/${proyecto}/1/${this.value}/${this.value === '3'? 'true': 'false'}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let desde = moment(val[0].Desde)
            let hasta = moment(val[0].Hasta)
            $("#desdeEstimacion-dt").datetimepicker("minDate", desde)
            $("#desdeEstimacion-dt").datetimepicker("date", desde)
            if (val[0].Hasta && hasta > desde) {
                $("#hastaEstimacion-dt").datetimepicker("maxDate", hasta)
            }
        }
    })
})

$.ajax({
    url: `${urlbase}api/EstimacionAgregar/GetEstimacionVisa/${plan}/${proyecto}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        let rows = val.map((val) => {
            return `
             <tr class="text-center td-custom">
                        <td class="spacer bg-light"></td>
                        <td>
                            <a href="#" class="action-icon hover-red del-btn" data-toggle="popover" data-trigger="hover" data-id="${val.EstimacionCorr}"
                                data-content="Detalle de estimaciones" data-placement="top">
                                <i class="fas fa-trash fa-lg fa-fw"></i>
                            </a>
                            <a href="#" class="action-icon hover-blue print-btn" data-toggle="popover" data-trigger="hover" data-id="${val.EstimacionCorr}"
                                data-content="Detalle de estimaciones" data-placement="top">
                                <i class="fas fa-print fa-lg fa-fw"></i>
                            </a>
                        </td>
                        <td>${val.EstimacionCorr}</td>
                        <td>${val.Periodo}</td>
                        <td>Estimación</td>
                        <td class="frcurrency-mask">${val.MontoEjecutado}</td>
                        <td class="frcurrency-mask">${val.MontoaRecibir}</td>
                        <td>${val.Observaciones}</td>
                        <td>
                            <div class="form-group custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input cert-form" id="otraCertificacionCheck" ${val.CertificadoSup ? 'checked' : ''} disabled>
                                <label class="custom-control-label" for="otraCertificacionCheck"></label>
                            </div>
                        </td>
                        <td>${val.EstadoDesc}</td>
                        <td class="spacer bg-light"></td>
                    </tr>
        `})
        $("#estimacionesDesc-table tbody").html(rows.join(""))
        initMasks("#estimacionesDesc-table tbody")
    }
})

$("#add-btn").on("click", () => {
    let data = {
        "AnioID": parseInt(plan),
        "ProyectoCodigo": proyecto,
        "EstimacionCorr": 0,
        "FechaHasta": $("#hastaEstimacion-dt").datetimepicker("date").toDate(),
        "Fechadesde": $("#desdeEstimacion-dt").datetimepicker("date").toDate(),
        "MontoAnticipoSupervisado": 0,
        "MontoOtrasDeducciones": vAjustes,
        "MontoSobreCostoProv": vSobreCostos,
        "MontoaRecibir": vMontoaRecibir,
        "Observaciones": $("#observaciones").val(),
        "CertificadoSup": true,
        "UserName": user,
        "MontoRetencion": 0,
        "Cambios": true,
        "TipoEstimacion": parseInt($("#estimacionTipo").val()),
        "MontoEjecutado": vMontoEjecutado
    }

    $.ajax({
        url: `${urlbase}/api/EstimacionAgregar/AgregarEstimacion`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        data: JSON.stringify(data),
        success: (val) => {
            $.ajax({
                url: `${urlbase}api/EstimacionAgregar/GetEstimacionVisa/${plan}/${proyecto}`,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: (val) => {
                    let rows = val.map((val) => {
                        return `
             <tr class="text-center td-custom">
                        <td class="spacer bg-light"></td>
                        <td>
                            <a href="#" class="action-icon hover-red del-btn" data-toggle="popover" data-trigger="hover" data-id="${val.EstimacionCorr}"
                                data-content="Detalle de estimaciones" data-placement="top">
                                <i class="fas fa-trash fa-lg fa-fw"></i>
                            </a>
                            <a href="#" class="action-icon hover-blue print-btn" data-toggle="popover" data-trigger="hover" data-id="${val.EstimacionCorr}"
                                data-content="Detalle de estimaciones" data-placement="top">
                                <i class="fas fa-print fa-lg fa-fw"></i>
                            </a>
                        </td>
                        <td>${val.EstimacionCorr}</td>
                        <td>${val.Periodo}</td>
                        <td>Estimación</td>
                        <td class="frcurrency-mask">${val.MontoEjecutado}</td>
                        <td class="frcurrency-mask">${val.MontoaRecibir}</td>
                        <td>${val.Observaciones}</td>
                        <td>
                            <div class="form-group custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input cert-form" id="otraCertificacionCheck" ${val.CertificadoSup ? 'checked' : ''} disabled>
                                <label class="custom-control-label" for="otraCertificacionCheck"></label>
                            </div>
                        </td>
                        <td>${val.EstadoDesc}</td>
                        <td class="spacer bg-light"></td>
                    </tr>
        `})
                    $("#estimacionesDesc-table tbody").html(rows.join(""))
                    initMasks("#estimacionesDesc-table tbody")
                }
            })
            let message = "Estimación creada correctamente"
            swal.fire(message, "", "success")
        },
        error: function (response) {
            swal.fire(response.responseJSON.Message, "", "error");
            return false
        }
    })
})
$("#estimacionesDesc-table tbody").on("click", ".del-btn", () => {
    let item = {
        "AnioID": plan,
        "ProyectoCodigo": proyecto
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
                url: `${urlbase}api/EstimacionAgregar/EliminarEstimacion`,
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
$("#estimacionesDesc-table tbody").on("click", ".print-btn", (e) => {
    $("#reporte-text-proyecto").html(proyecto);
    estimacion = e.currentTarget.dataset.id;
    $("#reporte-text-estimacion").html(e.currentTarget.dataset.estimacion);
    $("#reporteEstimaciones").modal("show");
  
})
$("#btn-print-reporte").on("click", () => {
    var planAnual = plan;
    var proyectoN = proyecto;
    var value = $('input[name="tipoFiltro"]:checked').val()
    if (value == "estimacion caratula") {
        var esunica = $("#estimacion-unica-caratura").prop("checked") ? "Estimación%20Unica" : "Estimación%20No%20" + estimacion;
        var codigo_supervisor = "";
        var reporte = "3200";
        opendialog(`/VisorInformessti?ReporteID=${reporte}&AnioID=${planAnual}&ProyectoCodigo=${proyectoN}&EstimacionCorr=${estimacion}&ProyectoSupervisionCodigo=${codigo_supervisor}&NombreEmpresa=&EsUnica=${esunica}`);
    } else if (value == "caratula financiera") {
        var reporte = "3800";
        var codigo_supervisor = "";
        if ($("#empresa-check").prop("checked")) {
            reporte = "4100";
            var delegado = $("#nombreDelegado").val();
            var empresa = $("#nombreEmpresa2").val();
            opendialog(`/VisorInformessti?ReporteID=${reporte}&AnioID=${planAnual}&Proyecto=${proyectoN}&CorrEsti=${estimacion}&CodigoSupervisor=${codigo_supervisor}&DelegadoResidente=${delegado}&EmpresaNombre=${empresa}`);
        } else {
            opendialog(`/VisorInformessti?ReporteID=${reporte}&AnioID=${planAnual}&Proyecto=${proyectoN}&CorrEsti=${estimacion}&CodigoSupervisor=${codigo_supervisor}`);
        }
    } else if (value == "constancia trabajo") {
        var reporte = "3600";
        var codigo_supervisor = "";
        var fecha = $("#FechaPresentacion-dp").datetimepicker("date").format("DD/MM/YYYY");
        if ($("#empresa-check2").prop("checked")) {
            reporte = "4300";
            var supervisor = $("#nombreDelegado2").val();
            var empresa = $("#nombreEmpresa3").val();
            opendialog(`/VisorInformessti?ReporteID=${reporte}&AnioID=${planAnual}&CodigoSupervisor=${codigo_supervisor}&CodigoProyecto=${proyectoN}&EstimacionCorr=${estimacion}&FechaCarta=${fecha}&SubDirector=${supervisor}&NombreEmpresa=${empresa}&EsUnico=informe%20financiero%20unico`);
        } else {
            opendialog(`/VisorInformessti?ReporteID=${reporte}&AnioID=${planAnual}&CodigoSupervisor=${codigo_supervisor}&CodigoProyecto=${proyectoN}&EstimacionCorr=${estimacion}&FechaCarta=${fecha}&SubDirector=&EsUnico=informe%20financiero%20No.%201`);
        }
    } else if (value == "avance grafica") {
        var reporte = "4900";
        var codigo_supervisor = "";
        var fecha_desde = $("#fecha-inicial").datetimepicker("date").format("DD/MM/YYYY");
        var fecha_hasta = $("#fecha-final").datetimepicker("date").format("DD/MM/YYYY");
        var periodo = $("#periodos").val();
        if ($("#empresa-check3").prop("checked")) {
            reporte = "4800";
            var delegado = $("#nombreDelegado4").val();
            var empresa = $("#nombreEmpresa1").val();
            var empresa_contratista = $("#empresaContratista").val();
            opendialog(`/VisorInformesSti.aspx?ReporteID=${reporte}&AnioID=${planAnual}&ProyectoCodigo=${proyectoN}&PeriodoCorrel=${periodo}&DelegadoResidente=${delegado}&EmpresaNombre=${empresa}&EmpresaContratista=-&FechaDesde=${fecha_desde}&FechaHasta=${fecha_hasta}`);
        } else {
            opendialog(`/VisorInformesSti.aspx?ReporteID=${reporte}&AnioID=${planAnual}&ProyectoCodigo=${proyectoN}&PeriodoCorrel=${periodo}&DelegadoResidente=&EmpresaContratista=-&FechaDesde=${fecha_desde}&FechaHasta=${fecha_hasta}`);
        }
    } else if (value == "avanceFinanciero") {
        var reporte = "5000";
        var codigo_supervisor = "";
        var fecha_desde = $("#fecha-inicial2").datetimepicker("date").format("DD/MM/YYYY");
        var fecha_hasta = $("#fecha-final2").datetimepicker("date").format("DD/MM/YYYY");
        var periodo = $("#periodos2").val();
        if ($("#empresa-check4").prop("checked")) {
            reporte = "5100";
            var delegado = $("#nombreDelegado5").val();
            var empresa = $("#nombreEmpresa4").val();
            var empresa_contratista = $("#empresaContratista2").val();
            opendialog(`/VisorInformesSti.aspx?ReporteID=${reporte}&AnioID=${planAnual}&ProyectoCodigo=${proyectoN}&PeriodoCorrel=${periodo}&DelegadoResidente=${delegado}&EmpresaNombre=${empresa}&EmpresaContratista=-&FechaDesde=${fecha_desde}&FechaHasta=${fecha_hasta}`);
        } else {
            opendialog(`/VisorInformesSti.aspx?ReporteID=${reporte}&AnioID=${planAnual}&ProyectoCodigo=${proyectoN}&PeriodoCorrel=${periodo}&DelegadoResidente=&EmpresaContratista=-&FechaDesde=${fecha_desde}&FechaHasta=${fecha_hasta}`);
        }
    } else if (value == "ejecucionRenglones") {
        var reporte = "511";
        reporte = $("#estimacion-unica-renglones").prop("checked") ? "500" : "511";
        opendialog(`/VisorInformes.aspx?idreporte=${reporte}&parameters=${planAnual},${proyectoN},${estimacion}`);
    } else if (value == "cuadroEstimacion") {
        var reporte = "5700";
        var esunica = $("#estimacion-unica-sabana").prop("checked") ? "Única" : `No%20${estimacion}`;
        opendialog(`/VisorInformesSti.aspx?ReporteID=${reporte}&AnioID=${planAnual}&ProyectoCodigo=${proyectoN}&EstimacionCorr=${estimacion}&EstimacionU=${esunica}`);
    } else if (value == "recomendacionPago") {
        var esempresa = $("#empresa-check7").prop("checked") ? true : false;
        //opendialog(`/RecomendacionPagoSupervisor.aspx?AnioID=${planAnual}&codigoproyecto=${proyectoN}&Correlativo=${estimacion}&Delegado=123`);
        window.open(`../RecomendacionPagoSupervisor.aspx?AnioID=${planAnual}&codigoproyecto=${proyectoN}&Correlativo=${estimacion}&Delegado=${esempresa}`, '_blank')
    }
})

function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Estimaciones",
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
LoadPeriodosReporteEstimaciones();
function LoadPeriodosReporteEstimaciones() {
    var planAnual = plan;
    var proyectoN = proyecto;
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtPeriodosXProyecto/${planAnual}/${proyectoN}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let options = val.map((val) => new Option(val.Periodo, val.EstimacionCorrel));
            $('#periodos, #periodos2, #periodos8, #periodos4, #periodos7').append(options).trigger("change");
        },
        error: () => { }
    })
}

$(document).ready(function () {
    var fecha = new Date();
    let day = fecha.getDate()
    let month = fecha.getMonth() + 1
    let year = fecha.getFullYear();
    let fechaActual = `${Pad(month, 2)}/${Pad(day, 2)}/${year}`;

    $("#FechaPresentacion-dp, #fecha-inicial, #fecha-final, #fecha-inicial2, #fecha-final2").datetimepicker({
        format: 'DD/MM/YYYY',
        locale: 'es',
        defaultDate: fechaActual
    });

    $("#fecha-inicial").on("change.datetimepicker", function (e) {
        $('#fecha-final').datetimepicker('minDate', e.date);
    });
    $("#fecha-final").on("change.datetimepicker", function (e) {
        $('#fecha-inicial').datetimepicker('maxDate', e.date);
    });

    $("#fecha-inicial2").on("change.datetimepicker", function (e) {
        $('#fecha-final2').datetimepicker('minDate', e.date);
    });
    $("#fecha-final2").on("change.datetimepicker", function (e) {
        $('#fecha-inicial2').datetimepicker('maxDate', e.date);
    });

    $("#fecha-inicial, #fecha-final, #fecha-inicial2, #fecha-final2").trigger("change.datetimepicker");
});