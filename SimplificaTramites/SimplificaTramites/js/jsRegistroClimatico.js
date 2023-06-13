

$(document).ready(function () {
    $("#btnRegresarRegistroDatos").click(function () {
        let QueryString = "?Plan="+plan+ "&Programa="+programa+"&Proyecto="+proyecto
        window.location.href = "RegistroDatos.aspx" + QueryString;
    })


})
$("#Periodos").on("change", ({ currentTarget }) => {
    $.ajax({
        url: `${urlbase}api/Lluvias/GetLluvias/${currentTarget.value}/${proyecto}/${plan}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let body = $("#registros-table tbody")
            body.find("tr").remove()
            val.forEach((item) => {
                medio = ""
                llovio = ""
                noLlovio = ""
                switch (item.Evento) {
                    case "1/2":
                        medio = "selected"
                        break;
                    case "LL":
                        llovio = "selected"
                        break
                    case "NL":
                        noLlovio = "selected"
                        break
                    default:
                        alert(`${item.Evento} no controlado`)
                }
                let row = $(`<tr>
                <td class="spacer"></td>
                <td class="text-center">${item.Fecha}</td>
                <td>
                    <div class="col-md-6 margin-select"">
                        <select class="form-control select-clima" name="selectEvento">
                            <option value="1/2" ${medio}>Llovió medio día</option>
                            <option value="LL" ${llovio}>Llovió todo el día</option>
                            <option value="NL" ${noLlovio}>No Llovio</option>
                        </select>
                    </div>
                </td>
                <td class="spacer"></td>
                </tr>`)
                row.find("select").data("obj", item)
                body.append(row)
            })
            
            $(".select-clima").on("change", ({ currentTarget }) => {
                obj = $(currentTarget).data("obj")
                obj.Evento = currentTarget.value
                obj.Username = obj.UserName
                obj.AnioId = obj.AnioID
                obj.DateModify = new Date().toISOString()
                obj.Fecha = moment(obj.Fecha, "DD/MM/YYYY").toDate().toUTCString()
                $.ajax({
                    url: `${urlbase}api/Lluvias/Actualizar`,
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    method: "POST",
                    data: JSON.stringify(obj),
                    success: (val) => {
                        Swal.fire("Modificado Exitosamente", "", "success")
                    }
                })
            })
        }
    })
})
$.ajax({
    url: `${urlbase}api/Lluvias/GetPeriodos/${plan}/${proyecto}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        let cols = val.map((item) => `<option value="${item.Periodocorrel}">${item.Periodo}</option>`)
        $("#Periodos").append(cols.join(""))
        $("#Periodos").val(periodo)
        $("#Periodos").trigger("change")
    }
})