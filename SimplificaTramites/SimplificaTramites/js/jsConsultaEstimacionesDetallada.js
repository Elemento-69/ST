var vModalCurEStimacionCorrel = 0;
var vDocsDescargar = [];
var vNombreArchivoISRIVA = '';
var vRutaArchivoISRIVA = '';
var vMontoFactura = 0;
var vDescuentoIva = 0;
var vAnioNomina = 0;
var calculoIsr = 0;
var vDescuento25porciento = 0;
var vRolesUsuario = [];
var vProyectoCodigo;
var vAnioID;
var vEstadoAprobado;
var tieneSuspensiones = false;



const fnValidacionNIT = () => {
    const inputNIT = document.querySelector('.cNIT');
   // const pattern = /^[A-Za-z0-9][A-Za-z0-9]*$/;
    const pattern = /^[A-Za-z0-9\u00C0-\u00FF][A-Za-z0-9\u00C0-\u00FF]*$/;
    inputNIT.addEventListener('.cNIT', (event) => {
        if (!pattern.test(event.target.value)) {
            event.target.value=''
        }
    })
}

function fnObtenerTipoPago() {

    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtTipoPago`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let options = val.map((val) => new Option(val.PagoDescripcion, val.TipoPagoID));
            $('#cur-tipoPago').append(options).trigger("change");

        },
        error: () => { }
    });
}
function fnObtenerRoles() {
    $.ajax({
        type: "POST",
        url: "ConsultaEstimacionesDetallada.aspx/fObtenerRoles",
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
                if (!(vRolesUsuario.includes('ADMINISTRADORES') || vRolesUsuario.includes('ACTUALIZAR CUR'))) {
                    $("#cur-operar").attr('disabled', 'disabled');
                    $("#btnDescargar").attr('disabled', '');
                    $("#cur-estado").attr('disabled', 'disabled');
                    $("#btnDesaprobar").attr('disabled', 'disabled');
                    $("#btnGuardar").attr('disabled', 'disabled');
                    $('#cur-tipoPago').attr('disabled', 'disabled');
                    $("#cur_isr").attr('disabled', 'disabled');
                    $("#cur_isr2").attr('disabled', 'disabled');
                    $("#cur_descuento_iva").attr('disabled', 'disabled');
                    $("#cur_descuento_iva2").attr('disabled', 'disabled');
                    $("#cur_retencion").attr('disabled', 'disabled');
                    $("#cur_retencion2").attr('disabled', 'disabled');
                } else {
                    $('#cur-tipoPago').attr('disabled', 'disabled');
                }
            }
        },
        failure: function (response) {
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}
$.ajax({
    url: `${urlbase}api/RegistroDatos/GetPlanesAnuales`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        let options = val.map((val) => new Option(val.PlanAnualNombre, val.AnioID));
        $('#plananual').append(options).trigger("change");
    },
    error: () => { }
});

LoadEstimaciones();

$("#plananual").on('change', () => {
    LoadInformacionContratista();
    LoadTramos();
    LoadRenglones();
    LoadSanciones();
    LoadPagos();
    LoadEstimaciones();
    LoadClausulasAmpliaciones();
    LoadEjecucionClausulas();
    LoadPeriodosReporteEstimaciones();
});

$("#btn-proyecto").on('click', () => {
    LoadInformacionContratista();
    LoadTramos();
    LoadRenglones();
    LoadSanciones();
    LoadPagos();
    LoadEstimaciones();
    LoadClausulasAmpliaciones()
    LoadEjecucionClausulas();
    LoadPeriodosReporteEstimaciones();
    fnValidarProyectoActaEstimacion(); // funcion validar acrta de estimacion
});

$("#proyecto").on('keydown', (e) => {
    if (e.keyCode == 13) {
        e.preventDefault();
        $("#btn-proyecto").click();
    }
});

function LoadPeriodosReporteEstimaciones() {
    var planAnual = $("#plananual").val();
    var proyectoN = $("#proyecto").val();
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

function LoadEstimaciones() {
    var planAnual = $("#plananual").val();
    var proyectoN = $("#proyecto").val();
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtEstimacionesVISA/${planAnual}/${proyectoN}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let monto_ejecutado = 0, monto_estimacion = 0, pagado = 0, pendiente = 0;
            $("#table-estimaciones > tfoot, #table-estimaciones > tbody").html(null);
            val.forEach((item) => {
                let col = $(`<tr>
                    <td class="spacer"></td>
                    <td >
                        <a style="cursor:pointer" class="action-icon hover-blue btn-bitacora" data-toggle="popover"
                            data-trigger="hover" data-content="Imprimir" data-placement="top" title="Consulta bítacora de estimación"
                            data-estimacion="${item.EstimacionCorr}">
                            <i class="fas fa-archive fa-lg fa-fw"></i>
                        </a>
                        <a style="cursor:pointer" class="action-icon hover-blue btn-reporte-est" data-toggle="popover" data-trigger="hover"
                            data-content="Imprimir" data-placement="top" title="Consultar Estimación"
                            data-estimacion="${item.EstimacionCorr}" data-suspensiones="${item.TieneSuspensiones}">
                            <i class="fas fa-print fa-lg fa-fw"></i>
                        </a>
                        <a style="cursor:pointer" class="action-icon hover-blue btn-reparos-ob" data-toggle="popover" data-trigger="hover" 
                            data-content="Información" data-placement="top" title="Consultar reparos para el documento de cobro"
                            data-estimacion="${item.EstimacionCorr}">
                            <i class="fas fa-info-circle fa-lg fa-fw"></i>
                        </a>
                        <a style="cursor:pointer" class="action-icon hover-blue btn-CUR" data-toggle="popover" data-trigger="hover"
                            data-content="Información" data-placement="top" title="Consultar CUR" data-estimacion="${item.EstimacionCorr}">
                            <i class="fas fa-file fa-lg fa-fw"></i>
                        </a>
                        <a style="cursor:pointer" class="action-icon hover-blue btn-printRpt" data-toggle="popover" data-trigger="hover"
                            data-content="Imprimir" data-placement="top" data-estimacion="${item.EstimacionCorr}" >
                            <i class="fas fa-briefcase fa-lg fa-fw"></i>
                        </a>
                        <a style="cursor:pointer" class="action-icon hover-blue btn-Periodos" data-toggle="popover" data-trigger="hover" title='Ver períodos suspensión'
                            data-content="PeridosSuspension" data-placement="top" data-estimacion="${item.EstimacionCorr}" >
                            <i class="fas fa-eye fa-lg fa-fw"></i>
                        </a>
                    </td>
                    <td class="text-center">${item.AnioID}</td>
                    <td class="text-center">${item.ProyectoCodigo}</td>
                    <td class="text-center">${item.EstimacionCorr}</td>
                    <td class="text-center">${item.Periodo.replace(' -', '-')}</td>
                    <td class="text-right">${currency(item.MontoEjecutado, 'Q.')}</td>
                    <td class="text-right">${currency(item.MontoaRecibir, 'Q.')}</td>
                    <td class="text-right">${currency(item.MontoPagado, 'Q.')}</td>
                    <td class="text-right">${currency(item.MontoPendientePago, 'Q.')}</td>
                    <td class="text-right">${currency(item.DeudaXEstimacion, 'Q.')}</td>
                    <td class="text-right">${currency(item.SaldoReal, 'Q.')}</td>
                    <td class="text-center">${item.EstadoDesc}</td>
                    <td class="text-center">${item.DateModify}</td>
                    <td class="text-center">${formatDateNew(item.DateModify2)}</td>
                    <td class="text-center">${(item.DiasRecepcion || 0) + ' Días'}</td>
                    <td class="text-center">${item.Visor || ''}</td>
                    <td class="spacer"></td>
                </tr>`);
                monto_ejecutado += item.MontoEjecutado;
                monto_estimacion += item.MontoaRecibir;
                pagado += item.MontoPagado;
                pendiente += item.MontoPendientePago;
                col.data("item", item);
                $("#table-estimaciones").append(col).trigger("change")
            });
            if (val && val.length) {
                $("#table-estimaciones > tfoot").html(`<tr>
                    <td class="spacer"></td>
                    <td class="text-right font-weight-bolder">TOTAL</td>
                    <td colspan="4"></td>
                    <td class="text-right">${currency(monto_ejecutado, 'Q.')}</td>
                    <td class="text-right">${currency(monto_estimacion, 'Q.')}</td>
                    <td class="text-right">${currency(pagado, 'Q.')}</td>
                    <td class="text-right">${currency(pendiente, 'Q.')}</td>
                    <td colspan="7"></td>
                    <td class="spacer"></td>
                </tr>`);
            }
        },
        error: () => { }
    })
}

function LoadInformacionContratista() {
    var planAnual = $("#plananual").val();
    var proyectoN = $("#proyecto").val();
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtEmpresaXProyecto/${planAnual}/${proyectoN}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            if (val && val.length) {
                $(".data-contratista").removeClass('d-none');
                Object.entries(val[0]).forEach(x => {
                    var val = x[1];
                    if (typeof val == 'number') {
                        val = currency(val, 'Q.')
                    }
                    $(`#textspecial-${x[0]}`).html(val);
                });
                $(`#textspecial-proyecto`).html(proyectoN);
            } else {
                $(".data-contratista").addClass('d-none');
            }
        },
        error: () => { }
    })
}

