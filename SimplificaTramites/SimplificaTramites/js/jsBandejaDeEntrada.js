$.ajax({
    url: `${urlbase}api/Mensajeria/ConsultarMensajeria/${usuario}`,
    success: (val) => {
        let options = val.map((val) => `
        <tr class="text-center td-custom">
            <td class="spacer bg-light"></td>
            <td>
                <a href="Mensajeria?deId=${val.MensajeParaID}" class="action-icon hover-blue" data-toggle="popover" data-trigger="hover"
                    data-content="Detalle de estimaciones" data-placement="top" runat="server">
                    <i class="fas fa-eye fa-lg fa-fw"></i>
                </a>
            </td>
            <td>${val.Envia}</td>
            <td>${val.Titulo}</td>
            <td>${val.FechaEnvio}</td>
            <td class="spacer bg-light"></td>
        </tr>`)
        $('#bandeja_entrada-table tbody').append(options)
    },

    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})