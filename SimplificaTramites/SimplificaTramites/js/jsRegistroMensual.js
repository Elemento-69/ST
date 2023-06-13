$(document).ready(function () {

    

    $("#btnRegresarRegistroDatos").click(function () {
        let QueryString = "?Plan=" + plan + "&Programa=" + programa + "&Proyecto=" + proyecto
        window.location.href = "RegistroDatos.aspx" + QueryString;
    })

        // Disable form submissions if there are invalid fields
        (function () {
            'use strict';
            window.addEventListener('load', function () {
                // Get the forms we want to add validation styles to
                var forms = document.getElementsByClassName('needs-validation');
                // Loop over them and prevent submission
                var validation = Array.prototype.filter.call(forms, function (form) {
                    form.addEventListener('submit', function (event) {
                        if (form.checkValidity() === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        form.classList.add('was-validated');
                    }, false);
                });
            }, false);
        })();


})

calculo_renglon_dict = {
    1: {
        "variables": ["longitud", "ancho", "espesor"],
        "operacion": (dict) => dict["longitud"] * dict["ancho"] * dict["espesor"],
        "image": "../Images/tiporenglon1.jpg"
    },
    2: {
        "variables": ["longitud", "ancho"],
        "operacion": (dict) => dict["longitud"] * dict["ancho"],
        "image": "../Images/tiporenglon2.jpg",
        "estacion": "longitud"
    },
    3: {
        "variables": ["longitud"],
        "operacion": (dict) => dict["longitud"],
        "image": "../Images/tiporenglon3.jpg",
        "estacion": "longitud"
    },
    4: {
        "variables": ["longitud", "ancho", "espesor", "densidad"],
        "operacion": (dict) => dict["longitud"] * dict["ancho"] * dict["espesor"] * dict["densidad"],
        "image": "../Images/tiporenglon1.jpg",
        "estacion": "longitud"
    },
    5: {
        "variables": ["longitud", "ancho", "espesor"],
        "operacion": (dict) => dict["longitud"] * dict["ancho"] * dict["espesor"],
        "image": "../Images/tiporenglon1.jpg",
        "estacion": "longitud"
    },
    6: {
        "variables": ["cantidad"],
        "operacion": (dict) => dict["cantidad"],
        "image": "../Images/excavacion.png"
    },
    7: {
        "variables": ["longitud", "ancho", "Punto de Riego"],
        "operacion": (dict) => dict["longitud"] * dict["ancho"] * dict["Punto de Riego"],
        "image": "../Images/tiporenglon2.jpg",
        "estacion": "longitud"
    },
    8: {
        "variables": ["longitud", "ancho", "Punto de Riego"],
        "operacion": (dict) => dict["longitud"] * dict["ancho"] * dict["Punto de Riego"],
        "image": "../Images/tiporenglon2.jpg",
        "estacion": "longitud"
    },
    9: {
        "variables": ["longitud", "Perímetro", "Espesor de Cuneta"],
        "operacion": (dict) => dict["longitud"] * dict["Perímetro"] * dict["Espesor de Cuneta"],
        "image": "../Images/tiporenglon9.jpg",
        "estacion": "longitud"
    },
    10: {
        "variables": ["longitud", "Ancho", "H1", "H2"],
        "operacion": (dict) => dict["longitud"] * 0.5 * (dict["H1"] + dict["H2"]) * dict["Ancho"],
        "image": "../Images/tiporenglon10.jpg"
    },
    11: {
        "variables": ["longitud", "Ancho", "H1", "H2", "Diametro"],
        "operacion": (dict) => (dict["longitud"] * 0.5 * (dict["H1"] + dict["H2"]) * dict["Ancho"]) - ((dict["Diametro"] / 2) ^ 2 * Math.PI * dict["longitud"]),
        "image": "../Images/tiporenglon11.jpg"
    },
    12: {
        "variables": ["longitud", "ancho", "espesor"],
        "operacion": (dict) => dict["longitud"] * dict["ancho"] * dict["espesor"],
        "image": "../Images/tiporenglon1.jpg"
    },
    13: {
        "variables": ["longitud", "Ancho"],
        "operacion": (dict) => dict["longitud"] * dict["Ancho"],
        "image": "../Images/tiporenglon2.jpg"
    },
}

$("#plan").html(plan)
$("#proyecto").html(proyecto)
$.ajax({
    url: `${urlbase}api/RegistrosMensuales/GetRangoFechas/${plan}/${proyecto}?PeriodoCorrel=${periodo}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        val = val[0]
        $("#fecha-general").datetimepicker({
            minDate: moment(val.PeriodoDesde, "DD/MM/YYYY"),
            maxDate: moment(val.PeriodoHasta, "DD/MM/YYYY"),
            format: 'DD/MM/YYYY'
        });
        $("#fecha-general").datetimepicker("date", moment(val.PeriodoDesde, "DD/MM/YYYY"))
    },

})
$.ajax({
    url: `${urlbase}api/RegistrosMensuales/GetComponentes/${plan}/${proyecto}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        let cols = val.map((item) => `<option value="${item.ComponenteCorrel}">${item.ComponenteDesc}</option>`)
        $("#componenteSelect").append(cols.join(""))
        $("#componenteSelect").trigger("change")
    }
})
$.ajax({
    url: `${urlbase}api/RegistrosMensuales/GetTramos/${plan}/${proyecto}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        let cols = val.map((item) => `<option value="${item.TramoID}">${item.TramosDesc}</option>`)
        $("#Tramo").append(cols.join(""))
        $("#Tramo").trigger("change")
    }
})
$.ajax({
    url: `${urlbase}api/RegistrosMensuales/GetTiposEjecucionProyectos/${plan}/${proyecto}`,
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    },
    success: (val) => {
        let cols = val.map((item) => `<option value="${item.TipoEjecucionID}">${item.TipoEjecucionDesc}</option>`)
        $("#tiposDeEjecucion").append(cols.join(""))
        $("#tiposDeEjecucion").trigger("change")
    }
})


$(".for-remanente-renglon").on("change", () => {
    componente = $("#componenteSelect").val()
    renglon = $("#renglon").val()
    if (!componente || !renglon) return
    $.ajax({
        url: `${urlbase}api/RegistrosMensuales/GetRemanenteRenglon/${plan}/${proyecto}/${componente}/${renglon}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $("#remanenteRenglon").val(val[0]?.CantidadRestante || 0)
            Uni.innerText = "Unidad: " + val[0].RenglonUni;
        }
    })
})
$(".for-remanente-tramo").on("change", () => {
    componente = $("#componenteSelect").val()
    renglon = $("#renglon").val()
    tramo = $("#Tramo").val()
    if (!componente || !renglon || !tramo) return
    $.ajax({
        url: `${urlbase}api/RegistrosMensuales/GetRemanenteTramo/${plan}/${proyecto}/${componente}/${renglon}/${tramo}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $("#remanenteTramo").val(val[0]?.RemanenteTramo || 0)
        }
    })
})

function ActualizarControles() {
    componente = $("#componenteSelect").val()
    renglon = $("#renglon").val()
    tramo = $("#Tramo").val()
    if (!componente || !renglon) return
    $.ajax({
        url: `${urlbase}api/RegistrosMensuales/GetRemanenteRenglon/${plan}/${proyecto}/${componente}/${renglon}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $("#remanenteRenglon").val(val[0]?.CantidadRestante || 0)
        }
    })
    if (!componente || !renglon || !tramo) return
    $.ajax({
        url: `${urlbase}api/RegistrosMensuales/GetRemanenteTramo/${plan}/${proyecto}/${componente}/${renglon}/${tramo}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            $("#remanenteTramo").val(val[0]?.RemanenteTramo || 0)
        }
    })
}
$("#componenteSelect").on("change", ({ currentTarget }) => {
    $.ajax({
        url: `${urlbase}api/RegistrosMensuales/GetRenglones/${plan}/${proyecto}/${currentTarget.value}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let cols = val.map((item) => `<option value="${item.RenglonID}">${item.RenglonDescripcion}</option>`)
            $("#renglon").append(cols.join(""))
            $("#renglon").trigger("change")
        }
    })
})
setEstimacionTable = () => {
    $.ajax({
        url: `${urlbase}api/RegistrosMensuales/GetDetalleEstimaciones/${plan}/${proyecto}/${periodo}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            let cols = val.map((item) => `<tr class="text-center td-custom">
            <td class="spacer" style="background: white;"></td>
                <td>
                    <button type="button" class="del-detalle btn  btn-light" data-id="${item.DetalleID}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
                <td>${item.ComponenteDesc}</td>
                <td>${item.ProyectoRenglonNombre}</td>
                <td>${item.TramoDesc}</td>
                <td>${item.EstaInicio}</td>
                <td>${item.EstaFinal}</td>
                <td>${item.Cantidad}</td>
                <td>${moment(item.FechaRealizado).format("DD/MM/YYYY h:mm:ss a")}</td>
                <td class="spacer" style="background: white;"></td></tr>`)
            $("#detalleestimaciones-table tbody").html(cols.join(""))
            $(".del-detalle").on("click", ({ currentTarget }) => {
                $.ajax({
                    url: `${urlbase}api/RegistrosMensuales/EliminarDetalleEstimacion`,
                    method: "POST",
                    data: JSON.stringify({ "DetalleID": currentTarget.dataset.id }),
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                    success: () => {
                        Swal.fire("Eliminado Exitosamente", "", "success")
                        setEstimacionTable()
                        ActualizarControles()
                    },
                    error: (response) => {
                        Swal.fire("Error", response.responseJSON.Message, "error")
                    }
                })
            })
        }
    })
}

setEstimacionTable()
//$(document).ready(function () {
//    $('#detalleestimaciones-table').DataTable({
//        "language": {            
//            sSearch: 'Buscar'
//        },
//          "oAria": {
//            sSortAscending: ": Activar para ordenar la columna de manera ascendente",
//            sSortDescending: ": Activar para ordenar la columna de manera descendente"
//        },
//    })
//    $('.dataTables_length').addClass('bs-select');

//});

$("#renglon").on("change", ({ currentTarget }) => {
    $.ajax({
        url: `${urlbase}api/RegistrosMensuales/GetValidacionUR/${currentTarget.value}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        },
        success: (val) => {
            type = val[0].Validacion
            let cols = calculo_renglon_dict[type].variables.map((item) => {
                if (item.toLowerCase() === "longitud" && calculo_renglon_dict[type].estacion) {
                    long = parseFloat($("#estacionFinal").val() || 0) - parseFloat($("#estacionInicio").val() || 0)
                    return `
                    <div class="col-12">
                        <div class="form-group">
                        <label>${item}</label>
                        <input type="number" class="form-control variables-input" disabled id="vars-${item}" value=${long}>
                        </div>
                    </div>
                    `
                }
                return `
                    <div class="col-12">
                        <div class="form-group">
                        <label>${item}</label>
                        <input type="number" class="form-control variables-input" id="vars-${item}">
                        </div>
                    </div>
                    `
            })
            if (type === 12) {
                cols.push(`
                    <div class='custom-control custom-checkbox'>
                        <input type='checkbox' class='custom-control-input' id="vars-dobleTratamiento">
                        <label class='custom-control-label' for='vars-dobleTratamiento'>Es de doble tratamiento</label>
                    </div>
                `)
                $("#variables-container").html(cols.join(""))
                espesorIn = $("#vars-espesor")
                espesorIn.attr({
                    "max": 0.1,
                    "min": 0.05,
                    "step": 0.01
                })
                espesorIn.on("input", ({ currentTarget }) => {
                    let min = parseFloat(currentTarget.min);
                    let max = parseFloat(currentTarget.max);
                    let value = parseFloat(currentTarget.value);
                    if (value > max) {
                        currentTarget.value = max;
                    } else if (value < min) {
                        currentTarget.value = min;
                    }
                })

            } else {
                $("#variables-container").html(cols.join(""))
            }

            $(".variables-input").on("change", () => {
                vars = {}
                $(".variables-input").each((_, item) => {
                    vars[item.id.replace("vars-", "")] = parseFloat(item.value || 0)
                })
                $("#cantidadEjecutada").val(calculo_renglon_dict[type].operacion(vars))
            })
            $("#imageTipo").attr("src", calculo_renglon_dict[type].image)
            $("#vars-longitud").trigger("change")
        }
    })
})

