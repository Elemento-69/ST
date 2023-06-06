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


$(document).ready(function () {
    $("#fechaCur").datetimepicker({
        format: "DD/MM/YYYY",
        useCurrent: false
    })
    const urlParams = new URLSearchParams(window.location.search);
    vAnioID = urlParams.get('AnioID');
    vModalCurEStimacionCorrel = urlParams.get('EstimacionCorr');
    vProyectoCodigo = urlParams.get('ProyectoCodigo');


    fnObtenerTipoPago();
    fnObtenerRoles();
    EstimacionFacturas(vModalCurEStimacionCorrel || 0);
    Estado();
    Pagos(vModalCurEStimacionCorrel || 0);

})


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
                   
                    $("#cur-estado").attr('disabled', 'disabled');
                    $("#btnDesaprobar").attr('disabled', 'disabled');
                    $("#btnGuardar").attr('disabled', 'disabled');
                    $('#cur-tipoPago').attr('disabled', 'disabled');
                    $("#MainContent_cur_isrB").attr('disabled', 'disabled');
                    $("#cur_isr2B").attr('disabled', 'disabled');
                    $("#cur_descuento_ivaB").attr('disabled', 'disabled');
                    $("#cur_descuento_iva2B").attr('disabled', 'disabled');
                    $("#cur_retencionB").attr('disabled', 'disabled');
                    $("#cur_retencion2B").attr('disabled', 'disabled');
                }
                
                else {
                    $('#cur-tipoPago').attr('disabled', 'disabled');
                }
            }
        },
        failure: function (response) {
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });
}
function EstimacionFacturas(estimacion) {
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtenerEstimacionFactura/${vAnioID}/${vProyectoCodigo}/${estimacion}`,
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
let pagos = null;
function Pagos(estimacion) {
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtUnPagoEstimacion/${vAnioID}/${vProyectoCodigo}/${vModalCurEStimacionCorrel}`,
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
$("#cur_isr2B, #cur_descuento_iva2B, #cur_retencion2B").on('change', (e) => {
    $('#MainContent_' + e.currentTarget.id.replace('2', '')).prop('disabled', !e.currentTarget.checked)
    $('#MainContent_' + e.currentTarget.id.replace('2', '')).val(0);
});
$("#cur_descuento_iva2B").on('change', (e) => {
    let checkIva = $('input:checkbox[name=iva]:checked').val()
    if (checkIva) {
        vDescuentoIva = vMontoFactura - (vMontoFactura / 1.12)
        $("#MainContent_cur_descuento_ivaB").val(currency(vDescuentoIva, 'Q'))
    } else {
        vDescuentoIva = 0;
        $("#MainContent_cur_descuento_ivaB").val(0)
    }



});
$("#cur_retencion2B").on('change', (e) => {
    let checkDescuentoIva = $('input:checkbox[name=descuentoIva]:checked').val()
    if (checkDescuentoIva) {
        vDescuento25porciento = (vMontoFactura - (vMontoFactura / 1.12)) / 4;
        $("#MainContent_cur_retencionB").val(currency(vDescuento25porciento, 'Q'))
    } else {
        vDescuento25porciento = 0;
        $("#MainContent_cur_retencionB").val(0)
    }

});

$("#cur_isr2B").on('change', (e) => {

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

        $("#MainContent_cur_isrB").val(currency(calculoIsr,'Q'))
    } else {
        vDescuento25porciento = 0;
        $("#MainContent_cur_isrB").val(0)
    }

});

$("#cur-correlativo-pago").on("change", (e) => {

    var PagoCorrelativo = e.currentTarget.value;
    $.ajax({
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtEstimacionPorPagos/${vAnioID}/${vProyectoCodigo}/${vModalCurEStimacionCorrel}/${PagoCorrelativo}`,
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
            $("#MainContent_cur_isrB").val(currency(objDetallePago.Isr, 'Q'))
            $("#MainContent_cur_descuento_ivaB").val(currency(objDetallePago.IVA, 'Q'))
            $("#MainContent_cur_retencionB").val(currency(objDetallePago.DescuentoIVA, 'Q'))
            if (objDetallePago.EstadoISR) {
                $("#cur_isr2B").prop('checked', true).trigger('change')
            }
            else {
                $("#cur_isr2B").prop('checked', false).trigger('change');
            }

            if (objDetallePago.EstadoIVA) {
                $("#cur_descuento_iva2B").prop('checked', true).trigger('change')
            }
            else {
                $("#cur_descuento_iva2B").prop('checked', false).trigger('change');
            }

            if (objDetallePago.EstadoRetencion) {
                $("#cur_retencion2B").prop('checked', true).trigger('change')
            }
            else {
                $("#cur_retencion2B").prop('checked', false).trigger('change');
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
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtenerIsrIvaEstimaciones/${vAnioID}/${vProyectoCodigo}/${vModalCurEStimacionCorrel}/${PagoCorrelativo}`,
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
        url: `${urlbase}api/ConsultaEstimacionesDetallada/ObtUnPagoSIEstimacion/${vAnioID}/${vProyectoCodigo}/${vModalCurEStimacionCorrel}/${PagoCorrelativo}`,
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
        "AnioID": vAnioID,
        "ProyectoCodigo": vProyectoCodigo,
        "EstimacionCorr": parseFloat($("#cur-EstimacionCorr").html()),
        "PagoCorre": parseFloat($("#cur-correlativo-pago").val()),
        "isr": calculoIsr,
        "IVA": vDescuentoIva,
        "DescuentoIVA": vDescuento25porciento,
        "TotalRecibe": parseFloat(vTotalRecibe),
        "EstadoISR": $("#cur_isr2B").prop("checked"),
        "EstadoIVA": $("#cur_descuento_iva2B").prop("checked"),
        "EstadoRetencion": $("#cur_retencion2B").prop("checked")
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
function currency(numero, prefix = '', sufix = '') {
    let a = `${prefix}${numero.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}${sufix}`;
    return a;
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

