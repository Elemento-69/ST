var vPlan = 0;
var vPrograma = 0;
var vProyecto = 0;
var ROL = rolConsultas;
var vVieneDeRegistro;
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    vPlan = urlParams.get('plan');
    vPrograma = urlParams.get('programa');
    vProyecto = urlParams.get('proyecto');
    vVieneDeRegistro = urlParams.get('VieneRegistroDatos');
    if (vVieneDeRegistro == 1) {
        $("#divRegresar").toggle(true);
    } else {
        $("#divRegresar").toggle(false);
    }
    $("#btnRegresarRegistroDatos").click(function () {
        let QueryString = "?Plan=" + plan + "&Programa=" + proyecto.split('-')[0].toString() + "&Proyecto=" + proyecto
        window.location.href = "RegistroDatos.aspx" + QueryString;
    })
    if (rolConsultas != "SUPERVISOR") {
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
        $("#PlanAnualList").on("change.select2", ({ currentTarget }) => {
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
                    $('#ProyectoList').append(val.map((val) => new Option(val.ProyectoDescripcion, plan+','+val.ProyectoCodigo))).trigger("change")
                    if (vProyecto !== null) {
                        $('#ProyectoList').val(vProyecto);
                        $('#ProyectoList').trigger("change")
                    }
                }
            })
        })
        //$("#ProyectoListA").on("change.select2", ({ currentTarget }) => {
        //    //let description = currentTarget.selectedOptions[0].textContent
        //    //$("#TituloProyecto").html(description)
        //    let plan = $("#PlanAnualList").val()
        //    let program = $("#ProgramaList").val()
        //    let proyect = currentTarget.value
        //    LoadPeriodosReporteEstimaciones();

        //})


    }

})

plan = usuario.substr(0, 4);
proyecto = usuario.substr(4, 10);
function fnCargarProyectos() {
    if (rolConsultas === 'SUPERVISOR') {
        $.ajax({
            url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtenerListaProyectosEstimaciones/${plan}/${proyecto}/${rolConsultas}`,
            success: (val) => {
                let options = val.map((val) => new Option(val.ProyectoDescripcion, val.ID))
                $('#ProyectoList').append(options).trigger("change")
                if (vPlan !== null) {
                    $('#ProyectoList').val(vPlan + "," + vProyecto).change;
                    plan = $('#ProyectoList').val().substr(0, 4)
                    proyecto = $('#ProyectoList').val().substr(5, 10)
                    cargaGrid()
                }
            },

            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            }
        })
    }
    else {
        $.ajax({
            url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtenerListaProyectosEstimaciones/${plan}/${proyecto}/${rolConsultas}`,
            success: (val) => {
                let options = val.map((val) => new Option(val.ProyectoDescripcion, val.ID))
                $('#ProyectoList').append(options).trigger("change")
                if (vPlan !== null) {
                    $('#ProyectoList').val(vPlan + "," + vProyecto).change;
                    plan = $('#ProyectoList').val().substr(0, 4)
                    proyecto = $('#ProyectoList').val().substr(5, 10)
                    cargaGrid()
                }
            },

            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            }
        })
    }

}

fnCargarProyectos();