function LoadTramos() {
    var planAnual = $("#plananual").val();
    var proyectoN = $("#proyecto").val();
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtProyectosTramo/${planAnual}/${proyectoN}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let total = 0;
            $("#table-tramos > tfoot, #table-tramos > tbody").html(null);
            val.forEach((item) => {
                let col = $(`<tr>
                    <td class="spacer"></td>
                    <td class="text-center">${item.TramoCodigo}</td>
                    <td class="text-center">${item.Departamento}</td>
                    <td class="text-left">${item.TramoDesc}</td>
                    <td class="text-center">${item.TramoLong} Kms</td>
                    <td class="spacer"></td>
                </tr>`);
                total += item.TramoLong;
                col.data("item", item)
                $("#table-tramos").append(col).trigger("change")
            })
            if (val && val.length) {
                $("#table-tramos > tfoot").html(`<tr>
                    <td class="spacer"></td>
                    <td colspan="3" class="text-right font-weight-bolder">TOTAL</td>
                    <td class="text-center">${total} Kms</td>
                    <td class="spacer"></td>
                </tr>`);
            }
        },
        error: () => {
            
        }
    })
}

function LoadRenglones() {
    var planAnual = $("#plananual").val();
    var proyectoN = $("#proyecto").val();
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtComponentesRenglones/${planAnual}/${proyectoN}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let total = 0;
            $("#table-renglones > tfoot, #table-renglones > tbody").html(null);
            val.forEach((item) => {
                let col = $(`<tr>
                    <td class="spacer"></td>
                    <td class="text-center">${item.RenglonCodCOVIAL}</td>
                    <td class="text-center">${item.ComponenteDesc}</td>
                    <td class="text-left">${item.ProyectoRenglonNombre}</td>
                    <td class="text-center">${item.Unidad}</td>
                    <td class="text-right">${currency(item.Cantidad)}</td>
                    <td class="text-right">${currency(item.RenglonPrecioUnitario, 'Q.')}</td>
                    <td class="text-right">${currency(item.Costo, 'Q.')}</td>
                    <td class="spacer"></td>
                </tr>`);
                total += item.Costo;
                col.data("item", item)
                $("#table-renglones").append(col).trigger("change")
            })
            if (val && val.length) {
                $("#table-renglones > tfoot").html(`<tr>
                    <td class="spacer"></td>
                    <td colspan="5" class="text-right font-weight-bolder">TOTAL</td>
                    <td colspan="2" class="text-right">${currency(total, 'Q.')}</td>
                    <td class="spacer"></td>
                </tr>`);
            }
        },
        error: () => { }
    })
}

function LoadSanciones() {
    var planAnual = $("#plananual").val();
    var proyectoN = $("#proyecto").val();
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtProyectosSanciones/${planAnual}/${proyectoN}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let total = 0;
            $("#table-sanciones > tfoot, #table-sanciones > tbody").html(null);
            val.forEach((item) => {
                let col = $(`<tr>
                    <td class="spacer"></td>
                    <td class="text-center">${item.ProyectoSancionCorrel}</td>
                    <td class="text-center">${item.ProyectoCodigo}</td>
                    <td class="text-left">${item.ResponsabilidadDesc}</td>
                    <td class="text-left">${item.RecurrenciaDesc}</td>
                    <td class="text-left">${item.Justificacion}</td>
                    <td class="text-right">${currency(item.SancionMonto, 'Q.')}</td>
                    <td class="text-center">${formatDateNew(item.FechaSancion)}</td>
                    <td class="spacer"></td>
                </tr>`);
                total += item.SancionMonto;
                col.data("item", item)
                $("#table-sanciones").append(col).trigger("change")
            })
            if (val && val.length) {
                $("#table-sanciones > tfoot").html(`<tr>
                    <td class="spacer"></td>
                    <td colspan="5" class="text-right font-weight-bolder">TOTAL</td>
                    <td class="text-right">${currency(total, 'Q.')}</td>
                    <td></td>
                    <td class="spacer"></td>
                </tr>`);
            }
        },
        error: () => { }
    })
}

function LoadPagos() {
    var planAnual = $("#plananual").val();
    var proyectoN = $("#proyecto").val();
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtPagosXProyecto/${planAnual}/${proyectoN}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let monto_estimacion = 0, monto_pagar = 0, isr = 0, total_recibir = 0;
            $("#table-pagos > tfoot, #table-pagos > tbody").html(null);
            val.forEach((item) => {
                let col = $(`<tr>
                    <td class="spacer"></td>
                    <td class="text-center">${item.AnioIDNomina}</td>
                    <td class="text-center">${item.NominaCorrel}</td>
                    <td class="text-center">${item.EstimacionCorr}</td>
                    <td class="text-right">${currency(item.MontoaRecibir, 'Q.')}</td>
                    <td class="text-right">${currency(item.MontoFac)}</td>
                    <td class="text-right">${currency(item.Isr, 'Q.')}</td>
                    <td class="text-right">${currency(item.TotalRecibe, 'Q.')}</td>
                    <td class="text-right">${item.Empresa}</td>
                    <td class="spacer"></td>
                </tr>`);
                monto_estimacion += item.MontoaRecibir;
                monto_pagar += item.MontoFac;
                isr = item.Isr;
                total_recibir += item.TotalRecibe;
                col.data("item", item)
                $("#table-pagos").append(col).trigger("change");
            });
            if (val && val.length) {
                $("#table-pagos > tfoot").html(`<tr>
                    <td class="spacer"></td>
                    <td colspan="3" class="text-right font-weight-bolder">TOTAL</td>
                    <td class="text-right">${currency(monto_estimacion, 'Q.')}</td>
                    <td class="text-right">${currency(monto_pagar, 'Q.')}</td>
                    <td class="text-right">${currency(isr, 'Q.')}</td>
                    <td class="text-right">${currency(total_recibir, 'Q.')}</td>
                    <td></td>
                    <td class="spacer"></td>
                </tr>`);
            }
        },
        error: () => { }
    })
}

