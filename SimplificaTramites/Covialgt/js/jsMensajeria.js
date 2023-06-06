$.ajax({
    url: `${urlbase}api/Mensajeria/ObtenerMensajeXID/${deId}`,
    success: (val) => {
        let options = val.map((val) => `
         <h4 class="mt-5">${val.Titulo}</h4>
        <div class="card custom-card border-0 mt-4">
        <div class="card-body">
            <h5>Remitente:
                <small class="text-muted">${val.Remitente}</small>
            </h5>
            <h5>Id Mensaje:
                <small class="text-muted"> ${val.MensajeDeID}</small>
            </h5>
            <h5>Fecha de Envio:
                <small class="text-muted">${val.FechaEnvio}</small>
            </h5>
            <hr class="line-solid mt-4"/>
                <label class="pb-5">${val.CuerpoMensaje}
                </label>
        </div>
    </div>`)
        $('#messages').append(options)
    },

    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
})