let table
let hoy = new Date()
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
    $(".date").datetimepicker({
        format: 'DD/MM/YYYY',
        date: hoy,
    })
    $("#anioSelect").on("change.cargar", ({ currentTarget }) => {
        fnCargarProgramas(currentTarget.value).then()
    })
    $("#btnGenerarProyectos").click(function () {
        fnCargarTablaProyectos()
    })
    $("#btnGenerarInforme").click(function () {
        let anio = $("#anioSelect").val() || ''
        let programa = $("#programaSelect").val() || ''
        let departamento = $("#departamentoSelect").val() || ''
        let desde = moment($('#desdeInput').val(), "DD-MM-YYYY").isValid() ? $("#desde-dp").datetimepicker("date").format("DD-MM-YYYY") : ''
        let hasta = moment($('#hastaInput').val(), "DD-MM-YYYY").isValid() ? $("#hasta-dp").datetimepicker("date").format("DD-MM-YYYY") : ''

        if (anio.length == 0 || programa.length == 0 || departamento.length == 0 || desde.length == 0 || hasta == 0) {
            Swal.fire("Atención", "Deben completarse los datos requeridos para la generación de reporte", "error")
            return
        }
        let QUERY_STRING
        if ($("#empresaCheck").prop("checked")){
            QUERY_STRING = `IdReporte=30&Parameters=${anio},${departamento},${programa},${desde},${hasta}`
        } else {
            QUERY_STRING = `IdReporte=31&Parameters=${anio},${departamento},${programa},${desde},${hasta}`
        }
        opendialog(`/visorinformes.aspx?${QUERY_STRING}`)
        // console.log(`/visorinformes.aspx?${QUERY_STRING}`)
    })
    fnInicializaFormulario()
})
async function fnInicializaFormulario(){
    // Cargar año
    fnCargarPlanes().then()
    fnCargarDepartamentos().then()
}
/**
 * Llena el catalogo de años y devuelve el primer año del catalogo
 * @returns '2019' string de año
 * */
function fnCargarPlanes(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${urlbase}api/DescripcionActualDelProyecto/ObtenerPlanesAnuales`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                let anioActual = String(hoy.getFullYear())
                let cols = val.map((item) => `<option value="${item.AnioID}" ${item.AnioID == anioActual ? "selected" : ""}>${item.AnioID}</option>`)
                let anioSelect = $("#anioSelect").empty().append(cols.join("")).trigger("change.cargar")
                let anioSeleccionado = val[0]?.AnioID || anioActual
                resolve(anioSeleccionado)
            },
            error: (response) => {
                Swal.fire("", e.responseJSON.Message || "Error al descargar catálogo planes anuales.", "error")
                reject(response)
            }
        })
    })
}
function fnCargarDepartamentos(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${urlbase}api/TramosViales/ObtenerListaDepartamentos`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                let cols = val.map((item) => `<option value="${item.DepartamentoID}">${item.DepartamentoNombre}</option>`)
                // cols.push('<option value="0" selected>Todas</option>')
                $("#departamentoSelect").empty().append(cols.join("")).trigger("change.cargar")
            },
            error: (response) => {
                Swal.fire("", e.responseJSON.Message || "Error al descargar catálogo departamentos.", "error")
                reject(response)
            }
        })
    })
}
/**
 * Llena el <select> de catalogo de programas.
 * @param anio Anio de anioSelect
 * */
function fnCargarProgramas(anio){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${urlbase}api/Programas/ObtenerProgramasXAnio/${anio}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                let cols = val.map((item) => `<option value="${item.ProgramaCodigo}">${item.ProgramaNombre}</option>`)
                $("#programaSelect").empty()
                    .append('<option value="Todas" selected>Todos</option>')
                    .append(cols.join(""))
                resolve("Todas")
            },
            error: (response) => {
                Swal.fire("", response.responseJSON.Message || "Error al descargar catálogo programas.", "error")
                reject(response)
            }
        })
    })
}
/**
 * Llena la tabla de proyectos "proyectos-table"
 **/
