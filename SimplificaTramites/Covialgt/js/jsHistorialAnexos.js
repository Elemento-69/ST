
$(document).ready(function () {

    $("#btnRegresarRegistroDatos").click(function () {
        let QueryString = "?Plan=" + plan + "&Programa=" + proyecto.split('-')[0].toString() + "&Proyecto=" + proyecto
        window.location.href = "RegistroDatos.aspx" + QueryString;
    })
})
$.ajax({
    url: `${urlbase}api/HistorialAnexos/ObtenerDocumentosCambio/${plan}/${proyecto}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        let body = $("#Componente-set")
        body.find("tr").remove()
        val.forEach((item) => {
            let row = $(`<option value="${item.DocCambioCorrel}">${item.DescAnexosVersion}</option>`)
            body.append(row).trigger("change")
        })
    }
})

$("#btnImprimir").on("click", () => {
    opendialog("/visorinformes.aspx?Idreporte=76&Parameters=" + plan + "," + proyecto + "," + $("#Componente-set").val());
})

function opendialog(page) {
    var $dialog = $('#testDiv')
        .html('<iframe style="border: 0px; " src="..' + page + '" width="100%" height="100%"></iframe>')
        .dialog({
            title: "Reporte de cantidades asignadas por tramo",
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