$(".estacion-control").on("change", () => {
    if (calculo_renglon_dict[type].estacion) {
        long = parseFloat($("#estacionFinal").val() || 0) - parseFloat($("#estacionInicio").val() || 0)
        $("#vars-longitud").val(long)
        $("#vars-longitud").trigger("change")
    }
})

function borraControles() {
    $("#estacionInicio").val("")
    $("#estacionFinal").val("")
    $("#distanciaEje").val("")
    $("#cantidadEjecutada").val("")
    $("#vars-longitud").val("")
    $("#vars-ancho").val("")
    $("#vars-espesor").val("")
    $("#vars-H1").val("")
    $("#vars-H2").val("")
    $("#vars-Diametro").val("")
    $("#vars-Perímetro").val("")
    $("#vars-Punto de Riego").val("")
    $("#vars-cantidad").val("")
}

//función que valida sí hay valores undefined
const fnisUndefined = (val) => {
    if (typeof val != 'undefined') {
        return 0 //No  viene vacío
    } else {
        return 1 //Viene vacío
    }
}


$("#btn-guardar-detalle").on("click", () => {
    var vEstacionInicio = $("#estacionInicio").val();
    var vEstacionFinal = $("#estacionFinal").val();
    var vDistanciaEje = $("#distanciaEje").val();

   
    

    if ((vEstacionInicio == '') || (vEstacionFinal == '') || (vDistanciaEje == '')) {
        Swal.fire("", "Deben completarse los datos requeridos", "warning");
    }
    else {
        let vFechaRegistrada = $("#fecha-general").datetimepicker('date').toDate()
        let varsLongitud, varsAncho, varsEspesor;
        let long;

         //Evitar problemas de undefined y valores null
        if (fnisUndefined($("#vars-longitud").val()) === 1) {
            long = parseFloat($("#estacionFinal").val() || 0) - parseFloat($("#estacionInicio").val() || 0)
            varsLongitud = long;
            varsAncho = parseFloat(0.000000);
            varsEspesor = parseFloat(0.000000);
            console.log("1")

        } else {
            varsLongitud = $("#vars-longitud").val();
            varsAncho = $("#vars-ancho").val();
            varsEspesor = $("#vars-espesor").val();
            console.log("0")
        }


        data = {
            "EstaInicio": $("#estacionInicio").val(),
            "EstaFinal": $("#estacionFinal").val(),
            "Lado": $("#lado").val(),
            "Cantidad": $("#cantidadEjecutada").val(),
            "FechaRealizado": $("#fecha-general").datetimepicker('date').toDate(),
            "Comentario": $("#Observaciones").val(),
            "DetalleCertificado": true,
            "TramoID": $("#Tramo").val(),
            "RenglonID": $("#renglon").val(),
            "ComponenteCorrel": $("#componenteSelect").val(),
            "AnioID": plan,
            "ProyectoCodigo": proyecto,
            "PeriodoCorrel": periodo,
            "UserName": usuario,
            "DistanciaDeEje": $("#distanciaEje").val(),
            "Longitud": varsLongitud,
            "AnchoC": varsAncho,
            "Espeso": varsEspesor,
            "TipoEjecucionID": $("#tiposDeEjecucion").val(),
            "Densidad": $("#vars-densidad").val(),
            "h1": $("#vars-H1").val(),
            "h2": $("#vars-H2").val(),
            "Diametro": $("#vars-Diametro").val(),
            "Perimetro": $("#vars-Perímetro").val(),
            "PuntoRiego": $("#vars-Punto de Riego").val(),
            "DobleTratamiento": $("#vars-dobleTratamiento").val()
        }
     
        
    }
    if ($("#cantidadEjecutada").val() <= $("#remanenteTramo").val()) {
        
        $.ajax({
            url: `${urlbase}api/RegistrosMensuales/GuardarDetalleEjecucion`,
            method: "POST",
            data: JSON.stringify(data),
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            success: () => {
                Swal.fire("Modificado Exitosamente", "", "success")
                setEstimacionTable()
                borraControles()
                ActualizarControles()
            },
            error: (response) => {
                Swal.fire("Error", response.responseJSON.Message, "error")
            }
        })
    }
    else {
        Swal.fire("Error", "No se puede ejecutar mas cantidades de las disponibles en el tramo.", "error")
    }
})
