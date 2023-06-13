$(document).ready(function () {
	//(function () {
 //       'use strict';
 //       window.addEventListener('load', function () {
 //           // Get the forms we want to add validation styles to
 //           var forms = document.getElementsByClassName('needs-validation')
 //           // Loop over them and prevent submission
 //           var validation = Array.prototype.filter.call(forms, function (form) {
 //               form.addEventListener('submit', function (event) {
 //                   if (form.checkValidity() === false) {
 //                       event.preventDefault()
 //                       event.stopPropagation()
 //                   }
 //                   form.classList.add('was-validated')
 //               }, false)
 //           })
 //       }, false)
 //   })()
    $("body").keydown("input", function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            $(event.currentTarget.dataset.submitbutton).click()
            return false;
        }
    });
    $('#nombreUsuarioInput').val(user).prop('disabled', rol != 'ADMINISTRADORES')
    $("#btnCambiarContrasena").click(function () {
        let nombreUsuario = $("#nombreUsuarioInput").val() || ''
        let contrasena = $("#contrasenaInput").val() || ''
        let nuevaContrasena = $("#nuevaContrasenaInput").val() || ''
        let confirmarContrasena = $("#confirmarContrasenaInput").val() || ''
        if (nombreUsuario.length == 0 || contrasena.length == 0
            || nuevaContrasena.length == 0 || confirmarContrasena.length == 0) {
            Swal.fire("Atención", "Deben completarse los datos requeridos para el cambio de contraseña", "error")
            return
        }
        if (nuevaContrasena == 0 || confirmarContrasena == 0) {
            Swal.fire("Atención", "Debe ingresar los datos requeridos para el cambio de contraseña", "error")
            return
        }
        if (nuevaContrasena != confirmarContrasena){
            Swal.fire("Atención", "Las contraseñas deben ser iguales", "error")
            return
        }
        let data = JSON.stringify({
            nombreUsuario,
            contrasena,
            nuevaContrasena,
            confirmarContrasena,
        })
        $.ajax({
            type: "POST",
            url: "CambiarPassword.aspx/fCambiarPassword",
            data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: ({ d }) => {
                if (d) {
                    Swal.fire("Atención", "Contraseña cambiada con éxito", "success")
                    $("#nuevaContrasenaInput").val('')
                    $("#confirmarContrasenaInput").val('')
                    $("#contrasenaInput").val('') 
                    return true
                } else {
                    Swal.fire("Falló", "Falló el cambio contraseña. Revisar el formulario", "error")
                    return false
                }
            },
            failure: (response) => {
                Swal.fire("", jQuery.parseJSON(request.responseText).Message, "error")
                return false
            }
        });
    })
})