function cargaGrid() {

$.ajax({
    url: `${urlbase}api/EstimacionAgregar/GetEstimacionVisa/${plan}/${proyecto}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        $("#estimacion-table > tfoot, #estimacion-table > tbody").html(null);
        val.forEach((item) => {
            let col = $(`<tr>
                    <td class="spacer"></td>
                    <td>
                        <a style="cursor:pointer" class="action-icon hover-blue btn-reporte-est" data-toggle="popover" data-trigger="hover"
                            data-content="Imprimir" data-placement="top" title="Consultar Estimación" data-estimacion="${item.EstimacionCorr}">
                            <i class="fas fa-print fa-lg fa-fw"></i>
                        </a>
                         <a style="cursor:pointer" class="action-icon hover-blue btn-reparos-ob" data-toggle="popover" data-trigger="hover"
                            data-content="Información" data-placement="top" title="Consultar reparos para el documento de cobro"
                            data-estimacion="${item.EstimacionCorr}">
                            <i class="fas fa-info-circle fa-lg fa-fw"></i>
                        </a>
                    </td>
                    <td class="text-center">${item.AnioID}</td>
                    <td class="text-center">${item.ProyectoCodigo}</td>
                    <td class="text-center">${item.EstimacionCorr}</td>
                    <td class="text-center">${item.Periodo}</td>
                    <td class="text-right">${currency(item.MontoaRecibir,'Q.')}</td>
                    <td class="text-right">${currency(item.MontoPagado, 'Q.')}</td>
                    <td class="text-right">${currency(item.MontoPendientePago,'Q.')}</td>
                    <td class="text-center">${item.EstadoDesc}</td>
                    <td class="text-center">${moment(item.DateModify).format('DD/MM/YYYY')}</td>
                    <td class="text-center">${item.Visor}</td>
                    <td class="spacer"></td>
                </tr>`)
            col.data("item", item)
            $("#estimacion-table").append(col).trigger("change")
        })
    }
})
}
$("#ProyectoList").on("change.select2", ({ currentTarget }) => {
    plan = currentTarget.value.substr(0, 4);;
    proyecto = currentTarget.value.substr(5, 10);;
    cargaGrid()
   
})
var estimacion = null;
$("table#estimacion-table").on("click", ".btn-reporte-est", (e) => {
    $("#reporte-text-proyecto").html(vProyecto);
    let vProyectoSeleccionado = $("#ProyectoList").val();
    let vTipoProyecto = vProyectoSeleccionado.split(',')[1].split('-')[0];
    if (vTipoProyecto !== 'S') {
        $('#dDeclaracionJurada').hide();
    }
    else {
        $('#dDeclaracionJurada').show();
    }
    estimacion = e.currentTarget.dataset.estimacion;
    $("#reporte-text-estimacion").html(e.currentTarget.dataset.estimacion);
    $("#reporteEstimaciones").modal("show");
});
$("table#estimacion-table").on("click", ".btn-reparos-ob", (e) => {
   // var planAnual = $("#plananual").val();
   // var proyectoN = $("#proyecto").val();
    var planAnual = $('#ProyectoList').val().substr(0, 4)
    var proyectoN = $('#ProyectoList').val().substr(5, 10)
    var estimacion = e.currentTarget.dataset.estimacion || 0
   // var programa_codigo = proyectoN.substr(0, proyectoN.indexOf("-"));
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtenerConsultaReparo/${proyectoN}/${estimacion}/${planAnual}/${vPrograma}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => table_create_reparos(val),
        error: () => table_create_reparos([])
    })
    $("#ModalReparos").modal("show");
});


var table = null;
function table_create_reparos(data = []) {
    var columns = [
        { data: 'null', className: 'spacer', title: '', render: () => '' },
        {
            data: 'ReparoCorr',
            title: '',
            render: (data, type, row, indexes) => {
                var btn_impresora = `
                        <a style="cursor:pointer" class="action-icon hover-blue btn-reporte-reparo" data-toggle="popover" data-trigger="hover"
                            data-content="Imprimir" data-placement="top" title="Imprimir" data-reparo="${data}" data-estimacion="${row['EstimacionCorr']}" data-guia="${row['GuiaVisadoCorr']}" 
                            data-index="${indexes.row}">
                            <i class="fas fa-print fa-lg fa-fw"></i>
                        </a>
                    `;
                var btn_observaciones = `
                        <a href="javascript:void(0)" style="cursor:pointer" class="action-icon hover-dark btn-observaciones-reparo"
                            data-toggle="popover" data-trigger="hover" data-content="Observaciones" data-placement="top" title=""
                            data-reparo="${data}" data-estimacion="${row['EstimacionCorr']}" data-index="${indexes.row}">
                            <i class="fas fa-caret-down fa-lg fa-fw" id="icon-fa-down-${indexes.row}"></i>
                        </a>
                    `;
                return `<div class="text-nowrap">${btn_impresora} ${btn_observaciones}</div>`;
            }
        },
        { data: 'ReparoCorr', title: '#Número', className: 'text-center' },
        { data: 'FechaReparo', title: 'Fecha de Reparo', render: formatDateNew },
        { data: 'FEntregadoAContratista', title: 'Entregado A Contratista', render: formatDateNew },
        { data: 'FRecibidoDeContratista', title: 'Recibido De Contratista', render: formatDateNew },
        { data: 'FechaDesvanecido', title: 'Fecha desvanecido', render: formatDateNew },
        { data: 'Visor', title: 'Visor', className: "min-th" },
        { data: 'Desvanecido', title: 'Desvanecido', render: (data) => data ? 'Si' : 'No' },
        { data: 'null', className: 'spacer', title: '', render: () => '' },
    ];
    table = $("table#table-reparos").DataTable(WithoutPagination('../', columns, data));
    table.rows().every(function () {
        this.child(`
            <div class="table-responsive mb-1">
                <table class="table table-bordered datatable" id="table-observacion-${this.index()}" style="width: 1040px;"></table>
            </div>
        `);
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
function PadLeft(value, length = 2) {
    return (value.toString().length < length) ? PadLeft("0" + value, length) : value;
}


$('table#table-reparos').on('click', 'tbody tr .btn-observaciones-reparo', function (e) {
    var reparo = e.currentTarget.dataset.reparo || 0;
    var estimacion = e.currentTarget.dataset.estimacion || 0;
    var index = e.currentTarget.dataset.index || 0;
    var child = table.row(e.currentTarget.parentElement.parentElement.parentElement).child;
    var planAnual = $('#ProyectoList').val().substr(0, 4)
    var proyectoN = $('#ProyectoList').val().substr(5, 10)
    if (child.isShown()) {
        child.hide();
    } else {
        child.show();
        $.ajax({
            url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtenerConsultaDetalleReparo/${planAnual}/${proyectoN}/${estimacion}/${reparo}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => table_create_observaciones(index, val),
            error: () => table_create_observaciones(index)
        })
    }
});
$('table#table-reparos').on('click', 'tbody tr .btn-reporte-reparo', function (e) {
    var reparo = e.currentTarget.dataset.reparo || 0;
    var estimacion = e.currentTarget.dataset.estimacion || 0;
    var guia = e.currentTarget.dataset.guia || 0;
    var index = e.currentTarget.dataset.index || 0;
    var child = table.row(e.currentTarget.parentElement.parentElement.parentElement).child;
    var planAnual = $('#ProyectoList').val().substr(0, 4)
    var proyectoN = $('#ProyectoList').val().substr(5, 10)
    opendialog("/visorinformes.aspx?IdReporte=22&Parameters=" + reparo + "," + proyectoN + "," + estimacion + "," + planAnual+","+guia);
    
});
function table_create_observaciones(index, data = []) {
    var columns = [
        { data: 'null', className: 'spacer', title: '', render: () => '' },
        { data: 'RequisitoDesc', title: 'Requisito' },
        { data: 'ReaparoComentario', title: 'Comentario' },
        { data: 'null', className: 'spacer', title: '', render: () => '' },
    ];
    $("table#table-observacion-" + index).DataTable(WithoutPagination(url_proyecto, columns, data));
}


function currency(numero, prefix = '', sufix = '') {
    return `${prefix}${numero.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}${sufix}`;
}

$("#btn-print-reporte").on("click", () => {
    
    var planAnual= $('#ProyectoList').val().substr(0, 4)
    var proyectoN = $('#ProyectoList').val().substr(5, 10)
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
        var reporte = "5702";
        var esunica = $("#estimacion-unica-sabana").prop("checked") ? "Única" : `No%20${estimacion}`;
        opendialog(`/VisorInformesSti.aspx?ReporteID=${reporte}&AnioID=${planAnual}&ProyectoCodigo=${proyectoN}&EstimacionCorr=${estimacion}&EstimacionU=${esunica}`);
    } else if (value == "recomendacionPago") {
        var esempresa = $("#empresa-check7").prop("checked") ? true : false;
        //opendialog(`/RecomendacionPagoSupervisor.aspx?AnioID=${planAnual}&codigoproyecto=${proyectoN}&Correlativo=${estimacion}&Delegado=123`);
        window.open(`../RecomendacionPagoSupervisor.aspx?AnioID=${planAnual}&codigoproyecto=${proyectoN}&Correlativo=${estimacion}&Delegado=${esempresa}`, '_blank')
    }
})
$("#btnImprimir").on("click", () => {
    plan = $('#ProyectoList').val().substr(0, 4)
    proyecto = $('#ProyectoList').val().substr(5, 10)
    opendialog("/visorinformes.aspx?IDReporte=29&Parameters=" + plan + "," + proyecto );
})
$("#declaracionjurada").on("click", () => {
    plan = $('#ProyectoList').val().substr(0, 4)
    proyecto = $('#ProyectoList').val().substr(5, 10)
    let QueryString = "?AnioID=" + plan + "&ProyectoCodigo=" + proyecto
    window.location = "../Reportes/frmDeclaracionJurada.aspx" + QueryString
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
    if (rolConsultas != 'SUPERVISOR') {
        planAnual = $("#PlanAnualList").val()
        proyectoN = $("#ProyectoListA").val()
    }
    if ($("#ProyectoListA").val() != null) {
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
function Pad(value, length = 2) {
    return (value.toString().length < length) ? Pad("0" + value, length) : value;
}
