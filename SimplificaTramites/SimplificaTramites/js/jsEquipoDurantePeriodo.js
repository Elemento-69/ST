$(document).ready(function () {
    $("#btnRegresarRegistroDatos").click(function () {
        let QueryString = "?Plan=" + plan + "&Programa=" + programa + "&Proyecto=" + proyecto
        window.location.href = "RegistroDatos.aspx" + QueryString;
    })


})
$.ajax({
    url: `${urlbase}api/RegistroDatos/GetEquipos?pAnioID=${plan}&pProyectoCodigo=${proyecto}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        let cols = val.map((item) => `<option value="${item.EquipoID}">${item.Descripcion}</option>`)
        $("#equipos").append(cols.join(""))
        $("#equipos").trigger("change")
    },
})
$("#equipos").on("change", ({ currentTarget }) => {
    let body = $("#equipos-table tbody")
    body.find("tr").remove()
    equipo = currentTarget.value
    $.ajax({
        url: `${urlbase}api/Equipos/GetEquiposPeriodo?pAnioID=${plan}&pProyectoCodigo=${proyecto}&pPeriodoCorrel=${periodo}&pEquipoID=${equipo}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            val.forEach((item) => {
                states = [
                    { name: "trabajando", sel: "", id: "T" },
                    { name: "humedad", sel: "", id: "H" },
                    { name: "sabado", sel: "", id: "1/2"},
                    { name: "feriado", sel: "", id: "F"},
                    { name: "reparacion", sel: "", id: "R"},
                    { name: "lluvia", sel: "", id: "LL"},
                    { name: "domingo", sel: "", id: "D"},
                    { name: "fueraObra", sel: "", id: "FO"},
                    { name: "parado", sel: "", id: "P" }
                ]
                let estado = states.find(el => el.id == item.Estado)
                estado.sel = "selected"
                states = states.map(el => `<option value="${el.id}" ${el.sel} >${el.name}</option>`)
                let row = $(`<tr>
                <td class="spacer"></td>
                <td class="text-center">${item.Fecha}</td>
                <td class="text-center">
                    <div class="col-md-6 m-auto">
                        <select class="form-control select-equipoperiodo" name="selectEvento">
                            ${states.join("") }
                        </select>
                    </div>
                </td>
                <td class="spacer"></td>
                </tr>`)
                row.find("select").data("obj", item)
                body.append(row)
            })
            $(".select-equipoperiodo").on("change", ({ currentTarget }) => {
                let obj = $(currentTarget).data("obj")
                obj.Estado = $(currentTarget).val()
             
                obj.Fecha = moment(obj.Fecha, "DD/MM/YYYY").toDate()
                $.ajax({
                    url: `${urlbase}/api/Equipos/ActualizarEquiposPeriodo`,
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    data: JSON.stringify(obj),
                    success: (val) => {
                        swal.fire("Estado del Equipo actualizado", "", "success")
                    }
                })
            })
        }
    })
})