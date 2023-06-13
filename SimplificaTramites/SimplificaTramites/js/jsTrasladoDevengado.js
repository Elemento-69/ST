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
    $("#criterioSelect").on("change", ({ currentTarget }) => {
        let estadoCriterio = parseInt(currentTarget.value)
        if (estadoCriterio == 16) {
            let cols = [
                //{
                //    id: 16,
                //    txt: 'Trasladado a Depto. Financiero',
                //},
                {
                    id: 40,
                    txt: 'Devengado',
                }
            ].map((item) => `<option value="${item.id}">${item.txt}</option>`)
            $("#estadoSelect").empty().append(cols[estadoCriterio == 40 ? 1 : 0])
        }
        if (estadoCriterio == 40) {
            let cols = [
                //{
                //    id: 16,
                //    txt: 'Trasladado a Depto. Financiero',
                //},
                {
                    id: 14,
                    txt: 'Pagado',
                }
            ].map((item) => `<option value="${item.id}">${item.txt}</option>`)
            $("#estadoSelect").empty().append(cols[estadoCriterio == 16 ? 1 : 0])
        }
    //    if (asignaDevengado == 1){
    //        let cols = [
    //            //{
    //            //    id: 16,
    //            //    txt: 'Trasladado a Depto. Financiero',
    //            //},
    //            {
    //                id: 40,
    //                txt: 'Devengado',
    //            }
    //        ].map((item) => `<option value="${item.id}">${item.txt}</option>`)
    //        $("#estadoSelect").empty().append(cols[estadoCriterio == 16 ? 1 : 0])
    //    }
        setTable()
    })
    if (asignaDevengado == 1){
        let cols = [
            {
                id: 16,
                txt: 'Trasladado a Depto. Financiero',
            }
            ,
            {
                id: 40,
                txt: 'Devengado',
            }
        ].map((item) => `<option value="${item.id}">${item.txt}</option>`)
        $("#criterioSelect").append(cols.join(""))
        let cols1 = [
            //{
            //    id: 16,
            //    txt: 'Trasladado a Depto. Financiero',
            //},
            {
                id: 40,
                txt: 'Devengado',
            }
        ].map((item) => `<option value="${item.id}">${item.txt}</option>`)
        $("#estadoSelect").append(cols1.join(""))
        setTable()
    }
    $("#btnBuscar").click(function () {
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
            Swal.fire("Atención", "Deben elegir al menos una estimación", "error")
            return
        }
        seleccionados.each(e => {
            $.ajax({
                url: `${urlbase}api/GestionEstimacionRevisionFinanciero/ActualizaProyectoPeriodoEstado`,
                method: "post",
                data: JSON.stringify({
                    "Anio": e[1],
                    "Proyecto": e[2],
                    "EstimacionCorr": e[3],
                    "NvoEstado": estado,
                    "Comentario": "***",
                    "UserName": user
                }),
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                success: (respuesta) => {
                    setTable()
                    swal.fire("Estado modificado correctamente", "", "success")
                }
            })
        })
       
    })
    $('#estimaciones-table tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected')
    })
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