function LoadClausulasAmpliaciones() {
    var planAnual = $("#plananual").val();
    var proyectoN = $("#proyecto").val();
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtenerClausulaPorProyecto/${planAnual}/${proyectoN}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            if (val && val.length) {
                LastColumn((val2) => {
                    Object.entries(Object.assign(val[0], val2[0])).forEach(x => {
                        var val = x[1];
                        if (typeof val == 'number') {
                            val = currency(val, 'Q.')
                        }
                        $(`#tdspecial-${x[0]}`).html(val);
                    });
                    $(`#tdspecial-totalPor`).html(currency(val[0].MontoPorClausulaCuarta + val[0].MontoPorClausulaQuinta + val[0].MontoPorClausulaSexta, 'Q'));
                    $(`#tdspecial-totalPagado`).html(currency(val[0].MontoPagadoClausulaCuarta + val[0].MontoPagadoClausulaQuinta + val[0].MontoPagadoClausulaSexta, 'Q'));
                    $(`#tdspecial-totalPendiente`).html(currency(val[0].MontoPendienteClausulaCuarta + val[0].MontoPendienteClausulaQuinta + val[0].MontoPendienteClausulaSexta, 'Q'));
                    $(`#tdspecial-totalSinEstimar`).html(currency(val2[0].MontoSinEstimar + val2[0].MontoSinEstimar4 + val2[0].MontoSinEstimar6, 'Q'));
                });

            } else {
                $("#table-montos > tbody > tr > td").html("Q0.00");
            }
        },
        error: () => { }
    })
}

function LastColumn(callback) {
    var planAnual = $("#plananual").val();
    var proyectoN = $("#proyecto").val();
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtenerClausulaSinEstimacionPorProyecto/${planAnual}/${proyectoN}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            callback(val);
        },
        error: () => { }
    });
}

function LoadEjecucionClausulas() {
    var planAnual = $("#plananual").val();
    var proyectoN = $("#proyecto").val();
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtenerDetalleEjecucionClausulas/${planAnual}/${proyectoN}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $("#table-clausulas > tbody").html(null);
            val.forEach((item) => {
                let col = $(`<tr>
                    <td class="spacer"></td>
                    <td class="text-center">${item.EstimacionCorrel}</td>
                    <td class="text-center">${item.Descripcion}</td>
                    <td class="text-right">${currency(item.MontoPorClausula, 'Q.')}</td>
                    <td class="text-right">${currency(item.MontoPagadoClausula, 'Q.')}</td>
                    <td class="text-right">${currency(item.MontoPendienteClausula, 'Q.')}</td>
                    <td class="text-center">${item.Departamento}</td>
                    <td class="spacer"></td>
                </tr>`);
                col.data("item", item)
                $("#table-clausulas").append(col).trigger("change");
            });
        },
        error: () => { }
    })
}


function currency(numero, prefix = '', sufix = '') {
    return `${prefix}${numero.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}${sufix}`;
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


//-----------Logica Para Los Modales--------------

//----------- Modal Bitacora ---------------
$("table#table-estimaciones").on("click", ".btn-bitacora", (e) => {
    $("#proyecto-bitacora").val($("#proyecto").val());
    $("#fecha-bitacora").val($("#plananual").val());
    $("#estimacion-bitacora").val(e.currentTarget.dataset.estimacion || 0);
    LoadTableBitacoras();
    $("#ModalBitacoraEstimacion").modal("show");
   
});

$("table#table-estimaciones").on("click", ".btn-Periodos", (e) => {
    var vProyectoCodigo = $("#proyecto").val();
    var vPlan = $("#plananual").val();
    var vEstimacionCorr = e.currentTarget.dataset.estimacion;

    $.ajax({
        url: `${urlbase}api/Suspensiones/GetPeriodosEstimacionSuspension/${vPlan}/${vProyectoCodigo}/${vEstimacionCorr}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            console.log(val)
            if (val.length > 0) {
                $('#tablePeriodosSuspensiones').dataTable().fnClearTable();
                $('#tablePeriodosSuspensiones').dataTable().fnDestroy();
                let cols = val.map((item) => `                                               
                            <tr>
                                <td class="spacer bg-light" ></td >
                                <td>
                                    ${item.NoActaSuspension}
                                </td>
                                <td>
                                    ${item.NombreTipoPeriodo}    
                                </td>
                                <td>
                                    ${item.Periodo}
                                </td>
                                <td>
                                    ${item.DiasAfectados}
                                </td>
                                <td class="spacer bg-light" ></td >
                            </tr >  `);
                $.LoadingOverlay("hide");
                $("#tablePeriodosSuspensiones tbody").html(cols.join(""))
                fnInicializaTablePeriodosSuspensiones();
                $("#winPeriodosSuspension").modal("show");
            }
            else {
                Swal.fire({
                    icon: 'info',
                    title: 'Atención',
                    text: 'Esta estimación no cuenta con suspensiones',
                    confirmButtonText: 'Aceptar',
                })
                $.LoadingOverlay("hide");
                //$('#tablePeriodosSuspensiones').DataTable().clear().draw();
            }
        },
        error: (error) => {
            Swal.fire("", error.message, "error");
        }
    })
    //$("#winPeriodosSuspension").modal("show");
});

function fnInicializaTablePeriodosSuspensiones() {
    $('#tablePeriodosSuspensiones').dataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        //scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin períodos para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ períodos",
            "infoEmpty": "Mostrando 0 de 0 de 0 períodos",
            "infoFiltered": "(Filtrado de _MAX_ total períodos)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ períodos",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay períodos encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}


function LoadTableBitacoras() {
    var planAnual = $("#fecha-bitacora").val();
    var proyectoN = $("#proyecto-bitacora").val();
    var estimacion = $("#estimacion-bitacora").val();
    var id = $("#search-bitacora").val().trim();
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtenerEstimacionBitacoraID/${planAnual}/${proyectoN}/${estimacion}/${id ? id : 0}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            table_create_bitacoras(val);
        },
        error: () => {
            table_create_bitacoras([]);
        }
    })
}

function table_create_bitacoras(data) {
    $("#table-bitacoras-estimacion").DataTable({
        language: {
            url: `../DataTables/lenguaje_es.json`
        },
        data: data,
        columns: [
            { data: 'null', className: 'spacer', title: '', render: () => '' },
            { data: 'AnioID', title: 'Año' },
            { data: 'ProyectoCodigo', title: 'Proyecto' },
            { data: 'EstimacionCorr', title: 'Estimación' },
            { data: 'EstadoInicial', title: 'Estado Inicial' },
            { data: 'EstadoFinal', title: 'Estado Final' },
            { data: 'Nombre', title: 'Usuario que Modificó' },
            { data: 'DateModify', title: 'Fecha', render: (data) => formatDateNew(data) },
            { data: 'null', className: 'spacer', title: '', render: () => '' },
        ],
        searching: true,
        ordering: false,
        destroy: true,
        lengthMenu: [10],
        sDom: "<tr><'row'<'col-lg-12 d-flex justify-content-md-end justify-content-center align-items-center flex_wrap_c'p<'add-update-datatable'>>>",
        sPaginationType: "full_numbers"
    });
}

$("#btn-search-bitacora").on("click", () => {
    LoadTableBitacoras();
});

$("#btnImprimirBitacora").on("click", () => {
    var planAnual = $("#fecha-bitacora").val();
    var proyectoN = $("#proyecto-bitacora").val();
    var estimacion = $("#estimacion-bitacora").val();
    opendialog("/visorinformes.aspx?IDreporte=64&Parameters=" + planAnual + "," + proyectoN + "," + estimacion);

});

$(".table-responsive").on("click", "#table-bitacoras-estimacion_wrapper .add-update-datatable", () => {
    LoadTableBitacoras();
});

// --------Modal CUR -------------

$("table#table-estimaciones").on("click", ".btn-CUR", (e) => {
    $('#collapseCUR').collapse("hide");
    $("#cur_isr2, #cur_descuento_iva2, #cur_retencion2").prop('checked', false).trigger('change');
    EstimacionFacturas(e.currentTarget.dataset.estimacion || 0);
    Estado();
    vModalCurEStimacionCorrel = e.currentTarget.dataset.estimacion;
    Pagos(e.currentTarget.dataset.estimacion || 0);

    $("#ModalCUR").modal("show");
});


// --------Modal Períodos Suspensión -------------
$("table#table-estimaciones").on("click", ".btn-CUR", (e) => {
    $('#collapseCUR').collapse("hide");
    $("#cur_isr2, #cur_descuento_iva2, #cur_retencion2").prop('checked', false).trigger('change');
    EstimacionFacturas(e.currentTarget.dataset.estimacion || 0);
    Estado();
    vModalCurEStimacionCorrel = e.currentTarget.dataset.estimacion;
    Pagos(e.currentTarget.dataset.estimacion || 0);

    $("#ModalCUR").modal("show");
});

var estimacion = null;
$("table#table-estimaciones").on("click", ".btn-reporte-est", (e) => {
    var proyectoN = $("#proyecto").val();
    $("#reporte-text-proyecto").html(proyectoN);
    estimacion = e.currentTarget.dataset.estimacion;
    tieneSuspensiones = e.currentTarget.dataset.suspensiones;
    $("#reporte-text-estimacion").html(e.currentTarget.dataset.estimacion);
    $("#estimacionActaEstimacion").html(e.currentTarget.dataset.estimacion);

    const estimacioni = e.currentTarget.dataset.estimacion;
    const planAnuali = $("#plananual").val();
    const proyectoNi = $("#proyecto").val();
    fnCargarDatosActaEstimacion();
    $.ajax({
        url: `${urlbase}api/contador/obtenerInformacionContador/${planAnuali}/${proyectoNi}/${estimacioni}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
           // console.log(val)
            if ( val != '' ) {
                
               
                $('#nombreContador').val(val[0].Nombre);
                $('#nitContador').val(val[0].NIT);
            } else {
                
                $('#nombreContador').val('');
                $('#nitContador').val('');
            }

        },
        error: (xhr, status, error) => {
            console.log(xhr);
            console.log(status)
            console.log(error)
        }
    });



    $("#reporteEstimaciones").modal("show");
});

