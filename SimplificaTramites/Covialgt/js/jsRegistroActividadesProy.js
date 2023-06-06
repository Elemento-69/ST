$(document).ready(function () {
    $("#btnRegresarRegistroDatos").click(function () {
        let QueryString = "?Plan=" + plan + "&Programa=" + programa + "&Proyecto=" + proyecto
        window.location.href = "RegistroDatos.aspx" + QueryString;
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

$("#Periodos").on("change", ({ currentTarget }) => {
    $.ajax({
        url: `${urlbase}api/RegistroDatos/GetProgramacionSupervisor?pPeriodo=${currentTarget.value}&pProyectoCodigo=${proyecto}&pAnioID=${plan}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let body = $("#actividades-table tbody")
            body.find("tr").remove()
            val.forEach((item) => {
                descanso = ""
                actividades = ""
                suspendido = ""
                switch (item.Evento) {
                    case "D":
                        descanso = "selected"
                        break;
                    case "A":
                        actividades = "selected"
                        break
                    case "S":
                        suspendido = "selected"
                        break
                    default:
                        alert(`${item.Evento} no controlado`)
                }
                let row = $(`<tr>
                <td class="spacer"></td>
                <td class="text-center">${item.Fecha}</td>
                <td>
                     <div class="col-md-6 mx-auto">
                        <select class="form-control select-actividad" name="selectEvento">
                            <option value="D" ${descanso}>El supervisor se encuentra en descanso</option>
                            <option value="A" ${actividades}>El supervisor se encuentra en actividades</option>
                            <option value="S" ${suspendido}>El proyecto está suspendido</option>
                        </select>
                    </div>
                </td>
                <td class="spacer"></td>
                </tr>`)
                row.find("select").data("obj", item)
                body.append(row)
            })

            $(".select-actividad").on("change", ({ currentTarget }) => {
              
                obj = $(currentTarget).data("obj")
          
                obj.Evento = currentTarget.value
                obj.Fecha = moment(obj.Fecha, "DD/MM/YYYY").toDate()
                $.ajax({
                    url: `${urlbase}api/RegistroDatos/ActualizarProgramacionSup`,
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