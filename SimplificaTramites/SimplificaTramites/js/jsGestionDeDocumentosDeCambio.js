let table
$(document).ready(function () {
    (function () {
        'use strict';
        window.addEventListener('load', function () {
            // Get the forms we want to add validation styles to
            var forms = document.getElementsByClassName('needs-validation')
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function (form) {
                form.addEventListener('submit', function (event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    form.classList.add('was-validated')
                }, false)
            })
        }, false)
    })()
    $("body").keydown("input", function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            $(event.currentTarget.dataset.submitbutton).click()
            return false;
        }
    });
    $("select").select2({ theme: "bootstrap" })
    if (rolpermitido == 1){
        $("#estadoSelect").removeClass("invisible")
        $("#btnAsignarEstado").removeClass("invisible")
        $("label[for=estadoSelect]").removeClass("invisible")
        $("#Image1").removeClass("invisible")
    } else {
        $("#estadoSelect").addClass("invisible")
        $("#btnAsignarEstado").addClass("invisible")
        $("label[for=estadoSelect]").addClass("invisible")
        $("#Image1").addClass("invisible")
    }
    fnCargarCargos()
    $("#criterioSelect").on("change", ({ currentTarget }) => {
        fnCargarEstadoDestino()
    })
    $("#btnBuscar").click(function () {
        $("#lblStatus").text("")
        setTable()
    })
    $("#btnAsignarEstado").click(function () {
        let estado = $("#estadoSelect").val() || ''
        if (estado.length == 0) {
            Swal.fire("Atención", "Debe elegir Nuevo Estado de la Estimación", "error")
            return
        }
        let seleccionados = table.rows('.selected').data()
        if (seleccionados.length == 0){
            Swal.fire("Atención", "Deben elegir al menos un documento de cambio", "error")
            return
        }
        let docCambio = seleccionados[0]
        let data = {
            "Anio": docCambio[2],
            "Proyecto": docCambio[3],
            "DocCambioCorrel": docCambio[4],
            "EstadoID": estado,
            "UserName": user
        }
        $.ajax({
            url: `${urlbase}api/DocumentosCambio/ActualizarDocumentosCambioEstado`,
            method: "POST",
            data: JSON.stringify(data),
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (respuesta) => {
                setTable()
                swal.fire("Estado modificado correctamente", "", "success")
                let criterioText = $('#criterioSelect>option:selected').text()
                let estadoText = $('#estadoSelect>option:selected').text()
                $("#lblStatus").html(`<br/>Estado de la Operaci&oacute;n: <br/><br/>El Periodo: ${data.Anio}  para el Proyecto: ${data.Proyecto}, ha sido modificado satisfactoriamente desde el estado: <br/>'<b>${criterioText}</b>'<br/> al estado: <br/>'<b>${estadoText}</b>'`)
            },
            failure: (respuesta) => {
                $("#lblStatus").html('Estado de la Operaci&oacute;n: <br/><br/><br/>El Registro <b>NO</b> Fue Modificado, Intentelo Mas Tarde.')
            }
        })
    })
    $('#documentosCambio-table tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected').siblings().removeClass('selected')
        $('#lblStatus').html('')
    })
})
function setTable() {
    let pEstado = $("#criterioSelect").val() || ''
    let pParametro = $("#parametroInput").val() || ''
    $.ajax({
        url: `${urlbase}api/DocumentosCambio/GetDocumentosCambioBusqueda/${pEstado}/${pParametro}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            if (table){
                table.destroy()
                table.clear()
            }
            let tbody = $("#documentosCambio-table tbody")
            tbody.html(null)
            let rows = val.map((item) => `
                 <tr>
                    <td class="spacer"></td>
                    <td><button type="button" class="action-icon hover-red btn btn-light del" data-toggle="popover" data-trigger="hover"
                        data-content="Imprimir" data-placement="top" style="cursor:pointer" onclick="fnImprimir('${item.Anio}', '${item.Proyecto}', ${item.DocCambioCorrel}, '${item.FechaPresentacion}')">
                    <i class="fas fa-print fa-lg fa-fw"></i></td>
                    <td class="text-center">${item.Anio}</td>
                    <td class="text-center">${item.Proyecto}</td>
                    <td class="text-center">${item.DocCambioCorrel}</td>
                    <td class="text-center">${item.FechaPresentacion}</td>
                    <td class="text-center">${item.DocCambioJustifica}</td>
                    <td class="text-center">${currency(item.MontoDocCambio, 'Q.')}</td>
                    <td class="text-center">${item.DocCambioDesc}</td>
                    <td class="text-center">${item.DocCambioTipoCorrel}</td>
                    <td class="text-center">${moment(item.FechaEstado).format("DD/MM/YYYY HH:MM:SS a")}</td>
                    <td class="spacer"></td>
                </tr>
            `)
            tbody.append(rows)
            table = fnInicializaTableDocumentosDeCambio()
        }
    })
}
function fnInicializaTableDocumentosDeCambio() {
    return $('#documentosCambio-table').DataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin documentos de cambio para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Documentos de Cambio",
            "infoEmpty": "Mostrando 0 de 0 de 0 Documentos de Cambio",
            "infoFiltered": "(Filtrado de _MAX_ total Documentos de Cambio)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Documentos de Cambio",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay documentos de cambio encontradas",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}
function currency(numero, prefix='', sufix='') {
    return `${prefix}${parseInt(numero).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}${sufix}`;
}
function fnCargarCargos(){
    $.ajax({
        url: `${urlbase}api/DocumentosCambio/GetEstadosDocCambioActivo`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let cols = val.map((item) => `<option value="${item.EstadoID}">${item.EstadoDesc}</option>`)
                .join("")
            $("#criterioSelect").append(cols)//.trigger("change")
            fnCargarEstadoDestino()
            setTable()
        }
    })
}
/**
 * Carga el 2do <select> con registros locales
 * **/
function fnCargarEstadoDestino(){
    let cols = []
    let pEstado = $("#criterioSelect").val() || ''
    if (pEstado.length == 0){
        return
    }
    switch(pEstado){
        case "0":
            cols.push({
                EstadoDesc: 'Documento Recibido en COVIAL',
                EstadoID: 1,
            })
            break;
        case "1":
            cols.push({
                EstadoDesc: 'Documento Con Reparo Técnico',
                EstadoID: 3,
            })
            if (rolasistente == 1){
                cols.push({
                    EstadoDesc: 'Documento Rechazado por COVIAL',
                    EstadoID: 4,
                })
            } else {
                cols.push({
                    EstadoDesc: 'Documento Aprobado',
                    EstadoID: 8,
                })
            }
            break;
        case "2":
            cols.push({
                EstadoDesc: 'Documento con Reparo Técnico ',
                EstadoID: 3,
            })
            break;
        case "3":
            cols.push({
                EstadoDesc: 'Documento Recibido en COVIAL',
                EstadoID: 1,
            })
            if (rolasistente == 1){
                cols.push({
                    EstadoDesc: 'Documento Rechazado por COVIAL',
                    EstadoID: 4,
                })
            } else {
                cols.push({
                    EstadoDesc: 'Documento Aprobado',
                    EstadoID: 8,
                })
            }
            break;
        case "4":
                cols.push({
                    EstadoDesc: 'Documento no Presentado',
                    EstadoID: 0,
                })
                cols.push({
                    EstadoDesc: 'Documento con Reparo Técnico ',
                    EstadoID: 3,
                })
            break;
        case "5":
            cols.push({
                EstadoDesc: 'Documento Recibido en COVIAL',
                EstadoID: 1,
            })
            break;
        case "6":
            cols.push({
                EstadoDesc: 'Documento Rechazado por Comité Técnico.',
                EstadoID: 7,
            })
            cols.push({
                EstadoDesc: 'Documento Aprobado',
                EstadoID: 8,
            })
            break;
        case "7":
            cols.push({
                EstadoDesc: 'Documento para Aprobación Comité Técnico.',
                EstadoID: 6,
            })
            break;
        case "8":
            cols.push({
                EstadoDesc: 'Documento Recibido en COVIAL',
                EstadoID: 1,
            })
            cols.push({
                EstadoDesc: 'Documento para Aprobación Comité Técnico.',
                EstadoID: 6,
            })
            break;
    }
    let options = cols.map((item) => `<option value="${item.EstadoID}">${item.EstadoDesc}</option>`)
    $("#estadoSelect").empty().append(options.join(""))
}
function fnImprimir(Anio, Proyecto, DocCambioCorrel, FechaPresentacion){
    let Filtro = `${Anio},${Proyecto},${DocCambioCorrel}`
    let AnioPresentacion = 2020
    if (FechaPresentacion){
        AnioPresentacion = parseInt(FechaPresentacion.split('/')[2])
    }
    if ((Proyecto.substring(0, 2) != "S-") && (Anio == "2011" || Anio == "2010") && AnioPresentacion >= 2011){
        opendialog(`/VisorInformes.aspx?Parameters=${Filtro}&IdReporte=3`)
    } else {
        opendialog("/visorinformesSti.aspx?AnioID=" + Anio + "&ProyectoCodigo=" + Proyecto + "&DocCambioCorrel=" + DocCambioCorrel+ "&ReporteID=7200")
    }
}
function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Documento de cambio",
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