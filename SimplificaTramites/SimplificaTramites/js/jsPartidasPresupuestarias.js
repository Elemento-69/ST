var baseHostURL;

const input = document.getElementById('montoletra');

input.addEventListener('input', function (event) {
    const inputValue = event.target.value;
    const onlyLetters = /^[a-zA-Z\s]*$/;

    if (!onlyLetters.test(inputValue)) {
        event.target.value = inputValue.replace(/[^a-zA-Z\s]/g, '');
    }
});




$(document).ready(function () {
    fnConsultarToken();
    //fnCargarDepartamentos();
    $('#montonumeros').keypress(function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        var inputValue = $(this).val();

        // Permitir solo números y punto decimal
        if (
            (charCode !== 46 || inputValue.indexOf('.') !== -1) && // Permitir solo un punto decimal
            (charCode < 48 || charCode > 57)
        ) {
            event.preventDefault();
        }
    });

    $('#cmbAnio').change(function () {
        var AnioID = this.value;
        //alert(AnioID);
        fnObtenerProyectosSupervisionAnio(AnioID);

    })

    $('#fracc').on('input', function () {
        var inputValue = $(this).val();
        var regex = /^\d+\/\d+$/;

        if (regex.test(inputValue)) {
            $(this).val(inputValue);
        } else {
            // Mostrar mensaje de error
            $('#error-message').text('Formato de fracción inválido');
        }

    });
});


function fnConsultarToken() {

    $.ajax({
        type: "POST",
        url: "../Partidas/frmPartidasPresupuestarias.aspx/fObtenerToken",
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var vRespuestaJSON = JSON.parse(data.d);
            if (vRespuestaJSON.dioError == true) {
                $.LoadingOverlay("hide");
                Swal.fire("", vRespuestaJSON.descripcionMensaje, "error");
            }
            else {
                vRespuestaJSON.tablaDevuelta.forEach(function (registro) {
                    vToken = registro.token;
                    vUsuarioActual = registro.usuario;
                    baseHostURL = registro.baseURL;
                    proxyurl = registro.proxyURL;
                    baseSitio = registro.baseSitio;

                  
                 
                    fnCargarDepartamentos();
                });
            }
        },
        failure: function (response) {
            Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error");
        }
    });



}




function fnCargarDepartamentos() {
    const url = baseHostURL + "api/EmergenciasApp/Departamentos/listar";

    fetch(proxyurl + url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + vToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },
    })
        .then(response => {
            var estadoRespuesta = response.status;
            if (estadoRespuesta == 200) return response.json();
            else if (estadoRespuesta == 401) {
                fnRefrescarToken(vToken);
                var interval = setInterval(function () {

                    if (vToken !== '') {
                        fnCargarDepartamentos();
                        clearInterval(interval)
                    }

                }, 1000);
            }
            else if (estadoRespuesta == 404) {
                $.LoadingOverlay("hide");
            }
            else {
                Swal.fire("", "error: " + estadoRespuesta + ", " + response.statusText, "error");
            }
        })
        .then(data => {
            var datos = data;
             console.log(data)
            //limpiarSelect('cmbDepartamento');
            $("#cmbDepartamento").select2({ theme: "bootstrap" })
            if (datos.length > 0) {
                datos.forEach(function (registro) {
                    $("#cmbDepartamento").append('<option value=' +
                        registro.DepartamentoID + '>' +
                        registro.DepartamentoNombre +
                        '</option>');
                })
                document.getElementById('cmbDepartamento').selectedIndex = 0;
                $('#cmbDepartamento').trigger('change');
                $.LoadingOverlay("hide");
            }
        })
        .catch(function (error) {
            $.LoadingOverlay("hide");
            Swal.fire("", error.message + " ", "success");
        });
}