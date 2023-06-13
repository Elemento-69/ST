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
    $(".date").change(({ currentTarget }) => {
        // conseguir la fecha del txt
        let fechaIngresada = moment($(currentTarget).children("input").val(), "DD-MM-YYYY")
        if (fechaIngresada.isValid()){
            $(`#${currentTarget.id}`).datetimepicker("date", fechaIngresada)
        } else {
            Swal.fire("Atención", "La fecha no es válida. Formato es DD-MM-YYYY", "error")
        }
    })
    $("#desde-dp").datetimepicker({
        format: 'DD/MM/YYYY',
        locale: 'es',
    });

    $("#criterioSelect").on("change", ({ currentTarget }) => {
        let estadoCriterio = parseInt(currentTarget.value);
        let cols = listaParaComboNuevoEstado(estadoCriterio).map((item) => '<option value="' + item.id + '">' + item.txt + '</option>');        
        $("#estadoSelect").empty().append(cols);
        setTable();
    });

    //Llenar listado de estados actuales
    let cols = listaParaComboEstadoActual().map((item) => `<option value="${item.id}">${item.txt}</option>`);
    $("#criterioSelect").append(cols.join("")).trigger("change");
    setTable();
    
    $("#btnBuscar").click(function () {
        setTable()
    })
    $("#desde-dp").on("change.datetimepicker", function (e) {
        let criterio = $("#criterioSelect").val() || ''
        let estado = $("#estadoSelect").val() || ''
        if (e.date && criterio.length > 0 && estado.length > 0) {
            let fecha = e.date.format("YYYY-MM-DD")
            $.ajax({
                url: `${urlbase}api/GestionEstimacionRevisionFinanciero/GetConsultaTrasladosxDia/${fecha}/${criterio}/${estado}`,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                success: (val) => {
                    let cols = val.map((item) => `<option value="${item.HoraTraslado}">${item.HoraTraslado}</option>`)
                    $("#horaSelect").empty().append(cols.join(""))//.trigger("change")
                }
            })
        }
    })
    $("#btnReportePorHora").click(function () {
        let criterio = $("#criterioSelect").val() || ''
        let estado = $("#estadoSelect").val() || ''
        let desde = $('#horaSelect').val() || ''
        if (desde.length == 0){
            Swal.fire("Atención", "Debe elegir una fecha", "error")
            return
        }
        opendialog(`/VisorInformesSti.aspx?ReporteID=201&Fecha=${desde.replaceAll('/', '-')}&EstadoFrom=${criterio}&EstadoTo=${estado}`)
    })
    $("#btnReportePorDia").click(function () {
        let criterio = $("#criterioSelect").val() || ''
        let estado = $("#estadoSelect").val() || ''
        let desde = moment($('#desdeInput').val(), "DD-MM-YYYY").isValid() ? $("#desde-dp").datetimepicker("date").format("YYYY-MM-DD") : ''
        if (desde.length == 0){
            Swal.fire("Atención", "Debe elegir una fecha", "error")
            return
        }
        if (criterio.length == 0 || estado.length == 0){
            Swal.fire("Atención", "Debe elegir un estado actual y estado nuevo", "error")
            return
        }
        opendialog(`/VisorInformesSti.aspx?ReporteID=201&Fecha=${desde}&EstadoFrom=${criterio}&EstadoTo=${estado}`)
    })
    $("#btnAsignarEstado").click(function () {
        let criterio = $("#criterioSelect").val() || ''
        let estado = $("#estadoSelect").val() || ''
        if (criterio.length == 0 || estado.length == 0){
            Swal.fire("Atención", "Debe elegir un estado actual y estado nuevo", "error")
            return
        }
        let seleccionados = table.rows('.selected').data()
        if (seleccionados.length == 0){
            Swal.fire("Atención", "Deben elegir al menos una estimación", "error")
            return
        }

        var registros = [];
        seleccionados.each(e => {
            registros.push({
                "Anio": e[1],
                "Proyecto": e[2],
                "EstimacionCorr": e[3],
                "NvoEstado": estado,
                "Comentario": "***",
                "UserName": user
            });
        });

        $.ajax({
            url: `${urlbase}api/GestionEstimacionRevisionFinanciero/ActualizaProyectoPeriodoEstado_ListaEstimaciones`,
            method: "post",
            data: JSON.stringify(registros),
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (respuesta) => {
                setTable();
                $("#desde-dp").trigger("change.datetimepicker");
                swal.fire("Estado modificado correctamente", "", "success");
            }
        })
              
    })

    $('#estimaciones-table tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected')
    })

    if (rolDigitalizador) { }
    else { $('#card-reporte').hide();}
})
function setTable() {
    let pEstado = $("#criterioSelect").val() || ''
    let pParametro = $("#parametroInput").val() || ''
    $.ajax({
        url: `${urlbase}api/GestionEstimacionRevisionFinanciero/GetEstimacionesProyecto/${pEstado}/${pParametro}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            if (table){
                table.destroy()
                table.clear()
            }
            let tbody = $("#estimaciones-table tbody")
            tbody.html(null)
            let rows = val.map((item) => `
                 <tr>
                    <td class="spacer"></td>
                    <td class="text-center">${item.Anio}</td>
                    <td class="text-center">${item.Proyecto}</td>
                    <td class="text-center">${item.PeriodoCorr}</td>
                    <td class="text-center">${item.Periodo}</td>
                    <td class="text-center">${currency(item.Monto, 'Q.')}</td>
                    <td class="text-center">${item.EstadoDesc}</td>
                    <td class="spacer"></td>
                </tr>
            `)
            tbody.append(rows)
            table = fnInicializaTableEstimaciones()
        }
    })
}
function fnInicializaTableEstimaciones() {
    return $('#estimaciones-table').DataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin estimaciones para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Estimaciones",
            "infoEmpty": "Mostrando 0 de 0 de 0 Estimaciones",
            "infoFiltered": "(Filtrado de _MAX_ total Estimaciones)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Estimaciones",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay estimaciones encontradas",
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
function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Informe de Deuda",
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