$("table#table-estimaciones").on("click", ".btn-printRpt", (e) => {
    var planAnual = $("#plananual").val();
    var proyectoN = $("#proyecto").val();
    var est = e.currentTarget.dataset.estimacion || 0;
    opendialog("/visorinformesSti.aspx?reporteID=98&AnioID=" + planAnual + "&Encabezado=1&ProyectoCodigo=" + proyectoN + "&EstimacionCorr=" + est);

});

function Estado() {
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtCatCurEstado`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let options = val.map((val) => new Option(val.EstadoDesc, val.EstadoCurID));
            $('#cur-estado').html(options).trigger("change");
        },
        error: () => { }
    });
}

$('#collapseCUR').on('shown.bs.collapse', function () {
    $("#title-cur-facturas").html("Ocultar Facturas");
})

$('#collapseCUR').on('hidden.bs.collapse', function () {
    $("#title-cur-facturas").html("Mostrar Facturas");
})

function EstimacionFacturas(estimacion) {
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtenerEstimacionFactura/${$("#plananual").val()}/${$("#proyecto").val()}/${estimacion}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $("#table-facturas > tbody").html(null);
            val.forEach((item) => {
                let col = $(`<tr>
                    <td class="spacer"></td>
                    <td class="text-center" style="font-size: 11px"><a class="text-primary">Asignar</a></td>
                    <td style="font-size: 11px">${item.Serie}</td>
                    <td class="text-center" style="font-size: 11px">${item.NoFactura}</td>
                    <td class="text-right" style="font-size: 11px">${currency(item.MontoFac, 'Q.')}</td>
                    <td class="spacer"></td>
                </tr>`);
                col.data("item", item)
                $("#table-facturas").append(col).trigger("change");
            });
        },
        error: () => { }
    });
}

let pagos = null;
function Pagos(estimacion) {
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtUnPagoEstimacion/${$("#plananual").val()}/${$("#proyecto").val()}/${estimacion}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            pagos = val;
            let options = val.map((val) => new Option(val.PagoCorre, val.PagoCorre));
            $('#cur-correlativo-pago').html(options).trigger("change");
        },
        error: () => { }
    });
}

$("#cur_isr2, #cur_descuento_iva2, #cur_retencion2").on('change', (e) => {
    $('#' + e.currentTarget.id.replace('2', '')).prop('disabled', !e.currentTarget.checked)
    $('#' + e.currentTarget.id.replace('2', '')).val(0);
});
$("#cur_descuento_iva2").on('change', (e) => {
    let checkIva = $('input:checkbox[name=iva]:checked').val()
    if (checkIva) {
        vDescuentoIva = vMontoFactura - (vMontoFactura / 1.12)
        $("#cur_descuento_iva").val(currency(vDescuentoIva, 'Q'))
    } else {
        vDescuentoIva = 0;
        $("#cur_descuento_iva").val(0)
    }



});
$("#cur_retencion2").on('change', (e) => {
    let checkDescuentoIva = $('input:checkbox[name=descuentoIva]:checked').val()
    if (checkDescuentoIva) {
        vDescuento25porciento = (vMontoFactura - (vMontoFactura / 1.12)) / 4;
        $("#cur_retencion").val(currency(vDescuento25porciento, 'Q'))
    } else {
        vDescuento25porciento = 0;
        $("#cur_retencion").val(0)
    }

});

$("#cur_isr2").on('change', (e) => {

    let checkIsr = $('input:checkbox[name=isr]:checked').val()
    if (checkIsr) {
        MontoIsrIva = (vMontoFactura / 1.12);
        if (vAnioNomina >= 2014) {
            if (MontoIsrIva > 30000) {
                calculoIsr = ((MontoIsrIva - 30000) * 0.07) + 1500;
            }
            else {
                calculoIsr = MontoIsrIva * 0.05;
            }
        }
        else {
            calculoIsr = MontoIsrIva * 0.06
        }

        $("#cur_isr").val(currency(calculoIsr, 'Q'))
    } else {
        vDescuento25porciento = 0;
        $("#cur_isr").val(0)
    }

});

$("#cur-correlativo-pago").on("change", (e) => {

    var PagoCorrelativo = e.currentTarget.value;
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtEstimacionPorPagos/${$("#plananual").val()}/${$("#proyecto").val()}/${vModalCurEStimacionCorrel}/${PagoCorrelativo}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let objDetallePago = val[0];
            vMontoFactura = objDetallePago.MontoFac
            vAnioNomina = objDetallePago.AnioIDNomina;
            vAnioID = objDetallePago.AnioID;
            vProyectoCodigo = objDetallePago.ProyectoCodigo;

            $("#cur-AnioID").html(objDetallePago.AnioID)
            $("#cur-ProyectoCodigo").html(objDetallePago.ProyectoCodigo)
            $("#cur-EstimacionCorr").html(objDetallePago.EstimacionCorr)
            if (objDetallePago.FechaFactura == "Factura pendiente de ingreso") {
                $("#cur-FechaFactura").html(objDetallePago.FechaFactura)
            }
            else {
                $("#cur-FechaFactura").html(formatDateNew(objDetallePago.FechaFactura))
            }
            $("#cur-MontoFactura").html(currency(objDetallePago.MontoFac, 'Q'))
            $("#cur_isr").val(currency(objDetallePago.Isr, 'Q'))
            $("#cur_descuento_iva").val(currency(objDetallePago.IVA, 'Q'))
            $("#cur_retencion").val(currency(objDetallePago.DescuentoIVA, 'Q'))
            if (objDetallePago.EstadoISR) {
                $("#cur_isr2").prop('checked', true).trigger('change')
            }
            else {
                $("#cur_isr2").prop('checked', false).trigger('change');
            }

            if (objDetallePago.EstadoIVA) {
                $("#cur_descuento_iva2").prop('checked', true).trigger('change')
            }
            else {
                $("#cur_descuento_iva2").prop('checked', false).trigger('change');
            }

            if (objDetallePago.EstadoRetencion) {
                $("#cur_retencion2").prop('checked', true).trigger('change')
            }
            else {
                $("#cur_retencion2").prop('checked', false).trigger('change');
            }



            $("#cur-NoCurr").html(objDetallePago.NoCur)
            $("#cur-TotalRecibe").html(currency(objDetallePago.TotalRecibe, 'Q'))
            $("#cur-NoFactura").html(objDetallePago.NoFactura)
            $("#cur-nota-credito").html(objDetallePago.NotaDebito)
            $("#cur-fecha-nomina").html(objDetallePago.AnioIDNomina)
            $("#cur-nomina").html(objDetallePago.NominaCorrel)
            $("#cur-num").val(objDetallePago.NoCur)
            $("#cur-fecha").val(formatDateNew(objDetallePago.FechaAcreditamiento));

            fnObtenerRoles();
        },
        error: () => { }
    });


    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtenerIsrIvaEstimaciones/${$("#plananual").val()}/${$("#proyecto").val()}/${vModalCurEStimacionCorrel}/${PagoCorrelativo}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $('#cur-documentos-isr-iva').html('');
            vDocsDescargar = val;
            if (vDocsDescargar.length > 0) {
                let options = val.map((val) => new Option(val.Descripcion, val.Id));
                $('#cur-documentos-isr-iva').append(options).trigger("change");
            }

        },
        error: () => { }
    });

    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtUnPagoSIEstimacion/${$("#plananual").val()}/${$("#proyecto").val()}/${vModalCurEStimacionCorrel}/${PagoCorrelativo}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            vFilas = val.length;
            if (vFilas == 1) {
                vEstadoAprobado = true
                $("#btnDesaprobar").html("DESAPROBAR PAGO")
                $("#cur-estado-pago").html("Pagado")
            } else {
                vEstadoAprobado = false
                $("#btnDesaprobar").html("APROBAR PAGO")
                $("#cur-estado-pago").html("Pendiente de PAgo")
            }
        },
        error: () => { }
    });
});

$("#cur-operar").on("click", () => {
    if (evaluarOperar()) return;
    let vDescuentos = vDescuentoIva + vDescuento25porciento + calculoIsr;
    let vTotalRecibe = vMontoFactura - vDescuentos;
    var data = {
        "AnioID": $("#plananual").val(),
        "ProyectoCodigo": $("#proyecto").val(),
        "EstimacionCorr": parseFloat($("#cur-EstimacionCorr").html()),
        "PagoCorre": parseFloat($("#cur-correlativo-pago").val()),
        "isr": calculoIsr,
        "IVA": vDescuentoIva,
        "DescuentoIVA": vDescuento25porciento,
        "TotalRecibe": parseFloat(vTotalRecibe),
        "EstadoISR": $("#cur_isr2").prop("checked"),
        "EstadoIVA": $("#cur_descuento_iva2").prop("checked"),
        "EstadoRetencion": $("#cur_retencion2").prop("checked")
    };
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ActualizaMontoPago`,
        type: "POST",
        data: JSON.stringify(data),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            if (val) {
                $(`#cur-descuentos`).html(currency(vDescuentos, 'Q.'));
                $(`#cur-TotalRecibe`).html(currency(data.TotalRecibe, 'Q.'));
                Swal.fire({ icon: 'success', title: 'Se actualizo correctamente', showConfirmButton: false, timer: 1250 });
            } else {
                Swal.fire({ icon: 'error', title: 'No se actualizo correctamente', showConfirmButton: false, timer: 1250 });
            }
        },
        error: () => { }
    });
});

