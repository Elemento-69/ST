$(document).ready(function () {
  
    $("input[group=buscarEmpresa]").on("change", () => {
        let nit = $("#nitInput").val() || '0'
        let nombreEmpresa = $("#nombreEmpresaInput").val() || ''
        $("select").select2({ theme: "bootstrap" })
        $.ajax({
            url: `${urlbase}api/ProyectosPorEmpresa/ObtenerEmpresaPorNitNombre/${nit}/${nombreEmpresa}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            success: (val) => {
                $('#empresaSelect').find("option").remove()
                let cols = val.map((item) => `<option value="${item.EmpresaNIT}">${item.NOMBRE}</option>`)
                $("#empresaSelect").append(cols.join("")).trigger("change")
            }
        })
    })
    $("#btnBuscar").click(function (){
        let nit = $("#nitInput").val() || '0'
        let nombreEmpresa = $("#nombreEmpresaInput").val() || ''
        $.ajax({
            url: `${urlbase}api/ProyectosPorEmpresa/ObtenerEmpresaPorNitNombre/${nit}/${nombreEmpresa}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            success: (val) => {
                $('#empresaSelect').find("option").remove()
                let cols = val.map((item) => `<option value="${item.EmpresaNIT}">${item.NOMBRE}</option>`)
                $("#empresaSelect").append(cols.join("")).trigger("change")
            }
        })
    })
 
    $("#empresaSelect").on("change.select2",  ({ currentTarget }) => {
        $('#btnImprimir').prop('disabled', !currentTarget.value)
        $.ajax({
            url: `${urlbase}api/ProyectosPorEmpresa/ObtenerProyectosPorEmpresa/${currentTarget.value}`,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: (val) => {
                let cols = val.map((item) => `<tr class="text-center td-custom">
                <td class="spacer" style="background: white;"></td>
                <td>${item.AnioID}</td>
                <td>${item.ProyectoCodigo}</td>
                <td>${item.ProyectoDescripcion}</td>
                <td>${item.ProyectoEstatusDesc}</td>
                <td>${currency(item.MontoOriginal,'Q')}</td>//currency(item.RenglonPrecioUnitario,'Q.')
                <td>${currency(item.MontoModificado, 'Q')}</td>
                <td>${currency(item.Pagado, 'Q')}</td>
                <td class="spacer" style="background: white;"></td></tr>`)
                $("#proyectos-table tbody").html(cols.join(""))
            }
        })
    })
    $("#btnImprimir").click(function () {
        let nit = $("#empresaSelect").val()
        opendialog(`../visorinformes.aspx?Idreporte=72&Parameters=${nit}`)
    })
  


})
function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Informes Técnicos",
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
function currency(numero, prefix = '', sufix = '') {
    return `${prefix}${numero.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}${sufix}`;
}