function fnCargarTablaProyectos() {
    let anio = $("#anioSelect").val() || ''
    let programa = $("#programaSelect").val() || ''
    let departamento = $("#departamentoSelect").val() || ''

    if (anio.length == 0 || programa.length == 0 || departamento.length == 0) {
        Swal.fire("Atención", "Deben completarse los datos requeridos para consultar proyectos", "error")
        return
    }
    $.ajax({
        url: `${urlbase}api/Proyecto/GetListadoXDepartamentos/${anio}/${programa}/${departamento}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            if (table){
                // table.destroy()
                table.clear().draw()
            }
            /*let tbody = $("#proyectos-table tbody")
            tbody.html(null)
            let rows = val.map((item) => {
                let tr = $(`
                     <tr>
                        <td class="spacer"></td>
                        <td><button type="button" class="action-icon hover-red btn btn-light del" data-toggle="popover" data-trigger="hover"
                            data-content="Imprimir" data-placement="top" style="cursor:pointer" onclick="fnImprimir('${item.AnioID}', '${item.ProyectoCodigo}', '${item.DepartamentoID}')">
                        <i class="fas fa-print fa-lg fa-fw"></i></td>
                        <td class="text-center">${item.ProyectoCodigo.toUpperCase()} - ${item.AnioID}</td>
                        <td class="text-center">${item.ProyectoDescripcion.toLowerCase()}</td>
                        <td class="spacer"></td>
                    </tr>
                `)
                tr.data("item", item)
                return tr
            })
            tbody.empty().append(rows)
            table = fnInicializaTableProyectos()*/
            table = fnInicializaTableProyectos2(val)
        },
        error: (response) => {
            if (response.status == 404){
                if (table){
                    // table.destroy()
                    table.clear().draw()
                }
                Swal.fire("", "Proyectos no encontrados.", "error")
                return
            }
            Swal.fire("", response.responseJSON.Message || "Error al descargar catálogo proyectos.", "error")
            reject(response)
        }
    })
}
function fnInicializaTableProyectos() {
    return $('#proyectos-table').DataTable({
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin proyectos para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Proyectos",
            "infoEmpty": "Mostrando 0 de 0 de 0 Proyectos",
            "infoFiltered": "(Filtrado de _MAX_ total Proyectos)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Proyectos",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay proyectos encontradas",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}
function fnInicializaTableProyectos2(data) {
    return $('#proyectos-table').DataTable({
        data,
        paging: true,
        destroy: true,
        searching: true,
        scrollCollapse: true,
        scrollY: '70vh',
        language: {
            "decimal": "",
            "emptyTable": "Sin proyectos para mostrar",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Proyectos",
            "infoEmpty": "Mostrando 0 de 0 de 0 Proyectos",
            "infoFiltered": "(Filtrado de _MAX_ total Proyectos)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Proyectos",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No hay proyectos encontradas",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
        columns: [
            {
                data: "AnioID",
                render: function(data, type, row, meta){
                    return `<td><button type="button" class="action-icon hover-red btn btn-light del" data-toggle="popover" data-trigger="hover"
                            data-content="Imprimir" data-placement="top" style="cursor:pointer" onclick="fnImprimir('${data}', '${row.ProyectoCodigo}', '${row.DepartamentoID}')">
                        <i class="fas fa-print fa-lg fa-fw"></i></td>`
                }
            },
            {
                data: "ProyectoCodigo",
                render: function(data, type, row, meta) {
                    return `${data.toUpperCase()} - ${row.AnioID}`;
                }
            },
            {
                data: "ProyectoDescripcion",
                render: function(data, type) {
                    return data.toLowerCase()
                }
            },
            // {}
        ]
    });
}
function fnImprimir(anio, proyecto, departamento){
    // VisorInformes
    opendialog(`/visorinformes.aspx?IdReporte=38&Parameters=${anio},${proyecto},${departamento}`)
    // console.log(`/visorinformes.aspx?IdReporte=38&Parameters=${anio},${proyecto},${departamento}`)
}
function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Informe",
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