// --------Modal Reparos y Observaciones -------------

$("table#table-estimaciones").on("click", ".btn-reparos-ob", (e) => {
    var planAnual = $("#plananual").val();
    var proyectoN = $("#proyecto").val();
    var estimacion = e.currentTarget.dataset.estimacion || 0
    var programa_codigo = proyectoN.substr(0, proyectoN.indexOf("-"));
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtenerConsultaReparo/${proyectoN}/${estimacion}/${planAnual}/${programa_codigo}`,
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
                        <a style="cursor:pointer" class="action-icon hover-dark btn-reporte-reparo" data-toggle="popover"
                            data-trigger="hover" data-content="Imprimir" data-placement="top" title=""
                            data-reparo="${data}" data-estimacion="${row['EstimacionCorr']}" data-index="${indexes.row}" data-guia="${row['GuiaVisadoCorr']}">
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

$('table#table-reparos').on('click', 'tbody tr .btn-observaciones-reparo', function (e) {
    var planAnual = $("#plananual").val();
    var proyectoN = $("#proyecto").val();
    var reparo = e.currentTarget.dataset.reparo || 0;
    var estimacion = e.currentTarget.dataset.estimacion || 0;
    var index = e.currentTarget.dataset.index || 0;
    var child = table.row(e.currentTarget.parentElement.parentElement.parentElement).child;
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
    var planAnual = $("#plananual").val();
    var proyectoN = $("#proyecto").val();
    var reparo = e.currentTarget.dataset.reparo || 0;
    var estimacion = e.currentTarget.dataset.estimacion || 0;
    var guia = e.currentTarget.dataset.guia || 0;
    opendialog("/visorinformes.aspx?IdReporte=22&Parameters=" + reparo + "," + proyectoN + "," + estimacion + "," + planAnual + "," + guia);

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


$("#btnImprimir").on("click", () => {
    var planAnual = $("#plananual").val();
    var proyectoN = $("#proyecto").val();
    //debugger;
    opendialog("/visorinformesSti.aspx?reporteID=170332&AnioID=" + planAnual + "&ProyectoCodigo=" + proyectoN);
})

$("#btn-print-reporte").on("click", () => {
    var planAnual = $("#plananual").val();
    var proyectoN = $("#proyecto").val();
    var value = $('input[name="tipoFiltro"]:checked').val()


    if (value == "estimacion caratula") {
        var esunica = $("#estimacion-unica-caratura").prop("checked") ? "Estimación%20Unica" : "Estimación%20No%20" + estimacion;
        var codigo_supervisor = "";
        var reporte = "3200";
        opendialog(`/VisorInformesSti?ReporteID=${reporte}&AnioID=${planAnual}&ProyectoCodigo=${proyectoN}&EstimacionCorr=${estimacion}&ProyectoSupervisionCodigo=${codigo_supervisor}&NombreEmpresa=&EsUnica=${esunica}`);
    } else if (value == 'vReporteCertificadoContador') {

        let dataEnviar = {
            "AnioID": planAnual,
            "ProyectoCodigo": proyectoN,
            "EstimacionCorr": estimacion,
            "NombreNuevoContador": $('#nombreContador').val(),
            "NitNuevoContandor": $('#nitContador').val(),
            "myuser": usuario
        };
        
        

        if ($('#nombreContador').val() == '' || $('#nitContador').val() == '') {
            Swal.fire({ icon: 'warning', title: 'Escriba un contador para imprimir el certificado', showConfirmButton: true });
        } else {

            $.ajax({
                url: `${urlbase}api/contador/VerificarGuardarContador`,
                type: "POST",
                data: JSON.stringify(dataEnviar),
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: (val) => {
                    
                },
                error: (xhr,status,error) => {
                    console.log(xhr);
                    console.log(status);
                    console.log(error);
                }
            });


            //Certificado del contador
            var reporte = "1111";
           // console.log("Reporte: ", reporte, "Plan Anual: ", planAnual, "Proyecto Codigo: ", proyectoN, "Estimacion: ", estimacion)
            opendialog(`/VisorInformessti?ReporteID=${reporte}&AnioID=${planAnual}&ProyectoCodigo=${proyectoN}&EstimacionCorr=${estimacion}`);
        }


        
    }
    else if (value == 'vReporteEstimacion') {
        let estimacionCorr_Es = estimacion;
        let planAnual_Es = planAnual;
        let proyectoCod_Es = proyectoN.toUpperCase();
        let NoActa = $("#numeroacta").val();
        let horaActa = $("#horaActa").val().split(' ');
        let fechaActaIn = $("#fechaActaIn").val();
        let NombreEncargadoPE = $("#nombreEncargadoP").val();
        let NombreEncargadoPS = $("#nombreEncargadoS").val();
        // validacion sobre El o LA + titulo encargado y titulo supervisor        
        let tituloPEC = $("#tituloEncargadoP").val();
        let tituloPES = tituloPEC.split(' ');
        let tituloPE = tituloPES[0].toLowerCase(); 
        let ultimaLetra = tituloPE[tituloPE.length - 1];
        let tituloEncargadoPE = ultimaLetra == 'o' ? 'El ' + tituloPEC : 'La ' + tituloPEC;

        let tituloPSC = $("#tituloEncargadoS").val();
        let tituloPSS = tituloPSC.split(' ');
        let tituloPS = tituloPSS[0].toLowerCase();
        let ultimaLetraS = tituloPS[tituloPS.length - 1];
        let tituloEncargadoPS = ultimaLetraS == 'o' ? 'el ' + tituloPSC : 'la ' + tituloPSC;

        let proyecto = $('#proyecto').val().split('-');
        let proyectosCon = ["C", "CE"];

        if (proyectosCon.includes(proyecto[0].toUpperCase())) {
            tituloEncargadoPE = ultimaLetra == 'o' ? 'el ' + tituloPEC : 'la ' + tituloPEC;
        }

        // fin  validacion sobre El o LA + titulo encargado y titulo supervisor
        let fechaN = $("#fechaNombramiento").val().split("/");
        let fechaNombramiento = new Date(fechaN[2] +"-"+ fechaN[1] +"-"+ fechaN[0]);
        let mes = fechaNombramiento.toLocaleString('es-ES', { month: 'long' });
        let numeroDia = fechaNombramiento.getDate() + 1;
        let anio = fechaNombramiento.getFullYear();
        let FechaDelNombramiento =  numeroDia + ' de ' + mes + ' de ' + anio;
        

        //fecha del nombramiento
        let numFolio = "FOLIO " + $("#numeroFolio").val();
        let codProyectoLetras =  fnDividirCodProyecto();

        const reporte = "2222";
        let validacion = fnValidarCamposActaEstimacion();
        //let texto = validacion.split(',');
        //aDiarios = cadena.split(",");
        let filter = validacion.filter(dato => dato != "");
        console.log(filter)
        let campos = (filter.length > 1 ? "Hay varios campos vacíos, por favor complételos para continuar " : "Complete el campo faltante para continuar")
        if (filter.length == 0) {
            fnValidarRegistroActa();
            opendialog(`/VisorInformessti?ReporteID=${reporte}&AnioID=${planAnual_Es}&ProyectoCodigo=${proyectoCod_Es}&EstimacionCorr=${estimacionCorr_Es}&NoActaEstimacion=${NoActa}&horaActa=${horaActa[0]}&fechaActaIn=${fechaActaIn}&NombreEncargadoPE=${NombreEncargadoPE}&NombreEncargadoPS=${NombreEncargadoPS}&TituloEncargadoPE=${tituloEncargadoPE}&TituloEncargadoPS=${tituloEncargadoPS}&noFolio=${numFolio}&CodigoProyLetras=${codProyectoLetras}&FechaDelNombramiento=${FechaDelNombramiento}`);           
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: " ",
                confirmButtonText: 'Aceptar'
            })
            $("#swal2-content").append(`${campos}`);
        } 
    }
    else if (value == "caratula financiera") {
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
        //reporte = $("#estimacion-unica-renglones").prop("checked") ? "500" : "511";
        //opendialog(`/VisorInformes.aspx?idreporte=${reporte}&parameters=${planAnual},${proyectoN},${estimacion}`);
        if ($("#estimacion-unica-renglones").prop("checked")) {
            opendialog(`/VisorInformes.aspx?idreporte=500&parameters=${planAnual},${proyectoN},${estimacion}`);
        } else { 
            opendialog(`/VisorInformesSti.aspx?ReporteID=${reporte}&AnioID=${planAnual}&ProyectoCodigo=${proyectoN}&EstimacionCorr=${estimacion}`);
        } 
    } else if (value == "cuadroEstimacion") {
        var reporte = "";
        // reporte = tieneSuspensiones == "false" ? "5700" : "5702";
        reporte = "5702";
        var esunica = $("#estimacion-unica-sabana").prop("checked") ? "Única" : `No%20${estimacion}`;

        opendialog(`/VisorInformesSti.aspx?ReporteID=${reporte}&AnioID=${planAnual}&ProyectoCodigo=${proyectoN}&EstimacionCorr=${estimacion}&EstimacionU=${esunica}`);
    } else if (value == "recomendacionPago") {
        var esempresa = $("#empresa-check7").prop("checked") ? true : false;
        //opendialog(`/RecomendacionPagoSupervisor.aspx?AnioID=${planAnual}&codigoproyecto=${proyectoN}&Correlativo=${estimacion}&Delegado=123`);
        window.open(`../RecomendacionPagoSupervisor.aspx?AnioID=${planAnual}&codigoproyecto=${proyectoN}&Correlativo=${estimacion}&Delegado=${esempresa}`, '_blank')
    } else if (value == "ReporteSuspension") {
        //var chkSusp = $("#Suspensiones-check8").prop("checked") ? true : false;        
        var vReporte = 'rptReporteSuspencionesEstimacion.mrt';
        var QueryString = '?Parameters=' + planAnual + ',"' + proyectoN + '",' + estimacion + '&IdReporte=5' + '&Reporte=' + vReporte;
        var url = "../FrmVisorReporte.aspx" + QueryString;
        var params = [
            'height=' + screen.height,
            'width=' + screen.width,
            'fullscreen=yes' // only works in IE, but here for completeness
        ].join(',');
        window.open(url, '_blank', params);
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

function fnAplicarRoles() {


}

//valida usando pattern en input para no usar caracteres extraños
const fnValidarNIT = () => {
    let prevVal = "";
    document.querySelector('#nitContador').addEventListener('input', function (e) {
        if (this.checkValidity()) {
            prevVal = this.value;
        } else {
            this.value = prevVal;
        }
    });
}

//valida usando pattern en input para no usar caracteres extraños
const fnValidarNombre = () => {
    let prevVal = "";
    document.querySelector('#nombreContador').addEventListener('input', function (e) {
        if (this.checkValidity()) {
            prevVal = this.value;
        } else {
            this.value = prevVal;
        }
    });
}

//valida usando pattern en input para no usar caracteres extraños
const fnValidarNoActa = () => {
    let prevVal = "";
    document.querySelector('#numeroacta').addEventListener('input', function (e) {
        if (this.checkValidity()) {
            prevVal = this.value;
        } else {
            this.value = prevVal;
        }
    });
}

//valida usando pattern en input para no usar caracteres extraños
const fnValidarNombreEncargadoProyecto = () => {
    let prevVal = "";
    document.querySelector('#nombreEncargadoP').addEventListener('input', function (e) {
        if (this.checkValidity()) {
            prevVal = this.value;
        } else {
            this.value = prevVal;
        }
    });
}

//valida usando pattern en input para no usar caracteres extraños
const fnValidarNombreEncargadoProyectoS = () => {
    let prevVal = "";
    document.querySelector('#nombreEncargadoS').addEventListener('input', function (e) {
        if (this.checkValidity()) {
            prevVal = this.value;
        } else {
            this.value = prevVal;
        }
    });
}
//valida usando pattern en input para no usar caracteres extraños
const fnValidarNumeroFolio = () => {
    let prevVal = "";
    document.querySelector('#numeroFolio').addEventListener('input', function (e) {
        if (this.checkValidity()) {
            prevVal = this.value;
        } else {
            this.value = prevVal;
        }
    });
}
//valida usando pattern en input para no usar caracteres extraños
const fnValidarTituloEncargadoP = () => {
    let prevVal = "";
    document.querySelector('#tituloEncargadoP').addEventListener('input', function (e) {
        if (this.checkValidity()) {
            prevVal = this.value;
        } else {
            this.value = prevVal;
        }
    });
}
//valida usando pattern en input para no usar caracteres extraños
const fnValidarTituloEncargadoS = () => {
    let prevVal = "";
    document.querySelector('#tituloEncargadoS').addEventListener('input', function (e) {
        if (this.checkValidity()) {
            prevVal = this.value;
        } else {
            this.value = prevVal;
        }
    });
}





$(document).ready(function () {
    $("#fechaCur").datetimepicker({
        format: "DD/MM/YYYY",
        useCurrent: false
    })
    fnValidarNIT();
    fnValidarNombre();
    fnValidarNoActa();
    fnValidarNombreEncargadoProyecto();
    fnValidarNombreEncargadoProyectoS();
    fnValidarNumeroFolio();
    fnValidarTituloEncargadoP();
    fnValidarTituloEncargadoS();

    fnObtenerTipoPago();
    var fecha = new Date();
    let day = fecha.getDate()
    let month = fecha.getMonth() + 1
    let year = fecha.getFullYear();
    let fechaActual = `${Pad(month, 2)}/${Pad(day, 2)}/${year}`;

    $("#btnAbrirCur").on("click", () => {
        var QueryString = '?EstimacionCorr=' + vModalCurEStimacionCorrel + '&AnioID=' + vAnioID + '&ProyectoCodigo=' + vProyectoCodigo;
        var url = "frmCur.aspx" + QueryString;
        window.open(url, '_blank');
        window.focus();

    })
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

    $("#cur-documentos-isr-iva").on("change", (e) => {
        let vIdDocumento = e.currentTarget.value;
        if ((vDocsDescargar.length > 0) && (vIdDocumento != "")) {
            let vFiltrado = vDocsDescargar.find(({ Id }) => Id == vIdDocumento)
            if (vFiltrado != undefined) {
                vNombreArchivoISRIVA = vFiltrado.NombreArchivo;
                vRutaArchivoISRIVA = vFiltrado.Ruta;

            }

        }



    })
    $("#btnDescargar").on("click", () => {
        var url = "../Documentos/ISR_IVA/" + vNombreArchivoISRIVA;
        var win = window.open(url, '_blank');
        win.focus();

    })
    $("#btnGuardar").on("click", () => {
        let vNumeroCur = $("#cur-num").val();
        let vFechaAcreditacion = $("#cur-fecha").val();
        let vEstadoCur = $("#cur-estado").val();
        let vTipoPago = $("#cur-tipoPago").val();

        var dataEnviar = {
            "AnioID": vAnioID,
            "ProyectoCodigo": vProyectoCodigo,
            "EstimacionCorr": vModalCurEStimacionCorrel,
            "PagoCorre": parseFloat($("#cur-correlativo-pago").val()),
            "NoCur": vNumeroCur,
            "TipoPagoID": vTipoPago,
            "FechaAcreditamiento": moment(vFechaAcreditacion, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            "EstadoCurID": vEstadoCur
        };
        if ((vAnioID != '') && (vFechaAcreditacion != '')) {
            $.ajax({
                url: `${urlbase}api/ConsultaEstimacionesDetallada/ActualizaPagoCUR`,
                type: "POST",
                data: JSON.stringify(dataEnviar),
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: (val) => {
                    if (val == 1) {

                        Swal.fire({ icon: 'success', title: 'Se guardaron los datos correctamente', showConfirmButton: false, timer: 1500 });
                    } else {
                        Swal.fire({ icon: 'error', title: 'No se guardaron los datos', showConfirmButton: false, timer: 1500 });
                    }
                },
                error: () => { }
            });
        }
        else {

            Swal.fire({ icon: 'warning', title: 'Faltan datos por ingresar', showConfirmButton: false, timer: 1250 });
        }



    })


    $("#btnDesaprobar").on("click", () => {

        let planAnual = $("#plananual").val();
        let vProyecto = $("#proyecto").val();
        let vpagoCorrelativo = parseFloat($("#cur-correlativo-pago").val())

        Swal
            .fire({
                title: "Estado de Pago",
                text: "¿Esta  Seguro de Modificar el Estado de Pago?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: "Sí",
                cancelButtonText: "Cancelar",
            })
            .then(resultado => {
                if (resultado.value) {
                    var dataEnviar = {
                        "AnioID": planAnual,
                        "ProyectoCodigo": vProyecto,
                        "EstimacionCorr": vModalCurEStimacionCorrel,
                        "PagoCorre": vpagoCorrelativo,
                        "PagoAprobado": !vEstadoAprobado,
                        "UserName": usuario
                    };
                    $.ajax({
                        url: `${urlbase}api/ConsultaEstimacionesDetallada/AprobarPagos`,
                        type: "POST",
                        data: JSON.stringify(dataEnviar),
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Content-Type": "application/json",
                        },
                        success: (val) => {
                            if (val >= 1) {

                                Swal.fire({ icon: 'success', title: 'Se guardaron los datos correctamente', showConfirmButton: false, timer: 1500 });
                            } else {
                                Swal.fire({ icon: 'error', title: 'No se guardaron los datos', showConfirmButton: false, timer: 1500 });
                            }
                        },
                        error: (val) => { }
                    });
                    //$.ajax({
                    //    url: `${urlbase}api/ConsultaEstimacionesDetallada/AprobarPagos/${planAnual}/${vProyecto}/${vModalCurEStimacionCorrel}/${vpagoCorrelativo}/${false}/${usuario}`,
                    //    headers: {
                    //        "Authorization": "Bearer " + token,
                    //        "Content-Type": "application/json",
                    //    },
                    //    success: (val) => {
                    //        if (val) {
                    //            vEstadoAprobado = false
                    //            $("#btnDesaprobar").html("APROBAR PAGO")
                    //            $("#cur-estado-pago").html("Pendiente de PAgo")
                    //            Swal.fire({ icon: 'success', title: 'Se Desaprobo el pago correctamente', showConfirmButton: false, timer: 1500 });
                    //        } else {
                    //            Swal.fire({ icon: 'error', title: 'No se desaprobo el pago correctamente', showConfirmButton: false, timer: 1500 });
                    //        }
                    //    },
                    //    error: (val) => { }
                    //})

                }
                else {

                }
            });


    })
});


$('#datetimepicker3').datetimepicker({
    format: 'HH:mm'
    //timeFormat: 'HH:mm:ss tt',
    //dateFormat: 'HH:mm:ss'
});

$('#fechaActa').datetimepicker({
    format: 'DD/MM/YYYY' 
});

$('#fechaNom').datetimepicker({
    format: 'DD/MM/YYYY'
});



// ************************************   ACTA DE ESTIMACION  

function fnValidarProyectoActaEstimacion(){
    let proyecto = $('#proyecto').val().split('-'); 
    //console.log('hola soy: ' + proyecto[0]);

    //let proyectos = ["B", "BE", "CP", "CPE", "L", "P", "PE", "T"];   
    let proyectos = ["S","SE","SEMC"];   

    if (proyectos.includes(proyecto[0].toUpperCase()) ) {
       //alert('proyecto excluido');
        $('#contentActaEstimacion').addClass('d-none');

        //fnDividirCodProyecto();
    } else { 
        //alert('proyecto valido')
        $('#contentActaEstimacion').removeClass('d-none');
        fnValidarProyConsultoria();
    }
   // $('#contentActaEstimacion').addClass.last('d-none');
}

function fnValidarProyConsultoria() {
    let proyecto = $('#proyecto').val().split('-');
    let proyectosCon = ["C", "CE"];

    if (proyectosCon.includes(proyecto[0].toUpperCase())) {
        $('#labelfechaNom').removeClass('d-none');
        $('#fechaNom').removeClass('d-none');
        $('#fechaNombramiento').val(' ');
    } else {
        $('#labelfechaNom').addClass('d-none');
        $('#fechaNom').addClass('d-none');
        $('#fechaNombramiento').val('24/05/2023');
    }
}

function fnDividirCodProyecto() {
    let numero;
    let letras;

    let cod = $('#proyecto').val().split('-'); 
    let newcod = cod[1]
   // console.log('hola soy: ' + newcod[0] +","+ newcod[1] +","+ newcod[2]);

   // validando distintos casos como numeros mayores a 100, mayores a 10 y menores de 10 
    if (newcod[0] > 0) {
        numero = newcod[0]+newcod[1]+newcod[2];
        //console.log('validacion 1' +"  "+ numero)
        letras = numeroALetras(numero, {}); 
    } else if (newcod[1] > 0) {
        let numero1 = numeroALetras(0, {});
        let numero2 = newcod[1] + newcod[2];
        letras = numero1 + numeroALetras(numero2, {});
    } else {
        let numero4 = numeroALetras(0, {});
        letras = numero4 + numero4 + numeroALetras(newcod[2], {});
    }

    //let letras = numeroALetras(num1, {});
    //let anio = numeroALetras(,{});
   
    let planAnual = $("#plananual").val();
    let anio = numeroALetras(planAnual, {});

    let codiogoProyLetras = cod[0].toUpperCase() + " guion " + letras.toLowerCase() + (newcod.length > 3 ? newcod[3].toLowerCase() : " ") + " guion " + anio.toLowerCase();
    return codiogoProyLetras;
}
function fnValidarCamposActaEstimacion() {
    let msj = [];
    ($("#numeroacta").val() == "" ? msj.push("Numero de acta") : msj.push(""));
    ($("#horaActa").val() == "" ? msj.push("Hora del acta") : msj.push(""));
    ($("#fechaActaIn").val() == "" ? msj.push("Fecha del acta") : msj.push(""));
    ($("#nombreEncargadoP").val() == "" ? msj.push("Nombre del encargado del proyecto") : msj.push(""));
    ($("#nombreEncargadoS").val() == "" ? msj.push("Nombre del encargado del proyecto de supervisión") : msj.push(""));
    ($("#tituloEncargadoP").val() == "" ? msj.push("Titulo del encargado del proyecto") : msj.push(""));
    ($("#tituloEncargadoS").val() == "" ? msj.push("Titulo del encargado del proyecto de supervisión") : msj.push(""));
    ($("#numeroFolio").val() == "" ? msj.push("Numero del Folio") : msj.push(""));
    ($("#fechaNombramiento").val() == "" ? msj.push("Fecha del Nombramiento") : msj.push(""));

    return msj;
}

function fnCargarDatosActaEstimacion() {
    let planAnual = $("#plananual").val();
    let ProyectoCodigo = $("#proyecto").val();
    let EstimacionCorr = estimacion;
    console.log(planAnual, ProyectoCodigo, EstimacionCorr)


    $.ajax({
        url: `${urlbase}api/actaEstimacion/obtenerDatosActa/${planAnual}/${ProyectoCodigo}/${EstimacionCorr}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let datos = val[0];
            console.log(val)
            if (val.length != 0) {
               // console.log(datos.Folio)
                $("#numeroFolio").val(datos.Folio);
                $("#numeroacta").val(datos.NumActa);
                $("#horaActa").val(datos.HoraActa);
                $("#fechaActaIn").val(datos.FechaActa);
                $("#nombreEncargadoP").val(datos.NomEncargadoProyectoP);
                $("#tituloEncargadoP").val(datos.TituloEncargadoProyectoP);
                $("#nombreEncargadoS").val(datos.NomEncargadoProyectoPS);
                $("#tituloEncargadoS").val(datos.TituloEncargadoProyectoPS);
           } else {
                $("#numeroFolio").val("");
                $("#numeroacta").val("");
                $("#horaActa").val("");
                $("#fechaActaIn").val("");
                $("#nombreEncargadoP").val("");
                $("#tituloEncargadoP").val("");
                $("#nombreEncargadoS").val("");
                $("#tituloEncargadoS").val("");
            }
        },
        error: () => { }
    });

}

