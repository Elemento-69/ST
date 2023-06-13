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
    $("#btnRegresarConsultaSanciones").click(function () {
        regresarConsultaSanciones()
    })
    // ObtenerCodigoSancion
    $.ajax({
        url: `${urlbase}api/Sanciones/ObtenerCodigoSancion/${programa}/${plan}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            let cols = val.map((item) => `<option value="${item.SancionCodigo}">${item.SancionCodigo}</option>`)
            $("#codigoSancionSelect").append(cols.join("")).trigger("change")
        }
    })
    $("#codigoSancionSelect").on("change", ({ currentTarget }) => {
        let SancionCodigo = currentTarget.value
        // ObtenerDescripcionRecurrencia
        $.ajax({
            url: `${urlbase}api/Sanciones/ObtenerDescripcionRecurrencia`,
            method: "post",
            data: JSON.stringify({
                "ProgramaCodigo": programa,
                "AnioID": plan,
                "SancionCodigo": SancionCodigo,
            }),
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                if (val.length > 0) {
                    let cols = val.map((item) => `<option value='${JSON.stringify({
                        RecurrenciaCorrel: item.RecurrenciaCorrel,
                        PenalidadDesc: item.PenalidadDesc
                    })}'>${item.RecurrenciaDesc}</option>`)
                    $("#descripcionRecurrenciaSelect").append(cols.join("")).trigger("change")
                }
            }
        })
    })
    $("#descripcionRecurrenciaSelect").on("change", ({ currentTarget }) => {
        $("#descripcionTextarea").val(JSON.parse(currentTarget.value).PenalidadDesc)
    })
    // CargarUsuarioAux
    $.ajax({
        url: `${urlbase}api/Sanciones/CargarUsuarioAux/SUBDIR_TE`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            let cols = val.map((item) => `<option value="${item.UsuarioID}">${item.NombreCompleto}</option>`)
            $("#subdirectorTecnicoSelect").append(cols.join("")).trigger("change")
        }
    })
    // CargarUsuarioAux
    $.ajax({
        url: `${urlbase}api/Sanciones/CargarUsuarioAux/JEFE_CS`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            let cols = val.map((item) => `<option value="${item.UsuarioID}">${item.NombreCompleto}</option>`)
            $("#coordinadorControlSeguimientoSelect").append(cols.join("")).trigger("change")
        }
    })
    // CargarUsuarioAux
    $.ajax({
        url: `${urlbase}api/Sanciones/CargarUsuarioAux/REGIONAL`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: (val) => {
            let cols = val.map((item) => `<option value="${item.UsuarioID}">${item.NombreCompleto}</option>`)
            $("#auxiliarControlSeguimientoSelect").append(cols.join("")).trigger("change")
        }
    })
    $("#btnAgregar").click(function () {
        let RecurrenciaCorrel = JSON.parse($('#descripcionRecurrenciaSelect').val()).RecurrenciaCorrel
        let SancionCodigo = $('#codigoSancionSelect').val()
        let Justificacion = $('#justificacionTextarea').val()
        let FechaSancion = moment($('#fechaSancionInput').val(), "DD-MM-YYYY").isValid() ? $("#fechaSancion-dp").datetimepicker("date").format("YYYY-MM-DD") : ''
        let SancionMonto = $('#montoSancionInput').val() || '0.00'
        let Aux_UserName = $('#auxiliarControlSeguimientoSelect').val()
        let Cor_UserName = $('#coordinadorControlSeguimientoSelect').val()
        let Dir_UserName = $('#subdirectorTecnicoSelect').val()
        if (Justificacion.length == 0 || FechaSancion.length == 0){
            Swal.fire("", "Deben completarse los datos requeridos para la generación de la sanción", "error")
            return
        }
        // AgregarproyectoSanciones
        $.ajax({
            url: `${urlbase}api/Sanciones/AgregarproyectoSanciones`,
            method: "post",
            data: JSON.stringify({
                "ProyectoCodigo": proyecto,
                "AnioID": plan,
                "ProgramaCodigo": programa,
                "RecurrenciaCorrel": RecurrenciaCorrel,
                "SancionCodigo": SancionCodigo,
                "Justificacion": Justificacion,
                "FechaSancion": FechaSancion,
                "SancionMonto": SancionMonto,
                "Aprobada": true,
                "Aux_UserName": Aux_UserName,
                "Cor_UserName": Cor_UserName,
                "Dir_UserName": Dir_UserName,
                "DateModify": new Date().toISOString(),
                "UserName": usuario,
                "sancion": true
            }),
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            success: (val) => {
                Swal.fire("", "Datos actualizados exitosamente", "success")
                .then((result) => {
                    regresarConsultaSanciones()
                })
            },
            error: (msg) => {
                console.log('[AJAX] AgregarproyectoSanciones dice: ', msg)
            }
        })
    })
})



function regresarConsultaSanciones() {
    let QueryString = "?plan=" + plan + "&proyecto=" + proyecto + "&VieneRegistro=" + VieneRegistro
    if (proyecto2.length > 0){
        QueryString = QueryString + "&proyecto=" + proyecto2
    }
    window.location.href = "ConsultaDeSanciones.aspx" + QueryString;
}