function fnValidarRegistroActa() {
    let anio = $("#plananual").val();
    let ProyectoCodigo = $("#proyecto").val();
    let EstimacionCorr = estimacion;

    //datos formulario Acta
    let folio = $("#numeroFolio").val();
    let numeroActa = $("#numeroacta").val();
    let horaActa = $("#horaActa").val().split(" ");
    let fechaActa = $("#fechaActaIn").val();
    let nomEncargadoP = $("#nombreEncargadoP").val();
    let tituloEncargadoP = $("#tituloEncargadoP").val();
    let nomEncargadoPS = $("#nombreEncargadoS").val();
    let tituloEncargadoPS = $("#tituloEncargadoS").val(); 
    //fin datos formulario Acta

    let datosEnviar = {
        "AnioID": anio,
        "ProyectoCod": ProyectoCodigo,
        "EstimacionCorr": EstimacionCorr, 
        "Folio": folio,
        "NumActa": numeroActa,
        "HoraActa": horaActa[0],
        "FechaActa": fechaActa,
        "NomEncargadoProyectoP": nomEncargadoP,
        "TituloEncargadoProyectoP": tituloEncargadoP,
        "NomEncargadoProyectoPS": nomEncargadoPS,
        "TituloEncargadoProyectoPS": tituloEncargadoPS, 
        "UsuarioModifico": usuario,

    };
    console.log(datosEnviar)
   $.ajax({
        url: `${urlbase}api/actaEstimacion/validarRegistroActa`,
        type: "POST",
        data: JSON.stringify(datosEnviar),
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
            },
            success: (val) => {

            },
            error: (xhr, status, error) => {
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
    });
}
// ************************************   FIN ACTA DE ESTIMACION